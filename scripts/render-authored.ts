#!/usr/bin/env node
/**
 * render-authored: authored film in, video out.
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/render-authored.ts \
 *     --film ../authored/anatoly-last2min/index.js --out output/anatoly-c1.mp4 \
 *     --t0 853.57 --t1 893 --width 480 --fps 8 --audio /root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3
 *
 * Renders each authored frame to SVG, rasterizes with resvg (sequential,
 * one 512MB heap), encodes with ffmpeg, and muxes the matching window of
 * the voice track when --audio is given. Long films render in --t0/--t1
 * chunks (concat with ffmpeg after); --stills drops eye-review PNGs.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { renderAuthoredFrame, type AuthoredFilm } from "../src/authored/AuthoredScene.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const get = (name: string, fallback = "") => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const flag = (name: string) => args.includes(name);

const filmPath = get("--film", "../authored/pigeon-park/scene1-morning-feed.js");
const mod = await import(filmPath) as {
  film: AuthoredFilm;
  WINDOW?: { start: number; end: number };
};
const film = mod.film;
const t0 = Number(get("--t0", String(mod.WINDOW?.start ?? film.scenes[0].start)));
const t1 = Number(get("--t1", String(mod.WINDOW?.end ?? film.scenes[film.scenes.length - 1].end)));
const out = get("--out", "output/authored.mp4");
const width = Number(get("--width", "480"));
const fps = Number(get("--fps", "8"));
const audioFile = get("--audio", "");
const doStills = flag("--stills");

const duration = t1 - t0;
const frames = Math.max(1, Math.floor(duration * fps));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "authored-"));
console.log(`film=${film.name} window=[${t0},${t1}] frames=${frames} tmp=${tmp}`);

for (let i = 0; i < frames; i++) {
  const t = Math.min(t1 - 0.001, t0 + i / fps);
  const svg = renderAuthoredFrame(film, t);
  const r = new Resvg(svg, { fitTo: { mode: "width", value: width } });
  const png = r.render().asPng();
  fs.writeFileSync(path.join(tmp, `f-${String(i).padStart(4, "0")}.png`), png);
  if (doStills && (i === 0 || i === Math.floor(frames / 2) || i === frames - 1)) {
    fs.copyFileSync(
      path.join(tmp, `f-${String(i).padStart(4, "0")}.png`),
      path.join(ROOT, "output", `authored-still-chunk-${t0}-${i}.png`),
    );
  }
  if (i % 50 === 0) console.log(`  frame ${i}/${frames}`);
}

const outAbs = path.isAbsolute(out) ? out : path.join(ROOT, out);
fs.mkdirSync(path.dirname(outAbs), { recursive: true });
const silent = path.join(tmp, "silent.mp4");
execFileSync("ffmpeg", ["-y", "-v", "error", "-framerate", String(fps), "-i", path.join(tmp, "f-%04d.png"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", silent]);

if (audioFile && fs.existsSync(audioFile)) {
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", silent, "-ss", String(t0), "-t", String(duration),
    "-i", audioFile, "-c:v", "copy", "-c:a", "aac", "-shortest", outAbs]);
} else {
  fs.copyFileSync(silent, outAbs);
}
console.log(`wrote ${outAbs}`);
