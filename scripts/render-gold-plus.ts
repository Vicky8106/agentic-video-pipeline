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
import type { MovieBeat } from "../src/director/ShotTimeline";
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
// Gold look = no burned-in speech words; slams are opt-in only.
const WITH_SLAMS = arg("slams", "0") === "1";
// Director beat-sheet override (JSON from scripts/direct.ts). Default: baked ShotTimeline.
const beatsPath = arg("beats", "");
let beatOverride: MovieBeat[] | null = null;
if (beatsPath) {
  const raw = JSON.parse(fs.readFileSync(beatsPath, "utf8"));
  const list = Array.isArray(raw) ? raw : raw.beats;
  if (!Array.isArray(list) || list.length === 0) throw new Error(`No beats in ${beatsPath}`);
  beatOverride = list as MovieBeat[];
}

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

// Resvg's tiny-skia layer panics with "assertion `left <= right` failed" when
// drawing anti-aliased stroked lines whose endpoints extend thousands of pixels
// beyond the viewport (e.g. x1="-4000" x2="6000"). Clamp them (no visual change).
function clipLinesToViewport(svg: string, minX: number, minY: number, maxX: number, maxY: number): string {
  const m = 60; // margin covers any stroke cap/join overhang
  const a = minX - m, b = minY - m, c = maxX + m, d = maxY + m;
  return svg.replace(/<line\b([^>]*)\/>/g, (tag0, attrs) => {
    const x1m = attrs.match(/\bx1="([^"]+)"/);
    const y1m = attrs.match(/\by1="([^"]+)"/);
    const x2m = attrs.match(/\bx2="([^"]+)"/);
    const y2m = attrs.match(/\by2="([^"]+)"/);
    if (!x1m || !y1m || !x2m || !y2m) return tag0;
    const x1 = parseFloat(x1m[1]), y1 = parseFloat(y1m[1]);
    const x2 = parseFloat(x2m[1]), y2 = parseFloat(y2m[1]);
    if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) return tag0;
    if (x1 >= a && x1 <= c && x2 >= a && x2 <= c && y1 >= b && y1 <= d && y2 >= b && y2 <= d) return tag0;

    let t0 = 0, t1 = 1;
    const dx = x2 - x1, dy = y2 - y1;
    const p = [-dx, dx, -dy, dy];
    const q = [x1 - a, c - x1, y1 - b, d - y1];
    for (let k = 0; k < 4; k++) {
      if (p[k] === 0) {
        if (q[k] < 0) return "";
      } else {
        const r = q[k] / p[k];
        if (p[k] < 0) { if (r > t1) return ""; if (r > t0) t0 = r; }
        else { if (r < t0) return ""; if (r < t1) t1 = r; }
      }
    }
    const nx1 = x1 + t0 * dx, ny1 = y1 + t0 * dy;
    const nx2 = x1 + t1 * dx, ny2 = y1 + t1 * dy;
    let rest = attrs
      .replace(/\bx1="[^"]*"/, "")
      .replace(/\by1="[^"]*"/, "")
      .replace(/\bx2="[^"]*"/, "")
      .replace(/\by2="[^"]*"/, "");
    const f = (n: number) => n.toFixed(1);
    return `<line x1="${f(nx1)}" y1="${f(ny1)}" x2="${f(nx2)}" y2="${f(ny2)}"${rest}/>`;
  });
}

function renderFrame(t: number): string {
  const out = beatOverride
    ? renderCompleteSvgFrame({ timeSec: t, subtitles, camera, width, height, beats: beatOverride })
    : renderCompleteSvgFrame({ timeSec: t, subtitles, camera, width, height });
  const vb = out.viewBox.split(/[ ,]+/).map(Number);
  let svg = out.svg;
  // Punch-word slam, composited OUTSIDE the scene layers (screen-anchored).
  const slam = WITH_SLAMS ? slamAt(t) : null;
  if (slam) {
    const st = impactWordState(slam.word, t, slam.punchAt, 0.6, slam.slot);
    const card = renderImpactWord(st);
    if (card) {
      if (!svg.includes('id="impactShadow"')) svg = svg.replace("</defs>", `${IMPACT_DEFS}</defs>`);
      svg = svg.replace("</svg>", `${card}</svg>`);
    }
  }
  // resvg panic guard: clip lines to the camera viewport (no visual change)
  return clipLinesToViewport(svg, vb[0], vb[1], vb[0] + vb[2], vb[1] + vb[3]);
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
