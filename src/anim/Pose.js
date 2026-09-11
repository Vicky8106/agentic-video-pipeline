/**
 * Pose interpolation.
 *
 * Scenes emitted discrete pose snapshots gated by booleans, so a pose change
 * landed as a one-frame jump. This turns keyed poses into continuous motion
 * while deliberately NOT interpolating fields that should snap (eye style,
 * mouth shape, costume) - in comedy, facial state changes read better as cuts.
 */
import { ramp } from "./Track";
/** Numeric fields that are safe to blend between poses. */
export const NUMERIC_POSE_FIELDS = [
    "x", "y", "scale", "rotation", "alpha",
    "spineLean", "headTilt", "headYaw",
    "gazeX", "gazeY",
    "eyebrowTilt", "eyebrowHeight",
    "mouthOpen",
    "leftArmAngle1", "leftArmAngle2", "rightArmAngle1", "rightArmAngle2",
    "leftLegAngle1", "leftLegAngle2", "rightLegAngle1", "rightLegAngle2",
    "shoulderWidth", "neckLen", "chestTwist", "hipShift",
    "squash", "stretch",
];
/** Fields that change as a hard cut, never a blend. */
export const DISCRETE_POSE_FIELDS = [
    "expression", "eyeStyle", "mouthShape", "pose", "costume", "comicFx",
    "leftHandProp", "rightHandProp", "blink", "eyebrowRaiseLeft",
];
/** Blend two poses. Fields absent on either side come from `b`. */
export function mixPose(a, b, k) {
    const out = { ...b };
    for (const field of NUMERIC_POSE_FIELDS) {
        const av = a[field];
        const bv = b[field];
        if (typeof av === "number" && typeof bv === "number") {
            out[field] = av + (bv - av) * k;
        }
    }
    return out;
}
/**
 * Sample a pose track at time `t`. Discrete fields switch at the later key,
 * so facial state changes land exactly on the beat boundary.
 */
export function samplePose(keys, t) {
    if (keys.length === 0)
        return {};
    if (t <= keys[0].t)
        return { ...keys[0].pose };
    const last = keys[keys.length - 1];
    if (t >= last.t)
        return { ...last.pose };
    let i = 0;
    while (i < keys.length - 1 && keys[i + 1].t <= t)
        i++;
    const a = keys[i];
    const b = keys[i + 1];
    const k = ramp(t, a.t, b.t, a.ease ?? "cubicInOut");
    return mixPose(a.pose, b.pose, k);
}
/**
 * Quadratic bezier travel between two points, so hands, heads and props move
 * along an arc instead of a straight line. Straight-line limb motion is one of
 * the clearest "this is not animated" tells.
 */
export function arcPoint(from, to, k, bow) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const cx = (from[0] + to[0]) / 2 + nx * bow * len;
    const cy = (from[1] + to[1]) / 2 + ny * bow * len;
    const u = 1 - k;
    return [
        u * u * from[0] + 2 * u * k * cx + k * k * to[0],
        u * u * from[1] + 2 * u * k * cy + k * k * to[1],
    ];
}
/**
 * Anticipation: before committing to a target pose, briefly move away from it.
 */
export function withAnticipation(keys, index, opts = {}) {
    const lead = opts.lead ?? 0.22;
    const strength = opts.strength ?? 0.14;
    if (index <= 0 || index >= keys.length)
        return [...keys];
    const prev = keys[index - 1];
    const cur = keys[index];
    const span = cur.t - prev.t;
    if (span <= 0)
        return [...keys];
    const pullKey = {
        t: prev.t + span * lead,
        pose: mixPose(prev.pose, cur.pose, -strength),
        ease: cur.ease,
    };
    const out = [...keys];
    out.splice(index, 0, pullKey);
    return out;
}
/** Volume-preserving squash & stretch: elongate vertically, narrow horizontally. */
export function squashStretch(squash, stretch) {
    const sy = stretch * squash;
    const sx = 1 / Math.max(0.001, sy);
    return { sx, sy };
}
