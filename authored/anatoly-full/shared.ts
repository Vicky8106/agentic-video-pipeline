/**
 * Shared cast + stagecraft for the Anatoly Full Video (0.00–973.57s).
 * Catalog rigs as raw material; bespoke staging choices per scene.
 */
import { renderStickFigure } from "../../src/character/StickFigure.js";

type FigState = Parameters<typeof renderStickFigure>[1];

const fig = (id: string, s: Record<string, unknown>): string =>
  renderStickFigure(id, s as FigState);

const base = {
  timeSec: 0,
  isTalking: true,
  gazeX: 0.45,
};

/** The narrator-host (Casually Explained style hoodie). */
export const host = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("host", {
    ...base, timeSec: t, x, y, scale: 1.25, gender: "male",
    hairStyle: "male_short", clothes: "hoodie", expression: "deadpan_classic",
    ...extra,
  });

/** Anatoly in janitor uniform, mop in hand. */
export const janitor = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("anatoly", {
    ...base, timeSec: t, x, y, scale: 1.2, gender: "male",
    hairStyle: "janitor_cap", clothes: "janitor_overalls",
    rightHandProp: "mop", expression: "deadpan_classic",
    ...extra,
  });

/** The enormous gym bodybuilder. */
export const builder = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("bodybuilder", {
    ...base, timeSec: t, x, y, scale: 1.5, gender: "male",
    hairStyle: "male_bodybuilder_bald", clothes: "bodybuilder_tank",
    expression: "smug_rock_eyebrow",
    ...extra,
  });

/** Suit commentator (analyst / media critic). */
export const suit = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("suit", {
    ...base, timeSec: t, x, y, scale: 1.15, gender: "male",
    hairStyle: "male_short", clothes: "suit", expression: "skeptical_side_eye",
    ...extra,
  });

/** Dr. Mike Israetel / Exercise Scientist analysis figure. */
export const drMike = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("dr_mike", {
    ...base, timeSec: t, x, y, scale: 1.3, gender: "male",
    hairStyle: "male_bodybuilder_bald", clothes: "doctor_scrubs",
    expression: "smug_rock_eyebrow",
    ...extra,
  });

/** Gym bro scrolling phone on the bench instead of lifting. */
export const scroller = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("scroller", {
    ...base, timeSec: t, x, y, scale: 1.2, gender: "male",
    hairStyle: "male_short", clothes: "bodybuilder_tank",
    expression: "derp_smile", rightHandProp: "phone",
    ...extra,
  });

/** Impact dust burst, k = 0..1 (grows + fades). */
export const dust = (x: number, y: number, k: number): string => {
  if (k <= 0 || k >= 1) return ``;
  let s = ``;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.4;
    const r = 20 + k * 90;
    s += `<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.35).toFixed(1)}" ` +
      `r="${(15 * (1 - k) + 4).toFixed(1)}" fill="#d6c9b8" opacity="${(0.75 * (1 - k)).toFixed(2)}"/>`;
  }
  return s;
};

/** Giant click cursor (pure SVG vector). */
export const cursor = (x: number, y: number, s: number, press = 0): string =>
  `<g transform="translate(${x} ${y}) scale(${(s * (1 - press * 0.15)).toFixed(3)})">` +
  `<polygon points="0,0 0,46 12,35 17,48 23,45 18,32 29,32" fill="#f8fafc" ` +
  `stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/></g>`;

/** YouTube Clickbait Red Arrow pointing to a target. */
export const clickbaitArrow = (x: number, y: number, angleDeg = 0, scale = 1): string =>
  `<g transform="translate(${x} ${y}) rotate(${angleDeg}) scale(${scale})">` +
  `<path d="M -80 -25 L 0 -25 L 0 -55 L 60 0 L 0 55 L 0 25 L -80 25 Z" ` +
  `fill="#ef4444" stroke="#991b1b" stroke-width="6" stroke-linejoin="round" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))"/>` +
  `<circle cx="-40" cy="0" r="10" fill="#fef2f2" opacity="0.8"/>` +
  `</g>`;

/** Red dashed focus circle highlighting an object. */
export const dottedCircle = (x: number, y: number, r: number, pulse = 0): string =>
  `<circle cx="${x}" cy="${y}" r="${(r * (1 + pulse * 0.1)).toFixed(1)}" fill="none" ` +
  `stroke="#ef4444" stroke-width="6" stroke-dasharray="14 10" stroke-linecap="round"/>`;

