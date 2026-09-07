/**
 * Director CLI: SRT in, directed beat sheet JSON out.
 *
 *   npx tsx scripts/direct.ts --srt public/0-chapter-1.srt --out output/beats90.json --llm none --start 0 --end 90
 *   DIRECTOR_API_KEY=... npx tsx scripts/direct.ts --srt public/0-chapter-1.srt --out output/beats.json --llm anthropic --model <model-id>
 *
 * --llm none-child (default): deterministic offline director, no key, no network.
 * --llm anthropic|openai: LLM judgment via DIRECTOR_API_KEY (+ DIRECTOR_ENDPOINT override).
 * Render with: npx tsx scripts/render-gold-plus.ts --beats output/beats90.json --start 0 --end 90 --out output/proof90_video.mp4
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import {
  transcriptToInput,
  buildDirectorPrompt,
  callDirectorLlm,
  validateBeats,
  fallbackDirect,
} from "../src/director/LlmDirector";
import type { MovieBeat } from "../src/director/ShotTimeline";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const get = (name: string, fallback = "") => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};

const srtArg = get("--srt");
const outArg = get("--out", "output/beats.json");
const llm = get("--llm", "none");
const model = get("--model", "");
const windowSec = Number(get("--window", "90"));
const startAt = Number(get("--start", "0"));
const endArg = get("--end", "");
if (!srtArg) {
  console.error("Usage: tsx scripts/direct.ts --srt <file.srt> --out <beats.json> [--llm none|anthropic|openai] [--model id] [--window 90] [--start 0] [--end 90]");
  process.exit(2);
}
if (llm !== "none" && !model) {
  console.error("Fail: --model <model-id> is required when --llm is anthropic|openai");
  process.exit(2);
}
const apiKey = process.env.DIRECTOR_API_KEY ?? "";
if (llm !== "none" && !apiKey) {
  console.error("Fail: DIRECTOR_API_KEY is not set");
  process.exit(2);
}

const srtPath = path.isAbsolute(srtArg) ? srtArg : path.join(root, srtArg);
const outPath = path.isAbsolute(outArg) ? outArg : path.join(root, outArg);
const transcript = buildTranscript(parseSrt(fs.readFileSync(srtPath, "utf8")));
const full = transcriptToInput(transcript);
const endAt = endArg ? Number(endArg) : full.windowEnd;
const sentences = full.sentences.filter((s) => s.end > startAt && s.start < endAt);
if (!sentences.length) throw new Error("No sentences in range");

// Split into directable windows at sentence boundaries.
const windows: Array<{ ws: number; we: number }> = [];
let ws = Math.max(startAt, sentences[0].start);
let wStart = ws;
for (const s of sentences) {
  if (s.start - wStart > windowSec && s.start > wStart) {
    windows.push({ ws: wStart, we: s.start });
    wStart = s.start;
  }
  ws = s.end;
}
windows.push({ ws: wStart, we: Math.min(endAt, ws) });

const allBeats: MovieBeat[] = [];
const allWarnings: string[] = [];
for (const w of windows) {
  const input = {
    sentences: sentences.filter((s) => s.end > w.ws && s.start < w.we),
    windowStart: w.ws,
    windowEnd: w.we,
  };
  if (!input.sentences.length) continue;
  if (llm === "none") {
    for (const b of fallbackDirect(input)) {
      b.beatId = allBeats.length + 1;
      (b.actor as { id: string }).id = `actor_${b.beatId}`;
      allBeats.push(b);
    }
    continue;
  }
  const prompt = buildDirectorPrompt(input);
  const raw = await callDirectorLlm(prompt, {
    provider: llm as "anthropic" | "openai",
    model,
    apiKey,
    endpoint: process.env.DIRECTOR_ENDPOINT || undefined,
  });
  const { beats, warnings } = validateBeats(raw, w.ws, w.we);
  for (const warn of warnings) allWarnings.push(`[${w.ws.toFixed(1)}-${w.we.toFixed(1)}] ${warn}`);
  for (const b of beats) {
    b.beatId = allBeats.length + 1;
    b.actor.id = `actor_${b.beatId}`;
    allBeats.push(b);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({
  metadata: {
    srt: srtArg,
    llm,
    model: model || null,
    range: [startAt, endAt],
    windows: windows.length,
    beats: allBeats.length,
    created: new Date().toISOString(),
  },
  beats: allBeats,
}, null, 2));
for (const w of allWarnings) console.warn(`[direct] WARN ${w}`);
console.log(`[direct] DONE ${outPath} beats=${allBeats.length} windows=${windows.length} warnings=${allWarnings.length}`);
