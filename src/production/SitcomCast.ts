/**
 * SitcomCast — the two-hander layer.
 *
 * The autonomous path used to render ONE male host for the whole movie.
 * Sitcom comedy needs a cast: a host who narrates, plus co-stars (female and
 * male variants) who enter, play the setup, react to the punchline, and share
 * the stage in real two-shots — like a sitcom.
 *
 * Deterministic: casting is a pure function of (beatIndex, role, sentence
 * text). No random state, so chunked rendering stays bit-exact.
 */
import type { StickFigureState, CharacterExpressionId } from "../character/StickFigure";
import type { StageObjectState } from "./SceneMemory";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// ---------------------------------------------------------------------------
// The recurring ensemble. Gender-balanced, sitcom archetypes.
// ---------------------------------------------------------------------------
export interface CastMember {
  actorId: string;
  gender: "male" | "female";
  hairStyle: string;
  clothes: string;
  eyelashes?: boolean;
  blush?: boolean;
  /** Archetype name for the asset manifest. */
  archetype: string;
}

export const ENSEMBLE: CastMember[] = [
  { actorId: "cohost", gender: "female", hairStyle: "female_ponytail", clothes: "dress_pink", eyelashes: true, blush: true, archetype: "ponytail_cohost" },
  { actorId: "blonde", gender: "female", hairStyle: "female_blonde_curls", clothes: "dress_red_carpet", eyelashes: true, blush: true, archetype: "redcarpet_star" },
  { actorId: "goth", gender: "female", hairStyle: "female_gothic_waves", clothes: "dress_black", eyelashes: true, archetype: "goth_deadpan" },
  { actorId: "pixie", gender: "female", hairStyle: "female_pixie_y2k", clothes: "y2k_crop_top_low_rise", eyelashes: true, blush: true, archetype: "y2k_pixie" },
  { actorId: "bun", gender: "female", hairStyle: "female_messy_bun", clothes: "crop_top_leggings", eyelashes: true, archetype: "gym_bun" },
  { actorId: "bob", gender: "female", hairStyle: "female_bob_bangs", clothes: "doctor_scrubs", eyelashes: true, archetype: "doctor_bob" },
  { actorId: "suit", gender: "male", hairStyle: "male_short", clothes: "suit", archetype: "corporate_suit" },
  { actorId: "techbro", gender: "male", hairStyle: "male_tech_bro", clothes: "tech_fleece_vest", archetype: "tech_bro" },
  { actorId: "hoodie", gender: "male", hairStyle: "male_host_curly", clothes: "hoodie", archetype: "hoodie_bro" },
  { actorId: "scrubs", gender: "male", hairStyle: "male_doctor_cap", clothes: "doctor_scrubs", archetype: "surgeon" },
];

// Expressions the co-star uses to REACT to the host's punchlines — the
// sitcom "straight man" grammar: setup lands, co-star deadpans/side-eyes/jaw-
// drops exactly when the punch hits.
export const REACTION_GRAMMAR: Record<string, CharacterExpressionId[]> = {
  punchline: ["skeptical_side_eye", "deadpan_slow_blink", "shock_jaw_drop", "smug_rock_eyebrow"],
  escalation: ["confused_double_take", "fear_wide_eyed_frozen", "frustration_eye_roll", "disgust_eyebrow_raise"],
  setup: ["deadpan_classic", "confused_tilted_head", "smug_chuckle", "deadpan_subtle_nod"],
  explanation: ["deadpan_side_glance", "confused_chin_scratch", "deadpan_classic", "skeptical_raised_brow"],
  reveal: ["shock_eye_pop", "sparkle_anime_eyes", "confused_magnifier", "shock_exclamation"],
  reaction: ["laughing_fountain_tears", "smug_sarcastic_clap", "deadpan_unbothered", "tiny_violin"],
  button: ["smug_chef_kiss", "blissful_serenity", "smug_peace_sign", "deadpan_sipping_coffee"],
  transition: ["sleepy_yawn", "deadpan_phone_scroll", "exhausted_melting", "sad_pout"],
};

