#!/usr/bin/env node
/**
 * Sitcom full production renderer — chunked & RAM-safe.
 *
 *   npx tsx scripts/render-sitcom.ts --start 0 --end 644.1 --out output/sitcom_full.mp4
 *
 * Renders the AutoProduction path (sentence-scenes, sitcom cast, impact
 * typography) to raw RGBA streamed into ffmpeg — peak memory is one frame.
 * Chunked sequential execution keeps total RAM well under the 1 GB cap.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const start = parseFloat(arg("start", "0"));
const end = parseFloat(arg("end", "643.53"));
const fps = parseInt(arg("fps", "24"), 10);
const width = parseInt(arg("width", "1280"), 10);
const height = Math.round((width * 9) / 16);
const outFile = arg("out", path.join(root, "output", "sitcom_full.mp4"));
const crf = arg("crf", "20");
const styleId = arg("style", "casually-procedural");

fs.mkdirSync(path.dirname(outFile), { recursive: true });

const srtFile = [
  path.join(root, "public", "0-chapter-1.srt"),
  path.join(root, "public", "subtitles.srt"),
  path.join(root, "public", "new_chapter_1_full.srt"),
].find(p => fs.existsSync(p));
if (!srtFile) throw new Error("no SRT in public/");
const production = createAutoProduction(fs.readFileSync(srtFile, "utf8"), styleId);
const duration = production.transcript.duration;
const finalEnd = Math.min(end, duration);

console.log(`[sitcom] scenes=${production.plan.scenes.length} shots=${production.plan.resolved.length} beats=${production.productionPlan.beats.length}`);
console.log(`[sitcom] render t=[${start}, ${finalEnd}] ${width}x${height}@${fps} -> ${outFile}`);

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

const ff = spawn("/usr/bin/ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
  "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", crf,
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  outFile,
], { stdio: ["pipe", "inherit", "inherit"] });

const frames = Math.round((finalEnd - start) * fps);
const t0 = Date.now();
let rssPeak = 0;
for (let i = 0; i < frames; i++) {
  const t = Math.min(finalEnd - 1e-6, start + i / fps);
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width, height });
  const pixels = new Resvg(svg, { fitTo: { mode: "width", value: width }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().pixels;
  const ok = ff.stdin.write(pixels);
  if (!ok) await new Promise(r => ff.stdin.once("drain", r));
  if (i % (fps * 10) === 0) {
    try { rssPeak = Math.max(rssPeak, parseInt(fs.readFileSync(`/proc/self/statm`).toString().split(" ")[1]) * 4096 / 1048576); } catch {}
    const pct = ((i / frames) * 100).toFixed(1);
    console.log(`[sitcom] ${pct}% t=${t.toFixed(1)}s elapsed=${((Date.now() - t0) / 1000).toFixed(0)}s rss~${rssPeak.toFixed(0)}MB`);
  }
}
ff.stdin.end();
await new Promise((res, rej) => ff.on("close", c => c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`))));
console.log(`[sitcom] DONE ${outFile} frames=${frames} in ${((Date.now() - t0) / 1000).toFixed(0)}s peakRSS~${rssPeak.toFixed(0)}MB`);
