#!/usr/bin/env node
/**
 * Sample verification frames from the sitcom production.
 * npx tsx scripts/sample-sitcom-frames.ts [outdir] [style]
 */
import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";

const outDir = process.argv[2] || path.resolve(process.cwd(), "output", "sitcom_frames");
const styleId = process.argv[3] || "casually-procedural";
fs.mkdirSync(outDir, { recursive: true });

const srt = fs.readFileSync(path.resolve(process.cwd(), "public", "0-chapter-1.srt"), "utf8");
const production = createAutoProduction(srt, styleId);
const duration = production.transcript.duration;

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

// Sample: every ~36s + punchline-heavy moments
const times: number[] = [];
for (let t = 4; t < duration; t += 36.4) times.push(t);
// Add mid-beat samples where the punch lands (beat role = punchline)
const punchBeats = production.productionPlan.beats.filter(b => b.role === "punchline");
for (const b of punchBeats.slice(0, 8)) times.push(b.start + (b.end - b.start) * 0.62);
times.sort((a, b) => a - b);

let sitcomFrames = 0, impactFrames = 0;
for (const t of times) {
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width: 1280, height: 720 });
  // co-star present?
  if (/cohost|blonde|goth|pixie|bun\b|bob\b|suit|techbro|hoodie|scrubs/.test(svg)) sitcomFrames++;
  if (/impactShadow/.test(svg) && /<text[^>]*font-size="86"/.test(svg)) impactFrames++;
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1280 }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().pixels;
  const buf = Buffer.from(png);
  // write as PNG via resvg's asPng instead — simpler: re-render to asPng
  const pngBuf = new Resvg(svg, { fitTo: { mode: "width", value: 1280 }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().asPng();
  fs.writeFileSync(path.join(outDir, `frame_${t.toFixed(1).replace(".", "_")}s.png`), pngBuf);
}

console.log(`Sampled ${times.length} frames -> ${outDir}`);
console.log(`Frames with co-star on stage: ${sitcomFrames}/${times.length}`);
console.log(`Frames with impact word visible: ${impactFrames}/${times.length}`);
console.log(`Scenes (sentence-units): ${production.plan.scenes.length}`);
console.log(`Duration: ${duration.toFixed(1)}s`);
