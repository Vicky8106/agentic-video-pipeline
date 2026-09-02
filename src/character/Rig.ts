/**
 * Parametric vector rig.
 *
 * Solves the problems the previous rig could not:
 *
 *   - arms attach at real shoulder joints (they used to sprout from the spine,
 *     and the drawn anchor disagreed with the FK anchor by 10 units)
 *   - a neck exists, and the head pivots from its base
 *   - hands rotate with the forearm instead of pointing a fixed direction
 *   - stroke weight is normalised to pixels, so a 2x punch-in does not double
 *     every outline and turn the drawing blobby
 *   - torso silhouette is generated from body widths, so a waist/hip/belly
 *     morph is actually visible
 *   - head yaw, so characters can look at each other rather than only shifting
 *     pupils
 *   - two-bone IK, so a hand can be placed on a prop instead of eyeballed
 */

import { BodyShape, CharacterSpec } from "./CharacterSpec";
import { Pose } from "../anim/Pose";
import { squashStretch } from "../anim/Pose";

export interface Vec2 { x: number; y: number }

const rad = (deg: number): number => (deg * Math.PI) / 180;

const num = (p: Pose, key: string, fallback: number): number => {
  const v = p[key];
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
};

const bool = (p: Pose, key: string, fallback: boolean): boolean => {
  const v = p[key];
  return typeof v === "boolean" ? v : fallback;
};

const str = (p: Pose, key: string, fallback: string): string => {
  const v = p[key];
  return typeof v === "string" ? v : fallback;
};

export interface Skeleton {
  hip: Vec2;
  shoulderL: Vec2;
  shoulderR: Vec2;
  neckBase: Vec2;
  headCenter: Vec2;
  elbowL: Vec2; handL: Vec2;
  elbowR: Vec2; handR: Vec2;
  kneeL: Vec2; footL: Vec2;
  kneeR: Vec2; footR: Vec2;
  headRadius: number;
}

/** Forward kinematics for one limb segment chain. */
function fk(origin: Vec2, a1: number, a2: number, l1: number, l2: number): { joint: Vec2; end: Vec2; endAngle: number } {
  const joint: Vec2 = {
    x: origin.x + Math.cos(rad(a1)) * l1,
    y: origin.y + Math.sin(rad(a1)) * l1,
  };
  const total = a1 + a2;
  const end: Vec2 = {
    x: joint.x + Math.cos(rad(total)) * l2,
    y: joint.y + Math.sin(rad(total)) * l2,
  };
  return { joint, end, endAngle: total };
}

/**
 * Two-bone IK: place the end effector on a target, choosing an elbow/knee
 * direction. Returns null when the target is unreachable, so callers can fall
 * back to FK rather than rendering a broken limb.
 */
export function ikTwoBone(
  origin: Vec2,
  target: Vec2,
  l1: number,
  l2: number,
  bendSign: 1 | -1 = 1,
): { joint: Vec2; end: Vec2 } | null {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const d = Math.hypot(dx, dy);
  if (d > l1 + l2 || d < Math.abs(l1 - l2)) return null;

  const base = Math.atan2(dy, dx);
  const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
  const a = Math.acos(Math.max(-1, Math.min(1, cosA))) * bendSign;

  const joint: Vec2 = {
    x: origin.x + Math.cos(base + a) * l1,
    y: origin.y + Math.sin(base + a) * l1,
  };
  return { joint, end: target };
}