/** Video production camera on tripod with tally light. */
export const cameraRig = (x: number, y: number, scale = 1, recOn = true): string =>
  `<g transform="translate(${x} ${y}) scale(${scale})">` +
  `<line x1="0" y1="0" x2="-40" y2="120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>` +
  `<line x1="0" y1="0" x2="40" y2="120" stroke="#334155" stroke-width="6" stroke-linecap="round"/>` +
  `<line x1="0" y1="0" x2="0" y2="120" stroke="#475569" stroke-width="4"/>` +
  `<rect x="-45" y="-30" width="90" height="50" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>` +
  `<rect x="45" y="-20" width="30" height="30" rx="4" fill="#0f172a"/>` +
  `<rect x="-35" y="-55" width="40" height="25" rx="4" fill="#3b82f6" opacity="0.9"/>` +
  (recOn ? `<circle cx="-30" cy="-18" r="6" fill="#ef4444"/>` : ``) +
  `</g>`;

/** Heavy barbell on floor or lifted. */
export const barbell = (x: number, y: number, scale = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${scale})">` +
  `<line x1="-160" y1="0" x2="160" y2="0" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>` +
  `<rect x="-140" y="-50" width="20" height="100" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>` +
  `<rect x="-115" y="-45" width="16" height="90" rx="5" fill="#334155"/>` +
  `<rect x="120" y="-50" width="20" height="100" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>` +
  `<rect x="99" y="-45" width="16" height="90" rx="5" fill="#334155"/>` +
  `</g>`;

/** Crew silhouette with gear icon (cam, edit, thumb). */
export const crewSil = (x: number, y: number, s: number, gear: "cam" | "edit" | "thumb", t: number): string => {
  const bob = Math.sin(t * 2.2 + x * 0.01) * 4;
  const icon =
    gear === "cam"
      ? `<rect x="-58" y="-30" width="44" height="30" rx="5" fill="#0f172a"/>` +
        `<polygon points="-14,-26 -2,-15 -14,-4" fill="#0f172a"/>`
      : gear === "edit"
        ? `<rect x="-62" y="-34" width="52" height="10" rx="3" fill="#38bdf8"/>` +
          `<rect x="-62" y="-20" width="34" height="10" rx="3" fill="#f472b6"/>` +
          `<rect x="-62" y="-6" width="44" height="10" rx="3" fill="#a3e635"/>`
        : `<rect x="-60" y="-36" width="52" height="36" rx="5" fill="none" stroke="#f8fafc" stroke-width="4"/>` +
          `<polygon points="-40,-27 -40,-9 -24,-18" fill="#f8fafc"/>`;
  return `<g transform="translate(${x} ${(y + bob).toFixed(1)}) scale(${s})">` +
    `<ellipse cx="0" cy="52" rx="40" ry="8" fill="#0f172a" opacity="0.2"/>` +
    `<circle cx="0" cy="-58" r="24" fill="#273449"/>` +
    `<path d="M -19 -70 A 24 24 0 0 1 14 -78" fill="none" stroke="#7dd3fc" stroke-width="3.5" opacity="0.8"/>` +
    `<rect x="-30" y="-34" width="60" height="86" rx="18" fill="#1e293b"/>` +
    `<rect x="-30" y="-34" width="60" height="86" rx="18" fill="none" stroke="#334155" stroke-width="2"/>` +
    `<line x1="22" y1="-28" x2="22" y2="44" stroke="#7dd3fc" stroke-width="2.5" opacity="0.45"/>` +
    `<g transform="translate(64 10)">${icon}</g></g>`;
};

