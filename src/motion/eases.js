/**
 * Named motion palette for the gag pipeline (recipes in MOTION_RESEARCH.md).
 * Re-exports the full src/anim/Easing curve library, then adds the pieces
 * it lacks: cubic-bezier evaluators, named house curves, and a stateful
 * spring integrator. All pure functions of their inputs except springStep,
 * which threads (x, v) explicitly so frames stay independently sampleable.
 */
export * from "../anim/Easing";
import { cubicOut } from "../anim/Easing";
const clamp01 = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);
/** Cubic-bezier evaluator (CSS-style, x monotonic in [0,1]). */
export function bezier(p1x, p1y, p2x, p2y) {
    const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
    const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    return (u) => {
        const x = clamp01(u);
        let lo = 0, hi = 1, t = x;
        for (let i = 0; i < 12; i++) {
            t = (lo + hi) / 2;
            if (sampleX(t) < x)
                lo = t;
            else
                hi = t;
        }
        return sampleY((lo + hi) / 2);
    };
}
/** House liveliness palette: reach for names, never literals. */
export const EASES = {
    enter: bezier(0.16, 1, 0.3, 1),
    balanced: bezier(0.45, 0, 0.55, 1),
    overshoot: bezier(0.34, 1.56, 0.64, 1),
    snapOut: cubicOut,
};
export const SPRINGS = {
    snappy: { stiffness: 200, damping: 20 },
    bouncy: { stiffness: 200, damping: 8 },
    smooth: { stiffness: 120, damping: 200 },
};
/** One semi-implicit-Euler spring step toward target. */
export function springStep(x, v, target, preset, dt) {
    const F = -preset.stiffness * (x - target) - preset.damping * v;
    const nv = v + F * dt;
    return { x: x + nv * dt, v: nv };
}
/**
 * Pop-in: shrink to 90% -> overshoot 106% -> settle at 100%.
 * The spawn recipe: nothing should ever just appear.
 */
export function popIn(u) {
    const x = clamp01(u);
    const ss = (a, b, v) => {
        const k = clamp01((v - a) / (b - a));
        return k * k * (3 - 2 * k);
    };
    if (x < 0.5)
        return 0.9 * ss(0, 0.5, x);
    if (x < 0.8)
        return 0.9 + 0.16 * ss(0.5, 0.8, x);
    return 1.06 - 0.06 * ss(0.8, 1, x);
}
