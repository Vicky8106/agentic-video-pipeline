import type { Transcript, Sentence } from "../subtitles/Transcript";
import type { DirectionPlan, BeatEvent } from "../director/Director";
import type { ProductionPlan, ProductionBeat, DirectedAction, VisualPlan } from "./ProductionPlan";
import { action, bitWindows } from "../animation/Choreography";
import type { ComedyAnalysis } from "../subtitles/ComedyStructure.js";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const norm = (s: string) => String(s || "").toLowerCase();

export function topicFor(text: string): VisualPlan["topic"] {
  const x = norm(text);
  // Bare digits are not money ("300 kilos", "eighteen months"): currency
  // needs a $, %, or money word beside it.
  if (/\$|%|\b(dollar|money|cost|price|million|billion|percent|salary|rent|wealth|crypto|bitcoin|budget|tax)\b/.test(x)) return "money";
  if (/\b(face|skin|body|weight|fat|thin|beauty|looks|appearance|jaw|cheek|wrinkle|aging|muscle|gym|workout|fitness)\b/.test(x)) return "body";
  if (/\b(food|eat|dinner|lunch|breakfast|pizza|burger|bread|carb|coffee|beer|wine|diet|calorie|snack|restaurant)\b/.test(x)) return "food";
  if (/\b(phone|text|message|social|internet|online|website|app|computer|screen|laptop|code|ai|software|camera|battery)\b/.test(x)) return "device";
  if (/\b(car|tesla|vehicle|truck|bike|plane|airplane|flight|rocket|spaceship|train|drive|driving)\b/.test(x)) return "vehicle";
  if (/\b(people|person|woman|man|celebrity|actor|actress|star|influencer|tiktok|instagram|boss|friend|doctor|cop|teacher|student|guy|girl)\b/.test(x)) return "person";
  if (/\b(rule|law|contract|warning|sign|ban|policy|terms|agreement|deadline|license|notice)\b/.test(x)) return "sign";
  if (/\b(book|clock|time|watch|timer|hammer|tool|trophy|medal|idea|lightbulb|gift|box)\b/.test(x)) return "object";
  if (/\b(before|after|versus|vs|compared|than|more|less|increase|decrease|higher|lower)\b/.test(x)) return "compare";
  if (/\b(first|second|third|step|process|because|therefore|so that|leads to|causes)\b/.test(x)) return "process";
  if (/\b(problem|issue|wrong|fail|failed|bad|danger|risk|mistake|terrible|horrible|disaster)\b/.test(x)) return "problem";
  return "explain";
}

function roleFor(s: Sentence, index: number, count: number, globalIndex?: number, totalCount?: number): ProductionBeat["role"] {
  const x = norm(s.text);
  const gi = globalIndex ?? index;
  const gc = totalCount ?? count;
  const isLast = gi === gc - 1;
  if (/[!?]/.test(s.text)) return isLast || index === count - 1 ? "punchline" : "escalation";
  if (/\b(but|however|actually|suddenly|except|until|then|literally|somehow|apparently)\b/.test(x)) return "escalation";
  if (/\b(because|therefore|means|causes|leads|so)\b/.test(x)) return "explanation";
  // Short punchy fragments at a scene end land as punchlines.
  if (index === count - 1 && s.words.length <= 9) return "punchline";
  return index === 0 ? "setup" : "explanation";
}

function energy(text: string, role: ProductionBeat["role"]): number {
  const x = norm(text);
  let e = 0.28;
  if (/[!?]/.test(text)) e += 0.2;
  if (/\b(but|however|actually|suddenly|literally|obviously|apparently|meanwhile|except|until|then)\b/.test(x)) e += 0.16;
  if (/\$|\d|%/.test(text)) e += 0.12;
  if (/\b(terrible|insane|ridiculous|absurd|wild|crazy|horrible|genius|beautiful|ugly|massive|tiny)\b/.test(x)) e += 0.18;
  if (role === "punchline" || role === "reaction") e += 0.15;
  return clamp(e);
}

function eventActions(events: BeatEvent[], start: number, end: number): DirectedAction[] {
  const out: DirectedAction[] = [];
  for (const e of events) {
    if (e.t < start || e.t > end) continue;
    const actor = e.target?.startsWith("host") ? "host" : e.target;
    if (e.kind === "expression") out.push(action("express", e.t, Math.min(end, e.t + (e.duration ?? 0.3)), { expression: e.payload?.expression ?? "deadpan_classic" }, actor));
    if (e.kind === "entrance") out.push(action("enter", e.t, Math.min(end, e.t + (e.duration ?? 0.28)), { side: e.payload?.side ?? "right" }, actor));
    if (e.kind === "morph") out.push(action("transform", e.t, Math.min(end, e.t + (e.duration ?? 0.6)), { to: e.payload?.to }, actor, e.target));
    if (e.kind === "prop") out.push(action("reveal", e.t, Math.min(end, e.t + (e.duration ?? 0.5)), { value: e.payload?.value, entrance: "pop" }, "host", e.target));
    if (e.kind === "shake") out.push(action("camera", e.t, Math.min(end, e.t + (e.duration ?? 0.18)), { move: "shake", strength: e.payload?.strength ?? 0.3 }));
    if (e.kind === "flash") out.push(action("camera", e.t, Math.min(end, e.t + (e.duration ?? 0.16)), { move: "impact", strength: e.payload?.strength ?? 0.3 }));
  }
  return out;
}

/**
 * Compile each sentence into explicit sub-bits.  This is the main anti-
 * slideshow boundary: every sentence receives a performance arc, and visuals
 * are introduced through actions that can be animated by any StylePack.
 */
