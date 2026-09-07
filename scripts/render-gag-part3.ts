/**
 * GAG PART 3 (t = 375.93 - 524.00): Victorian Gothic Mourning, Zapruder Calipers & Obama Bread Vault.
 *
 * Authored strictly to the gold-standard hand-driven specification
 * (/root/Desktop/hand_driven_approach.pdf):
 *   p3_a (375.93-387.97): "Ozempic Face" rapid systemic fat loss & buccal fat combo
 *   p3_b (387.97-399.99): Victorian gothic mourning: tombstone, raven, gothic raincloud
 *   p3_c (399.99-411.22): Sea of manufactured faces & smooth android replicas
 *   p3_d (411.22-420.75): Jenna Ortega internet scrutiny & magnifying glass
 *   p3_e (420.75-428.77): Stressed workaholic desk with scripts & spinning clock
 *   p3_f (428.77-437.61): Star of Wednesday: Tim Burton gothic cello & crawling severed hand
 *   p3_g (437.61-449.12): Digital tribunal courtroom: judge gavel slamming shockwaves
 *   p3_h (449.12-457.04): TikTok Zapruder film analysis: precision calipers & crosshairs
 *   p3_i (457.04-467.10): Inescapable feedback loop: descending spiral abyss
 *   p3_j (467.10-473.91): Size 4 considered "curvy" by LA standards (palm tree & tape measure)
 *   p3_k (473.91-487.24): RPG character creation screen: wireframe cheek sliders
 *   p3_l (487.24-492.28): Running on a lithium-ion battery: green charging icon & power plug
 *   p3_m (492.28-497.14): Structural crisis in entertainment: clapperboard snapping shut
 *   p3_n (497.14-508.21): Mirror of reality: regular sweatshirt stick figure vs golden idol
 *   p3_o (508.21-524.00): Cyborg who hasn't eaten carbs since Obama 2008 in laser vault
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt, FLOOR,
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
const T0 = parseFloat(arg("start", "375.93"));
const T1 = parseFloat(arg("end", "524.00"));
const outFile = arg("out", path.join(root, "output", "master_chunks", "c07_part3.mp4"));
const stillsArg = arg("stills", "");

// =============================================================================
// BESPOKE GRAPHIC PROPS (ZERO WORDS HOUSE RULE)
// =============================================================================

function victorianTombstone(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<path d="M -60 70 L -60 -40 C -60 -100 60 -100 60 -40 L 60 70 Z" fill="#475569" stroke="#1e293b" stroke-width="6"/>`
    + `<line x1="-30" y1="-20" x2="30" y2="-20" stroke="#334155" stroke-width="6"/>`
    + `<line x1="0" y1="-45" x2="0" y2="10" stroke="#334155" stroke-width="6"/>`
    + `<circle cx="45" cy="-90" r="14" fill="#0f172a"/>`
    + `<polygon points="45,-90 70,-85 50,-78" fill="#d97706"/>`
    + `</g>`;
}

function crawlingHand(x: number, y: number, s: number, crawl: number): string {
  const dy = Math.abs(Math.sin(crawl * 8)) * 14;
  return `<g transform="translate(${x} ${y - dy}) scale(${s})">`
    + `<circle cx="0" cy="-20" r="22" fill="#fcd9b8" stroke="#0f172a" stroke-width="5"/>`
    + `<line x1="-16" y1="-10" x2="-26" y2="12" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
    + `<line x1="-6" y1="-10" x2="-10" y2="18" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
    + `<line x1="6" y1="-10" x2="10" y2="18" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
    + `<line x1="16" y1="-10" x2="26" y2="12" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
    + `<line x1="12" y1="-28" x2="25" y2="-20" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>`
    + `</g>`;
}

function courtGavel(x: number, y: number, s: number, slam: number): string {
  const rot = lerp(-40, 15, easeIO(slam));
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<ellipse cx="0" cy="50" rx="60" ry="18" fill="#78350f" stroke="#451a03" stroke-width="6"/>`
    + `<g transform="rotate(${rot} 0 20)">`
    + `<rect x="-18" y="-70" width="36" height="60" rx="8" fill="#92400e" stroke="#451a03" stroke-width="6"/>`
    + `<line x1="0" y1="-40" x2="90" y2="-40" stroke="#b45309" stroke-width="10" stroke-linecap="round"/>`
    + `</g></g>`;
}

function zapruderCalipers(x: number, y: number, s: number, spread: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<circle cx="0" cy="-60" r="10" fill="#38bdf8"/>`
    + `<line x1="0" y1="-60" x2="${-25 - spread}" y2="50" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>`
    + `<line x1="0" y1="-60" x2="${25 + spread}" y2="50" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>`
    + `<line x1="${-20 - spread * 0.7}" y1="0" x2="${20 + spread * 0.7}" y2="0" stroke="#64748b" stroke-width="4"/>`
    + `<circle cx="0" cy="50" r="45" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="6 4"/>`
    + `<line x1="-55" y1="50" x2="55" y2="50" stroke="#ef4444" stroke-width="2"/>`
    + `<line x1="0" y1="-5" x2="0" y2="105" stroke="#ef4444" stroke-width="2"/>`
    + `</g>`;
}

function rpgCharacterScreen(x: number, y: number, s: number, sliderX: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-180" y="-120" width="360" height="240" rx="14" fill="#090d16" stroke="#38bdf8" stroke-width="6"/>`
    + `<rect x="-150" y="-80" width="300" height="14" rx="7" fill="#1e293b"/>`
    + `<rect x="-150" y="-80" width="${150 + sliderX}" height="14" rx="7" fill="#0ea5e9"/>`
    + `<circle cx="${-150 + sliderX}" cy="-73" r="14" fill="#f8fafc" stroke="#0284c7" stroke-width="4"/>`
    + `<rect x="-150" y="-30" width="300" height="14" rx="7" fill="#1e293b"/>`
    + `<rect x="-150" y="-30" width="220" height="14" rx="7" fill="#a855f7"/>`
    + `<circle cx="70" cy="-23" r="14" fill="#f8fafc" stroke="#7e22ce" stroke-width="4"/>`
    + `<rect x="-150" y="20" width="300" height="14" rx="7" fill="#1e293b"/>`
    + `<rect x="-150" y="20" width="40" height="14" rx="7" fill="#ef4444"/>`
    + `<circle cx="-110" cy="27" r="14" fill="#f8fafc" stroke="#b91c1c" stroke-width="4"/>`
    + `</g>`;
}

function lithiumBattery(x: number, y: number, s: number, charge: number): string {
  const h = Math.max(0, 110 * charge);
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-40" y="-70" width="80" height="140" rx="12" fill="#0f172a" stroke="#22c55e" stroke-width="6"/>`
    + `<rect x="-16" y="-86" width="32" height="16" rx="4" fill="#22c55e"/>`
    + `<rect x="-30" y="${70 - h}" width="60" height="${h}" rx="6" fill="#22c55e"/>`
    + `<polygon points="0,-15 -14,10 4,10 -2,35 14,8 -4,8" fill="#facc15" filter="url(#glow)"/>`
    + `</g>`;
}

function breadVault(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-140" y="-120" width="280" height="240" rx="16" fill="#1e293b" stroke="#0f172a" stroke-width="8"/>`
    + `<circle cx="0" cy="0" r="85" fill="#334155" stroke="#94a3b8" stroke-width="8"/>`
    + `<rect x="-50" y="-20" width="100" height="40" rx="8" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>`
    + `<line x1="-120" y1="-60" x2="120" y2="-60" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 6"/>`
    + `<line x1="-120" y1="60" x2="120" y2="60" stroke="#ef4444" stroke-width="3" stroke-dasharray="8 6"/>`
    + `<text x="0" y="70" font-family="'Impact', sans-serif" font-size="28" fill="#cbd5e1" text-anchor="middle">2008</text>`
    + `</g>`;
}

// =============================================================================
// 15 HAND-DRIVEN SKITS (375.93s -> 524.00s)
// =============================================================================

// 1. "Ozempic Face" Rapid Systemic Fat Loss (375.93 - 387.97)
function p3_a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 8.0, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const patient = walkerXR(lt, 1080, 0.5, 2.0);
  if (patient.on) {
    figs.push({
      id: "patient", st: {
        x: patient.x, y: 670, timeSec: t, isTalking: false, isWalking: patient.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_black",
        expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
      },
    });
  }

  // Syringe + skull cheeks
  fg += `<g transform="translate(1080 440) scale(0.95)">`
    + `<rect x="-15" y="-80" width="30" height="160" rx="8" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>`
    + `<line x1="0" y1="80" x2="0" y2="120" stroke="#94a3b8" stroke-width="6"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1080, 360, 1.2);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#0284c7" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 2. Victorian Gothic Novel Mourning Lost Lover (387.97 - 399.99)
function p3_b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 8.0, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 520 } : undefined,
    },
  });

  const mourner = walkerXR(lt, 1050, 0.4, 2.0);
  if (mourner.on) {
    figs.push({
      id: "mourner", st: {
        x: mourner.x, y: 670, timeSec: t, isTalking: false, isWalking: mourner.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_long", clothes: "dress_black",
        expression: punch ? "fear_trembling" : "deadpan_classic",
        spineLean: punch ? Math.sin(t * 10) * 8 : 0,
      },
    });
  }

  fg += victorianTombstone(1220, 680, 1.0);
  if (punch) fg += flashBurst(1050, 420, 1.0);

  const bg = stage("#0f172a", "#020617",
    `<circle cx="1050" cy="240" r="180" fill="#475569" opacity="0.18"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 3. Sea of Manufactured Faces & Android Replicas (399.99 - 411.22)
function p3_c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;

  figs.push({
    id: "host", st: {
      x: 340, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "shock_home_alone" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  // 3 synchronized replica stick figures
  [880, 1080, 1280].forEach((px, i) => {
    const w = walkerXR(lt, px, 0.4 + i * 0.3, 1.8 + i * 0.3);
    if (w.on) {
      figs.push({
        id: `replica_${i}`, st: {
          x: w.x, y: 670, timeSec: t, isTalking: false, isWalking: w.walking,
          gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
          costume: "y2k_sunglasses", expression: "deadpan_classic",
        },
      });
    }
  });

  if (punch) fg += flashBurst(1080, 400, 1.1);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<line x1="-100" y1="${FLOOR - 20}" x2="2100" y2="${FLOOR - 20}" stroke="#dc2626" stroke-width="16"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 520, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 4. Jenna Ortega Internet Scrutiny (411.22 - 420.75)
function p3_d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const star = walkerXR(lt, 1080, 0.4, 1.8);
  if (star.on) {
    figs.push({
      id: "star", st: {
        x: star.x, y: 670, timeSec: t, isTalking: false, isWalking: star.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_black",
        expression: "deadpan_classic",
      },
    });
  }

  // Magnifying glass hovering over star
  fg += `<g transform="translate(1080 440) scale(0.95)">`
    + `<circle cx="0" cy="0" r="60" fill="none" stroke="#38bdf8" stroke-width="8"/>`
    + `<line x1="42" y1="42" x2="85" y2="85" stroke="#0284c7" stroke-width="12" stroke-linecap="round"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1080, 440, 1.0);

  const bg = stage("#f1f5f9", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#38bdf8" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 500, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 5. Stressed Workaholic Desk (420.75 - 428.77)
function p3_e(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 540 } : undefined,
    },
  });

  const worker = walkerXR(lt, 1050, 0.4, 1.8);
  if (worker.on) {
    figs.push({
      id: "worker", st: {
        x: worker.x, y: 670, timeSec: t, isTalking: false, isWalking: worker.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "hoodie",
        expression: punch ? "fear_trembling" : "deadpan_classic",
        comicFx: "sweat_drop",
      },
    });
  }

  // Desk with tall script paper stack
  fg += `<g transform="translate(880 680) scale(0.95)">`
    + `<rect x="-60" y="-80" width="120" height="80" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>`
    + `<line x1="-40" y1="-60" x2="40" y2="-60" stroke="#cbd5e1" stroke-width="4"/>`
    + `<line x1="-40" y1="-30" x2="20" y2="-30" stroke="#cbd5e1" stroke-width="4"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1050, 480, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1050" cy="240" r="160" fill="#f59e0b" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1020, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 6. Wednesday: Cello & Crawling Hand (428.77 - 437.61)
function p3_f(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;
  const handX = lerp(1350, 950, easeIO(seg(lt, 1.5, 6.0)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "smug_thumbs_up" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  const goth = walkerXR(lt, 1100, 0.4, 1.8);
  if (goth.on) {
    figs.push({
      id: "goth", st: {
        x: goth.x, y: 670, timeSec: t, isTalking: false, isWalking: goth.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_black",
        expression: "deadpan_classic",
      },
    });
  }

  // Crawling hand
  fg += crawlingHand(handX, 700, 1.0, t);
  if (punch) fg += flashBurst(handX, 640, 1.0);

  const bg = stage("#0f172a", "#020617",
    `<circle cx="1100" cy="240" r="180" fill="#581c87" opacity="0.18"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 7. Digital Tribunal Courtroom Gavel (437.61 - 449.12)
function p3_g(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;
  const slam = seg(lt, 4.0, 5.0);

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 500 } : undefined,
    },
  });

  const defendant = walkerXR(lt, 1080, 0.4, 1.8);
  if (defendant.on) {
    figs.push({
      id: "defendant", st: {
        x: defendant.x, y: 670, timeSec: t, isTalking: false, isWalking: defendant.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_black",
        expression: punch ? "fear_trembling" : "deadpan_classic",
      },
    });
  }

  fg += courtGavel(850, 640, 1.1, slam);
  if (punch) fg += flashBurst(850, 600, 1.2);

  const bg = stage("#fef2f2", "#fee2e2",
    `<circle cx="1080" cy="240" r="180" fill="#dc2626" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1000, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 8. TikTok Zapruder Film Calipers (449.12 - 457.04)
function p3_h(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const spread = Math.sin(t * 8) * 15;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 480 } : undefined,
    },
  });

  const celeb = walkerXR(lt, 1080, 0.4, 1.8);
  if (celeb.on) {
    figs.push({
      id: "celeb", st: {
        x: celeb.x, y: 670, timeSec: t, isTalking: false, isWalking: celeb.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
        expression: "deadpan_classic",
      },
    });
  }

  fg += zapruderCalipers(1080, 480, 1.0, spread);
  if (punch) fg += flashBurst(1080, 440, 1.0);

  const bg = stage("#020617", "#0f172a",
    `<circle cx="1080" cy="240" r="180" fill="#0284c7" opacity="0.15"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 500, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 9. Inescapable Feedback Loop Spiral (457.04 - 467.10)
function p3_i(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "confused_shrug_what" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const victim = walkerXR(lt, 1080, 0.4, 1.8);
  if (victim.on) {
    figs.push({
      id: "victim", st: {
        x: victim.x, y: 670, timeSec: t, isTalking: false, isWalking: victim.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_high_ponytail", clothes: "y2k_crop_top_low_rise",
        expression: punch ? "fear_trembling" : "deadpan_classic",
        spineLean: Math.sin(t * 12) * 6,
      },
    });
  }

  // Spiral vortex in fg
  fg += `<g transform="translate(1080 480) rotate(${t * 180}) scale(0.9)" stroke="#a855f7" stroke-width="6" fill="none" opacity="0.8">`
    + `<circle cx="0" cy="0" r="30"/><circle cx="0" cy="0" r="65"/><circle cx="0" cy="0" r="100"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1080, 480, 1.1);

  const bg = stage("#faf5ff", "#f3e8ff",
    `<circle cx="1080" cy="240" r="180" fill="#9333ea" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 10. Size 4 Considered "Curvy" by LA Standards (467.10 - 473.91)
function p3_j(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.0, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const model = walkerXR(lt, 1080, 0.4, 1.8);
  if (model.on) {
    figs.push({
      id: "model", st: {
        x: model.x, y: 670, timeSec: t, isTalking: false, isWalking: model.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "crop_top_leggings",
        expression: punch ? "confused_squint" : "deadpan_classic",
      },
    });
  }

  // LA Palm tree
  fg += `<g transform="translate(1250 670) scale(0.95)">`
    + `<path d="M 0 0 Q 30 -120 10 -240" stroke="#78350f" stroke-width="14" fill="none" stroke-linecap="round"/>`
    + `<path d="M 10 -240 Q -60 -290 -100 -260" stroke="#15803d" stroke-width="10" fill="none" stroke-linecap="round"/>`
    + `<path d="M 10 -240 Q 60 -310 100 -270" stroke="#15803d" stroke-width="10" fill="none" stroke-linecap="round"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1080, 460, 1.0);

  const bg = stage("#fefce8", "#fef9c3",
    `<circle cx="1080" cy="240" r="180" fill="#facc15" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 11. RPG Character Creation Screen (473.91 - 487.24)
function p3_k(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.5;
  const sliderX = lerp(0, 240, easeIO(seg(lt, 2.0, 6.0)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 8.0, blink: blinkAt(t),
      expression: punch ? "smug_finger_guns" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 500 } : undefined,
    },
  });

  const avatar = walkerXR(lt, 1080, 0.4, 1.8);
  if (avatar.on) {
    figs.push({
      id: "avatar", st: {
        x: avatar.x, y: 670, timeSec: t, isTalking: false, isWalking: avatar.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_black",
        expression: punch ? "sparkle_anime_eyes" : "deadpan_classic",
      },
    });
  }

  fg += rpgCharacterScreen(1080, 420, 1.0, sliderX);
  if (punch) fg += flashBurst(1080, 360, 1.1);

  const bg = stage("#020617", "#0f172a",
    `<circle cx="1080" cy="240" r="180" fill="#38bdf8" opacity="0.16"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 480, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 12. Running on Lithium-Ion Battery (487.24 - 492.28)
function p3_l(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.5;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 3.5, blink: blinkAt(t),
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const bot = walkerXR(lt, 1080, 0.3, 1.5);
  if (bot.on) {
    figs.push({
      id: "bot", st: {
        x: bot.x, y: 670, timeSec: t, isTalking: false, isWalking: bot.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "y2k_crop_top_low_rise",
        expression: "deadpan_classic",
      },
    });
  }

  fg += lithiumBattery(1080, 480, 1.0, 0.85);
  if (punch) fg += flashBurst(1080, 420, 1.1);

  const bg = stage("#f0fdf4", "#dcfce7",
    `<circle cx="1080" cy="240" r="160" fill="#22c55e" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 500, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 13. Structural Crisis in Hollywood (492.28 - 497.14)
function p3_m(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.5;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 3.5, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const actor = walkerXR(lt, 1080, 0.3, 1.5);
  if (actor.on) {
    figs.push({
      id: "actor", st: {
        x: actor.x, y: 670, timeSec: t, isTalking: false, isWalking: actor.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "suit",
        expression: punch ? "confused_squint" : "deadpan_classic",
      },
    });
  }

  // Hollywood clapperboard
  fg += `<g transform="translate(1080 480) scale(0.95)">`
    + `<rect x="-70" y="-40" width="140" height="90" rx="6" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>`
    + `<line x1="-70" y1="-10" x2="70" y2="-10" stroke="#ffffff" stroke-width="4"/>`
    + `<line x1="-40" y1="-40" x2="-20" y2="-10" stroke="#ffffff" stroke-width="6"/>`
    + `<line x1="10" y1="-40" x2="30" y2="-10" stroke="#ffffff" stroke-width="6"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1080, 440, 1.0);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#ef4444" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 510, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 14. Actors Supposed to Reflect Real Life (497.14 - 508.21)
function p3_n(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const regularGuy = walkerXR(lt, 880, 0.4, 1.6);
  if (regularGuy.on) {
    figs.push({
      id: "regular_guy", st: {
        x: regularGuy.x, y: 670, timeSec: t, isTalking: false, isWalking: regularGuy.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "hoodie",
        expression: "smug_chuckle",
      },
    });
  }

  const goldenStar = walkerXR(lt, 1180, 0.8, 2.0);
  if (goldenStar.on) {
    figs.push({
      id: "golden_star", st: {
        x: goldenStar.x, y: 670, timeSec: t, isTalking: false, isWalking: goldenStar.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
        costume: "y2k_sunglasses", expression: "sparkle_anime_eyes", comicFx: "sparkles",
      },
    });
  }

  if (punch) fg += flashBurst(1180, 460, 1.1);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1080" cy="240" r="180" fill="#facc15" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 530, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 15. Cyborg Carbohydrate Laser Vault (Obama 2008) (508.21 - 524.00)
function p3_o(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 8.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 10.0, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1080, y: 520 } : undefined,
    },
  });

  const cyborg = walkerXR(lt, 1080, 0.5, 2.2);
  if (cyborg.on) {
    figs.push({
      id: "cyborg", st: {
        x: cyborg.x, y: 670, timeSec: t, isTalking: false, isWalking: cyborg.walking,
        gender: "female", hairStyle: "female_slicked_back", clothes: "crop_top_leggings",
        costume: "y2k_sunglasses", expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
        spineLean: punch ? Math.sin(t * 12) * 5 : 0,
      },
    });
  }

  fg += breadVault(850, 620, 0.95);
  if (punch) fg += flashBurst(850, 560, 1.2);

  const bg = stage("#0f172a", "#020617",
    `<circle cx="1080" cy="240" r="180" fill="#ef4444" opacity="0.16"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1000, cy: 530, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// =============================================================================
// WINDOW DRIVER REGISTRATION
// =============================================================================

const GAGS: GagDef[] = [
  { start: 375.93, end: 387.97, fn: p3_a },
  { start: 387.97, end: 399.99, fn: p3_b },
  { start: 399.99, end: 411.22, fn: p3_c },
  { start: 411.22, end: 420.75, fn: p3_d },
  { start: 420.75, end: 428.77, fn: p3_e },
  { start: 428.77, end: 437.61, fn: p3_f },
  { start: 437.61, end: 449.12, fn: p3_g },
  { start: 449.12, end: 457.04, fn: p3_h },
  { start: 457.04, end: 467.10, fn: p3_i },
  { start: 467.10, end: 473.91, fn: p3_j },
  { start: 473.91, end: 487.24, fn: p3_k },
  { start: 487.24, end: 492.28, fn: p3_l },
  { start: 492.28, end: 497.14, fn: p3_m },
  { start: 497.14, end: 508.21, fn: p3_n },
  { start: 508.21, end: 524.00, fn: p3_o },
];

const stillList = stillsArg ? stillsArg.split(",").map(s => parseFloat(s)) : [];

if (arg("audit", "0") === "1") {
  const SAMPLES = 8;
  const NEED = 4;
  let fails = 0;
  console.log(`=== RUNNING 7-CHANNEL ANTI-STATUE MOTION AUDIT (PART 3: 15 SKITS) ===`);
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
  stillsDir: path.join(root, "output", "part3_stills"),
  tag: "part3",
});

if (stillList.length > 0) {
  console.log(`[part3] Generated ${stillList.length} stills. Exiting.`);
  process.exit(0);
}
