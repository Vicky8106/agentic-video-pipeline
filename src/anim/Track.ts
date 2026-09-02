/**
 * Keyframe tracks and analytic springs.
 *
 * Motion must be sampleable at an arbitrary time rather than integrated
 * frame-to-frame. The previous camera held mutable state advanced once per
 * rendered frame, so (a) smoothing depended on frame rate and (b) state leaked
 * across render chunk boundaries. Everything here is a pure function of t.
 */

import { EaseFn, EaseName, resolveEase, cubicInOut } from "./Easing";

export interface Key<T> {
  /** Absolute time in seconds. Keys are sorted on construction. */
  t: number;
  value: T;
  /** Ease applied on the segment that *starts* at this key. */
  ease?: EaseName | EaseFn;
}

export interface Track<T> {
  keys: readonly Key<T>[];
  pre?: T;
  post?: T;
}

const mixNumber = (a: number, b: number, k: number): number => a + (b - a) * k;

export type Vec = readonly [number, number];

const mixVec = (a: Vec, b: Vec, k: number): Vec => [mixNumber(a[0], b[0], k), mixNumber(a[1], b[1], k)];

/**
 * Generic track sampler. Provide `mix` for anything that is not a number or a
 * [number, number] pair (for example a pose object).
 */
export function sampleTrack<T>(
  track: Track<T>,
  t: number,
  mix?: (a: T, b: T, k: number) => T,
): T {
  const keys = track.keys;
  if (keys.length === 0) throw new Error("sampleTrack: track has no keys");
  if (t <= keys[0].t) return track.pre ?? keys[0].value;
  const last = keys[keys.length - 1];
  if (t >= last.t) return track.post ?? last.value;

  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].t <= t) i++;

  const a = keys[i];
  const b = keys[i + 1];
  const span = b.t - a.t;
  const u = span <= 0 ? 1 : (t - a.t) / span;
  const ease = resolveEase(a.ease ?? "cubicInOut");

  if (mix) return mix(a.value, b.value, ease(u));
  return defaultMix(a.value, b.value, ease(u)) as unknown as T;
}

function defaultMix(a: unknown, b: unknown, k: number): unknown {
  if (typeof a === "number" && typeof b === "number") return mixNumber(a, b, k);
  if (Array.isArray(a) && Array.isArray(b)) return mixVec(a as unknown as Vec, b as unknown as Vec, k);
  return k < 0.5 ? a : b;
}

function sortKeys<T>(keys: readonly Key<T>[]): Key<T>[] {
  return [...keys].sort((x, y) => x.t - y.t);
}

export const numberTrack = (
  keys: readonly Key<number>[],
  opts: { pre?: number; post?: number } = {},
): Track<number> => ({ keys: sortKeys(keys), ...opts });

export const vecTrack = (
  keys: readonly Key<Vec>[],
  opts: { pre?: Vec; post?: Vec } = {},
): Track<Vec> => ({ keys: sortKeys(keys), ...opts });

/**
 * A damped spring evaluated in closed form. Because it is analytic, secondary
 * motion (head lag, prop wobble, settle after a landing) survives parallel and
 * chunked rendering with no carried state.
 */
export interface SpringConfig {
  /** Angular frequency. Higher = stiffer, faster. */
  omega: number;
  /** Damping ratio. 1 = critically damped (no overshoot), <1 = overshoots. */
  zeta: number;
}

export const SPRING_DEFAULTS: Record<string, SpringConfig> = {
  camera: { omega: 26, zeta: 0.62 },
  head: { omega: 18, zeta: 0.55 },
  hand: { omega: 14, zeta: 0.42 },
  cloth: { omega: 9, zeta: 0.30 },
  land: { omega: 22, zeta: 0.34 },
};

/** Displacement of a spring released from `start` toward `target` with velocity `v0`. */
export function springAt(
  start: number,
  target: number,
  elapsed: number,
  cfg: SpringConfig,
  v0 = 0,
): number {
  const { omega, zeta } = cfg;
  const x0 = start - target;
  const e = Math.max(0, elapsed);

  if (zeta >= 1) {
    if (Math.abs(zeta - 1) < 1e-6) {
      return target + (x0 + (v0 + omega * x0) * e) * Math.exp(-omega * e);
    }
    const s = omega * Math.sqrt(zeta * zeta - 1);
    const r1 = -zeta * omega + s;
    const r2 = -zeta * omega - s;
    const c2 = (v0 - r1 * x0) / (r2 - r1);
    const c1 = x0 - c2;
    return target + c1 * Math.exp(r1 * e) + c2 * Math.exp(r2 * e);
  }

  const wd = omega * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * omega * e);
  return target + decay * (
    x0 * Math.cos(wd * e) + ((v0 + zeta * omega * x0) / wd) * Math.sin(wd * e)
  );
}

/** Spring that starts moving at `t0`; returns `start` before then. */
export function springFrom(
  t: number,
  t0: number,
  start: number,
  target: number,
  cfg: SpringConfig,
  v0 = 0,
): number {
  if (t < t0) return start;
  return springAt(start, target, t - t0, cfg, v0);
}

/** Convenience: an eased ramp over [t0, t1], clamped to [0,1]. */
export function ramp(t: number, t0: number, t1: number, ease: EaseName | EaseFn = cubicInOut): number {
  if (t1 <= t0) return t >= t1 ? 1 : 0;
  return resolveEase(ease)((t - t0) / (t1 - t0));
}

/** Smooth a lookup over a symmetric window; keeps jittery data readable. */
export function smoothSample(lookup: (t: number) => number, t: number, radius: number, steps = 3): number {
  if (radius <= 0 || steps < 1) return lookup(t);
  let sum = 0;
  let weight = 0;
  for (let i = 0; i < steps; i++) {
    const u = steps === 1 ? 0 : (i / (steps - 1)) * 2 - 1;
    const w = 1 - Math.abs(u) * 0.5;
    sum += lookup(t + u * radius) * w;
    weight += w;
  }
  return weight > 0 ? sum / weight : lookup(t);
}
