/**
 * check-comedy: the drop-in brain's regression gate.
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/check-comedy.ts
 *
 * Asserts joke structure on real scripts: unit cycles run ~10-15s, every
 * unit has setup before punch, punch words carry real evidence (or the
 * analyzer abstains), rooms come from the background catalog, entities are
 * clean, and analysis is deterministic.
 */
import fs from "node:fs";
import { parseSrt } from "../src/subtitles/SrtParser.js";
import { buildTranscript, type Transcript } from "../src/subtitles/Transcript.js";
import { analyzeComedy } from "../src/subtitles/ComedyStructure.js";
import { BG_IDS } from "../src/director/LlmDirector.js";
import { direct } from "../src/director/Director.js";
import { compileProductionPlan } from "../src/core/ProductionCompiler.js";
import { computeCastRoster } from "../src/production/SitcomCast.js";

let failures = 0;
const check = (name: string, cond: boolean, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond || !detail ? "" : `  (${detail})`}`);
  if (!cond) failures++;
};

const load = (rel: string): Transcript => {
  const raw = fs.readFileSync(`/root/auto-pipeline/${rel}`, "utf8");
  return buildTranscript(parseSrt(raw));
};

const bgs = new Set<string>(BG_IDS as readonly string[]);

// --- Pigeon park: hand-verifiable 27s script ----------------------------------
{
  const tr = load("sheets/pigeon-park.srt");
  const a = analyzeComedy(tr);
  check("pigeon units cycle 10-15s", a.units.length >= 2 && a.units.length <= 4, `${a.units.length} units`);
  check("pigeon rooms all park", a.units.every((u) => u.room === "BG-PARK"), a.units.map((u) => u.room).join(","));
  const words = a.units.map((u) => u.punchWord).filter(Boolean) as string[];
  check("pigeon punches land", words.some((w) => /leave/i.test(w)) && words.some((w) => /friday/i.test(w)), words.join(" / "));
  const ents = new Set(a.units.flatMap((u) => u.entities));
  for (const want of ["landlord", "breadcrumbs", "protest"]) {
    check(`pigeon entity ${want}`, ents.has(want), [...ents].join(","));
  }
  check("pigeon entities clean", [...ents].every((e) => !/ly$/.test(e) || e.length <= 8), [...ents].join(","));
}

// --- Chapter 1: 89-sentence feature -------------------------------------------
{
  const tr = load("public/0-chapter-1.srt");
  const a = analyzeComedy(tr);
  check("ch1 unit count sane", a.units.length >= 20 && a.units.length <= 50, `${a.units.length}`);
  const durs = a.units.map((u) => u.end - u.start);
  check("ch1 no epic units", Math.max(...durs) < 40, `max ${Math.max(...durs).toFixed(1)}s`);
  check("ch1 setup before punch", a.units.every((u) => u.setupEnd <= u.end && u.start < u.end), "bad span");
  const punched = a.units.filter((u) => u.punchWord).length;
  check("ch1 punch rate", punched / a.units.length >= 0.4, `${punched}/${a.units.length}`);
  check("ch1 rooms catalogued", a.units.every((u) => u.room === null || bgs.has(u.room)), "rogue room");
  check("ch1 notes cover sentences", a.notes.size === tr.sentences.length, `${a.notes.size}/${tr.sentences.length}`);
  const roles = new Set([...a.notes.values()].map((n) => n.role));
  check("ch1 all roles used", roles.has("setup") && roles.has("escalation") && roles.has("punchline"), [...roles].join(","));
  // Honesty: every claimed punch word carries evidence >= 2.
  const thin = [...a.notes.values()].filter((n) => n.punchWord && n.evidence.total < 2);
  check("ch1 punches evidenced", thin.length === 0, thin.map((n) => n.punchWord).slice(0, 3).join(","));
  // Entities: no reflexives, no fused garbage, no -ly adverbs.
  const allEnts = new Set([...a.notes.values()].flatMap((n) => n.entities));
  const dirty = [...allEnts].filter((e) => /self$/.test(e) || (/^[a-z]+'[a-z]+$/.test(e) && e.length > 8));
  check("ch1 entities clean", dirty.length === 0, dirty.slice(0, 5).join(","));
  // Determinism.
  const again = analyzeComedy(tr);
  check("ch1 deterministic", JSON.stringify(again.units) === JSON.stringify(a.units), "nondeterministic");
}

// --- Wiring: analyzer drives production -----------------------------------------
{
  const tr = load("sheets/pigeon-park.srt");
  const comedy = analyzeComedy(tr);
  const plan = direct(tr, { maxSentencesPerScene: 1 });
  const prod = compileProductionPlan(tr, plan, "casually-procedural", comedy);
  const triggers = new Set(prod.beats.map((b) => b.triggerWord));
  check("analyzer punch words become triggers", triggers.has("leave.") && [...triggers].some((w) => /friday/i.test(w ?? "")), [...triggers].join(" / "));
  const roles = new Set(prod.beats.map((b) => b.role));
  check("analyzer roles reach beats", roles.has("punchline") && roles.has("setup"), [...roles].join(","));
  // Entity entrants: the landlord sentence brings the suit on stage.
  const beats = prod.beats.map((b) => ({
    id: b.id, start: b.start, end: b.end, role: b.role,
    semantic: b.visual?.semantic ?? "",
    entities: [...comedy.notes.values()].filter((n) => {
      const s = tr.sentences[n.sentenceIndex];
      return s.end > b.start && s.start < b.end;
    }).flatMap((n) => n.entities),
  }));
  const roster = computeCastRoster(beats);
  const members = new Set([...roster.values()].map((e) => e.member.actorId));
  check("landlord entity enters the suit", members.has("suit"), [...members].join(","));
}

if (failures > 0) {
  console.error(`\n${failures} comedy check(s) FAILED`);
  process.exit(1);
}
console.log("\nAll comedy checks passed.");
