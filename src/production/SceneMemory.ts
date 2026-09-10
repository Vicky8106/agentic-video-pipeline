/**
 * SceneMemory — the persistent stage.
 *
 * The #1 reason long renders degenerate into slideshows: every frame is
 * rendered statelessly, so nothing on stage accumulates, interacts, or
 * leaves. Real animation has continuity — objects enter, persist, get
 * referenced again, stack up, and exit.
 *
 * This module maintains a deterministic list of stage objects derived from
 * the production beats. Given any time t it returns the objects that should
 * be on stage, each with an entry animation phase, an idle life phase
 * (bob, pulse, jitter), and an exit phase. It is a pure function of the
 * beat list: no mutable state crosses frames, so chunked/parallel rendering
 * stays bit-exact.
 */

export interface StageBeat {
  id: string;
  start: number;
  end: number;
  semantic: string; // the sentence text that spawned it
  topic: string; // money | body | compare | process | problem | device | person | explain
  energy: number;
  role: string;
}

export interface StageObject {
  key: string;
  /** Concept label, e.g. "ozempic", "carbs", "$1000". */
  concept: string;
  /** Coarse visual family for the style pack to draw. */
  kind: "money" | "food" | "device" | "body" | "chart" | "person" | "pill" | "sign" | "vehicle" | "object" | "generic";
  spawnAt: number;
  retireAt: number; // when fade-out begins
  x: number; // design-canvas coords (1920x1080)
  y: number;
  scale: number;
  energy: number;
  /** Index within the current cluster (0 = first object). */
  slot: number;
  beatId: string;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Concept extraction: pull the joke nouns out of a sentence, deterministically. */
const STOP = new Set([
  "the", "a", "an", "and", "or", "but", "if", "of", "to", "in", "on", "for",
  "with", "from", "have", "has", "had", "you", "your", "they", "their", "we",
  "our", "it", "its", "is", "are", "was", "were", "be", "been", "this", "that",
  "these", "those", "as", "at", "by", "not", "so", "than", "then", "there",
  "here", "just", "like", "really", "thing", "things", "some", "more", "most",
  "into", "about", "would", "could", "should", "because", "what", "when",
  "which", "who", "how", "why", "all", "any", "can", "will", "who've", "you've",
  "i've", "we've", "i'm", "you're", "they're", "it's", "he's", "she's", "i",
  "me", "my", "him", "he", "she", "her", "us", "them", "do", "does", "did",
  "going", "gone", "get", "got", "getting", "one", "two", "look", "looks",
  "looking", "see", "seen", "know", "think", "said", "says", "even", "also",
  "still", "yet", "new", "old", "way", "lot", "bit", "kind", "sort", "made",
  "make", "makes", "take", "takes", "took", "come", "came", "go", "goes",
  "went", "time", "times", "day", "days", "year", "years", "people", "person",
  "where", "everywhere", "anywhere", "somehow", "anyway", "anytime", "always",
  "never", "something", "nothing", "everything", "someone", "nobody", "every",
  "seems", "seem", "seemed", "suddenly", "overnight", "entire", "whole",
  "fundamental", "concept", "shift", "local", "ecosystem", "understanding",
  "direction", "situation", "consequence", "importance", "point", "issue",
  "different", "difference", "marketing", "aspect", "factor", "reason",
  "basically", "literally", "obviously", "apparently", "technically", "meanwhile",
  "right", "where", "look", "looks", "looking", "started", "starts", "start",
  "once", "before", "after", "now", "then", "soon", "that's", "they've", "idon't",
  "they", "them", "their", "there", "these", "those", "thing", "things", "tube",
  "imagine", "single", "secondary", "someone", "nobody", "everybody", "everyone",
]);

const KIND_RULES: Array<[RegExp, StageObject["kind"]]> = [
  [/(\$\d|dollars?\b|money|cost|price|pricing|million|billion|budget|receipt|invoice|subscription|economic|revenue|wheelbarrow|gold|billionaire|salary|wage|rent|wealth|rich|bank|wallet|crypto|bitcoin|cash|finance)/i, "money"],
  [/(ozempic|glp-?1|wegovy|injection|inject|syringe|pill|drug|medication|pharma|dose|botox|treatment|procedure|surgery|surgical|scalpel|trt|testosterone|pharmaceutical|vaccine|hospital|clinic|therapy|prescription|vitamin|cure)/i, "pill"],
  [/(carbs?\b|carbohydrate|bread|pasta|pizza|lunch|food|snack|diet|coke|calorie|meal|chicken|broccoli|sugar|baguette|cracker|saltine|ham|supermarket|celery|burger|coffee|beer|wine|tea|drink|dinner|breakfast|cake|cheese|restaurant|bar)/i, "food"],
  [/(phone|instagram|tiktok|tweet|\bapp\b|screen|feed|online|website|computer|laptop|notification|camera|terminal|code|prompt|battery|lithium|charge|dial-?up|internet|y2k|software|ai\b|bot|wifi|keyboard|console|steam|gaming|vr|display)/i, "device"],
  [/(car\b|tesla|vehicle|automobile|truck|bike|bicycle|motorcycle|plane|airplane|flight|rocket|spaceship|train|bus|ship|boat|helicopter)/i, "vehicle"],
  [/(body|weight|fat|thin|leaner|skin|face|jaw|cheek|muscle|stomach|butt|hourglass|appearance|beauty|figure|buccal|cheekbone|dehydration|shredded|hollow|skull|forehead|silhouette|organ|jeans|skirt|belt|abs|posture|fitness|gym|workout)/i, "body"],
  [/(chart|graph|percent|%|trend|\bdata\b|number|stats|statistics|increase|decrease|drop|spike|survey|study|slider|velocity|hud|rpg|creator|metrics|growth|crash|score|target|index)/i, "chart"],
  [/(celebrity|actor|actress|\bstar\b|influencer|hollywood|jenna|ortega|emma|stone|ariana|grande|kate|moss|\btim\b|burton|marvel|superhero|butler|doctor|surgeon|paparazzi|\bbro\b|\bguy\b|\bgirl\b|\bmom\b|\bdad\b|\bkid\b|crowd|boss|mourner|wednesday|pixar|physician|friend|girlfriend|boyfriend|teacher|student|police|cop|lawyer|judge|scientist|politician|president|customer|developer)/i, "person"],
  [/(rule|law|ban|policy|warning|notice|sign|deadline|contract|terms|nda|statement|headline|news|banner|badge|asterisk|fine\s*print|siren|modal|standards?|license|document|certificate|award|agreement)/i, "sign"],
  [/(book|clock|time|watch|timer|hammer|tool|microscope|telescope|medal|trophy|dumbbell|guitar|key|box|package|umbrella|flag|weapon|sword|gun|bomb|lightbulb|idea|cup|glass|bottle)/i, "object"],
];

export function classifyKind(concept: string): StageObject["kind"] {
  for (const [re, kind] of KIND_RULES) if (re.test(concept)) return kind;
  return "generic";
}

function cleanToken(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/^['"]+|['"]+$/g, "")
    .replace(/(?:'s|'ve|'d|'ll|'re|'m|n't|hasn't|don't|doesn't)$/i, "")
    .replace(/[^a-z0-9$-]/gi, "");
}

/** Score a candidate word as a visual anchor. Higher = more drawable. */
function conceptScore(raw: string): number {
  const w = cleanToken(raw);
  if (w.length < 3 || STOP.has(w) || /^\d+$/.test(w)) return 0;
  if (/ly$/.test(w) && !/poly|daily|weekly|monthly/i.test(w)) return 0;
  if (/^(.*(?:ing|ed|s)$)/.test(w) && /(?:ing|ed)$/.test(w) && !/dieting|starving|speedrunning|injecting/i.test(w)) return 1;
  let score = 2;
  for (const [re] of KIND_RULES) if (re.test(w)) { score = 6; break; }
  if (/^[A-Z]/.test(raw) || /\B[A-Z]/.test(raw)) score = Math.max(score, 5);
  if (/thicc|stick|ozempic|wegovy|glp-?1|buccal|ps1|rpg|burton|ortega|grande|stone|moss|marvel|celery|baguette|cracker|stomach|battery|y2k/i.test(w)) score = 8;
  if (w.length >= 6) score += 1;
  return score;
}

/** Extract up to `max` distinct concepts from a sentence, strongest anchors first. */
export function extractConcepts(text: string, max = 2): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  
  // Normalize fused text from imperfect transcripts
  const normalizedText = text
    .replace(/youdon't/gi, "you don't")
    .replace(/yourfriend's/gi, "your friend's")
    .replace(/hollywoodhasn't/gi, "hollywood hasn't")
    .replace(/idon't/gi, "i don't")
    .replace(/y2k/gi, "y2k_fashion");

  // Quoted words are deliberate joke anchors ("Thicc", "stick") — highest priority.
  for (const m of normalizedText.matchAll(/[“'"]([A-Za-z][A-Za-z0-9'-]{2,})[”'"]/g)) {
    const c = cleanToken(m[1]);
    if (c && !STOP.has(c) && !seen.has(c)) { seen.add(c); out.push(c); }
  }
  // Numbers with units next — they are strong visual anchors.
  for (const m of normalizedText.matchAll(/(\$[\d.,]+[\dkkmmbbn]*|\d[\d.,]*\s*(?:percent|%|lbs|pounds|kg|mm|cm|million|billion|k)\b)/gi)) {
    const c = m[0].trim().toLowerCase().replace(/\s+/g, "");
    if (!seen.has(c)) { seen.add(c); out.push(c); }
  }
  const scored: Array<[string, number]> = [];
  const raws = normalizedText.split(/[^A-Za-z0-9'$-]+/);
  for (let ri = 0; ri < raws.length; ri++) {
    const raw = raws[ri];
    const w = cleanToken(raw);
    if (!w || seen.has(w) || STOP.has(w)) continue;
    let score = conceptScore(raw);
    
    // Merge consecutive name words into one person ("jenna ortega" -> "jenna ortega", "tim burton" -> "tim burton").
    if (score >= 4 && classifyKind(w) === "person") {
      const nextRaw = raws[ri + 1] ?? "";
      const next = cleanToken(nextRaw);
      if (next && (classifyKind(next) === "person" || conceptScore(nextRaw) >= 4)) {
        const merged = `${w} ${next}`;
        scored.push([merged, score + 3]);
        ri++;
        continue;
      }
    }
    // Compound concepts: "buccal fat", "saltine cracker", "lithium battery", "y2k fashion", "concierge doctor"
    const nextRaw = raws[ri + 1] ?? "";
    const next = cleanToken(nextRaw);
    if (next && /(fat|wire|noise|bro|cracker|baguette|battery|pen|shot|doctor|surgeon|shadow|dress|jeans|belt|poster|gavel|wind|creator|creation|game|fashion|organ|organs)/i.test(next)) {
      const merged = `${w} ${next}`;
      scored.push([merged, score + 4]);
      ri++;
      continue;
    }
    if (score >= 2) scored.push([w, score]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  for (const [w, score] of scored) {
    if (seen.has(w)) continue;
    if (score < 4 && classifyKind(w) === "generic") continue;
    seen.add(w);
    out.push(w);
    if (out.length >= max) break;
  }
  return out.slice(0, max);
}

/**
 * Stage slots for Casually Explained / Alex Meyers visual comedy.
 * Single objects take center stage right [1320, 520]. Multiple objects frame side-by-side.
 */
const CENTER_POS: [number, number] = [1320, 520];
const PAIR_POS: Array<[number, number]> = [
  [1100, 520], [1540, 520],
];

export function buildStageObjects(beats: StageBeat[], opts: { maxLive?: number; lifetimeSec?: number } = {}): StageObject[] {
  const maxLive = opts.maxLive ?? 2;
  const lifetime = opts.lifetimeSec ?? 4.5;
  const objects: StageObject[] = [];
  // live[key] = index into objects of the currently-visible instance
  const live = new Map<string, number>();

  for (const b of beats) {
    const concepts = extractConcepts(b.semantic, 2);
    if (concepts.length === 0) continue;
    for (const concept of concepts) {
      const key = concept;
      // Expire objects whose retireAt has passed relative to this beat.
      for (const [k, i] of live) {
        if (objects[i].retireAt <= b.start) live.delete(k);
      }
      const existing = live.get(key);
      if (existing !== undefined) {
        // Referenced again while still visible: refresh lifetime.
        // A faded object is NOT revived (that would teleport it back onto
        // a mark another prop may have taken); it is re-placed below.
        if (objects[existing].retireAt > b.start) {
          objects[existing].retireAt = Math.max(objects[existing].retireAt, b.end + lifetime * 0.5);
          continue;
        }
        live.delete(key);
      }

      // Authoritative flank placement. Marks never move after spawn (no
      // teleporting visible props), and a mark is only taken when no
      // still-visible object stands within a puppet-width of it. While no
      // flank is free, the earliest-retiring visible object is faded fast.
      // Preference order keeps the classic pair composition: right flank,
      // left flank, then center.
      const FLANKS: Array<readonly [number, number]> = [PAIR_POS[1], PAIR_POS[0], CENTER_POS];
      const visible = () => objects.filter((o) => o.retireAt > b.start + 1.0);
      const free = (px: number) => !visible().some((o) => Math.abs(o.x - px) < 150);
      let guard = 0;
      while (!FLANKS.some(([fx]) => free(fx)) && guard++ < 4) {
        let earliest: StageObject | null = null;
        for (const o of visible()) {
          if (!earliest || o.retireAt < earliest.retireAt) earliest = o;
        }
        if (!earliest) break;
        earliest.retireAt = Math.min(earliest.retireAt, b.start + 0.5);
      }
      const pickIdx = FLANKS.findIndex(([fx]) => free(fx));
      const pick = FLANKS[pickIdx >= 0 ? pickIdx : 0];
      let x = pick[0];
      let y = pick[1];
      let slot = pickIdx >= 0 ? pickIdx : 0;
      void maxLive;

      const kind = classifyKind(concept);
      const idx = objects.length;
      objects.push({
        key,
        concept,
        kind,
        spawnAt: b.start + 0.25, // land quickly on the spoken word
        retireAt: b.end + lifetime,
        x,
        y,
        // Person puppets are guest stars, not backdrops: keep them near
        // life size so a close-up camera never meets a giant cropped head.
        scale: kind === "person"
          ? 1.0 + clamp(b.energy, 0, 1) * 0.1
          : 1.35 + clamp(b.energy, 0, 1) * 0.25,
        energy: b.energy,
        slot,
        beatId: b.id,
      });
      live.set(key, idx);
    }
  }
  return objects;
}

export interface StageObjectState extends StageObject {
  /** 0..1 pop-in progress (>=1 fully entered). */
  entry: number;
  /** 0..1 fade-out progress (0 = fully visible). */
  exit: number;
  visible: boolean;
  /** Times this object was re-referenced — used for pulse accents. */
  age: number;
}

export function stageAtTime(objects: StageObject[], t: number): StageObjectState[] {
  const out: StageObjectState[] = [];
  for (const o of objects) {
    const fadeDur = 0.6;
    if (t < o.spawnAt - 0.001) continue;
    const retireEnd = o.retireAt + fadeDur;
    if (t > retireEnd) continue;
    const entry = clamp((t - o.spawnAt) / 0.28, 0, 1);
    const exit = clamp((t - o.retireAt) / fadeDur, 0, 1);
    out.push({ ...o, entry, exit, visible: true, age: t - o.spawnAt });
  }
  return out;
}
