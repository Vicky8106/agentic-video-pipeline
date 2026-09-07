/**
 * LLM Director: script in, directed beat sheet out.
 *
 * The director reads the transcript (words + timings) and decides, per beat:
 * background, character (look + expression + pose), prop, camera, banner.
 * The deterministic renderer (MovieDirectorEngine) then stages exactly that.
 *
 * Two modes:
 *   1. LLM  (--llm anthropic|openai + DIRECTOR_API_KEY): judgment calls.
 *   2. Fallback (--llm none): deterministic topic/energy heuristics so the
 *      pipeline always runs with no key and no network.
 *
 * Fail-closed where the screen is concerned: an unknown prop id drops the
 * prop (the PropLibrary default renders a labeled placeholder card = burned
 * words, which the gold look forbids). Unknown looks fall back to host
 * defaults with a warning. Banners are the only on-screen text and are
 * capped at 34 chars.
 */
import type { MovieBeat } from "./ShotTimeline";
import type { Transcript, Sentence } from "../subtitles/Transcript";

export const BG_IDS = [
  "BG-STUDIO", "BG-HOLLYWOOD", "BG-CINEMA", "BG-90S", "BG-Y2K", "BG-GYM",
  "BG-CLINIC", "BG-RETRO", "BG-GOTHIC", "BG-TRIBUNAL", "BG-OFFICE",
  "BG-KITCHEN", "BG-AUDIENCE", "BG-END",
] as const;

// Prop ids verified against PropLibrary. Glosses describe the confirmed gag;
// unlisted-in-prompt ids may still validate (they exist) but the LLM is told
// to prefer these, so the joke matches the artwork.
export const PROP_GLOSS: Record<string, string> = {
  "PROP-PHONE": "giant Instagram phone post",
  "PROP-CAM": "paparazzi telephoto camera",
  "PROP-PEND": "giant swinging pendulum",
  "PROP-FOOD": "junk-food spread",
  "PROP-MONEY": "cash / money stack",
  "PROP-MED": "pills / medicine",
  "PROP-BROWSER": "browser window closing",
  "PROP-CLOCK": "clock / countdown",
  "PROP-GYM": "gym weights",
  "PROP-FACE": "facial caliper gauge",
  "PROP-GAME": "retro low-poly game console",
  "PROP-SCALE": "weighing scale",
  "PROP-SUB": "subscribe button card",
  "PROP-CARB": "carbohydrates box",
  "PROP-BILLBOARD": "slamming billboard sign",
  "PROP-MIRROR": "mirror",
  "PROP-SURGERY": "cosmetic surgery tray",
  "PROP-CONTRACT": "contract document",
  "PROP-QUESTION": "giant question mark",
  "PROP-SHIELD": "shield",
  "PROP-GRID": "photo grid wall",
};
export const PROP_IDS = new Set(Object.keys(PROP_GLOSS));

export const HAIRSTYLES = [
  "female_bob_bangs", "female_bob", "female_high_ponytail", "female_ponytail",
  "female_long_brunette", "female_long", "female_blonde_curls", "female_blonde",
  "female_messy_bun", "female_pixie_y2k", "female_gothic_waves",
  "female_slicked_back", "female_side_braid", "male_host_curly", "host_classic",
  "male_tech_bro", "male_short", "male_bodybuilder_bald", "male_doctor_cap",
  "female_widow_veil", "none",
];
export const OUTFITS = [
  "none", "tshirt", "hoodie", "suit", "dress_red_carpet", "dress_pink",
  "dress_black", "y2k_crop_top_low_rise", "crop_top_leggings", "doctor_scrubs",
  "bodybuilder_tank", "victorian_mourning", "judge_robes", "tech_fleece_vest",
  "patient_gown", "bathrobe", "bikini",
];
// Expressions observed in the gold beat sheet + core rig vocabulary.
export const EXPRESSIONS = [
  "deadpan_classic", "deadpan_slow_blink", "deadpan_soul_stare",
  "smug_rock_eyebrow", "smug_chef_kiss", "smug_finger_guns", "smug_peace_sign",
  "confused_squint", "confused_tilted_head", "shock_eye_pop", "shock_jaw_drop",
  "cringe_teeth_grit", "cringe_full", "fear_sweat_freeze", "fear_trembling",
  "rage_clenched_fists", "rage_furious_screaming", "frustration_facepalm",
  "skeptical_side_eye", "mind_blown_galaxy_brain", "laughing_fountain_tears",
];
export const POSES = [
  "pointing_right", "finger_guns", "facepalm", "flexing", "waving",
  "peace_sign", "wednesday_dance", "flail", "neutral", "shrugging",
  "holding_prop", "slamming_gavel",
];
export const GRAPHIC_TYPES = ["POPUP", "SLIDER", "RADAR", "STAMP"];

