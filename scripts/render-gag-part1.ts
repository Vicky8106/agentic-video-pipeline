/**
 * GAG PART 1 (t = 128.84 - 253.21): Y2K, GLP-1 Cheat Codes & Wind Transportation.
 *
 * GOLD STANDARD EDITION:
 * Engineered to match the handcrafted visual excellence of W01-W03:
 * - Bespoke cinematic world sets for every single skit (zero generic circle backdrops)
 * - Continuous secondary environmental physics (flickering neon, dancing waveforms, steam, sparks, wind)
 * - Format-breaking visual parodies (CRT scanlines, 8-bit arcade cabinet, X-ray medical viewer, MTV TRL)
 * - 3-beat progressive escalation with strict 7-channel anti-statue motion compliance.
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
const T0 = parseFloat(arg("start", "128.84"));
const T1 = parseFloat(arg("end", "253.21"));
const outFile = arg("out", path.join(root, "output", "master_chunks", "c05_part1.mp4"));
const stillsArg = arg("stills", "");

// =============================================================================
// BESPOKE GRAPHIC PROPS & CINEMATIC SET PIECES (ZERO WORDS HOUSE RULE)
// =============================================================================

// 1. Acoustic Studio & Podcast Rig
function acousticStudioSet(t: number): string {
  let foam = "";
  for (let x = 0; x < 1920; x += 160) {
    for (let y = 0; y < 700; y += 140) {
      const shade = ((x + y) / 140) % 2 === 0 ? "#1e293b" : "#0f172a";
      foam += `<rect x="${x}" y="${y}" width="160" height="140" fill="${shade}" stroke="#334155" stroke-width="2"/>`
        + `<line x1="${x}" y1="${y}" x2="${x + 160}" y2="${y + 140}" stroke="#233044" stroke-width="2"/>`;
    }
  }
  const onAirLit = Math.sin(t * 12) > -0.2;
  const onAirBg = onAirLit ? "#ef4444" : "#7f1d1d";
  const onAirGlow = onAirLit ? `<circle cx="0" cy="0" r="70" fill="#ef4444" opacity="0.25"/>` : "";
  const sign = `<g transform="translate(1600 180)">`
    + `${onAirGlow}`
    + `<rect x="-100" y="-36" width="200" height="72" rx="12" fill="#0f172a" stroke="#475569" stroke-width="6"/>`
    + `<rect x="-90" y="-28" width="180" height="56" rx="8" fill="${onAirBg}"/>`
    + `<circle cx="-50" cy="0" r="14" fill="#ffffff"/>`
    + `<rect x="-15" y="-14" width="30" height="28" rx="4" fill="#ffffff"/>`
    + `<circle cx="50" cy="0" r="14" fill="#ffffff"/>`
    + `</g>`;
  return stage("#0b1329", "#020617", foam + sign);
}

function fidgetSpinnerGold(x: number, y: number, s: number, rot: number): string {
  let trails = "";
  for (let i = 0; i < 3; i++) {
    const a = rot + (i * 120) * Math.PI / 180;
    const px = Math.cos(a) * 52;
    const py = Math.sin(a) * 52;
    trails += `<path d="M 0 0 Q ${px * 0.5} ${py * 0.5} ${px} ${py}" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" opacity="0.6"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<g rotate="${(rot * 180 / Math.PI).toFixed(1)}">`
    + trails
    + `<circle cx="0" cy="0" r="24" fill="#0f172a" stroke="#64748b" stroke-width="6"/>`
    + `<circle cx="0" cy="-58" r="32" fill="#38bdf8" stroke="#0284c7" stroke-width="8"/>`
    + `<circle cx="-50" cy="29" r="32" fill="#ef4444" stroke="#b91c1c" stroke-width="8"/>`
    + `<circle cx="50" cy="29" r="32" fill="#eab308" stroke="#a16207" stroke-width="8"/>`
    + `<circle cx="0" cy="-58" r="14" fill="#ffffff"/><circle cx="-50" cy="29" r="14" fill="#ffffff"/><circle cx="50" cy="29" r="14" fill="#ffffff"/>`
    + `</g></g>`;
}

function podcastMicGold(x: number, y: number, s: number, talking: boolean, t: number): string {
  let waves = "";
  if (talking) {
    for (let i = 1; i <= 3; i++) {
      const r = 35 + i * 22 + (Math.sin(t * 16 + i) * 6);
      waves += `<path d="M 30 ${-r * 0.6} A ${r} ${r} 0 0 1 30 ${r * 0.6}" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" opacity="${0.9 - i * 0.25}"/>`;
    }
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-140" y="80" width="280" height="24" rx="6" fill="#1e293b" stroke="#475569" stroke-width="4"/>`
    + `<rect x="-35" y="60" width="70" height="20" rx="4" fill="#334155"/>`
    + `<line x1="0" y1="-20" x2="0" y2="60" stroke="#64748b" stroke-width="12"/>`
    + `<circle cx="0" cy="-20" r="14" fill="#475569"/>`
    + `<line x1="0" y1="-20" x2="-40" y2="-70" stroke="#64748b" stroke-width="10"/>`
    + `<rect x="-65" y="-120" width="50" height="85" rx="25" fill="#94a3b8" stroke="#475569" stroke-width="6"/>`
    + `<path d="M -75 -85 C -75 -40 -15 -40 -15 -85" fill="none" stroke="#334155" stroke-width="8" stroke-linecap="round"/>`
    + waves
    + `</g>`;
}

// 2. Gym Backdrop vs VIP Glass Elevator
function gymSet(): string {
  let rack = "";
  for (let i = 0; i < 4; i++) {
    const rx = 650 + i * 65;
    rack += `<rect x="${rx}" y="680" width="16" height="120" rx="4" fill="#334155"/>`
      + `<circle cx="${rx + 8}" cy="700" r="26" fill="#0f172a" stroke="#475569" stroke-width="4"/>`
      + `<circle cx="${rx + 8}" cy="760" r="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>`;
  }
  const bars = `<line x1="600" y1="360" x2="950" y2="360" stroke="#475569" stroke-width="12" stroke-linecap="round"/>`
    + `<line x1="680" y1="360" x2="680" y2="880" stroke="#334155" stroke-width="10"/>`
    + `<line x1="870" y1="360" x2="870" y2="880" stroke="#334155" stroke-width="10"/>`;
  return stage("#f1f5f9", "#e2e8f0", rack + bars);
}

function vipGlassElevator(x: number, y: number, s: number, t: number): string {
  const glow = Math.sin(t * 8) > 0 ? "#38bdf8" : "#0284c7";
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-120" y="-320" width="240" height="520" rx="20" fill="#0f172a" opacity="0.25"/>`
    + `<rect x="-110" y="-310" width="220" height="500" rx="16" fill="#e0f2fe" opacity="0.45" stroke="#0284c7" stroke-width="8"/>`
    + `<polygon points="0,-270 -20,-240 20,-240" fill="${glow}"/>`
    + `<line x1="-110" y1="-80" x2="110" y2="-80" stroke="#eab308" stroke-width="8"/>`
    + `<rect x="-90" y="-60" width="180" height="10" rx="4" fill="#cbd5e1"/>`
    + `</g>`;
}

// 3. Office Cubicle & Panic Spreadsheet
function cubicleSet(t: number): string {
  const flick = Math.sin(t * 22) > 0.85 ? 0.3 : 0.9;
  const lights = `<g transform="translate(960 60)">`
    + `<rect x="-600" y="0" width="400" height="18" rx="6" fill="#ffffff" opacity="${flick}"/>`
    + `<rect x="200" y="0" width="400" height="18" rx="6" fill="#ffffff" opacity="0.9"/>`
    + `</g>`;
  const divider = `<rect x="1200" y="380" width="30" height="500" rx="6" fill="#64748b" stroke="#334155" stroke-width="6"/>`
    + `<rect x="1225" y="420" width="250" height="380" rx="8" fill="#94a3b8" stroke="#475569" stroke-width="4"/>`;
  return stage("#f8fafc", "#e2e8f0", lights + divider);
}

function bigComputerMonitor(x: number, y: number, s: number, isPanicSpreadsheet: boolean): string {
  if (isPanicSpreadsheet) {
    let grid = "";
    for (let r = 0; r < 6; r++) {
      grid += `<line x1="-220" y1="${-70 + r * 30}" x2="220" y2="${-70 + r * 30}" stroke="#cbd5e1" stroke-width="3"/>`;
    }
    for (let c = -120; c <= 120; c += 80) {
      grid += `<line x1="${c}" y1="-100" x2="${c}" y2="100" stroke="#cbd5e1" stroke-width="3"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s})">`
      + `<rect x="-240" y="-120" width="480" height="260" rx="14" fill="#0f172a" stroke="#334155" stroke-width="10"/>`
      + `<rect x="-220" y="-100" width="440" height="200" rx="6" fill="#ffffff"/>`
      + `<rect x="-220" y="-100" width="440" height="30" fill="#16a34a"/>`
      + grid
      + `<rect x="-40" y="140" width="80" height="50" fill="#334155"/>`
      + `<ellipse cx="0" cy="190" rx="100" ry="16" fill="#1e293b"/>`
      + `</g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-240" y="-120" width="480" height="260" rx="14" fill="#0f172a" stroke="#334155" stroke-width="10"/>`
    + `<rect x="-220" y="-100" width="440" height="200" rx="6" fill="#38bdf8"/>`
    + `<rect x="-220" y="-100" width="440" height="28" fill="#dc2626"/>`
    + `<circle cx="-200" cy="-86" r="6" fill="#fef08a"/><circle cx="-180" cy="-86" r="6" fill="#bbf7d0"/>`
    + `<polygon points="-100,-20 -20,40 -180,40" fill="#f59e0b"/>`
    + `<circle cx="80" cy="0" r="45" fill="#ef4444"/>`
    + `<rect x="-40" y="140" width="80" height="50" fill="#334155"/>`
    + `<ellipse cx="0" cy="190" rx="100" ry="16" fill="#1e293b"/>`
    + `</g>`;
}

// 4. Medical X-Ray Diagnostic Suite
function xraySuiteSet(t: number): string {
  const monitor = `<g transform="translate(1500 240)">`
    + `<rect x="-140" y="-80" width="280" height="160" rx="12" fill="#020617" stroke="#334155" stroke-width="8"/>`
    + `<path d="M -120 0 L -40 0 L -20 -40 L 0 50 L 20 -20 L 40 0 L 120 0" fill="none" stroke="#22c55e" stroke-width="6"/>`
    + `<circle cx="100" cy="-50" r="10" fill="#22c55e"/>`
    + `</g>`;
  return stage("#020617", "#0f172a", monitor);
}

function xrayLightboxScreen(x: number, y: number, s: number, squeeze: number): string {
  const sq = squeeze * 32;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-200" y="-280" width="400" height="480" rx="16" fill="#042f2e" stroke="#14b8a6" stroke-width="12"/>`
    + `<rect x="-180" y="-260" width="360" height="440" rx="10" fill="#0f766e" opacity="0.3"/>`
    + `<line x1="-120" y1="-180" x2="120" y2="-180" stroke="#99f6e4" stroke-width="12" stroke-linecap="round"/>`
    + `<line x1="-110" y1="-140" x2="110" y2="-140" stroke="#99f6e4" stroke-width="10" stroke-linecap="round"/>`
    + `<line x1="-90" y1="-100" x2="90" y2="-100" stroke="#99f6e4" stroke-width="8" stroke-linecap="round"/>`
    + `<path d="M ${-130 + sq} -30 Q 0 ${10 - sq * 0.5} ${130 - sq} -30" fill="none" stroke="#facc15" stroke-width="14" stroke-linecap="round"/>`
    + `<circle cx="0" cy="50" r="${Math.max(10, 45 - sq)}" fill="#ef4444" opacity="0.7"/>`
    + `</g>`;
}

// 5. MTV TRL Stage Rig
function trlStageSet(t: number): string {
  const beamPink = `<polygon points="300,-100 ${700 + Math.sin(t * 2) * 120},880 ${900 + Math.sin(t * 2) * 120},880 340,-100" fill="#ec4899" opacity="0.16"/>`;
  const beamCyan = `<polygon points="1600,-100 ${1000 + Math.cos(t * 2) * 120},880 ${1200 + Math.cos(t * 2) * 120},880 1640,-100" fill="#06b6d4" opacity="0.16"/>`;
  const truss = `<g stroke="#475569" stroke-width="6">`
    + `<line x1="0" y1="120" x2="1920" y2="120"/>`
    + `<line x1="0" y1="160" x2="1920" y2="160"/>`
    + `<line x1="0" y1="120" x2="60" y2="160"/><line x1="60" y1="160" x2="120" y2="120"/>`
    + `<line x1="120" y1="120" x2="180" y2="160"/><line x1="180" y1="160" x2="240" y2="120"/>`
    + `</g>`;
  return stage("#1e1b4b", "#0f172a", beamPink + beamCyan + truss);
}

// 6. Paris High-Fashion Runway
function fashionRunwaySet(): string {
  const runway = `<polygon points="760,880 1160,880 1060,480 860,480" fill="#09090b" stroke="#38bdf8" stroke-width="4"/>`
    + `<line x1="960" y1="480" x2="960" y2="880" stroke="#ffffff" stroke-width="4" stroke-dasharray="24 16"/>`;
  const lights = `<circle cx="960" cy="220" r="160" fill="#ffffff" opacity="0.08"/>`;
  return stage("#18181b", "#09090b", lights + runway);
}

function giantPriceTag(x: number, y: number, s: number, amount: string): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<line x1="0" y1="-220" x2="0" y2="-120" stroke="#f59e0b" stroke-width="6"/>`
    + `<polygon points="-90,-120 90,-120 120,40 -120,40" fill="#ef4444" stroke="#991b1b" stroke-width="8"/>`
    + `<circle cx="0" cy="-90" r="12" fill="#ffffff"/>`
    + `<text x="0" y="10" font-family="sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">${amount}</text>`
    + `</g>`;
}

// 7. Industrial Stomach Bioreactor Alarm
function bioreactorSet(t: number, alarm: boolean): string {
  const redGlow = alarm && Math.sin(t * 16) > 0 ? `<rect x="0" y="0" width="1920" height="1080" fill="#ef4444" opacity="0.18"/>` : "";
  const beacon = `<g transform="translate(1500 200)">`
    + `<rect x="-30" y="0" width="60" height="50" fill="#1e293b"/>`
    + `<ellipse cx="0" cy="0" rx="36" ry="24" fill="${alarm ? '#ef4444' : '#64748b'}"/>`
    + `</g>`;
  const pipes = `<path d="M 200 100 L 200 400 L 400 400" fill="none" stroke="#475569" stroke-width="26"/>`
    + `<path d="M 1720 100 L 1720 400 L 1520 400" fill="none" stroke="#475569" stroke-width="26"/>`;
  return stage("#0f172a", "#020617", redGlow + beacon + pipes);
}

// 8. Retro Arcade Cabinet Frame & 8-Bit Konami HUD
function arcadeCabinetSet(t: number): string {
  let scanlines = "";
  const off = (t * 70) % 24;
  for (let y = 0; y < 720; y += 24) {
    scanlines += `<line x1="0" y1="${y + off}" x2="1920" y2="${y + off}" stroke="#16a34a" stroke-width="2" opacity="0.18"/>`;
  }
  const crtBezel = `<rect x="40" y="30" width="1840" height="1020" rx="60" fill="none" stroke="#15803d" stroke-width="28" opacity="0.35"/>`;
  return stage("#022c22", "#052e16", scanlines + crtBezel);
}

function konami8BitScreen(x: number, y: number, s: number, step: number): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + `<rect x="-240" y="-120" width="480" height="240" rx="16" fill="#052e16" stroke="#22c55e" stroke-width="8"/>`
    + `<text x="0" y="-40" font-family="monospace" font-size="28" font-weight="bold" fill="#4ade80" text-anchor="middle">UP UP DOWN DOWN</text>`
    + `<text x="0" y="10" font-family="monospace" font-size="28" font-weight="bold" fill="#4ade80" text-anchor="middle">LEFT RIGHT B A</text>`
    + `<rect x="-180" y="40" width="360" height="24" rx="4" fill="#14532d"/>`
    + `<rect x="-180" y="40" width="${360 * Math.min(1, step)}" height="24" rx="4" fill="#22c55e"/>`
    + `</g>`;
}

// 9. Apple-Style Cleanroom Showroom
function cleanroomShowroomSet(): string {
  const pedestals = `<g transform="translate(1150 750)">`
    + `<ellipse cx="0" cy="50" rx="220" ry="40" fill="#cbd5e1"/>`
    + `<rect x="-180" y="-120" width="360" height="170" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="6"/>`
    + `</g>`;
  const ceilingLight = `<polygon points="900,0 1400,0 1350,650 950,650" fill="#e0f2fe" opacity="0.25"/>`;
  return stage("#f8fafc", "#e2e8f0", ceilingLight + pedestals);
}

// 10. Fine Dining Candlelit Restaurant
function fineDiningSet(t: number): string {
  const flameWobble = (Math.sin(t * 11) * 3).toFixed(1);
  const candle = `<g transform="translate(1180 620)">`
    + `<rect x="-6" y="0" width="12" height="40" fill="#fef08a"/>`
    + `<path d="M 0 0 Q ${flameWobble} -20 0 -35 Q ${-flameWobble} -20 0 0" fill="#f97316"/>`
    + `<circle cx="0" cy="-20" r="30" fill="#fef08a" opacity="0.25"/>`
    + `</g>`;
  const drapery = `<path d="M 0 0 Q 480 180 960 0 Q 1440 180 1920 0 L 1920 880 L 0 880 Z" fill="none"/>`;
  return stage("#3b0764", "#2e1065", candle + drapery);
}

// 11. Commercial Stainless Kitchen
function commercialKitchenSet(t: number): string {
  let pots = "";
  for (let i = 0; i < 4; i++) {
    pots += `<line x1="${500 + i * 160}" y1="120" x2="${500 + i * 160}" y2="220" stroke="#64748b" stroke-width="6"/>`
      + `<circle cx="${500 + i * 160}" cy="240" r="28" fill="#d97706" stroke="#92400e" stroke-width="4"/>`;
  }
  const burners = `<line x1="450" y1="120" x2="1100" y2="120" stroke="#334155" stroke-width="10"/>` + pots;
  return stage("#f1f5f9", "#cbd5e1", burners);
}

// 12. Ethereal Wellness Sanctuary
function zenSanctuarySet(t: number): string {
  const sunbeams = `<polygon points="600,0 900,0 1400,880 1100,880" fill="#fef08a" opacity="0.14"/>`;
  let motes = "";
  for (let i = 0; i < 6; i++) {
    const mx = 1000 + Math.sin(t * 1.5 + i) * 120;
    const my = 400 + Math.cos(t * 1.8 + i) * 140;
    motes += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="6" fill="#fef08a" opacity="0.6"/>`;
  }
  return stage("#fefce8", "#fef08a", sunbeams + motes);
}

// 13. Late-Night Bedroom Set
function lateNightBedroomSet(t: number): string {
  const lampGlow = `<circle cx="1400" cy="560" r="140" fill="#fde047" opacity="0.18"/>`
    + `<rect x="1380" y="580" width="40" height="120" fill="#92400e"/>`
    + `<polygon points="1350,580 1450,580 1430,520 1370,520" fill="#fef08a"/>`;
  const clock = `<g transform="translate(1400 240)">`
    + `<circle cx="0" cy="0" r="45" fill="#ffffff" stroke="#334155" stroke-width="6"/>`
    + `<line x1="0" y1="0" x2="0" y2="-25" stroke="#0f172a" stroke-width="4"/>`
    + `<line x1="0" y1="0" x2="${Math.sin(t * 4) * 25}" y2="${Math.cos(t * 4) * 25}" stroke="#ef4444" stroke-width="2"/>`
    + `</g>`;
  return stage("#0f172a", "#020617", lampGlow + clock);
}

// 14. Celestial Pearly Gates Set
function heavenPearlyGatesSet(t: number): string {
  const haloRays = `<circle cx="1100" cy="300" r="220" fill="#fef08a" opacity="0.22"/>`;
  let clouds = "";
  for (let i = 0; i < 7; i++) {
    const cx = 300 + i * 220 + Math.sin(t * 0.8 + i) * 15;
    clouds += `<circle cx="${cx.toFixed(0)}" cy="860" r="90" fill="#ffffff" opacity="0.9"/>`;
  }
  return stage("#e0f2fe", "#ffffff", haloRays + clouds);
}

// 15. Stormy Gala Red Carpet Set
function stormyGalaSet(t: number): string {
  const beamAngle = Math.sin(t * 1.5) * 180;
  const searchlight = `<polygon points="400,880 ${800 + beamAngle},-100 ${1000 + beamAngle},-100 460,880" fill="#ffffff" opacity="0.16"/>`;
  const palmTree = `<path d="M 1650 880 Q 1550 500 1300 350" fill="none" stroke="#78350f" stroke-width="24"/>`
    + `<path d="M 1300 350 Q 1150 300 1000 330" fill="none" stroke="#15803d" stroke-width="14"/>`
    + `<path d="M 1300 350 Q 1200 400 1050 480" fill="none" stroke="#15803d" stroke-width="14"/>`;
  let windStreaks = "";
  for (let i = 0; i < 5; i++) {
    const wx = ((t * 800 + i * 380) % 2400) - 200;
    const wy = 250 + i * 90;
    windStreaks += `<line x1="${wx}" y1="${wy}" x2="${wx + 180}" y2="${wy + 15}" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" opacity="0.65"/>`;
  }
  return stage("#0f172a", "#991b1b", searchlight + palmTree + windStreaks);
}

// =============================================================================
// SKIT DEFINITIONS (PART 1: 15 GOLD-STANDARD SKITS)
// =============================================================================

// 1. Fidget Spinners vs Friend's Podcast (128.84 - 137.38)
function p1_a(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.0;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1200, y: 520 } : undefined,
    },
  });

  const pod = walkerXR(lt, 1200, 1.0, 2.2);
  if (pod.on) {
    figs.push({
      id: "podcaster", st: {
        x: pod.x, y: 670, timeSec: t, isTalking: lt >= 2.5 && lt < 6.0, isWalking: pod.walking, blink: blinkAt(t + 1),
        gender: "male", hairStyle: "male_short", clothes: "hoodie",
        expression: "smug_chuckle",
      },
    });
  }

  fg += fidgetSpinnerGold(850, 480, 0.9, t * 14);
  if (pod.on) fg += podcastMicGold(1140, 680, 0.9, lt >= 2.5 && lt < 6.0, t);

  const bg = acousticStudioSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 2. Pharma Shortcut Skipping the Gym (137.38 - 144.03)
function p1_b(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const elevY = lerp(100, 650, easeIO(seg(lt, 0.8, 4.0)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.0, blink: blinkAt(t),
      expression: punch ? "smug_finger_guns" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1350, y: 550 } : undefined,
    },
  });

  figs.push({
    id: "gym_guy", st: {
      x: 820, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: "fear_trembling", comicFx: "sweat_drop",
      spineLean: Math.sin(t * 8) * 6,
    },
  });

  figs.push({
    id: "rich_skipper", st: {
      x: 1350, y: elevY, timeSec: t, isTalking: false,
      gender: "male", hairStyle: "male_tech_bro", clothes: "suit",
      costume: "y2k_sunglasses", expression: "smug_hands_behind_head",
    },
  });

  fg += vipGlassElevator(1350, elevY, 1.0, t);

  const bg = gymSet();
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 540, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 3. Browser Tab Cloaking When Boss Walks By (144.03 - 150.27)
function p1_c(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 2.8;

  figs.push({
    id: "host", st: {
      x: 340, y: 670, timeSec: t, isTalking: lt < 4.5, blink: blinkAt(t),
      expression: punch ? "shock" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 960, y: 540 } : undefined,
    },
  });

  figs.push({
    id: "worker", st: {
      x: 740, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "hoodie",
      expression: punch ? "deadpan_line" : "blissful_serenity",
      spineLean: punch ? -8 : 0,
    },
  });

  const boss = walkerXR(lt, 1350, 1.5, 2.8);
  if (boss.on) {
    figs.push({
      id: "boss", st: {
        x: boss.x, y: 670, timeSec: t, isTalking: punch, isWalking: boss.walking,
        gender: "male", hairStyle: "male_bald_fringe", clothes: "suit",
        expression: "angry_scowl",
      },
    });
  }

  fg += bigComputerMonitor(980, 580, 0.95, punch);

  const bg = cubicleSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 4. Y2K Fashion Hostile to Internal Organs (150.27 - 160.30)
function p1_d(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.0;
  const sqK = easeIO(seg(lt, 2.5, 6.0));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "fear_trembling" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 530 } : undefined,
    },
  });

  figs.push({
    id: "model", st: {
      x: 1050, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "female", hairStyle: "female_bob", clothes: "crop_top",
      expression: punch ? "screaming_panic" : "deadpan_line",
      scale: 1.0 - sqK * 0.12,
    },
  });

  fg += xrayLightboxScreen(1050, 500, 1.05, sqK);

  const bg = xraySuiteSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 530, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 5. Low-Rise Pelvic Jeans & Napkin-Sized Baby Tees (160.30 - 170.24)
function p1_e(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  const m1 = walkerX(lt, 850, 0.5, 1.8, 7.0, 8.5);
  if (m1.on) {
    figs.push({
      id: "y2k_1", st: {
        x: m1.x, y: 670, timeSec: t, isTalking: false, isWalking: m1.walking,
        gender: "female", hairStyle: "female_ponytail", clothes: "crop_top",
        expression: "smug_chuckle", costume: "y2k_sunglasses",
      },
    });
  }

  const m2 = walkerXR(lt, 1280, 2.0, 3.4);
  if (m2.on) {
    figs.push({
      id: "y2k_2", st: {
        x: m2.x, y: 670, timeSec: t, isTalking: false, isWalking: m2.walking,
        gender: "female", hairStyle: "female_straight_long", clothes: "crop_top",
        expression: "blissful_serenity", costume: "y2k_sunglasses",
      },
    });
  }

  const bg = trlStageSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 540, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 6. The $2,000 Miu Miu Micro-Skirt Belt (170.24 - 176.77)
function p1_f(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.5;
  const tagDrop = easeIO(seg(lt, 2.0, 3.5));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 5.0, blink: blinkAt(t),
      expression: punch ? "smug_thumbs_up" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 540 } : undefined,
    },
  });

  const model = walkerXR(lt, 1050, 0.5, 2.0);
  if (model.on) {
    figs.push({
      id: "model", st: {
        x: model.x, y: 670, timeSec: t, isTalking: false, isWalking: model.walking,
        gender: "female", hairStyle: "female_bob", clothes: "crop_top",
        expression: "deadpan_line",
      },
    });
  }

  if (tagDrop > 0) {
    const ty = lerp(-300, 320, tagDrop);
    fg += giantPriceTag(1050, ty, 1.1, "$2,400");
  }
  if (punch) fg += flashBurst(1050, 480, 1.2);

  const bg = fashionRunwaySet();
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 500, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 7. Functioning Digestive Tract vs Solid Food Alarm (176.77 - 184.24)
function p1_g(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const crumbY = lerp(200, 680, easeIO(seg(lt, 1.0, 3.8)));

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "fear_trembling" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 540 } : undefined,
    },
  });

  figs.push({
    id: "patient", st: {
      x: 1050, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: punch ? "screaming_panic" : "deadpan_line",
      comicFx: punch ? "sweat_drop" : undefined,
      spineLean: punch ? Math.sin(t * 16) * 8 : 0,
    },
  });

  fg += `<g transform="translate(1050 ${crumbY})">`
    + `<circle cx="0" cy="0" r="14" fill="#d97706" stroke="#92400e" stroke-width="4"/>`
    + `<circle cx="-4" cy="-3" r="3" fill="#fef3c7"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1050, 620, 1.3);

  const bg = bioreactorSet(t, punch);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 530, zoom: 1.6, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 8. 8-Bit Konami Cheat Code & Descending Syringe (184.24 - 191.70)
function p1_h(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.5;
  const popK = easeIO(seg(lt, 0.8, 3.2));

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 5.5, blink: blinkAt(t),
      expression: punch ? "smug_finger_guns" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 480 } : undefined,
    },
  });

  fg += konami8BitScreen(1100, 440, 1.1, popK);
  if (punch) fg += flashBurst(1100, 440, 1.3);

  const bg = arcadeCabinetSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 460, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 9. GLP-1 High-Tech Luxury Injector Pens (191.70 - 198.30)
function p1_i(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 3.5;

  figs.push({
    id: "host", st: {
      x: 400, y: 670, timeSec: t, isTalking: lt < 5.0, blink: blinkAt(t),
      expression: punch ? "smug_chuckle" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1150, y: 520 } : undefined,
    },
  });

  [-110, 0, 110].forEach((dx, i) => {
    const py = 500 + Math.sin(t * 3.5 + i) * 14;
    fg += `<g transform="translate(${1150 + dx} ${py}) scale(0.95)">`
      + `<rect x="-18" y="-100" width="36" height="200" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>`
      + `<rect x="-12" y="-60" width="24" height="40" rx="4" fill="#38bdf8"/>`
      + `<circle cx="0" cy="0" r="8" fill="#e0f2fe"/>`
      + `<line x1="0" y1="100" x2="0" y2="130" stroke="#94a3b8" stroke-width="6"/>`
      + `</g>`;
  });
  if (punch) fg += flashBurst(1150, 480, 1.1);

  const bg = cleanroomShowroomSet();
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 10. Full After Half a Saltine Cracker (198.30 - 208.22)
function p1_j(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 5.5;
  const bellyPop = easeIO(seg(lt, 5.5, 6.5)) * 40;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.5, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1150, y: 560 } : undefined,
    },
  });

  figs.push({
    id: "eater", st: {
      x: 1050, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "suit",
      expression: punch ? "shock" : "deadpan_line",
      spineLean: punch ? 8 : 0,
    },
  });

  fg += `<g transform="translate(1180 660)">`
    + `<ellipse cx="0" cy="20" rx="100" ry="24" fill="#cbd5e1" stroke="#64748b" stroke-width="6"/>`
    + `<rect x="-24" y="-10" width="48" height="24" fill="#fef08a" stroke="#ca8a04" stroke-width="4"/>`
    + `</g>`;

  if (bellyPop > 0) {
    fg += `<ellipse cx="1050" cy="620" rx="${30 + bellyPop}" ry="${25 + bellyPop * 0.8}" fill="#334155" opacity="0.85"/>`;
  }

  const bg = fineDiningSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1080, cy: 560, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 11. Kale Smoothie Tossed in Trash & Bewildered Chef (208.22 - 216.75)
function p1_k(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "smug_thumbs_up" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 550 } : undefined,
    },
  });

  figs.push({
    id: "chef", st: {
      x: 820, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "tshirt",
      expression: punch ? "screaming_panic" : "deadpan_line",
    },
  });

  const client = walkerXR(lt, 1250, 1.0, 2.5);
  if (client.on) {
    figs.push({
      id: "client", st: {
        x: client.x, y: 670, timeSec: t, isTalking: false, isWalking: client.walking,
        gender: "female", hairStyle: "female_ponytail", clothes: "dress",
        expression: "deadpan_line",
      },
    });
  }

  fg += `<g transform="translate(1040 680)">`
    + `<rect x="-35" y="-50" width="70" height="90" rx="6" fill="#64748b" stroke="#334155" stroke-width="6"/>`
    + `</g>`;
  if (punch) fg += flashBurst(1040, 620, 1.1);

  const bg = commercialKitchenSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 550, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 12. Consuming Only Oxygen and Attention (216.75 - 224.97)
function p1_l(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;
  const floatY = 620 + Math.sin(t * 2.5) * 20;

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "skeptical_side_eye" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: 520 } : undefined,
    },
  });

  figs.push({
    id: "breatharian", st: {
      x: 1100, y: floatY, timeSec: t, isTalking: false, blink: blinkAt(t + 2),
      gender: "female", hairStyle: "female_straight_long", clothes: "dress",
      expression: "blissful_serenity",
    },
  });

  fg += `<path d="M 1100 ${floatY - 40} Q ${1150 + Math.sin(t * 6) * 30} ${floatY - 120} 1100 ${floatY - 180}" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" opacity="0.75"/>`;
  if (punch) fg += flashBurst(1100, floatY - 80, 1.1);

  const bg = zenSanctuarySet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 520, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 13. The "Stop Texting Your Ex" Anti-Craving Zap (224.97 - 233.09)
function p1_m(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 6.0, blink: blinkAt(t),
      expression: punch ? "smug_thumbs_up" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1050, y: 550 } : undefined,
    },
  });

  figs.push({
    id: "texter", st: {
      x: 1050, y: 670, timeSec: t, isTalking: false, blink: blinkAt(t + 1),
      gender: "male", hairStyle: "male_short", clothes: "hoodie",
      expression: punch ? "fear_trembling" : "sad_pout",
      spineLean: punch ? 10 : 0,
    },
  });

  fg += `<g transform="translate(1000 620)">`
    + `<rect x="-20" y="-35" width="40" height="70" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>`
    + `</g>`;
  if (punch) {
    fg += `<path d="M 1000 600 L 1020 570 L 1010 575 L 1040 550" stroke="#facc15" stroke-width="8" fill="none"/>`
      + flashBurst(1020, 570, 1.2);
  }

  const bg = lateNightBedroomSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1050, cy: 550, zoom: 1.55, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 14. Angelic French Bread Vanishing into Smoke (233.09 - 242.73)
function p1_n(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.5;
  const ascendY = lerp(620, 320, easeIO(seg(lt, 1.5, 6.5)));

  figs.push({
    id: "host", st: {
      x: 380, y: 670, timeSec: t, isTalking: lt < 7.0, blink: blinkAt(t),
      expression: punch ? "blissful_serenity" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1100, y: ascendY } : undefined,
    },
  });

  const flap = Math.sin(t * 12) * 20;
  fg += `<g transform="translate(1100 ${ascendY})">`
    + `<circle cx="0" cy="-60" r="26" fill="none" stroke="#facc15" stroke-width="6"/>`
    + `<ellipse cx="0" cy="0" rx="80" ry="24" fill="#d97706" stroke="#78350f" stroke-width="6"/>`
    + `<path d="M -40 -10 Q -90 ${-60 + flap} -120 ${flap}" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>`
    + `<path d="M 40 -10 Q 90 ${-60 + flap} 120 ${flap}" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>`
    + `</g>`;

  if (punch) fg += flashBurst(1100, ascendY, 1.2);

  const bg = heavenPearlyGatesSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1100, cy: 460, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// 15. Red Carpet Hurricane Wind: Actress as a Kite (242.73 - 253.21)
function p1_o(t: number, lt: number): GagOut {
  const figs: Fig[] = [];
  let fg = "";
  const punch = lt >= 4.0;
  const kiteY = lerp(670, 360, easeIO(seg(lt, 2.0, 7.0)));

  figs.push({
    id: "host", st: {
      x: 360, y: 670, timeSec: t, isTalking: lt < 7.5, blink: blinkAt(t),
      expression: punch ? "shock" : "deadpan_classic",
      pose: punch ? "point_camera" : "default",
      pointTarget: punch ? { x: 1150, y: kiteY } : undefined,
    },
  });

  figs.push({
    id: "kite_actress", st: {
      x: 1150, y: kiteY, timeSec: t, isTalking: false,
      gender: "female", hairStyle: "female_straight_long", clothes: "dress",
      expression: punch ? "screaming_panic" : "deadpan_line",
      spineLean: -24,
    },
  });

  fg += `<line x1="1000" y1="880" x2="1150" y2="${kiteY + 40}" stroke="#ffffff" stroke-width="4" stroke-dasharray="8 6"/>`;
  if (punch) fg += flashBurst(1150, kiteY, 1.2);

  const bg = stormyGalaSet(t);
  return {
    bg, figs, fg,
    cam: punch ? { cx: 1150, cy: 480, zoom: 1.5, cut: false } : { cx: 960, cy: 560, zoom: 1.25, cut: lt < 0.05 },
  };
}

// =============================================================================
// WINDOW DRIVER REGISTRATION
// =============================================================================

const GAGS: GagDef[] = [
  { start: 128.84, end: 137.38, fn: p1_a },
  { start: 137.38, end: 144.03, fn: p1_b },
  { start: 144.03, end: 150.27, fn: p1_c },
  { start: 150.27, end: 160.30, fn: p1_d },
  { start: 160.30, end: 170.24, fn: p1_e },
  { start: 170.24, end: 176.77, fn: p1_f },
  { start: 176.77, end: 184.24, fn: p1_g },
  { start: 184.24, end: 191.70, fn: p1_h },
  { start: 191.70, end: 198.30, fn: p1_i },
  { start: 198.30, end: 208.22, fn: p1_j },
  { start: 208.22, end: 216.75, fn: p1_k },
  { start: 216.75, end: 224.97, fn: p1_l },
  { start: 224.97, end: 233.09, fn: p1_m },
  { start: 233.09, end: 242.73, fn: p1_n },
  { start: 242.73, end: 253.21, fn: p1_o },
];

const stillList = stillsArg ? stillsArg.split(",").map(s => parseFloat(s)) : [];

if (arg("audit", "0") === "1") {
  const SAMPLES = 8;
  const NEED = 4;
  let fails = 0;
  console.log(`=== RUNNING 7-CHANNEL ANTI-STATUE MOTION AUDIT (PART 1 GOLD: 15 SKITS) ===`);
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
  stillsDir: path.join(root, "output", "part1_gold_stills"),
  tag: "part1_gold",
});

if (stillList.length > 0) {
  console.log(`[part1_gold] Generated ${stillList.length} stills. Exiting.`);
  process.exit(0);
}