/**
 * Which co-star is on stage for beat i? Rotates through the ensemble so the
 * same face never carries two consecutive beats, but each act gets a
 * recurring character (sitcom continuity: the cohost is the "main" co-star
 * and appears most often).
 */
export function castForBeat(beatIndex: number): CastMember {
  // Cohost is the sitcom co-lead: every 3rd beat.
  if (beatIndex % 3 === 1) return ENSEMBLE[0];
  return ENSEMBLE[1 + (beatIndex % (ENSEMBLE.length - 1))];
}

/**
 * Does this beat get a co-star at all? The host always narrates; co-stars
 * appear on ~2/3 of beats (setup/punchline beats get them most — that is
 * where two-person comedy lives).
 */
export function beatHasCoStar(role: string, beatIndex: number): boolean {
  if (role === "punchline" || role === "reaction") return true;
  if (role === "setup") return beatIndex % 2 === 0;
  if (role === "escalation" || role === "reveal") return beatIndex % 3 !== 2;
  return beatIndex % 4 === 1;
}

/**
 * Precompute co-star presence across the WHOLE beat list so there is never a
 * sitcom dead zone: no stretch longer than MAX_GAP_BEATS consecutive beats
 * without a co-star on stage. Returns a Set of beat ids that get co-stars.
 */
export const MAX_GAP_BEATS = 2;
/** No stretch of host-only time longer than this may exist — sitcom rule. */
export const MAX_GAP_SEC = 10;

export function computeCoStarPresence(
  beats: Array<{ id: string; start: number; end: number; role: string }>,
): Set<string> {
  const present = new Set<string>();
  let gapBeats = 0;
  let gapSec = 0;
  for (const b of beats) {
    const beatIndex = Math.round(b.start * 7.13);
    let has = beatHasCoStar(b.role, beatIndex);
    // Force a co-star if skipping this beat would create a dead zone:
    // either 2+ consecutive host-only beats OR 10s+ host-only time.
    if (!has && (gapBeats >= MAX_GAP_BEATS - 1 || gapSec + (b.end - b.start) >= MAX_GAP_SEC)) has = true;
    if (has) { present.add(b.id); gapBeats = 0; gapSec = 0; }
    else { gapBeats++; gapSec += b.end - b.start; }
  }
  return present;
}

export function reactionExpressionFor(role: string, beatIndex: number): CharacterExpressionId {
  const family = REACTION_GRAMMAR[role] ?? REACTION_GRAMMAR.explanation;
  return family[Math.abs(Math.floor(beatIndex)) % family.length];
}

// ---------------------------------------------------------------------------
// Blocking: where does the co-star stand, entrance, and face?
// ---------------------------------------------------------------------------

/** Host stands ~x=450. Co-star enters from the right, stage-right ~x=1250. */
export const CO_STAR_X = 1250;
export const HOST_X = 450;

export interface CoStarState {
  actorId: string;
  present: boolean;
  enterAt: number;   // seconds; walk-in starts here
  settleAt: number;  // walk-in done
  exitAt: number;     // fade/walk-off begins
  role: string;
  state: StickFigureState;
}

/**
 * Compute co-star state for time t within a beat window.
 * Walk-in: a real entrance (legs cycle + horizontal travel + a little hop at
 * the settle), not a teleport. Reactions are timed to the punch moment.
 * Staging varies by ~20s block so compositions don't repeat every beat:
 * the co-star alternates between downstage-right (close, large) and a
 * further, smaller placement — like real sitcom blocking.
 */
