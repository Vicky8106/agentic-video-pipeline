/**
 * Comedic Object & Motion Graphics Animation Engine.
 *
 * Implements Disney & YouTube animation principles for physical comedy props:
 *   - Squash & Stretch Spawn: Elastic pop-in with volume preservation.
 *   - Impact Slam: Fast drop with screen-shake coupling and dust particles.
 *   - 1-2-3 Progressive Reveal: Orchestrates multi-step visual escalations.
 *   - Floating / Wobble Physics: Living secondary motion so props don't feel dead.
 */

import { backOut, elasticOut, expoOut, cubicInOut } from "./Easing";

export interface MotionTransform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
  shakeOffset?: { x: number; y: number };
}

/**
 * Animate a pop-in spawn with squash and stretch.
 * @param t Elapsed time in seconds since spawn trigger
 * @param duration Total spawn animation duration (typically 0.25s)
 * @param basePos Base [x, y] target coordinate
 */
export function popInSquash(
  t: number,
  duration = 0.25,
  basePos = { x: 0, y: 0 },
): MotionTransform {
  if (t <= 0) {
    return { x: basePos.x, y: basePos.y, scaleX: 0, scaleY: 0, rotation: 0, opacity: 0 };
  }
  if (t >= duration) {
    return { x: basePos.x, y: basePos.y, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 };
  }

  const progress = t / duration;
  const k = backOut(progress);
  
  // Volume-preserving squash & stretch: when springing past 1.0, squash height slightly
  const scale = Math.max(0, k);
  const squashFactor = 1 + (scale - 1) * 0.5;
  const stretchFactor = 1 / Math.max(0.01, squashFactor);

  return {
    x: basePos.x,
    y: basePos.y,
    scaleX: scale * squashFactor,
    scaleY: scale * stretchFactor,
    rotation: (1 - progress) * -8, // subtle settling rotation
    opacity: Math.min(1, progress * 3),
  };
}

/**
 * Animate a stamp or heavy object slamming down from above.
 * @param t Elapsed time in seconds
 * @param dropDuration Duration of the fall (e.g. 0.16s)
 * @param basePos Target landing position
 * @param startYOffset Height above target where drop begins (default 400px)
 */
export function slamDrop(
  t: number,
  dropDuration = 0.16,
  basePos = { x: 0, y: 0 },
  startYOffset = 400,
): MotionTransform & { impactOccurred: boolean; screenShake: number } {
  if (t <= 0) {
    return {
      x: basePos.x,
      y: basePos.y - startYOffset,
      scaleX: 0.9,
      scaleY: 1.2,
      rotation: 0,
      opacity: 0,
      impactOccurred: false,
      screenShake: 0,
    };
  }

  if (t < dropDuration) {
    const k = Math.pow(t / dropDuration, 2); // Acceleration under gravity
    return {
      x: basePos.x,
      y: basePos.y - startYOffset * (1 - k),
      scaleX: 0.95,
      scaleY: 1.15, // stretched during fall
      rotation: 0,
      opacity: 1,
      impactOccurred: false,
      screenShake: 0,
    };
  }

  // Post-impact squash settle (pure object physics, zero camera shake)
  const settleT = t - dropDuration;
  const settleDuration = 0.22;
  const settleK = Math.min(1, settleT / settleDuration);

  // Rebound squash
  const squashK = Math.sin(settleK * Math.PI) * Math.max(0, 1 - settleK);
  const scaleX = 1 + squashK * 0.35;
  const scaleY = 1 - squashK * 0.25;

  return {
    x: basePos.x,
    y: basePos.y,
    scaleX,
    scaleY,
    rotation: 0,
    opacity: 1,
    impactOccurred: true,
    screenShake: 0,
    shakeOffset: { x: 0, y: 0 },
  };
}

/**
 * Generate a subtle breathing / hovering float for background props.
 */
export function floatingHover(
  timeSec: number,
  freq = 2.0,
  amplitude = 6.0,
): { dy: number; drot: number } {
  const dy = Math.sin(timeSec * freq) * amplitude;
  const drot = Math.cos(timeSec * freq * 0.7) * 1.5;
  return { dy, drot };
}

/**
 * Harmonically oscillating pendulum swing with angular velocity.
 */
export function harmonicSwing(
  timeSec: number,
  freq = 1.4,
  maxAngle = 35,
): { angle: number; velocity: number } {
  const angle = Math.sin(timeSec * freq * 2 * Math.PI) * maxAngle;
  const velocity = Math.cos(timeSec * freq * 2 * Math.PI) * maxAngle;
  return { angle, velocity };
}

/**
 * Spiral vortex suction for objects entering a trash/dumpster or portal.
 */
export function vortexSwirl(
  t: number,
  duration = 0.8,
  startPos = { x: 0, y: 0 },
  targetPos = { x: 0, y: 0 },
): MotionTransform {
  if (t <= 0) {
    return { x: startPos.x, y: startPos.y, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1 };
  }
  if (t >= duration) {
    return { x: targetPos.x, y: targetPos.y, scaleX: 0, scaleY: 0, rotation: 720, opacity: 0 };
  }

  const p = t / duration;
  const invP = 1 - p;
  const angle = p * 4 * Math.PI;
  const radius = invP * 120;

  const currentCenterX = startPos.x + (targetPos.x - startPos.x) * (p * p);
  const currentCenterY = startPos.y + (targetPos.y - startPos.y) * (p * p);

  return {
    x: currentCenterX + Math.cos(angle) * radius,
    y: currentCenterY + Math.sin(angle) * radius,
    scaleX: invP,
    scaleY: invP,
    rotation: p * 720,
    opacity: Math.min(1, invP * 1.5),
  };
}

/**
 * Multi-particle radial burst.
 */
export function particleBurst(
  t: number,
  count = 8,
  duration = 0.5,
  maxRadius = 160,
): Array<{ x: number; y: number; radius: number; opacity: number }> {
  if (t <= 0 || t >= duration) return [];
  const p = t / duration;
  const out = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI + i * 0.5;
    const speed = 0.7 + (i % 3) * 0.2;
    const r = p * maxRadius * speed;
    out.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      radius: Math.max(1, (1 - p) * (10 + (i % 4) * 4)),
      opacity: (1 - p),
    });
  }
  return out;
}
