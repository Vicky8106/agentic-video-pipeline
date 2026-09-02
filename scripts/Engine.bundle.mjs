// scripts/engine-bootstrap.ts
import fs from "fs";
import path from "path";

// src/subtitles/SrtParser.ts
function cleanSrtEncoding(raw) {
  let text = raw.replace(/^(\s*\.)+\s*/, "").replace(/Ifyouâve youâ€™ve/g, "If you've").replace(/If you've you've/gi, "If you've").replace(/youâve/g, "you've").replace(/youâ€™ve/g, "you've").replace(/theyâre/g, "they're").replace(/theyâ€™re/g, "they're").replace(/weâve/g, "we've").replace(/weâ€™ve/g, "we've").replace(/donât/g, "don't").replace(/donâ€™t/g, "don't").replace(/friendâs/g, "friend's").replace(/friendâ€™s/g, "friend's").replace(/trendâkind/g, "trend - kind").replace(/trendâ€”kind/g, "trend - kind").replace(/regularworkingclass/g, "regular working-class").replace(/shallowaestheticobsessed/g, "shallow, aesthetic-obsessed").replace(/inlowpoly/g, "in low-poly").replace(/lowrise/g, "low-rise").replace(/Miu Miumicroskirt/g, "Miu Miu micro-skirt").replace(/â€™/g, "'").replace(/â€”/g, " - ").replace(/—/g, " - ").replace(/â€œ/g, '"').replace(/â€/g, '"').replace(/\b(you've)\s+(you've)\b/gi, "$1").replace(/\s+/g, " ").trim();
  text = text.replace(/^[,;?!\-–—.\s]+/, "").trim();
  return text;
}
function timeStringToSeconds(tStr) {
  const [hms, ms] = tStr.trim().split(",");
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s + parseInt(ms || "0", 10) / 1e3;
}
function parseSrt(srtContent) {
  const normalized = srtContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const blocks = normalized.split(/\n\n+/);
  const items = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 2) continue;
    const id = parseInt(lines[0].trim(), 10);
    const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
    if (!timeMatch) continue;
    const start = timeStringToSeconds(timeMatch[1]);
    const end = timeStringToSeconds(timeMatch[2]);
    const textLines = lines.slice(2).join(" ");
    const clean = cleanSrtEncoding(textLines);
    if (clean.length > 0) {
      items.push({
        id,
        start,
        end,
        text: textLines,
        cleanText: clean,
        words: clean.split(" ").filter((w) => w.length > 0)
      });
    }
  }
  return items;
}

