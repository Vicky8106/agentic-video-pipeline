/**
 * GOLD-STANDARD REPLICATION RENDERER (v3)
 *
 * Renders the exact path that produced casually_explained_master_full_10min.mp4:
 *   parseSrt -> renderCompleteSvgFrame -> MovieDirectorEngine (89-beat
 *   hand-authored sheet: per-beat background, cast look, prop, camera, banner).
 *
 * The ONLY addition is the punch-word slam (ImpactTypography) timed to the
 * exact spoken word, layered OUTSIDE the scene (never zoom-cropped).
 *
 * Chunked + sequential + raw-RGBA-into-ffmpeg (RAM stays ~1 frame).
 *
 *   npx tsx scripts/render-gold-plus.ts --out output/gold_plus.mp4
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { parseSrt, Camera, renderCompleteSvgFrame } from "../src/engine/SvgRenderer";
import { buildTranscript } from "../src/subtitles/Transcript";
import { pickPunchWord, impactWordState, renderImpactWord } from "../src/production/ImpactTypography";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = parseInt(arg("fps", "24"), 10);
const width = parseInt(arg("width", "1280"), 10);
const height = Math.round((width * 9) / 16);
const outFile = arg("out", path.join(root, "output", "gold_plus.mp4"));
const startSec = parseFloat(arg("start", "0"));
const endSec = parseFloat(arg("end", "643.53"));

// --- Load gold-standard machinery -----------------------------------------
const srtFile = path.join(root, "public", "0-chapter-1.srt");
const srtContent = fs.readFileSync(srtFile, "utf8");
const subtitles = parseSrt(srtContent);
const camera = new Camera(1920, 1080);
const transcript = buildTranscript(subtitles);
const duration = transcript.duration;

// --- Punch-word plan: ONE slam per sentence, timed to the spoken word ------
interface Slam { word: string; punchAt: number; slot: number; }
const slams: Slam[] = [];
transcript.sentences.forEach((s, i) => {
  const pw = pickPunchWord(s.text);
  if (!pw) return;
  const target = pw.word.toLowerCase().replace(/[^a-z0-9$]/g, "");
  const w = s.words.find(x => x.text.toLowerCase().replace(/[^a-z0-9$]/g, "") === target)
    ?? s.words[s.words.length - 1];
  if (w) slams.push({ word: pw.word.replace(/[.,!?]$/, ""), punchAt: w.start, slot: i % 3 });
});
console.log(`[gold+] slams planned: ${slams.length}/${transcript.sentences.length} sentences`);

function slamAt(t: number): Slam | null {
  let best: Slam | null = null;
  for (const s of slams) {
    if (t >= s.punchAt - 0.05 && t <= s.punchAt + 1.6) {
      if (!best || s.punchAt > best.punchAt) best = s;
    }
  }
  return best;
}

const IMPACT_DEFS = `<filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.3"/></filter>`;

function renderFrame(t: number): string {
  const out = renderCompleteSvgFrame({ timeSec: t, subtitles, camera, width, height });
  let svg = out.svg;
  // Punch-word slam, composited OUTSIDE the scene layers (screen-anchored).
  const slam = slamAt(t);
  if (slam) {
    const st = impactWordState(slam.word, t, slam.punchAt, 0.6, slam.slot);
    const card = renderImpactWord(st);
    if (card) {
      if (!svg.includes('id="impactShadow"')) svg = svg.replace("</defs>", `${IMPACT_DEFS}</defs>`);
      svg = svg.replace("</svg>", `${card}</svg>`);
    }
  }
  return svg;
}

// --- Stream to ffmpeg -------------------------------------------------------
fs.mkdirSync(path.dirname(outFile), { recursive: true });
const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

const finalEnd = Math.min(endSec, duration);
const ff = spawn("/usr/bin/ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
  "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  outFile,
], { stdio: ["pipe", "inherit", "inherit"] });

const frames = Math.round((finalEnd - startSec) * fps);
const t0 = Date.now();
let rssPeak = 0;
for (let i = 0; i < frames; i++) {
  const t = Math.min(finalEnd - 1e-6, startSec + i / fps);
  const svg = renderFrame(t);
  const pixels = new Resvg(svg, { fitTo: { mode: "width", value: width }, font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render().pixels;
  if (!ff.stdin.write(pixels)) await new Promise(r => ff.stdin.once("drain", r));
  if (i % (fps * 10) === 0) {
    try { rssPeak = Math.max(rssPeak, parseInt(fs.readFileSync("/proc/self/statm").toString().split(" ")[1]) * 4096 / 1048576); } catch {}
    console.log(`[gold+] ${(100 * i / frames).toFixed(1)}% t=${t.toFixed(1)}s elapsed=${((Date.now() - t0) / 1000).toFixed(0)}s rss~${rssPeak.toFixed(0)}MB`);
  }
}
ff.stdin.end();
await new Promise((res, rej) => ff.on("close", c => c === 0 ? res(null) : rej(new Error(`ffmpeg exit ${c}`))));
console.log(`[gold+] DONE ${outFile} frames=${frames} in ${((Date.now() - t0) / 1000).toFixed(0)}s peakRSS~${rssPeak.toFixed(0)}MB`);
