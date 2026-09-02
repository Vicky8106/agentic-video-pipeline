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

const BASE_W = 1280, BASE_H = 720;
const camera = new Camera(BASE_W, BASE_H);
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

function subtitleBand(text: string): string {
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
  const fs_ = 30, lh = 40;
  const cy = 1010 - (shown.length - 1) * lh;
  let tspans = "";
  shown.forEach((ln, i) => {
    // highlight per line (escape first, then wrap matches)
    const safe = esc(ln).replace(HIGHLIGHT_RE, `<tspan font-weight="900" fill="#b91c1c">$1</tspan>`);
    tspans += `<text x="960" y="${cy + i * lh}" text-anchor="middle" font-family="'Noto Sans', Arial, sans-serif" font-size="${fs_}" font-weight="700" fill="#0f172a" stroke="#ffffff" stroke-width="6" paint-order="stroke" stroke-linejoin="round">${safe}</text>`;
  });
  return `<g id="subtitle-band">${tspans}</g>`;
}

const IMPACT_DEFS = `<filter id="impactShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.3"/></filter>`;

/**
 * Clip every <line> to the camera viewport (+margin). resvg 2.6.2 panics on
 * lines with element opacity that end up >900px outside the viewBox while
 * spanning it (zero-width isolated layer -> geom.rs unwrap). Clipping is
 * visually identical: geometry beyond the viewport never rasterizes.
 * Liang-Barsky parametric clip; fully-outside lines are dropped.
 */
function clipLinesToViewport(svg: string, minX: number, minY: number, maxX: number, maxY: number): string {
  const m = 60; // margin covers any stroke cap/join overhang
  const a = minX - m, b = minY - m, c = maxX + m, d = maxY + m;
  return svg.replace(/<line\b([^>]*?)\/>/g, (tag0, attrs) => {
    const g = (n: string) => { const mm = attrs.match(new RegExp(`${n}="([-\\d.eE+]+)"`)); return mm ? parseFloat(mm[1]) : null; };
    const x1 = g("x1"), y1 = g("y1"), x2 = g("x2"), y2 = g("y2");
    if (x1 === null || y1 === null || x2 === null || y2 === null) return tag0;
    // Liang-Barsky
    let t0 = 0, t1 = 1;
    const dx = x2 - x1, dy = y2 - y1;
    const checks: Array<[number, number]> = [[-dx, x1 - a], [dx, c - x1], [-dy, y1 - b], [dy, d - y1]];
    for (const [p, q] of checks) {
      if (p === 0) { if (q < 0) return ""; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return ""; if (r > t0) t0 = r; }
      else { if (r < t0) return ""; if (r < t1) t1 = r; }
    }
    const nx1 = x1 + t0 * dx, ny1 = y1 + t0 * dy, nx2 = x1 + t1 * dx, ny2 = y1 + t1 * dy;
    const f = (v: number) => v.toFixed(2);
    const rest = attrs.replace(/\s(x1|x2|y1|y2)="[^"]*"/g, "");
    return `<line x1="${f(nx1)}" y1="${f(ny1)}" x2="${f(nx2)}" y2="${f(ny2)}"${rest}/>`;
  });
}

function renderFrame(t: number, prevTargetRef: { key: string; lastChange: number }): string {
  const scene = getActiveScene(t);
  const sceneElapsed = t - scene.startTime;
  const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, scene.endTime - scene.startTime)));
  const activeSub = getActiveSubtitle(subtitles, t);
  const talkingFlap = activeSub ? (Math.sin(t * 16) * 0.5 + 0.5) : 0;

  // 1. Scene renders and drives the camera (setTarget = glide phase,
  //    cutTo = hard cut) — exactly as the browser player's tick loop.
  const output = scene.render({ timeSec: t, sceneTime: sceneElapsed, progress, talkingFlap, camera });

  // 2. Track target changes (for the living-frame breath).
  const tkey = `${camera.target.centerX.toFixed(1)},${camera.target.centerY.toFixed(1)},${camera.target.zoom.toFixed(2)}`;
  if (tkey !== prevTargetRef.key) { prevTargetRef.key = tkey; prevTargetRef.lastChange = t; }

  // 3. Camera AGENT step: exponential glide toward the authored target.
  //    Snappiness converted for 24fps so the glide speed matches the
  //    player's 60fps/0.28 feel (same continuous-time constant).
  camera.update(Math.round(t * 1000), 0.56);

  // 4. Living-frame breath: while the authored framing holds (>1.2s since
  //    last change), a very slow ±0.8% zoom sine keeps the frame alive
  //    without ever reading as a move. Resets to 0 right after each change.
  const hold = t - prevTargetRef.lastChange;
  if (hold > 1.2) {
    const breath = 0.008 * Math.min(1, (hold - 1.2) / 2) * Math.sin((t - prevTargetRef.lastChange) * 2 * Math.PI / 11);
    camera.current.zoom *= 1 + breath;
  }

  // 5. Per-sentence DOLLY: the Ce signature — the camera pushes in slowly
  //    while a sentence is spoken (+6% by its end), then resets at the next
  //    sentence's start (reads as a fresh setup). Multiplied on top of the
  //    lerped base zoom; the base is restored after the viewBox so the lerp
  //    never compounds.
  const sent = transcript.sentences.find(s => t >= s.start && t <= s.end)
    ?? transcript.sentences.slice().reverse().find(s => s.start <= t);
  let push = 1;
  if (sent) {
    const bp = Math.min(1, Math.max(0, (t - sent.start) / Math.max(0.4, sent.end - sent.start)));
    push = 1 + 0.06 * (1 - (1 - bp) * (1 - bp)); // easeOutQuad
  }
  const baseZoom = camera.current.zoom;
  camera.current.zoom = baseZoom * push;
  const viewBox = camera.getViewBox(t);
  camera.current.zoom = baseZoom;

  const figures = output.stickFigures?.length
    ? output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n")
    : output.hostState ? renderStickFigure("host-figure", output.hostState) : "";

  const slam = WITH_SLAMS ? slamAt(t) : null;
  let slamSvg = "";
  if (slam) {
    const st = impactWordState(slam.word, t, slam.punchAt, 0.6, slam.slot);
    slamSvg = renderImpactWord(st);
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
  ${subtitleBand(activeSub?.cleanText ?? "")}
</svg>`.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
  // resvg panic guard: clip lines to the camera viewport (no visual change)
  const vbNums = viewBox.split(/[ ,]+/).map(Number);
  return clipLinesToViewport(svgOut, vbNums[0], vbNums[1], vbNums[0] + vbNums[2], vbNums[1] + vbNums[3]);
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
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  outFile,
], { stdio: ["pipe", "inherit", "inherit"] });

const frames = Math.round((finalEnd - startSec) * fps);
const t0 = Date.now();
let rssPeak = 0;
const prevTargetRef = { key: "", lastChange: startSec };
for (let i = 0; i < frames; i++) {
  const t = Math.min(finalEnd - 1e-6, startSec + i / fps);
  const svg = renderFrame(t, prevTargetRef);
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
