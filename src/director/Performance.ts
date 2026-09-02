/**
 * Performance layer: turns director events into continuous acting.
 *
 * The director decides *when* something happens. This decides *how the body
 * gets there* - pose tracks with easing and anticipation for the host, an
 * entrance curve for each subject so nobody materialises in one frame, and a
 * body-morph curve for the lean/heavy gags.
 */

import { Pose, PoseKey, samplePose, withAnticipation } from "../anim/Pose";
import { ramp, springFrom, SPRING_DEFAULTS } from "../anim/Track";
import { BeatEvent, DirectionPlan } from "./Director";
import { Vec } from "../anim/Track";
import { BodyShape, BODY_PRESETS, mixBody, sampleBody, BodyKey } from "../character/CharacterSpec";

/** Strong, readable silhouette poses. Fewer, better, held. */
export const POSES: Record<string, Pose> = {
  idle: {
    leftArmAngle1: 150, leftArmAngle2: -20, rightArmAngle1: 30, rightArmAngle2: 20,
    leftLegAngle1: 105, leftLegAngle2: 10, rightLegAngle1: 75, rightLegAngle2: -10,
    spineLean: 0, headTilt: -4, eyebrowHeight: 0, eyebrowTilt: 0,
  },
  shrug: {
    leftArmAngle1: 130, leftArmAngle2: -95, rightArmAngle1: 50, rightArmAngle2: 95,
    spineLean: -2, headTilt: 6, eyebrowHeight: 6,
  },
  pointCamera: {
    leftArmAngle1: 150, leftArmAngle2: -20, rightArmAngle1: -8, rightArmAngle2: 6,
    spineLean: 3, headTilt: -2, eyebrowHeight: 3,
  },
  facepalm: {
    leftArmAngle1: 150, leftArmAngle2: -20, rightArmAngle1: 62, rightArmAngle2: -118,
    spineLean: 8, headTilt: 12, eyebrowHeight: -4,
  },
  handsOnHips: {
    leftArmAngle1: 128, leftArmAngle2: -108, rightArmAngle1: 52, rightArmAngle2: 108,
    spineLean: -3, headTilt: 0, eyebrowHeight: 2,
  },
  crossedArms: {
    leftArmAngle1: 118, leftArmAngle2: -78, rightArmAngle1: 62, rightArmAngle2: 78,
    spineLean: 2, headTilt: 3,
  },
  mindBlown: {
    leftArmAngle1: 172, leftArmAngle2: -128, rightArmAngle1: 8, rightArmAngle2: 128,
    spineLean: -6, headTilt: -10, eyebrowHeight: 12,
  },
  wave: {
    leftArmAngle1: 150, leftArmAngle2: -20, rightArmAngle1: -42, rightArmAngle2: 34,
    spineLean: 0, headTilt: 5,
  },
};

/** Face acting keyed off the expression names the director emits. */
export const EXPRESSIONS: Record<string, Pose> = {
  deadpan_classic: { mouthShape: "deadpan_line", eyebrowHeight: 0, eyebrowTilt: 0, gazeX: 0.1, headTilt: -2 },
  deadpan_slow_blink: { mouthShape: "deadpan_line", eyebrowHeight: -1, gazeX: -0.2, headTilt: 2 },
  skeptical_raised_brow: { mouthShape: "smirk", eyebrowHeight: 9, eyebrowTilt: -7, gazeX: 0.45, headTilt: -6 },
  skeptical_side_eye: { mouthShape: "smirk", eyebrowHeight: 5, eyebrowTilt: -9, gazeX: 0.85, headYaw: 0.45 },
  confused_tilted_head: { mouthShape: "cringe_wavy", eyebrowHeight: 4, eyebrowTilt: 6, headTilt: 16, headYaw: -0.25 },
  confused_squint: { mouthShape: "deadpan_line", eyebrowHeight: -3, eyebrowTilt: 10, gazeX: 0.3 },
  shock_eye_pop: { mouthShape: "jaw_drop", eyeStyle: "eye_pop", eyebrowHeight: 16, eyebrowTilt: 0, headTilt: -8, mouthOpen: 0.75 },
  shock_jaw_drop: { mouthShape: "jaw_drop", eyebrowHeight: 14, mouthOpen: 0.8, headTilt: -6 },
  rage_furious_screaming: { mouthShape: "scream", eyebrowHeight: -8, eyebrowTilt: -16, comicFx: "speed_lines" },
  disgust_gag: { mouthShape: "cringe_wavy", eyebrowHeight: -6, eyebrowTilt: 12, headYaw: -0.5, spineLean: -6 },
  smug_rock_eyebrow: { mouthShape: "wide_grin", eyebrowHeight: 7, eyebrowTilt: -10, gazeX: 0.3, headTilt: 4 },
};