export interface DirectorBeatInput {
  sentences: Array<{ text: string; start: number; end: number }>;
  windowStart: number;
  windowEnd: number;
}

export function transcriptToInput(tr: Transcript): DirectorBeatInput {
  const sentences = (tr.sentences as Sentence[]).map((s: Sentence) => ({
    text: s.text,
    start: (s as { start: number }).start,
    end: (s as { end: number }).end,
  }));
  return {
    sentences,
    windowStart: 0,
    windowEnd: tr.duration,
  };
}

export function buildDirectorPrompt(input: DirectorBeatInput): { system: string; user: string } {
  const system = [
    "You direct a 2D stick-figure comedy explainer (Casually Explained style).",
    "Given timestamped narration sentences, output a beat sheet: one visual gag sketch per joke, 4-9s per beat, tiling the window with NO gaps.",
    "Rules:",
    "- Every beat stages exactly ONE gag: background + ONE actor + at most ONE prop + camera.",
    "- Progressive reveal: new visual information enters WITH its spoken keyword (+/-0.1s), never before.",
    "- Punchlines get a hard cut (new beat) and a camera punch-in (zoom 1.5-2.0). Holds after punchlines: keep the reaction beat >= 1.5s.",
    "- Camera grammar: wide 1.0-1.15 for setups, 1.3-1.5 for escalation, 1.6-2.2 for punchlines/forensic inspection. Cuts on beat starts, never mid-sentence unless the sentence is the punchline.",
    "- Actor faces camera-left (x 520-780) or center (x 960); props live camera-right (x 1280-1450, y 300-480).",
    "- bannerText is the ONLY on-screen text allowed: a 1-4 word staged title card (<= 34 chars) or null. NEVER burn narration, dialogue, labels, or captions.",
    "- Use ONLY ids from the catalogs below. If no catalog entry fits, omit the prop (null) rather than forcing one.",
    "- Return ONLY JSON: {\"beats\": [...]} matching the schema. No prose.",
    "",
    `backgrounds: ${BG_IDS.join(", ")}`,
    `props: ${Object.entries(PROP_GLOSS).map(([k, v]) => `${k} (${v})`).join("; ")}`,
    `hairstyles: ${HAIRSTYLES.join(", ")}`,
    `outfits: ${OUTFITS.join(", ")}`,
    `expressions: ${EXPRESSIONS.join(", ")}`,
    `poses: ${POSES.join(", ")}`,
    `graphicTypes: ${GRAPHIC_TYPES.join(", ")} (or null)`,
    "",
    "Beat schema: {beatId (1-based), startSec, endSec, dur, bgId,",
    " actor: {id, x, y (640 = standing on floor), scale (~1.34), gender, hairStyle, clothes, expression, pose},",
    " camera: {x, y, zoom}, activeProp: {id, x, y, scale} or null,",
    " bannerText (string|null), graphicType (string|null), text (the covered narration, audit only)}.",
  ].join("\n");
  const lines = input.sentences.map(
    (s) => `[${s.start.toFixed(2)}-${s.end.toFixed(2)}] ${s.text}`
  );
  const user = [
    `Tile the window ${input.windowStart.toFixed(2)}s to ${input.windowEnd.toFixed(2)}s exactly: first beat starts at window start, last beat ends at window end.`,
    "Narration:",
    ...lines,
  ].join("\n");
  return { system, user };
}

export interface LlmOptions {
  provider: "anthropic" | "openai";
  model: string;
  apiKey: string;
  endpoint?: string;
  timeoutMs?: number;
}

function stripFences(s: string): string {
  const m = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return (m ? m[1] : s).trim();
}

