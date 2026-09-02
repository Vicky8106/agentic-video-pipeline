/**
 * Deterministic chunk renderer.
 *
 * Renders [start,end) to an .mp4 segment by streaming raw RGBA straight into
 * ffmpeg - no intermediate PNGs, so peak memory stays at one frame. Because
 * frame(t) is pure, any chunk boundary is safe: this replaces the old worker
 * that rebuilt Camera state per chunk and reset at every 60s seam.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { Resvg } from "@resvg/resvg-js";
import { createEngine } from "./Engine.bundle.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const start = parseFloat(arg("start", "0"));
const end = parseFloat(arg("end", "10"));
const fps = parseInt(arg("fps", "24"), 10);
const width = parseInt(arg("width", "1280"), 10);
const height = Math.round((width * 9) / 16);
const outFile = arg("out", "");
const crf = arg("crf", "20");
const preset = arg("preset", "veryfast");

if (!outFile) {
  console.error("--out required");
  process.exit(1);
}
fs.mkdirSync(path.dirname(outFile), { recursive: true });

const FF = "/usr/bin/ffmpeg";
const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf",
].filter((f) => fs.existsSync(f));

const t0 = Date.now();
const engine = createEngine(root, { fps });
const buildMs = Date.now() - t0;

const total = Math.max(0, Math.round((end - start) * fps));
const ffArgs = [
  "-hide_banner", "-loglevel", "error", "-y",
  "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
  "-an", "-c:v", "libx264", "-preset", preset, "-crf", crf,
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  outFile,
];
const ff = spawn(FF, ffArgs, { stdio: ["pipe", "inherit", "inherit"] });

let failed = false;
ff.on("error", (e) => { failed = true; console.error(e.message); });

const opts = {
  fitTo: { mode: "width", value: width },
  font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false },
};

const first = engine.frame(start);
ff.stdin.write(Buffer.from(new Resvg(first.svg, opts).render().pixels));

let rendered = 1;
for (let i = 1; i < total; i++) {
  const t = start + i / fps;
  const frame = engine.frame(t);
  const px = new Resvg(frame.svg, opts).render().pixels;
  if (!ff.stdin.write(Buffer.from(px))) {
    await new Promise((res) => ff.stdin.once("drain", res));
  }
  rendered++;
  if (rendered % 240 === 0) {
    const el = (Date.now() - t0) / 1000;
    process.stdout.write(`  [chunk ${start}-${end}s] ${rendered}/${total} frames  ${(rendered / el).toFixed(1)} fps  ${(el / 60).toFixed(1)}m elapsed\n`);
  }
}

ff.stdin.end();
await new Promise((res) => ff.once("close", res));

const el = (Date.now() - t0) / 1000;
console.log(`[chunk] ${start}-${end}s  frames=${rendered}  wall=${el.toFixed(1)}s  rate=${(rendered / el).toFixed(2)} fps  build=${buildMs}ms  viewBox0=${first.viewBox}`);
if (failed) process.exit(1);
