/**
 * check-sheet: validate an agent-authored director sheet before rendering.
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/check-sheet.ts --sheet sheets/x.beats.json [--srt story.srt]
 *
 * Exit 0 when the sheet is render-safe (warnings allowed, printed).
 * Exit 2 when it has zero usable beats. Prints the manifest line so the
 * agent can confirm asset counts before spending render time.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSrt } from "../src/subtitles/SrtParser.js";
import { buildTranscript } from "../src/subtitles/Transcript.js";
import { validateSheet } from "../src/director/DirectorSheet.js";
import { summarizeBeatManifest, formatManifestLine } from "../src/director/BeatManifest.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const get = (name: string, fallback = "") => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};

const sheetArg = get("--sheet");
if (!sheetArg) {
  console.error("Usage: tsx scripts/check-sheet.ts --sheet <beats.json> [--srt <story.srt>]");
  process.exit(2);
}
const sheetPath = path.isAbsolute(sheetArg) ? sheetArg : path.join(root, sheetArg);
const raw = JSON.parse(fs.readFileSync(sheetPath, "utf8"));

let windowStart = 0;
let windowEnd = Number.MAX_SAFE_INTEGER;
const srtArg = get("--srt");
if (srtArg) {
  const srtPath = path.isAbsolute(srtArg) ? srtArg : path.join(root, srtArg);
  const tr = buildTranscript(parseSrt(fs.readFileSync(srtPath, "utf8")));
  windowEnd = tr.duration;
}

const { beats, warnings } = validateSheet(raw, windowStart, windowEnd);
if (beats.length === 0) {
  console.error("[check-sheet] FAIL: zero usable beats");
  for (const w of warnings) console.error(`[check-sheet] WARN ${w}`);
  process.exit(2);
}
const manifest = summarizeBeatManifest(beats);
console.log(`[check-sheet] beats=${beats.length} range=${beats[0].startSec.toFixed(1)}-${beats[beats.length - 1].endSec.toFixed(1)}s`);
console.log(`[check-sheet] ${formatManifestLine(manifest)}`);
const withDrops = beats.filter((b) => (b.dropKinds?.length ?? 0) > 0).length;
console.log(`[check-sheet] beats with dropKinds=${withDrops}`);
for (const w of warnings.slice(0, 10)) console.warn(`[check-sheet] WARN ${w}`);
console.log("[check-sheet] OK");