export function coStarState(
  member: CastMember,
  beat: { start: number; end: number; role: string },
  t: number,
  punchAt: number | null,
  hostX = HOST_X,
): CoStarState {
  const span = beat.end - beat.start;
  const enterDur = Math.min(0.55, span * 0.35);
  const settleAt = beat.start + enterDur;
  const entrance = clamp((t - beat.start) / Math.max(0.001, enterDur));
  // After settle: idle life (breathing sway), no frozen frames.
  const idle = Math.max(0, t - settleAt);
  const walking = entrance < 0.9;
  // Staging block: changes every ~20s, deterministic.
  const block = Math.floor(beat.start / 20) % 3;
  const starX = block === 0 ? CO_STAR_X : block === 1 ? 1440 : 1090;
  const starScale = block === 0 ? 1.22 : block === 1 ? 1.08 : 1.14;
  const starY = block === 1 ? 640 : 652;
  const travelX = HOST_X + (starX - HOST_X) * smoothstep(entrance);
  // Punch reaction: quick lean-back + head snap, decaying over 0.45s.
  let punchReact = 0;
  if (punchAt !== null && t >= punchAt) {
    punchReact = Math.exp(-(t - punchAt) * 4.5) * Math.sin(Math.min(1, (t - punchAt) * 6));
  }
  const reaction = reactionExpressionFor(beat.role, Math.round(beat.start * 7.13));
  const speaking = false; // narrator is the only voice; co-star mimes
  return {
    actorId: member.actorId,
    present: true,
    enterAt: beat.start,
    settleAt,
    exitAt: beat.end,
    role: beat.role,
    state: {
      x: travelX,
      y: starY + Math.sin(t * 1.6 + hash(member.actorId.length * 13.7)) * 1.8,
      scale: starScale,
      rotation: 0,
      gender: member.gender,
      hairStyle: member.hairStyle as StickFigureState["hairStyle"],
      clothes: member.clothes as StickFigureState["clothes"],
      eyelashes: member.eyelashes,
      blush: member.blush,
      expression: reaction,
      pose: "default",
      spineLean: -punchReact * 7 + Math.sin(t * 1.4 + 1) * 1.5,
      headTilt: punchReact * 8 + Math.sin(t * 1.7 + 2) * 1.2,
      gazeX: clamp((hostX - travelX) / 700, -1, 1), // look AT the host
      gazeY: -0.05,
      gazeTarget: { x: hostX, y: 560 },
      isTalking: false,
      isWalking: walking,
      // Walking gait while entering; conversational idle after settle
      leftLegAngle1: walking ? 118 + Math.sin(t * 8.5) * 24 : 118 + Math.sin(t * 1.3) * 3,
      rightLegAngle1: walking ? 62 - Math.sin(t * 8.5) * 24 : 62 - Math.sin(t * 1.3)  * 3,
      leftArmAngle1: walking ? 150 + Math.sin(t * 8.5 + Math.PI) * 22 : 160 + Math.sin(t * 1.25 + 1) * 4,
      rightArmAngle1: walking ? 30 - Math.sin(t * 8.5) * 22 : 20 + Math.sin(t * 1.25) * 4,
      mouthOpen: speaking ? 0.25 + Math.abs(Math.sin(t * 7)) * 0.2 : 0,
      timeSec: t,
      bodyFacing: walking ? "left" : "left",
      comicFx: punchReact > 0.35 ? "exclamation" : undefined,
      alpha: 1,
    },
  };
}

function timed05(t: number) { return Math.sin(t * 8.5); }
function smoothstep(x: number) { const c = clamp(x); return c * c * (3 - 2 * c); }
function hash(n: number) { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }

/**
 * Render the sitcom two-shot: host on the left, co-star entering from right,
 * both framed when the shot is a "wide"/"host" kind. Called per-frame by
 * AutoProduction — pure function of time.
 */
export function renderSitcomLayer(
  t: number,
  beat: { start: number; end: number; role: string; id?: string },
  punchAt: number | null,
  renderActor: (ctx: { actorId: string; state: StickFigureState; timeSec: number }) => string,
  presence?: Set<string>,
): string {
  const beatIndex = Math.round(beat.start * 7.13);
  if (presence) {
    if (!presence.has(beat.id ?? "")) return "";
  } else if (!beatHasCoStar(beat.role, beatIndex)) {
    return "";
  }
  const member = castForBeat(beatIndex);
  const cs = coStarState(member, beat, t, punchAt);
  return renderActor({ actorId: cs.actorId, state: cs.state, timeSec: t });
}