/** Verdict-stage backdrop: tribunal gravity with no words. */
export const verdictStage = (): string =>
  `<defs>` +
  `<linearGradient id="verdict-wall" x1="0" y1="0" x2="0" y2="1">` +
  `<stop offset="0" stop-color="#221a20"/><stop offset="0.7" stop-color="#141114"/><stop offset="1" stop-color="#0d0b0e"/>` +
  `</linearGradient>` +
  `<linearGradient id="verdict-floor" x1="0" y1="0" x2="0" y2="1">` +
  `<stop offset="0" stop-color="#1a1512"/><stop offset="0.25" stop-color="#0c0a09"/><stop offset="1" stop-color="#060505"/>` +
  `</linearGradient>` +
  `<radialGradient id="verdict-glow" cx="0.5" cy="0.5" r="0.5">` +
  `<stop offset="0" stop-color="#f59e0b" stop-opacity="0.5"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>` +
  `</radialGradient></defs>` +
  `<rect x="-4000" y="-4000" width="10000" height="10000" fill="url(#verdict-wall)"/>` +
  `<rect x="200" y="220" width="1520" height="520" fill="#241d19" stroke="#4a3226" stroke-width="10"/>` +
  `<rect x="200" y="220" width="1520" height="26" fill="#5a4232" opacity="0.8"/>` +
  `<rect x="260" y="280" width="1400" height="400" fill="none" stroke="#3a2f28" stroke-width="4"/>` +
  `<rect x="290" y="310" width="1340" height="340" fill="none" stroke="#2a2320" stroke-width="2"/>` +
  `<circle cx="480" cy="300" r="120" fill="url(#verdict-glow)"/>` +
  `<circle cx="1440" cy="300" r="120" fill="url(#verdict-glow)"/>` +
  `<circle cx="480" cy="300" r="22" fill="#fbbf24" stroke="#92400e" stroke-width="5"/>` +
  `<circle cx="1440" cy="300" r="22" fill="#fbbf24" stroke="#92400e" stroke-width="5"/>` +
  `<g transform="translate(1420, 620)">` +
  `<rect x="-220" y="-120" width="440" height="240" rx="12" fill="#4a3128" stroke="#1b0000" stroke-width="8"/>` +
  `<rect x="-220" y="-120" width="440" height="34" rx="12" fill="#5d4037" opacity="0.9"/>` +
  `<rect x="-60" y="-10" width="120" height="25" rx="4" fill="#6d4c41" stroke="#271406" stroke-width="4"/></g>` +
  `<rect x="-4000" y="740" width="10000" height="4000" fill="url(#verdict-floor)"/>` +
  `<line x1="-4000" y1="740" x2="6000" y2="740" stroke="#57534e" stroke-width="6"/>`;

/** Contrast panels: split screen comparison. */
export const contrastPanels = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-90" y="-60" width="90" height="120" rx="10" fill="#0f172a"/>` +
  `<rect x="0" y="-60" width="90" height="120" rx="10" fill="#f8fafc" stroke="#0f172a" stroke-width="5"/>` +
  `<line x1="0" y1="-60" x2="0" y2="60" stroke="#f59e0b" stroke-width="6"/></g>`;

/** Thumbnail frame mockup. */
export const thumbFrame = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-95" y="-62" width="190" height="124" rx="12" fill="#0f172a" stroke="#facc15" stroke-width="6"/>` +
  `<polygon points="-22,-30 -22,30 34,0" fill="#facc15"/></g>`;

/** Wordless thesis card (slate placard). */
export const card = (x: number, y: number, s: number, accent: string): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-90" y="-120" width="180" height="240" rx="14" fill="#0f172a"/>` +
  `<rect x="-90" y="-120" width="180" height="240" rx="14" fill="none" stroke="${accent}" stroke-width="6"/>` +
  `<rect x="-62" y="-70" width="124" height="16" rx="8" fill="${accent}" opacity="0.9"/>` +
  `<rect x="-62" y="-38" width="88" height="12" rx="6" fill="#475569"/>` +
  `<rect x="-62" y="-14" width="104" height="12" rx="6" fill="#475569"/>` +
  `<circle cx="0" cy="66" r="26" fill="none" stroke="${accent}" stroke-width="8"/></g>`;