const poseForExpression = (name: string): Pose => {
  if (EXPRESSIONS[name]) return EXPRESSIONS[name];
  // Fall back to the family the name belongs to, so unknown expressions still
  // act rather than rendering as deadpan.
  const family = name.split("_")[0];
  const byFamily: Record<string, string> = {
    rage: "rage_furious_screaming", disgust: "disgust_gag", shock: "shock_eye_pop",
    fear: "shock_eye_pop", confused: "confused_tilted_head", skeptical: "skeptical_side_eye",
    deadpan: "deadpan_classic", smug: "smug_rock_eyebrow", frustration: "facepalm",
    crying: "disgust_gag", sad: "deadpan_slow_blink", laughing: "smug_rock_eyebrow",
  };
  return EXPRESSIONS[byFamily[family] ?? "deadpan_classic"] ?? EXPRESSIONS.deadpan_classic;
};

export interface Performance {
  /** Sample the full acting state for a character at time t. */
  poseAt(id: string, t: number): Pose;
  bodyAt(id: string, t: number): BodyShape;
  /** 0..1 presence: drives entrance/exit so nobody pops in. */
  presenceAt(id: string, t: number): number;
  /** Design-space standing position for an actor. */
  homeAt(id: string): Vec;
  ids: string[];
}

interface ActorTrack {
  poseKeys: PoseKey[];
  bodyKeys: BodyKey[];
  /** [start, end] windows during which this actor is on screen. */
  windows: Array<[number, number]>;
  base: Pose;
  /** Design-space standing position, taken from the director's framing anchor. */
  home: Vec;
  /** Entrance slide direction, so a subject travels in rather than fading up. */
  slideFrom: number;
}

/** Floor line on the 1920x1080 design canvas. */
export const FLOOR_Y = 842;

/** Hip height for a standing figure, so the feet land on the floor. */
const standingHipY = (body: BodyShape): number => FLOOR_Y - (body.thighLen + body.shinLen) * 0.97;

/**
 * Build the performance from a direction plan.
 */
