/**
 * Squash & stretch helpers (volume-preserving) for StickFigure scaleX/scaleY.
 * k > 0 stretches tall (launch), k < 0 squashes flat (impact).
 * |k| above ~0.35 stops reading as comedy and starts reading as a bug.
 */
export function squash(k) {
    const sy = 1 + k;
    return { scaleX: 1 / Math.max(0.2, sy), scaleY: sy };
}
/** Impact squash from normalized impact speed v in [0,1]. */
export function impactSquash(v, amount = 0.3) {
    const k = Math.min(1, Math.max(0, v));
    return squash(-amount * k);
}
/** Launch stretch from normalized charge c in [0,1]. */
export function launchStretch(c, amount = 0.25) {
    const k = Math.min(1, Math.max(0, c));
    return squash(amount * k);
}
