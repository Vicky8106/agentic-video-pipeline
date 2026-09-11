/**
 * WordTiming: real word-timing alignment hook with synthetic fallback.
 *
 * Truth path: forced-alignment output (e.g. whisper/rhubarb word timings
 * saved as `<script>.words.json`) supplies the real per-word grid. The
 * renderer and the director both consume `Word[]`, so one hook fixes every
 * downstream driver at once.
 *
 * Fallback: when no sidecar exists (or it fails validation), word timings
 * are distributed synthetically inside each cue by
 * `buildWordTimings` — deterministic and accurate to a couple of frames.
 *
 * Sidecar format (JSON array, one entry per spoken word in order):
 *   [{ "text": "hello", "start": 1.2, "end": 1.45 }, ...]
 * `word` is accepted as an alias for `text`.
 */
import fs from "node:fs";
import { buildWordTimings, buildSentences, wordAt } from "./Transcript.js";
function asSidecarEntries(parsed) {
    if (!Array.isArray(parsed) || parsed.length === 0)
        return null;
    const out = [];
    for (const r of parsed) {
        const o = r;
        const text = typeof o.text === "string" ? o.text : typeof o.word === "string" ? o.word : null;
        const start = Number(o.start);
        const end = Number(o.end);
        if (text === null || !Number.isFinite(start) || !Number.isFinite(end) || end <= start)
            return null;
        out.push({ text, start, end });
    }
    // Must be time-ordered (allow tiny jitter).
    for (let i = 1; i < out.length; i++) {
        if (out[i].start < out[i - 1].start - 1e-6)
            return null;
    }
    return out;
}
/** Load + validate a sidecar file. Returns null when unusable (fallback). */
export function tryLoadForcedAlign(sidecarPath) {
    try {
        if (!fs.existsSync(sidecarPath))
            return null;
        return asSidecarEntries(JSON.parse(fs.readFileSync(sidecarPath, "utf8")));
    }
    catch {
        return null;
    }
}
const strip = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}$%']/gu, "");
/**
 * Merge real timings onto the synthetic word skeleton. The skeleton owns
 * tokenisation (cue normalisation, sentence flags); the sidecar owns the
 * clock. Merge is 1:1 by order when token cores match; otherwise the
 * sidecar does not describe this script and we fall back.
 */
function mergeTimings(synthetic, entries) {
    if (synthetic.length !== entries.length)
        return null;
    for (let i = 0; i < synthetic.length; i++) {
        if (strip(synthetic[i].text) !== strip(entries[i].text))
            return null;
    }
    return synthetic.map((w, i) => ({ ...w, start: entries[i].start, end: entries[i].end }));
}
export function resolveWordTimings(cues, opts = {}) {
    const synthetic = buildWordTimings(cues);
    const candidates = [
        opts.sidecar,
        opts.srtPath ? `${opts.srtPath}.words.json` : undefined,
    ].filter((p) => !!p);
    for (const path of candidates) {
        const entries = tryLoadForcedAlign(path);
        if (!entries)
            continue;
        const merged = mergeTimings(synthetic, entries);
        if (merged)
            return { words: merged, source: "forced-align", sidecar: path };
    }
    return { words: synthetic, source: "synthetic", sidecar: null };
}
/** Rebuild sentences after swapping in real timings. */
export { buildSentences, wordAt };
/**
 * Word-level punch driver: the clock time of `punchWord` inside `window`.
 * Matches the last occurrence (punch words land at the end of the thought).
 * Returns null when the word is not on the grid (caller holds the beat).
 */
export function punchWordAt(words, punchWord, window) {
    const want = strip(punchWord);
    if (!want)
        return null;
    for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        if (window && (w.start < window.start - 1e-6 || w.end > window.end + 1e-6))
            continue;
        if (strip(w.text) === want)
            return w.start;
    }
    return null;
}
