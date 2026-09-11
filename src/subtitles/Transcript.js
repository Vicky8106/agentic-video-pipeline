/**
 * Transcript normalisation and word-level timing.
 *
 * 1. The source SRT carries double-encoded UTF-8: the bytes of a UTF-8
 *    sequence were decoded as CP1252 and re-encoded as UTF-8, so U+2019 shows
 *    up as the three characters "â€™". The old code patched this with a
 *    hardcoded list of this one transcript's phrases, which fails silently on
 *    any new input. Here it is reversed algorithmically.
 *
 * 2. SRT cues are ~3 second blocks, but auto-directing must fire a beat *on a
 *    word*. Word timings come from weighted allocation inside each cue:
 *    deterministic, and accurate enough to place a cut within a couple of
 *    frames.
 */
/** Unicode punctuation that CP1252 places in the 0x80-0x9F range. */
const CP1252_HIGH = {
    0x20ac: 0x80, 0x0192: 0x83, 0x201a: 0x82, 0x201e: 0x84, 0x2026: 0x85,
    0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
    0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
    0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
    0x017e: 0x9e, 0x0178: 0x9f,
};
/**
 * Reverse a CP1252 mis-decoding of UTF-8 bytes. Returns the repaired string,
 * or the input unchanged when it is not a mojibake sequence.
 */
export function repairMojibake(input) {
    if (!/[ÂÃâ€]/.test(input))
        return input;
    const bytes = [];
    for (const ch of input) {
        const cp = ch.codePointAt(0) ?? 0;
        if (cp < 0x100) {
            bytes.push(cp);
        }
        else {
            const mapped = CP1252_HIGH[cp];
            if (mapped === undefined)
                return input;
            bytes.push(mapped);
        }
    }
    try {
        const decoded = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
        return decoded.length <= input.length ? decoded : input;
    }
    catch {
        return input;
    }
}
/** Split words glued together by the transcript source. */
export function splitGluedWords(input) {
    return input
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
        .replace(/(\d)([a-zA-Z])/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim();
}
/**
 * Split a glued leading function word. The transcript source sometimes drops
 * the space after a short opener ("Ifyou've", "Andthen", "Thetimeline"), which
 * has no case boundary for splitGluedWords to find.
 */
const FUNCTION_OPENERS = [
    "if", "in", "the", "a", "an", "it", "is", "was", "we", "you", "they", "this",
    "that", "there", "here", "when", "what", "why", "how", "but", "and", "or",
    "so", "as", "at", "on", "to", "of", "by", "for", "from", "with", "he", "she",
];
export function splitLeadingFunctionWords(input, vocabulary) {
    return input
        .split(" ")
        .map((word) => {
        const stripped = word.replace(/^["'“”‘’]+/, "");
        const lower = stripped.toLowerCase();
        for (const opener of FUNCTION_OPENERS) {
            if (lower.length > opener.length + 2 && lower.startsWith(opener)) {
                const head = stripped.slice(0, opener.length);
                const tail = stripped.slice(opener.length);
                if (!/^[a-z][a-z'’]*$/.test(tail))
                    continue;
                // Guard against inventing non-words: "Instagram" would otherwise
                // become "In stagram". Require the tail to be a real word here.
                if (vocabulary && !vocabulary.has(tail.toLowerCase().replace(/['’]$/, "")))
                    continue;
                return `${head} ${tail}`;
            }
        }
        return word;
    })
        .join(" ");
}
/** Full normalisation pipeline for one cue's text. */
export function normalizeCueText(raw, vocabulary) {
    let t = repairMojibake(raw);
    t = t.replace(/—/g, " - ").replace(/–/g, " - ");
    // Unify curly apostrophes so "you've you’ve" collapses below.
    t = t.replace(/[‘’]/g, "'");
    t = splitGluedWords(t);
    t = splitLeadingFunctionWords(t, vocabulary);
    t = t.replace(/^[\s,;:!.\-–—"']+(?=\S)/, "").trim();
    t = t.replace(/\b(\w+(?:'\w+)?)\s+\1\b/gi, "$1");
    return t.replace(/\s+/g, " ").trim();
}
/** Relative speaking duration: longer words take longer, punctuation pauses. */
function wordWeight(surface) {
    const core = surface.replace(/[^\p{L}\p{N}']/gu, "");
    let w = Math.max(1, core.length) * 0.062;
    if (/[,.]$/.test(surface))
        w += 0.11;
    if (/[!?]$/.test(surface))
        w += 0.19;
    if (/^-/.test(surface))
        w += 0.05;
    if (/^[A-Z$%£]/.test(core) && core.length > 1)
        w += 0.03;
    return w;
}
/**
 * Build word-level timings from cues. A cue's duration is distributed across
 * its words by weight; the gap to the next cue is given to the last word as a
 * hold, so cuts land during the pause rather than on the next syllable.
 */
export function buildWordTimings(cues) {
    const words = [];
    let ordinal = 0;
    let sentenceIndex = 0;
    let pendingStart = false;
    // Pass 1: gather the words that genuinely stand alone in this transcript.
    const vocabulary = new Set();
    for (const cue of cues) {
        for (const raw of (cue.cleanText || cue.text).split(/\s+/)) {
            const core = raw.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^\p{L}\p{N}']/gu, "");
            if (core.length > 1)
                vocabulary.add(core);
        }
    }
    for (let c = 0; c < cues.length; c++) {
        const cue = cues[c];
        const surface = normalizeCueText(cue.cleanText || cue.text, vocabulary);
        if (!surface)
            continue;
        const surfaces = surface.split(" ").filter((s) => s.length > 0);
        const weights = surfaces.map(wordWeight);
        const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;
        const nextStart = c + 1 < cues.length ? cues[c + 1].start : cue.end;
        const available = Math.max(0.05, nextStart - cue.start);
        let cursor = cue.start;
        surfaces.forEach((sf, i) => {
            const dur = (weights[i] / totalWeight) * available;
            const core = sf.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
            const sentenceEnd = /[.!?]["')\]]?$/.test(sf);
            words.push({
                text: sf, token: core,
                start: cursor, end: cursor + dur,
                cueIndex: c, sentenceIndex,
                sentenceEnd,
                sentenceStart: pendingStart,
                indexInCue: i, i: ordinal++,
            });
            cursor += dur;
            if (sentenceEnd)
                sentenceIndex++;
            pendingStart = sentenceEnd;
        });
    }
    return words;
}
/** Group words into sentences, preserving timing. */
export function buildSentences(words) {
    const out = [];
    let bucket = [];
    const flush = () => {
        if (bucket.length === 0)
            return;
        out.push({
            index: out.length,
            start: bucket[0].start,
            end: bucket[bucket.length - 1].end,
            words: [...bucket],
            text: bucket.map((w) => w.text).join(" "),
        });
        bucket = [];
    };
    for (const w of words) {
        bucket.push(w);
        if (w.sentenceEnd)
            flush();
    }
    flush();
    return out;
}
/** Binary search for the word active at time `t`. */
export function wordAt(words, t) {
    if (words.length === 0)
        return null;
    let lo = 0;
    let hi = words.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const w = words[mid];
        if (t < w.start)
            hi = mid - 1;
        else if (t >= w.end)
            lo = mid + 1;
        else
            return w;
    }
    return null;
}
export function buildTranscript(cues) {
    const words = buildWordTimings(cues);
    const sentences = buildSentences(words);
    const duration = words.length > 0 ? words[words.length - 1].end : 0;
    return { cues, words, sentences, duration, text: words.map((w) => w.text).join(" ") };
}
