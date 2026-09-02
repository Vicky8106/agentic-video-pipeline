/**
 * Easing curves. Every curve maps normalized time u in [0,1] to progress.
 * Pure functions of time: nothing here holds state, which is what lets the
 * renderer sample any frame independently of every other one.
 */

export type EaseFn = (u: number) => number;

const clamp01 = (u: number): number => (u < 0 ? 0 : u > 1 ? 1 : u);

export const linear: EaseFn = (u) => clamp01(u);

export const quadIn: EaseFn = (u) => { const x = clamp01(u); return x * x; };
export const quadOut: EaseFn = (u) => { const x = clamp01(u); return 1 - (1 - x) * (1 - x); };
export const quadInOut: EaseFn = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const cubicIn: EaseFn = (u) => { const x = clamp01(u); return x * x * x; };
export const cubicOut: EaseFn = (u) => { const x = clamp01(u); return 1 - Math.pow(1 - x, 3); };
export const cubicInOut: EaseFn = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const quartOut: EaseFn = (u) => { const x = clamp01(u); return 1 - Math.pow(1 - x, 4); };
export const quintOut: EaseFn = (u) => { const x = clamp01(u); return 1 - Math.pow(1 - x, 5); };

export const sineInOut: EaseFn = (u) => {
  const x = clamp01(u);
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

/** Explosive start, gentle arrival. The default for comedic punch-ins. */
export const expoOut: EaseFn = (u) => {
  const x = clamp01(u);
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const expoIn: EaseFn = (u) => {
  const x = clamp01(u);
  return x <= 0 ? 0 : Math.pow(2, 10 * x - 10);
};

const BACK_C1 = 1.70158;
const BACK_C2 = BACK_C1 * 1.525;
const BACK_C3 = BACK_C1 + 1;

/** Lands past the target and settles back: reads as kinetic, mechanical snap. */
export const backOut: EaseFn = (u) => {
  const x = clamp01(u) - 1;
  return 1 + BACK_C3 * x * x * x + BACK_C1 * x * x;
};

/** Pulls against the direction of travel before committing: anticipation. */
export const backIn: EaseFn = (u) => {
  const x = clamp01(u);
  return BACK_C2 * x * x * x - BACK_C1 * x * x;
};

export const backInOut: EaseFn = (u) => {
  const x = clamp01(u) * 2;
  return x < 1
    ? x * x * ((BACK_C1 + 1) * x - BACK_C1) * 0.5
    : ((x - 2) * (x - 2) * ((BACK_C1 + 1) * (x - 2) + BACK_C1) + 2) * 0.5;
};

/** Oscillating settle, for a prop that lands and wobbles. */
export const elasticOut: EaseFn = (u) => {
  const x = clamp01(u);
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const period = 0.3;
  const s = period / 4;
  return Math.pow(2, -10 * x) * Math.sin(((x - s) * (2 * Math.PI)) / period) + 1;
};

/** Anticipation then commit: the first ~22% moves backwards. */
export const anticipate: EaseFn = (u) => {
  const x = clamp01(u);
  const dip = 0.22;
  if (x < dip) return -(x / dip) * 0.12 * (1 - x / dip);
  return cubicOut((x - dip) / (1 - dip));
};

export const EASINGS: Readonly<Record<string, EaseFn>> = Object.freeze({
  linear, quadIn, quadOut, quadInOut,
  cubicIn, cubicOut, cubicInOut,
  quartOut, quintOut, sineInOut,
  expoIn, expoOut,
  backIn, backOut, backInOut,
  elasticOut, anticipate,
});

export type EaseName = keyof typeof EASINGS;

/** Resolve an ease by name, falling back to cubicInOut for unknown names. */
export function resolveEase(name: EaseName | EaseFn | undefined): EaseFn {
  if (typeof name === "function") return name;
  if (name && Object.prototype.hasOwnProperty.call(EASINGS, name)) return EASINGS[name];
  return cubicInOut;
}

/** Frame-rate independent exponential approach, as a pure function of elapsed time. */
export function approach(start: number, end: number, halfLife: number, elapsed: number): number {
  if (halfLife <= 0) return end;
  const k = 1 - Math.pow(0.5, Math.max(0, elapsed) / halfLife);
  return start + (end - start) * k;
}
