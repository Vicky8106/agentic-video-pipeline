import fs from "node:fs";
import path from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";

const rootDir = "/root/casually_engine_v7";
const audio = path.join(rootDir, "public", "audio.mp3");
const srt = path.join(rootDir, "public", "0-chapter-1.srt");
const out = "/root/Desktop/no4.mp4";
const fps = 24;
const width = 1280;
const height = 720;
const finalDuration = 60.0; // Exact 1-minute cut

console.log(`[Renderer] Starting 1-minute render -> ${out}`);
console.log(`[Renderer] Resolution: ${width}x${height} @ ${fps} FPS (${finalDuration}s = ${finalDuration * fps} frames)`);

const srtText = fs.readFileSync(srt, "utf8");
const production = createAutoProduction(srtText, "casually-explained");

const temp = out + ".video-only.mp4";
const ff = spawn("ffmpeg", [
  "-y",
  "-f", "rawvideo",
  "-pix_fmt", "rgba",
  "-s", `${width}x${height}`,
  "-r", String(fps),
  "-i", "-",
  "-an",
  "-c:v", "libx264",
  "-preset", "fast",
  "-crf", "19",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  temp
], { stdio: ["pipe", "inherit", "inherit"] });

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
].filter(fs.existsSync);

const start = Date.now();
const frames = Math.ceil(finalDuration * fps);

for (let i = 0; i < frames; i++) {
  const t = Math.min(finalDuration - 1e-6, i / fps);
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width, height });
  const pixels = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false }
  }).render().pixels;

  if (!ff.stdin.write(pixels)) {
    await new Promise(r => ff.stdin.once("drain", r));
  }

  if (i % (fps * 5) === 0 || i === frames - 1) {
    const pct = ((i + 1) / frames * 100).toFixed(1);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[Render Progress] ${pct}% (Frame ${i + 1}/${frames}, t=${t.toFixed(1)}s, ${elapsed}s elapsed)`);
  }
}

ff.stdin.end();

await new Promise((resolve, reject) => {
  ff.on("close", c => c === 0 ? resolve() : reject(new Error(`ffmpeg video exited ${c}`)));
});

console.log("[Muxer] Muxing audio track...");
await new Promise((resolve, reject) => {
  const mux = spawn("ffmpeg", [
    "-y",
    "-i", temp,
    "-ss", "0",
    "-t", String(finalDuration),
    "-i", audio,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "-movflags", "+faststart",
    out
  ], { stdio: ["ignore", "inherit", "inherit"] });

  mux.on("close", c => c === 0 ? resolve() : reject(new Error(`ffmpeg mux exited ${c}`)));
});

fs.rmSync(temp, { force: true });
const totalTime = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n🎉 COMPLETED: ${out} in ${totalTime}s`);
