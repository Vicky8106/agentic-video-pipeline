/**
 * GAG WINDOW 02 (t = 32.41 - 65.25): why everything looks the way it does.
 *
 *   A (32.41-46.20): Tim Burton spiral hill + low-poly PS1 actor (stepped motion)
 *   B (46.20-57.70): giant terrifying pendulum over a ducking worker
 *   C (57.70-65.25): rewind into the 90s, gaunt model + flashbulbs
 *
 *   tsx scripts/render-gag-w02.ts --out output/gag_w02.mp4
 *   tsx scripts/render-gag-w02.ts --stills 38,44,50,54,60,63
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt,
  stage, walkerXR,
  pendulumRig, rewindIcon, trackingLines, flashBurst,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "32.41"));
const T1 = parseFloat(arg("end", "65.25"));
const outFile = arg("out", path.join(root, "output", "gag_w02.mp4"));
const stillsArg = arg("stills", "");

// --- window-02 graphic props (zero words) ------------------------------------
function burtonHill(): string {
  // Crooked spiral hill + dead tree + crooked house + veiled moon.
  let spiral = "";
  for (let i = 0; i < 5; i++) {
    const r = 100 - i * 16;
    spiral += `<circle cx="760" cy="420" r="${r}" fill="none" stroke="#4c1d95" stroke-width="7" opacity="${0.35 + i * 0.13}"/>`;
  }
  return `<path d="M -200 880 Q 300 620 700 800 T 2100 760 L 2100 1080 L -200 1080 Z" fill="#2e1065"/>`
    + `<path d="M 200 880 Q 260 700 310 700 Q 350 700 360 880" fill="none" stroke="#4c1d95" stroke-width="10"/>`
    + spiral
    + `<g stroke="#2e1065" stroke-width="13" stroke-linecap="round" fill="none">`
    + `<line x1="1560" y1="880" x2="1560" y2="620"/>`
    + `<line x1="1560" y1="700" x2="1470" y2="620"/>`
    + `<line x1="1560" y1="660" x2="1650" y2="590"/>`
    + `<line x1="1560" y1="740" x2="1500" y2="690"/></g>`
    + `<g><polygon points="1640,880 1640,720 1730,680 1820,720 1820,880" fill="#3b1470" stroke="#1e0b3d" stroke-width="7"/>`
    + `<polygon points="1620,730 1730,660 1840,730" fill="#1e0b3d"/>`
    + `<rect x="1700" y="790" width="60" height="90" fill="#fde68a" opacity="0.85"/></g>`
    + `<circle cx="1500" cy="300" r="110" fill="#fef3c7"/>`
    + `<circle cx="1470" cy="280" r="110" fill="#f3ede4" opacity="0.55"/>`;
}
function ps1Actor(x: number, y: number, s: number, phase: number): string {
  // Low-poly actor: chunky facets, snapped limbs, zero smoothing.
  const snap = (v: number) => Math.round(v / 12) * 12;
  const legSwing = snap(Math.sin(phase * 2.4) * 26);
  const armSwing = snap(-Math.sin(phase * 2.4) * 26);
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<polygon points="-46,120 46,120 34,10 -34,10" fill="#64748b" stroke="#0f172a" stroke-width="8"/>`
    + `<line x1="0" y1="120" x2="${-26 + legSwing * 0.5}" y2="230" stroke="#0f172a" stroke-width="20"/>`
    + `<line x1="0" y1="120" x2="${26 - legSwing * 0.5}" y2="230" stroke="#0f172a" stroke-width="20"/>`
    + `<line x1="0" y1="30" x2="${-60 + armSwing * 0.6}" y2="90" stroke="#0f172a" stroke-width="16"/>`
    + `<line x1="0" y1="30" x2="${60 - armSwing * 0.6}" y2="90" stroke="#0f172a" stroke-width="16"/>`
    + `<polygon points="-52,-90 52,-90 40,-10 -40,-10" fill="#fcd9b8" stroke="#0f172a" stroke-width="8"/>`
    + `<polygon points="-30,-70 -10,-70 -10,-40 -30,-40" fill="#0f172a"/>`
    + `<polygon points="10,-70 30,-70 30,-40 10,-40" fill="#0f172a"/>`
    + `<polygon points="-52,-90 52,-90 52,-118 -52,-118" fill="#1e293b"/>`
    + `</g>`;
}
// (pendulumRig, rewindIcon, trackingLines, flashBurst promoted to ./gag-lib)

// --- SKIT A: Burton hill + PS1 actor (32.41-46.20) ---------------------------
function w2a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // Host scurries in for the punch so his sigh lands on camera.
  const hostX = 420 + easeIO(seg(lt, 11.0, 11.8)) * 330;
  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t, isTalking: lt < 10.5, blink: blinkAt(t),
      expression: lt >= 11.0 ? "frustration_sigh" : "deadpan_classic",
      isWalking: lt >= 11.0 && lt < 11.8,
      gazeTarget: { x: 1350, y: 550 },
    },
  });
  // PS1 actor stomps in on "rendered in low-poly" (lt 7.4), stepped motion
  const qs = Math.floor(lt * 5) / 5;
  const kx = easeIO(seg(qs, 7.4, 8.8));
  const psx = lerp(2150, 1350, kx);
  if (kx > 0) {
    const rotSnap = Math.floor(lt * 6) % 2 === 0 ? -3 : 3;
    fg += `<g transform="rotate(${rotSnap} ${psx.toFixed(0)} 880)">` + ps1Actor(psx, 650, 1.0, lt) + `</g>`;
  }
  const bg = stage("#efe9fb", "#cfc2ec", ``) + burtonHill();
  const punch = lt >= 11.0;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT B: the terrifying pendulum (46.20-57.70) ---------------------------
function w2b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 350, y: 670, timeSec: t, isTalking: lt < 9.0, blink: blinkAt(t),
      expression: "deadpan_classic",
      pointTarget: { x: 960, y: 200 },
      gazeTarget: { x: 960, y: 400 },
    },
  });
  // Pendulum swings over the worker; amplitude grows through the skit.
  // Bob bottom (y=620) grazes chin height; the duck is a scale-crouch so
  // feet stay planted while the head drops clear.
  const amp = lerp(28, 48, easeIO(seg(lt, 0.5, 9.5)));
  const ang = amp * Math.sin(lt * 1.9);
  fg += pendulumRig(960, 140, 480, ang);
  // Worker ducks every time the bob screams past center.
  const passK = Math.max(0, 1 - Math.abs(ang) / 14);
  const duck = easeIO(Math.min(1, passK * 1.4));
  const scare = amp > 40 ? "shock_eye_pop" : amp > 33 ? "fear_trembling" : "sad_pout";
  figs.push({
    id: "worker", st: {
      x: 960, y: 660, scale: 1 - duck * 0.12, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", clothes: "hoodie", hairStyle: "male_short",
      expression: lt >= 9.0 ? "shock_eye_pop" : scare,
      spineLean: duck * 22,
    },
  });
  const bg = stage("#e8edf3", "#c3ccd8",
    `<circle cx="960" cy="230" r="150" fill="#475569" opacity="0.14"/>`);
  const punch = lt >= 9.0;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 960, cy: 600, zoom: 1.55, cut: false } : { cx: 900, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT C: rewind to the 90s (57.70-65.25) ---------------------------------
function w2c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // Host scurries in for the punch so the thumbs-up lands on camera.
  const hostX = 400 + easeIO(seg(lt, 6.0, 6.8)) * 300;
  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: lt >= 6.0 ? "smug_thumbs_up" : "deadpan_classic",
      isWalking: lt >= 6.0 && lt < 6.8,
      gazeTarget: { x: 1200, y: 550 },
    },
  });
  // Rewind icon throbs on "rewind" (lt 0.1), tracking lines sweep the era in.
  if (lt < 3.2) fg += rewindIcon(1200, 420, 1.6, Math.sin(lt * 9) * 0.5 + 0.5);
  if (lt < 3.2) fg += trackingLines(t);
  // Gaunt 90s model strides in once the "Heroin Chic" line lands (lt 4.0).
  const m = walkerXR(lt, 1250, 4.0, 5.0);
  if (m.on) {
    figs.push({
      id: "model90", st: {
        x: m.x, y: 675, scale: 0.82, timeSec: t, isTalking: false,
        isWalking: m.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_long", clothes: "dress_black",
        eyelashes: true, expression: "smug_hands_behind_head",
        bodyFacing: m.walking ? "left" : "front",
      },
    });
  }
  // Flashbulbs pop as she strikes the final pose (lt 5.5+).
  if (lt >= 5.5 && Math.sin(t * 15) > 0.1) fg += flashBurst(1080, 480, 0.9);
  if (lt >= 5.9 && Math.cos(t * 12) > 0.1) fg += flashBurst(1430, 480, 0.9);
  const bg = stage("#f2ecec", "#d8caca",
    `<circle cx="1200" cy="240" r="140" fill="#991b1b" opacity="0.12"/>`);
  const punch = lt >= 6.0;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 570, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- driver ------------------------------------------------------------------
const GAGS: GagDef[] = [
  { start: 32.41, end: 46.20, fn: w2a },
  { start: 46.20, end: 57.70, fn: w2b },
  { start: 57.70, end: 65.25, fn: w2c },
];

const stillList = stillsArg ? stillsArg.split(",").map((s) => parseFloat(s)) : [];
await driveGags({
  gags: GAGS,
  t0: T0,
  t1: T1,
  outFile,
  stills: stillList,
  fps,
  width,
  height,
  stillsDir: path.join(root, "output", "gag_w02_stills"),
  tag: "w02",
});
if (stillList.length > 0) process.exit(0);
