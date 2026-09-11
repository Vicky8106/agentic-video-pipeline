/** Downgrade path: a MovieBeat renders as a tableau ShowBeat. */
export function movieBeatToTableau(b, beatType = "tableau") {
    return {
        beatId: b.beatId,
        startSec: b.startSec,
        endSec: b.endSec,
        beatType,
        shot: "wide",
        wide: { cx: b.camera.x, cy: b.camera.y, zoom: b.camera.zoom },
        tight: { cx: b.camera.x, cy: b.camera.y, zoom: b.camera.zoom },
        punchAt: b.startSec,
        cast: [{
                id: b.actor.id,
                role: "host",
                gender: b.actor.gender,
                hairStyle: b.actor.hairStyle,
                clothes: b.actor.clothes,
                mark: { x: b.actor.x, y: b.actor.y },
                entrance: { from: b.actor.x < 960 ? "left" : "right", start: b.startSec, end: b.startSec },
                expression: b.actor.expression,
                pose: b.actor.pose,
                scale: b.actor.scale,
            }],
        props: b.activeProp ? [{
                builder: b.activeProp.id,
                at: { x: b.activeProp.x, y: b.activeProp.y },
                cue: { appear: b.startSec, act: b.startSec, settle: b.endSec },
            }] : [],
        srt: b.text,
    };
}
/** Structural validator: returns human-readable errors (empty = valid). */
export function validateShowPlan(plan) {
    const errs = [];
    if (!plan || !Array.isArray(plan.windows) || plan.windows.length === 0) {
        return ["plan has no windows"];
    }
    let prevEnd = -1;
    for (const w of plan.windows) {
        if (!(w.endSec > w.startSec))
            errs.push(`${w.windowId}: endSec <= startSec`);
        if (w.startSec < prevEnd)
            errs.push(`${w.windowId}: overlaps previous window`);
        prevEnd = w.endSec;
        if (!Array.isArray(w.beats) || w.beats.length === 0) {
            errs.push(`${w.windowId}: no beats`);
            continue;
        }
        for (const b of w.beats) {
            if (!(b.endSec > b.startSec))
                errs.push(`${w.windowId} beat ${b.beatId}: endSec <= startSec`);
            if (b.startSec < w.startSec - 1e-6 || b.endSec > w.endSec + 1e-6) {
                errs.push(`${w.windowId} beat ${b.beatId}: outside window bounds`);
            }
            if (b.punchAt < b.startSec - 1e-6 || b.punchAt > b.endSec + 1e-6) {
                errs.push(`${w.windowId} beat ${b.beatId}: punchAt outside beat`);
            }
            for (const c of b.cast ?? []) {
                if (c.entrance.end < c.entrance.start) {
                    errs.push(`${w.windowId} beat ${b.beatId} actor ${c.id}: entrance ends before it starts`);
                }
            }
        }
    }
    return errs;
}
