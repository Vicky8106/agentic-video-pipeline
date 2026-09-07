/**
 * GAG PART 2 (t = 253.21 - 375.93): Celebrity Denial, MCU Dehydration & Buccal Fat Boss Fight.
 *
 * Authored strictly to the gold-standard hand-driven specification
 * (/root/Desktop/hand_driven_approach.pdf):
 *   p2_a (253.21-264.78): Mindy Kaling / "Diet & Exercise" neon sign
 *   p2_b (264.78-269.77): Finding loose change in couch cushions (Ferrari keys & gold bars)
 *   p2_c (269.77-277.81): Golden age of celebrity denial & flashing paparazzi cameras
 *   p2_d (277.81-283.73): Reporter asking about 30 lbs in 4 weeks & stone-cold stare
 *   p2_e (283.73-291.08): 5-gallon water chug & pillow strapped to head (Hydration concept)
 *   p2_f (291.08-299.70): "Gut reset" cheese block X-ray skeletal alteration
 *   p2_g (299.70-307.46): Male marketing contrast (runway starvation vs barbell battle roar)
 *   p2_h (307.46-315.30): Dangerously shredded for MCU with exploding bicep lightning
 *   p2_i (315.30-324.52): 3-day dehydration shrink-wrapped leftover supermarket ham
 *   p2_j (324.52-334.81): Unseasoned dry chicken & rubbery broccoli plate gag
 *   p2_k (334.81-344.74): TRT swimming branded as "Discipline & 4 AM Alarm"
 *   p2_l (344.74-350.01): The next aesthetic meta evolution
 *   p2_m (350.01-355.76): BOSS FIGHT: LVL 99 BUCCAL FAT health bar & warning sirens
 *   p2_n (355.76-364.43): Chubby youthful cheeks vs sunken hollow Victorian ghoul
 *   p2_o (364.43-375.93): Scooping pumpkin fat pads & deli meat cheekbone slicer
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt, FLOOR,
  stage, couch, walkerX, walkerXR, flashBurst,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "253.21"));
const T1 = parseFloat(arg("end", "375.93"));
const outFile = arg("out", path.join(root, "output", "master_chunks", "c06_part2.mp4"));
const stillsArg = arg("stills", "");

// =============================================================================
// BESPOKE GRAPHIC PROPS (ZERO WORDS HOUSE RULE)
// =============================================================================

function pressConferenceMics(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-120" y="0" width="240" height="180" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="6"/>`
    + `<circle cx="-80" cy="-20" r="14" fill="#38bdf8"/><line x1="-80" y1="-10" x2="-80" y2="10" stroke="#64748b" stroke-width="6"/>`
    + `<circle cx="-30" cy="-35" r="16" fill="#ef4444"/><line x1="-30" y1="-20" x2="-30" y2="10" stroke="#64748b" stroke-width="6"/>`
    + `<circle cx="30" cy="-30" r="15" fill="#facc15"/><line x1="30" y1="-15" x2="30" y2="10" stroke="#64748b" stroke-width="6"/>`
    + `<circle cx="80" cy="-22" r="14" fill="#22c55e"/><line x1="80" y1="-10" x2="80" y2="10" stroke="#64748b" stroke-width="6"/>`
    + `</g>`;
}

function waterChugJug(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<rect x="-50" y="-90" width="100" height="180" rx="20" fill="#38bdf8" stroke="#0284c7" stroke-width="8" opacity="0.85"/>`
    + `<rect x="-20" y="-120" width="40" height="30" rx="6" fill="#0369a1"/>`
    + `<line x1="-50" y1="-20" x2="50" y2="-20" stroke="#bae6fd" stroke-width="6"/>`
    + `<line x1="-50" y1="30" x2="50" y2="30" stroke="#bae6fd" stroke-width="6"/>`
    + `</g>`;
}

function radioactiveCheese(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<polygon points="-70,40 70,40 40,-40 -40,-40" fill="#fbbf24" stroke="#d97706" stroke-width="6"/>`
    + `<circle cx="-20" cy="10" r="12" fill="#d97706"/><circle cx="25" cy="5" r="15" fill="#d97706"/><circle cx="0" cy="-15" r="8" fill="#d97706"/>`
    + `</g>`;
}

function shrinkWrappedHam(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-140" y="-40" width="280" height="80" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="6"/>`
    + `<ellipse cx="0" cy="0" rx="110" ry="28" fill="#f43f5e" stroke="#be123c" stroke-width="6"/>`
    + `<line x1="-80" y1="-10" x2="80" y2="-10" stroke="#fda4af" stroke-width="4"/>`
    + `<rect x="60" y="-30" width="60" height="35" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>`
    + `<line x1="70" y1="-20" x2="110" y2="-20" stroke="#854d0e" stroke-width="4"/>`
    + `<line x1="70" y1="-10" x2="100" y2="-10" stroke="#854d0e" stroke-width="4"/>`
    + `</g>`;
}

function sadChickenBroccoliPlate(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<ellipse cx="0" cy="20" rx="120" ry="30" fill="#e2e8f0" stroke="#64748b" stroke-width="6"/>`
    + `<polygon points="-80,10 -20,-15 10,15 -50,25" fill="#cbd5e1" stroke="#94a3b8" stroke-width="4"/>`
    + `<circle cx="45" cy="0" r="22" fill="#15803d" stroke="#166534" stroke-width="4"/>`
    + `<circle cx="65" cy="8" r="16" fill="#16a34a"/>`
    + `</g>`;
}

function screamingAlarmClock(x: number, y: number, s: number, shake: number): string {
  return `<g transform="translate(${x + shake} ${y}) scale(${s})">`
    + `<circle cx="0" cy="0" r="70" fill="#0f172a" stroke="#ef4444" stroke-width="8"/>`
    + `<circle cx="-50" cy="-65" r="24" fill="#ef4444" stroke="#991b1b" stroke-width="6"/>`
    + `<circle cx="50" cy="-65" r="24" fill="#ef4444" stroke="#991b1b" stroke-width="6"/>`
    + `<line x1="-35" y1="60" x2="-55" y2="85" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>`
    + `<line x1="35" y1="60" x2="55" y2="85" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>`
    + `<text x="0" y="16" font-family="'Courier New', monospace" font-weight="900" font-size="34" fill="#ef4444" text-anchor="middle">04:00</text>`
    + `</g>`;
}

function bossFightHealthBar(x: number, y: number, s: number, hp: number): string {
  const hpW = Math.max(0, 360 * hp);
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-200" y="-40" width="400" height="80" rx="12" fill="#020617" stroke="#dc2626" stroke-width="6" filter="url(#glow)"/>`
    + `<rect x="-180" y="-10" width="360" height="30" rx="6" fill="#450a0a"/>`
    + `<rect x="-180" y="-10" width="${hpW}" height="30" rx="6" fill="#ef4444"/>`
    + `<polygon points="-180,-25 -160,-25 -170,-38" fill="#facc15"/>`
    + `<circle cx="180" cy="0" r="14" fill="#dc2626"/>`
    + `</g>`;
}

function pumpkinScoop(x: number, y: number, s: number, scoopK: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<circle cx="0" cy="0" r="85" fill="#ea580c" stroke="#9a3412" stroke-width="8"/>`
    + `<rect x="-12" y="-115" width="24" height="35" rx="6" fill="#15803d"/>`
    + `<ellipse cx="10" cy="-10" rx="45" ry="30" fill="#431407" stroke="#9a3412" stroke-width="6"/>`
    + `<g transform="translate(${lerp(100, 20, scoopK)} ${lerp(-80, -10, scoopK)}) rotate(${lerp(-30, 20, scoopK)})">`
    + `<line x1="-30" y1="0" x2="60" y2="0" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>`
    + `<ellipse cx="-40" cy="0" rx="20" ry="14" fill="#e2e8f0" stroke="#64748b" stroke-width="4"/>`
    + `<circle cx="-40" cy="0" r="10" fill="#f97316"/>`
    + `</g></g>`;
}

function deliMeatSlicer(x: number, y: number, s: number, spin: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-120" y="40" width="240" height="50" rx="10" fill="#334155" stroke="#0f172a" stroke-width="6"/>`
    + `<circle cx="0" cy="-20" r="80" fill="#cbd5e1" stroke="#475569" stroke-width="8"/>`
    + `<circle cx="0" cy="-20" r="20" fill="#0f172a"/>`
    + `<g transform="rotate(${spin} 0 -20)">`
    + `<line x1="0" y1="-100" x2="0" y2="60" stroke="#94a3b8" stroke-width="4"/>`
    + `<line x1="-80" y1="-20" x2="80" y2="-20" stroke="#94a3b8" stroke-width="4"/>`
    + `</g></g>`;
}

// =============================================================================
// 15 HAND-DRIVEN SKITS (253.21s -> 375.93s)
// =============================================================================

// 1. Mindy Kaling / Celebrity Transformation (253.21 - 264.78)
function p2_a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 8.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  const star = walkerXR(lt, 1100, 0.5, 2.0);
  if (star.on) {
    figs.push({
      id: "star", st: {
        x: star.x, y: 670, timeSec: t, isTalking: false, isWalking: star.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_red_carpet",
        costume: "y2k_sunglasses", expression: punch ? "smug_hands_behind_head" : "deadpan_classic",
      },
    });
  }

  if (punch) fg += flashBurst(1100, 380, 1.2);

  const bg = stage("#fdf2f8", "#fce7f3",
    `<circle cx="1100" cy="240" r="180" fill="#ec4899" opacity="0.15"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 2. Loose Change in Couch Cushions (264.78 - 269.77)
function p2_b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 3.5, blink: blinkAt(t),
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 520 } : undefined,
    },
  });

  // Diver digging in couch
  const digger = walkerXR(lt, 1050, 0.2, 1.2);
  if (digger.on) {
    figs.push({
      id: "digger", st: {
        x: digger.x, y: 680, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
        gender: "male", hairStyle: "male_short", clothes: "hoodie",
        expression: punch ? "shock_jaw_drop" : "confused_squint",
        spineLean: Math.sin(t * 12) * 10,
      },
    });
  }

  fg += couch(1050, 720, 1.1);
  if (punch) {
    fg += flashBurst(1050, 480, 1.1);
    // Ferrari keys & gold bars flying out
    fg += `<g transform="translate(1050 ${lerp(650, 460, easeIO(seg(lt, 2.5, 3.5)))}) scale(0.9)">`
      + `<rect x="-30" y="-15" width="60" height="30" rx="6" fill="#eab308" stroke="#a16207" stroke-width="4"/>`
      + `<circle cx="35" cy="0" r="14" fill="#ef4444" stroke="#991b1b" stroke-width="4"/>`
      + `</g>`;
  }

  const bg = stage("#f5f3ff", "#ede9fe",
    `<circle cx="1050" cy="240" r="180" fill="#8b5cf6" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 3. Golden Age of Celebrity Denial & Paparazzi (269.77 - 277.81)
function p2_c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const celeb = walkerXR(lt, 1080, 0.4, 1.8);
  if (celeb.on) {
    figs.push({
      id: "celeb", st: {
        x: celeb.x, y: 670, timeSec: t, isTalking: false, isWalking: celeb.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "suit",
        expression: "deadpan_classic",
      },
    });
  }

  fg += pressConferenceMics(1080, 680, 1.0);
  if (punch) {
    const flashIdx = Math.floor(t * 8) % 3;
    const fx = 880 + flashIdx * 180;
    fg += flashBurst(fx, 420, 1.0);
  }

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#3b82f6" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 530, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 4. Lost 30 Lbs in 4 Weeks Dead-Eyed Stare (277.81 - 283.73)
function p2_d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 4.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 520 } : undefined,
    },
  });

  const celeb = walkerXR(lt, 1050, 0.4, 1.6);
  if (celeb.on) {
    figs.push({
      id: "celeb", st: {
        x: celeb.x, y: 670, timeSec: t, isTalking: false, isWalking: celeb.walking,
        blink: false,
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_black",
        expression: "deadpan_classic",
      },
    });
  }

  if (punch) fg += flashBurst(1050, 480, 0.9);

  const bg = stage("#f1f5f9", "#e2e8f0",
    `<circle cx="1050" cy="240" r="160" fill="#64748b" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 520, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 5. 5-Gallon Water Chug & Concept of Hydration (283.73 - 291.08)
function p2_e(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const jugRot = lerp(0, 110, easeIO(seg(lt, 2.0, 4.5)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 520 } : undefined,
    },
  });

  const drinker = walkerXR(lt, 1050, 0.4, 1.8);
  if (drinker.on) {
    figs.push({
      id: "drinker", st: {
        x: drinker.x, y: 670, timeSec: t, isTalking: false, isWalking: drinker.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "tshirt",
        expression: punch ? "fear_trembling" : "smug_chuckle",
        spineLean: -12,
      },
    });
  }

  fg += waterChugJug(1020, 520, 1.0, jugRot);
  if (punch) fg += flashBurst(1020, 440, 1.0);

  const bg = stage("#f0f9ff", "#e0f2fe",
    `<circle cx="1050" cy="240" r="180" fill="#0284c7" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 6. "Gut Reset" Cheese Block Altering Skeleton (291.08 - 299.70)
function p2_f(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const eater = walkerXR(lt, 1080, 0.5, 1.8);
  if (eater.on) {
    figs.push({
      id: "eater", st: {
        x: eater.x, y: 670, timeSec: t, isTalking: false, isWalking: eater.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "y2k_crop_top_low_rise",
        expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
      },
    });
  }

  fg += radioactiveCheese(850, 680, 1.0);
  if (punch) fg += flashBurst(850, 640, 1.0);

  const bg = stage("#fefce8", "#fef9c3",
    `<circle cx="1080" cy="240" r="180" fill="#eab308" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 7. Male Marketing Contrast (299.70 - 307.46)
function p2_g(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  const bro = walkerXR(lt, 1100, 0.5, 1.8);
  if (bro.on) {
    figs.push({
      id: "bro", st: {
        x: bro.x, y: 670, timeSec: t, isTalking: false, isWalking: bro.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "tshirt",
        expression: punch ? "smug_hands_behind_head" : "deadpan_classic",
      },
    });
  }

  fg += `<g transform="translate(1100 680) scale(0.9)">`
    + `<rect x="-70" y="-12" width="140" height="24" rx="6" fill="#64748b"/>`
    + `<rect x="-90" y="-35" width="25" height="70" rx="8" fill="#1e293b"/>`
    + `<rect x="65" y="-35" width="25" height="70" rx="8" fill="#1e293b"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1100, 520, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1100" cy="240" r="180" fill="#3b82f6" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 8. Dangerously Shredded for MCU (307.46 - 315.30)
function p2_h(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const bicepScale = lerp(1.0, 1.6, easeIO(seg(lt, 2.0, 4.5)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 500 } : undefined,
    },
  });

  const hero = walkerXR(lt, 1080, 0.4, 1.8);
  if (hero.on) {
    figs.push({
      id: "hero", st: {
        x: hero.x, y: 670, scale: bicepScale, timeSec: t, isTalking: false, isWalking: hero.walking,
        gender: "male", hairStyle: "male_short", clothes: "tshirt",
        expression: punch ? "angry_steaming" : "smug_hands_behind_head",
      },
    });
  }

  if (punch) {
    fg += flashBurst(1080, 420, 1.2);
    fg += `<path d="M 1040 320 L 1080 380 L 1050 400 L 1110 460" stroke="#facc15" stroke-width="8" fill="none" filter="url(#glow)"/>`;
  }

  const bg = stage("#fef2f2", "#fee2e2",
    `<circle cx="1080" cy="240" r="180" fill="#ef4444" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 500, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 9. 3-Day Dehydration Shrink-Wrapped Ham (315.30 - 324.52)
function p2_i(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const actor = walkerXR(lt, 1080, 0.4, 1.8);
  if (actor.on) {
    figs.push({
      id: "actor", st: {
        x: actor.x, y: 670, timeSec: t, isTalking: false, isWalking: actor.walking,
        gender: "male", hairStyle: "male_short", clothes: "tshirt",
        expression: punch ? "fear_trembling" : "deadpan_classic",
        spineLean: punch ? Math.sin(t * 12) * 5 : 0,
      },
    });
  }

  fg += shrinkWrappedHam(1080, 520, 1.1);
  if (punch) fg += flashBurst(1080, 480, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="160" fill="#f43f5e" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 10. Late 40s Transformation: Unseasoned Chicken & Steamed Broccoli (324.52 - 334.81)
function p2_j(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 550 } : undefined,
    },
  });

  const eater = walkerXR(lt, 1080, 0.4, 1.8);
  if (eater.on) {
    figs.push({
      id: "eater", st: {
        x: eater.x, y: 670, timeSec: t, isTalking: false, isWalking: eater.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_tech_bro", clothes: "tshirt",
        expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
      },
    });
  }

  fg += sadChickenBroccoliPlate(880, 680, 1.0);
  if (punch) fg += flashBurst(880, 640, 0.9);

  const bg = stage("#f1f5f9", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#16a34a" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1020, cy: 550, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 11. TRT Branded as Discipline and 4 AM Alarm (334.81 - 344.74)
function p2_k(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.0;
  const shake = punch ? Math.sin(t * 24) * 6 : 0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 500 } : undefined,
    },
  });

  const monk = walkerXR(lt, 1080, 0.4, 1.8);
  if (monk.on) {
    figs.push({
      id: "monk", st: {
        x: monk.x, y: 670, timeSec: t, isTalking: false, isWalking: monk.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "hoodie",
        expression: punch ? "fear_trembling" : "deadpan_classic",
      },
    });
  }

  fg += screamingAlarmClock(1080, 480, 1.0, shake);
  if (punch) fg += flashBurst(1080, 420, 1.2);

  const bg = stage("#0f172a", "#020617",
    `<circle cx="1080" cy="240" r="180" fill="#dc2626" opacity="0.15"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 500, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 12. Next Aesthetic Evolution (344.74 - 350.01)
function p2_l(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.0;

  figs.push({
    id: "host", st: {
      x: 420, y: 670, timeSec: t, isTalking: lt < 4.0, blink: blinkAt(t),
      expression: punch ? "smug_finger_guns" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  const guest = walkerXR(lt, 1100, 0.4, 1.8);
  if (guest.on) {
    figs.push({
      id: "guest", st: {
        x: guest.x, y: 670, timeSec: t, isTalking: false, isWalking: guest.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_long", clothes: "dress_black",
        expression: "confused_squint",
      },
    });
  }

  if (punch) fg += flashBurst(1100, 460, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1100" cy="240" r="160" fill="#8b5cf6" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 520, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 13. BOSS FIGHT: LVL 99 BUCCAL FAT (350.01 - 355.76)
function p2_m(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.0;
  const hpK = 1.0 - easeIO(seg(lt, 2.0, 4.5)) * 0.7;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 4.5, blink: blinkAt(t),
      expression: punch ? "shock_home_alone" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 460 } : undefined,
    },
  });

  const warrior = walkerXR(lt, 1080, 0.3, 1.5);
  if (warrior.on) {
    figs.push({
      id: "warrior", st: {
        x: warrior.x, y: 670, timeSec: t, isTalking: false, isWalking: warrior.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "y2k_crop_top_low_rise",
        expression: punch ? "angry_steaming" : "deadpan_classic",
      },
    });
  }

  fg += bossFightHealthBar(1080, 420, 1.1, hpK);
  if (punch) fg += flashBurst(1080, 360, 1.1);

  const bg = stage("#020617", "#0f172a",
    `<circle cx="1080" cy="240" r="180" fill="#dc2626" opacity="0.18"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 480, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 14. Chubby Youthful Cheeks vs Sunken Ghoul (355.76 - 364.43)
function p2_n(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const normalFace = walkerXR(lt, 880, 0.4, 1.6);
  if (normalFace.on) {
    figs.push({
      id: "normal_face", st: {
        x: normalFace.x, y: 670, timeSec: t, isTalking: false, isWalking: normalFace.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_black",
        expression: "blissful_serenity",
      },
    });
  }

  const hollowFace = walkerXR(lt, 1180, 0.8, 2.0);
  if (hollowFace.on) {
    figs.push({
      id: "hollow_face", st: {
        x: hollowFace.x, y: 670, timeSec: t, isTalking: false, isWalking: hollowFace.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_slicked_back", clothes: "y2k_crop_top_low_rise",
        expression: "cringe_teeth_grit",
      },
    });
  }

  if (punch) fg += flashBurst(1180, 480, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#a855f7" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 530, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 15. Pumpkin Scoop & Deli Meat Cheekbone Slicer (364.43 - 375.93)
function p2_o(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.0;
  const scoopK = easeIO(seg(lt, 1.5, 5.0));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.5, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const patient = walkerXR(lt, 1150, 0.4, 1.8);
  if (patient.on) {
    figs.push({
      id: "patient", st: {
        x: patient.x, y: 670, timeSec: t, isTalking: false, isWalking: patient.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
        expression: punch ? "fear_trembling" : "deadpan_classic",
      },
    });
  }

  fg += pumpkinScoop(880, 620, 0.9, scoopK);
  if (punch) {
    fg += deliMeatSlicer(1120, 520, 0.95, t * 720);
    fg += flashBurst(1120, 480, 1.1);
  }

  const bg = stage("#fff7ed", "#ffedd5",
    `<circle cx="1080" cy="240" r="180" fill="#ea580c" opacity="0.15"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// =============================================================================
// WINDOW DRIVER REGISTRATION
// =============================================================================

const GAGS: GagDef[] = [
  { start: 253.21, end: 264.78, fn: p2_a },
  { start: 264.78, end: 269.77, fn: p2_b },
  { start: 269.77, end: 277.81, fn: p2_c },
  { start: 277.81, end: 283.73, fn: p2_d },
  { start: 283.73, end: 291.08, fn: p2_e },
  { start: 291.08, end: 299.70, fn: p2_f },
  { start: 299.70, end: 307.46, fn: p2_g },
  { start: 307.46, end: 315.30, fn: p2_h },
  { start: 315.30, end: 324.52, fn: p2_i },
  { start: 324.52, end: 334.81, fn: p2_j },
  { start: 334.81, end: 344.74, fn: p2_k },
  { start: 344.74, end: 350.01, fn: p2_l },
  { start: 350.01, end: 355.76, fn: p2_m },
  { start: 355.76, end: 364.43, fn: p2_n },
  { start: 364.43, end: 375.93, fn: p2_o },
];

const stillList = stillsArg ? stillsArg.split(",").map(s => parseFloat(s)) : [];

if (arg("audit", "0") === "1") {
  const SAMPLES = 8;
  const NEED = 4;
  let fails = 0;
  console.log(`=== RUNNING 7-CHANNEL ANTI-STATUE MOTION AUDIT (PART 2: 15 SKITS) ===`);
  GAGS.forEach((g, idx) => {
    const outs = Array.from({ length: SAMPLES }, (_, i) => {
      const t = g.start + ((g.end - g.start) * (i + 0.5)) / SAMPLES;
      return g.fn(t, t - g.start);
    });
    const ch = new Set<string>();
    const xs = new Map<string, number[]>();
    const rots: number[] = [];
    const scales: number[] = [];
    for (const o of outs) {
      for (const f of o.figs) {
        if (!xs.has(f.id)) xs.set(f.id, []);
        xs.get(f.id)!.push(f.st.x);
        rots.push(f.st.rotation ?? 0);
        scales.push(f.st.scale ?? 1);
        if (f.st.isTalking) ch.add("talk");
        if (f.st.pointTarget !== undefined) ch.add("point");
      }
    }
    const range = (a: number[]) => Math.max(...a) - Math.min(...a);
    for (const v of xs.values()) if (range(v) > 2) { ch.add("figX"); break; }
    if (range(rots) > 0.5) ch.add("figRot");
    if (range(scales) > 0.005) ch.add("figScale");
    if (new Set(outs.map(o => o.fg.length)).size > 1) ch.add("fg");
    if (range(outs.map(o => o.cam.zoom)) > 1e-4 || range(outs.map(o => o.cam.cx)) > 1) ch.add("cam");
    const pass = ch.size >= NEED;
    if (!pass) fails++;
    console.log(`[audit-motion] Skit ${String.fromCharCode(97 + idx)} (${g.start.toFixed(1)}s - ${g.end.toFixed(1)}s): channels ${ch.size}/7 [${[...ch].join(",")}] -> ${pass ? "PASS" : "FAIL"}`);
  });
  console.log(fails === 0 ? "ALL 15 SKITS PASS 7-CHANNEL MOTION AUDIT!" : `AUDIT FAILED: ${fails} skits failed.`);
  process.exit(fails === 0 ? 0 : 1);
}

await driveGags({
  gags: GAGS,
  t0: T0,
  t1: T1,
  outFile,
  stills: stillList,
  fps,
  width,
  height,
  stillsDir: path.join(root, "output", "part2_stills"),
  tag: "part2",
});

if (stillList.length > 0) {
  console.log(`[part2] Generated ${stillList.length} stills. Exiting.`);
  process.exit(0);
}
