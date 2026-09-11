import { validateBeats } from "./LlmDirector.js";
const STAGE_KINDS = new Set([
    "money", "food", "device", "body", "chart", "person",
    "pill", "sign", "vehicle", "object", "generic",
]);
/** Validate a raw parsed sheet file ({beats:[...]} or [...]). Fail-closed. */
export function validateSheet(raw, windowStart, windowEnd) {
    const list = Array.isArray(raw) ? raw : raw.beats;
    if (!Array.isArray(list) || list.length === 0) {
        return { beats: [], warnings: ["sheet has no beats"] };
    }
    const { beats, warnings } = validateBeats(list, windowStart, windowEnd);
    // Re-attach per-beat directives by startSec proximity (validateBeats
    // preserves time order, so a nearest match is unambiguous).
    const raws = list.map((r) => ({
        startSec: Number(r.startSec),
        dropKinds: r.dropKinds,
    }));
    const out = beats.map((b) => {
        let raw;
        for (const r of raws) {
            if (!Number.isFinite(r.startSec))
                continue;
            if (Math.abs(r.startSec - b.startSec) < 1e-3) {
                raw = r;
                break;
            }
        }
        const sheet = b;
        const drop = Array.isArray(raw?.dropKinds)
            ? raw.dropKinds.filter((k) => typeof k === "string" && STAGE_KINDS.has(k)) : [];
        if (drop.length > 0)
            sheet.dropKinds = drop;
        else if (Array.isArray(raw?.dropKinds) && raw.dropKinds.length > 0) {
            warnings.push(`sheet beat @${b.startSec.toFixed(1)}s: unknown dropKinds ignored`);
        }
        return sheet;
    });
    return { beats: out, warnings };
}
/** Sheet beat with the largest time overlap over [start, end), if any. */
export function sheetCovering(sheet, start, end) {
    let best = null;
    let bestOverlap = 0;
    for (const b of sheet) {
        const overlap = Math.min(end, b.endSec) - Math.max(start, b.startSec);
        if (overlap > bestOverlap + 1e-9) {
            bestOverlap = overlap;
            best = b;
        }
    }
    return bestOverlap > 1e-9 ? best : null;
}
/** Sheet beat active at time t, if any. */
export function sheetAt(sheet, t) {
    for (const b of sheet) {
        if (t >= b.startSec && t < b.endSec)
            return b;
    }
    return null;
}
