/**
 * v4 — SCENE-MODULE RENDERER (the true gold path).
 *
 * Renders the 18 hand-authored scene modules (Scene01..Scene18) that tile the
 * full 644s — the code behind the browser player whose first minute "works".
 * Replicates src/main.ts's __seekAnimation loop offline:
 *   scene.render(ctx) -> camera.setImmediate -> viewBox -> layered SVG
 *   + burned-in subtitle band with comedic keyword highlighting (as the player)
 *   + punch-word slam per sentence (the one deliberate addition)
 *
 *   npx tsx scripts/render-scenes.ts --start 0 --end 643.53 --out output/v4.mp4
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { getActiveScene } from "../src/scenes/SceneRegistry";
import { Camera } from "../src/camera/Camera";
import { CameraAgent } from "../src/camera/CameraAgent";
import { renderStickFigure } from "../src/character/StickFigure";
import { parseSrt, getActiveSubtitle } from "../src/engine/SvgRenderer";
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
const outFile = arg("out", path.join(root, "output", "scenes_v4.mp4"));
const startSec = parseFloat(arg("start", "0"));
const endSec = parseFloat(arg("end", "643.53"));
const WITH_SLAMS = arg("slams", "1") === "1";

const BASE_W = 1920, BASE_H = 1080;
const camera = new Camera(BASE_W, BASE_H);
const cameraAgent = new CameraAgent(camera);
const srtContent = fs.readFileSync(path.join(root, "public", "0-chapter-1.srt"), "utf8");
const subtitles = parseSrt(srtContent);
const transcript = buildTranscript(subtitles);
const duration = Math.min(transcript.duration, 644.08);

// --- Punch-word slam plan (one per sentence, timed to the spoken word) ------
interface Slam { word: string; punchAt: number; slot: number; }
const slams: Slam[] = [];
transcript.sentences.forEach((s, i) => {
  const pw = pickPunchWord(s.text);
  if (!pw) return;
  const target = pw.word.toLowerCase().replace(/[^a-z0-9$]/g, "");
  const w = s.words.find(x => x.text.toLowerCase().replace(/[^a-z0-9$]/g, "") === target) ?? s.words[s.words.length - 1];
  if (w) slams.push({ word: pw.word.replace(/[.,!?]$/, ""), punchAt: w.start, slot: i % 3 });
});
function slamAt(t: number): Slam | null {
  let best: Slam | null = null;
  for (const s of slams) if (t >= s.punchAt - 0.05 && t <= s.punchAt + 1.5 && (!best || s.punchAt > best.punchAt)) best = s;
  return best;
}

// Comedic keyword highlighting — the exact list from the player.
const HIGHLIGHT_RE = /(Thicc|stick|Jenna Ortega|Emma Stone|Ariana Grande|unsubscribe|lunch|Tim Burton|PS1 graphics|Heroin Chick|Kate Moss|Diet Coke|apathy|Victorian|BBL|Pixar Mom|squats|hourglass|body positivity|fidget spinners|podcast|pharmaceutical|boss|Y2K|low-rise|Miu Miu|two thousand dollars|digestive tract|Ozempic|GLP-1|carbs|carbohydrates|instagram|Instagram)/gi;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function subtitleBand(text: string, minX: number, minY: number, vw: number, vh: number): string {
  if (!text) return "";
  // word-wrap to <=2 lines of ~58 chars
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 58 && cur) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur.trim());
  const shown = lines.slice(0, 2);
  if (!shown.length) return "";
  const fs_ = Math.round(30 * (vw / 1920));
  const lh = Math.round(42 * (vw / 1920));
  const sw = Math.max(3, Math.round(6 * (vw / 1920)));
  const cx = minX + vw / 2;
  const cy = (minY + vh - vh * 0.08) - (shown.length - 1) * lh;
  let tspans = "";
  shown.forEach((ln, i) => {
    // highlight per line (escape first, then wrap matches)
    const safe = esc(ln).replace(HIGHLIGHT_RE, `<tspan font-weight="900" fill="#b91c1c">$1</tspan>`);
    tspans += `<text x="${cx}" y="${cy + i * lh}" text-anchor="middle" font-family="'Noto Sans', Arial, sans-serif" font-size="${fs_}" font-weight="700" fill="#0f172a" stroke="#ffffff" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round">${safe}</text>`;
  });
  return `<g id="subtitle-band">${tspans}</g>`;
}

const IMPACT_DEFS = `<filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.3"/></filter>`;

// Clamps SVG <line> coordinates to within [minX-m, maxX+m] x [minY-m, maxY+m].
// Resvg's tiny-skia layer panics with "assertion `left <= right` failed" when
// drawing anti-aliased stroked lines whose endpoints extend thousands of pixels
// beyond the viewport (e.g. x1="-4000" x2="6000").
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
  const scene = getActiveScene(t);
  const sceneElapsed = t - scene.startTime;
  const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, scene.endTime - scene.startTime)));
  const activeSub = getActiveSubtitle(subtitles, t);
  const talkingFlap = activeSub ? (Math.sin(t * 16) * 0.5 + 0.5) : 0;

  // 1. Scene renders (may propose cameraTarget or stick figures)
  const output = scene.render({ timeSec: t, sceneTime: sceneElapsed, progress, talkingFlap, camera });

  // 2. Transcript context
  const sent = transcript.sentences.find(s => t >= s.start && t <= s.end) ?? null;
  const slam = WITH_SLAMS ? slamAt(t) : null;

  // 3. Camera AGENT drives dynamic cinematic camera choreography
  cameraAgent.updateFrame(t, scene.id, sceneElapsed, progress, sent, slam?.punchAt ?? null, output.cameraTarget);
  const viewBox = camera.getViewBox(t);

  const figures = output.stickFigures?.length
    ? output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n")
    : output.hostState ? renderStickFigure("host-figure", output.hostState) : "";

  const vbNums = viewBox.split(/[ ,]+/).map(Number);
  const minX = vbNums[0], minY = vbNums[1], vw = vbNums[2], vh = vbNums[3];

  let slamSvg = "";
  if (slam) {
    const st = impactWordState(slam.word, t, slam.punchAt, 0.6, slam.slot);
    if (st) {
      st.x = minX + vw * (st.slot === 1 ? 0.48 : 0.52);
      st.y = minY + vh * (st.slot === 0 ? 0.28 : st.slot === 1 ? 0.22 : 0.32);
      st.scale *= (vw / 1920);
      slamSvg = renderImpactWord(st);
    }
  }

  const svgOut = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/></filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    ${IMPACT_DEFS}
  </defs>
  <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
  <g id="scene-background">${output.backgroundSvg || ""}</g>
  <g id="scene-character">${figures}</g>
  <g id="scene-foreground">${output.foregroundSvg || ""}</g>
  ${slamSvg}
  ${subtitleBand(activeSub?.cleanText ?? "", minX, minY, vw, vh)}
</svg>`.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
  // resvg panic guard: clip lines to the camera viewport (no visual change)
  return clipLinesToViewport(svgOut, minX, minY, minX + vw, minY + vh);
}

// --- Stream to ffmpeg --------------------------------------------------------
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
  "-g", "24", "-keyint_min", "24", "-sc_threshold", "0", "-flags", "+cgop",
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
    console.log(`[v4] ${(100 * i / frames).toFixed(1)}% t=${t.toFixed(1)}s scene=${sceneIdAt(t)} elapsed=${((Date.now() - t0) / 1000).toFixed(0)}s rss~${rssPeak.toFixed(0)}MB`);
  }
}
ff.stdin.end();
await new Promise((res, rej) => ff.on("close", c => c === 0 ? res(null) : rej(new Error(`ffmpeg exit ${c}`))));
console.log(`[v4] DONE ${outFile} frames=${frames} in ${((Date.now() - t0) / 1000).toFixed(0)}s peakRSS~${rssPeak.toFixed(0)}MB`);

function sceneIdAt(t: number): string { return String(getActiveScene(t).id); }