/** Solve the whole figure from a spec, body and pose. */
export function solveSkeleton(spec: CharacterSpec, body: BodyShape, pose: Pose): Skeleton {
  const lean = rad(num(pose, "spineLean", 0));
  const hip: Vec2 = { x: 0, y: 0 };

  // Torso runs up from the hip and rotates about it, so a lean moves the whole
  // chest and head together instead of sliding the head off the neck.
  const up = (len: number, lateral = 0): Vec2 => ({
    x: hip.x + Math.sin(lean) * -len + Math.cos(lean) * lateral,
    y: hip.y - Math.cos(lean) * len - Math.sin(lean) * lateral,
  });

  const chestRise = num(pose, "chestRise", 0);
  const bodySway = num(pose, "bodySway", 0);

  const shoulderY = body.torsoLen;
  const neckBase = up(shoulderY - chestRise * 0.8);
  const headCenter = up(shoulderY + body.neckLen + body.headSize * 46);

  // Breathing lifts and widens the chest; a weight shift slides the hips.
  // Both were previously ignored, which is why the life layer was invisible.
  const breathShoulder = body.shoulderWidth + chestRise * 1.6;
  const sw = breathShoulder;
  const shoulderL: Vec2 = { x: neckBase.x - sw / 2 + bodySway, y: neckBase.y + 6 - chestRise * 0.5 };
  const shoulderR: Vec2 = { x: neckBase.x + sw / 2 + bodySway, y: neckBase.y + 6 - chestRise * 0.5 };

  const armL1 = num(pose, "leftArmAngle1", 150);
  const armL2 = num(pose, "leftArmAngle2", -20);
  const armR1 = num(pose, "rightArmAngle1", 30);
  const armR2 = num(pose, "rightArmAngle2", 20);

  const la = fk(shoulderL, armL1, armL2, body.armLen, body.foreArmLen);
  const ra = fk(shoulderR, armR1, armR2, body.armLen, body.foreArmLen);

  // Optional IK override: a pose may name a hand target instead of angles.
  const targetL = pose.leftHandTarget as Vec2 | undefined;
  const targetR = pose.rightHandTarget as Vec2 | undefined;
  const solvedL = targetL ? ikTwoBone(shoulderL, targetL, body.armLen, body.foreArmLen, 1) : null;
  const solvedR = targetR ? ikTwoBone(shoulderR, targetR, body.armLen, body.foreArmLen, -1) : null;

  const legL1 = num(pose, "leftLegAngle1", 105);
  const legL2 = num(pose, "leftLegAngle2", 10);
  const legR1 = num(pose, "rightLegAngle1", 75);
  const legR2 = num(pose, "rightLegAngle2", -10);

  const hipOffset = num(pose, "hipShift", 0) + bodySway * 0.6;
  const hipL: Vec2 = { x: hip.x - body.hipWidth * 0.22 + hipOffset, y: hip.y };
  const hipR: Vec2 = { x: hip.x + body.hipWidth * 0.22 + hipOffset, y: hip.y };
  const ll = fk(hipL, legL1, legL2, body.thighLen, body.shinLen);
  const lr = fk(hipR, legR1, legR2, body.thighLen, body.shinLen);

  return {
    hip, shoulderL, shoulderR, neckBase, headCenter,
    elbowL: solvedL ? solvedL.joint : la.joint,
    handL: solvedL ? solvedL.end : la.end,
    elbowR: solvedR ? solvedR.joint : ra.joint,
    handR: solvedR ? solvedR.end : ra.end,
    kneeL: ll.joint, footL: ll.end,
    kneeR: lr.joint, footR: lr.end,
    headRadius: body.headSize * 52,
  };
}

export interface RigRenderInput {
  id: string;
  spec: CharacterSpec;
  body: BodyShape;
  pose: Pose;
  /** Pixels per design unit at the current camera framing: stroke normaliser. */
  pxPerUnit: number;
  /** Desired outline weight in *pixels*, held constant across zoom. */
  strokePx?: number;
  /** Secondary motion, computed by the engine from pose velocity. */
  headLag?: number;
  handLag?: { x: number; y: number };
  hairLag?: number;
  /** Audio amplitude 0..1 at this time, for real lip-sync. */
  mouthDrive?: number;
  blinkAmount?: number;
}

/**
 * Render one figure. Origin is the hip; place it with the pose x/y.
 */
