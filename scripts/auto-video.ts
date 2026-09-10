#!/usr/bin/env node
/**
 * auto-video: script + voice in, finished video out. No per-video tuning.
 *
 *   NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts \
 *     --script story.srt --audio voice.mp3 --out video.mp4
 *
 * What it figures out by itself:
 * - Story beats, staging, props, expressions: from the script sentences
 *   (Director + ProductionCompiler + SceneMemory + SitcomCast).
 * - Camera moves, cuts, punch zooms: from script trigger words, with hard
 *   cuts on sentence boundaries and at most one punch per beat.
 * - Lip-sync truth and emphasis shakes: from the voice amplitude envelope.
 * - Timing master: the audio duration (plain .txt/.md scripts are timed
 *   against it automatically).
 *
 * Defaults: punch-word impact typography stays OFF (opt in with
 * --impact-words); style-pack environmental labels (signage, prop tags)
 * remain, since blank signboards read as broken. Deterministic
 * pure-function frames, sequential chunked render under a 512MB heap.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync, execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { loadScript } from "../src/auto/script.js";
import { probeDuration, buildEnvelope, findPeaks, type AudioEnvelope } from "../src/auto/audio.js";
import type { SubtitleItem } from "../src/subtitles/SrtParser.js";

const args = process.argv.slice(2);
const get = (name: string, fallback = "") => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const flag = (name: string) => args.includes(name);

const scriptArg = get("--script");
const audioArg = get("--audio");
const outArg = get("--out", "output/auto-video.mp4");
const fps = Number(get("--fps", "24"));
const width = Number(get("--width", "1280"));
const style = get("--style", "casually-procedural");
const chunkSec = Number(get("--chunk-sec", "60"));
const capDur = get("--duration") ? Number(get("--duration")) : 0;
const impactWords = flag("--impact-words");
const keepChunks = flag("--keep-chunks");
const stillCount = Number(get("--stills", "6"));

if (!scriptArg || !audioArg) {
  console.error("Usage: tsx scripts/auto-video.ts --script <file.srt|txt|md> --audio <voice.mp3> --out <video.mp4> [--width 1280] [--fps 24] [--chunk-sec 60] [--duration N] [--impact-words]");
  process.exit(2);
}
if (!fs.existsSync(scriptArg)) throw new Error(`Script not found: ${scriptArg}`);
if (!fs.existsSync(audioArg)) throw new Error(`Audio not found: ${audioArg}`);

const height = Math.round((width * 9) / 16);
const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

function fmtSrt(t: number): string {
  const ms = Math.max(0, Math.round(t * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const r = String(ms % 1000).padStart(3, "0");
  return `${h}:${m}:${s},${r}`;
}

function toSrt(cues: SubtitleItem[]): string {
  return cues.map((c) => `${c.id}\n${fmtSrt(c.start)} --> ${fmtSrt(c.end)}\n${c.text}\n`).join("\n");
}

function ffprobeDuration(file: string): number {
  const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], { encoding: "utf8" }).trim();
  return Number(out);
}

async function renderChunk(production: unknown, t0: number, t1: number, file: string, tag: string): Promise<void> {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const ff = spawn("/usr/bin/ffmpeg", [
    "-y", "-hide_banner", "-loglevel", "error",
    "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
    "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
    "-g", "24", "-keyint_min", "24", "-sc_threshold", "0", "-flags", "+cgop",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", file,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.max(1, Math.round((t1 - t0) * fps));
  const resvgOpts = { fitTo: { mode: "width" as const, value: width }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } };
  for (let i = 0; i < frames; i++) {
    const t = Math.min(t1 - 1e-6, t0 + i / fps);
    const { svg } = renderAutoSvgFrame({ production, timeSec: t, width, height, impactWords });
    const pixels = new Resvg(svg, resvgOpts).render().pixels;
    if (!ff.stdin.write(pixels)) await new Promise((r) => ff.stdin.once("drain", r));
    if (i % (fps * 5) === 0) console.log(`[${tag}] ${(100 * i / frames).toFixed(0)}% t=${t.toFixed(1)}s`);
  }
  ff.stdin.end();
  await new Promise<void>((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))));
}

async function main(): Promise<void> {
  console.log(`[auto-video] script=${scriptArg} audio=${audioArg}`);
  const audioDur = probeDuration(audioArg);
  const cues = loadScript(scriptArg, audioDur);
  const srtText = toSrt(cues);
  console.log(`[auto-video] cues=${cues.length} audio=${audioDur.toFixed(2)}s`);

  let envelope: AudioEnvelope = buildEnvelope(audioArg);
  console.log(`[auto-video] envelope buckets=${envelope.values.length}`);

  const production = createAutoProduction(srtText, style, { envelope }) as {
    transcript: { duration: number };
    plan: { events: Array<{ t: number; kind: string; payload: Record<string, unknown>; reason?: string }> };
    productionPlan: { beats: Array<{ start: number; end: number; role: string; energy: number }> };
    envelope: AudioEnvelope;
  };

  let finalDuration = Math.max(audioDur, production.transcript.duration);
  if (capDur > 0) finalDuration = Math.min(finalDuration, capDur);
  // Trim the voice curve to the rendered range.
  const keep = Math.min(envelope.values.length, Math.ceil(finalDuration / envelope.hop));
  production.envelope = { ...envelope, values: envelope.values.slice(0, keep), duration: finalDuration };

  // Voice-driven emphasis: loud peaks inside punchline/escalation beats
  // become shake events (screen energy follows the performance). Capped at
  // one per beat, >=2s apart, so it can never turn into zoom spam.
  const peaks = findPeaks(envelope, 0.55, 2.0).filter((t) => t < finalDuration);
  const existing = production.plan.events.filter((e) => e.kind === "shake" || e.kind === "flash").map((e) => e.t);
  let injected = 0;
  for (const t of peaks) {
    const beat = production.productionPlan.beats.find((b) => t >= b.start && t <= b.end);
    if (!beat || (beat.role !== "punchline" && beat.role !== "escalation")) continue;
    if (production.plan.events.some((e) => e.kind === "shake" && Math.abs(e.t - t) < 1.0)) continue;
    if (existing.some((e) => Math.abs(e - t) < 1.0)) continue;
    production.plan.events.push({ t, kind: "shake", payload: { strength: 0.3, decay: 0.3 }, reason: "voice-peak" });
    existing.push(t);
    injected++;
  }
  production.plan.events.sort((a, b) => a.t - b.t);
  console.log(`[auto-video] beats=${production.productionPlan.beats.length} voice-peaks=${peaks.length} injected=${injected}`);

  // Chunk at beat boundaries: every boundary lands on a hard cut, so the
  // fixed-GOP concat never slices mid-shot and the pure camera track makes
  // boundaries seamless by construction.
  const starts = production.productionPlan.beats.map((b) => b.start).filter((s) => s > 0.5 && s < finalDuration - 1);
  const bounds = [0];
  let acc = 0;
  for (const s of starts) {
    if (s - bounds[bounds.length - 1] >= chunkSec) bounds.push(s);
    acc = s;
  }
  void acc;
  bounds.push(finalDuration);
  console.log(`[auto-video] chunks=${bounds.length - 1} bounds=[${bounds.map((b) => b.toFixed(1)).join(", ")}]`);

  // Bump when renderer code changes so stale chunks never pass resume.
  const PIPELINE_VERSION = 5;
  const chunkDir = path.join(path.dirname(outArg), ".chunks-" + path.basename(outArg, path.extname(outArg)));
  fs.mkdirSync(chunkDir, { recursive: true });
  const metaFile = path.join(chunkDir, "meta.json");
  const meta = { version: PIPELINE_VERSION, width, fps, style, script: path.resolve(scriptArg), audio: path.resolve(audioArg) };
  try {
    const prev = JSON.parse(fs.readFileSync(metaFile, "utf8"));
    if (prev.version !== meta.version || prev.width !== meta.width || prev.fps !== meta.fps || prev.style !== meta.style) {
      console.log("[auto-video] pipeline changed, re-rendering all chunks");
      for (const f of fs.readdirSync(chunkDir)) fs.rmSync(path.join(chunkDir, f), { force: true });
    }
  } catch { /* fresh */ }
  fs.writeFileSync(metaFile, JSON.stringify(meta));
  const chunkFiles: string[] = [];
  for (let i = 0; i < bounds.length - 1; i++) {
    const file = path.join(chunkDir, `c${String(i + 1).padStart(3, "0")}.mp4`);
    chunkFiles.push(file);
    const expected = bounds[i + 1] - bounds[i];
    if (fs.existsSync(file)) {
      try {
        const d = ffprobeDuration(file);
        if (Math.abs(d - expected) < 0.6) {
          console.log(`[chunk ${i + 1}/${bounds.length - 1}] resume ${file} (${d.toFixed(1)}s)`);
          continue;
        }
      } catch { /* re-render */ }
    }
    console.log(`[chunk ${i + 1}/${bounds.length - 1}] ${bounds[i].toFixed(1)}s -> ${bounds[i + 1].toFixed(1)}s`);
    await renderChunk(production, bounds[i], bounds[i + 1], file, `chunk ${i + 1}/${bounds.length - 1}`);
  }

  const listFile = path.join(chunkDir, "list.txt");
  // Absolute paths: concat resolves entries relative to the list file.
  fs.writeFileSync(listFile, chunkFiles.map((f) => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join("\n") + "\n");
  const silent = path.join(chunkDir, "silent.mp4");
  let r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silent]);
  if (r.status !== 0) throw new Error("concat failed");
  fs.mkdirSync(path.dirname(outArg), { recursive: true });
  r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-i", silent, "-i", audioArg,
    "-map", "0:v:0", "-map", "1:a:0", "-t", String(finalDuration),
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-af", "apad", "-movflags", "+faststart", outArg]);
  if (r.status !== 0) throw new Error("mux failed");

  const stillDir = path.join(path.dirname(outArg), "stills-" + path.basename(outArg, path.extname(outArg)));
  fs.mkdirSync(stillDir, { recursive: true });
  for (let i = 0; i < stillCount; i++) {
    const t = (finalDuration * (i + 0.5)) / stillCount;
    spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-ss", String(t.toFixed(2)), "-i", outArg, "-frames:v", "1", path.join(stillDir, `still_${i + 1}.png`)]);
  }
  if (!keepChunks) {
    for (const f of chunkFiles) fs.rmSync(f, { force: true });
    fs.rmSync(silent, { force: true });
    fs.rmSync(listFile, { force: true });
  }
  const got = ffprobeDuration(outArg);
  console.log(`[auto-video] DONE ${outArg} duration=${got.toFixed(2)}s stills=${stillDir}`);
}

main().catch((err) => {
  console.error(`[auto-video] FAIL ${err?.message ?? err}`);
  process.exit(1);
});