export function compileProductionPlan(transcript: Transcript, direction: DirectionPlan, styleId: string, comedy?: ComedyAnalysis): ProductionPlan {
  const beats: ProductionBeat[] = [];
  for (const scene of direction.scenes) {
    const sentences = scene.sentences.map(i => transcript.sentences[i]).filter(Boolean) as Sentence[];
    sentences.forEach((s, i) => {
      const matching = direction.resolved.filter(sh => sh.start < s.end && sh.end > s.start);
      const shotId = matching[0]?.id ?? direction.resolved[0]?.id ?? "shot-0";
      // The comedy analyzer owns role + punch word when it has evidence;
      // legacy roleFor covers abstentions. (Old comment preserved: role was
      // computed against the WHOLE transcript because per-scene index
      // collapses to "setup" under 1-sentence sitcom scenes.)
      const note = comedy?.notes.get(s.index);
      const role = (note?.role as ProductionBeat["role"] | undefined)
        ?? roleFor(s, i, sentences.length, s.index, transcript.sentences.length);
      const nextS = transcript.sentences[s.index + 1];
      const prevS = transcript.sentences[s.index - 1];
      const isSceneEnd = i === sentences.length - 1;
      const beatRole = (isSceneEnd && (/[!?]/.test(s.text) || nextS === undefined || (nextS.start - s.end) > 1.2))
        ? (role === "escalation" ? "escalation" : "punchline")
        : role;
      const e = Math.min(1, Math.max(energy(s.text, role), note?.energy ?? 0));
      const visualTopic = topicFor(s.text);
      const target = `visual-${scene.index}-${s.index}`;
      const actions = eventActions(direction.events, s.start, s.end);
      const span = Math.max(0.45, s.end - s.start);
      const windows = bitWindows(s.start, s.end, span > 3.2 ? 5 : span > 2.2 ? 4 : span > 1.35 ? 3 : 2);
      const bits: string[] = [];

      // Bit 1: actor establishes the thought.
      bits.push("setup");
      actions.push(action("speak", s.start, s.end, { wordCount: s.words.length }, "host"));
      actions.push(action("lookAt", s.start, Math.min(s.end, s.start + Math.min(.42, span * .2)), { target: "camera" }, "host"));
      actions.push(action("gesture", windows[0][0], windows[0][1], { gesture: role === "escalation" ? "emphasize" : "explain", amount: .6 + e * .25 }, "host"));

      if (windows.length >= 2) {
        bits.push("anticipation");
        actions.push(action("gesture", windows[1][0], windows[1][1], { gesture: "anticipate", amount: .65 + e * .25 }, "host", target));
        actions.push(action("lookAt", windows[1][0], windows[1][1], { target, tracking: true }, "host", target));
      }

      if (windows.length >= 3) {
        bits.push("reveal");
        const [a, b] = windows[2];
        actions.push(action("reveal", a, Math.min(b, a + Math.max(.12, span * .08)), { entrance: "pop", overshoot: true, semantic: visualTopic }, "host", target));
        actions.push(action("camera", a, Math.min(b, a + .16), { move: "punch", target, amount: .9 + e * .35 }, "host", target));
        actions.push(action("point", a + Math.min(.12, (b-a)*.1), b, { target, styleIntent: "present" }, "host", target));
      }

      if (windows.length >= 4) {
        bits.push("escalation");
        const [a, b] = windows[3];
        actions.push(action("transform", a, b, { mode: visualTopic, intensity: e, continuous: true }, "host", target));
        actions.push(action("lookAt", a, b, { target, tracking: true }, "host", target));
      }

      if (windows.length >= 5) {
        bits.push("punchline-reaction");
        const [a, b] = windows[4];
        actions.push(action("express", a, Math.min(b, a + .42), { expression: role === "punchline" ? "deadpan_classic" : (e > .7 ? "shock_eye_pop" : "skeptical_raised_brow") }, "host"));
        actions.push(action("lookAt", a, Math.min(b, a + .28), { target: "camera" }, "host"));
        actions.push(action("hold", Math.min(b, a + .25), b, { reaction: true, deliberate: true }, "host"));
      } else if (role === "punchline" || role === "reaction") {
        const [a, b] = windows[windows.length - 1];
        bits.push("reaction");
        actions.push(action("express", a, Math.min(b, a + .38), { expression: "deadpan_classic" }, "host"));
        actions.push(action("lookAt", a, b, { target: "camera" }, "host"));
        actions.push(action("hold", Math.min(b, a + .22), b, { reaction: true }, "host"));
      }

      const triggerWord = note?.punchWord
        ?? s.words.find(w => /\d|[!?]$/.test(w.text))?.text ?? s.words[s.words.length - 1]?.text;
      beats.push({
        id: `scene-${scene.index}-beat-${i}`,
        start: s.start,
        end: s.end,
        role: beatRole,
        triggerWord,
        bits,
        actions,
        assets: [target],
        visual: { topic: visualTopic, semantic: s.text, interactionTarget: target, entrance: "pop", intensity: e },
        shotId,
        energy: e,
      });
    });
  }

  const actionCount = beats.reduce((n,b) => n + b.actions.length, 0);
  const bitCount = beats.reduce((n,b) => n + (b.bits?.length ?? 0), 0);
  return {
    schemaVersion: "1.2",
    styleId,
    duration: direction.duration,
    beats,
    quality: {
      maxStaticHoldSec: .55,
      maxShotSec: direction.resolved.reduce((m,s) => Math.max(m, s.end - s.start), 0),
      minimumActorCoverage: .9,
      minimumActionDensityPer10Sec: Math.max(12, actionCount / Math.max(.1, direction.duration) * 10),
      minimumBitDensityPer10Sec: Math.max(4, bitCount / Math.max(.1, direction.duration) * 10),
    },
    source: { transcriptVersion: "1", directionVersion: "2" },
  };
}