async function postJson(url: string, headers: Record<string, string>, body: unknown, timeoutMs: number): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`LLM HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return (await res.json()) as unknown;
  } finally {
    clearTimeout(timer);
  }
}

export async function callDirectorLlm(prompt: { system: string; user: string }, opts: LlmOptions): Promise<unknown[]> {
  const timeoutMs = opts.timeoutMs ?? 120000;
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      if (opts.provider === "anthropic") {
        const url = opts.endpoint ?? "https://api.api.anthropic.com/v1/messages";
        const data = (await postJson(url, {
          "x-api-key": opts.apiKey,
          "anthropic-version": "2023-06-01",
        }, {
          model: opts.model,
          max_tokens: 8000,
          system: prompt.system,
          messages: [{ role: "user", content: prompt.user }],
        }, timeoutMs)) as { content?: Array<{ type?: string; text?: string }> };
        const text = (data.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join("\n");
        return asBeatArray(JSON.parse(stripFences(text)));
      }
      const url = (opts.endpoint ?? "https://api.openai.com/v1") + "/chat/completions";
      const data = (await postJson(url, { authorization: `Bearer ${opts.apiKey}` }, {
        model: opts.model,
        max_tokens: 8000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: prompt.system },
          { role: "user", content: prompt.user },
        ],
      }, timeoutMs)) as { choices?: Array<{ message?: { content?: string } }> };
      const text = data.choices?.[0]?.message?.content ?? "";
      return asBeatArray(JSON.parse(stripFences(text)));
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

function asBeatArray(parsed: unknown): unknown[] {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === "object" && Array.isArray((parsed as { beats?: unknown }).beats)) {
    return (parsed as { beats: unknown[] }).beats;
  }
  throw new Error("LLM did not return {beats: [...]}");
}

export interface ValidationResult {
  beats: MovieBeat[];
  warnings: string[];
}

/** Validate + repair raw beats into render-safe MovieBeats. Fail closed on text. */
export function validateBeats(raw: unknown[], windowStart: number, windowEnd: number): ValidationResult {
  const warnings: string[] = [];
  const beats: MovieBeat[] = [];
  const list = [...raw].sort((a, b) => Number((a as { startSec: number }).startSec) - Number((b as { startSec: number }).startSec));
  list.forEach((r, i) => {
    const b = r as Record<string, unknown>;
    const actor = (b.actor ?? {}) as Record<string, unknown>;
    const cam = (b.camera ?? {}) as Record<string, unknown>;
    const prop = (b.activeProp ?? null) as Record<string, unknown> | null;
    let startSec = Number(b.startSec);
    let endSec = Number(b.endSec);
    if (!Number.isFinite(startSec) || !Number.isFinite(endSec) || endSec <= startSec) {
      warnings.push(`beat ${i + 1}: bad timing, skipped`);
      return;
    }
    startSec = Math.max(windowStart, startSec);
    endSec = Math.min(windowEnd, endSec);
    if (endSec <= startSec) return;
    const bgId = BG_IDS.includes(b.bgId as (typeof BG_IDS)[number]) ? (b.bgId as string) : "BG-STUDIO";
    if (bgId !== b.bgId) warnings.push(`beat ${i + 1}: unknown bgId ${String(b.bgId)} -> BG-STUDIO`);
    const pose = POSES.includes(String(actor.pose)) ? String(actor.pose) : "neutral";
    if (pose !== actor.pose) warnings.push(`beat ${i + 1}: unknown pose ${String(actor.pose)} -> neutral`);
    const expression = EXPRESSIONS.includes(String(actor.expression)) ? String(actor.expression) : "deadpan_classic";
    if (expression !== actor.expression) warnings.push(`beat ${i + 1}: unknown expression -> deadpan_classic`);
    const hairStyle = HAIRSTYLES.includes(String(actor.hairStyle)) ? String(actor.hairStyle) : "host_classic";
    const clothes = OUTFITS.includes(String(actor.clothes)) ? String(actor.clothes) : "none";
    let activeProp: MovieBeat["activeProp"] = null;
    if (prop && typeof prop.id === "string") {
      if (PROP_IDS.has(prop.id)) {
        activeProp = {
          id: prop.id,
          x: Number(prop.x) || 1360,
          y: Number(prop.y) || 440,
          scale: Number(prop.scale) || 1.3,
        };
      } else {
        warnings.push(`beat ${i + 1}: unknown prop ${prop.id} dropped (no placeholder text on screen)`);
      }
    }
    let bannerText = typeof b.bannerText === "string" ? b.bannerText : null;
    if (bannerText && bannerText.length > 34) {
      warnings.push(`beat ${i + 1}: banner truncated to 34 chars`);
      bannerText = bannerText.slice(0, 34);
    }
    const graphicType = typeof b.graphicType === "string" && GRAPHIC_TYPES.includes(b.graphicType) ? b.graphicType : null;
    beats.push({
      beatId: beats.length + 1,
      startSec,
      endSec,
      dur: endSec - startSec,
      bgId,
      actor: {
        id: String(actor.id ?? `actor_${beats.length + 1}`),
        x: Number(actor.x) || 780,
        y: Number(actor.y) || 640,
        scale: Number(actor.scale) || 1.34,
        gender: String(actor.gender ?? "male"),
        hairStyle,
        clothes,
        expression,
        pose,
      },
      camera: {
        x: Math.min(1920, Math.max(0, Number(cam.x) || 960)),
        y: Math.min(1080, Math.max(0, Number(cam.y) || 520)),
        zoom: Math.min(3.0, Math.max(0.5, Number(cam.zoom) || 1.3)),
      },
      activeProp,
      bannerText,
      graphicType,
      text: String((b as { text?: unknown }).text ?? ""),
    });
  });
  // Enforce tiling: clamp overlaps, report gaps.
  for (let i = 1; i < beats.length; i++) {
    if (beats[i].startSec < beats[i - 1].endSec) {
      beats[i].startSec = beats[i - 1].endSec;
      beats[i].dur = beats[i].endSec - beats[i].startSec;
    }
    if (beats[i].startSec - beats[i - 1].endSec > 0.6) {
      warnings.push(`gap ${(beats[i].startSec - beats[i - 1].endSec).toFixed(2)}s before beat ${beats[i].beatId}`);
    }
  }
  return { beats, warnings };
}

const FALLBACK_BG: Record<string, { bg: string; prop: string | null }> = {
  money: { bg: "BG-OFFICE", prop: "PROP-MONEY" },
  body: { bg: "BG-CLINIC", prop: "PROP-MED" },
  food: { bg: "BG-KITCHEN", prop: "PROP-FOOD" },
  device: { bg: "BG-STUDIO", prop: "PROP-PHONE" },
  person: { bg: "BG-HOLLYWOOD", prop: "PROP-CAM" },
  vehicle: { bg: "BG-STUDIO", prop: null },
  sign: { bg: "BG-TRIBUNAL", prop: "PROP-CONTRACT" },
  object: { bg: "BG-STUDIO", prop: "PROP-CLOCK" },
  compare: { bg: "BG-STUDIO", prop: "PROP-SCALE" },
  process: { bg: "BG-RETRO", prop: "PROP-GAME" },
  problem: { bg: "BG-GOTHIC", prop: "PROP-QUESTION" },
  explain: { bg: "BG-STUDIO", prop: null },
};

function topicOf(text: string): string {
  const x = text.toLowerCase();
  if (/\b(\$|dollar|money|cost|price|million|billion|percent|%|salary|rent|wealth|crypto|budget)\b|\d/.test(x)) return "money";
  if (/\b(face|skin|body|weight|fat|thin|beauty|looks|jaw|cheek|wrinkle|aging|muscle|gym|workout|fitness)\b/.test(x)) return "body";
  if (/\b(food|eat|dinner|lunch|breakfast|pizza|burger|bread|carb|coffee|diet|calorie)\b/.test(x)) return "food";
  if (/\b(phone|text|social|internet|online|app|computer|screen|laptop|code|ai|camera)\b/.test(x)) return "device";
  if (/\b(people|person|woman|man|celebrity|actor|actress|star|influencer|tiktok|instagram|boss|doctor|guy|girl)\b/.test(x)) return "person";
  if (/\b(rule|law|contract|warning|sign|ban|policy|deadline)\b/.test(x)) return "sign";
  if (/\b(before|after|versus|vs|than|more|less|higher|lower)\b/.test(x)) return "compare";
  if (/\b(problem|wrong|fail|bad|danger|mistake|terrible|disaster)\b/.test(x)) return "problem";
  return "explain";
}

/** Deterministic offline director: one beat per sentence group, no LLM. */
export function fallbackDirect(input: DirectorBeatInput): MovieBeat[] {
  const raw: unknown[] = [];
  let cur: { text: string; start: number; end: number } | null = null;
  const flush = () => { if (cur) { raw.push(cur); cur = null; } };
  for (const s of input.sentences) {
    if (!cur) { cur = { ...s }; continue; }
    if (s.start - cur.start > 8 || /[!?]/.test(cur.text)) { flush(); cur = { ...s }; continue; }
    cur = { text: `${cur.text} ${s.text}`, start: cur.start, end: s.end };
  }
  flush();
  let side = 1;
  const beats = raw.map((r, i) => {
    const g = r as { text: string; start: number; end: number };
    const topic = topicOf(g.text);
    const stage = FALLBACK_BG[topic];
    const punch = /[!?]|but |suddenly|literally/.test(g.text);
    side = -side;
    return {
      beatId: i + 1,
      startSec: Math.max(input.windowStart, g.start),
      endSec: Math.min(input.windowEnd, g.end),
      bgId: stage.bg,
      actor: {
        id: `actor_${i + 1}`,
        x: side < 0 ? 680 : 960,
        y: 640,
        scale: 1.34,
        gender: topic === "person" ? "female" : "male",
        hairStyle: topic === "person" ? "female_bob_bangs" : "host_classic",
        clothes: topic === "money" ? "suit" : "none",
        expression: punch ? "shock_eye_pop" : i % 3 === 0 ? "smug_rock_eyebrow" : "deadpan_soul_stare",
        pose: punch ? "pointing_right" : "neutral",
      },
      camera: { x: 960, y: 520, zoom: punch ? 1.6 : 1.3 },
      activeProp: stage.prop ? { id: stage.prop, x: 1360, y: 440, scale: 1.3 } : null,
      bannerText: null,
      graphicType: null,
      text: g.text,
    };
  });
  return validateBeats(beats, input.windowStart, input.windowEnd).beats;
}
