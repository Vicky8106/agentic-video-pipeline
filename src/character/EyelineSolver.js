/**
 * Actor Interaction & Mutual Eyeline Solver.
 * Solves character-to-character eye contact, prop tracking, and comedic double-take sequences.
 * Prevents lifeless static gazes and detached actors.
 */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
/**
 * Solves mutual eye contact between two actors on stage.
 * Returns gaze and head orientation for actorA looking at actorB.
 */
export function solveMutualGaze(actorA, actorB) {
    const scaleA = actorA.scale ?? 1.2;
    const scaleB = actorB.scale ?? 1.2;
    const headA_Y = actorA.y + (actorA.headOffsetY ?? -120) * scaleA;
    const headB_Y = actorB.y + (actorB.headOffsetY ?? -120) * scaleB;
    const dx = actorB.x - actorA.x;
    const dy = headB_Y - headA_Y;
    const dist = Math.hypot(dx, dy) || 1;
    // Horizontal gaze: Normalized, clamped to [-1, 1]
    const gazeX = clamp(dx / (dist * 0.65), -1, 1);
    // Vertical gaze: Looking up (negative) or looking down (positive)
    const gazeY = clamp(dy / (dist * 0.7), -1, 1);
    // Natural head tilt toward the conversational partner
    const headTilt = clamp((dy / dist) * 14 + (dx > 0 ? 3 : -3), -18, 18);
    const bodyFacing = dx >= 0 ? "right" : "left";
    return {
        gazeX: Number(gazeX.toFixed(3)),
        gazeY: Number(gazeY.toFixed(3)),
        headTilt: Number(headTilt.toFixed(2)),
        bodyFacing,
    };
}
/**
 * Solves an actor looking down or up at a specific world object/prop (e.g. barbell, mop, anchor).
 */
export function solvePropGaze(actor, propX, propY) {
    const scale = actor.scale ?? 1.2;
    const headY = actor.y + (actor.headOffsetY ?? -120) * scale;
    const dx = propX - actor.x;
    const dy = propY - headY;
    const dist = Math.hypot(dx, dy) || 1;
    const gazeX = clamp(dx / (dist * 0.6), -1, 1);
    const gazeY = clamp(dy / (dist * 0.6), -1, 1);
    const headTilt = clamp((dy / dist) * 16, -20, 20);
    const bodyFacing = dx >= 0 ? "right" : "left";
    return {
        gazeX: Number(gazeX.toFixed(3)),
        gazeY: Number(gazeY.toFixed(3)),
        headTilt: Number(headTilt.toFixed(2)),
        bodyFacing,
    };
}
/**
 * Solves fourth-wall camera break (looking straight down the camera lens at the audience).
 */
export function solveCameraGaze() {
    return {
        gazeX: 0.0,
        gazeY: 0.0,
        headTilt: 0.0,
        bodyFacing: "right",
    };
}
/**
 * Executes a 3-beat classic comedy double-take:
 * 1. [0.0s - 0.9s] Looks down at the ridiculous prop/weight in disbelief.
 * 2. [0.9s - 1.8s] Snaps head up to stare at the rival actor in shock.
 * 3. [1.8s+] Hard snap straight into the camera lens with deadpan/frozen stare.
 */
export function solveComedicDoubleTake(params) {
    const { actor, propPos, rival, timeInBeat } = params;
    if (timeInBeat < 0.9) {
        // Stage 1: Staring in disbelief at the prop
        const propGaze = solvePropGaze(actor, propPos.x, propPos.y);
        return {
            ...propGaze,
            eyeStyle: "squint",
            expression: "confused_squint",
        };
    }
    else if (timeInBeat < 1.8) {
        // Stage 2: Shock snap to the rival actor
        const rivalGaze = solveMutualGaze(actor, rival);
        return {
            ...rivalGaze,
            eyeStyle: "eye_pop",
            expression: "shock_jaw_drop",
        };
    }
    else {
        // Stage 3: Snap into the camera lens (breaking fourth wall)
        const camGaze = solveCameraGaze();
        return {
            ...camGaze,
            eyeStyle: "deadpan_dots",
            expression: "deadpan_slow_blink",
        };
    }
}
