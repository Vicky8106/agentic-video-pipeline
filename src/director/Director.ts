/**
 * Auto-director: transcript in, shot list and beat events out.
 *
 * This is what makes the SRT the single source of truth. Instead of a human
 * hand-placing camera keyframes per scene, the director reads words and their
 * timings and derives comedic grammar from them:
 *
 *   - escalation: a joke builds through progressively tighter framing
 *   - punch-ins land *on* the trigger word, never before it
 *   - a hold after the punchline, then a host reaction cut
 *   - minimum shot length so cuts never strobe
 *   - screen-side alternation so successive subjects do not stack
 *
 * Deterministic: the same transcript yields the same plan, byte for byte.
 */

import { Shot, compileShots, enforceMinShotLength, ResolvedShot } from "../camera/CameraTrack";
import { Transcript, Word, Sentence } from "../subtitles/Transcript";
import { Vec } from "../anim/Track";

export type BeatKind =
  | "entrance" | "exit" | "expression" | "morph" | "fx" | "prop" | "flash" | "shake";

export interface BeatEvent {
  t: number;
  kind: BeatKind;
  target?: string;
  duration?: number;
  payload: Record<string, unknown>;
  /** Which word triggered it, for audit. */
  reason?: string;
}

export interface ScenePlan {
  index: number;
  start: number;
  end: number;
  sentences: number[];
  label: string;
}

export interface DirectionPlan {
  shots: Shot[];
  resolved: ResolvedShot[];
  events: BeatEvent[];
  scenes: ScenePlan[];
  duration: number;
  anchors: Record<string, Vec>;
}

/** Framing presets on the 1920x1080 design canvas. */
export const FRAMING = {
  wide:         { center: [960, 540] as Vec, zoom: 1.02 },
  hostLeft:     { center: [560, 560] as Vec, zoom: 1.34 },
  hostCenter:   { center: [960, 560] as Vec, zoom: 1.30 },
  subjectRight: { center: [1420, 540] as Vec, zoom: 1.48 },
  subjectLeft:  { center: [520, 540] as Vec, zoom: 1.48 },
  macroRight:   { center: [1480, 500] as Vec, zoom: 1.94 },
  macroLeft:    { center: [460, 500] as Vec, zoom: 1.94 },
  reaction:     { center: [620, 545] as Vec, zoom: 1.42 },
} as const;

/** The comedy vocabulary the director scans for. Data, not code. */
export interface DirectorLexicon {
  names: readonly string[];
  comparisons: readonly string[];
  simile: readonly string[];
  reactionTriggers: readonly string[];
  units: readonly string[];
}

export const DEFAULT_LEXICON: DirectorLexicon = {
  names: [
    "Jenna", "Ortega", "Emma", "Stone", "Ariana", "Grande", "Kate", "Moss",
    "Tim", "Burton", "Wednesday", "Addams", "Mary", "Poppins", "Marvel",
    "Hollywood", "Instagram", "TikTok", "Ozempic", "Zapruder",
  ],
  comparisons: [
    "leaner", "thinner", "skinnier", "bigger", "smaller", "tighter", "snatched",
    "contoured", "filled", "reversed", "younger", "better", "worse", "flat",
  ],
  simile: ["like", "as", "faster", "slower", "than", "kinda", "basically", "imagine"],
  reactionTriggers: [
    "honestly", "literally", "obviously", "apparently", "technically",
    "great", "awesome", "meanwhile", "anyway",
  ],
  units: ["$", "percent", "%", "mm", "cm", "lbs", "pounds", "dollars"],
};

export interface DirectorOptions {
  lexicon?: DirectorLexicon;
  minShot?: number;
  anticipationFrames?: number;
  fps?: number;
  punchlineHold?: number;
  sceneGapSec?: number;
  maxSentencesPerScene?: number;
  /** Longest tolerable shot before it is split / made to drift. */
  maxShot?: number;
}

interface Resolved extends Required<DirectorOptions> {}

const DEFAULTS: Resolved = {
  lexicon: DEFAULT_LEXICON,
  minShot: 0.42,
  anticipationFrames: 2,
  fps: 24,
  punchlineHold: 0.34,
  sceneGapSec: 0.55,
  maxSentencesPerScene: 6,
  maxShot: 2.6,
};

const isNumberToken = (w: Word): boolean => /^[$£€]?\d[\d.,]*[%a-zA-Z$]*$/.test(w.text);