export function renderRig(input: RigRenderInput): string {
  const { id, spec, body, pose, pxPerUnit } = input;
  const sk = solveSkeleton(spec, body, pose);

  const x = num(pose, "x", 0);
  const y = num(pose, "y", 0);
  const scale = num(pose, "scale", 1);
  const rotation = num(pose, "rotation", 0);
  const alpha = num(pose, "alpha", 1);

  const sq = num(pose, "squash", 1);
  const st = num(pose, "stretch", 1);
  const { sx, sy } = squashStretch(sq, st);

  // Stroke weight is expressed in design units that *undo* the camera and
  // figure scale, so a line is always ~strokePx pixels on screen.
  const strokePx = input.strokePx ?? 3.2;
  const unit = strokePx / Math.max(0.0001, pxPerUnit * scale);
  const sw = (mult = 1): string => (unit * mult).toFixed(3);

  const line = spec.palette.line;
  const headTilt = num(pose, "headTilt", -4) + (input.headLag ?? 0);
  const yaw = Math.max(-1, Math.min(1, num(pose, "headYaw", 0)));
  const cheek = body.cheekFullness;
  const hr = sk.headRadius;

  // ---- torso: silhouette generated from the body widths, so morphs show up
  const chestRise = num(pose, "chestRise", 0);
  const chestW = body.chestWidth / 2 + chestRise * 0.9;
  const waistW = body.waistWidth / 2;
  const hipW = body.hipWidth / 2;
  const belly = body.belly;
  const nb = sk.neckBase;
  const torsoPath = `
    M ${(-chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    C ${(-chestW - 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(-waistW - 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(-waistW - belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(-waistW - belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    L ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    C ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(waistW + belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(waistW + belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(waistW + 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(chestW + 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    Z`;

  // ---- head: yaw slides and compresses the face, and shifts the hair mass
  const faceShift = yaw * hr * 0.34;
  const faceSquash = 1 - Math.abs(yaw) * 0.16;
  const eyeR = hr * 0.30 * body.eyeSize;
  const eyeGap = hr * 0.42 * body.eyeSpacing * faceSquash;
  const eyeLX = -eyeGap + faceShift;
  const eyeRX = eyeGap + faceShift;
  const eyeY = -hr * 0.10;

  const blink = Math.max(0, Math.min(1, input.blinkAmount ?? 0));
  const mouthOpen = Math.max(0, Math.min(1, input.mouthDrive ?? num(pose, "mouthOpen", 0)));
  const mouthShape = str(pose, "mouthShape", "smile_teeth");
  const mouthY = hr * 0.52;
  const mouthW = hr * (0.44 + cheek * 0.26);

  const eyes = blink > 0.72
    ? `
      <path d="M ${(eyeLX - eyeR).toFixed(1)} ${eyeY.toFixed(1)} Q ${eyeLX.toFixed(1)} ${(eyeY + eyeR * 0.55).toFixed(1)} ${(eyeLX + eyeR).toFixed(1)} ${eyeY.toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
      <path d="M ${(eyeRX - eyeR).toFixed(1)} ${eyeY.toFixed(1)} Q ${eyeRX.toFixed(1)} ${(eyeY + eyeR * 0.55).toFixed(1)} ${(eyeRX + eyeR).toFixed(1)} ${eyeY.toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`
    : `
      <ellipse cx="${eyeLX.toFixed(1)}" cy="${eyeY.toFixed(1)}" rx="${(eyeR * faceSquash).toFixed(1)}" ry="${eyeR.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
      <ellipse cx="${eyeRX.toFixed(1)}" cy="${eyeY.toFixed(1)}" rx="${(eyeR * faceSquash).toFixed(1)}" ry="${eyeR.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
      <circle cx="${(eyeLX + num(pose, "gazeX", 0.3) * eyeR * 0.5).toFixed(1)}" cy="${(eyeY + num(pose, "gazeY", -0.1) * eyeR * 0.45).toFixed(1)}" r="${(eyeR * 0.42).toFixed(1)}" fill="${line}"/>
      <circle cx="${(eyeRX + num(pose, "gazeX", 0.3) * eyeR * 0.5).toFixed(1)}" cy="${(eyeY + num(pose, "gazeY", -0.1) * eyeR * 0.45).toFixed(1)}" r="${(eyeR * 0.42).toFixed(1)}" fill="${line}"/>`;

  const mouth = renderMouth(mouthShape, mouthW, mouthY, mouthOpen, spec, sw, cheek);

  const brows = `
    <path d="M ${(eyeLX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - num(pose, "eyebrowHeight", 0) * 0.5).toFixed(1)} Q ${eyeLX.toFixed(1)} ${(eyeY - eyeR * 2.1 - num(pose, "eyebrowHeight", 0)).toFixed(1)} ${(eyeLX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - num(pose, "eyebrowHeight", 0) * 0.5 + num(pose, "eyebrowTilt", 0) * 6).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
    <path d="M ${(eyeRX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - num(pose, "eyebrowHeight", 0) * 0.5 - num(pose, "eyebrowTilt", 0) * 6).toFixed(1)} Q ${eyeRX.toFixed(1)} ${(eyeY - eyeR * 2.1 - num(pose, "eyebrowHeight", 0)).toFixed(1)} ${(eyeRX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - num(pose, "eyebrowHeight", 0) * 0.5).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;

  const hair = renderHair(spec, hr, yaw, input.hairLag ?? 0, sw);

  // ---- hands: fingers follow the forearm angle, so they stay attached
  const hand = (p: Vec2, forearmAngle: number, side: 1 | -1): string => {
    const a = rad(forearmAngle);
    const f1 = { x: p.x + Math.cos(a - 0.5) * 16 * side, y: p.y + Math.sin(a - 0.5) * 16 };
    const f2 = { x: p.x + Math.cos(a + 0.45) * 15 * side, y: p.y + Math.sin(a + 0.45) * 15 };
    return `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(body.limbThickness * 0.62).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw()}"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f1.x.toFixed(1)}" y2="${f1.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f2.x.toFixed(1)}" y2="${f2.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>`;
  };

  const lag = input.handLag ?? { x: 0, y: 0 };
  const footY = Math.max(sk.footL.y, sk.footR.y);

  return `
<g id="${id}" transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${(scale * sx).toFixed(4)}, ${(scale * sy).toFixed(4)})" opacity="${alpha}">
  <ellipse cx="0" cy="${(footY + 8).toFixed(1)}" rx="${(body.hipWidth * 1.5).toFixed(1)}" ry="${(body.hipWidth * 0.28).toFixed(1)}" fill="${line}" opacity="0.15"/>

  <g stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- back leg + arm first, so the figure has depth -->
    <path d="M ${sk.hip.x.toFixed(1)} ${hipL().y.toFixed(1)} L ${sk.kneeL.x.toFixed(1)} ${sk.kneeL.y.toFixed(1)} L ${sk.footL.x.toFixed(1)} ${sk.footL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.15)}" opacity="0.75"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.elbowL.x.toFixed(1)} ${sk.elbowL.y.toFixed(1)} L ${sk.handL.x.toFixed(1)} ${sk.handL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.05)}" opacity="0.75"/>
    ${hand({ x: sk.handL.x + lag.x * 0.4, y: sk.handL.y + lag.y * 0.4 }, angleOf(sk.elbowL, sk.handL), -1)}

    <!-- torso -->
    <path d="${torsoPath}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.3)}"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.2)}"/>

    <!-- front leg -->
    <path d="M ${hipR().x.toFixed(1)} ${hipR().y.toFixed(1)} L ${sk.kneeR.x.toFixed(1)} ${sk.kneeR.y.toFixed(1)} L ${sk.footR.x.toFixed(1)} ${sk.footR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>

    <!-- neck -->
    <path d="M ${(sk.neckBase.x - body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x - body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>
    <path d="M ${(sk.neckBase.x + body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x + body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>

    <!-- head -->
    <g transform="translate(${sk.headCenter.x.toFixed(2)}, ${sk.headCenter.y.toFixed(2)}) rotate(${headTilt.toFixed(2)})">
      ${hair.back}
      <ellipse cx="0" cy="0" rx="${(hr * (0.86 + cheek * 0.16) * (body.jawWidth * 0.35 + 0.65)).toFixed(1)}" ry="${(hr * (1.02 + cheek * 0.05)).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.4)}"/>
      ${hair.front}
      <g>${brows}${eyes}${mouth}</g>
    </g>

    <!-- front arm on top -->
    <path d="M ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)} L ${sk.elbowR.x.toFixed(1)} ${sk.elbowR.y.toFixed(1)} L ${sk.handR.x.toFixed(1)} ${sk.handR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>
    ${hand({ x: sk.handR.x + lag.x, y: sk.handR.y + lag.y }, angleOf(sk.elbowR, sk.handR), 1)}
  </g>
</g>`.trim();

  function hipL(): Vec2 { return { x: sk.hip.x - body.hipWidth * 0.22, y: sk.hip.y }; }
  function hipR(): Vec2 { return { x: sk.hip.x + body.hipWidth * 0.22, y: sk.hip.y }; }
}

