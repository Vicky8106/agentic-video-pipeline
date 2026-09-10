/**
 * Audio service: voice file in, duration + amplitude envelope out.
 *
 * The envelope is the voice's ground truth. The renderer uses it for
 * lip-sync truth (mouth opens when the voice speaks, closes in pauses)
 * and for emphasis shakes on loud peaks — so camera energy follows the
 * performance without anyone marking punch words by hand.
 */
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export interface AudioEnvelope {
  hop: number;
  values: number[];
  duration: number;
}

export function probeDuration(audioPath: string): number {
  const out = execFileSync(
    "ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audioPath],
    { encoding: "utf8" },
  ).trim();
  const d = Number(out);
  if (!Number.isFinite(d) || d <= 0) throw new Error(`Could not probe duration: ${audioPath}`);
  return d;
}

/** Decode to 16kHz mono PCM and take per-hop RMS, normalized to peak. */
export function buildEnvelope(audioPath: string, hopMs = 20): AudioEnvelope {
  const hop = hopMs / 1000;
  const sampleRate = 16000;
  const tmp = path.join(os.tmpdir(), `auto-env-${process.pid}.pcm`);
  try {
    const dec = spawnSync("/usr/bin/ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", audioPath,
      "-f", "s16le", "-ac", "1", "-ar", String(sampleRate),
      tmp,
    ]);
    if (dec.status !== 0) throw new Error(`ffmpeg decode failed for ${audioPath}`);
    const pcm = fs.readFileSync(tmp);
    const samples = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 2));
    const win = Math.max(1, Math.round(sampleRate * hop));
    const values: number[] = [];
    let peak = 1e-6;
    for (let i = 0; i + win <= samples.length; i += win) {
      let sum = 0;
      for (let j = 0; j < win; j++) {
        const v = samples[i + j] / 32768;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / win);
      values.push(rms);
      if (rms > peak) peak = rms;
    }
    const norm = values.map((v) => Number(Math.min(1, v / peak).toFixed(4)));
    return { hop, values: norm, duration: norm.length * hop };
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/**
 * Loud local maxima above `threshold`, at least `minGap` apart.
 * Pure: same envelope, same peaks.
 */
export function findPeaks(env: AudioEnvelope, threshold = 0.55, minGap = 2.0): number[] {
  const peaks: number[] = [];
  let last = -Infinity;
  for (let i = 1; i < env.values.length - 1; i++) {
    const v = env.values[i];
    if (v > threshold && v >= env.values[i - 1] && v > env.values[i + 1]) {
      const t = i * env.hop;
      if (t - last >= minGap) {
        peaks.push(t);
        last = t;
      }
    }
  }
  return peaks;
}
