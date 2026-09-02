/**
 * Motion metric measured from a finished video file.
 *
 * Decodes a window and reports the share of pixels that change between
 * consecutive frames. This is the number that distinguishes an animated film
 * from a slideshow, and it is computed on encoded output rather than in-memory
 * frames, so it also catches anything the encoder smoothed away.
 *
 * usage: node measure-motion.mjs <video> [startSec] [endSec]
 */
import { spawn } from "child_process";

const [file, sArg, eArg] = process.argv.slice(2);
if (!file) { console.error("usage: measure-motion.mjs <video> [start] [end]"); process.exit(1); }
const start = parseFloat(sArg ?? "0");
const end = parseFloat(eArg ?? "10");
const W = 320, H = 180;   // downsampled: motion fraction is scale-invariant, 40x cheaper

const ff = spawn("/usr/bin/ffmpeg", [
  "-hide_banner", "-loglevel", "error",
  "-ss", String(start), "-t", String(end - start),
  "-i", file,
  "-f", "rawvideo", "-pix_fmt", "gray", "-s", `${W}x${H}`, "-",
], { stdio: ["ignore", "pipe", "inherit"] });

const chunks = [];
let total = 0;
for await (const c of ff.stdout) { chunks.push(c); total += c.length; }
const code = await new Promise((r) => ff.on("close", r));
if (code !== 0) { console.error(`ffmpeg exit ${code}`); process.exit(1); }

const frameBytes = W * H;
const n = Math.floor(total / frameBytes);
const buf = Buffer.concat(chunks, total);

const diffs = [];
for (let f = 1; f < n; f++) {
  const a = f - 1, b = f;
  let changed = 0;
  const oa = a * frameBytes, ob = b * frameBytes;
  for (let p = 0; p < frameBytes; p += 3) {
    if (Math.abs(buf[oa + p] - buf[ob + p]) > 8) changed++;
  }
  diffs.push((changed / (frameBytes / 3)) * 100);
}

const sorted = [...diffs].sort((x, y) => x - y);
const mean = diffs.reduce((a, b) => a + b, 0) / Math.max(1, diffs.length);
const p = (q) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];

console.log(`${file}  [${start}-${end}s]  frames=${n}`);
console.log(`  mean=${mean.toFixed(2)}%  median=${p(0.5).toFixed(2)}%  p10=${p(0.1).toFixed(2)}%  p90=${p(0.9).toFixed(2)}%  max=${sorted[sorted.length-1].toFixed(2)}%`);
console.log(`  dead frames (<0.05%): ${diffs.filter((d) => d < 0.05).length}/${diffs.length}  (${((diffs.filter((d) => d < 0.05).length / Math.max(1, diffs.length)) * 100).toFixed(1)}%)`);
console.log(`  pop frames (>12% in one frame): ${diffs.filter((d) => d > 12).length}`);
