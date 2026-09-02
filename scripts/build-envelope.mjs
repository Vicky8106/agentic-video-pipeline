/**
 * Decode the master audio to PCM and write an amplitude envelope JSON.
 * Run once per audio file; the renderer loads the result.
 */
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const run = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const audio = args[0] ?? path.join(root, "..", "2026-08-27_07-40-20_0-chapter-1.mp3");
const out = args[1] ?? path.join(root, "public/envelope.json");
const hopMs = Number(args[2] ?? 20);

if (!fs.existsSync(audio)) {
  console.error(`audio not found: ${audio}`);
  process.exit(1);
}

const hop = hopMs / 1000;
const sr = 16000;
console.log(`decoding ${path.basename(audio)} -> ${path.basename(out)} (hop ${hopMs}ms)`);

const tmp = `${out}.pcm`;
await run("/usr/bin/ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y",
  "-i", audio,
  "-f", "s16le", "-ac", "1", "-ar", String(sr),
  tmp,
]);
const pcm = fs.readFileSync(tmp);
fs.unlinkSync(tmp);

const samples = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 2));
const win = Math.max(1, Math.round(sr * hop));

const values = [];
let peak = 1e-6;
for (let i = 0; i + win <= samples.length; i += win) {
  let sum = 0;
  for (let j = 0; j < win; j++) {
    const v = samples[i + j] / 32768;
    sum += v * v;
  }
  const rms = Math.sqrt(sum / win);
  values.push(rms);
  if (rms > peak) peak = rms;
}

const norm = values.map((v) => Math.min(1, v / peak));
fs.writeFileSync(out, JSON.stringify({
  hop,
  sampleRate: sr,
  source: path.basename(audio),
  duration: norm.length * hop,
  values: norm.map((v) => Number(v.toFixed(4))),
}));
console.log(`buckets=${norm.length} duration=${(norm.length * hop).toFixed(2)}s peak=${peak.toFixed(4)}`);
