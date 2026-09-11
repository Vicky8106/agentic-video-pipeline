/**
 * Shared cast + stagecraft for the Anatoly finale (853.46–973.57s).
 * Catalog rigs as raw material; every staging choice lives in the scenes.
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

/** The narrator-host (continuity with the pigeon short). */
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

/** The enormous bodybuilder. */
export const builder = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("bodybuilder", {
    ...base, timeSec: t, x, y, scale: 1.5, gender: "male",
    hairStyle: "male_bodybuilder_bald", clothes: "bodybuilder_tank",
    expression: "smug_rock_eyebrow",
    ...extra,
  });

/** Suit commentator (thesis beats). */
export const suit = (x: number, y: number, t: number, extra: Record<string, unknown> = {}): string =>
  fig("suit", {
    ...base, timeSec: t, x, y, scale: 1.15, gender: "male",
    hairStyle: "male_short", clothes: "suit", expression: "skeptical_side_eye",
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

/** Giant click cursor (bespoke — the catalog has no pointer). */
export const cursor = (x: number, y: number, s: number, press = 0): string =>
  `<g transform="translate(${x} ${y}) scale(${(s * (1 - press * 0.15)).toFixed(3)})">` +
  `<polygon points="0,0 0,46 12,35 17,48 23,45 18,32 29,32" fill="#f8fafc" ` +
  `stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/></g>`;

/**
 * Paranoia-montage crew silhouette: dark figure + trade icon.
 * gear: cam (viewfinder) | edit (timeline bars) | thumb (frame+play).
 */
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

/**
 * Verdict-stage backdrop: tribunal gravity with no words. The catalog
 * tribunal ships a baked-in "TIKTOK TRIBUNAL" sign and the office a
 * "PIVOT ROADMAP" whiteboard — words this script never says — so directed
 * scenes paint their own room here.
 */
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

/**
 * Contrast panels (bespoke — the catalog GRID ships a "FACIAL SYMMETRY"
 * caption, words this script never says). Two halves, one divide.
 */
export const contrastPanels = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-90" y="-60" width="90" height="120" rx="10" fill="#0f172a"/>` +
  `<rect x="0" y="-60" width="90" height="120" rx="10" fill="#f8fafc" stroke="#0f172a" stroke-width="5"/>` +
  `<line x1="0" y1="-60" x2="0" y2="60" stroke="#f59e0b" stroke-width="6"/></g>`;

/**
 * Thumbnail frame (bespoke — same reason). Frame + play wedge, no caption.
 */
export const thumbFrame = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-95" y="-62" width="190" height="124" rx="12" fill="#0f172a" stroke="#facc15" stroke-width="6"/>` +
  `<polygon points="-22,-30 -22,30 34,0" fill="#facc15"/></g>`;

/** Wordless thesis card (slate placard — never text). */
export const card = (x: number, y: number, s: number, accent: string): string =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<rect x="-90" y="-120" width="180" height="240" rx="14" fill="#0f172a"/>` +
  `<rect x="-90" y="-120" width="180" height="240" rx="14" fill="none" stroke="${accent}" stroke-width="6"/>` +
  `<rect x="-62" y="-70" width="124" height="16" rx="8" fill="${accent}" opacity="0.9"/>` +
  `<rect x="-62" y="-38" width="88" height="12" rx="6" fill="#475569"/>` +
  `<rect x="-62" y="-14" width="104" height="12" rx="6" fill="#475569"/>` +
  `<circle cx="0" cy="66" r="26" fill="none" stroke="${accent}" stroke-width="8"/></g>`;
