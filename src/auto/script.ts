/**
 * Script service (action-agnostic): any script text in, timed SRT cues out.
 *
 * - `.srt` files are parsed as-is (voice timing is the ground truth).
 * - `.txt`/`.md` files are treated as plain narration: sentences share the
 *   audio duration proportionally to word weight, so no per-video timing
 *   work is ever needed.
 */
import fs from "node:fs";
import { parseSrt, type SubtitleItem } from "../subtitles/SrtParser.js";

function sentenceWeight(sentence: string): number {
  const words = sentence.split(/\s+/).filter(Boolean);
  let w = 0;
  for (const surf of words) {
    const core = surf.replace(/[^\p{L}\p{N}']/gu, "");
    w += Math.max(1, core.length) * 0.062;
    if (/[,.]$/.test(surf)) w += 0.11;
    if (/[!?]$/.test(surf)) w += 0.19;
  }
  return Math.max(0.2, w);
}

function splitSentences(text: string): string[] {
  const clean = text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const hits = clean.match(/[^.!?]+[.!?]+["']?|\S[^.!?]*$/g) ?? [];
  return hits.map((s) => s.trim()).filter((s) => s.length > 0);
}

/** Distribute `duration` across sentences by word weight. Pure. */
export function synthesizeCues(text: string, duration: number): SubtitleItem[] {
  const sentences = splitSentences(text);
  if (sentences.length === 0) throw new Error("Script contains no sentences");
  const weights = sentences.map(sentenceWeight);
  const total = weights.reduce((a, b) => a + b, 0);
  const cues: SubtitleItem[] = [];
  let cursor = 0;
  sentences.forEach((sentence, i) => {
    const span = Math.max(0.4, (weights[i] / total) * duration);
    const start = cursor;
    const end = i === sentences.length - 1 ? duration : cursor + span;
    cursor = end;
    cues.push({
      id: i + 1,
      start,
      end,
      text: sentence,
      cleanText: sentence,
      words: sentence.split(" ").filter((w) => w.length > 0),
    });
  });
  return cues;
}

/** Load a script file. Plain text needs the audio duration for timing. */
export function loadScript(scriptPath: string, audioDuration: number): SubtitleItem[] {
  if (!fs.existsSync(scriptPath)) throw new Error(`Script not found: ${scriptPath}`);
  const raw = fs.readFileSync(scriptPath, "utf8");
  if (/\.(srt)$/i.test(scriptPath)) {
    const cues = parseSrt(raw);
    if (cues.length === 0) throw new Error(`No cues parsed from ${scriptPath}`);
    return cues;
  }
  if (!(audioDuration > 0)) {
    throw new Error("Plain-text scripts need a valid audio file to derive timing");
  }
  return synthesizeCues(raw, audioDuration);
}
