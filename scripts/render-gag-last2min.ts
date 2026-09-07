/**
 * GAG WINDOWS LAST 2 MINUTES (t = 524.00 - 643.53): The Grand Finale.
 *
 * Authored strictly to the gold-standard hand-driven specification
 * (/root/Desktop/hand_driven_approach.pdf):
 *   wLast_a (524.00-528.74): Celebrity clone parade & startling sameness
 *   wLast_b (528.74-537.31): Aesthetic clinic laser symmetry scanner & emotion flatline
 *   wLast_c (537.31-544.55): Botox injection & organic matter drain
 *   wLast_d (544.55-553.30): Melodramatic divorce tears vs 100% stationary bubble-level forehead
 *   wLast_e (553.30-562.34): The VIP bypass: velvet rope vs struggling barbell gym-bro
 *   wLast_f (562.34-566.96): Virtue scale: glowing angel halo descending on extreme thinness
 *   wLast_g (566.96-578.85): Hydraulic compactor walls crushing body positivity to a sliver
 *   wLast_h (578.85-588.59): Press podium: "just drinking lemon water" while hiding pharma syringe
 *   wLast_i (588.59-597.23): Bathroom mirror confusion & $1,200/mo cash register receipt drop
 *   wLast_j (597.23-605.60): Untouched banquet buffet: rich people turn off the hunger switch
 *   wLast_k (605.60-612.73): Outsourced driving, cleaning, child-rearing, and appetite
 *   wLast_l (612.73-621.06): Celebrity star shrinks and slides into a standard business envelope
 *   wLast_m (621.06-630.34): Concierge doctor, endless budget money bags, and belly drain
 *   wLast_n (630.34-636.41): Doctor juggling scalpel and syringe vs red-carpet star
 *   wLast_o (636.41-643.53): YouTube outro: Subscribe button, swinging bell, and "Not Your Dad" walk-off
 *
 *   tsx scripts/render-gag-last2min.ts --out output/last2min_video.mp4
 *   tsx scripts/render-gag-last2min.ts --stills 526,532,541,548,558,564,574,584,593,602,609,617,626,633,640
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  driveGags,
  type GagDef, type GagOut, type Fig,
  lerp, easeIO, seg, blinkAt, FLOOR,
  stage, moneyBag, walkerX, walkerXR, flashBurst,
  couch, wheel, duster, babyBundle, bigSandwich, envelope, scaleProp, scalpel,
} from "./gag-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

const fps = 24;
const width = 1280;
const height = 720;
const T0 = parseFloat(arg("start", "524.00"));
const T1 = parseFloat(arg("end", "643.53"));
const outFile = arg("out", path.join(root, "output", "last2min_video.mp4"));
const stillsArg = arg("stills", "");

// =============================================================================
// BESPOKE GRAPHIC PROPS (ZERO-WORDS HOUSE RULE)
// =============================================================================

function laserScanGrid(cx: number, cy: number, w: number, h: number, scanX: number): string {
  let grid = "";
  for (let y = cy - h / 2; y <= cy + h / 2; y += 40) {
    grid += `<line x1="${cx - w / 2}" y1="${y}" x2="${cx + w / 2}" y2="${y}" stroke="#06b6d4" stroke-width="2" opacity="0.3"/>`;
  }
  for (let x = cx - w / 2; x <= cx + w / 2; x += 40) {
    grid += `<line x1="${x}" y1="${cy - h / 2}" x2="${x}" y2="${cy + h / 2}" stroke="#06b6d4" stroke-width="2" opacity="0.3"/>`;
  }
  return `<g>`
    + grid
    + `<line x1="${scanX}" y1="${cy - h / 2 - 20}" x2="${scanX}" y2="${cy + h / 2 + 20}" stroke="#22d3ee" stroke-width="6" filter="url(#glow)"/>`
    + `<circle cx="${scanX}" cy="${cy - h / 2 - 20}" r="8" fill="#06b6d4"/>`
    + `<circle cx="${scanX}" cy="${cy + h / 2 + 20}" r="8" fill="#06b6d4"/>`
    + `</g>`;
}

function flatlineMonitor(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-140" y="-80" width="280" height="160" rx="14" fill="#020617" stroke="#334155" stroke-width="6"/>`
    + `<line x1="-120" y1="0" x2="120" y2="0" stroke="#22c55e" stroke-width="8" stroke-linecap="round"/>`
    + `<circle cx="116" cy="0" r="6" fill="#4ade80" filter="url(#glow)"/>`
    + `<circle cx="-110" cy="-60" r="6" fill="#ef4444"/>`
    + `</g>`;
}

function botoxNeedle(x: number, y: number, s: number, rot: number, plungeK: number): string {
  const pY = -40 + plungeK * 35;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<rect x="-18" y="-140" width="36" height="110" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="6"/>`
    + `<rect x="-14" y="-136" width="28" height="65" fill="#a855f7" opacity="0.75"/>`
    + `<line x1="0" y1="-140" x2="0" y2="${pY}" stroke="#64748b" stroke-width="10"/>`
    + `<rect x="-30" y="-180" width="60" height="16" rx="4" fill="#334155"/>`
    + `<line x1="0" y1="-30" x2="0" y2="50" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>`
    + `</g>`;
}

function suctionDrainJar(x: number, y: number, s: number, fillK: number, t: number): string {
  const fH = fillK * 120;
  const bubbleY = (t * 80) % 60;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-50" y="80" width="100" height="18" rx="6" fill="#334155"/>`
    + `<line x1="0" y1="0" x2="0" y2="80" stroke="#64748b" stroke-width="12"/>`
    + `<rect x="-60" y="-120" width="120" height="140" rx="16" fill="#e2e8f0" stroke="#475569" stroke-width="8"/>`
    + `<rect x="-52" y="${20 - fH}" width="104" height="${fH}" rx="8" fill="#10b981" opacity="0.8"/>`
    + `<circle cx="-20" cy="${10 - bubbleY}" r="6" fill="#34d399"/>`
    + `<circle cx="20" cy="${- bubbleY}" r="8" fill="#34d399"/>`
    + `<path d="M 0 -120 Q 80 -180 160 -100" fill="none" stroke="#10b981" stroke-width="10" stroke-linecap="round"/>`
    + `</g>`;
}

function bubbleLevelTool(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-110" y="-18" width="220" height="36" rx="8" fill="#facc15" stroke="#ca8a04" stroke-width="6"/>`
    + `<rect x="-50" y="-12" width="100" height="24" rx="6" fill="#a3e635" stroke="#4d7c0f" stroke-width="4"/>`
    + `<line x1="-16" y1="-12" x2="-16" y2="12" stroke="#15803d" stroke-width="3"/>`
    + `<line x1="16" y1="-12" x2="16" y2="12" stroke="#15803d" stroke-width="3"/>`
    + `<circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#15803d" stroke-width="2"/>`
    + `</g>`;
}

function tearFountain(x: number, y: number, s: number, t: number): string {
  let drops = "";
  for (let i = 0; i < 6; i++) {
    const p = ((t * 4 + i * 0.3) % 1);
    const lx = -40 - p * 130;
    const rx = 40 + p * 130;
    const dy = -Math.sin(p * Math.PI) * 45 + p * p * 60;
    drops += `<circle cx="${lx.toFixed(1)}" cy="${dy.toFixed(1)}" r="7" fill="#38bdf8"/>`;
    drops += `<circle cx="${rx.toFixed(1)}" cy="${dy.toFixed(1)}" r="7" fill="#38bdf8"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${drops}</g>`;
}

function divorcePapers(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<rect x="-40" y="-60" width="80" height="120" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="5"/>`
    + `<line x1="-25" y1="-35" x2="25" y2="-35" stroke="#94a3b8" stroke-width="4"/>`
    + `<line x1="-25" y1="-15" x2="25" y2="-15" stroke="#94a3b8" stroke-width="4"/>`
    + `<line x1="-25" y1="5" x2="10" y2="5" stroke="#94a3b8" stroke-width="4"/>`
    + `<circle cx="15" cy="35" r="14" fill="#ef4444"/>`
    + `</g>`;
}

function velvetRopeStanchion(x: number, y: number, s: number, openK: number): string {
  const sagY = 50 + openK * 90;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-40" y="80" width="80" height="18" rx="6" fill="#eab308" stroke="#a16207" stroke-width="4"/>`
    + `<line x1="0" y1="-90" x2="0" y2="80" stroke="#facc15" stroke-width="14"/>`
    + `<circle cx="0" cy="-96" r="22" fill="#facc15" stroke="#a16207" stroke-width="4"/>`
    + `<rect x="180" y="80" width="80" height="18" rx="6" fill="#eab308" stroke="#a16207" stroke-width="4"/>`
    + `<line x1="220" y1="-90" x2="220" y2="80" stroke="#facc15" stroke-width="14"/>`
    + `<circle cx="220" cy="-96" r="22" fill="#facc15" stroke="#a16207" stroke-width="4"/>`
    + `<path d="M 0 -85 Q 110 ${sagY} ${220 - openK * 70} ${-85 + openK * 80}" fill="none" stroke="#dc2626" stroke-width="18" stroke-linecap="round"/>`
    + `</g>`;
}

function vipGoldCard(x: number, y: number, s: number, rot: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">`
    + `<rect x="-45" y="-28" width="90" height="56" rx="8" fill="#fbbf24" stroke="#b45309" stroke-width="5" filter="url(#glow)"/>`
    + `<rect x="-35" y="-16" width="22" height="18" rx="3" fill="#f59e0b"/>`
    + `<line x1="-35" y1="12" x2="25" y2="12" stroke="#92400e" stroke-width="4"/>`
    + `</g>`;
}

function goldenAngelHalo(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#glow)">`
    + `<ellipse cx="0" cy="0" rx="65" ry="18" fill="none" stroke="#facc15" stroke-width="12"/>`
    + `</g>`;
}

function compactorWall(x: number, y: number, s: number, isLeft: boolean): string {
  const dir = isLeft ? 1 : -1;
  let stripes = "";
  for (let i = -140; i <= 140; i += 36) {
    stripes += `<line x1="${-30 * dir}" y1="${i}" x2="${30 * dir}" y2="${i + 24}" stroke="#facc15" stroke-width="12"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="${isLeft ? -120 : -20}" y="-160" width="140" height="320" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="8"/>`
    + stripes
    + `<rect x="${isLeft ? -240 : 20}" y="-30" width="140" height="60" rx="6" fill="#475569" stroke="#334155" stroke-width="6"/>`
    + `</g>`;
}

function pressBriefingPodium(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<polygon points="-70,-60 70,-60 95,120 -95,120" fill="#78350f" stroke="#451a03" stroke-width="8"/>`
    + `<rect x="-85" y="-80" width="170" height="24" rx="6" fill="#92400e" stroke="#451a03" stroke-width="6"/>`
    + `<line x1="-30" y1="-80" x2="-45" y2="-120" stroke="#334155" stroke-width="8"/>`
    + `<circle cx="-45" cy="-120" r="14" fill="#020617"/>`
    + `<line x1="30" y1="-80" x2="45" y2="-120" stroke="#334155" stroke-width="8"/>`
    + `<circle cx="45" cy="-120" r="14" fill="#020617"/>`
    + `</g>`;
}

function lemonWaterGlass(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<polygon points="-22,-45 22,-45 16,35 -16,35" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" stroke-width="4"/>`
    + `<circle cx="-4" cy="-5" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>`
    + `<line x1="12" y1="-55" x2="0" y2="20" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>`
    + `</g>`;
}

function cashRegisterReceipt(x: number, y: number, s: number, lenK: number): string {
  const h = lenK * 280;
  let lines = "";
  for (let py = 40; py < h - 20; py += 30) {
    lines += `<line x1="-35" y1="${py}" x2="35" y2="${py}" stroke="#64748b" stroke-width="5" stroke-dasharray="10 6"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-60" y="-30" width="120" height="50" rx="8" fill="#334155" stroke="#1e293b" stroke-width="6"/>`
    + `<rect x="-45" y="10" width="90" height="${Math.max(10, h)}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>`
    + lines
    + `</g>`;
}

function grandBuffetTable(x: number, y: number, s: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-240" y="0" width="480" height="30" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>`
    + `<line x1="-200" y1="30" x2="-200" y2="120" stroke="#94a3b8" stroke-width="12"/>`
    + `<line x1="200" y1="30" x2="200" y2="120" stroke="#94a3b8" stroke-width="12"/>`
    + `<ellipse cx="-90" cy="-10" rx="75" ry="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>`
    + `<ellipse cx="-90" cy="-35" rx="50" ry="32" fill="#d97706" stroke="#92400e" stroke-width="6"/>`
    + `<ellipse cx="110" cy="-10" rx="60" ry="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>`
    + `<rect x="80" y="-55" width="60" height="45" rx="6" fill="#f472b6" stroke="#db2777" stroke-width="4"/>`
    + `<circle cx="110" cy="-62" r="8" fill="#ef4444"/>`
    + `</g>`;
}

function hungerSwitch(x: number, y: number, s: number, isOff: boolean): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-50" y="-25" width="100" height="50" rx="25" fill="${isOff ? '#ef4444' : '#22c55e'}" stroke="#0f172a" stroke-width="5"/>`
    + `<circle cx="${isOff ? -24 : 24}" cy="0" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>`
    + `</g>`;
}

function youtubeSubscribeButton(x: number, y: number, s: number, bellRot: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#cardShadow)">`
    + `<rect x="-180" y="-50" width="360" height="100" rx="22" fill="#dc2626" stroke="#b91c1c" stroke-width="5"/>`
    + `<polygon points="-90,-25 -90,25 -40,0" fill="#ffffff"/>`
    + `<rect x="-15" y="-16" width="120" height="32" rx="6" fill="#ffffff"/>`
    + `<g transform="translate(130 0) rotate(${bellRot})">`
    + `<path d="M 0 -22 C -15 -22 -20 -10 -20 12 L -25 18 L 25 18 L 20 12 C 20 -10 15 -22 0 -22 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>`
    + `<circle cx="0" cy="24" r="6" fill="#d97706"/>`
    + `</g></g>`;
}

// =============================================================================
// 15 HAND-DRIVEN SKITS (524.00s -> 643.53s)
// =============================================================================

// 1. Celebrity Clone Parade (524.00 - 528.74)
function wLast_a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 3.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1200, y: 550 } : undefined,
    },
  });

  const s1 = walkerXR(lt, 1050, 0.4, 1.4);
  if (s1.on) {
    figs.push({
      id: "star1", st: {
        x: s1.x, y: 670, timeSec: t, isTalking: false, isWalking: s1.walking, blink: blinkAt(t + 1),
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
        costume: "y2k_sunglasses", expression: punch ? "smug_hands_behind_head" : "deadpan_classic",
      },
    });
  }

  const s2 = walkerXR(lt, 1420, 0.8, 1.8);
  if (s2.on) {
    figs.push({
      id: "star2", st: {
        x: s2.x, y: 670, timeSec: t, isTalking: false, isWalking: s2.walking, blink: blinkAt(t + 2),
        gender: "female", hairStyle: "female_slicked_back", clothes: "dress_red_carpet",
        costume: "y2k_sunglasses", expression: punch ? "smug_hands_behind_head" : "deadpan_classic",
      },
    });
  }

  if (punch) {
    fg += flashBurst(1050, 360, 0.9);
    fg += flashBurst(1420, 370, 0.95);
  }

  const bg = stage("#f8fafc", "#e2e8f0",
    `<line x1="-100" y1="${FLOOR - 20}" x2="2100" y2="${FLOOR - 20}" stroke="#dc2626" stroke-width="16"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1220, cy: 550, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 2. Aesthetic Clinic Laser Scanner & Flatline (528.74 - 537.31)
function wLast_b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;

  figs.push({
    id: "host", st: {
      x: 420, y: 670, timeSec: t, isTalking: lt < 6.8, blink: blinkAt(t),
      expression: punch ? "confused_shrug_what" : "deadpan_classic",
      pose: punch ? "shrug" : "point_camera",
      pointTarget: !punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  figs.push({
    id: "patient", st: {
      x: 1100, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_black",
      eyelashes: true, expression: "deadpan_classic",
    },
  });

  const scanX = 1100 + Math.sin(lt * 3.5) * 80;
  fg += laserScanGrid(1100, 520, 260, 320, scanX);
  fg += flatlineMonitor(1480, 440, 0.9);

  const bg = stage("#0f172a", "#020617",
    `<circle cx="1100" cy="220" r="160" fill="#06b6d4" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1180, cy: 530, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 3. Operating Theater Botox & Organic Matter Drain (537.31 - 544.55)
function wLast_c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;
  const doc = walkerXR(lt, 1420, 0.5, 1.5);

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "cringe_teeth_grit" : "deadpan_classic",
      pose: punch ? "crossed_arms" : "default",
    },
  });

  figs.push({
    id: "patient", st: {
      x: 980, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
      gender: "female", hairStyle: "female_slicked_back", clothes: "hospital_gown",
      expression: punch ? "fear_trembling" : "deadpan_classic",
    },
  });

  if (doc.on) {
    figs.push({
      id: "doc", st: {
        x: doc.x, y: 670, timeSec: t, isTalking: false, isWalking: doc.walking,
        gender: "doctor", clothes: "doctor_scrubs", hairStyle: "doctor_cap",
        expression: "smug_chuckle",
      },
    });
  }

  const plungeK = easeIO(seg(lt, 3.2, 4.6));
  fg += botoxNeedle(1050, 480, 0.85, -25, plungeK);
  fg += suctionDrainJar(740, 680, 0.9, seg(lt, 2.0, 6.0), t);

  const bg = stage("#f1f5f9", "#cbd5e1",
    `<circle cx="980" cy="240" r="140" fill="#a855f7" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1120, cy: 540, zoom: 1.58, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 4. Tragic Melodrama Tears vs 100% Stationary Forehead (544.55 - 553.30)
function wLast_d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.8;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "shrug" : "point_camera",
      pointTarget: !punch ? { x: 1200, y: 520 } : undefined,
    },
  });

  figs.push({
    id: "actress", st: {
      x: 1200, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_long", clothes: "dress_black", eyelashes: true,
      expression: "sad_pout", spineLean: Math.sin(t * 12) * 2.5,
    },
  });

  fg += divorcePapers(1130, 620, 0.85, -12);
  fg += tearFountain(1200, 460, 1.0, t);
  fg += bubbleLevelTool(1200, 400, 0.95);

  const bg = stage("#1e1b4b", "#0f172a",
    `<circle cx="1200" cy="460" r="280" fill="#facc15" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1200, cy: 490, zoom: 1.65, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 5. The VIP Velvet Rope Bypass (553.30 - 562.34)
function wLast_e(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.8;
  const openK = easeIO(seg(lt, 4.0, 5.0));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "smug_finger_guns" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1380, y: 540 } : undefined,
    },
  });

  // Struggling gym bro on left of barrier
  figs.push({
    id: "gymbro", st: {
      x: 750, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: "fear_trembling", comicFx: "sweat_drop",
      spineLean: Math.sin(t * 6) * 5,
    },
  });

  // Billionaire skipping through barrier
  const celebX = lerp(600, 1420, easeIO(seg(lt, 1.8, 5.2)));
  figs.push({
    id: "celeb", st: {
      x: celebX, y: 670, timeSec: t, isTalking: false,
      isWalking: lt >= 1.8 && lt < 5.2, blink: blinkAt(t + 2),
      gender: "male", hairStyle: "male_tech_bro", clothes: "suit",
      costume: "y2k_sunglasses", expression: "smug_rock_eyebrow",
    },
  });

  fg += velvetRopeStanchion(920, 680, 1.0, openK);
  if (lt >= 2.5 && lt < 5.0) fg += vipGoldCard(celebX + 40, 560, 0.8, -15);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<rect x="1100" y="200" width="800" height="600" fill="#fef3c7" opacity="0.4"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1200, cy: 550, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 6. Virtue Scale: Halo Descends (562.34 - 566.96)
function wLast_f(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.8;
  const haloY = lerp(-120, 390, easeIO(seg(lt, 0.8, 2.4)));

  figs.push({
    id: "host", st: {
      x: 420, y: 670, timeSec: t, isTalking: lt < 3.5, blink: blinkAt(t),
      expression: punch ? "confused_shrug_what" : "deadpan_classic",
      pose: punch ? "shrug" : "point_camera",
      pointTarget: !punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  figs.push({
    id: "skinny_saint", st: {
      x: 1100, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_long", clothes: "dress_black",
      expression: "blissful_serenity",
    },
  });

  fg += goldenAngelHalo(1100, haloY, 0.95);

  const bg = stage("#fffbeb", "#fef3c7",
    `<circle cx="1100" cy="240" r="200" fill="#fde047" opacity="0.2"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 510, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 7. Hydraulic Compactor Walls vs Body Positivity (566.96 - 578.85)
function wLast_g(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 7.8;
  const squeezeK = easeIO(seg(lt, 3.5, 8.5));
  const wallL = lerp(600, 960, squeezeK);
  const wallR = lerp(1500, 1140, squeezeK);

  figs.push({
    id: "host", st: {
      x: 340, y: 670, timeSec: t, isTalking: lt < 8.0, blink: blinkAt(t),
      expression: punch ? "shock_jaw_drop" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 560 } : undefined,
    },
  });

  figs.push({
    id: "victim", st: {
      x: 1050, y: 670, scale: lerp(1.15, 0.8, squeezeK),
      rotation: Math.sin(t * 12) * squeezeK * 6,
      spineLean: Math.sin(t * 8) * squeezeK * 8,
      timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: squeezeK > 0.4 ? "fear_trembling" : "smug_chuckle",
    },
  });

  fg += compactorWall(wallL, 560, 1.0, true);
  fg += compactorWall(wallR, 560, 1.0, false);

  const bg = stage("#fdf2f8", "#fce7f3",
    `<circle cx="1050" cy="260" r="180" fill="#ec4899" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 560, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 8. Press Podium: Lemon Water vs Secret Syringe (578.85 - 588.59)
function wLast_h(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 6.2;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1240, y: 580 } : undefined,
    },
  });

  figs.push({
    id: "celeb", st: {
      x: 1100, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_red_carpet",
      expression: "sparkle_anime_eyes", comicFx: "sparkles",
    },
  });

  fg += pressBriefingPodium(1100, 680, 1.0);
  fg += lemonWaterGlass(1060, 580, 0.85);
  fg += botoxNeedle(1220, 620, 0.75, 45, 0.2);

  if (punch) {
    fg += flashBurst(980, 420, 0.8);
    fg += flashBurst(1250, 410, 0.9);
  }

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1100" cy="220" r="160" fill="#3b82f6" opacity="0.14"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1120, cy: 550, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 9. Bathroom Mirror Confusion & $1,200/mo Receipt (588.59 - 597.23)
function wLast_i(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;

  figs.push({
    id: "host", st: {
      x: lerp(200, 500, easeIO(seg(lt, 0, 1.2))), y: 670, timeSec: t,
      isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "deadpan_classic" : "confused_squint",
      leftHandTarget: punch ? { x: 880, y: 560 } : undefined,
    },
  });

  figs.push({
    id: "regular_guy", st: {
      x: 940, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: "sad_pout", spineLean: 8,
    },
  });

  fg += cashRegisterReceipt(1350, 300, 1.0, seg(lt, 2.0, 5.5));
  if (lt >= 4.0) fg += moneyBag(1350, 660, 1.0, 0);
  if (lt >= 4.8) fg += moneyBag(1250, 680, 0.9, -10);

  const bg = stage("#f1f5f9", "#e2e8f0",
    `<rect x="850" y="240" width="180" height="320" rx="14" fill="#bae6fd" stroke="#0284c7" stroke-width="8"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1040, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 10. The Untouched Banquet Buffet (597.23 - 605.60)
function wLast_j(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.2;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 540 } : undefined,
    },
  });

  figs.push({
    id: "rich_celeb", st: {
      x: 1350, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_tech_bro", clothes: "suit",
      costume: "y2k_sunglasses", expression: "smug_hands_behind_head",
    },
  });

  const hungryBro = walkerX(lt, 720, 0.8, 1.8, 7.5, 8.5);
  if (hungryBro.on) {
    figs.push({
      id: "hungry_guy", st: {
        x: hungryBro.x, y: 670, timeSec: t, isTalking: false, isWalking: hungryBro.walking,
        gender: "male", hairStyle: "male_short", clothes: "hoodie",
        expression: "cringe_teeth_grit", comicFx: "sweat_drop",
      },
    });
  }

  fg += grandBuffetTable(1100, 680, 0.95);
  fg += hungerSwitch(1350, 420, 0.85, true);

  const bg = stage("#fef3c7", "#fde68a",
    `<circle cx="1100" cy="240" r="180" fill="#f59e0b" opacity="0.15"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 550, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 11. Outsourced Everything & Pharma Sandwich Grab (605.60 - 612.73)
function wLast_k(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.9;
  const hostX = 330 + easeIO(seg(lt, 5.9, 6.6)) * 520;

  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t, isTalking: !punch, blink: blinkAt(t),
      expression: punch ? "deadpan_classic" : "smug_chuckle",
      isWalking: lt >= 5.9 && lt < 6.6,
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1400, y: 520 } : undefined,
      gazeTarget: { x: 1300, y: 550 },
    },
  });

  figs.push({
    id: "celeb", st: {
      x: 1300, y: 640, rotation: -9, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      costume: "y2k_sunglasses", expression: punch ? "shock_jaw_drop" : "smug_hands_behind_head",
      gazeTarget: punch ? { x: 1560, y: 480 } : { x: 330, y: 500 },
    },
  });

  const bob = Math.sin(t * 2.2) * 10;
  const w1 = walkerX(lt, 1010, 0.6, 1.6, 2.0, 3.0);
  const w2 = walkerX(lt, 1010, 2.2, 3.2, 3.6, 4.6);
  const w3 = walkerX(lt, 1010, 3.6, 4.6, 5.0, 6.0);
  const items = [
    { kind: "wheel", gone: seg(lt, 1.6, 2.0), wx: w1.x },
    { kind: "duster", gone: seg(lt, 3.2, 3.6), wx: w2.x },
    { kind: "baby", gone: seg(lt, 4.6, 5.0), wx: w3.x },
  ];
  items.forEach((it, i) => {
    const home = { x: 1030 + i * 85, y: 690 + bob + (i % 2) * 22 };
    const k = easeIO(it.gone);
    const px = lerp(home.x, it.wx, k), py = lerp(home.y, 468, k);
    if (it.kind === "wheel") fg += wheel(px, py, 0.9, t * 40);
    if (it.kind === "duster") fg += duster(px, py, 0.9, -14);
    if (it.kind === "baby") fg += babyBundle(px, py, 0.9);
  });

  const servants = [
    { id: "s1", w: w1 }, { id: "s2", w: w2 }, { id: "s3", w: w3 },
  ];
  for (const s of servants) {
    if (!s.w.on) continue;
    figs.push({
      id: s.id, st: {
        x: s.w.x, y: 670, timeSec: t, isTalking: false, isWalking: s.w.walking,
        clothes: "hoodie", hairStyle: "male_short", mouthShape: "deadpan_line",
      },
    });
  }

  const swPop = easeIO(seg(lt, 4.2, 4.6));
  const bite = seg(lt, 4.9, 5.3);
  const grab = easeIO(seg(lt, 5.9, 6.3));
  const swHome = { x: 1140, y: 660 }, swHand = { x: 1560, y: 600 };
  const swx = lerp(swHome.x, swHand.x, grab), swy = lerp(swHome.y, swHand.y, grab);
  if (swPop > 0) fg += bigSandwich(swx, swy, 0.85 * swPop * (1 - 0.45 * grab), -8, bite);

  const ph = walkerX(lt, 1560, 5.0, 5.8, 6.6, 7.4);
  if (ph.on) {
    figs.push({
      id: "pharma", st: {
        x: ph.x, y: 670, timeSec: t, isTalking: false, isWalking: ph.walking,
        gender: "male", clothes: "suit", hairStyle: "male_short",
        rightHandProp: grab >= 1 ? "none" : "syringe", expression: "smug_finger_guns",
      },
    });
  }

  const bg = stage("#f6f1e7", "#e2d8c2",
    `<circle cx="1300" cy="300" r="120" fill="#f59e0b" opacity="0.18"/>`)
    + couch(1300, FLOOR, 1.15);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1300, cy: 540, zoom: 1.6, cut: false } : { cx: 900, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 12. Fits Inside a Business Envelope (612.73 - 621.06)
function wLast_l(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const walkK = easeIO(seg(lt, 2.2, 3.2));
  const climbK = easeIO(seg(lt, 3.2, 4.6));
  const starX = lerp(lerp(1050, 960, walkK), 960, climbK);
  const starY = lerp(670, 515, climbK);
  const starS = lerp(1, 0.3, climbK);
  const inEnv = climbK >= 1;

  if (!inEnv) {
    figs.push({
      id: "star", st: {
        x: starX, y: starY, scale: starS, rotation: -12 * climbK, timeSec: t,
        isTalking: false, isWalking: walkK > 0 && walkK < 1, blink: blinkAt(t),
        gender: "female", hairStyle: "female_long", clothes: "dress_red_carpet", eyelashes: true,
        expression: climbK > 0.3 ? "fear_trembling" : "smug_hands_behind_head",
      },
    });
  }

  figs.push({
    id: "host", st: {
      x: lerp(350, 560, easeIO(seg(lt, 0.8, 1.6))), y: 670, timeSec: t,
      isTalking: lt < 5.2, blink: blinkAt(t + 2),
      expression: lt >= 6.2 ? "confused_shrug_what" : lt >= 5.0 ? "smug_thumbs_up" : "deadpan_classic",
      pose: lt >= 6.2 ? "shrug" : lt >= 5.0 ? "default" : "point_camera",
      pointTarget: lt < 5.0 ? { x: 960, y: 560 } : undefined,
      gazeTarget: { x: 960, y: 560 },
    },
  });

  const envPop = easeIO(seg(lt, 1.2, 1.8));
  const sealed = lt >= 4.8;
  const envStr = envelope(960, 660, 1.35 * Math.max(0.001, envPop), !sealed, seg(lt, 5.0, 5.4));

  if (lt >= 6.2) {
    const wig = Math.sin(t * 9) * 22;
    fg += `<g stroke="#111111" stroke-width="16" stroke-linecap="round">`
      + `<line x1="900" y1="790" x2="${900 + wig}" y2="880"/>`
      + `<line x1="1020" y1="790" x2="${1020 - wig}" y2="880"/></g>`;
  }

  const bg = stage("#efe9fb", "#d5c9f0",
    `<circle cx="960" cy="220" r="150" fill="#7c3aed" opacity="0.14"/>`)
    + envStr;
  const punch = lt >= 5.4;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 960, cy: 600, zoom: 1.6, cut: false } : { cx: 800, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 13. Concierge Doctor & Belly Drain (621.06 - 630.34)
function wLast_m(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const drainK = easeIO(seg(lt, 5.6, 7.2));
  const sadExpr = lt < 6.0 ? "sad_pout" : lt < 7.2 ? "shock_eye_pop" : "blissful_serenity";

  figs.push({
    id: "sad", st: {
      x: 900, y: 640, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: sadExpr, spineLean: lt < 7.2 ? 10 : 0, gazeY: 0.6,
    },
  });

  figs.push({
    id: "host", st: {
      x: lerp(100, 420, easeIO(seg(lt, 0, 1.0))), y: 670, timeSec: t,
      isTalking: lt < 5.6, blink: blinkAt(t),
      expression: lt >= 6.6 ? "skeptical_side_eye" : "deadpan_classic",
      pose: lt >= 6.6 ? "crossed_arms" : "default",
      leftHandTarget: lt < 5.6 ? { x: 830, y: 550 } : undefined,
      gazeTarget: { x: 900, y: 550 }, isWalking: lt < 1.0,
    },
  });

  const doc = walkerX(lt, 1500, 2.0, 3.0, 8.6, 9.6);
  if (doc.on) {
    figs.push({
      id: "doc", st: {
        x: doc.x, y: 670, timeSec: t, isTalking: false, isWalking: doc.walking,
        gender: "doctor", hairStyle: "doctor_cap", clothes: "doctor_scrubs",
        pose: !doc.walking && lt < 8.0 ? "waving" : "default",
        expression: "smug_chuckle", rightHandProp: "syringe",
      },
    });
  }

  const piles = [{ x: 1180, at: 3.6 }, { x: 1310, at: 4.1 }, { x: 1245, at: 4.6 }];
  for (const p of piles) {
    const k = easeIO(seg(lt, p.at, p.at + 0.7));
    if (k <= 0) continue;
    const y = lerp(-160, 820, k) + (k >= 1 ? Math.abs(Math.sin((lt - p.at - 0.7) * 8)) * -6 : 0);
    fg += moneyBag(p.x, y, 1.0, (p.x % 17) - 8);
  }

  const bellyRx = lerp(82, 0, drainK);
  const wob = Math.sin(t * 14) * 4 * (drainK > 0 && drainK < 1 ? 1 : 0);
  if (drainK < 0.98) fg += `<ellipse cx="900" cy="690" rx="${bellyRx.toFixed(0)}" ry="${(54 - drainK * 50).toFixed(0)}" fill="#fcd9b8" stroke="#111111" stroke-width="7"/>`;
  if (drainK > 0 && drainK < 1) {
    fg += `<g stroke="#0284c7" stroke-width="9" stroke-linecap="round">`
      + `<line x1="870" y1="750" x2="${864 + wob}" y2="790"/>`
      + `<line x1="900" y1="754" x2="${900 - wob}" y2="796"/>`
      + `<line x1="930" y1="750" x2="${936 + wob}" y2="790"/></g>`;
  }
  fg += scaleProp(900, 872, 0.8, drainK > 0 && drainK < 1 ? t * 9 : 0.5);

  const bg = stage("#e8f3ee", "#c9e2d6",
    `<circle cx="960" cy="240" r="140" fill="#0d9488" opacity="0.14"/>`);
  const punch = lt >= 6.6;
  return {
    bg, figs, fg,
    cam: punch ? { cx: 940, cy: 600, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 14. Doctor Juggling Scalpel & Syringe (630.34 - 636.41)
function wLast_n(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.2;

  figs.push({
    id: "host", st: {
      x: 980, y: 670, timeSec: t, isTalking: lt < 4.8, blink: blinkAt(t),
      expression: punch ? "frustration_sigh" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 560, y: 500 } : undefined,
      gazeTarget: { x: 560, y: 500 },
    },
  });

  figs.push({
    id: "doc", st: {
      x: 560, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "doctor", hairStyle: "doctor_cap", clothes: "doctor_scrubs",
      rotation: Math.sin(t * 8) * 3,
      expression: "smug_sarcastic_clap", rightHandProp: "syringe",
    },
  });

  figs.push({
    id: "star", st: {
      x: 1420, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
      gender: "female", hairStyle: "female_high_ponytail", clothes: "dress_red_carpet", eyelashes: true,
      pose: "waving", expression: "sparkle_anime_eyes", comicFx: "sparkles",
      scale: 1.0 + Math.sin(t * 5) * 0.03,
      gazeTarget: { x: 560, y: 500 },
    },
  });

  const jt = (lt * 1.6) % 1;
  fg += scalpel(560, 400 - Math.abs(Math.sin(jt * Math.PI)) * 90, lt * 480);

  const bg = stage("#f3ede4", "#ddd0bd",
    `<circle cx="560" cy="260" r="150" fill="#b45309" opacity="0.16"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 780, cy: 540, zoom: 1.45, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 15. The YouTube Subscribe Outro & "Not Your Dad" (636.41 - 643.53)
function wLast_o(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.8;
  const walkOffK = easeIO(seg(lt, 3.2, 6.8));
  const hostX = lerp(580, 1650, walkOffK);

  figs.push({
    id: "host", st: {
      x: hostX, y: 670, timeSec: t,
      isTalking: lt < 2.8,
      isWalking: walkOffK > 0 && walkOffK < 1,
      bodyFacing: walkOffK > 0 ? "right" : "front",
      blink: blinkAt(t),
      expression: punch ? "deadpan_classic" : "smug_chuckle",
      pose: punch ? (walkOffK > 0 ? "default" : "shrug") : "default",
    },
  });

  const bellSwing = Math.sin(t * 8) * 16;
  fg += youtubeSubscribeButton(1240, 420, 1.0, bellSwing);

  const bg = stage("#f8fafc", "#e2e8f0",
    `<circle cx="1240" cy="420" r="220" fill="#dc2626" opacity="0.12"/>`);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 520, zoom: 1.35, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// =============================================================================
// WINDOW DRIVER REGISTRATION
// =============================================================================

const GAGS: GagDef[] = [
  { start: 524.00, end: 528.74, fn: wLast_a },
  { start: 528.74, end: 537.31, fn: wLast_b },
  { start: 537.31, end: 544.55, fn: wLast_c },
  { start: 544.55, end: 553.30, fn: wLast_d },
  { start: 553.30, end: 562.34, fn: wLast_e },
  { start: 562.34, end: 566.96, fn: wLast_f },
  { start: 566.96, end: 578.85, fn: wLast_g },
  { start: 578.85, end: 588.59, fn: wLast_h },
  { start: 588.59, end: 597.23, fn: wLast_i },
  { start: 597.23, end: 605.60, fn: wLast_j },
  { start: 605.60, end: 612.73, fn: wLast_k },
  { start: 612.73, end: 621.06, fn: wLast_l },
  { start: 621.06, end: 630.34, fn: wLast_m },
  { start: 630.34, end: 636.41, fn: wLast_n },
  { start: 636.41, end: 643.53, fn: wLast_o },
];

const stillList = stillsArg ? stillsArg.split(",").map(s => parseFloat(s)) : [];

if (arg("audit", "0") === "1") {
  const SAMPLES = 8;
  const NEED = 4;
  let fails = 0;
  console.log(`=== RUNNING 7-CHANNEL ANTI-STATUE MOTION AUDIT (15 SKITS) ===`);
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
  stillsDir: path.join(root, "output", "last2min_stills"),
  tag: "last2min",
});

if (stillList.length > 0) {
  console.log(`[last2min] Generated ${stillList.length} stills. Exiting.`);
  process.exit(0);
}