const angleOf = (a: Vec2, b: Vec2): number => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

function renderMouth(
  shape: string, w: number, y: number, open: number,
  spec: CharacterSpec, sw: (m?: number) => string, cheek: number,
): string {
  const line = spec.palette.line;
  const h = 4 + open * w * 0.85;
  switch (shape) {
    case "deadpan_line":
      return `<line x1="${-w}" y1="${y}" x2="${w}" y2="${y}" stroke="${line}" stroke-width="${sw(1.6)}" stroke-linecap="round"/>`;
    case "smirk":
      return `<path d="M ${-w} ${y + 2} Q 0 ${y + 6} ${w} ${y - 6}" fill="none" stroke="${line}" stroke-width="${sw(1.6)}" stroke-linecap="round"/>`;
    case "open_o":
      return `<ellipse cx="0" cy="${y + 4}" rx="${w * 0.42}" ry="${h * 0.9}" fill="${spec.palette.mouth}" stroke="${line}" stroke-width="${sw(1.4)}"/>`;
    case "scream":
      return `<ellipse cx="0" cy="${y + 6}" rx="${w * 0.72}" ry="${h * 1.5}" fill="${spec.palette.mouth}" stroke="${line}" stroke-width="${sw(1.6)}"/>
              <ellipse cx="0" cy="${y + h * 1.1}" rx="${w * 0.4}" ry="${h * 0.42}" fill="${spec.palette.tongue}"/>`;
    case "cringe_wavy":
      return `<path d="M ${-w} ${y} Q ${-w / 3} ${y - 7} 0 ${y} Q ${w / 3} ${y + 7} ${w} ${y}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;
    default: {
      // The signature Casually Explained rectangular teeth box.
      const top = y - h / 2;
      return `<path d="M ${-w} ${top} L ${w} ${top + 1} L ${w * 0.9} ${top + h} L ${-w * 0.92} ${top + h - 1} Z" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.4)}" stroke-linejoin="round"/>
              ${h > 12 ? `<line x1="${-w * 0.95}" y1="${y}" x2="${w * 0.93}" y2="${y}" stroke="${line}" stroke-width="${sw(0.6)}" opacity="0.35"/>` : ""}
              ${cheek > 0.6 ? `<path d="M ${w + 3} ${y - 2} q 4 4 0 8" fill="none" stroke="${spec.palette.skinShadow}" stroke-width="${sw(1)}"/>` : ""}`;
    }
  }
}

function renderHair(
  spec: CharacterSpec, hr: number, yaw: number, lag: number,
  sw: (m?: number) => string,
): { back: string; front: string } {
  const c = spec.palette.hair;
  const v = spec.body.hairVolume;
  const shift = yaw * hr * 0.2 + lag;
  const line = spec.palette.line;

  switch (spec.hair) {
    case "buzz":
      return {
        back: "",
        front: `<path d="M ${-hr * 0.8 + shift} ${-hr * 0.25} A ${hr * 0.85} ${hr * 0.85} 0 0 1 ${hr * 0.8 + shift} ${-hr * 0.25} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`,
      };
    case "bald":
      return { back: "", front: "" };
    case "long_wave":
      return {
        back: `<path d="M ${-hr * 0.95 + shift} ${-hr * 0.3} C ${-hr * (1.25 * v) + shift} ${hr * 0.9} ${-hr * 1.1 + shift} ${hr * 2.3} ${-hr * 0.55 + shift} ${hr * 2.5} L ${hr * 0.55 + shift} ${hr * 2.5} C ${hr * 1.1 + shift} ${hr * 2.3} ${hr * (1.25 * v) + shift} ${hr * 0.9} ${hr * 0.95 + shift} ${-hr * 0.3} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}" stroke-linejoin="round"/>`,
        front: `<path d="M ${-hr * 0.88 + shift} ${-hr * 0.18} C ${-hr * 0.7 + shift} ${-hr * 1.15} ${hr * 0.75 + shift} ${-hr * 1.2} ${hr * 0.9 + shift} ${-hr * 0.2} C ${hr * 0.45 + shift} ${-hr * 0.62} ${-hr * 0.2 + shift} ${-hr * 0.5} ${-hr * 0.88 + shift} ${-hr * 0.18} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`,
      };
    case "bob":
      return {
        back: `<path d="M ${-hr * 0.98 + shift} ${-hr * 0.2} C ${-hr * 1.15 + shift} ${hr * 0.7} ${-hr * 0.9 + shift} ${hr * 1.15} ${-hr * 0.6 + shift} ${hr * 1.2} L ${hr * 0.6 + shift} ${hr * 1.2} C ${hr * 0.9 + shift} ${hr * 1.15} ${hr * 1.15 + shift} ${hr * 0.7} ${hr * 0.98 + shift} ${-hr * 0.2} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}"/>`,
        front: `<path d="M ${-hr * 0.9 + shift} ${-hr * 0.15} C ${-hr * 0.6 + shift} ${-hr * 1.2} ${hr * 0.8 + shift} ${-hr * 1.15} ${hr * 0.92 + shift} ${-hr * 0.05} C ${hr * 0.3 + shift} ${-hr * 0.55} ${-hr * 0.35 + shift} ${-hr * 0.5} ${-hr * 0.9 + shift} ${-hr * 0.15} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`,
      };
    case "mohawk":
      return {
        back: "",
        front: `<path d="M ${-hr * 0.16 + shift} ${-hr * 0.95} C ${-hr * 0.3 + shift} ${-hr * (1.9 * v)} ${hr * 0.3 + shift} ${-hr * (1.9 * v)} ${hr * 0.16 + shift} ${-hr * 0.95} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`,
      };
    default: // short_swoop
      return {
        back: `<path d="M ${-hr * 0.92 + shift} ${-hr * 0.1} C ${-hr * 1.05 + shift} ${-hr * 1.05} ${hr * 1.05 + shift} ${-hr * 1.1} ${hr * 0.94 + shift} ${-hr * 0.05} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}"/>`,
        front: `<path d="M ${-hr * 0.9 + shift} ${-hr * 0.12} C ${-hr * 0.55 + shift} ${-hr * 1.18} ${hr * 0.85 + shift} ${-hr * 1.05} ${hr * 0.9 + shift} ${-hr * 0.25} C ${hr * 0.35 + shift} ${-hr * 0.72} ${-hr * 0.15 + shift} ${-hr * 0.62} ${-hr * 0.9 + shift} ${-hr * 0.12} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`,
      };
  }
}
