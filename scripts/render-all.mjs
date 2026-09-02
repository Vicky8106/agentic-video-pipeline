/**
 * Full-timeline render: split into chunks, render with bounded parallelism,
 * concatenate, mux the master audio.
 *
 * Chunking is only correct because frame(t) is pure - see scripts/check-parallel.ts,
 * which proves forward, reversed and interleaved orders hash identically.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = parseInt(arg("fps", "24"), 10);
const width = parseInt(arg("width", "1280"), 10);
const chunkSec = parseFloat(arg("chunk", "60"));
const jobs = parseInt(arg("jobs", "2"), 10);
const outDir = arg("out", path.join(root, "output/render"));
const audio = arg("audio", path.join(root, "..", "2026-08-27_07-40-20_0-chapter-1.mp3"));
const duration = parseFloat(arg("duration", "644.1"));
const only = arg("only", "");   // e.g. "0-120" to render a slice

const tMin = only ? parseFloat(only.split("-")[0]) : 0;
const tMax = only && only.includes("-") ? parseFloat(only.split("-")[1]) : duration;

fs.mkdirSync(outDir, { recursive: true });
const chunkDir = path.join(outDir, "chunks");
fs.mkdirSync(chunkDir, { recursive: true });

const bounds = [];
for (let s = tMin; s < tMax - 0.001; s += chunkSec) {
  bounds.push([s, Math.min(tMax, s + chunkSec)]);
}
console.log(`render ${tMin}-${tMax}s @${fps}fps ${width}p  chunks=${bounds.length}  jobs=${jobs}`);

const run = (cmd, args, opts = {}) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "inherit", "inherit"], ...opts });
    p.on("error", reject);
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}`))));
  });

let next = 0;
let done = 0;
const wall0 = Date.now();

async function worker(id) {
  for (;;) {
    const i = next++;
    if (i >= bounds.length) return;
    const [s, e] = bounds[i];
    const outFile = path.join(chunkDir, `c${String(i).padStart(3, "0")}.mp4`);
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1024) {
      console.log(`  skip chunk ${i} (${s}-${e}s) already rendered`);
    } else {
      const t = Date.now();
      await run(process.execPath, [
        path.join(root, "scripts/render-chunk-engine.mjs"),
        "--start", String(s), "--end", String(e), "--fps", String(fps),
        "--width", String(width), "--out", outFile,
      ]);
      done++;
      const el = (Date.now() - wall0) / 1000;
      console.log(`  chunk ${i} done (${((Date.now() - t) / 1000).toFixed(0)}s)  ${done}/${bounds.length}  elapsed ${(el / 60).toFixed(1)}m`);
    }
  }
}

await Promise.all(Array.from({ length: jobs }, (_, i) => worker(i)));

const list = path.join(outDir, "concat.txt");
fs.writeFileSync(list, bounds.map((_, i) => `file '${path.resolve(chunkDir, `c${String(i).padStart(3, "0")}.mp4`)}'`).join("\n") + "\n");

const silent = path.join(outDir, "video-silent.mp4");
await run("/usr/bin/ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", silent]);
console.log("concatenated");

const finalOut = path.join(outDir, "final.mp4");
const audioArgs = fs.existsSync(audio)
  ? ["-i", audio, "-map", "0:v:0", "-map", "1:a:0", "-c:a", "aac", "-b:a", "192k", "-shortest"]
  : ["-map", "0:v:0"];
await run("/usr/bin/ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y", "-i", silent, ...audioArgs,
  "-c:v", "copy", "-movflags", "+faststart", finalOut,
]);

console.log(`\nDONE -> ${finalOut}  (${(fs.statSync(finalOut).size / 1e6).toFixed(1)} MB)  wall ${((Date.now() - wall0) / 60000).toFixed(1)}m`);
