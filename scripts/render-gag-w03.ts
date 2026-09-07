/**
 * GAG WINDOW 03 (t = 65.25 - 97.23): the 90s vice era, the pendulum snaps
 * back, and curves go on sale.
 *
 *   A (65.25-80.50): Diet Coke + cigarettes + apathy, elegant Victorian faint
 *   B (80.50-85.40): the pendulum swings VIOLENTLY the other way (callback)
 *   C (85.40-97.23): buying curves, Pixar Mom + money rain + internet crowd
 *
 *   tsx scripts/render-gag-w03.ts --out output/gag_w03.mp4
 *   tsx scripts/render-gag-w03.ts --stills 70,76,79,83,92,95
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt,
  stage, couch, moneyBag, walkerXR,
  flashBurst, pendulumRig,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "65.25"));
const T1 = parseFloat(arg("end", "97.23"));
const outFile = arg("out", path.join(root, "output", "gag_w03.mp4"));
const stillsArg = arg("stills", "");

// --- window-03 graphic props (zero words) ------------------------------------
function cigarette(x: number, y: number, s: number, t: number): string {
  const curl = Math.sin(t * 3.2) * 14;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<line x1="-46" y1="0" x2="30" y2="0" stroke="#f8fafc" stroke-width="13" stroke-linecap="round"/>`
    + `<line x1="-46" y1="0" x2="-30" y2="0" stroke="#f97316" stroke-width="13" stroke-linecap="round"/>`
    + `<circle cx="-52" cy="0" r="9" fill="#ef4444"/>`
    + `<path d="M 34 -6 Q 52 -34 ${52 + curl} -62" fill="none" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/>`
    + `</g>`;
}
function emptyThought(x: number, y: number, s: number): string {
  // Apathy, visualized: a thought bubble with nothing in it.
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" stroke="#94a3b8" stroke-width="6">`
    + `<circle cx="0" cy="0" r="58"/>`
    + `<circle cx="-44" cy="66" r="16"/>`
    + `<circle cx="-72" cy="102" r="10"/></g>`;
}
function hipOrbs(x: number, y: number, s: number): string {
  // Small orbs tucked at the dress edge: hip emphasis, never pizza shields.
  return `<g transform="translate(${x} ${y}) scale(${Math.max(0.001, s)})">`
    + `<ellipse cx="-44" cy="0" rx="30" ry="38" fill="#fcd9b8" stroke="#111111" stroke-width="8"/>`
    + `<ellipse cx="44" cy="0" rx="30" ry="38" fill="#fcd9b8" stroke="#111111" stroke-width="8"/></g>`;
}
function whooshArc(x: number, y: number, r: number, flip: boolean): string {
  const s = flip ? -1 : 1;
  return `<path d="M ${x - s * r} ${y} Q ${x} ${y - r * 0.9} ${x + s * r} ${y}"`
    + ` fill="none" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>`;
}

// --- SKIT A: vices + elegant faint (65.25-80.50) ------------------------------
function w3a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 400, y: 670, timeSec: t, isTalking: lt < 12.5, blink: blinkAt(t),
      expression: "deadpan_classic",
      spineLean: lt >= 13.0 ? 24 : 0,
      gazeTarget: { x: 1150, y: 550 },
    },
  });
  // Model drifts in from stage right, coke in hand, vices hovering.
  const m = walkerXR(lt, 1150, 0.3, 1.3);
  const bob = Math.sin(t * 2.1) * 12;
  if (m.on) {
    // Faint onto the chaise (lt 8.6-10), recover (lt 10.5-12), then pose.
    const faintK = easeIO(seg(lt, 8.6, 10.0)) * (1 - easeIO(seg(lt, 10.5, 12.0)));
    const mx = lerp(m.x, 1350, faintK);
    const my = lerp(660, 600, faintK);
    const mrot = lerp(0, -66, faintK);
    figs.push({
      id: "model", st: {
        x: mx, y: my, rotation: mrot, scale: 0.85, timeSec: t, isTalking: false,
        isWalking: m.walking && faintK < 0.1, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_long", clothes: "dress_black",
        eyelashes: true,
        expression: faintK > 0.5 ? "blissful_serenity" : lt >= 12.5 ? "smug_hands_behind_head" : "sad_pout",
        pose: lt >= 12.5 ? "hands_on_hips" : "default",
        rightHandProp: "diet_coke",
      },
    });
  }
  // Hovering vices: cigarette + smoke, and apathy (an empty thought that
  // trails the model wherever she drifts).
  if (lt >= 1.5) {
    fg += cigarette(1500, 420 + bob, 1.0, t);
    if (m.on) fg += emptyThought(m.x + 140, 300 - bob, 1.0);
  }
  const bg = stage("#f4eef7", "#d3c8e8", ``)
    + couch(1350, 880, 1.1)
    + `<circle cx="960" cy="230" r="140" fill="#7c3aed" opacity="0.12"/>`;
  const punch = lt >= 13.0;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 560, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT B: pendulum snaps back (80.50-85.40) --------------------------------
function w3b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // Same pendulum, VIOLENT: both dive every pass (scale-crouch, feet planted).
  const ang = 58 * Math.sin(lt * 5.5);
  fg += pendulumRig(960, 140, 480, ang);
  const passK = Math.max(0, 1 - Math.abs(ang) / 16);
  const duck = easeIO(Math.min(1, passK * 1.6));
  figs.push({
    id: "host", st: {
      x: 350, y: 660, scale: 1 - duck * 0.12, timeSec: t, isTalking: false, blink: blinkAt(t),
      expression: "shock_eye_pop", gazeTarget: { x: 960, y: 400 },
      spineLean: duck * 22,
    },
  });
  figs.push({
    id: "model", st: {
      x: 1550, y: 660, scale: 0.85 * (1 - duck * 0.12), timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_long", clothes: "dress_black",
      eyelashes: true, expression: "shock_eye_pop",
      spineLean: duck * 22,
    },
  });
  // Whoosh arcs flare with swing speed.
  const wo = Math.min(1, Math.abs(Math.cos(lt * 5.5)) * 1.2);
  if (wo > 0.25) {
    fg += `<g opacity="${wo.toFixed(2)}">` + whooshArc(620, 620, 150, true) + whooshArc(1300, 620, 150, false) + `</g>`;
  }
  const bg = stage("#e8edf3", "#c3ccd8",
    `<circle cx="960" cy="230" r="150" fill="#475569" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: { cx: 960, cy: 560, zoom: 1.3, cut: lt < 0.05 },
  };
}

// --- SKIT C: buying curves, Pixar Mom (85.40-97.23) ---------------------------
function w3c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 9.5, blink: blinkAt(t),
      expression: lt >= 10.3 ? "smug_thumbs_up" : "deadpan_classic",
      pointTarget: lt >= 9.1 ? { x: 960, y: 660 } : undefined,
      gazeTarget: { x: 960, y: 600 },
    },
  });
  // Buyer strolls in, slim — until "buying curves" lands (lt 9.1).
  const b = walkerXR(lt, 960, 0.3, 1.3);
  if (b.on) {
    figs.push({
      id: "buyer", st: {
        x: b.x, y: 660, timeSec: t, isTalking: false, isWalking: b.walking,
        blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_pink",
        eyelashes: true,
        expression: lt >= 7.5 ? "smug_hands_behind_head" : "deadpan_classic",
        pose: lt >= 7.5 ? "hands_on_hips" : "default",
        bodyFacing: b.walking ? "left" : "front",
      },
    });
  }
  // Curves pop onto her hips + money rains on "buying curves" (lt 9.1).
  const curvesK = easeIO(seg(lt, 9.1, 9.7));
  if (b.on && curvesK > 0) fg += hipOrbs(960, 700, curvesK);
  const piles = [
    { x: 1250, at: 9.4 }, { x: 1330, at: 9.8 }, { x: 1290, at: 10.2 },
  ];
  for (const p of piles) {
    const k = easeIO(seg(lt, p.at, p.at + 0.7));
    if (k <= 0) continue;
    const y = lerp(-160, 820, k);
    fg += moneyBag(p.x, y, 1.0, (p.x % 17) - 8);
  }
  if (lt >= 10.3) fg += flashBurst(960, 420, 1.1);
  // Internet crowd pops up along the bottom to admire.
  const crowd = [
    { id: "fan1", x: 300, at: 8.0 }, { id: "fan2", x: 620, at: 8.4 },
    { id: "fan3", x: 1300, at: 8.8 }, { id: "fan4", x: 1620, at: 9.2 },
  ];
  for (const c of crowd) {
    const k = easeIO(seg(lt, c.at, c.at + 0.5));
    if (k <= 0) continue;
    figs.push({
      id: c.id, st: {
        x: c.x, y: 740, scale: Math.max(0.001, 0.6 * k), timeSec: t, isTalking: false,
        blink: blinkAt(t + c.x),
        gender: c.x > 960 ? "female" : "male",
        hairStyle: c.x > 960 ? "female_long" : "male_short",
        clothes: "tshirt", expression: "sparkle_anime_eyes",
      },
    });
  }
  const bg = stage("#fdf3ec", "#e6d3b8",
    `<circle cx="960" cy="240" r="150" fill="#d97706" opacity="0.14"/>`);
  const punch = lt >= 10.3;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 960, cy: 580, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- driver ------------------------------------------------------------------
const GAGS: GagDef[] = [
  { start: 65.25, end: 80.50, fn: w3a },
  { start: 80.50, end: 85.40, fn: w3b },
  { start: 85.40, end: 97.23, fn: w3c },
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
  stillsDir: path.join(root, "output", "gag_w03_stills"),
  tag: "w03",
});
if (stillList.length > 0) process.exit(0);