/** Yellow commercial wringer bucket on caster wheels. */
export const mopBucket = (x: number, y: number, s = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<!-- Wheels -->` +
  `<circle cx="-32" cy="38" r="8" fill="#0f172a"/>` +
  `<circle cx="32" cy="38" r="8" fill="#0f172a"/>` +
  `<!-- Yellow Bucket Body -->` +
  `<path d="M -42 -20 L 42 -20 L 32 34 L -32 34 Z" fill="#eab308" stroke="#a16207" stroke-width="4"/>` +
  `<!-- Wringer Press Mechanism -->` +
  `<rect x="-36" y="-45" width="34" height="28" rx="4" fill="#ca8a04" stroke="#854d0e" stroke-width="3"/>` +
  `<line x1="-32" y1="-30" x2="-8" y2="-30" stroke="#713f12" stroke-width="4"/>` +
  `<line x1="-36" y1="-42" x2="-52" y2="-65" stroke="#475569" stroke-width="5" stroke-linecap="round"/>` +
  `<!-- Wet floor caution icon -->` +
  `<polygon points="8,-8 24,-8 16,12" fill="#713f12"/>` +
  `</g>`;

/** Comic thought bubble with bleach bottle and question mark. */
export const thoughtBubble = (x: number, y: number, s = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<!-- Cloud circles -->` +
  `<circle cx="-40" cy="0" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>` +
  `<circle cx="0" cy="-20" r="36" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>` +
  `<circle cx="40" cy="0" r="28" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>` +
  `<ellipse cx="0" cy="8" rx="55" ry="24" fill="#ffffff"/>` +
  `<!-- Tail trail circles -->` +
  `<circle cx="-30" cy="42" r="10" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>` +
  `<circle cx="-45" cy="62" r="6" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>` +
  `<!-- Spray bottle doodle -->` +
  `<rect x="-24" y="-18" width="22" height="34" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>` +
  `<path d="M -22 -18 L -14 -32 L -6 -32 L -14 -18 Z" fill="#0284c7"/>` +
  `<rect x="-18" y="-34" width="16" height="6" rx="2" fill="#e0f2fe"/>` +
  `<!-- Question mark -->` +
  `<text x="18" y="6" font-family="'Impact', sans-serif" font-size="34" fill="#ef4444" text-anchor="middle">?</text>` +
  `</g>`;

/** Comic speech bubble with text. */
export const speechBubble = (x: number, y: number, text: string, s = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-110" y="-45" width="220" height="60" rx="16" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>` +
  `<polygon points="-20,15 0,38 10,15" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>` +
  `<polygon points="-16,14 0,34 8,14" fill="#ffffff"/>` +
  `<text x="0" y="-8" font-family="'Impact', sans-serif" font-size="22" fill="#0f172a" text-anchor="middle">${text}</text>` +
  `</g>`;

/** Translucent bodybuilder ego ghost floating upward with tiny halo. */
export const egoGhost = (x: number, y: number, t: number): string => {
  const bob = Math.sin(t * 3) * 8;
  return `
    <g transform="translate(${x} ${(y + bob).toFixed(1)}) scale(1.1)" opacity="0.75">
      <!-- Golden Angel Halo -->
      <ellipse cx="0" cy="-70" rx="24" ry="7" fill="none" stroke="#facc15" stroke-width="4"/>
      <!-- Ghost body -->
      <path d="M -30 -40 C -30 -75 30 -75 30 -40 C 30 0 45 40 25 55 C 5 65 -5 45 -15 55 C -35 65 -30 20 -30 -40 Z"
            fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <!-- Sad deadpan eyes -->
      <circle cx="-10" cy="-35" r="4" fill="#64748b"/>
      <circle cx="10" cy="-35" r="4" fill="#64748b"/>
      <line x1="-8" y1="-20" x2="8" y2="-20" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      <!-- Tiny angel wings -->
      <path d="M -28 -30 Q -60 -50 -45 -15 Q -55 5 -26 0" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
      <path d="M 28 -30 Q 60 -50 45 -15 Q 55 5 26 0" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    </g>
  `;
};

/** Giant cartoon battleship anchor slamming into floor. */
export const battleshipAnchor = (x: number, y: number, s = 1, dropK = 1): string => {
  const anchorY = y + (1 - dropK) * -600;
  return `
    <g transform="translate(${x} ${anchorY.toFixed(1)}) scale(${s})">
      <!-- Heavy iron ring -->
      <circle cx="0" cy="-140" r="26" fill="none" stroke="#334155" stroke-width="14"/>
      <!-- Vertical iron shaft -->
      <line x1="0" y1="-120" x2="0" y2="70" stroke="#1e293b" stroke-width="24" stroke-linecap="round"/>
      <!-- Horizontal crossbar -->
      <line x1="-70" y1="-70" x2="70" y2="-70" stroke="#475569" stroke-width="16" stroke-linecap="round"/>
      <!-- Curved bottom flukes -->
      <path d="M -110 0 C -100 85 0 95 0 95 C 0 95 100 85 110 0" fill="none" stroke="#1e293b" stroke-width="26" stroke-linecap="round"/>
      <!-- Fluke arrowhead tips -->
      <polygon points="-125,-10 -95,-10 -110,25" fill="#0f172a"/>
      <polygon points="125,-10 95,-10 110,25" fill="#0f172a"/>
    </g>
  `;
};

/** Panic running gym bro with hands on head. */
export const runningGymBro = (x: number, y: number, t: number, dir = 1): string => {
  const legCycle = Math.sin(t * 14) * 35;
  const bob = Math.abs(Math.sin(t * 14)) * 12;
  return `
    <g transform="translate(${x.toFixed(1)} ${(y - bob).toFixed(1)}) scale(${dir * 1.15}, 1.15)">
      <!-- Head with panicked expression -->
      <circle cx="0" cy="-80" r="28" fill="#f8fafc" stroke="#0f172a" stroke-width="5"/>
      <ellipse cx="-8" cy="-84" rx="7" ry="9" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <ellipse cx="8" cy="-84" rx="7" ry="9" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <circle cx="-8" cy="-84" r="3" fill="#0f172a"/>
      <circle cx="8" cy="-84" r="3" fill="#0f172a"/>
      <ellipse cx="0" cy="-68" rx="8" ry="11" fill="#0f172a"/>
      <!-- Panicked hands clutching head -->
      <path d="M -10 -52 Q -38 -80 -18 -98" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <path d="M 10 -52 Q 38 -80 18 -98" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <!-- Torso running forward -->
      <line x1="0" y1="-52" x2="10" y2="10" stroke="#0f172a" stroke-width="7"/>
      <!-- Tank top -->
      <path d="M -8 -50 L 12 -50 L 16 10 L -6 10 Z" fill="#2563eb" stroke="#1d4ed8" stroke-width="3"/>
      <!-- Scissoring running legs -->
      <line x1="10" y1="10" x2="${(10 + legCycle).toFixed(1)}" y2="65" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <line x1="10" y1="10" x2="${(10 - legCycle).toFixed(1)}" y2="65" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    </g>
  `;
};

/** Dr. Mike Israetel caricature with muscular build and biomechanics vectors. */
export const drMikeCaricature = (x: number, y: number, t: number): string =>
  `<g transform="translate(${x} ${y}) scale(1.35)">` +
  `<!-- Thick muscular bald head -->` +
  `<circle cx="0" cy="-82" r="32" fill="#f8fafc" stroke="#0f172a" stroke-width="6"/>` +
  `<!-- Beard and goatee -->` +
  `<path d="M -24 -75 C -26 -50 0 -46 0 -46 C 0 -46 26 -50 24 -75 C 16 -54 -16 -54 -24 -75 Z" fill="#18181b"/>` +
  `<!-- Expressive raised eyebrow -->` +
  `<line x1="-18" y1="-98" x2="-6" y2="-94" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>` +
  `<line x1="6" y1="-94" x2="20" y2="-102" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>` +
  `<!-- Eyes looking skeptical -->` +
  `<circle cx="-10" cy="-84" r="5" fill="#0f172a"/>` +
  `<circle cx="12" cy="-84" r="5" fill="#0f172a"/>` +
  `<!-- Talking mouth -->` +
  `<ellipse cx="0" cy="-60" rx="8" ry="4" fill="#0f172a"/>` +
  `<!-- Muscular neck and black RP polo -->` +
  `<path d="M -32 -48 L 32 -48 L 38 15 L -38 15 Z" fill="#18181b" stroke="#0f172a" stroke-width="5"/>` +
  `<polygon points="-12,-48 0,-25 12,-48" fill="#e4e4e7"/>` +
  `<!-- Massive deltoid arms -->` +
  `<line x1="-34" y1="-42" x2="-58" y2="-10" stroke="#0f172a" stroke-width="10" stroke-linecap="round"/>` +
  `<line x1="-58" y1="-10" x2="-35" y2="-30" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>` +
  `<line x1="34" y1="-42" x2="65" y2="-30" stroke="#0f172a" stroke-width="10" stroke-linecap="round"/>` +
  `<!-- Pointing red biomechanics moment-arm arrow -->` +
  `<g transform="translate(75, -35)">` +
  `<line x1="0" y1="0" x2="70" y2="-20" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>` +
  `<polygon points="70,-20 50,-32 55,-10" fill="#ef4444"/>` +
  `<text x="40" y="-30" font-family="monospace" font-size="12" font-weight="bold" fill="#ef4444">d = 14cm</text>` +
  `</g>` +
  `<!-- Torso line to hips -->` +
  `<line x1="0" y1="15" x2="0" y2="70" stroke="#0f172a" stroke-width="8"/>` +
  `</g>`;

/** Dark room at 2:00 AM: Degenerate internet detective with pixel grid and caliper. */
export const bedroom2AM = (x: number, y: number, t: number): string =>
  `<g transform="translate(${x} ${y})">` +
  `<!-- Dark room background overlay -->` +
  `<rect x="-960" y="-540" width="1920" height="1080" fill="#09090b" opacity="0.94"/>` +
  `<!-- Glowing blue computer monitor on desk -->` +
  `<rect x="-140" y="-120" width="280" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="6"/>` +
  `<rect x="-120" y="-105" width="240" height="160" fill="#0284c7" opacity="0.3"/>` +
  `<!-- Stand -->` +
  `<rect x="-20" y="70" width="40" height="45" fill="#334155"/>` +
  `<rect x="-60" y="115" width="120" height="15" rx="4" fill="#1e293b"/>` +
  `<!-- Blurry 480p pixelated weight plate on screen -->` +
  `<circle cx="0" cy="-25" r="55" fill="#0f172a" stroke="#38bdf8" stroke-width="4" stroke-dasharray="10 8"/>` +
  `<!-- Pixel grid lines -->` +
  `<line x1="-55" y1="-25" x2="55" y2="-25" stroke="#f43f5e" stroke-width="2"/>` +
  `<line x1="0" y1="-80" x2="0" y2="30" stroke="#f43f5e" stroke-width="2"/>` +
  `<!-- Digital Caliper measuring the plate -->` +
  `<g transform="translate(0, -25)">` +
  `<line x1="-75" y1="-50" x2="75" y2="-50" stroke="#cbd5e1" stroke-width="6"/>` +
  `<line x1="-55" y1="-58" x2="-55" y2="10" stroke="#94a3b8" stroke-width="4"/>` +
  `<line x1="55" y1="-58" x2="55" y2="10" stroke="#94a3b8" stroke-width="4"/>` +
  `<rect x="-25" y="-62" width="50" height="18" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="2"/>` +
  `<text x="0" y="-50" font-family="monospace" font-size="10" fill="#22c55e" text-anchor="middle">449.8mm</text>` +
  `</g>` +
  `<!-- Digital clock on desk showing 2:03 AM in glowing red -->` +
  `<g transform="translate(240, 80)">` +
  `<rect x="-50" y="-20" width="100" height="40" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="3"/>` +
  `<text x="0" y="8" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#ef4444" text-anchor="middle">02:03</text>` +
  `</g>` +
  `</g>`;

/** Door opened to vibrant green grass and sunshine. */
export const greenGrassDoor = (x: number, y: number, openK = 1): string =>
  `<g transform="translate(${x} ${y})">` +
  `<!-- Door Frame -->` +
  `<rect x="-140" y="-260" width="280" height="520" fill="#0f172a" stroke="#334155" stroke-width="8"/>` +
  `<!-- Outdoor Sunshine & Sky -->` +
  `<rect x="-130" y="-250" width="260" height="500" fill="#38bdf8"/>` +
  `<circle cx="60" cy="-180" r="50" fill="#facc15" filter="drop-shadow(0 0 20px #fef08a)"/>` +
  `<!-- Vibrant Green Rolling Grass -->` +
  `<path d="M -130 120 Q -40 80 50 110 Q 110 130 130 115 L 130 250 L -130 250 Z" fill="#22c55e"/>` +
  `<path d="M -130 160 Q 20 130 130 170 L 130 250 L -130 250 Z" fill="#16a34a"/>` +
  `<!-- Opened Door Panel swinging outward -->` +
  `<g transform="scale(${Math.cos(openK * 1.3).toFixed(3)}, 1)">` +
  `<rect x="-130" y="-250" width="260" height="500" fill="#78716c" stroke="#44403c" stroke-width="6"/>` +
  `<circle cx="100" cy="0" r="8" fill="#ca8a04"/>` +
  `</g>` +
  `</g>`;
