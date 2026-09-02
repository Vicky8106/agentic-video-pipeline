/**
 * Audio amplitude envelope.
 *
 * The previous lip-sync was `Math.sin(timeSec * 16)`: one fixed frequency,
 * unrelated to the recording, so every character mouth-flapped like a metronome
 * whether they were speaking or not. This loads a real amplitude curve derived
 * from the MP3 and samples it by time.
 */

export interface Envelope {
  /** Seconds per bucket. */
  hop: number;
  /** Normalised 0..1 RMS per bucket. */
  values: number[];
  sampleRate: number;
}

/** Linear-interpolated amplitude at time t. Pure function of t. */
export function amplitudeAt(env: Envelope, t: number): number {
  if (t < 0) return 0;
  const idx = t / env.hop;
  const i = Math.floor(idx);
  if (i >= env.values.length - 1) return env.values[env.values.length - 1] ?? 0;
  const f = idx - i;
  return env.values[i] * (1 - f) + env.values[i + 1] * f;
}

/**
 * Smoothed, speech-gated openness in 0..1.
 *
 * A raw RMS curve makes the mouth twitch on breath noise. We take a floor of
 * silence, apply a soft knee, and gate on voicing so the mouth closes cleanly
 * between words.
 */
export function mouthOpenAt(
  env: Envelope,
  t: number,
  opts: { gain?: number; noiseFloor?: number; smoothing?: number } = {},
): number {
  const gain = opts.gain ?? 1.6;
  const floor = opts.noiseFloor ?? 0.045;
  const smooth = opts.smoothing ?? 0.035;

  const sample = (x: number): number => {
    const a = amplitudeAt(env, x);
    return Math.max(0, (a - floor) / Math.max(0.001, 1 - floor));
  };

  let sum = 0;
  let n = 0;
  for (let k = -2; k <= 2; k++) {
    sum += sample(t + (k * smooth) / 2);
    n++;
  }
  const avg = Math.max(0, sum / n);
  // Soft knee: quiet speech still closes the mouth, loud speech saturates open.
  const shaped = avg * avg * (3 - 2 * avg);
  return Math.max(0, Math.min(1, shaped * gain));
}

/** True when the speaker is voicing at t, for gating bob and subtitle highlight. */
export function isSpeakingAt(env: Envelope, t: number, threshold = 0.06): boolean {
  return amplitudeAt(env, t) > threshold;
}

/**
 * Deterministic blink schedule.
 *
 * The old code used `(timeSec % 3.4) > 3.22`, which blinks on a perfect clock
 * with no eyelid ramp. This produces irregular, human-looking blinks that are
 * still a pure function of time, so chunked and parallel renders agree.
 */
export interface BlinkPlan {
  /** Blink start times. */
  starts: number[];
  /** Seconds from start to fully closed. */
  close: number;
  /** Seconds held closed. */
  hold: number;
  /** Seconds to reopen. */
  open: number;
}

/** Small deterministic PRNG (mulberry32) so blink timing is reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildBlinkPlan(seed: number, duration: number): BlinkPlan {
  const rnd = mulberry32(Math.floor(seed * 1e9) || 1);
  const starts: number[] = [];
  let t = 0.8 + rnd() * 2.2;
  while (t < duration) {
    starts.push(t);
    // Occasional double blink: ~18% of blinks are followed by a short second.
    if (rnd() < 0.18) t += 0.32;
    else t += 1.6 + rnd() * 4.8;
  }
  return { starts, close: 0.055, hold: 0.035, open: 0.09 };
}

/** Eyelid closure at t: 0 open, 1 shut, with a ramp rather than a boolean. */
export function blinkAmountAt(plan: BlinkPlan, t: number): number {
  const total = plan.close + plan.hold + plan.open;
  for (const s of plan.starts) {
    if (t < s || t > s + total) continue;
    const local = t - s;
    if (local < plan.close) return local / plan.close;
    if (local < plan.close + plan.hold) return 1;
    return 1 - (local - plan.close - plan.hold) / plan.open;
  }
  return 0;
}