// src/subtitles/Transcript.ts
var CP1252_HIGH = {
  8364: 128,
  402: 131,
  8218: 130,
  8222: 132,
  8230: 133,
  8224: 134,
  8225: 135,
  710: 136,
  8240: 137,
  352: 138,
  8249: 139,
  338: 140,
  381: 142,
  8216: 145,
  8217: 146,
  8220: 147,
  8221: 148,
  8226: 149,
  8211: 150,
  8212: 151,
  732: 152,
  8482: 153,
  353: 154,
  8250: 155,
  339: 156,
  382: 158,
  376: 159
};
function repairMojibake(input) {
  if (!/[ÂÃâ€]/.test(input)) return input;
  const bytes = [];
  for (const ch of input) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp < 256) {
      bytes.push(cp);
    } else {
      const mapped = CP1252_HIGH[cp];
      if (mapped === void 0) return input;
      bytes.push(mapped);
    }
  }
  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    return decoded.length <= input.length ? decoded : input;
  } catch {
    return input;
  }
}
function splitGluedWords(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2").replace(/\s+/g, " ").trim();
}
var FUNCTION_OPENERS = [
  "if",
  "in",
  "the",
  "a",
  "an",
  "it",
  "is",
  "was",
  "we",
  "you",
  "they",
  "this",
  "that",
  "there",
  "here",
  "when",
  "what",
  "why",
  "how",
  "but",
  "and",
  "or",
  "so",
  "as",
  "at",
  "on",
  "to",
  "of",
  "by",
  "for",
  "from",
  "with",
  "he",
  "she"
];
function splitLeadingFunctionWords(input, vocabulary) {
  return input.split(" ").map((word) => {
    const stripped = word.replace(/^["'“”‘’]+/, "");
    const lower = stripped.toLowerCase();
    for (const opener of FUNCTION_OPENERS) {
      if (lower.length > opener.length + 2 && lower.startsWith(opener)) {
        const head = stripped.slice(0, opener.length);
        const tail = stripped.slice(opener.length);
        if (!/^[a-z][a-z'’]*$/.test(tail)) continue;
        if (vocabulary && !vocabulary.has(tail.toLowerCase().replace(/['’]$/, ""))) continue;
        return `${head} ${tail}`;
      }
    }
    return word;
  }).join(" ");
}
function normalizeCueText(raw, vocabulary) {
  let t = repairMojibake(raw);
  t = t.replace(/—/g, " - ").replace(/–/g, " - ");
  t = t.replace(/[‘’]/g, "'");
  t = splitGluedWords(t);
  t = splitLeadingFunctionWords(t, vocabulary);
  t = t.replace(/^[\s,;:!.\-–—"']+(?=\S)/, "").trim();
  t = t.replace(/\b(\w+(?:'\w+)?)\s+\1\b/gi, "$1");
  return t.replace(/\s+/g, " ").trim();
}
function wordWeight(surface) {
  const core = surface.replace(/[^\p{L}\p{N}']/gu, "");
  let w = Math.max(1, core.length) * 0.062;
  if (/[,.]$/.test(surface)) w += 0.11;
  if (/[!?]$/.test(surface)) w += 0.19;
  if (/^-/.test(surface)) w += 0.05;
  if (/^[A-Z$%£]/.test(core) && core.length > 1) w += 0.03;
  return w;
}
function buildWordTimings(cues) {
  const words = [];
  let ordinal = 0;
  let sentenceIndex = 0;
  let pendingStart = false;
  const vocabulary = /* @__PURE__ */ new Set();
  for (const cue of cues) {
    for (const raw of (cue.cleanText || cue.text).split(/\s+/)) {
      const core = raw.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^\p{L}\p{N}']/gu, "");
      if (core.length > 1) vocabulary.add(core);
    }
  }
  for (let c = 0; c < cues.length; c++) {
    const cue = cues[c];
    const surface = normalizeCueText(cue.cleanText || cue.text, vocabulary);
    if (!surface) continue;
    const surfaces = surface.split(" ").filter((s) => s.length > 0);
    const weights = surfaces.map(wordWeight);
    const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;
    const nextStart = c + 1 < cues.length ? cues[c + 1].start : cue.end;
    const available = Math.max(0.05, nextStart - cue.start);
    let cursor = cue.start;
    surfaces.forEach((sf, i) => {
      const dur = weights[i] / totalWeight * available;
      const core = sf.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
      const sentenceEnd = /[.!?]["')\]]?$/.test(sf);
      words.push({
        text: sf,
        token: core,
        start: cursor,
        end: cursor + dur,
        cueIndex: c,
        sentenceIndex,
        sentenceEnd,
        sentenceStart: pendingStart,
        indexInCue: i,
        i: ordinal++
      });
      cursor += dur;
      if (sentenceEnd) sentenceIndex++;
      pendingStart = sentenceEnd;
    });
  }
  return words;
}
function buildSentences(words) {
  const out = [];
  let bucket = [];
  const flush = () => {
    if (bucket.length === 0) return;
    out.push({
      index: out.length,
      start: bucket[0].start,
      end: bucket[bucket.length - 1].end,
      words: [...bucket],
      text: bucket.map((w) => w.text).join(" ")
    });
    bucket = [];
  };
  for (const w of words) {
    bucket.push(w);
    if (w.sentenceEnd) flush();
  }
  flush();
  return out;
}
function wordAt(words, t) {
  if (words.length === 0) return null;
  let lo = 0;
  let hi = words.length - 1;
  while (lo <= hi) {
    const mid = lo + hi >> 1;
    const w = words[mid];
    if (t < w.start) hi = mid - 1;
    else if (t >= w.end) lo = mid + 1;
    else return w;
  }
  return null;
}
function buildTranscript(cues) {
  const words = buildWordTimings(cues);
  const sentences = buildSentences(words);
  const duration = words.length > 0 ? words[words.length - 1].end : 0;
  return { cues, words, sentences, duration, text: words.map((w) => w.text).join(" ") };
}

// src/anim/Easing.ts
var clamp01 = (u) => u < 0 ? 0 : u > 1 ? 1 : u;
var linear = (u) => clamp01(u);
var quadIn = (u) => {
  const x = clamp01(u);
  return x * x;
};
var quadOut = (u) => {
  const x = clamp01(u);
  return 1 - (1 - x) * (1 - x);
};
var quadInOut = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};
var cubicIn = (u) => {
  const x = clamp01(u);
  return x * x * x;
};
var cubicOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 3);
};
var cubicInOut = (u) => {
  const x = clamp01(u);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
var quartOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 4);
};
var quintOut = (u) => {
  const x = clamp01(u);
  return 1 - Math.pow(1 - x, 5);
};
var sineInOut = (u) => {
  const x = clamp01(u);
  return -(Math.cos(Math.PI * x) - 1) / 2;
};
var expoOut = (u) => {
  const x = clamp01(u);
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
var expoIn = (u) => {
  const x = clamp01(u);
  return x <= 0 ? 0 : Math.pow(2, 10 * x - 10);
};
var BACK_C1 = 1.70158;
var BACK_C2 = BACK_C1 * 1.525;
var BACK_C3 = BACK_C1 + 1;
var backOut = (u) => {
  const x = clamp01(u) - 1;
  return 1 + BACK_C3 * x * x * x + BACK_C1 * x * x;
};
var backIn = (u) => {
  const x = clamp01(u);
  return BACK_C2 * x * x * x - BACK_C1 * x * x;
};
var backInOut = (u) => {
  const x = clamp01(u) * 2;
  return x < 1 ? x * x * ((BACK_C1 + 1) * x - BACK_C1) * 0.5 : ((x - 2) * (x - 2) * ((BACK_C1 + 1) * (x - 2) + BACK_C1) + 2) * 0.5;
};
var elasticOut = (u) => {
  const x = clamp01(u);
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const period = 0.3;
  const s = period / 4;
  return Math.pow(2, -10 * x) * Math.sin((x - s) * (2 * Math.PI) / period) + 1;
};
var anticipate = (u) => {
  const x = clamp01(u);
  const dip = 0.22;
  if (x < dip) return -(x / dip) * 0.12 * (1 - x / dip);
  return cubicOut((x - dip) / (1 - dip));
};
var EASINGS = Object.freeze({
  linear,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  quartOut,
  quintOut,
  sineInOut,
  expoIn,
  expoOut,
  backIn,
  backOut,
  backInOut,
  elasticOut,
  anticipate
});
function resolveEase(name) {
  if (typeof name === "function") return name;
  if (name && Object.prototype.hasOwnProperty.call(EASINGS, name)) return EASINGS[name];
  return cubicInOut;
}

// src/anim/Track.ts
var SPRING_DEFAULTS = {
  camera: { omega: 26, zeta: 0.62 },
  head: { omega: 18, zeta: 0.55 },
  hand: { omega: 14, zeta: 0.42 },
  cloth: { omega: 9, zeta: 0.3 },
  land: { omega: 22, zeta: 0.34 }
};
function springAt(start, target, elapsed, cfg, v0 = 0) {
  const { omega, zeta } = cfg;
  const x0 = start - target;
  const e = Math.max(0, elapsed);
  if (zeta >= 1) {
    if (Math.abs(zeta - 1) < 1e-6) {
      return target + (x0 + (v0 + omega * x0) * e) * Math.exp(-omega * e);
    }
    const s = omega * Math.sqrt(zeta * zeta - 1);
    const r1 = -zeta * omega + s;
    const r2 = -zeta * omega - s;
    const c2 = (v0 - r1 * x0) / (r2 - r1);
    const c1 = x0 - c2;
    return target + c1 * Math.exp(r1 * e) + c2 * Math.exp(r2 * e);
  }
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * omega * e);
  return target + decay * (x0 * Math.cos(wd * e) + (v0 + zeta * omega * x0) / wd * Math.sin(wd * e));
}
function springFrom(t, t0, start, target, cfg, v0 = 0) {
  if (t < t0) return start;
  return springAt(start, target, t - t0, cfg, v0);
}
function ramp(t, t0, t1, ease = cubicInOut) {
  if (t1 <= t0) return t >= t1 ? 1 : 0;
  return resolveEase(ease)((t - t0) / (t1 - t0));
}

// src/camera/CameraTrack.ts
var DEFAULT_APPROACH = {
  cut: 0,
  punch: 0.16,
  whip: 0.1,
  drift: 1,
  pull: 1
};
function compileShots(shots) {
  const sorted = [...shots].sort((a, b) => a.start - b.start);
  let curCenter = [960, 540];
  let curZoom = 1;
  return sorted.map((s) => {
    const approachSec = s.approach ?? DEFAULT_APPROACH[s.move];
    const resolved = {
      ...s,
      fromCenter: curCenter,
      fromZoom: curZoom,
      approachSec: s.move === "cut" ? 0 : approachSec
    };
    curCenter = s.center;
    curZoom = s.zoomEnd ?? s.zoom;
    return resolved;
  });
}
function cameraAt(shots, t) {
  if (shots.length === 0) throw new Error("cameraAt: empty shot list");
  let shot = shots[0];
  for (let i = 0; i < shots.length; i++) {
    if (t >= shots[i].start) shot = shots[i];
  }
  const local = t - shot.start;
  const span = Math.max(1e-3, shot.end - shot.start);
  const ease = resolveEase(shot.ease ?? (shot.move === "whip" ? "expoOut" : void 0));
  let centerX;
  let centerY;
  let zoom;
  let arriving;
  if (shot.move === "cut" || local <= 0) {
    [centerX, centerY] = shot.center;
    zoom = shot.zoom;
    arriving = false;
  } else if (shot.move === "drift" || shot.move === "pull") {
    const k = ease(Math.min(1, local / span));
    centerX = shot.fromCenter[0] + (shot.center[0] - shot.fromCenter[0]) * k;
    centerY = shot.fromCenter[1] + (shot.center[1] - shot.fromCenter[1]) * k;
    const zEnd = shot.zoomEnd ?? shot.zoom;
    zoom = shot.fromZoom + (zEnd - shot.fromZoom) * k;
    arriving = false;
  } else {
    const ap = Math.max(0.02, shot.approachSec);
    const k = ramp(local, 0, ap, ease);
    centerX = shot.fromCenter[0] + (shot.center[0] - shot.fromCenter[0]) * k;
    centerY = shot.fromCenter[1] + (shot.center[1] - shot.fromCenter[1]) * k;
    const zDelta = shot.zoom - shot.fromZoom;
    const settle = springFrom(
      local,
      ap * 0.55,
      shot.fromZoom + zDelta * expoOut(Math.min(1, local / ap)),
      shot.zoom,
      SPRING_DEFAULTS.camera
    );
    zoom = Number.isFinite(settle) ? settle : shot.zoom;
    arriving = local < ap + 0.08;
  }
  const settled = shot.move === "drift" || shot.move === "pull" ? false : arriving === false;
  if (settled && span > 1.2) {
    const creepStart = Math.max(shot.approachSec, 0.25) + 0.1;
    const remain = Math.max(1e-3, span - creepStart);
    const k = Math.min(1, Math.max(0, (local - creepStart) / remain));
    const targetZoom = shot.zoomEnd ?? shot.zoom * 1.11;
    zoom = zoom + (targetZoom - zoom) * k * 0.9;
    centerX += (shot.center[0] - centerX) * k * 0.05 + k * 9;
    centerY += (shot.center[1] - centerY) * k * 0.05;
  }
  const breathe = shot.breathe ?? 35e-4;
  if (breathe > 0) {
    zoom *= 1 + Math.sin(t * 0.9 + shot.start) * breathe;
    centerX += Math.sin(t * 0.62 + shot.start * 1.7) * breathe * 260;
    centerY += Math.cos(t * 0.48 + shot.start * 2.3) * breathe * 190;
  }
  return { centerX, centerY, zoom, arriving, shot };
}
function viewBoxFor(pose, baseWidth = 1920, baseHeight = 1080) {
  const safeZoom = Math.max(0.4, Math.min(3.5, pose.zoom));
  const w = baseWidth / safeZoom;
  const h = baseHeight / safeZoom;
  return `${(pose.centerX - w / 2).toFixed(2)} ${(pose.centerY - h / 2).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
}
function pxPerUnit(pose, renderWidth = 1280, baseWidth = 1920) {
  const safeZoom = Math.max(0.4, Math.min(3.5, pose.zoom));
  return renderWidth / (baseWidth / safeZoom);
}
function noise1(x, seed) {
  const i = Math.floor(x);
  const f = x - i;
  const h = (n) => {
    const v = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  const u = f * f * (3 - 2 * f);
  return (h(i) * (1 - u) + h(i + 1) * u) * 2 - 1;
}
function traumaAt(impacts, t) {
  let sum = 0;
  for (const ev of impacts) {
    if (t < ev.t) continue;
    const decay = ev.decay ?? 0.42;
    const k = (t - ev.t) / decay;
    if (k >= 1) continue;
    sum += (1 - k) * (1 - k) * ev.strength;
  }
  return Math.min(1, sum);
}
function shakeAt(trauma, t, seed = 1) {
  if (trauma <= 1e-4) return { x: 0, y: 0, rot: 0 };
  const amp = trauma * trauma;
  const freq = 26 + trauma * 42;
  return {
    x: noise1(t * freq, seed) * amp * 26,
    y: noise1(t * freq * 1.13, seed + 7.7) * amp * 20,
    rot: noise1(t * freq * 0.71, seed + 19.3) * amp * 1.15
  };
}
function flashAt(impacts, t) {
  let v = 0;
  for (const ev of impacts) {
    if (!ev.flash || t < ev.t) continue;
    const k = (t - ev.t) / 0.085;
    if (k >= 1) continue;
    v = Math.max(v, (1 - k) * (ev.strength * 0.8));
  }
  return Math.min(1, v);
}

// src/director/Director.ts
var FRAMING = {
  wide: { center: [960, 540], zoom: 1.02 },
  hostLeft: { center: [560, 560], zoom: 1.34 },
  hostCenter: { center: [960, 560], zoom: 1.3 },
  subjectRight: { center: [1420, 540], zoom: 1.48 },
  subjectLeft: { center: [520, 540], zoom: 1.48 },
  macroRight: { center: [1480, 500], zoom: 1.94 },
  macroLeft: { center: [460, 500], zoom: 1.94 },
  reaction: { center: [620, 545], zoom: 1.42 }
};
var DEFAULT_LEXICON = {
  names: [
    "Jenna",
    "Ortega",
    "Emma",
    "Stone",
    "Ariana",
    "Grande",
    "Kate",
    "Moss",
    "Tim",
    "Burton",
    "Wednesday",
    "Addams",
    "Mary",
    "Poppins",
    "Marvel",
    "Hollywood",
    "Instagram",
    "TikTok",
    "Ozempic",
    "Zapruder"
  ],
  comparisons: [
    "leaner",
    "thinner",
    "skinnier",
    "bigger",
    "smaller",
    "tighter",
    "snatched",
    "contoured",
    "filled",
    "reversed",
    "younger",
    "better",
    "worse",
    "flat"
  ],
  simile: ["like", "as", "faster", "slower", "than", "kinda", "basically", "imagine"],
  reactionTriggers: [
    "honestly",
    "literally",
    "obviously",
    "apparently",
    "technically",
    "great",
    "awesome",
    "meanwhile",
    "anyway"
  ],
  units: ["$", "percent", "%", "mm", "cm", "lbs", "pounds", "dollars"]
};
var DEFAULTS = {
  lexicon: DEFAULT_LEXICON,
  minShot: 0.42,
  anticipationFrames: 2,
  fps: 24,
  punchlineHold: 0.34,
  sceneGapSec: 0.55,
  maxSentencesPerScene: 6,
  maxShot: 4.5
};
var isNumberToken = (w) => /^[$£€]?\d[\d.,]*[%a-zA-Z$]*$/.test(w.text);
var looksLikeProperNoun = (w, lex) => {
  if (w.sentenceStart) return false;
  if (/["'“”‘’]/.test(w.text)) return false;
  const core = w.text.replace(/[^\p{L}']/gu, "");
  if (core.length < 2) return false;
  return lex.names.some((n) => core.toLowerCase() === n.toLowerCase());
};
var STOP = /* @__PURE__ */ new Set([
  "that",
  "this",
  "with",
  "from",
  "have",
  "been",
  "were",
  "they",
  "them",
  "their",
  "what",
  "when",
  "which",
  "about",
  "would",
  "could",
  "should",
  "because",
  "there",
  "here",
  "just",
  "like",
  "really",
  "thing",
  "things",
  "some",
  "more",
  "most",
  "into"
]);
function labelFor(sentences) {
  const words = [];
  for (const s of sentences) {
    for (const w of s.words) {
      if (w.token.length > 3 && !STOP.has(w.token)) words.push(w.token);
      if (words.length >= 4) return words.join("-");
    }
  }
  return words.join("-") || "scene";
}
function planScenes(transcript, opts) {
  const scenes = [];
  let bucket = [];
  const flush = () => {
    if (bucket.length === 0) return;
    scenes.push({
      index: scenes.length,
      start: bucket[0].start,
      end: bucket[bucket.length - 1].end,
      sentences: bucket.map((s) => s.index),
      label: labelFor(bucket)
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
function findTriggers(sentence, lex) {
  const out = [];
  const words = sentence.words;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (isNumberToken(w)) {
      out.push({ word: w, kind: "number" });
      continue;
    }
    if (looksLikeProperNoun(w, lex)) {
      const partner = i + 1 < words.length && looksLikeProperNoun(words[i + 1], lex) ? words[i + 1] : void 0;
      out.push({ word: w, kind: "name", partner });
      if (partner) i++;
      continue;
    }
    if (lex.comparisons.includes(w.token)) {
      out.push({ word: w, kind: "comparison" });
      continue;
    }
    if (lex.simile.includes(w.token) && i + 1 < words.length) {
      out.push({ word: w, kind: "simile" });
      continue;
    }
    if (lex.reactionTriggers.includes(w.token)) out.push({ word: w, kind: "reaction" });
  }
  return out;
}
function subjectIdFor(trig) {
  return [trig.word.text, trig.partner?.text].filter(Boolean).map((s) => s.replace(/[^\p{L}]/gu, "").toLowerCase()).join("_");
}
var anchorForSide = (side) => side > 0 ? FRAMING.macroRight.center : FRAMING.macroLeft.center;
function normalizeShotList(shots, duration, opts) {
  const maxShot = opts.maxShot ?? 4.5;
  const sorted = [...shots].sort((a, b) => a.start - b.start || a.end - b.end);
  const chained = [];
  let cursor = 0;
  for (const s of sorted) {
    const start = Math.max(s.start, cursor);
    const end = Math.max(s.end, start);
    if (end - start < 1e-4) continue;
    chained.push({ ...s, start, end });
    cursor = end;
  }
  const floorFor = (s) => s.kind === "reaction" || s.kind === "insert" ? Math.min(opts.minShot, 0.26) : opts.minShot;
  const floored = [];
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
  const merged = [];
  for (const s of floored) {
    const prev = merged[merged.length - 1];
    if (prev && s.end - s.start < floorFor(s) - 1e-6) {
      prev.end = Math.max(prev.end, s.end);
      continue;
    }
    merged.push({ ...s });
  }
  const finalShots = merged;
  if (finalShots.length > 0) {
    finalShots[0].start = 0;
    finalShots[finalShots.length - 1].end = Math.max(finalShots[finalShots.length - 1].end, duration);
  }
  const out = [];
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
      const zStart = (s.zoomEnd ?? s.zoom) * Math.pow((s.zoomEnd ?? s.zoom) / s.zoom, 0);
      const base = s.zoom;
      const top = s.zoomEnd ?? s.zoom * 1.1;
      const zi = base + (top - base) * i / parts;
      const zf = base + (top - base) * (i + 1) / parts;
      out.push({
        ...s,
        id: `${s.id}_${i + 1}`,
        start,
        end,
        move: i === 0 ? s.move : "drift",
        zoom: Math.min(2.15, zi * (zStart > 0 ? 1 : 1)),
        zoomEnd: Math.min(2.18, zf)
      });
    }
  }
  return out;
}
function direct(transcript, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const lex = opts.lexicon;
  const lead = opts.anticipationFrames / opts.fps;
  const shots = [];
  const events = [];
  const anchors = {};
  const scenes = planScenes(transcript, opts);
  let side = 1;
  let seq = 0;
  const nextId = (kind) => `shot_${String(++seq).padStart(3, "0")}_${kind}`;
  for (const scene of scenes) {
    const firstSentence = transcript.sentences[scene.sentences[0]];
    if (firstSentence && firstSentence.start > scene.start) {
      shots.push({
        id: nextId("wide"),
        start: scene.start,
        end: Math.min(scene.end, firstSentence.start + 0.9),
        kind: "wide",
        center: FRAMING.wide.center,
        zoom: FRAMING.wide.zoom,
        move: "cut",
        breathe: 4e-3
      });
    }
    for (const sIndex of scene.sentences) {
      const sentence = transcript.sentences[sIndex];
      if (!sentence) continue;
      const triggers = findTriggers(sentence, lex);
      const lastWord = sentence.words[sentence.words.length - 1];
      const firstTrigger = triggers[0];
      const setupEnd = firstTrigger ? Math.max(sentence.start + opts.minShot, firstTrigger.word.start - lead) : sentence.end;
      shots.push({
        id: nextId("host"),
        start: sentence.start,
        end: setupEnd,
        kind: "host",
        center: FRAMING.hostLeft.center,
        zoom: FRAMING.hostLeft.zoom,
        move: "punch",
        approach: 0.18,
        ease: "expoOut",
        screenSide: -1
      });
      events.push({
        t: sentence.start,
        kind: "expression",
        target: "host",
        payload: { expression: "deadpan_classic" },
        reason: "sentence-open"
      });
      let escalation = 0;
      let lastEnd = setupEnd;
      for (const trig of triggers) {
        const w = trig.word;
        const triggerAt = Math.max(lastEnd, w.start - lead);
        if (triggerAt > lastEnd + 0.3) {
          shots.push({
            id: nextId("host"),
            start: lastEnd,
            end: triggerAt,
            kind: "host",
            center: FRAMING.hostLeft.center,
            zoom: FRAMING.hostLeft.zoom,
            move: "cut",
            screenSide: -1
          });
        }
        if (trig.kind === "name") {
          const subjectId = subjectIdFor(trig);
          if (!anchors[subjectId]) {
            anchors[subjectId] = side > 0 ? FRAMING.subjectRight.center : FRAMING.subjectLeft.center;
            side = side * -1;
          }
          const anchor = anchors[subjectId];
          const macro = escalation >= 1;
          const zoom = Math.min(2.15, macro ? 1.88 + escalation * 0.05 : 1.48 + escalation * 0.08);
          shots.push({
            id: nextId(macro ? "macro" : "subject"),
            start: triggerAt,
            end: Math.max(triggerAt + opts.minShot, w.end),
            kind: macro ? "macro" : "subject",
            center: macro ? [anchor[0] + 60, anchor[1] - 40] : anchor,
            zoom,
            move: macro ? "punch" : "whip",
            approach: macro ? 0.13 : 0.1,
            ease: macro ? "backOut" : "expoOut",
            overshoot: macro ? 0.06 : 0,
            screenSide: anchor[0] > 960 ? 1 : -1,
            tag: subjectId
          });
          if (macro) {
            events.push({
              t: triggerAt,
              kind: "flash",
              payload: { strength: 0.3, decay: 0.26, flash: false },
              reason: `reveal:${subjectId}`
            });
          }
          events.push({
            t: triggerAt,
            kind: "entrance",
            target: subjectId,
            duration: 0.22,
            payload: { side: anchor[0] > 960 ? "right" : "left", scale: 1.42 },
            reason: `name:${w.text}`
          });
          lastEnd = Math.max(lastEnd, w.end);
        } else if (trig.kind === "number") {
          shots.push({
            id: nextId("insert"),
            start: triggerAt,
            end: Math.max(triggerAt + opts.minShot, w.end + 0.12),
            kind: "insert",
            center: anchorForSide(side),
            zoom: 2.02 + escalation * 0.04,
            move: "punch",
            approach: 0.11,
            ease: "backOut",
            overshoot: 0.08,
            tag: `readout:${w.text}`
          });
          events.push({
            t: triggerAt,
            kind: "prop",
            target: "readout",
            duration: Math.max(0.5, w.end - triggerAt + 0.35),
            payload: { value: w.text },
            reason: `number:${w.text}`
          });
          events.push({
            t: triggerAt,
            kind: "flash",
            payload: { strength: 0.55, decay: 0.34, flash: true },
            reason: "punchline"
          });
          lastEnd = Math.max(lastEnd, w.end + 0.12);
        } else if (trig.kind === "comparison") {
          shots.push({
            id: nextId("morph"),
            start: triggerAt,
            end: Math.max(triggerAt + opts.minShot, w.end + 0.2),
            kind: "subject",
            center: side > 0 ? FRAMING.subjectRight.center : FRAMING.subjectLeft.center,
            zoom: 1.56 + escalation * 0.06,
            move: "punch",
            approach: 0.16,
            ease: "cubicInOut",
            tag: `morph:${w.token}`
          });
          events.push({
            t: triggerAt,
            kind: "morph",
            target: "subject",
            duration: Math.max(0.45, w.end - triggerAt + 0.5),
            payload: { to: w.token, comparative: true },
            reason: `comparison:${w.token}`
          });
          lastEnd = Math.max(lastEnd, w.end + 0.2);
        } else if (trig.kind === "simile") {
          events.push({
            t: triggerAt,
            kind: "fx",
            target: "cutaway",
            duration: 0.9,
            payload: { cue: w.token },
            reason: `simile:${w.token}`
          });
        } else {
          events.push({
            t: triggerAt,
            kind: "expression",
            target: "host",
            payload: { expression: "skeptical_raised_brow" },
            reason: `reaction:${w.token}`
          });
        }
        escalation++;
      }
      const naturalEnd = lastWord ? lastWord.end : sentence.end;
      const punchHoldEnd = Math.min(naturalEnd, lastEnd + opts.punchlineHold);
      if (triggers.length > 0 && punchHoldEnd > lastEnd) {
        const prevShot = shots[shots.length - 1];
        shots.push({
          id: nextId("hold"),
          start: lastEnd,
          end: punchHoldEnd,
          kind: prevShot.kind,
          center: prevShot.center,
          zoom: prevShot.zoom,
          move: "cut",
          breathe: 2e-3,
          tag: prevShot.tag
        });
      }
      if (naturalEnd > punchHoldEnd + 0.3) {
        shots.push({
          id: nextId("host"),
          start: punchHoldEnd,
          end: naturalEnd,
          kind: "host",
          center: FRAMING.hostLeft.center,
          zoom: FRAMING.hostLeft.zoom,
          move: "cut",
          screenSide: -1
        });
      }
      if (lastWord && naturalEnd < scene.end) {
        const reactEnd = Math.min(scene.end, naturalEnd + Math.max(opts.minShot, 0.45));
        shots.push({
          id: nextId("reaction"),
          start: naturalEnd,
          end: reactEnd,
          kind: "reaction",
          center: FRAMING.reaction.center,
          zoom: FRAMING.reaction.zoom,
          move: "cut",
          screenSide: -1
        });
        events.push({
          t: naturalEnd,
          kind: "expression",
          target: "host",
          payload: { expression: triggers.length > 0 ? "shock_eye_pop" : "deadpan_slow_blink" },
          reason: "sentence-close"
        });
      }
    }
  }
  const cleaned = normalizeShotList(shots, transcript.duration, opts);
  const resolved = compileShots(cleaned);
  events.sort((a, b) => a.t - b.t);
  return { shots: cleaned, resolved, events, scenes, duration: transcript.duration, anchors };
}

// src/anim/Pose.ts
var NUMERIC_POSE_FIELDS = [
  "x",
  "y",
  "scale",
  "rotation",
  "alpha",
  "spineLean",
  "headTilt",
  "headYaw",
  "gazeX",
  "gazeY",
  "eyebrowTilt",
  "eyebrowHeight",
  "mouthOpen",
  "leftArmAngle1",
  "leftArmAngle2",
  "rightArmAngle1",
  "rightArmAngle2",
  "leftLegAngle1",
  "leftLegAngle2",
  "rightLegAngle1",
  "rightLegAngle2",
  "shoulderWidth",
  "neckLen",
  "chestTwist",
  "hipShift",
  "squash",
  "stretch"
];
function mixPose(a, b, k) {
  const out = { ...b };
  for (const field of NUMERIC_POSE_FIELDS) {
    const av = a[field];
    const bv = b[field];
    if (typeof av === "number" && typeof bv === "number") {
      out[field] = av + (bv - av) * k;
    }
  }
  return out;
}
function samplePose(keys, t) {
  if (keys.length === 0) return {};
  if (t <= keys[0].t) return { ...keys[0].pose };
  const last = keys[keys.length - 1];
  if (t >= last.t) return { ...last.pose };
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].t <= t) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const k = ramp(t, a.t, b.t, a.ease ?? "cubicInOut");
  return mixPose(a.pose, b.pose, k);
}
function withAnticipation(keys, index, opts = {}) {
  const lead = opts.lead ?? 0.22;
  const strength = opts.strength ?? 0.14;
  if (index <= 0 || index >= keys.length) return [...keys];
  const prev = keys[index - 1];
  const cur = keys[index];
  const span = cur.t - prev.t;
  if (span <= 0) return [...keys];
  const pullKey = {
    t: prev.t + span * lead,
    pose: mixPose(prev.pose, cur.pose, -strength),
    ease: cur.ease
  };
  const out = [...keys];
  out.splice(index, 0, pullKey);
  return out;
}
function squashStretch(squash, stretch) {
  const sy = stretch * squash;
  const sx = 1 / Math.max(1e-3, sy);
  return { sx, sy };
}

// src/character/CharacterSpec.ts
var BASE_BODY = {
  height: 520,
  headSize: 1,
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
  hairVolume: 1,
  eyeSpacing: 1,
  eyeSize: 1
};
var BASE_PALETTE = {
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
  accent: "#eab308"
};
var withBody = (over) => ({ ...BASE_BODY, ...over });
var BODY_PRESETS = {
  lean: withBody({
    shoulderWidth: 44,
    waistWidth: 30,
    hipWidth: 44,
    belly: -4,
    chestWidth: 50,
    cheekFullness: 0.22,
    jawWidth: 0.72,
    limbThickness: 7
  }),
  average: withBody({}),
  heavy: withBody({
    shoulderWidth: 58,
    waistWidth: 74,
    hipWidth: 74,
    belly: 26,
    chestWidth: 74,
    cheekFullness: 0.85,
    jawWidth: 1.05,
    limbThickness: 11,
    armLen: 74,
    foreArmLen: 74,
    thighLen: 80,
    shinLen: 80
  }),
  /** The satirical "snatched" silhouette the script is actually about. */
  hourglass: withBody({
    shoulderWidth: 52,
    waistWidth: 26,
    hipWidth: 70,
    belly: -2,
    chestWidth: 62,
    cheekFullness: 0.3,
    jawWidth: 0.68
  }),
  gaunt: withBody({
    shoulderWidth: 40,
    waistWidth: 24,
    hipWidth: 38,
    belly: -8,
    chestWidth: 44,
    cheekFullness: 0.1,
    jawWidth: 0.62,
    limbThickness: 6
  })
};
var BODY_FIELDS = Object.keys(BASE_BODY);
function mixBody(a, b, k) {
  const out = { ...a };
  for (const f of BODY_FIELDS) {
    out[f] = a[f] + (b[f] - a[f]) * k;
  }
  return out;
}
function sampleBody(keys, t) {
  if (keys.length === 0) return BASE_BODY;
  if (t <= keys[0].t) return keys[0].body;
  const last = keys[keys.length - 1];
  if (t >= last.t) return last.body;
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].t <= t) i++;
  const prev = keys[i];
  const cur = keys[i + 1];
  if (!cur) return prev.body;
  const over = cur.over ?? Math.max(1e-3, cur.t - prev.t);
  const k = Math.min(1, Math.max(0, (t - prev.t) / over));
  const e = k * k * (3 - 2 * k);
  return mixBody(prev.body, cur.body, e);
}
function hashSeed(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1e4 / 1e4;
}
function makeSpec(id, displayName, over = {}) {
  return {
    id,
    displayName,
    body: { ...BASE_BODY },
    palette: { ...BASE_PALETTE },
    hair: "short_swoop",
    costume: "none",
    phaseSeed: hashSeed(id),
    ...over
  };
}

// src/director/Performance.ts
var POSES = {
  idle: {
    leftArmAngle1: 150,
    leftArmAngle2: -20,
    rightArmAngle1: 30,
    rightArmAngle2: 20,
    leftLegAngle1: 105,
    leftLegAngle2: 10,
    rightLegAngle1: 75,
    rightLegAngle2: -10,
    spineLean: 0,
    headTilt: -4,
    eyebrowHeight: 0,
    eyebrowTilt: 0
  },
  shrug: {
    leftArmAngle1: 130,
    leftArmAngle2: -95,
    rightArmAngle1: 50,
    rightArmAngle2: 95,
    spineLean: -2,
    headTilt: 6,
    eyebrowHeight: 6
  },
  pointCamera: {
    leftArmAngle1: 150,
    leftArmAngle2: -20,
    rightArmAngle1: -8,
    rightArmAngle2: 6,
    spineLean: 3,
    headTilt: -2,
    eyebrowHeight: 3
  },
  facepalm: {
    leftArmAngle1: 150,
    leftArmAngle2: -20,
    rightArmAngle1: 62,
    rightArmAngle2: -118,
    spineLean: 8,
    headTilt: 12,
    eyebrowHeight: -4
  },
  handsOnHips: {
    leftArmAngle1: 128,
    leftArmAngle2: -108,
    rightArmAngle1: 52,
    rightArmAngle2: 108,
    spineLean: -3,
    headTilt: 0,
    eyebrowHeight: 2
  },
  crossedArms: {
    leftArmAngle1: 118,
    leftArmAngle2: -78,
    rightArmAngle1: 62,
    rightArmAngle2: 78,
    spineLean: 2,
    headTilt: 3
  },
  mindBlown: {
    leftArmAngle1: 172,
    leftArmAngle2: -128,
    rightArmAngle1: 8,
    rightArmAngle2: 128,
    spineLean: -6,
    headTilt: -10,
    eyebrowHeight: 12
  },
  wave: {
    leftArmAngle1: 150,
    leftArmAngle2: -20,
    rightArmAngle1: -42,
    rightArmAngle2: 34,
    spineLean: 0,
    headTilt: 5
  }
};
var EXPRESSIONS = {
  deadpan_classic: { mouthShape: "deadpan_line", eyebrowHeight: 0, eyebrowTilt: 0, gazeX: 0.1, headTilt: -2 },
  deadpan_slow_blink: { mouthShape: "deadpan_line", eyebrowHeight: -1, gazeX: -0.2, headTilt: 2 },
  skeptical_raised_brow: { mouthShape: "smirk", eyebrowHeight: 9, eyebrowTilt: -7, gazeX: 0.45, headTilt: -6 },
  skeptical_side_eye: { mouthShape: "smirk", eyebrowHeight: 5, eyebrowTilt: -9, gazeX: 0.85, headYaw: 0.45 },
  confused_tilted_head: { mouthShape: "cringe_wavy", eyebrowHeight: 4, eyebrowTilt: 6, headTilt: 16, headYaw: -0.25 },
  confused_squint: { mouthShape: "deadpan_line", eyebrowHeight: -3, eyebrowTilt: 10, gazeX: 0.3 },
  shock_eye_pop: { mouthShape: "jaw_drop", eyeStyle: "eye_pop", eyebrowHeight: 16, eyebrowTilt: 0, headTilt: -8, mouthOpen: 0.75 },
  shock_jaw_drop: { mouthShape: "jaw_drop", eyebrowHeight: 14, mouthOpen: 0.8, headTilt: -6 },
  rage_furious_screaming: { mouthShape: "scream", eyebrowHeight: -8, eyebrowTilt: -16, comicFx: "speed_lines" },
  disgust_gag: { mouthShape: "cringe_wavy", eyebrowHeight: -6, eyebrowTilt: 12, headYaw: -0.5, spineLean: -6 },
  smug_rock_eyebrow: { mouthShape: "wide_grin", eyebrowHeight: 7, eyebrowTilt: -10, gazeX: 0.3, headTilt: 4 }
};
var poseForExpression = (name) => {
  if (EXPRESSIONS[name]) return EXPRESSIONS[name];
  const family = name.split("_")[0];
  const byFamily = {
    rage: "rage_furious_screaming",
    disgust: "disgust_gag",
    shock: "shock_eye_pop",
    fear: "shock_eye_pop",
    confused: "confused_tilted_head",
    skeptical: "skeptical_side_eye",
    deadpan: "deadpan_classic",
    smug: "smug_rock_eyebrow",
    frustration: "facepalm",
    crying: "disgust_gag",
    sad: "deadpan_slow_blink",
    laughing: "smug_rock_eyebrow"
  };
  return EXPRESSIONS[byFamily[family] ?? "deadpan_classic"] ?? EXPRESSIONS.deadpan_classic;
};
var FLOOR_Y = 842;
var standingHipY = (body) => FLOOR_Y - (body.thighLen + body.shinLen) * 0.97;
function buildPerformance(plan, opts = {}) {
  const hostId = opts.hostId ?? "host";
  const entranceSec = opts.entranceSec ?? 0.22;
  const base = { ...POSES.idle, ...opts.basePose ?? {} };
  const actors = /* @__PURE__ */ new Map();
  const hostHome = [560, standingHipY(BODY_PRESETS.average)];
  const framedUntil = /* @__PURE__ */ new Map();
  for (const shot of plan.shots) {
    if (!shot.tag || shot.tag.startsWith("morph:") || shot.tag.startsWith("readout:")) continue;
    framedUntil.set(shot.tag, Math.max(framedUntil.get(shot.tag) ?? 0, shot.end));
  }
  const ensure = (id) => {
    let a = actors.get(id);
    if (!a) {
      const anchor = id === hostId ? hostHome : plan.anchors[id] ?? hostHome;
      const home = anchor ? [anchor[0], standingHipY(BODY_PRESETS.average)] : hostHome;
      const slideFrom = id === hostId ? 0 : home[0] > 960 ? 260 : -260;
      a = {
        poseKeys: [{ t: 0, pose: { ...base, x: home[0], y: home[1] } }],
        bodyKeys: [{ t: 0, body: BODY_PRESETS.average }],
        windows: [],
        base,
        home,
        slideFrom
      };
      actors.set(id, a);
    }
    return a;
  };
  ensure(hostId);
  for (const ev of plan.events) {
    const target = ev.target ?? hostId;
    const actor = ensure(target);
    if (ev.kind === "expression") {
      const expr = String(ev.payload.expression ?? "deadpan_classic");
      actor.poseKeys.push({ t: ev.t, pose: { ...poseForExpression(expr) }, ease: "backOut" });
    } else if (ev.kind === "entrance") {
      const until = Math.min(
        plan.duration,
        Math.max(framedUntil.get(target) ?? ev.t + (ev.duration ?? 1.5), ev.t + (ev.duration ?? 1.5)) + 0.25
      );
      const dur = until - ev.t;
      actor.windows.push([ev.t, until]);
      actor.poseKeys.push({
        t: ev.t,
        pose: {
          ...POSES.idle,
          ...poseForExpression("smug_rock_eyebrow"),
          scale: 1.42,
          x: actor.home[0] + actor.slideFrom,
          y: actor.home[1],
          alpha: 0.35
        },
        ease: "expoOut"
      });
      actor.poseKeys.push({
        t: ev.t + 0.2,
        pose: { ...POSES.idle, ...poseForExpression("smug_rock_eyebrow"), scale: 1.42, x: actor.home[0], y: actor.home[1] },
        ease: "backOut"
      });
      actor.poseKeys.push({ t: ev.t + dur - 0.2, pose: { x: actor.home[0], y: actor.home[1], scale: 1.42 } });
    } else if (ev.kind === "morph") {
      const to = String(ev.payload.to ?? "");
      const preset = BODY_PRESETS[to] ?? (["leaner", "thinner", "skinnier", "snatched"].includes(to) ? BODY_PRESETS.lean : ["bigger", "heavier"].includes(to) ? BODY_PRESETS.heavy : void 0);
      if (preset) {
        const dur = ev.duration ?? 0.8;
        actor.bodyKeys.push({ t: ev.t + dur, body: preset, over: dur });
      }
    }
  }
  for (const a of actors.values()) {
    const last = a.poseKeys[a.poseKeys.length - 1];
    a.poseKeys.push({ t: plan.duration, pose: { ...last.pose, x: a.home[0], y: a.home[1] } });
    for (const k of a.poseKeys) {
      if (typeof k.pose.x !== "number") k.pose.x = a.home[0];
      if (typeof k.pose.y !== "number") k.pose.y = a.home[1];
    }
    a.poseKeys.sort((x, y) => x.t - y.t);
    a.bodyKeys.sort((x, y) => x.t - y.t);
    if (a.bodyKeys.length === 1) a.bodyKeys.push({ t: plan.duration, body: a.bodyKeys[0].body });
  }
  const host = actors.get(hostId);
  if (host) {
    for (let i = host.poseKeys.length - 1; i >= 1; i--) {
      host.poseKeys = withAnticipation(host.poseKeys, i, { lead: 0.2, strength: 0.12 });
    }
  }
  return {
    ids: [...actors.keys()],
    poseAt(id, t) {
      const a = actors.get(id);
      if (!a) return { ...base };
      return samplePose(a.poseKeys, t);
    },
    bodyAt(id, t) {
      const a = actors.get(id);
      return a ? sampleBody(a.bodyKeys, t) : BODY_PRESETS.average;
    },
    homeAt(id) {
      const a = actors.get(id);
      return a ? a.home : hostHome;
    },
    presenceAt(id, t) {
      const a = actors.get(id);
      if (!a) return 0;
      if (id === hostId) return 1;
      for (const [s, e] of a.windows) {
        if (t < s || t > e) continue;
        const inRamp = ramp(t, s, s + entranceSec, "backOut");
        const outRamp = 1 - ramp(t, e - 0.18, e, "cubicIn");
        return Math.max(0, Math.min(1, Math.min(inRamp, outRamp)));
      }
      return 0;
    }
  };
}
function secondaryMotion(poseAt, t, dt) {
  const now = poseAt(t);
  const prev = poseAt(t - dt);
  const dTilt = (typeof now.headTilt === "number" ? now.headTilt : 0) - (typeof prev.headTilt === "number" ? prev.headTilt : 0);
  const dLean = (typeof now.spineLean === "number" ? now.spineLean : 0) - (typeof prev.spineLean === "number" ? prev.spineLean : 0);
  const dx = (typeof now.x === "number" ? now.x : 0) - (typeof prev.x === "number" ? prev.x : 0);
  const dy = (typeof now.y === "number" ? now.y : 0) - (typeof prev.y === "number" ? prev.y : 0);
  return {
    headLag: -dTilt * 0.55 - dLean * 0.3,
    handLag: { x: -dx * 0.35, y: -dy * 0.35 },
    hairLag: -dLean * 1.6 - dx * 0.12
  };
}

// src/character/Rig.ts
var rad = (deg) => deg * Math.PI / 180;
var num = (p, key, fallback) => {
  const v = p[key];
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
};
var str = (p, key, fallback) => {
  const v = p[key];
  return typeof v === "string" ? v : fallback;
};
function fk(origin, a1, a2, l1, l2) {
  const joint = {
    x: origin.x + Math.cos(rad(a1)) * l1,
    y: origin.y + Math.sin(rad(a1)) * l1
  };
  const total = a1 + a2;
  const end = {
    x: joint.x + Math.cos(rad(total)) * l2,
    y: joint.y + Math.sin(rad(total)) * l2
  };
  return { joint, end, endAngle: total };
}
function ikTwoBone(origin, target, l1, l2, bendSign = 1) {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const d = Math.hypot(dx, dy);
  if (d > l1 + l2 || d < Math.abs(l1 - l2)) return null;
  const base = Math.atan2(dy, dx);
  const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
  const a = Math.acos(Math.max(-1, Math.min(1, cosA))) * bendSign;
  const joint = {
    x: origin.x + Math.cos(base + a) * l1,
    y: origin.y + Math.sin(base + a) * l1
  };
  return { joint, end: target };
}
function solveSkeleton(spec, body, pose) {
  const lean = rad(num(pose, "spineLean", 0));
  const hip = { x: 0, y: 0 };
  const up = (len, lateral = 0) => ({
    x: hip.x + Math.sin(lean) * -len + Math.cos(lean) * lateral,
    y: hip.y - Math.cos(lean) * len - Math.sin(lean) * lateral
  });
  const chestRise = num(pose, "chestRise", 0);
  const bodySway = num(pose, "bodySway", 0);
  const shoulderY = body.torsoLen;
  const neckBase = up(shoulderY - chestRise * 0.8);
  const headCenter = up(shoulderY + body.neckLen + body.headSize * 46);
  const breathShoulder = body.shoulderWidth + chestRise * 1.6;
  const sw = breathShoulder;
  const shoulderL = { x: neckBase.x - sw / 2 + bodySway, y: neckBase.y + 6 - chestRise * 0.5 };
  const shoulderR = { x: neckBase.x + sw / 2 + bodySway, y: neckBase.y + 6 - chestRise * 0.5 };
  const armL1 = num(pose, "leftArmAngle1", 150);
  const armL2 = num(pose, "leftArmAngle2", -20);
  const armR1 = num(pose, "rightArmAngle1", 30);
  const armR2 = num(pose, "rightArmAngle2", 20);
  const la = fk(shoulderL, armL1, armL2, body.armLen, body.foreArmLen);
  const ra = fk(shoulderR, armR1, armR2, body.armLen, body.foreArmLen);
  const targetL = pose.leftHandTarget;
  const targetR = pose.rightHandTarget;
  const solvedL = targetL ? ikTwoBone(shoulderL, targetL, body.armLen, body.foreArmLen, 1) : null;
  const solvedR = targetR ? ikTwoBone(shoulderR, targetR, body.armLen, body.foreArmLen, -1) : null;
  const legL1 = num(pose, "leftLegAngle1", 105);
  const legL2 = num(pose, "leftLegAngle2", 10);
  const legR1 = num(pose, "rightLegAngle1", 75);
  const legR2 = num(pose, "rightLegAngle2", -10);
  const hipOffset = num(pose, "hipShift", 0) + bodySway * 0.6;
  const hipL = { x: hip.x - body.hipWidth * 0.22 + hipOffset, y: hip.y };
  const hipR = { x: hip.x + body.hipWidth * 0.22 + hipOffset, y: hip.y };
  const ll = fk(hipL, legL1, legL2, body.thighLen, body.shinLen);
  const lr = fk(hipR, legR1, legR2, body.thighLen, body.shinLen);
  return {
    hip,
    shoulderL,
    shoulderR,
    neckBase,
    headCenter,
    elbowL: solvedL ? solvedL.joint : la.joint,
    handL: solvedL ? solvedL.end : la.end,
    elbowR: solvedR ? solvedR.joint : ra.joint,
    handR: solvedR ? solvedR.end : ra.end,
    kneeL: ll.joint,
    footL: ll.end,
    kneeR: lr.joint,
    footR: lr.end,
    headRadius: body.headSize * 52
  };
}
function renderRig(input) {
  const { id, spec, body, pose, pxPerUnit: pxPerUnit2 } = input;
  const sk = solveSkeleton(spec, body, pose);
  const x = num(pose, "x", 0);
  const y = num(pose, "y", 0);
  const scale = num(pose, "scale", 1);
  const rotation = num(pose, "rotation", 0);
  const alpha = num(pose, "alpha", 1);
  const sq = num(pose, "squash", 1);
  const st = num(pose, "stretch", 1);
  const { sx, sy } = squashStretch(sq, st);
  const strokePx = input.strokePx ?? 3.2;
  const unit = strokePx / Math.max(1e-4, pxPerUnit2 * scale);
  const sw = (mult = 1) => (unit * mult).toFixed(3);
  const line = spec.palette.line;
  const headTilt = num(pose, "headTilt", -4) + (input.headLag ?? 0);
  const yaw = Math.max(-1, Math.min(1, num(pose, "headYaw", 0)));
  const cheek = body.cheekFullness;
  const hr = sk.headRadius;
  const chestRise = num(pose, "chestRise", 0);
  const chestW = body.chestWidth / 2 + chestRise * 0.9;
  const waistW = body.waistWidth / 2;
  const hipW = body.hipWidth / 2;
  const belly = body.belly;
  const nb = sk.neckBase;
  const torsoPath = `
    M ${(-chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    C ${(-chestW - 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(-waistW - 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(-waistW - belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(-waistW - belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    L ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    C ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(waistW + belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(waistW + belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(waistW + 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(chestW + 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    Z`;
  const faceShift = yaw * hr * 0.34;
  const faceSquash = 1 - Math.abs(yaw) * 0.16;
  const eyeR = hr * 0.3 * body.eyeSize;
  const eyeGap = hr * 0.42 * body.eyeSpacing * faceSquash;
  const eyeLX = -eyeGap + faceShift;
  const eyeRX = eyeGap + faceShift;
  const eyeY = -hr * 0.1;
  const blink = Math.max(0, Math.min(1, input.blinkAmount ?? 0));
  const mouthOpen = Math.max(0, Math.min(1, input.mouthDrive ?? num(pose, "mouthOpen", 0)));
  const mouthShape = str(pose, "mouthShape", "smile_teeth");
  const mouthY = hr * 0.52;
  const mouthW = hr * (0.44 + cheek * 0.26);
  const eyes = blink > 0.72 ? `
      <path d="M ${(eyeLX - eyeR).toFixed(1)} ${eyeY.toFixed(1)} Q ${eyeLX.toFixed(1)} ${(eyeY + eyeR * 0.55).toFixed(1)} ${(eyeLX + eyeR).toFixed(1)} ${eyeY.toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
      <path d="M ${(eyeRX - eyeR).toFixed(1)} ${eyeY.toFixed(1)} Q ${eyeRX.toFixed(1)} ${(eyeY + eyeR * 0.55).toFixed(1)} ${(eyeRX + eyeR).toFixed(1)} ${eyeY.toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>` : `
      <ellipse cx="${eyeLX.toFixed(1)}" cy="${eyeY.toFixed(1)}" rx="${(eyeR * faceSquash).toFixed(1)}" ry="${eyeR.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
      <ellipse cx="${eyeRX.toFixed(1)}" cy="${eyeY.toFixed(1)}" rx="${(eyeR * faceSquash).toFixed(1)}" ry="${eyeR.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
      <circle cx="${(eyeLX + num(pose, "gazeX", 0.3) * eyeR * 0.5).toFixed(1)}" cy="${(eyeY + num(pose, "gazeY", -0.1) * eyeR * 0.45).toFixed(1)}" r="${(eyeR * 0.42).toFixed(1)}" fill="${line}"/>
      <circle cx="${(eyeRX + num(pose, "gazeX", 0.3) * eyeR * 0.5).toFixed(1)}" cy="${(eyeY + num(pose, "gazeY", -0.1) * eyeR * 0.45).toFixed(1)}" r="${(eyeR * 0.42).toFixed(1)}" fill="${line}"/>`;
  const mouth = renderMouth(mouthShape, mouthW, mouthY, mouthOpen, spec, sw, cheek);
  const brows = `
    <path d="M ${(eyeLX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - num(pose, "eyebrowHeight", 0) * 0.5).toFixed(1)} Q ${eyeLX.toFixed(1)} ${(eyeY - eyeR * 2.1 - num(pose, "eyebrowHeight", 0)).toFixed(1)} ${(eyeLX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - num(pose, "eyebrowHeight", 0) * 0.5 + num(pose, "eyebrowTilt", 0) * 6).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
    <path d="M ${(eyeRX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - num(pose, "eyebrowHeight", 0) * 0.5 - num(pose, "eyebrowTilt", 0) * 6).toFixed(1)} Q ${eyeRX.toFixed(1)} ${(eyeY - eyeR * 2.1 - num(pose, "eyebrowHeight", 0)).toFixed(1)} ${(eyeRX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - num(pose, "eyebrowHeight", 0) * 0.5).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;
  const hair = renderHair(spec, hr, yaw, input.hairLag ?? 0, sw);
  const hand = (p, forearmAngle, side) => {
    const a = rad(forearmAngle);
    const f1 = { x: p.x + Math.cos(a - 0.5) * 16 * side, y: p.y + Math.sin(a - 0.5) * 16 };
    const f2 = { x: p.x + Math.cos(a + 0.45) * 15 * side, y: p.y + Math.sin(a + 0.45) * 15 };
    return `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(body.limbThickness * 0.62).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw()}"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f1.x.toFixed(1)}" y2="${f1.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f2.x.toFixed(1)}" y2="${f2.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>`;
  };
  const lag = input.handLag ?? { x: 0, y: 0 };
  const footY = Math.max(sk.footL.y, sk.footR.y);
  return `
<g id="${id}" transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${(scale * sx).toFixed(4)}, ${(scale * sy).toFixed(4)})" opacity="${alpha}">
  <ellipse cx="0" cy="${(footY + 8).toFixed(1)}" rx="${(body.hipWidth * 1.5).toFixed(1)}" ry="${(body.hipWidth * 0.28).toFixed(1)}" fill="${line}" opacity="0.15"/>

  <g stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- back leg + arm first, so the figure has depth -->
    <path d="M ${sk.hip.x.toFixed(1)} ${hipL().y.toFixed(1)} L ${sk.kneeL.x.toFixed(1)} ${sk.kneeL.y.toFixed(1)} L ${sk.footL.x.toFixed(1)} ${sk.footL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.15)}" opacity="0.75"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.elbowL.x.toFixed(1)} ${sk.elbowL.y.toFixed(1)} L ${sk.handL.x.toFixed(1)} ${sk.handL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.05)}" opacity="0.75"/>
    ${hand({ x: sk.handL.x + lag.x * 0.4, y: sk.handL.y + lag.y * 0.4 }, angleOf(sk.elbowL, sk.handL), -1)}

    <!-- torso -->
    <path d="${torsoPath}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.3)}"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.2)}"/>

    <!-- front leg -->
    <path d="M ${hipR().x.toFixed(1)} ${hipR().y.toFixed(1)} L ${sk.kneeR.x.toFixed(1)} ${sk.kneeR.y.toFixed(1)} L ${sk.footR.x.toFixed(1)} ${sk.footR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>

    <!-- neck -->
    <path d="M ${(sk.neckBase.x - body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x - body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>
    <path d="M ${(sk.neckBase.x + body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x + body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>

    <!-- head -->
    <g transform="translate(${sk.headCenter.x.toFixed(2)}, ${sk.headCenter.y.toFixed(2)}) rotate(${headTilt.toFixed(2)})">
      ${hair.back}
      <ellipse cx="0" cy="0" rx="${(hr * (0.86 + cheek * 0.16) * (body.jawWidth * 0.35 + 0.65)).toFixed(1)}" ry="${(hr * (1.02 + cheek * 0.05)).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.4)}"/>
      ${hair.front}
      <g>${brows}${eyes}${mouth}</g>
    </g>

    <!-- front arm on top -->
    <path d="M ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)} L ${sk.elbowR.x.toFixed(1)} ${sk.elbowR.y.toFixed(1)} L ${sk.handR.x.toFixed(1)} ${sk.handR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>
    ${hand({ x: sk.handR.x + lag.x, y: sk.handR.y + lag.y }, angleOf(sk.elbowR, sk.handR), 1)}
  </g>
</g>`.trim();
  function hipL() {
    return { x: sk.hip.x - body.hipWidth * 0.22, y: sk.hip.y };
  }
  function hipR() {
    return { x: sk.hip.x + body.hipWidth * 0.22, y: sk.hip.y };
  }
}
var angleOf = (a, b) => Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
function renderMouth(shape, w, y, open, spec, sw, cheek) {
  const line = spec.palette.line;
  const h = 4 + open * w * 0.85;
  switch (shape) {
    case "deadpan_line":
      return `<line x1="${-w}" y1="${y}" x2="${w}" y2="${y}" stroke="${line}" stroke-width="${sw(1.6)}" stroke-linecap="round"/>`;
    case "smirk":
      return `<path d="M ${-w} ${y + 2} Q 0 ${y + 6} ${w} ${y - 6}" fill="none" stroke="${line}" stroke-width="${sw(1.6)}" stroke-linecap="round"/>`;
    case "open_o":
      return `<ellipse cx="0" cy="${y + 4}" rx="${w * 0.42}" ry="${h * 0.9}" fill="${spec.palette.mouth}" stroke="${line}" stroke-width="${sw(1.4)}"/>`;
    case "scream":
      return `<ellipse cx="0" cy="${y + 6}" rx="${w * 0.72}" ry="${h * 1.5}" fill="${spec.palette.mouth}" stroke="${line}" stroke-width="${sw(1.6)}"/>
              <ellipse cx="0" cy="${y + h * 1.1}" rx="${w * 0.4}" ry="${h * 0.42}" fill="${spec.palette.tongue}"/>`;
    case "cringe_wavy":
      return `<path d="M ${-w} ${y} Q ${-w / 3} ${y - 7} 0 ${y} Q ${w / 3} ${y + 7} ${w} ${y}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;
    default: {
      const top = y - h / 2;
      return `<path d="M ${-w} ${top} L ${w} ${top + 1} L ${w * 0.9} ${top + h} L ${-w * 0.92} ${top + h - 1} Z" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.4)}" stroke-linejoin="round"/>
              ${h > 12 ? `<line x1="${-w * 0.95}" y1="${y}" x2="${w * 0.93}" y2="${y}" stroke="${line}" stroke-width="${sw(0.6)}" opacity="0.35"/>` : ""}
              ${cheek > 0.6 ? `<path d="M ${w + 3} ${y - 2} q 4 4 0 8" fill="none" stroke="${spec.palette.skinShadow}" stroke-width="${sw(1)}"/>` : ""}`;
    }
  }
}
function renderHair(spec, hr, yaw, lag, sw) {
  const c = spec.palette.hair;
  const v = spec.body.hairVolume;
  const shift = yaw * hr * 0.2 + lag;
  const line = spec.palette.line;
  switch (spec.hair) {
    case "buzz":
      return {
        back: "",
        front: `<path d="M ${-hr * 0.8 + shift} ${-hr * 0.25} A ${hr * 0.85} ${hr * 0.85} 0 0 1 ${hr * 0.8 + shift} ${-hr * 0.25} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`
      };
    case "bald":
      return { back: "", front: "" };
    case "long_wave":
      return {
        back: `<path d="M ${-hr * 0.95 + shift} ${-hr * 0.3} C ${-hr * (1.25 * v) + shift} ${hr * 0.9} ${-hr * 1.1 + shift} ${hr * 2.3} ${-hr * 0.55 + shift} ${hr * 2.5} L ${hr * 0.55 + shift} ${hr * 2.5} C ${hr * 1.1 + shift} ${hr * 2.3} ${hr * (1.25 * v) + shift} ${hr * 0.9} ${hr * 0.95 + shift} ${-hr * 0.3} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}" stroke-linejoin="round"/>`,
        front: `<path d="M ${-hr * 0.88 + shift} ${-hr * 0.18} C ${-hr * 0.7 + shift} ${-hr * 1.15} ${hr * 0.75 + shift} ${-hr * 1.2} ${hr * 0.9 + shift} ${-hr * 0.2} C ${hr * 0.45 + shift} ${-hr * 0.62} ${-hr * 0.2 + shift} ${-hr * 0.5} ${-hr * 0.88 + shift} ${-hr * 0.18} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`
      };
    case "bob":
      return {
        back: `<path d="M ${-hr * 0.98 + shift} ${-hr * 0.2} C ${-hr * 1.15 + shift} ${hr * 0.7} ${-hr * 0.9 + shift} ${hr * 1.15} ${-hr * 0.6 + shift} ${hr * 1.2} L ${hr * 0.6 + shift} ${hr * 1.2} C ${hr * 0.9 + shift} ${hr * 1.15} ${hr * 1.15 + shift} ${hr * 0.7} ${hr * 0.98 + shift} ${-hr * 0.2} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}"/>`,
        front: `<path d="M ${-hr * 0.9 + shift} ${-hr * 0.15} C ${-hr * 0.6 + shift} ${-hr * 1.2} ${hr * 0.8 + shift} ${-hr * 1.15} ${hr * 0.92 + shift} ${-hr * 0.05} C ${hr * 0.3 + shift} ${-hr * 0.55} ${-hr * 0.35 + shift} ${-hr * 0.5} ${-hr * 0.9 + shift} ${-hr * 0.15} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`
      };
    case "mohawk":
      return {
        back: "",
        front: `<path d="M ${-hr * 0.16 + shift} ${-hr * 0.95} C ${-hr * 0.3 + shift} ${-hr * (1.9 * v)} ${hr * 0.3 + shift} ${-hr * (1.9 * v)} ${hr * 0.16 + shift} ${-hr * 0.95} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`
      };
    default:
      return {
        back: `<path d="M ${-hr * 0.92 + shift} ${-hr * 0.1} C ${-hr * 1.05 + shift} ${-hr * 1.05} ${hr * 1.05 + shift} ${-hr * 1.1} ${hr * 0.94 + shift} ${-hr * 0.05} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.2)}"/>`,
        front: `<path d="M ${-hr * 0.9 + shift} ${-hr * 0.12} C ${-hr * 0.55 + shift} ${-hr * 1.18} ${hr * 0.85 + shift} ${-hr * 1.05} ${hr * 0.9 + shift} ${-hr * 0.25} C ${hr * 0.35 + shift} ${-hr * 0.72} ${-hr * 0.15 + shift} ${-hr * 0.62} ${-hr * 0.9 + shift} ${-hr * 0.12} Z" fill="${c}" stroke="${line}" stroke-width="${sw(1.1)}"/>`
      };
  }
}

// src/audio/Envelope.ts
function amplitudeAt(env, t) {
  if (t < 0) return 0;
  const idx = t / env.hop;
  const i = Math.floor(idx);
  if (i >= env.values.length - 1) return env.values[env.values.length - 1] ?? 0;
  const f = idx - i;
  return env.values[i] * (1 - f) + env.values[i + 1] * f;
}
function mouthOpenAt(env, t, opts = {}) {
  const gain = opts.gain ?? 1.6;
  const floor = opts.noiseFloor ?? 0.045;
  const smooth = opts.smoothing ?? 0.035;
  const sample = (x) => {
    const a = amplitudeAt(env, x);
    return Math.max(0, (a - floor) / Math.max(1e-3, 1 - floor));
  };
  let sum = 0;
  let n = 0;
  for (let k = -2; k <= 2; k++) {
    sum += sample(t + k * smooth / 2);
    n++;
  }
  const avg = Math.max(0, sum / n);
  const shaped = avg * avg * (3 - 2 * avg);
  return Math.max(0, Math.min(1, shaped * gain));
}
function isSpeakingAt(env, t, threshold = 0.06) {
  return amplitudeAt(env, t) > threshold;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 1831565813 >>> 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function buildBlinkPlan(seed, duration) {
  const rnd = mulberry32(Math.floor(seed * 1e9) || 1);
  const starts = [];
  let t = 0.8 + rnd() * 2.2;
  while (t < duration) {
    starts.push(t);
    if (rnd() < 0.18) t += 0.32;
    else t += 1.6 + rnd() * 4.8;
  }
  return { starts, close: 0.055, hold: 0.035, open: 0.09 };
}
function blinkAmountAt(plan, t) {
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

// src/engine/RenderEngine.ts
var esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var phaseOf = (id, seed) => seed * Math.PI * 2 + id.length * 0.7;
function backgroundFor(t, sceneLabel, w = 1920, h = 1080) {
  const drift = Math.sin(t * 0.12) * 12;
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eef2f7"/>
    </linearGradient>
  </defs>
  <rect x="-4000" y="-4000" width="10000" height="10000" fill="url(#sky)"/>
  <rect x="-4000" y="${(h * 0.78).toFixed(0)}" width="10000" height="6000" fill="#e6ebf2"/>
  <line x1="-4000" y1="${(h * 0.78).toFixed(0)}" x2="10000" y2="${(h * 0.78).toFixed(0)}" stroke="#cbd5e1" stroke-width="3"/>
  <g opacity="0.5">
    <circle cx="${(240 + drift).toFixed(1)}" cy="${(h * 0.3).toFixed(0)}" r="120" fill="#e2e8f0"/>
    <circle cx="${(1700 - drift).toFixed(1)}" cy="${(h * 0.24).toFixed(0)}" r="170" fill="#e8edf4"/>
  </g>
  <title>${esc(sceneLabel)}</title>`;
}
function subtitleLayer(t, transcript, w = 1920, h = 1080) {
  const active = transcript.words.find((c) => t >= c.start && t <= c.end);
  if (!active) return "";
  const sentence = transcript.sentences[active.sentenceIndex];
  if (!sentence) return "";
  const parts = sentence.words.map((wd) => {
    const on = wd.i === active.i;
    return `<tspan ${on ? 'fill="#0f172a" font-weight="700"' : 'fill="#475569"'}>${esc(wd.text)} </tspan>`;
  });
  return `
  <g id="subtitles">
    <text x="${w / 2}" y="${h - 74}" text-anchor="middle" font-family="Noto Sans, DejaVu Sans, sans-serif" font-size="46" fill="#475569">${parts.join("")}</text>
  </g>`;
}
var impactCache = null;
function impactsFor(plan) {
  if (impactCache && impactCache.key === plan) return impactCache.impacts;
  const impacts = [];
  for (const ev of plan.events) {
    if (ev.kind !== "flash") continue;
    const pl = ev.payload;
    impacts.push({
      t: ev.t,
      strength: typeof pl.strength === "number" ? pl.strength : 0.4,
      decay: typeof pl.decay === "number" ? pl.decay : 0.34,
      flash: pl.flash === true
    });
  }
  impactCache = { key: plan, impacts };
  return impacts;
}
function renderFrame(engine, t) {
  const { plan, perf, transcript, envelope, specs, blinkPlans } = engine;
  const width = engine.width ?? 1280;
  const height = engine.height ?? 720;
  const fps = engine.fps ?? 24;
  const hostId = engine.hostId ?? "host";
  const basePose = cameraAt(plan.resolved, t);
  const impacts = impactsFor(plan);
  const trauma = traumaAt(impacts, t);
  const shake = shakeAt(trauma, t, 1 + basePose.zoom);
  const flash = flashAt(impacts, t);
  const pose = {
    ...basePose,
    centerX: basePose.centerX + shake.x / Math.max(0.2, basePose.zoom),
    centerY: basePose.centerY + shake.y / Math.max(0.2, basePose.zoom)
  };
  const viewBox = viewBoxFor(pose, 1920, 1080);
  const scale = pxPerUnit(pose, width, 1920);
  const scene = plan.scenes.find((s) => t >= s.start && t < s.end) ?? plan.scenes[plan.scenes.length - 1];
  const dt = 1 / fps;
  const speaking = envelope ? isSpeakingAt(envelope, t) : false;
  const mouth = envelope ? mouthOpenAt(envelope, t) : 0;
  const figures = [];
  const ids = /* @__PURE__ */ new Set([hostId, ...perf.ids]);
  for (const id of ids) {
    const spec = specs[id] ?? specs["default"];
    if (!spec) continue;
    const presence = perf.presenceAt(id, t);
    if (presence <= 1e-3) continue;
    const vbNums = viewBox.split(/[ ,]+/).map(Number);
    const home = perf.homeAt(id);
    if (home[0] < vbNums[0] - 320 || home[0] > vbNums[0] + vbNums[2] + 320 || home[1] < vbNums[1] - 520 || home[1] > vbNums[1] + vbNums[3] + 420) continue;
    const authored = perf.poseAt(id, t);
    const blinkPlan = blinkPlans[id];
    const ph = phaseOf(id, spec.phaseSeed);
    const breath = Math.sin(t * 1.05 + ph) * 0.5 + 0.5;
    const sway = Math.sin(t * 0.47 + ph * 1.7);
    const armDrift = Math.sin(t * 0.72 + ph * 2.3);
    const life = {
      ...authored,
      scale: (typeof authored.scale === "number" ? authored.scale : 1) * (0.72 + 0.28 * presence),
      alpha: presence,
      chestRise: breath * 4.2,
      bodySway: sway * 3.4,
      leftArmAngle1: (typeof authored.leftArmAngle1 === "number" ? authored.leftArmAngle1 : 150) + armDrift * 1.9,
      rightArmAngle1: (typeof authored.rightArmAngle1 === "number" ? authored.rightArmAngle1 : 30) - armDrift * 1.6,
      headTilt: (typeof authored.headTilt === "number" ? authored.headTilt : 0) + breath * 1.1 + sway * 0.8,
      mouthOpen: id === hostId && speaking ? mouth : typeof authored.mouthOpen === "number" ? authored.mouthOpen : 0,
      // A tiny bob only while actually voicing, scaled by real amplitude.
      y: (typeof authored.y === "number" ? authored.y : 672) + (speaking && id === hostId ? mouth * 2.4 : 0)
    };
    const sec = secondaryMotion((tt) => perf.poseAt(id, tt), t, dt);
    const blink = blinkPlan ? blinkAmountAt(blinkPlan, t) : 0;
    figures.push(
      renderRig({
        id,
        spec,
        body: perf.bodyAt(id, t),
        pose: life,
        pxPerUnit: scale,
        strokePx: 3.4,
        headLag: sec.headLag,
        handLag: sec.handLag,
        hairLag: sec.hairLag,
        mouthDrive: life.mouthOpen,
        blinkAmount: blink
      })
    );
  }
  const vb = viewBox.split(/[ ,]+/).map(Number);
  const cx = vb[0] + vb[2] / 2;
  const cy = vb[1] + vb[3] / 2;
  const rot = shake.rot;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <g transform="rotate(${rot.toFixed(3)} ${cx.toFixed(1)} ${cy.toFixed(1)})">
  ${backgroundFor(t, scene?.label ?? "scene")}
  <g id="characters">${figures.join("\n")}</g>
  </g>
  ${subtitleLayer(t, transcript)}
  ${flash > 2e-3 ? `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#ffffff" opacity="${flash.toFixed(3)}"/>` : ""}
</svg>`;
  return {
    svg,
    viewBox,
    zoom: pose.zoom,
    sceneId: String(scene?.label ?? "scene"),
    trauma,
    subtitle: wordAt(transcript.words, t)?.text ?? ""
  };
}

// scripts/engine-bootstrap.ts
var HAIRS = ["long_wave", "bob", "short_swoop", "bun"];
function loadSpecs(root, ids) {
  const specs = {
    host: makeSpec("host", "Host", { body: { ...BODY_PRESETS.average }, hair: "short_swoop" }),
    default: makeSpec("default", "Extra", {})
  };
  const dir = path.join(root, "characters");
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        const id = raw.id ?? path.basename(f, ".json");
        specs[id] = { ...makeSpec(id, raw.displayName ?? id), ...raw };
      } catch (err) {
        console.warn(`[specs] skipping ${f}: ${err.message}`);
      }
    }
  }
  for (const id of ids) {
    if (specs[id]) continue;
    const seed = hashSeed(id);
    const body = seed > 0.66 ? BODY_PRESETS.lean : seed > 0.33 ? BODY_PRESETS.hourglass : BODY_PRESETS.average;
    specs[id] = makeSpec(id, id, {
      hair: HAIRS[Math.floor(seed * HAIRS.length) % HAIRS.length],
      body: { ...body }
    });
  }
  return specs;
}
function createEngine(root, opts = {}) {
  const fps = opts.fps ?? 24;
  const srtFile = [
    path.join(root, "public/0-chapter-1.srt"),
    path.join(root, "public/subtitles.srt"),
    path.join(root, "public/new_chapter_1_full.srt")
  ].find((p) => fs.existsSync(p));
  if (!srtFile) throw new Error("no SRT found in public/");
  const cues = parseSrt(fs.readFileSync(srtFile, "utf8"));
  const transcript = buildTranscript(cues);
  const envPath = path.join(root, "public/envelope.json");
  let envelope = null;
  if (fs.existsSync(envPath)) {
    const raw = JSON.parse(fs.readFileSync(envPath, "utf8"));
    envelope = { hop: raw.hop, values: raw.values, sampleRate: raw.sampleRate };
  } else {
    console.warn("[engine] no public/envelope.json - lip-sync falls back to pose defaults");
  }
  const plan = direct(transcript, { fps });
  const perf = buildPerformance(plan, { hostId: "host" });
  const specs = loadSpecs(root, perf.ids);
  const blinkPlans = {};
  for (const id of /* @__PURE__ */ new Set(["host", ...perf.ids])) {
    blinkPlans[id] = buildBlinkPlan(hashSeed(id), transcript.duration + 1);
  }
  const engine = {
    plan,
    perf,
    transcript,
    envelope,
    specs,
    blinkPlans,
    hostId: "host",
    width: 1280,
    height: 720,
    fps
  };
  return {
    engine,
    plan,
    transcript,
    perf,
    duration: transcript.duration,
    frame: (t) => renderFrame(engine, t),
    cameraScaleAt: (t, renderWidth) => pxPerUnitAt(plan, t, renderWidth)
  };
}
function pxPerUnitAt(plan, t, renderWidth) {
  const pose = cameraAt(plan.resolved, t);
  const vb = viewBoxFor(pose, 1920, 1080).split(/[ ,]+/).map(Number);
  return vb[2] > 0 ? renderWidth / vb[2] : 1;
}
export {
  createEngine
};
