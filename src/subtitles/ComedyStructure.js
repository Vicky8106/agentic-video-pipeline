const norm = (s) => s.toLowerCase();
const wordCount = (s) => s.words.length;
const PIVOTS = /\b(but|however|actually|suddenly|except|until|then|literally|somehow|meanwhile|instead|yet|though)\b/i;
const INTENSIFIERS = /\b(very|really|so|absolutely|completely|totally|entirely|increasingly|even|already)\b/i;
const QUESTION = /\?/;
const EXCLAIM = /!/;
const POSITIVE = new Set("love,great,awesome,beautiful,genius,perfect,amazing,best,win,happy,glad,delight,brilliant,fantastic".split(","));
const NEGATIVE = new Set("hate,terrible,horrible,awful,worst,fail,stupid,dumb,destroyed,lose,ugly,disaster,mistake,wrong,bad,awful".split(","));
function sentiment(text) {
    const toks = norm(text).replace(/[^a-z' ]/g, " ").split(/\s+/);
    let s = 0;
    for (const t of toks) {
        if (POSITIVE.has(t))
            s += 1;
        if (NEGATIVE.has(t))
            s -= 1;
    }
    return s;
}
const STOP_ENT = new Set(("i,you,he,she,we,they,it,this,that,there,here,what,when,where,who,why,how,and,but,for,with,from,about,into,over,after,before,the,a,an,my,your,his,her,our,their,its,me,him,us,them,do,does,did,is,are,was,were,have,has,had,will,would,can,could,should,just,like,really,very,more,most,some,any,all,no,not,so,then,than,now,also,even,still,one,two,every,always,never," +
    "suddenly,overnight,entirely,exactly,because,while,though,until,right,highly,heavily,quickly,collectively,directly,basically,generally,usually,often,almost,quite,rather,together,across,around,supposed,sudden,whole,away,back,down,out,off,up,again,once,twice,first,last,next,other,another,such,only,own,same,much,many,few,lot,kind,sort,part,side,bit,thing,stuff,place,time,times,day,days,way,lot").split(","));
/** Candidate entity tokens from a sentence (surface forms). */
export function entitiesIn(text, sentenceStart) {
    const out = [];
    const seen = new Set();
    // Quoted anchors are deliberate ("Thicc", "stick").
    for (const m of text.matchAll(/["“]([A-Za-z][A-Za-z0-9' -]{2,})["”]/g)) {
        const c = m[1].trim().toLowerCase();
        if (c && !seen.has(c)) {
            seen.add(c);
            out.push(c);
        }
    }
    for (const raw of text.split(/[^A-Za-z0-9'’-]+/)) {
        if (!raw)
            continue;
        const core = raw.replace(/^['"“”‘’]+|['"“”‘’]+$/g, "");
        if (core.length < 3)
            continue;
        const lower = core.toLowerCase();
        if (STOP_ENT.has(lower) || seen.has(lower))
            continue;
        // Long -ly adverbs are never entities ("affectionately").
        if (/[a-z]{3,}ly$/.test(lower) && lower.length > 8)
            continue;
        // Reflexives are never entities ("themselves").
        if (/^(myself|yourself|himself|herself|itself|ourselves|themselves)$/.test(lower))
            continue;
        // Fused transcript garbage ("likethey're", "yourfriend's").
        if (/^[a-z]+'[a-z]+$/.test(lower) && lower.length > 8)
            continue;
        const capitalized = /^[A-Z]/.test(core);
        // Capitalized mid-sentence = name; sentence-initial capitals need a
        // second sighting (handled by frequency counting in analyze()).
        if (capitalized || lower.length >= 5) {
            seen.add(lower);
            out.push(lower);
        }
    }
    void sentenceStart;
    return out;
}
const ROOMS = [
    [/\b(gym|deadlift|barbell|weights|treadmill|locker room)\b/i, "BG-GYM"],
    [/\b(park|bench|pond|playground|picnic)\b/i, "BG-PARK"],
    [/\b(hollywood|red carpet|premiere|oscar|studio lot)\b/i, "BG-HOLLYWOOD"],
    [/\b(office|cubicle|startup|tech bro|browser|saas)\b/i, "BG-OFFICE"],
    [/\b(clinic|hospital|surgery|doctor'?s office|pharmacy)\b/i, "BG-CLINIC"],
    [/\b(court|courtroom|judge|tribunal|trial)\b/i, "BG-TRIBUNAL"],
    // NOTE: bare "bar" excluded — deadlift bars live in gyms, not kitchens.
    [/\b(kitchen|restaurant|diner|cafe|coffee shop)\b/i, "BG-KITCHEN"],
    [/\b(cinema|theater|movie screen)\b/i, "BG-CINEMA"],
    [/\b(court|courtroom|tribunal|trial|lawsuit)\b/i, "BG-TRIBUNAL"],
    [/\b(retro|ps1|videogame|arcade)\b/i, "BG-RETRO"],
    [/\b(subscribe|outro|goodbye|the end)\b/i, "BG-END"],
    [/\b(classroom|school|campus)\b/i, "BG-STUDIO"],
];
function roomFor(text) {
    for (const [re, bg] of ROOMS)
        if (re.test(text))
            return bg;
    return null;
}
function zeroEvidence() {
    return { rhythm: 0, pivot: 0, terminal: 0, flip: 0, callback: 0, ruleOfThree: 0, total: 0 };
}
/** Score one sentence as a punchline candidate inside its unit. */
function scorePunch(s, si, unit, seenPhrases, isScriptCloser = false) {
    const e = zeroEvidence();
    const n = wordCount(s);
    const prev = si > 0 ? wordCount(unit[si - 1]) : n;
    // Rhythm: short after long. The classic windup -> jab shape, absolute
    // and relative (a 12-word windup licenses an 8-word jab; 10 licenses 6).
    if (prev >= 12 && n <= 8)
        e.rhythm = 2;
    else if (prev >= 10 && n <= 6)
        e.rhythm = 2;
    else if (prev >= 8 && n <= Math.max(4, Math.floor(prev * 0.6)))
        e.rhythm = 1;
    else if (n <= 5 && si === unit.length - 1 && unit.length > 1)
        e.rhythm = 1;
    if (PIVOTS.test(s.text))
        e.pivot = 2;
    if (EXCLAIM.test(s.text))
        e.terminal = 2;
    else if (QUESTION.test(s.text))
        e.terminal = 1;
    // Closers land: the final button of the script punches by position.
    if (isScriptCloser && wordCount(s) <= 10)
        e.terminal += 2;
    // Call/response: question just before + this answers it.
    if (si > 0 && QUESTION.test(unit[si - 1].text) && !QUESTION.test(s.text))
        e.terminal += 1;
    // Sentiment flip against the unit's run-up.
    if (si > 0) {
        const before = sentiment(unit.slice(0, si).map((x) => x.text).join(" "));
        const now = sentiment(s.text);
        if (before !== 0 && now !== 0 && Math.sign(before) !== Math.sign(now))
            e.flip = 2;
        else if (before === 0 && Math.abs(now) >= 2)
            e.flip = 1;
    }
    // Callback: content phrase repeats an earlier unit's wording.
    const toks = norm(s.text).replace(/[^a-z ]/g, " ").split(/\s+/).filter((t) => t.length > 4);
    for (let k = 0; k < toks.length - 1; k++) {
        if (seenPhrases.has(`${toks[k]} ${toks[k + 1]}`)) {
            e.callback = 2;
            break;
        }
    }
    // Rule of three: third comma-item sentence terminates.
    if (si === 2 && unit.length === 3)
        e.ruleOfThree = 1;
    e.total = e.rhythm + e.pivot + e.terminal + e.flip + e.callback + e.ruleOfThree;
    return e;
}
/** The exact word the punch lands on: number > pivot > contrast > final noun. */
function pickPunchWord(s) {
    const words = s.words;
    if (words.length === 0)
        return null;
    // Numbers punch only when substantial ($24, 90s, 18%) — never a lone digit.
    const num = words.find((w) => /\d/.test(w.text) && w.text.replace(/[^0-9]/g, "").length >= 2);
    if (num)
        return num.text;
    const piv = words.find((w) => PIVOTS.test(w.token));
    const quoted = words.find((w) => /["“”]/.test(w.text));
    if (quoted)
        return quoted.text;
    // Final content word: punches land at the end of the thought.
    for (let i = words.length - 1; i >= 0; i--) {
        const core = words[i].token;
        if (core.length >= 4 && !STOP_ENT.has(core))
            return words[i].text;
    }
    void piv;
    return words[words.length - 1].text;
}
/**
 * Segment sentences into joke units: accumulate until a punch lands or the
 * window runs long (~15s), then cut. Longest unit cap keeps epics moving.
 */
export function analyzeComedy(tr) {
    const notes = new Map();
    const units = [];
    const seenPhrases = new Set();
    const freq = new Map();
    for (const s of tr.sentences) {
        for (const e of entitiesIn(s.text, true))
            freq.set(e, (freq.get(e) ?? 0) + 1);
    }
    let cur = [];
    let room = null;
    const flush = () => {
        if (cur.length === 0)
            return;
        // Punch = best scorer, biased to the end (ties break later).
        let best = 0;
        let bestScore = -1;
        const lastIdx = tr.sentences.length - 1;
        const evs = cur.map((s, i) => scorePunch(s, i, cur, seenPhrases, s.index === lastIdx));
        evs.forEach((e, i) => {
            const v = e.total + i * 0.15;
            if (v > bestScore) {
                bestScore = v;
                best = i;
            }
        });
        const punch = cur[best];
        const punchWord = bestScore >= 2 ? pickPunchWord(punch) : null;
        // Keep entities seen twice in the unit, or twice in the whole script
        // (kills sentence-initial capitalized common words on first sighting).
        const ents = new Map();
        for (const s of cur) {
            for (const e of entitiesIn(s.text, true))
                ents.set(e, (ents.get(e) ?? 0) + 1);
        }
        // Distinctive long nouns survive on a single sighting (the ranger who
        // enters once still needs casting); sort count-first, length-second.
        const entities = [...ents.entries()]
            .filter(([e, c]) => c >= 2 || (freq.get(e) ?? 0) >= 2 || e.length >= 6)
            .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
            .map(([e]) => e)
            .slice(0, 4);
        for (const s of cur) {
            const toks = norm(s.text).replace(/[^a-z ]/g, " ").split(/\s+/).filter((t) => t.length > 4);
            for (let k = 0; k < toks.length - 1; k++)
                seenPhrases.add(`${toks[k]} ${toks[k + 1]}`);
        }
        const unitRoom = roomFor(cur.map((s) => s.text).join(" ")) ?? room;
        room = unitRoom;
        const setupEnd = best > 0 ? cur[best].start : cur[cur.length - 1].end;
        cur.forEach((s, i) => {
            // First breath is setup; the run-up tightens into escalation; the
            // scored sentence is the punchline. Anything after it (rare) resets.
            const role = i === best ? "punchline"
                : i === 0 ? "setup"
                    : i < best ? (INTENSIFIERS.test(s.text) || best - i <= 1 ? "escalation" : "setup")
                        : "setup";
            const energy = 0.3 + Math.min(0.5, evs[i].total * 0.12) + (i === best ? 0.15 : 0);
            notes.set(s.index, {
                sentenceIndex: s.index,
                role,
                punchWord: i === best ? punchWord : null,
                evidence: evs[i],
                energy: Math.min(1, energy),
                entities,
            });
        });
        units.push({
            id: units.length,
            start: cur[0].start,
            end: cur[cur.length - 1].end,
            sentences: cur.map((s) => s.index),
            setupEnd,
            punchSentence: punch.index,
            punchWord,
            entities,
            room: unitRoom,
        });
        cur = [];
    };
    for (const s of tr.sentences) {
        const prev = cur[cur.length - 1];
        const gap = prev ? s.start - prev.end : 0;
        // Joke cycles run ~10-12s: cut the unit before the next setup starts.
        if (prev && (gap > 1.2 || s.start - cur[0].start > 12))
            flush();
        cur.push(s);
        // Hard punch signals close the unit immediately.
        if (EXCLAIM.test(s.text) || (PIVOTS.test(s.text) && wordCount(s) <= 10))
            flush();
    }
    flush();
    return { units, notes };
}
