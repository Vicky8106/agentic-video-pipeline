import { parseSrt, SubtitleItem } from "../subtitles/SrtParser.js";

export interface ScriptBeat {
  beatIndex: number;
  startSec: number;
  endSec: number;
  duration: number;
  text: string;
  subtitleItems: SubtitleItem[];
}

export function segmentScriptIntoBeats(srtContent: string, targetDurationSec = 8.0): ScriptBeat[] {
  const items = parseSrt(srtContent);
  if (items.length === 0) return [];

  const beats: ScriptBeat[] = [];
  let currentItems: SubtitleItem[] = [];
  let currentStart = items[0].start;
  let beatIndex = 1;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    currentItems.push(item);
    const accumulatedDuration = item.end - currentStart;

    const isLast = i === items.length - 1;
    const isTargetDurationReached = accumulatedDuration >= targetDurationSec - 1.5;
    const endsWithPunctuation = /[.!?]$/.test(item.text.trim());

    if (isLast || (isTargetDurationReached && endsWithPunctuation) || accumulatedDuration >= 14.0) {
      const text = currentItems.map((it) => it.text).join(" ").replace(/\s+/g, " ").trim();
      beats.push({
        beatIndex,
        startSec: Number(currentStart.toFixed(2)),
        endSec: Number(item.end.toFixed(2)),
        duration: Number((item.end - currentStart).toFixed(2)),
        text,
        subtitleItems: [...currentItems],
      });
      beatIndex++;
      currentItems = [];
      if (!isLast) {
        currentStart = items[i + 1].start;
      }
    }
  }

  // Ensure strict continuity (no micro-gaps between beats)
  for (let i = 0; i < beats.length - 1; i++) {
    if (beats[i].endSec !== beats[i + 1].startSec) {
      const mid = Number(((beats[i].endSec + beats[i + 1].startSec) / 2).toFixed(2));
      beats[i].endSec = mid;
      beats[i + 1].startSec = mid;
      beats[i].duration = Number((beats[i].endSec - beats[i].startSec).toFixed(2));
      beats[i + 1].duration = Number((beats[i + 1].endSec - beats[i + 1].startSec).toFixed(2));
    }
  }

  return beats;
}
