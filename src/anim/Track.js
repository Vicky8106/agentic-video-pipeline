/**
 * Keyframe tracks and analytic springs.
 *
 * Motion must be sampleable at an arbitrary time rather than integrated
 * frame-to-frame. The previous camera held mutable state advanced once per
 * rendered frame, so (a) smoothing depended on frame rate and (b) state leaked
 * across render chunk boundaries. Everything here is a pure function of t.
 */
import { resolveEase, cubicInOut } from "./Easing";
const mixNumber = (a, b, k) => a + (b - a) * k;
const mixVec = (a, b, k) => [mixNumber(a[0], b[0], k), mixNumber(a[1], b[1], k)];
/**
 * Generic track sampler. Provide `mix` for anything that is not a number or a
 * [number, number] pair (for example a pose object).
 */
export function sampleTrack(track, t, mix) {
    const keys = track.keys;
    if (keys.length === 0)
        throw new Error("sampleTrack: track has no keys");
    if (t <= keys[0].t)
        return track.pre ?? keys[0].value;
    const last = keys[keys.length - 1];
    if (t >= last.t)
        return track.post ?? last.value;
    let i = 0;
    while (i < keys.length - 1 && keys[i + 1].t <= t)
        i++;
    const a = keys[i];
    const b = keys[i + 1];
    const span = b.t - a.t;
    const u = span <= 0 ? 1 : (t - a.t) / span;
    const ease = resolveEase(a.ease ?? "cubicInOut");
    if (mix)
        return mix(a.value, b.value, ease(u));
    return defaultMix(a.value, b.value, ease(u));
}
function defaultMix(a, b, k) {
    if (typeof a === "number" && typeof b === "number")
        return mixNumber(a, b, k);
    if (Array.isArray(a) && Array.isArray(b))
        return mixVec(a, b, k);
    return k < 0.5 ? a : b;
}
function sortKeys(keys) {
    return [...keys].sort((x, y) => x.t - y.t);
}
export const numberTrack = (keys, opts = {}) => ({ keys: sortKeys(keys), ...opts });
export const vecTrack = (keys, opts = {}) => ({ keys: sortKeys(keys), ...opts });
export const SPRING_DEFAULTS = {
    camera: { omega: 26, zeta: 0.62 },
    head: { omega: 18, zeta: 0.55 },
    hand: { omega: 14, zeta: 0.42 },
    cloth: { omega: 9, zeta: 0.30 },
    land: { omega: 22, zeta: 0.34 },
};
/** Displacement of a spring released from `start` toward `target` with velocity `v0`. */
export function springAt(start, target, elapsed, cfg, v0 = 0) {
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
    return target + decay * (x0 * Math.cos(wd * e) + ((v0 + zeta * omega * x0) / wd) * Math.sin(wd * e));
}
/** Spring that starts moving at `t0`; returns `start` before then. */
export function springFrom(t, t0, start, target, cfg, v0 = 0) {
    if (t < t0)
        return start;
    return springAt(start, target, t - t0, cfg, v0);
}
/** Convenience: an eased ramp over [t0, t1], clamped to [0,1]. */
export function ramp(t, t0, t1, ease = cubicInOut) {
    if (t1 <= t0)
        return t >= t1 ? 1 : 0;
    return resolveEase(ease)((t - t0) / (t1 - t0));
}
/** Smooth a lookup over a symmetric window; keeps jittery data readable. */
export function smoothSample(lookup, t, radius, steps = 3) {
    if (radius <= 0 || steps < 1)
        return lookup(t);
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