export function buildPerformance(
  plan: DirectionPlan,
  opts: { hostId?: string; basePose?: Pose; entranceSec?: number } = {},
): Performance {
  const hostId = opts.hostId ?? "host";
  const entranceSec = opts.entranceSec ?? 0.22;
  const base: Pose = { ...POSES.idle, ...(opts.basePose ?? {}) };

  const actors = new Map<string, ActorTrack>();
  const hostHome: Vec = [560, standingHipY(BODY_PRESETS.average)];

  // When each subject stops being framed: the last shot tagged for them.
  const framedUntil = new Map<string, number>();
  for (const shot of plan.shots) {
    if (!shot.tag || shot.tag.startsWith("morph:") || shot.tag.startsWith("readout:")) continue;
    framedUntil.set(shot.tag, Math.max(framedUntil.get(shot.tag) ?? 0, shot.end));
  }
  const ensure = (id: string): ActorTrack => {
    let a = actors.get(id);
    if (!a) {
      const anchor: Vec = id === hostId ? hostHome : (plan.anchors[id] ?? hostHome);
      const home: Vec = anchor
        ? [anchor[0], standingHipY(BODY_PRESETS.average)]
        : hostHome;
      const slideFrom = id === hostId ? 0 : home[0] > 960 ? 260 : -260;
      a = {
        poseKeys: [{ t: 0, pose: { ...base, x: home[0], y: home[1] } }],
        bodyKeys: [{ t: 0, body: BODY_PRESETS.average }],
        windows: [],
        base,
        home,
        slideFrom,
      };
      actors.set(id, a);
    }
    return a;
  };
  ensure(hostId);

  for (const ev of plan.events) {
    const target = ev.target ?? hostId;
    const actor = ensure(target);

    if (ev.kind === "expression") {
      const expr = String((ev.payload as Record<string, unknown>).expression ?? "deadpan_classic");
      actor.poseKeys.push({ t: ev.t, pose: { ...poseForExpression(expr) }, ease: "backOut" });
    } else if (ev.kind === "entrance") {
      // Stay only as long as the director keeps framing them, plus a short
      // tail so an exit does not coincide with the cut away.
      const until = Math.min(
        plan.duration,
        Math.max(framedUntil.get(target) ?? ev.t + (ev.duration ?? 1.5), ev.t + (ev.duration ?? 1.5)) + 0.25,
      );
      const dur = until - ev.t;
      actor.windows.push([ev.t, until]);
      // Arrive from off-frame at the anchor, then settle into the held pose.
      actor.poseKeys.push({
        t: ev.t,
        pose: {
          ...POSES.idle, ...poseForExpression("smug_rock_eyebrow"), scale: 1.42,
          x: actor.home[0] + actor.slideFrom, y: actor.home[1], alpha: 0.35,
        },
        ease: "expoOut",
      });
      actor.poseKeys.push({
        t: ev.t + 0.2,
        pose: { ...POSES.idle, ...poseForExpression("smug_rock_eyebrow"), scale: 1.42, x: actor.home[0], y: actor.home[1] },
        ease: "backOut",
      });
      actor.poseKeys.push({ t: ev.t + dur - 0.2, pose: { x: actor.home[0], y: actor.home[1], scale: 1.42 } });
    } else if (ev.kind === "morph") {
      const to = String((ev.payload as Record<string, unknown>).to ?? "");
      const preset: BodyShape | undefined =
        BODY_PRESETS[to] ?? (["leaner", "thinner", "skinnier", "snatched"].includes(to) ? BODY_PRESETS.lean
          : ["bigger", "heavier"].includes(to) ? BODY_PRESETS.heavy : undefined);
      if (preset) {
        const dur = ev.duration ?? 0.8;
        actor.bodyKeys.push({ t: ev.t + dur, body: preset, over: dur });
      }
    }
  }

  // Close every actor's track at the end of the timeline.
  for (const a of actors.values()) {
    const last = a.poseKeys[a.poseKeys.length - 1];
    a.poseKeys.push({ t: plan.duration, pose: { ...last.pose, x: a.home[0], y: a.home[1] } });
    for (const k of a.poseKeys) {
      if (typeof k.pose.x !== "number") k.pose.x = a.home[0];
      if (typeof k.pose.y !== "number") k.pose.y = a.home[1];
    }
    a.poseKeys.sort((x, y) => x.t - y.t);
    a.bodyKeys.sort((x, y) => x.t - y.t);
    if (a.bodyKeys.length === 1) a.bodyKeys.push({ t: plan.duration, body: a.bodyKeys[0].body });
  }

  // Anticipation before each host expression change: the body starts the beat
  // a few frames early, which is what makes a pose read as *chosen*.
  const host = actors.get(hostId);
  if (host) {
    for (let i = host.poseKeys.length - 1; i >= 1; i--) {
      host.poseKeys = withAnticipation(host.poseKeys, i, { lead: 0.2, strength: 0.12 });
    }
  }

  return {
    ids: [...actors.keys()],
    poseAt(id, t) {
      const a = actors.get(id);
      if (!a) return { ...base };
      return samplePose(a.poseKeys, t);
    },
    bodyAt(id, t) {
      const a = actors.get(id);
      return a ? sampleBody(a.bodyKeys, t) : BODY_PRESETS.average;
    },
    homeAt(id) {
      const a = actors.get(id);
      return a ? a.home : hostHome;
    },
    presenceAt(id, t) {
      const a = actors.get(id);
      if (!a) return 0;
      if (id === hostId) return 1;
      for (const [s, e] of a.windows) {
        if (t < s || t > e) continue;
        const inRamp = ramp(t, s, s + entranceSec, "backOut");
        const outRamp = 1 - ramp(t, e - 0.18, e, "cubicIn");
        return Math.max(0, Math.min(1, Math.min(inRamp, outRamp)));
      }
      return 0;
    },
  };
}

/**
 * Secondary motion from pose velocity, sampled symmetrically around t so it
 * stays a pure function of time (no integration, no chunk-boundary drift).
 */
export function secondaryMotion(
  poseAt: (t: number) => Pose,
  t: number,
  dt: number,
): { headLag: number; handLag: { x: number; y: number }; hairLag: number } {
  const now = poseAt(t);
  const prev = poseAt(t - dt);
  const dTilt = (typeof now.headTilt === "number" ? now.headTilt : 0) - (typeof prev.headTilt === "number" ? prev.headTilt : 0);
  const dLean = (typeof now.spineLean === "number" ? now.spineLean : 0) - (typeof prev.spineLean === "number" ? prev.spineLean : 0);
  const dx = (typeof now.x === "number" ? now.x : 0) - (typeof prev.x === "number" ? prev.x : 0);
  const dy = (typeof now.y === "number" ? now.y : 0) - (typeof prev.y === "number" ? prev.y : 0);

  return {
    headLag: -dTilt * 0.55 - dLean * 0.3,
    handLag: { x: -dx * 0.35, y: -dy * 0.35 },
    hairLag: -dLean * 1.6 - dx * 0.12,
  };
}

/** Landing squash for a prop or character arriving: pure function of time. */
export function landingSquash(t: number, landAt: number): { squash: number; stretch: number } {
  if (t < landAt) return { squash: 1, stretch: 1 };
  const e = springFrom(t, landAt, 1.18, 1, SPRING_DEFAULTS.land);
  return { squash: 1, stretch: Number.isFinite(e) ? e : 1 };
}
