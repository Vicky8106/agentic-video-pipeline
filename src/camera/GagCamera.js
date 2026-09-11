/**
 * GagCamera: gag-aware camera grammar as pure helpers.
 *
 * One grammar, five moves:
 *   - wide setup ......... 1.00-1.15x, hard cut in (establish the room)
 *   - escalation push .... 1.30-1.50x, slow drift (the joke builds)
 *   - punch-in ........... 1.60-2.20x, fast push ON the punch word
 *   - reaction hold ...... 1.38-1.55x, frozen (let the audience look)
 *   - hard-cut transition  1-frame change on every beat boundary
 *   - freeze hold ........ creep + breathing damped to zero during holds
 *
 * The helpers are additive: the shot list owns the base framing, and the
 * word-level drivers add the punch-in delta and the hold freeze. Nothing
 * here re-times the plan, so chunked rendering stays bit-exact.
 */
export const GAG_ZOOM = {
    /** Wide setup: establish the room. */
    wideSetup: { min: 1.0, max: 1.15 },
    /** Escalation push: the joke builds through tighter framing. */
    escalation: { min: 1.3, max: 1.5 },
    /** Punch-in: lands ON the punch word, never before it. */
    punchIn: { min: 1.6, max: 2.2 },
    /** Reaction hold: frozen framing after the punchline. */
    reaction: { min: 1.38, max: 1.55 },
};
/** Length of the reaction hold after a punchline (seconds). */
export const REACTION_HOLD_SEC = 1.5;
/** Punch-in zoom delta at full energy (added to the base zoom). */
export const PUNCH_DELTA = 0.38;
/** Attack/decay of the punch-in bump (seconds). */
export const PUNCH_ATTACK_SEC = 0.12;
export const PUNCH_DECAY_SEC = 0.9;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/**
 * Additive punch-in zoom delta at time `t` for a punch spoken at `punchAt`.
 * Anticipation dip (~-4% over the 250ms before the word — the camera
 * crouches), then snaps in over ~7 frames and decays into the hold.
 * Cartoon rule: nothing impacts without winding up first.
 */
export const PUNCH_ANTICIPATION_SEC = 0.25;
export const PUNCH_ANTICIPATION_DEPTH = 0.04;
export function punchZoomBoost(t, punchAt, energy = 0.5) {
    if (punchAt === null || !Number.isFinite(punchAt))
        return 0;
    const dt = t - punchAt;
    if (dt < -PUNCH_ANTICIPATION_SEC || dt > PUNCH_DECAY_SEC)
        return 0;
    const peak = PUNCH_DELTA * (0.55 + 0.45 * clamp(energy, 0, 1));
    // Anticipation: ease down into the crouch, deepest just before the snap.
    if (dt < -0.05) {
        const k = 1 - (dt + PUNCH_ANTICIPATION_SEC) / (PUNCH_ANTICIPATION_SEC - 0.05);
        return -PUNCH_ANTICIPATION_DEPTH * Math.sin(Math.PI * clamp(k, 0, 1)) * (0.5 + 0.5 * clamp(energy, 0, 1));
    }
    if (dt < 0)
        return peak * (1 + dt / 0.05) * 0.15;
    const attack = clamp(dt / PUNCH_ATTACK_SEC, 0, 1);
    const attackCurve = 1 - Math.pow(1 - attack, 3);
    const decay = Math.exp(-Math.max(0, dt - PUNCH_ATTACK_SEC) * 2.4);
    return peak * attackCurve * decay;
}
/**
 * Impact squash & stretch from a 0..1 impact phase (rises through the hit,
 * releases after): sx swells as sy squashes, volume preserved like a
 * bouncing ball. Returns multipliers for the actor's scale.
 */
export function impactSquash(phase) {
    const k = clamp(phase, 0, 1);
    const amp = Math.sin(Math.PI * k) * 0.07;
    return { sx: 1 + amp, sy: 1 - amp };
}
/** True while `t` sits in the reaction hold at the tail of a punch beat. */
export function isReactionHoldWindow(t, beat, holdSec = 0.45) {
    if (!beat)
        return false;
    if (beat.role !== "punchline" && beat.role !== "reaction")
        return false;
    return t >= beat.end - holdSec && t <= beat.end + 1e-6;
}
/**
 * Freeze factor 0..1: 1 while a hold/freeze should damp all secondary
 * motion (post-arrival creep, breathing). Ramps over 6 frames each way.
 */
export function freezeFactor(t, beat) {
    if (!isReactionHoldWindow(t, beat))
        return 0;
    if (!beat)
        return 0;
    const edge = Math.min(0.1, 0.25);
    const into = clamp((t - (beat.end - 0.45)) / edge, 0, 1);
    const out = clamp((beat.end - t) / edge + 1, 0, 1);
    return clamp(Math.min(into, out), 0, 1);
}
/** Beat boundaries are hard cuts: the camera arrives in one frame. */
export function isHardCut(t, beatStart) {
    return Math.abs(t - beatStart) < 1 / 24 + 1e-6;
}
/** Clamp a zoom into a grammar band (for audit, not for re-framing). */
export function inBand(zoom, band) {
    const b = GAG_ZOOM[band];
    return zoom >= b.min - 1e-6 && zoom <= b.max + 1e-6;
}
