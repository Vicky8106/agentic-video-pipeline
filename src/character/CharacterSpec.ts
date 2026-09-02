/**
 * Parametric character model.
 *
 * Characters are described by numbers, not by hand-tuned SVG paths. That is
 * what makes the things this pipeline needs possible at all:
 *
 *   - body morphing (fat -> lean) is `mixBody(a, b, k)` over time
 *   - a reference image becomes a character by *fitting these numbers*, not by
 *     tracing pixels (a traced photo has no joints, so it cannot act)
 *   - every rig shares one skeleton solver, so a new character inherits all the
 *     acting instead of re-drawing it
 */

export interface BodyShape {
  /** Overall figure height in design units. */
  height: number;
  headSize: number;
  /** Half-width between the shoulder joints. Arms attach here, not at the spine. */
  shoulderWidth: number;
  neckLen: number;
  torsoLen: number;
  chestWidth: number;
  /** The primary fat/lean axis. */
  waistWidth: number;
  hipWidth: number;
  /** Forward belly protrusion. */
  belly: number;
  armLen: number;
  foreArmLen: number;
  thighLen: number;
  shinLen: number;
  limbThickness: number;
  /** Facial softness: cheeks and jaw. */
  cheekFullness: number;
  jawWidth: number;
  hairVolume: number;
  /** Eye separation and size, as fractions of head size. */
  eyeSpacing: number;
  eyeSize: number;
}

export interface Palette {
  line: string;
  skin: string;
  skinShadow: string;
  hair: string;
  hairHighlight: string;
  eyes: string;
  mouth: string;
  tongue: string;
  clothing: string;
  clothingDark: string;
  accent: string;
}

export type HairStyle = "short_swoop" | "long_wave" | "bob" | "buzz" | "bun" | "mohawk" | "bald";

export interface CharacterSpec {
  id: string;
  displayName: string;
  body: BodyShape;
  palette: Palette;
  hair: HairStyle;
  /** Costume id resolved by the rig, or "none". */
  costume: string;
  /** Per-character timing offset so a crowd does not breathe in unison. */
  phaseSeed: number;
  notes?: string;
}

/** A neutral, well-proportioned baseline the other presets are variations of. */
export const BASE_BODY: BodyShape = {
  height: 520,
  headSize: 1.0,
  shoulderWidth: 46,
  neckLen: 16,
  torsoLen: 150,
  chestWidth: 58,
  waistWidth: 44,
  hipWidth: 52,
  belly: 0,
  armLen: 78,
  foreArmLen: 78,
  thighLen: 85,
  shinLen: 85,
  limbThickness: 8,
  cheekFullness: 0.5,
  jawWidth: 0.85,
  hairVolume: 1.0,
  eyeSpacing: 1.0,
  eyeSize: 1.0,
};

export const BASE_PALETTE: Palette = {
  line: "#111111",
  skin: "#fed89b",
  skinShadow: "#e8b877",
  hair: "#0d0d0d",
  hairHighlight: "#2a2a2a",
  eyes: "#ffffff",
  mouth: "#2b0a0a",
  tongue: "#ef4444",
  clothing: "#1a365d",
  clothingDark: "#0f172a",
  accent: "#eab308",
};

const withBody = (over: Partial<BodyShape>): BodyShape => ({ ...BASE_BODY, ...over });

/**
 * Body presets spanning the lean/heavy axis. These are the endpoints a morph
 * interpolates between; the numbers are deliberately smooth so any k in [0,1]
 * yields a plausible intermediate rather than popping between two looks.
 */
export const BODY_PRESETS: Record<string, BodyShape> = {
  lean: withBody({
    shoulderWidth: 44, waistWidth: 30, hipWidth: 44, belly: -4,
    chestWidth: 50, cheekFullness: 0.22, jawWidth: 0.72, limbThickness: 7,
  }),
  average: withBody({}),
  heavy: withBody({
    shoulderWidth: 58, waistWidth: 74, hipWidth: 74, belly: 26,
    chestWidth: 74, cheekFullness: 0.85, jawWidth: 1.05, limbThickness: 11,
    armLen: 74, foreArmLen: 74, thighLen: 80, shinLen: 80,
  }),
  /** The satirical "snatched" silhouette the script is actually about. */
  hourglass: withBody({
    shoulderWidth: 52, waistWidth: 26, hipWidth: 70, belly: -2,
    chestWidth: 62, cheekFullness: 0.3, jawWidth: 0.68,
  }),
  gaunt: withBody({
    shoulderWidth: 40, waistWidth: 24, hipWidth: 38, belly: -8,
    chestWidth: 44, cheekFullness: 0.1, jawWidth: 0.62, limbThickness: 6,
  }),
};

const BODY_FIELDS = Object.keys(BASE_BODY) as (keyof BodyShape)[];

/** Interpolate two body shapes. This *is* the fat/lean morph. */
export function mixBody(a: BodyShape, b: BodyShape, k: number): BodyShape {
  const out = { ...a } as Record<string, number>;
  for (const f of BODY_FIELDS) {
    out[f] = a[f] + (b[f] - a[f]) * k;
  }
  return out as unknown as BodyShape;
}

/** Morph a body through a timed sequence of presets. Pure function of t. */
export interface BodyKey {
  t: number;
  body: BodyShape;
  /** Seconds spent morphing into this key from the previous one. */
  over?: number;
}

export function sampleBody(keys: readonly BodyKey[], t: number): BodyShape {
  if (keys.length === 0) return BASE_BODY;
  if (t <= keys[0].t) return keys[0].body;
  const last = keys[keys.length - 1];
  if (t >= last.t) return last.body;

  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].t <= t) i++;
  const prev = keys[i];
  const cur = keys[i + 1];
  if (!cur) return prev.body;
  const over = cur.over ?? Math.max(0.001, cur.t - prev.t);
  const k = Math.min(1, Math.max(0, (t - prev.t) / over));
  // Smoothstep so a morph eases in and out instead of running at constant speed.
  const e = k * k * (3 - 2 * k);
  return mixBody(prev.body, cur.body, e);
}

export function mixPalette(a: Palette, b: Palette, k: number): Palette {
  const hex = (h: string): [number, number, number] => {
    const s = h.replace("#", "");
    const v = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
    const n = parseInt(v, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const mix = (x: string, y: string): string => {
    const p = hex(x);
    const q = hex(y);
    const r = p.map((c, i) => Math.round(c + (q[i] - c) * k));
    return `#${r.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  };
  const out = { ...a } as Record<string, string>;
  for (const key of Object.keys(a) as (keyof Palette)[]) out[key] = mix(a[key], b[key]);
  return out as unknown as Palette;
}

/** Deterministic 0..1 hash, used for per-character phase offsets. */
export function hashSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function makeSpec(id: string, displayName: string, over: Partial<CharacterSpec> = {}): CharacterSpec {
  return {
    id,
    displayName,
    body: { ...BASE_BODY },
    palette: { ...BASE_PALETTE },
    hair: "short_swoop",
    costume: "none",
    phaseSeed: hashSeed(id),
    ...over,
  };
}