const COMMON_VISUAL_NOUNS = new Set([
  "boss", "money", "salary", "job", "work", "office", "computer", "laptop", "code", "ai",
  "phone", "screen", "internet", "car", "tesla", "gym", "workout", "muscle", "diet", "food",
  "pizza", "burger", "bread", "coffee", "beer", "doctor", "hospital", "pill", "medicine",
  "lawyer", "judge", "court", "taxes", "crypto", "bitcoin", "dollar", "cash", "bank", "card",
  "school", "teacher", "student", "test", "exam", "friend", "date", "relationship", "marriage",
  "game", "gaming", "steam", "movie", "cinema", "video", "youtube", "tiktok", "instagram",
  "house", "apartment", "rent", "landlord", "cat", "dog", "robot", "spaceship", "rocket",
  "clock", "time", "calendar", "deadline", "contract", "chart", "graph", "metric", "target",
  "holiday", "travel", "flight", "plane", "hotel", "police", "cop", "thief", "politician",
  "president", "billionaire", "millionaire", "celebrity", "actor", "hero", "villain", "monster"
]);

const looksLikeProperNoun = (w: Word, lex: DirectorLexicon): boolean => {
  if (/["'“”‘’]/.test(w.text)) return true; // Quoted emphasis is a high-priority visual gag
  const core = w.text.replace(/[^\p{L}']/gu, "");
  if (core.length < 2) return false;
  // Match known names
  if (lex.names.some((n) => core.toLowerCase() === n.toLowerCase())) return true;
  // Dynamic proper noun detection: capitalized word not at start of sentence
  if (!w.sentenceStart && /^[A-Z][a-z]+$/.test(core) && !STOP.has(core.toLowerCase())) return true;
  return false;
};

const looksLikeVisualConcept = (w: Word): boolean => {
  const token = w.token.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (token.length < 3 || STOP.has(token)) return false;
  if (COMMON_VISUAL_NOUNS.has(token)) return true;
  // Plural/singular variations
  if (token.endsWith("s") && COMMON_VISUAL_NOUNS.has(token.slice(0, -1))) return true;
  return false;
};

const STOP = new Set([
  "that", "this", "with", "from", "have", "been", "were", "they", "them", "their",
  "what", "when", "which", "about", "would", "could", "should", "because", "there",
  "here", "just", "like", "really", "thing", "things", "some", "more", "most", "into",
  "and", "the", "for", "you", "your", "our", "are", "was", "has", "had", "will",
  "can", "its", "then", "than", "now", "also", "even", "still", "any", "all",
]);

function labelFor(sentences: readonly Sentence[]): string {
  const words: string[] = [];
  for (const s of sentences) {
    for (const w of s.words) {
      if (w.token.length > 3 && !STOP.has(w.token)) words.push(w.token);
      if (words.length >= 4) return words.join("-");
    }
  }
  return words.join("-") || "scene";
}

/** Fold sentences into scenes using pause gaps and a length ceiling. */
export function planScenes(transcript: Transcript, opts: Resolved): ScenePlan[] {
  const scenes: ScenePlan[] = [];
  let bucket: Sentence[] = [];

  const flush = () => {
    if (bucket.length === 0) return;
    scenes.push({
      index: scenes.length,
      start: bucket[0].start,
      end: bucket[bucket.length - 1].end,
      sentences: bucket.map((s) => s.index),
      label: labelFor(bucket),
    });
    bucket = [];
  };

  for (const sentence of transcript.sentences) {
    const prev = bucket[bucket.length - 1];
    const gap = prev ? sentence.start - prev.end : 0;
    if (prev && (gap > opts.sceneGapSec || bucket.length >= opts.maxSentencesPerScene)) flush();
    bucket.push(sentence);
  }
  flush();

  if (scenes.length > 0) {
    scenes[0].start = 0;
    scenes[scenes.length - 1].end = Math.max(scenes[scenes.length - 1].end, transcript.duration);
    for (let i = 1; i < scenes.length; i++) scenes[i - 1].end = scenes[i].start;
  }
  return scenes;
}

interface Trigger {
  word: Word;
  kind: "name" | "concept" | "number" | "comparison" | "simile" | "reaction";
  partner?: Word;
}

function findTriggers(sentence: Sentence, lex: DirectorLexicon): Trigger[] {
  const out: Trigger[] = [];
  const words = sentence.words;

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (isNumberToken(w)) { out.push({ word: w, kind: "number" }); continue; }
    if (looksLikeProperNoun(w, lex)) {
      const partner = i + 1 < words.length && looksLikeProperNoun(words[i + 1], lex) ? words[i + 1] : undefined;
      out.push({ word: w, kind: "name", partner });
      if (partner) i++;
      continue;
    }
    if (looksLikeVisualConcept(w)) {
      out.push({ word: w, kind: "concept" });
      continue;
    }
    if (lex.comparisons.includes(w.token)) { out.push({ word: w, kind: "comparison" }); continue; }
    if (lex.simile.includes(w.token) && i + 1 < words.length) { out.push({ word: w, kind: "simile" }); continue; }
    if (lex.reactionTriggers.includes(w.token)) out.push({ word: w, kind: "reaction" });
  }

  // If a sentence has zero triggers, pick the longest meaningful content token as a visual anchor
  if (out.length === 0 && words.length > 0) {
    let bestWord: Word | null = null;
    let maxLen = 0;
    for (const w of words) {
      const t = w.token.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!STOP.has(t) && t.length > maxLen) {
        maxLen = t.length;
        bestWord = w;
      }
    }
    if (bestWord && maxLen >= 3) {
      out.push({ word: bestWord, kind: "concept" });
    }
  }

  return out;
}

function subjectIdFor(trig: Trigger): string {
  return [trig.word.text, trig.partner?.text]
    .filter(Boolean)
    .map((s) => (s as string).replace(/[^\p{L}]/gu, "").toLowerCase())
    .join("_");
}

const anchorForSide = (side: -1 | 1): Vec => (side > 0 ? FRAMING.macroRight.center : FRAMING.macroLeft.center);

/**
 * Turn a raw emitted shot list into a legal timeline.
 *
 * Shots are produced per trigger word, so their boundaries can overlap each
 * other and run past the end of a sentence. This chains them strictly, drops
 * anything that collapses, and converts over-long holds into a slow drift so a
 * long shot is never a frozen frame.
 */
export function normalizeShotList(
  shots: readonly Shot[],
  duration: number,
  opts: { minShot: number; maxShot?: number },
): Shot[] {
  const maxShot = opts.maxShot ?? 4.5;
  const sorted = [...shots].sort((a, b) => a.start - b.start || a.end - b.end);

  // Chain: each shot begins no earlier than the previous one ends.
  const chained: Shot[] = [];
  let cursor = 0;
  for (const s of sorted) {
    const start = Math.max(s.start, cursor);
    const end = Math.max(s.end, start);
    if (end - start < 1e-4) continue;
    chained.push({ ...s, start, end });
    cursor = end;
  }

  // Enforce a floor by borrowing from the neighbour that can spare it.
  // Reaction and insert cuts keep their own, shorter floor: a brief deadpan
  // look IS the beat, and merging it away destroys the punchline.
  const floorFor = (s: Shot): number =>
    s.kind === "reaction" || s.kind === "insert" ? Math.min(opts.minShot, 0.26) : opts.minShot;

  const floored: Shot[] = [];
  for (let i = 0; i < chained.length; i++) {
    const cur = { ...chained[i] };
    const next = chained[i + 1];
    const floor = floorFor(cur);
    if (cur.end - cur.start < floor && next) {
      const want = floor - (cur.end - cur.start);
      const spare = next.end - next.start - floorFor(next);
      if (spare > 0) {
        const give = Math.min(want, spare);
        cur.end += give;
        next.start += give;
      }
    }
    if (cur.end - cur.start > 1e-4) floored.push(cur);
  }

  // Hard floor: anything still too short is merged into its predecessor.
  const merged: Shot[] = [];
  for (const s of floored) {
    const prev = merged[merged.length - 1];
    if (prev && s.end - s.start < floorFor(s) - 1e-6) {
      prev.end = Math.max(prev.end, s.end);
      continue;
    }
    merged.push({ ...s });
  }
  const finalShots = merged;

  // Cover the whole timeline: extend the last shot to the end.
  if (finalShots.length > 0) {
    finalShots[0].start = 0;
    finalShots[finalShots.length - 1].end = Math.max(finalShots[finalShots.length - 1].end, duration);
  }

  // Split over-long shots, and make any surviving long shot drift instead of
  // sitting still.
  const out: Shot[] = [];
  for (const s of finalShots) {
    const len = s.end - s.start;
    if (len <= maxShot) {
      out.push(len > 2.6 && s.move === "cut" ? { ...s, move: "drift", zoomEnd: s.zoom * 1.06 } : s);
      continue;
    }
    const parts = Math.ceil(len / maxShot);
    const seg = len / parts;
    for (let i = 0; i < parts; i++) {
      const start = s.start + i * seg;
      const end = i === parts - 1 ? s.end : start + seg;
      // A long beat keeps creeping in rather than freezing: each segment
      // starts where the last one ended and pushes a little further.
      const zStart = (s.zoomEnd ?? s.zoom) * Math.pow((s.zoomEnd ?? s.zoom) / s.zoom, 0);
      const base = s.zoom;
      const top = s.zoomEnd ?? s.zoom * 1.1;
      const zi = base + ((top - base) * i) / parts;
      const zf = base + ((top - base) * (i + 1)) / parts;
      out.push({
        ...s,
        id: `${s.id}_${i + 1}`,
        start,
        end,
        move: i === 0 ? s.move : "drift",
        zoom: Math.min(2.15, zi * (zStart > 0 ? 1 : 1)),
        zoomEnd: Math.min(2.18, zf),
      });
    }
  }
  return out;
}

/** Build the full direction plan from a transcript. */
export function direct(transcript: Transcript, options: DirectorOptions = {}): DirectionPlan {
  const opts: Resolved = { ...DEFAULTS, ...options };
  const lex = opts.lexicon;
  const lead = opts.anticipationFrames / opts.fps;

  const shots: Shot[] = [];
  const events: BeatEvent[] = [];
  const anchors: Record<string, Vec> = {};
  const scenes = planScenes(transcript, opts);

  let side: -1 | 1 = 1;
  let seq = 0;
  const nextId = (kind: string) => `shot_${String(++seq).padStart(3, "0")}_${kind}`;

  for (const scene of scenes) {
    const firstSentence = transcript.sentences[scene.sentences[0]];
    if (firstSentence && firstSentence.start > scene.start) {
      shots.push({
        id: nextId("wide"), start: scene.start,
        end: Math.min(scene.end, firstSentence.start + 0.9),
        kind: "wide", center: FRAMING.wide.center, zoom: FRAMING.wide.zoom,
        move: "cut", breathe: 0.004,
      });
    }

    for (const sIndex of scene.sentences) {
      const sentence = transcript.sentences[sIndex];
      if (!sentence) continue;
      const triggers = findTriggers(sentence, lex);
      const lastWord = sentence.words[sentence.words.length - 1];

      const firstTrigger = triggers[0];
      const setupEnd = firstTrigger
        ? Math.max(sentence.start + opts.minShot, firstTrigger.word.start - lead)
        : sentence.end;

      shots.push({
        id: nextId("host"), start: sentence.start, end: setupEnd,
        kind: "host", center: FRAMING.hostLeft.center, zoom: FRAMING.hostLeft.zoom,
        move: "punch", approach: 0.18, ease: "expoOut", screenSide: -1,
      });
      events.push({
        t: sentence.start, kind: "expression", target: "host",
        payload: { expression: "deadpan_classic" }, reason: "sentence-open",
      });

      let escalation = 0;
      let lastEnd = setupEnd;

      for (const trig of triggers) {
        const w = trig.word;
        const triggerAt = Math.max(lastEnd, w.start - lead);

        // If narrator is speaking between successive triggers, return camera to host
        if (triggerAt > lastEnd + 0.3) {
          shots.push({
            id: nextId("host"),
            start: lastEnd,
            end: triggerAt,
            kind: "host",
            center: FRAMING.hostLeft.center,
            zoom: FRAMING.hostLeft.zoom,
            move: "cut",
            screenSide: -1,
          });
        }

        if (trig.kind === "name" || trig.kind === "concept") {
          const subjectId = subjectIdFor(trig);
          if (!anchors[subjectId]) {
            anchors[subjectId] = side > 0 ? FRAMING.subjectRight.center : FRAMING.subjectLeft.center;
            side = (side * -1) as -1 | 1;
          }
          const anchor = anchors[subjectId];
          const macro = escalation >= 1;
          const zoom = Math.min(2.15, macro ? 1.88 + escalation * 0.05 : 1.48 + escalation * 0.08);

          shots.push({
            id: nextId(macro ? "macro" : "subject"),
            start: triggerAt, end: Math.max(triggerAt + opts.minShot, w.end),
            kind: macro ? "macro" : "subject",
            center: macro ? [anchor[0] + 60, anchor[1] - 40] : anchor,
            zoom, move: macro ? "punch" : "whip",
            approach: macro ? 0.13 : 0.1,
            ease: macro ? "backOut" : "expoOut",
            overshoot: macro ? 0.06 : 0,
            screenSide: anchor[0] > 960 ? 1 : -1,
            tag: subjectId,
          });
          if (macro) {
            events.push({
              t: triggerAt, kind: "flash",
              payload: { strength: 0.3, decay: 0.26, flash: false },
              reason: `reveal:${subjectId}`,
            });
          }
          events.push({
            t: triggerAt, kind: "entrance", target: subjectId, duration: 0.22,
            payload: { side: anchor[0] > 960 ? "right" : "left", scale: 1.42 },
            reason: `${trig.kind}:${w.text}`,
          });
          lastEnd = Math.max(lastEnd, w.end);
        } else if (trig.kind === "number") {
          shots.push({
            id: nextId("insert"),
            start: triggerAt, end: Math.max(triggerAt + opts.minShot, w.end + 0.12),
            kind: "insert", center: anchorForSide(side),
            zoom: 2.02 + escalation * 0.04,
            move: "punch", approach: 0.11, ease: "backOut", overshoot: 0.08,
            tag: `readout:${w.text}`,
          });
          events.push({
            t: triggerAt, kind: "prop", target: "readout",
            duration: Math.max(0.5, w.end - triggerAt + 0.35),
            payload: { value: w.text }, reason: `number:${w.text}`,
          });
          events.push({
            t: triggerAt, kind: "flash",
            payload: { strength: 0.55, decay: 0.34, flash: true },
            reason: "punchline",
          });
          lastEnd = Math.max(lastEnd, w.end + 0.12);
        } else if (trig.kind === "comparison") {
          shots.push({
            id: nextId("morph"),
            start: triggerAt, end: Math.max(triggerAt + opts.minShot, w.end + 0.2),
            kind: "subject", center: side > 0 ? FRAMING.subjectRight.center : FRAMING.subjectLeft.center,
            zoom: 1.56 + escalation * 0.06,
            move: "punch", approach: 0.16, ease: "cubicInOut", tag: `morph:${w.token}`,
          });
          events.push({
            t: triggerAt, kind: "morph", target: "subject",
            duration: Math.max(0.45, w.end - triggerAt + 0.5),
            payload: { to: w.token, comparative: true }, reason: `comparison:${w.token}`,
          });
          lastEnd = Math.max(lastEnd, w.end + 0.2);
        } else if (trig.kind === "simile") {
          events.push({
            t: triggerAt, kind: "fx", target: "cutaway", duration: 0.9,
            payload: { cue: w.token }, reason: `simile:${w.token}`,
          });
        } else {
          events.push({
            t: triggerAt, kind: "expression", target: "host",
            payload: { expression: "skeptical_raised_brow" }, reason: `reaction:${w.token}`,
          });
        }
        escalation++;
      }

      // Punchline hold: cut too early and the audience has nowhere to look.
      const naturalEnd = lastWord ? lastWord.end : sentence.end;
      const punchHoldEnd = Math.min(naturalEnd, lastEnd + opts.punchlineHold);

      if (triggers.length > 0 && punchHoldEnd > lastEnd) {
        const prevShot = shots[shots.length - 1];
        shots.push({
          id: nextId("hold"), start: lastEnd, end: punchHoldEnd,
          kind: prevShot.kind, center: prevShot.center, zoom: prevShot.zoom,
          move: "cut", breathe: 0.002,
          tag: prevShot.tag,
        });
      }

      // If narration continues in this sentence after the punchline hold, return to host
      if (naturalEnd > punchHoldEnd + 0.3) {
        shots.push({
          id: nextId("host"), start: punchHoldEnd, end: naturalEnd,
          kind: "host", center: FRAMING.hostLeft.center, zoom: FRAMING.hostLeft.zoom,
          move: "cut", screenSide: -1,
        });
      }

      if (lastWord && naturalEnd < scene.end) {
        const reactEnd = Math.min(scene.end, naturalEnd + Math.max(opts.minShot, 0.45));
        shots.push({
          id: nextId("reaction"),
          start: naturalEnd, end: reactEnd,
          kind: "reaction", center: FRAMING.reaction.center, zoom: FRAMING.reaction.zoom,
          move: "cut", screenSide: -1,
        });
        events.push({
          t: naturalEnd, kind: "expression", target: "host",
          payload: { expression: triggers.length > 0 ? "shock_eye_pop" : "deadpan_slow_blink" },
          reason: "sentence-close",
        });
      }
    }
  }

  const cleaned = normalizeShotList(shots, transcript.duration, opts);
  const resolved = compileShots(cleaned);
  events.sort((a, b) => a.t - b.t);

  return { shots: cleaned, resolved, events, scenes, duration: transcript.duration, anchors };
}
