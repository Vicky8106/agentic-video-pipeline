/**
 * Gag-window shared library (extracted from the v2 gag proof).
 *
 * One window = a self-contained ~30s stretch of the chapter performed as
 * mini-skits: stick-figure host + guests, purely graphic props (zero words),
 * rock-solid camera, hard cuts. Each window script defines only its skits
 * and calls driveGags().
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { Camera } from "../src/camera/Camera";
import { renderStickFigure, type StickFigureState } from "../src/character/StickFigure";

export const FPS = 24;
export const WIDTH = 1280;
export const HEIGHT = 720;
export const FLOOR = 880;

// --- math helpers ------------------------------------------------------------
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const easeIO = (k: number) => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
export const seg = (lt: number, a: number, b: number) => clamp((lt - a) / (b - a), 0, 1);
export const blinkAt = (t: number) => (t % 3.7) < 0.12;

export interface Fig { id: string; st: StickFigureState; }
export interface GagCam { cx: number; cy: number; zoom: number; cut: boolean; }
export interface GagOut {
  bg: string; figs: Fig[]; fg: string; cam: GagCam;
}
export interface GagDef {
  start: number; end: number; fn: (t: number, lt: number) => GagOut;
}

// resvg panic guard: clip absurd lines to viewport.
// Preserves every original attribute (stroke/width/caps): only the four
// coordinates move. Rebuilding a bare tag here used to strip styling,
// which made clipped lines (e.g. every figure's spine, whose local y1=-120
// sits just outside the guard) render invisible.
export function clipLines(svg: string): string {
  const a = -100, b = -100, c = 2020, d = 1180;
  return svg.replace(/<line\b([^>]*)\/>/g, (tag0, attrs) => {
    const g = (n: string) => { const m = String(attrs).match(new RegExp(`\\b${n}="([^"]+)"`)); return m ? parseFloat(m[1]) : NaN; };
    const x1 = g("x1"), y1 = g("y1"), x2 = g("x2"), y2 = g("y2");
    if (![x1, y1, x2, y2].every(Number.isFinite)) return tag0;
    if (x1 >= a && x1 <= c && x2 >= a && x2 <= c && y1 >= b && y1 <= d && y2 >= b && y2 <= d) return tag0;
    let t0 = 0, t1 = 1;
    const dx = x2 - x1, dy = y2 - y1;
    const p = [-dx, dx, -dy, dy], q = [x1 - a, c - x1, y1 - b, d - y1];
    for (let k = 0; k < 4; k++) {
      if (p[k] === 0) { if (q[k] < 0) return ""; }
      else { const r = q[k] / p[k]; if (p[k] < 0) { if (r > t1) return ""; if (r > t0) t0 = r; } else { if (r < t0) return ""; if (r < t1) t1 = r; } }
    }
    const f = (n: number) => n.toFixed(1);
    let out = String(attrs);
    out = out.replace(/\bx1="[^"]*"/, `x1="${f(x1 + t0 * dx)}"`);
    out = out.replace(/\by1="[^"]*"/, `y1="${f(y1 + t0 * dy)}"`);
    out = out.replace(/\bx2="[^"]*"/, `x2="${f(x1 + t1 * dx)}"`);
    out = out.replace(/\by2="[^"]*"/, `y2="${f(y1 + t1 * dy)}"`);
    return `<line${out}/>`;
  });
}

export function stage(color: string, floorColor: string, extra = ""): string {
  return `<rect x="-4000" y="-4000" width="10000" height="10000" fill="${color}"/>`
    + `<rect x="-4000" y="${FLOOR}" width="10000" height="4000" fill="${floorColor}"/>`
    + `<rect x="-4000" y="${FLOOR - 8}" width="10000" height="8" fill="#00000022"/>` + extra;
}

// --- inline graphic props (zero words) ---------------------------------------
export function couch(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-260" y="-160" width="520" height="160" rx="40" fill="#7c3aed"/>`
    + `<rect x="-260" y="-60" width="520" height="70" rx="24" fill="#6d28d9"/>`
    + `<rect x="-290" y="-140" width="44" height="150" rx="20" fill="#7c3aed"/>`
    + `<rect x="246" y="-140" width="44" height="150" rx="20" fill="#7c3aed"/>`
    + `</g>`;
}
export function wheel(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<circle cx="0" cy="0" r="70" fill="none" stroke="#111827" stroke-width="18"/>`
    + `<line x1="0" y1="0" x2="0" y2="-70"/><line x1="0" y1="0" x2="-60" y2="35"/><line x1="0" y1="0" x2="60" y2="35"/>`
    + `<circle cx="0" cy="0" r="16" fill="#111827"/></g>`
    .replaceAll("<line", `<line stroke="#111827" stroke-width="14"`);
}
export function duster(x: number, y: number, s: number, rot: number): string {
  let fluff = "";
  for (let i = 0; i < 9; i++) {
    const a = (-60 + i * 15) * Math.PI / 180;
    fluff += `<line x1="0" y1="0" x2="${(Math.cos(a) * 70).toFixed(0)}" y2="${(Math.sin(a) * 70).toFixed(0)}"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<line x1="0" y1="150" x2="0" y2="0" stroke="#92400e" stroke-width="14"/>`
    + `<g stroke="#fbbf24" stroke-width="10" stroke-linecap="round">${fluff}</g></g>`;
}
export function babyBundle(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<ellipse cx="0" cy="0" rx="70" ry="48" fill="#93c5fd"/>`
    + `<circle cx="0" cy="-34" r="26" fill="#fcd9b8"/>`
    + `<path d="M -44 -20 Q 0 -44 44 -20" fill="none" stroke="#3b82f6" stroke-width="8"/></g>`;
}
export function bigSandwich(x: number, y: number, s: number, rot: number, bite: number): string {
  const b = bite * 46;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<path d="M -120 30 L -120 -40 L 120 -40 L 120 30 Q 60 ${30 + b} 0 30 Q -60 ${30 + b} -120 30 Z" fill="#f59e0b"/>`
    + `<path d="M -120 -40 L -120 -70 L 120 -70 L 120 -40 Z" fill="#fbbf24"/>`
    + `<path d="M -120 -55 L 120 -55" stroke="#22c55e" stroke-width="14"/>`
    + `<circle cx="-60" cy="-20" r="10" fill="#ef4444"/><circle cx="30" cy="-16" r="10" fill="#ef4444"/></g>`;
}
export function envelope(x: number, y: number, s: number, open: boolean, sealPop: number): string {
  const flap = open
    ? `<polygon points="-170,-100 170,-100 0,-190" fill="#c4b5fd"/>`
    : `<polygon points="-170,-100 170,-100 0,-10" fill="#a78bfa"/>`;
  const stampS = 0.6 + 0.4 * easeIO(sealPop);
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-170" y="-100" width="340" height="220" rx="8" fill="#ddd6fe" stroke="#7c3aed" stroke-width="8"/>`
    + flap
    + `<line x1="-130" y1="20" x2="40" y2="20" stroke="#7c3aed" stroke-width="8"/>`
    + `<line x1="-130" y1="55" x2="10" y2="55" stroke="#7c3aed" stroke-width="8"/>`
    + `<g transform="translate(105 -55) scale(${stampS.toFixed(2)})">`
    + `<rect x="-35" y="-35" width="70" height="80" fill="#fef3c7" stroke="#b45309" stroke-width="6" stroke-dasharray="10 6"/></g>`
    + `</g>`;
}
export function scaleProp(x: number, y: number, s: number, needle: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-90" y="0" width="180" height="26" rx="10" fill="#64748b"/>`
    + `<circle cx="0" cy="-70" r="46" fill="#f8fafc" stroke="#334155" stroke-width="8"/>`
    + `<line x1="0" y1="-70" x2="${(Math.sin(needle) * 34).toFixed(1)}" y2="${(-70 - Math.cos(needle) * 34).toFixed(1)}" stroke="#dc2626" stroke-width="8"/>`
    + `</g>`;
}
export function moneyBag(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<path d="M -14 -52 L 14 -52 L 6 -34 L -6 -34 Z" fill="#92400e"/>`
    + `<circle cx="0" cy="10" r="52" fill="#16a34a"/>`
    + `<text x="0" y="28" text-anchor="middle" font-size="52" font-weight="900" fill="#bbf7d0">$</text></g>`;
}
export function scalpel(x: number, y: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">`
    + `<line x1="-70" y1="0" x2="20" y2="0" stroke="#94a3b8" stroke-width="14" stroke-linecap="round"/>`
    + `<polygon points="20,-12 70,0 20,12" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/></g>`;
}
export function pendulumRig(pivotX: number, pivotY: number, len: number, angleDeg: number): string {
  const a = angleDeg * Math.PI / 180;
  const bx = pivotX + Math.sin(a) * len;
  const by = pivotY + Math.cos(a) * len;
  return `<circle cx="${pivotX}" cy="${pivotY}" r="26" fill="#334155"/>`
    + `<line x1="${pivotX}" y1="${pivotY}" x2="${bx.toFixed(0)}" y2="${by.toFixed(0)}" stroke="#334155" stroke-width="16"/>`
    + `<circle cx="${bx.toFixed(0)}" cy="${by.toFixed(0)}" r="64" fill="#475569" stroke="#0f172a" stroke-width="9"/>`
    + `<circle cx="${(bx - 18).toFixed(0)}" cy="${(by - 18).toFixed(0)}" r="14" fill="#94a3b8"/>`;
}
export function rewindIcon(x: number, y: number, s: number, pulse: number): string {
  return `<g transform="translate(${x} ${y}) scale(${(s * (1 + pulse * 0.12)).toFixed(2)})" opacity="0.9">`
    + `<polygon points="10,-60 -70,0 10,60" fill="#0ea5e9"/>`
    + `<polygon points="80,-60 0,0 80,60" fill="#0ea5e9"/></g>`;
}
export function trackingLines(t: number): string {
  const y1 = 200 + ((t * 260) % 700);
  const y2 = 700 - ((t * 190) % 650);
  return `<g stroke="#ffffff" stroke-width="7" opacity="0.5">`
    + `<line x1="-100" y1="${y1.toFixed(0)}" x2="2020" y2="${y1.toFixed(0)}"/>`
    + `<line x1="-100" y1="${y2.toFixed(0)}" x2="2020" y2="${y2.toFixed(0)}"/></g>`;
}
export function terminal(x: number, y: number, s: number, blink: boolean): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-230" y="-140" width="460" height="280" rx="18" fill="#020617" stroke="#22d3ee" stroke-width="8"/>`
    + `<circle cx="-190" cy="-100" r="12" fill="#ef4444"/><circle cx="-155" cy="-100" r="12" fill="#f59e0b"/><circle cx="-120" cy="-100" r="12" fill="#22c55e"/>`
    + `<rect x="-190" y="-50" width="300" height="26" rx="8" fill="#164e63"/>`
    + `<rect x="-190" y="0" width="190" height="26" rx="8" fill="#0e7490"/>`
    + (blink ? `<rect x="10" y="0" width="22" height="30" fill="#22d3ee"/>` : ``)
    + `</g>`;
}
export function flashBurst(x: number, y: number, s: number): string {
  let rays = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * 45) * Math.PI / 180;
    rays += `<line x1="0" y1="0" x2="${(Math.cos(a) * 46).toFixed(0)}" y2="${(Math.sin(a) * 46).toFixed(0)}"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<circle cx="0" cy="0" r="16" fill="#ffffff"/>`
    + `<g stroke="#fde047" stroke-width="9" stroke-linecap="round">${rays}</g></g>`;
}

// servant walk helper: x0 -200 -> x1 -> x2 2100 across [a,b]x[c,d]
export function walkerX(lt: number, x1: number, a: number, b: number, c: number, d: number): { x: number; walking: boolean; on: boolean } {
  if (lt < a - 0.4 || lt > d + 0.6) return { x: -400, walking: false, on: false };
  if (lt < b) { const k = easeIO(seg(lt, a, b)); return { x: lerp(-200, x1, k), walking: k > 0 && k < 1, on: true }; }
  if (lt < c) return { x: x1, walking: false, on: true };
  const k = easeIO(seg(lt, c, d)); return { x: lerp(x1, 2150, k), walking: k > 0 && k < 1, on: true };
}
// stage-right entrance: walks 2100 -> x1 across [a,b], then stays.
// Use when the mark is right-of-center so the actor never crosses the cast.
export function walkerXR(lt: number, x1: number, a: number, b: number): { x: number; walking: boolean; on: boolean } {
  if (lt < a - 0.4) return { x: -400, walking: false, on: false };
  if (lt < b) { const k = easeIO(seg(lt, a, b)); return { x: lerp(2100, x1, k), walking: k > 0 && k < 1, on: true }; }
  return { x: x1, walking: false, on: true };
}

// --- generic window driver ---------------------------------------------------
export interface WindowOpts {
  gags: GagDef[];
  t0: number;
  t1: number;
  outFile: string;
  stills: number[];
  fps?: number;
  width?: number;
  height?: number;
  stillsDir?: string;
  tag?: string;
}

export async function driveGags(o: WindowOpts): Promise<void> {
  const fps = o.fps ?? FPS;
  const width = o.width ?? WIDTH;
  const height = o.height ?? HEIGHT;
  const camera = new Camera(1920, 1080);
  let lastIdx = -1;

  function renderSvg(t: number): string {
    let idx = o.gags.findIndex(g => t >= g.start && t < g.end);
    if (idx < 0) idx = t < o.gags[0].start ? 0 : o.gags.length - 1;
    const g = o.gags[idx];
    const out = g.fn(t, t - g.start);
    if (idx !== lastIdx || out.cam.cut) camera.cutTo(out.cam.cx, out.cam.cy, out.cam.zoom);
    else { camera.setTarget(out.cam.cx, out.cam.cy, out.cam.zoom); camera.update(t * 1000, 0.2); }
    lastIdx = idx;
    const figures = out.figs.map(f => renderStickFigure(f.id, f.st)).join("\n");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${camera.getViewBox(t)}" width="${width}" height="${height}">`
      + `<defs><filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/></filter>`
      + `<filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`
      + `<g id="bg">${out.bg}</g><g id="cast">${figures}</g><g id="props">${out.fg}</g>`
      + `</svg>`;
    return clipLines(svg);
  }

  if (o.stills.length > 0) {
    const dir = o.stillsDir ?? path.join(path.resolve("output", "gag_stills"));
    fs.mkdirSync(dir, { recursive: true });
    for (const s of o.stills) {
      const t = s;
      lastIdx = -1;
      // warm the camera through the gag so punch-ins settle like in the render
      const g0 = o.gags.findIndex(g => t >= g.start && t < g.end);
      for (let w = o.gags[g0].start; w < t; w += 0.25) renderSvg(w);
      const png = new Resvg(renderSvg(t), { fitTo: { mode: "width", value: width } }).render().asPng();
      const p = path.join(dir, `still_${t}.png`);
      fs.writeFileSync(p, png);
      console.log(`[${o.tag ?? "gag"}] still ${p}`);
    }
    return;
  }

  fs.mkdirSync(path.dirname(o.outFile), { recursive: true });
  const ff = spawn("/usr/bin/ffmpeg", [
    "-y", "-hide_banner", "-loglevel", "error",
    "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
    "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
    "-g", "24", "-keyint_min", "24", "-sc_threshold", "0", "-flags", "+cgop",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", o.outFile,
  ], { stdio: ["pipe", "inherit", "inherit"] });

  const frames = Math.round((o.t1 - o.t0) * fps);
  const t0ms = Date.now();
  for (let i = 0; i < frames; i++) {
    const t = Math.min(o.t1 - 1e-6, o.t0 + i / fps);
    const pixels = new Resvg(renderSvg(t), { fitTo: { mode: "width", value: width } }).render().pixels;
    if (!ff.stdin.write(pixels)) await new Promise(r => ff.stdin.once("drain", r));
    if (i % (fps * 5) === 0) console.log(`[${o.tag ?? "gag"}] ${(100 * i / frames).toFixed(0)}% t=${t.toFixed(1)}s`);
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on("close", c => c === 0 ? res(null) : rej(new Error(`ffmpeg exit ${c}`))));
  console.log(`[${o.tag ?? "gag"}] DONE ${o.outFile} frames=${frames} in ${((Date.now() - t0ms) / 1000).toFixed(0)}s`);
}
