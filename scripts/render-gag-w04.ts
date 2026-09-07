/**
 * GAG WINDOW 04 (t = 97.23 - 128.84): the fitness flex, overfilled hourglass,
 * and corporate body-positivity spectacle.
 *
 * Authored strictly to the gold-standard hand-driven specification
 * (/root/Desktop/hand_driven_approach.pdf):
 *   w4a (97.23-107.63): Fitness influencer squats, localized gravity, same-size calves
 *   w4b (107.63-113.40): The ultimate flex: an hourglass overfilled at the bottom
 *   w4c (113.40-122.92): Corporate PR body positivity festival & confetti parade
 *   w4d (122.92-128.84): Hollywood "progressing" past shallow roots vs the caliper
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt,
  stage, walkerX, walkerXR, flashBurst,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "97.23"));
const T1 = parseFloat(arg("end", "128.84"));
const outFile = arg("out", path.join(root, "output", "gag_w04.mp4"));
const stillsArg = arg("stills", "");

// --- window-04 graphic props (ZERO WORDS HOUSE RULE) -------------------------

function dumbbell(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<line x1="-32" y1="0" x2="32" y2="0" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>`
    + `<polygon points="-38,-22 -22,-22 -14,-6 -14,6 -22,22 -38,22 -46,6 -46,-6" fill="#f43f5e" stroke="#881337" stroke-width="4"/>`
    + `<polygon points="22,-22 38,-22 46,-6 46,6 38,22 22,22 14,6 14,-6" fill="#f43f5e" stroke="#881337" stroke-width="4"/>`
    + `</g>`;
}

function gravityRings(x: number, y: number, s: number, t: number): string {
  const r1 = 95 * s;
  const r2 = 135 * s;
  const a1 = t * 4.2;
  const a2 = -t * 3.5;
  const p1x = x + Math.cos(a1) * r1;
  const p1y = y + Math.sin(a1) * 26 * s;
  const p2x = x + Math.cos(a2) * r2;
  const p2y = y + Math.sin(a2) * 36 * s;
  return `<g opacity="0.85">`
    + `<ellipse cx="${x}" cy="${y}" rx="${r1}" ry="${26 * s}" fill="none" stroke="#38bdf8" stroke-width="7" stroke-dasharray="14 10"/>`
    + `<ellipse cx="${x}" cy="${y}" rx="${r2}" ry="${36 * s}" fill="none" stroke="#818cf8" stroke-width="6" stroke-dasharray="18 12"/>`
    + `<circle cx="${p1x.toFixed(1)}" cy="${p1y.toFixed(1)}" r="${7 * s}" fill="#0284c7"/>`
    + `<circle cx="${p2x.toFixed(1)}" cy="${p2y.toFixed(1)}" r="${9 * s}" fill="#4f46e5"/>`
    + `</g>`;
}

function hipCurves(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${Math.max(0.001, s)})">`
    + `<ellipse cx="-48" cy="0" rx="34" ry="42" fill="#fcd9b8" stroke="#111111" stroke-width="8"/>`
    + `<ellipse cx="48" cy="0" rx="34" ry="42" fill="#fcd9b8" stroke="#111111" stroke-width="8"/>`
    + `</g>`;
}

function overfilledHourglass(x: number, y: number, s: number, t: number, bulgeK: number): string {
  const bW = 60 + bulgeK * 110;
  const bH = 55 + bulgeK * 50;
  const sandPour = (t * 80) % 30;
  const bottomPlateY = 85 + bH + 12;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-95" y="-195" width="190" height="24" rx="8" fill="#78350f" stroke="#451a03" stroke-width="6"/>`
    + `<rect x="-105" y="${bottomPlateY}" width="210" height="26" rx="8" fill="#78350f" stroke="#451a03" stroke-width="6"/>`
    + `<line x1="-80" y1="-170" x2="-80" y2="${bottomPlateY}" stroke="#92400e" stroke-width="12" stroke-linecap="round"/>`
    + `<line x1="80" y1="-170" x2="80" y2="${bottomPlateY}" stroke="#92400e" stroke-width="12" stroke-linecap="round"/>`
    + `<polygon points="-70,-170 70,-170 12,-15 -12,-15" fill="#e0f2fe" opacity="0.65" stroke="#38bdf8" stroke-width="7"/>`
    + `<polygon points="-50,-150 50,-150 8,-20 -8,-20" fill="#f59e0b"/>`
    + `<line x1="0" y1="-15" x2="0" y2="90" stroke="#f59e0b" stroke-width="9" stroke-dasharray="16 8" stroke-dashoffset="${sandPour.toFixed(1)}"/>`
    + `<ellipse cx="0" cy="85" rx="${bW + 10}" ry="${bH + 10}" fill="#e0f2fe" opacity="0.65" stroke="#38bdf8" stroke-width="8"/>`
    + `<ellipse cx="0" cy="90" rx="${bW}" ry="${bH}" fill="#f59e0b" stroke="#d97706" stroke-width="7"/>`
    + `<path d="M ${(-bW * 0.7).toFixed(0)} 60 Q ${(-bW * 0.8).toFixed(0)} 100 ${(-bW * 0.5).toFixed(0)} 120" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity="0.8"/>`
    + `</g>`;
}

function prBanner(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-180" y="240" width="360" height="24" rx="8" fill="#475569"/>`
    + `<line x1="-150" y1="-180" x2="-150" y2="240" stroke="#64748b" stroke-width="12"/>`
    + `<line x1="150" y1="-180" x2="150" y2="240" stroke="#64748b" stroke-width="12"/>`
    + `<rect x="-160" y="-180" width="320" height="400" rx="16" fill="#fdf2f8" stroke="#f472b6" stroke-width="8"/>`
    + `<circle cx="0" cy="-60" r="70" fill="none" stroke="#fb7185" stroke-width="8" stroke-dasharray="24 14"/>`
    + `<g transform="translate(0 -65) scale(1.6)">`
    + `<path d="M 0 10 C -28 -12 -44 8 0 34 C 44 8 28 -12 0 10 Z" fill="#ec4899"/>`
    + `</g>`
    + `<path d="M -90 60 Q 0 10 90 60" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round"/>`
    + `<path d="M -80 85 Q 0 40 80 85" fill="none" stroke="#34d399" stroke-width="12" stroke-linecap="round"/>`
    + `<path d="M -70 110 Q 0 70 70 110" fill="none" stroke="#fbbf24" stroke-width="10" stroke-linecap="round"/>`
    + `<polygon points="90,-120 95,-105 110,-100 95,-95 90,-80 85,-95 70,-100 85,-105" fill="#f59e0b"/>`
    + `<polygon points="-90,-120 -85,-105 -70,-100 -85,-95 -90,-80 -95,-95 -110,-100 -95,-105" fill="#f59e0b"/>`
    + `</g>`;
}

function confettiBurst(x: number, y: number, s: number, t: number): string {
  const colors = ["#f43f5e", "#38bdf8", "#fbbf24", "#34d399", "#a855f7"];
  let bits = "";
  for (let i = 0; i < 20; i++) {
    const angle = (i * 18) * Math.PI / 180;
    const speed = 70 + (i % 5) * 35;
    const dx = Math.cos(angle) * speed * s;
    const dy = Math.sin(angle) * speed * s + ((t * 90) % 150);
    const rot = (t * 200 + i * 45) % 360;
    const col = colors[i % colors.length];
    bits += `<rect x="${(x + dx).toFixed(0)}" y="${(y + dy).toFixed(0)}" width="14" height="8" rx="2" fill="${col}" transform="rotate(${rot.toFixed(0)} ${(x + dx).toFixed(0)} ${(y + dy).toFixed(0)})"/>`;
  }
  return `<g opacity="0.9">${bits}</g>`;
}

function measuringCaliper(x: number, y: number, s: number, rot: number, pinchK: number): string {
  const jawAngle = 22 - pinchK * 16;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<circle cx="0" cy="-90" r="20" fill="#b45309" stroke="#78350f" stroke-width="6"/>`
    + `<circle cx="0" cy="-90" r="8" fill="#fef3c7"/>`
    + `<g transform="rotate(${-jawAngle} 0 -90)">`
    + `<path d="M 0 -90 Q -80 -10 -20 90" fill="none" stroke="#f59e0b" stroke-width="18" stroke-linecap="round"/>`
    + `<circle cx="-20" cy="90" r="10" fill="#78350f"/>`
    + `</g>`
    + `<g transform="rotate(${jawAngle} 0 -90)">`
    + `<path d="M 0 -90 Q 80 -10 20 90" fill="none" stroke="#f59e0b" stroke-width="18" stroke-linecap="round"/>`
    + `<circle cx="20" cy="90" r="10" fill="#78350f"/>`
    + `</g>`
    + `</g>`;
}

function redCarpetPoles(): string {
  return `<g opacity="0.9">`
    + `<line x1="150" y1="880" x2="150" y2="680" stroke="#f59e0b" stroke-width="14"/>`
    + `<circle cx="150" cy="670" r="18" fill="#fbbf24" stroke="#d97706" stroke-width="5"/>`
    + `<line x1="750" y1="880" x2="750" y2="680" stroke="#f59e0b" stroke-width="14"/>`
    + `<circle cx="750" cy="670" r="18" fill="#fbbf24" stroke="#d97706" stroke-width="5"/>`
    + `<line x1="1350" y1="880" x2="1350" y2="680" stroke="#f59e0b" stroke-width="14"/>`
    + `<circle cx="1350" cy="670" r="18" fill="#fbbf24" stroke="#d97706" stroke-width="5"/>`
    + `<path d="M 150 690 Q 450 760 750 690" fill="none" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>`
    + `<path d="M 750 690 Q 1050 760 1350 690" fill="none" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>`
    + `</g>`;
}


// --- SKIT A: fitness influencers + localized gravity (97.23-107.63) -----------
function w4a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";

  const hostSway = Math.sin(t * 3.1) * 3.5;
  const hostBreathe = 1 + Math.sin(t * 2.3) * 0.015;

  const punch = lt >= 6.8;
  // Host scurries slightly inward on punch for perfect duo framing
  const hostX = 420 + easeIO(seg(lt, 6.8, 7.5)) * 110;

  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t, isTalking: lt < 9.5, blink: blinkAt(t),
      rotation: hostSway, scale: hostBreathe,
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pointTarget: punch ? { x: 1150, y: 690 } : undefined,
      gazeTarget: { x: 1150, y: 550 },
    },
  });

  // Fitness influencer enters right: 2100 -> 1150 across [0.3, 1.4]
  const inf = walkerXR(lt, 1150, 0.3, 1.4);
  if (inf.on) {
    const infSway = Math.sin((t + 1) * 3.1) * 3.0;
    const infBreathe = 1 + Math.sin((t + 1) * 2.3) * 0.015;

    const isSquatting = lt >= 1.8 && lt < 6.5;
    const squatCycle = isSquatting ? Math.max(0, Math.sin((lt - 1.8) * 3.6)) : 0;
    const squatY = 665 + squatCycle * 32;

    const hipsPop = easeIO(seg(lt, 6.8, 7.6));

    figs.push({
      id: "influencer", st: {
        x: inf.x, y: squatY, timeSec: t,
        isTalking: punch && lt < 8.2,
        isWalking: inf.walking, blink: blinkAt(t + 1.2),
        gender: "female", hairStyle: "female_ponytail", clothes: "tshirt", eyelashes: true,
        rotation: infSway, scale: infBreathe,
        pose: punch ? "hands_on_hips" : "default",
        expression: punch ? "smug_hands_behind_head" : isSquatting ? "fear_trembling" : "deadpan_line",
        spineLean: squatCycle * 14,
        bodyFacing: inf.walking ? "left" : "front",
        gazeTarget: { x: hostX, y: 620 },
      },
    });

    if (isSquatting) {
      fg += dumbbell(inf.x - 55, squatY - 30 + squatCycle * 15, 0.9, -15);
      fg += dumbbell(inf.x + 55, squatY - 30 + squatCycle * 15, 0.9, 15);
    }

    if (hipsPop > 0) {
      fg += hipCurves(inf.x, 695, hipsPop * 1.4);
      fg += gravityRings(inf.x, 695, hipsPop, t);
    }
  }

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1150" cy="250" r="145" fill="#38bdf8" opacity="0.13"/>`);

  return {
    bg, figs, fg,
    cam: punch
      ? { cx: 860, cy: 560, zoom: 1.36, cut: false }
      : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}


// --- SKIT B: the overfilled hourglass flex (107.63-113.40) -------------------
function w4b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";

  const hostSway = Math.sin(t * 3.1) * 3.5;
  const hostBreathe = 1 + Math.sin(t * 2.3) * 0.015;

  const punch = lt >= 3.6;
  figs.push({
    id: "host", st: {
      x: 430, y: 670, timeSec: t, isTalking: lt < 4.8, blink: blinkAt(t),
      rotation: hostSway, scale: hostBreathe,
      expression: punch ? "deadpan_shrug" : "deadpan_classic",
      pointTarget: punch ? { x: 960, y: 440 } : undefined,
      gazeTarget: { x: 960, y: 440 },
    },
  });

  // Hourglass drops in: y = -300 -> 440 over [0.2, 0.9]
  const dropK = easeIO(seg(lt, 0.2, 0.9));
  const hgY = lerp(-300, 440, dropK);
  const bulgeK = easeIO(seg(lt, 3.4, 4.2));
  fg += overfilledHourglass(960, hgY, 1.05, t, bulgeK);

  // Model enters right to pose next to hourglass: 2100 -> 1320 over [0.3, 1.2]
  const mod = walkerXR(lt, 1320, 0.3, 1.2);
  if (mod.on) {
    const modSway = Math.sin((t + 2) * 3.1) * 3.0;
    const modBreathe = 1 + Math.sin((t + 2) * 2.3) * 0.015;

    figs.push({
      id: "model", st: {
        x: mod.x, y: 670, timeSec: t,
        isTalking: punch && lt < 4.8,
        isWalking: mod.walking, blink: blinkAt(t + 1.8),
        gender: "female", hairStyle: "female_long", clothes: "dress_black", eyelashes: true,
        rotation: modSway, scale: modBreathe,
        pose: punch ? "hands_on_hips" : "default",
        expression: punch ? "smug_rock_eyebrow" : "deadpan_line",
        spineLean: punch ? -6 : 0,
        bodyFacing: mod.walking ? "left" : "front",
        gazeTarget: { x: 960, y: 440 },
      },
    });

    if (bulgeK > 0) {
      fg += hipCurves(mod.x, 695, bulgeK * 1.35);
    }
  }

  const bg = stage("#fefce8", "#fef08a",
    `<circle cx="960" cy="240" r="150" fill="#eab308" opacity="0.14"/>`);

  return {
    bg, figs, fg,
    cam: punch
      ? { cx: 960, cy: 540, zoom: 1.42, cut: false }
      : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}


// --- SKIT C: PR agency "body positivity" parade (113.40-122.92) --------------
function w4c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";

  const hostSway = Math.sin(t * 3.1) * 3.5;
  const hostBreathe = 1 + Math.sin(t * 2.3) * 0.015;

  const punch = lt >= 6.8;
  figs.push({
    id: "host", st: {
      x: 390, y: 670, timeSec: t, isTalking: lt < 7.2, blink: blinkAt(t),
      rotation: hostSway, scale: hostBreathe,
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      gazeTarget: { x: 1100, y: 550 },
    },
  });

  const bannerPop = easeIO(seg(lt, 0.4, 1.2));
  if (bannerPop > 0) {
    fg += prBanner(1050, 430, bannerPop * 0.95);
  }

  // PR Executive: 2100 -> 1320 across [0.5, 1.6]
  const pr = walkerXR(lt, 1320, 0.5, 1.6);
  if (pr.on) {
    const prSway = Math.sin((t + 3) * 3.1) * 3.0;
    const prBreathe = 1 + Math.sin((t + 3) * 2.3) * 0.015;
    const prTalking = lt >= 2.0 && lt < 5.8;

    figs.push({
      id: "pr_exec", st: {
        x: pr.x, y: 665, timeSec: t,
        isTalking: prTalking,
        isWalking: pr.walking, blink: blinkAt(t + 0.8),
        gender: "male", hairStyle: "male_short", clothes: "tech_bro",
        rotation: prSway, scale: prBreathe,
        expression: punch ? "smug_thumbs_up" : "blissful_serenity",
        pointTarget: prTalking ? { x: 740, y: 550 } : undefined,
        bodyFacing: pr.walking ? "left" : "front",
        gazeTarget: { x: 740, y: 550 },
      },
    });
  }

  // Model: -200 -> 740 across [1.4, 2.5]
  const mod = walkerX(lt, 740, 1.4, 2.5, 20, 21);
  if (mod.on) {
    const modSway = Math.sin((t + 4) * 3.1) * 3.0;
    const modBreathe = 1 + Math.sin((t + 4) * 2.3) * 0.015;

    figs.push({
      id: "pr_model", st: {
        x: mod.x, y: 670, timeSec: t,
        isTalking: false,
        isWalking: mod.walking, blink: blinkAt(t + 2.1),
        gender: "female", hairStyle: "female_bob", clothes: "dress_pink", eyelashes: true,
        rotation: modSway, scale: modBreathe,
        expression: "smug_peace_sign",
        bodyFacing: mod.walking ? "right" : "front",
        gazeTarget: { x: 1050, y: 550 },
      },
    });
  }

  if (lt >= 4.0) {
    fg += confettiBurst(1050, 260, 1.2, lt - 4.0);
  }

  const bg = stage("#fff1f2", "#ffe4e6",
    `<circle cx="1050" cy="240" r="150" fill="#f43f5e" opacity="0.12"/>`);

  return {
    bg, figs, fg,
    cam: punch
      ? { cx: 890, cy: 560, zoom: 1.40, cut: false }
      : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}


// --- SKIT D: Hollywood progression vs the caliper (122.92-128.84) ------------
function w4d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";

  const hostSway = Math.sin(t * 3.1) * 3.5;
  const hostBreathe = 1 + Math.sin(t * 2.3) * 0.015;

  const punch = lt >= 3.6;
  figs.push({
    id: "host", st: {
      x: 440, y: 670, timeSec: t, isTalking: lt < 4.8, blink: blinkAt(t),
      rotation: hostSway, scale: hostBreathe,
      expression: punch ? "deadpan_soul_stare" : "deadpan_classic",
      gazeTarget: punch ? { x: 440, y: 670 } : { x: 1200, y: 550 },
    },
  });

  // Hollywood Studio Executive: 2100 -> 1220 across [0.3, 1.3]
  const exec = walkerXR(lt, 1220, 0.3, 1.3);
  if (exec.on) {
    const execSway = Math.sin((t + 5) * 3.1) * 3.0;
    const execBreathe = 1 + Math.sin((t + 5) * 2.3) * 0.015;

    figs.push({
      id: "exec", st: {
        x: exec.x, y: 665, timeSec: t,
        isTalking: punch && lt < 5.0,
        isWalking: exec.walking, blink: blinkAt(t + 1.5),
        gender: "male", hairStyle: "male_short", clothes: "tech_bro",
        rotation: execSway, scale: execBreathe,
        expression: punch ? "dollar_eyes_greed" : "deadpan_line",
        bodyFacing: exec.walking ? "left" : "front",
        gazeTarget: { x: 440, y: 620 },
      },
    });

    // Caliper held at hand height (y=570)
    const calK = easeIO(seg(lt, 2.6, 3.4));
    if (calK > 0) {
      const pinchK = easeIO(seg(lt, 3.4, 4.4));
      fg += measuringCaliper(exec.x - 140, 570, calK * 1.5, -20, pinchK);
    }
  }

  if (punch) {
    if (Math.sin(t * 14) > 0.1) fg += flashBurst(1050, 380, 1.1);
    if (Math.cos(t * 11) > 0.1) fg += flashBurst(1380, 360, 1.2);
  }

  const bg = stage("#f8fafc", "#cbd5e1", redCarpetPoles());

  return {
    bg, figs, fg,
    cam: punch
      ? { cx: 860, cy: 560, zoom: 1.45, cut: false }
      : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}


// --- driver ------------------------------------------------------------------
export const GAGS: GagDef[] = [
  { start: 97.23, end: 107.63, fn: w4a },
  { start: 107.63, end: 113.40, fn: w4b },
  { start: 113.40, end: 122.92, fn: w4c },
  { start: 122.92, end: 128.84, fn: w4d },
];

export { w4a, w4b, w4c, w4d };

async function main(): Promise<void> {
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
    stillsDir: path.join(root, "output", "gag_w04_stills"),
    tag: "w04",
  });
  if (stillList.length > 0) process.exit(0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
