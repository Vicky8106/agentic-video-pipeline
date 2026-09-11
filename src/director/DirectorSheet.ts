/**
 * DirectorSheet: the coding-agent director's contract with the renderer.
 *
 * No API key, no network. The agent directs by authoring a beats JSON file
 * (seeded by `direct.ts --llm none`, edited by hand), validated by
 * `check-sheet.ts`, and executed by `auto-video.ts --sheet beats.json`.
 *
 * A sheet beat is a MovieBeat (bg, actor look, prop, camera, banner) plus
 * optional per-beat directives the regex director cannot express:
 *   - dropKinds: stage-object kinds the auto path must NOT stage in this
 *     beat (e.g. ["vehicle"] when the sentence similes a ship).
 *
 * All matching is by time overlap against the production beats, so the
 * agent's windows never need to align with sentence boundaries. Pure
 * functions: chunked rendering stays bit-exact.
 */
import type { MovieBeat } from "./ShotTimeline.js";
import { validateBeats } from "./LlmDirector.js";

export type StageKind =
  | "money" | "food" | "device" | "body" | "chart" | "person"
  | "pill" | "sign" | "vehicle" | "object" | "generic";

const STAGE_KINDS = new Set<string>([
  "money", "food", "device", "body", "chart", "person",
  "pill", "sign", "vehicle", "object", "generic",
]);

export interface SheetBeat extends MovieBeat {
  /** Stage-object kinds suppressed while this sheet beat is active. */
  dropKinds?: StageKind[];
}

export interface SheetValidation {
  beats: SheetBeat[];
  warnings: string[];
}

/** Validate a raw parsed sheet file ({beats:[...]} or [...]). Fail-closed. */
export function validateSheet(raw: unknown, windowStart: number, windowEnd: number): SheetValidation {
  const list = Array.isArray(raw) ? raw : (raw as { beats?: unknown }).beats;
  if (!Array.isArray(list) || list.length === 0) {
    return { beats: [], warnings: ["sheet has no beats"] };
  }
  const { beats, warnings } = validateBeats(list, windowStart, windowEnd);
  // Re-attach per-beat directives by startSec proximity (validateBeats
  // preserves time order, so a nearest match is unambiguous).
  const raws = (list as Array<Record<string, unknown>>).map((r) => ({
    startSec: Number(r.startSec),
    dropKinds: r.dropKinds,
  }));
  const out: SheetBeat[] = beats.map((b) => {
    let raw: { startSec: number; dropKinds: unknown } | undefined;
    for (const r of raws) {
      if (!Number.isFinite(r.startSec)) continue;
      if (Math.abs(r.startSec - b.startSec) < 1e-3) { raw = r; break; }
    }
    const sheet: SheetBeat = b as SheetBeat;
    const drop = Array.isArray(raw?.dropKinds)
      ? (raw.dropKinds as unknown[]).filter((k): k is StageKind =>
        typeof k === "string" && STAGE_KINDS.has(k)) : [];
    if (drop.length > 0) sheet.dropKinds = drop;
    else if (Array.isArray(raw?.dropKinds) && (raw.dropKinds as unknown[]).length > 0) {
      warnings.push(`sheet beat @${b.startSec.toFixed(1)}s: unknown dropKinds ignored`);
    }
    return sheet;
  });
  return { beats: out, warnings };
}

/** Sheet beat with the largest time overlap over [start, end), if any. */
export function sheetCovering(
  sheet: readonly SheetBeat[],
  start: number,
  end: number,
): SheetBeat | null {
  let best: SheetBeat | null = null;
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
export function sheetAt(sheet: readonly SheetBeat[], t: number): SheetBeat | null {
  for (const b of sheet) {
    if (t >= b.startSec && t < b.endSec) return b;
  }
  return null;
}
