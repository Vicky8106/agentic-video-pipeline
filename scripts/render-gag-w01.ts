/**
 * GAG WINDOW 01 (t = 0.0 - 30.0): the Hollywood shift opening.
 *
 * Four self-contained mini-skits, same v2 grammar as the proof
 * (stick-figure cast, zero-words graphic props, rock-solid camera):
 *   A (0.0-8.0):   red carpet ecosystem + Instagram phone drop
 *   B (8.0-15.0):  thicc->stick slider whip + tech-bro crypto->AI pivot
 *   C (15.0-22.5): lean celebrity parade with slim-pop + twirl
 *   D (22.5-30.0): industry unsubscribes from carbs, lunch tray cancelled
 *
 *   tsx scripts/render-gag-w01.ts --out output/gag_w01.mp4
 *   tsx scripts/render-gag-w01.ts --stills 4,10,13,18,21,26,29
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { HairstyleId } from "../src/character/Hairstyles";
import type { OutfitId } from "../src/character/Outfits";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt, FLOOR,
  stage, moneyBag, walkerX, walkerXR, terminal,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "0"));
const T1 = parseFloat(arg("end", "32.41"));
const outFile = arg("out", path.join(root, "output", "gag_w01.mp4"));
const stillsArg = arg("stills", "");

// --- window-01 graphic props (zero words) ------------------------------------
function heart(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<path d="M 0 10 C -28 -12 -44 8 0 34 C 44 8 28 -12 0 10 Z" fill="#ef4444"/></g>`;
}
function flashBurst(x: number, y: number, s: number): string {
  let rays = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * 45) * Math.PI / 180;
    rays += `<line x1="0" y1="0" x2="${(Math.cos(a) * 46).toFixed(0)}" y2="${(Math.sin(a) * 46).toFixed(0)}"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<circle cx="0" cy="0" r="16" fill="#ffffff"/>`
    + `<g stroke="#fde047" stroke-width="9" stroke-linecap="round">${rays}</g></g>`;
}
function phoneSlab(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-150" y="-260" width="300" height="520" rx="30" fill="#0f172a"/>`
    + `<rect x="-132" y="-228" width="264" height="456" rx="16" fill="#e0f2fe"/>`
    + `<circle cx="0" cy="-244" r="7" fill="#334155"/>`
    + `<rect x="-100" y="-160" width="200" height="150" rx="12" fill="#bae6fd"/>`
    + `<circle cx="0" cy="-110" r="42" fill="#38bdf8"/>`
    + `<path d="M -58 -20 Q 0 -52 58 -20" fill="none" stroke="#0284c7" stroke-width="10"/></g>`;
}
function poofBurst(x: number, y: number, r: number): string {
  return `<g fill="#e2e8f0" opacity="0.9">`
    + `<circle cx="${x}" cy="${y}" r="${r}"/>`
    + `<circle cx="${x - r}" cy="${y + r * 0.4}" r="${r * 0.6}"/>`
    + `<circle cx="${x + r}" cy="${y + r * 0.35}" r="${r * 0.65}"/></g>`;
}
// (terminal promoted to ./gag-lib)
function lunchTray(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<ellipse cx="0" cy="30" rx="130" ry="26" fill="#94a3b8"/>`
    + `<path d="M -110 30 A 110 80 0 0 1 110 30 Z" fill="#cbd5e1" stroke="#475569" stroke-width="7"/>`
    + `<circle cx="0" cy="-52" r="12" fill="#475569"/></g>`;
}
function bigButton(x: number, y: number, s: number, press: number): string {
  const dy = press * 22;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-70" y="0" width="140" height="180" rx="16" fill="#475569"/>`
    + `<ellipse cx="0" cy="${-30 + dy}" rx="105" ry="34" fill="#7f1d1d"/>`
    + `<ellipse cx="0" cy="${-52 + dy}" rx="95" ry="30" fill="#ef4444"/>`
    + `<ellipse cx="-28" cy="${-62 + dy}" rx="30" ry="10" fill="#fca5a5" opacity="0.8"/></g>`;
}
function ringBurst(x: number, y: number, r: number): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#f59e0b" stroke-width="10" opacity="0.85"/>`;
}

// --- SKIT A: red carpet ecosystem (0.0-8.0) ----------------------------------
function w1a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 580, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: lt >= 6.5 ? "smug_thumbs_up" : "deadpan_classic",
      pointTarget: lt >= 6.5 ? { x: 1350, y: 480 } : undefined,
      gazeTarget: { x: 1350, y: 480 },
    },
  });
  for (const [id, px, flip] of [["pap1", 240, false], ["pap2", 1620, false]] as const) {
    figs.push({
      id, st: {
        x: px, y: 670, timeSec: t + (flip ? 1 : 0), isTalking: false, blink: blinkAt(t),
        gender: "male", clothes: "hoodie", hairStyle: "male_short",
        expression: "deadpan_line", rightHandProp: "phone",
        gazeTarget: { x: 960, y: 500 },
      },
    });
  }
  // paparazzi flashes strobing off-beat
  if (Math.sin(t * 17) > 0.25) fg += flashBurst(390, 500, 0.9);
  if (Math.cos(t * 13) > 0.25) fg += flashBurst(1530, 500, 0.9);
  // Instagram phone slab drops in on cue 2, hearts pop after
  const dropK = easeIO(seg(lt, 2.0, 2.6));
  if (dropK > 0) {
    const py = lerp(-500, 470, dropK);
    fg += phoneSlab(1350, py, 1.0);
  }
  const heartTimes = [3.1, 3.5, 3.9];
  heartTimes.forEach((ht, i) => {
    const k = seg(lt, ht, ht + 0.4);
    if (k <= 0) return;
    const rise = easeIO(Math.min(1, (lt - ht) / 1.6)) * 130;
    fg += heart(1290 + i * 60, 300 - rise, 0.9 * easeIO(k));
  });
  let bg = stage("#faf5ec", "#e6dcc4",
    `<circle cx="960" cy="260" r="150" fill="#f59e0b" opacity="0.16"/>`);
  bg += `<polygon points="830,880 960,660 1090,880" fill="#dc2626"/>`
    + `<line x1="830" y1="880" x2="960" y2="660" stroke="#991b1b" stroke-width="8"/>`
    + `<line x1="1090" y1="880" x2="960" y2="660" stroke="#991b1b" stroke-width="8"/>`;
  for (const sx of [640, 1280]) {
    bg += `<line x1="${sx}" y1="640" x2="${sx}" y2="880" stroke="#eab308" stroke-width="12"/>`
      + `<circle cx="${sx}" cy="620" r="22" fill="#eab308" stroke="#a16207" stroke-width="5"/>`
      + `<line x1="${sx - 130}" y1="700" x2="${sx}" y2="660" stroke="#991b1b" stroke-width="10"/>`
      + `<line x1="${sx}" y1="660" x2="${sx + 130}" y2="700" stroke="#991b1b" stroke-width="10"/>`;
  }
  const punch = lt >= 6.5;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 560, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT B: thicc->stick whip + tech-bro pivot (8.0-15.0) -------------------
function w1b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // thicc + thin endpoints flanking the slider
  figs.push({
    id: "thicc", st: {
      x: 480, y: 640, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: "sad_pout", gazeY: 0.6,
    },
  });
  figs.push({
    id: "thin", st: {
      x: 1440, y: 640, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: "blissful_serenity",
    },
  });
  figs.push({
    id: "host", st: {
      x: 960, y: 700, timeSec: t, isTalking: lt < 3.4, blink: blinkAt(t),
      expression: "smug_chuckle", gazeTarget: { x: 1330, y: 540 },
    },
  });
  // slider track + knob whipping thicc -> stick on "timeline has gone".
  // Track rides at waist height so it passes BEHIND the cast's legs
  // (depth), never through anyone's face.
  const knobX = lerp(620, 1300, easeIO(seg(lt, 0.6, 1.4)));
  fg += `<rect x="520" y="680" width="880" height="52" rx="26" fill="#cbd5e1"/>`
    + `<circle cx="${knobX.toFixed(0)}" cy="706" r="56" fill="#0ea5e9" stroke="#0c4a6e" stroke-width="9"/>`;
  // belly that visibly drains as the knob slams right
  const drainK = easeIO(seg(lt, 0.6, 1.6));
  const bellyRx = lerp(78, 6, drainK);
  if (drainK < 0.98) fg += `<ellipse cx="480" cy="690" rx="${bellyRx.toFixed(0)}" ry="${(50 - drainK * 44).toFixed(0)}" fill="#fcd9b8" stroke="#111111" stroke-width="7"/>`;
  if (drainK > 0 && drainK < 1) fg += poofBurst(1330, 660, 20 + drainK * 70);
  // tech bro pivots in on "tech bro pivoting" (lt 3.9), coin->terminal
  const bro = walkerX(lt, 1620, 3.9, 4.9, 6.6, 7.6);
  const broRich = lt < 5.0;
  if (bro.on) {
    figs.push({
      id: "bro", st: {
        x: bro.x, y: 670, timeSec: t, isTalking: false, isWalking: bro.walking,
        gender: "male", costume: "tech_bro", hairStyle: "male_short",
        expression: lt >= 5.6 ? "smug_finger_guns" : "smug_chuckle",
        rightHandProp: broRich ? "money_bag" : "none",
      },
    });
  }
  if (lt >= 5.0) {
    const pop = easeIO(seg(lt, 5.0, 5.5));
    if (pop > 0) fg += terminal(1620, 470, Math.max(0.001, pop), Math.sin(t * 6) > 0);
  }
  const bg = stage("#eef2f7", "#ccd6e3",
    `<circle cx="960" cy="240" r="150" fill="#0284c7" opacity="0.14"/>`);
  const punch = lt >= 5.6;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1450, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT C: lean celebrity parade (15.0-22.5) -------------------------------
function w1c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  const fg = "";
  figs.push({
    id: "host", st: {
      x: 330, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: lt >= 6.5 ? "shock_jaw_drop" : "deadpan_classic",
      gazeTarget: { x: 960, y: 550 },
    },
  });
  const stars: Array<{ id: string; x1: number; a: number; b: number; hair: HairstyleId; dress: OutfitId }> = [
    { id: "jenna", x1: 680, a: 0.3, b: 1.3, hair: "female_long", dress: "dress_red_carpet" },
    { id: "emma", x1: 990, a: 1.5, b: 2.5, hair: "female_high_ponytail", dress: "dress_pink" },
    { id: "ari", x1: 1300, a: 2.7, b: 3.7, hair: "female_long_brunette", dress: "dress_red_carpet" },
  ];
  for (const s of stars) {
    // All three enter from stage right in line, so nobody ever walks
    // through another actor to reach her mark.
    const w = walkerXR(lt, s.x1, s.a, s.b);
    if (!w.on) continue;
    // slim-pop shortly after arrival: they walk in normal, then "leaner"
    const slim = easeIO(seg(lt, s.b + 0.8, s.b + 1.5));
    const settled = lt >= s.b;
    // twirl wobble once the "noticeably leaner" line lands (lt 3.7+)
    const twirl = lt >= 3.7 ? Math.sin((t + s.x1) * 5) * 9 : 0;
    figs.push({
      id: s.id, st: {
        x: w.x, y: 660, scale: 1 - 0.16 * slim, rotation: settled ? twirl : 0,
        timeSec: t, isTalking: false, isWalking: w.walking, blink: blinkAt(t + s.x1),
        bodyFacing: w.walking ? "left" : "front",
        gender: "female", hairStyle: s.hair, clothes: s.dress, eyelashes: true,
        expression: settled ? "sparkle_anime_eyes" : "smug_hands_behind_head",
        comicFx: settled && lt >= 3.7 ? "sparkles" : "none",
      },
    });
  }
  const bg = stage("#fdf2f5", "#ecd9e1",
    `<circle cx="960" cy="230" r="150" fill="#ec4899" opacity="0.13"/>`);
  const punch = lt >= 6.5;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 960, cy: 560, zoom: 1.5, cut: false } : { cx: 900, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- SKIT D: unsubscribe from carbs, lunch cancelled (22.5-30.0) -------------
function w1d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  figs.push({
    id: "host", st: {
      x: 420, y: 670, timeSec: t, isTalking: lt < 5.6, blink: blinkAt(t),
      expression: lt >= 6.6 ? "confused_shrug_what" : "deadpan_classic",
      gazeTarget: { x: 1250, y: 600 },
    },
  });
  // three slams on "unsubscribe" (lt 1.2 / 2.4 / 3.6)
  let press = 0;
  for (const at of [1.2, 2.4, 3.6]) {
    const k = seg(lt, at, at + 0.5);
    if (k > 0 && k < 1) press = Math.max(press, Math.sin(k * Math.PI));
    if (k >= 1) press = Math.max(press, 0);
    const rk = seg(lt, at, at + 0.7);
    if (rk > 0 && rk < 1) fg += ringBurst(1350, 640, 30 + rk * 130);
  }
  // industry rep walks right up to the button and leans into each slam
  const rep = walkerX(lt, 1210, 0.4, 1.0, 6.8, 7.6);
  if (rep.on) {
    figs.push({
      id: "rep", st: {
        x: rep.x, y: 670, timeSec: t, isTalking: false, isWalking: rep.walking,
        gender: "male", clothes: "hoodie", hairStyle: "male_short",
        expression: "smug_chuckle", gazeTarget: { x: 1350, y: 640 },
        spineLean: press > 0.15 ? 12 : 0,
      },
    });
  }
  fg += bigButton(1350, 700, 1.0, press);
  // lunch tray arrives on "cancel their", then gets carried off + shrinks away.
  // Porter enters from stage right so he never crosses the rep or the button.
  const trayPop = easeIO(seg(lt, 4.0, 4.5));
  const tporter = walkerXR(lt, 1620, 4.6, 5.4);
  if (tporter.on) {
    figs.push({
      id: "porter", st: {
        x: tporter.x, y: 670, timeSec: t, isTalking: false, isWalking: tporter.walking,
        gender: "male", clothes: "hoodie", hairStyle: "male_short",
        expression: "deadpan_line",
        bodyFacing: tporter.walking ? "right" : "front",
      },
    });
  }
  if (trayPop > 0) {
    // Carried at the porter's side (hand height), never balanced on his head.
    const carried = easeIO(seg(lt, 5.2, 6.0));
    const tx = lerp(1350, (tporter.on ? tporter.x : 2150) - 130, carried);
    const ty = lerp(770, 640, carried);
    const ts = Math.max(0.001, trayPop * (1 - easeIO(seg(lt, 6.0, 7.2))));
    fg += lunchTray(tx, ty, ts);
  }
  const bg = stage("#f3efe6", "#d9d0ba",
    `<circle cx="1250" cy="250" r="140" fill="#b45309" opacity="0.14"/>`);
  const punch = lt >= 6.6;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 600, zoom: 1.45, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// --- TAG E: "biological subscription to lunch" (30.0-32.41) ------------------
function w1e(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  // The subscription lives HERE: host's own belly pops out mid-line.
  const bellyK = easeIO(seg(lt, 0.2, 0.7));
  if (bellyK > 0) {
    fg += `<ellipse cx="960" cy="700" rx="${(bellyK * 70).toFixed(0)}" ry="${(bellyK * 46).toFixed(0)}" fill="#fcd9b8" stroke="#111111" stroke-width="7"/>`;
  }
  figs.push({
    id: "host", st: {
      x: 960, y: 670, timeSec: t, isTalking: true, blink: blinkAt(t),
      expression: "smug_chuckle",
      leftHandTarget: { x: 960, y: 690 },
      gazeTarget: { x: 960, y: 690 },
    },
  });
  const bg = stage("#f3efe6", "#d9d0ba",
    `<circle cx="960" cy="250" r="140" fill="#b45309" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: { cx: 960, cy: 560, zoom: 1.35, cut: lt < 0.05 },
  };
}

// --- driver ------------------------------------------------------------------
const GAGS: GagDef[] = [
  { start: 0.0, end: 8.0, fn: w1a },
  { start: 8.0, end: 15.0, fn: w1b },
  { start: 15.0, end: 22.5, fn: w1c },
  { start: 22.5, end: 30.0, fn: w1d },
  { start: 30.0, end: 32.41, fn: w1e },
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
  stillsDir: path.join(root, "output", "gag_w01_stills"),
  tag: "w01",
});
if (stillList.length > 0) process.exit(0);
