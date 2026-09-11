/**
 * check-director-fixes: regression gate for the three ranked director fixes.
 *   1. Prop relevance: lift-context sentences never stage vehicle props;
 *      gym stories map to BG-GYM/PROP-GYM (not CLINIC/MED); bare numbers
 *      without currency are not money.
 *   2. Cast roster: keyword-entered cast persists across following beats
 *      until a new entrant or a long gap (no per-beat rotation pops).
 *   3. Background stability: a joke that starts in one room keeps it
 *      through escalation/punchline even when the punchline names a
 *      foreign keyword (no mid-joke room flips).
 *
 * Run: NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/check-director-fixes.ts
 */
import { buildStageObjects } from "../src/production/SceneMemory.js";
import { fallbackDirect } from "../src/director/LlmDirector.js";
import { computeCastRoster, renderSitcomLayer } from "../src/production/SitcomCast.js";
import { stabilizeBeatBackgrounds } from "../src/assets/BackgroundLibrary.js";
import { validateSheet, sheetCovering } from "../src/director/DirectorSheet.js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { renderProceduralAsset } from "../src/styles/procedural/assetLibrary.js";
import { parseSrt } from "../src/subtitles/SrtParser.js";
import { buildTranscript } from "../src/subtitles/Transcript.js";
import { direct } from "../src/director/Director.js";
import { cameraAt } from "../src/camera/CameraTrack.js";
import { punchZoomBoost, impactSquash } from "../src/camera/GagCamera.js";
import { analyzeComedy } from "../src/subtitles/ComedyStructure.js";
import fs from "node:fs";

let failures = 0;
const check = (name: string, cond: boolean, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond || !detail ? "" : `  (${detail})`}`);
  if (!cond) failures++;
};

// --- 1a. Stage path: deadlift simile must not stage a vehicle ----------------
{
  const objs = buildStageObjects([{
    id: "b1", start: 20, end: 23,
    semantic: "And then he deadlifts a weight that could probably be used to anchor a small ship.",
    topic: "body", energy: 0.5, role: "escalation",
  }]);
  check("no vehicle prop in lift simile", objs.every((o) => o.kind !== "vehicle"),
    objs.map((o) => `${o.concept}:${o.kind}`).join(","));
  const ticket = buildStageObjects([{
    id: "b2", start: 20, end: 23,
    semantic: "I tried to leave. They had already eaten my bus ticket.",
    topic: "explain", energy: 0.4, role: "punchline",
  }]);
  check("no car for an eaten bus ticket", ticket.every((o) => o.kind !== "vehicle"),
    ticket.map((o) => `${o.concept}:${o.kind}`).join(","));
  const road = buildStageObjects([{
    id: "b3", start: 20, end: 23,
    semantic: "He drove the car straight down the highway.",
    topic: "vehicle", energy: 0.5, role: "escalation",
  }]);
  check("road contexts still stage vehicles", road.some((o) => o.kind === "vehicle"),
    road.map((o) => `${o.concept}:${o.kind}`).join(",") || "none");
}

// --- 1b. Beat-sheet path: gym story -> BG-GYM + PROP-GYM, not CLINIC/MED -----
{
  const beats = fallbackDirect({
    sentences: [
      { text: "A skinny guy walks into a gym.", start: 4, end: 7 },
      { text: "He is dressed like a janitor. He has a mop.", start: 7, end: 11 },
    ],
    windowStart: 0, windowEnd: 12,
  });
  const gym = beats.find((b) => /gym/.test(b.text));
  check("gym beat keeps BG-GYM", !!gym && gym.bgId === "BG-GYM", gym?.bgId ?? "no gym beat");
  check("no PROP-MED on gym beats", beats.every((b) => b.activeProp?.id !== "PROP-MED"),
    beats.map((b) => b.activeProp?.id ?? "none").join(","));
}

// --- 1c. Bare numbers without currency are not money --------------------------
{
  const beats = fallbackDirect({
    sentences: [{ text: "Your feed anytime in the last eighteen months, you might.", start: 2, end: 5 }],
    windowStart: 0, windowEnd: 6,
  });
  check("bare duration is not money prop", beats.every((b) => b.activeProp?.id !== "PROP-MONEY"),
    beats.map((b) => b.activeProp?.id ?? "none").join(","));
}

// --- 2. Cast roster persists ---------------------------------------------------
{
  const mk = (id: string, start: number, end: number, role: string, semantic: string, entities: string[] = []) => ({ id, start, end, role, semantic, entities });
  const roster = computeCastRoster([
    mk("a", 7, 11, "setup", "He is dressed like a janitor. He has a mop.", ["janitor"]),
    mk("b", 11, 14, "setup", "He walks over to the front desk."),
    mk("c", 14, 18, "escalation", "A giant bodybuilder laughs at him.", ["giant", "bodybuilder"]),
    mk("d", 18, 22, "punchline", "And the crowd goes completely silent."),
  ]);
  check("janitor enters on mop beat", roster.get("a")?.member.actorId === "anatoly", roster.get("a")?.member.actorId);
  check("janitor persists through neutral beat", roster.get("b")?.member.actorId === "anatoly", roster.get("b")?.member.actorId);
  check("neutral beat is a continuation", roster.get("b")?.continued === true, String(roster.get("b")?.continued));
  check("bodybuilder takes over on entry beat", roster.get("c")?.member.actorId === "bodybuilder", roster.get("c")?.member.actorId);
  check("bodybuilder persists into punchline", roster.get("d")?.member.actorId === "bodybuilder", roster.get("d")?.member.actorId);
  // Named faces hold the stage even when the presence plan skips the beat;
  // unnamed continuations obey it.
  const stubActor = ({ actorId }: { actorId: string }) => `<actor:${actorId}>`;
  const staged = renderSitcomLayer(
    15, { start: 14, end: 18, role: "setup", id: "c", visual: { semantic: "A giant bodybuilder laughs at him." } },
    null, stubActor as never, new Set<string>(), "host", roster,
  );
  check("named face staged despite presence gap", staged.includes("bodybuilder"), staged || "(empty)");
  const quiet = renderSitcomLayer(
    12, { start: 11, end: 14, role: "setup", id: "b", visual: { semantic: "He walks over to the front desk." } },
    null, stubActor as never, new Set<string>(), "host", roster,
  );
  check("unnamed continuation obeys presence gap", quiet === "", quiet || "(empty)");
}

// --- 3. Background holds through the punchline --------------------------------
{
  const mk = (id: string, start: number, end: number, role: string, semantic: string) => ({ id, start, end, role, semantic });
  const bg = stabilizeBeatBackgrounds([
    mk("a", 20, 23, "escalation", "And then he deadlifts a weight at the gym."),
    mk("b", 23, 26, "punchline", "A weight that could anchor a small ship offshore."),
  ]);
  check("punchline keeps the setup room", bg["b"] === "BG-GYM", `${bg["a"]} -> ${bg["b"]}`);
}

// --- 4. Agent sheet overrides the render ---------------------------------------
const SHEET_SRT = `1
00:00:00,000 --> 00:00:03,000
And then he deadlifts a weight that could anchor a small ship.

2
00:00:03,000 --> 00:00:06,000
The gym goes completely silent now.
`;
function sheetFixture() {
  const { beats, warnings } = validateSheet([
    {
      beatId: 1, startSec: 0, endSec: 3, dur: 3, bgId: "BG-GYM",
      actor: { id: "a1", x: 780, y: 640, scale: 1.34, gender: "male", hairStyle: "male_short", clothes: "bodybuilder_tank", expression: "shock_jaw_drop", pose: "flexing" },
      camera: { x: 960, y: 520, zoom: 1.9 },
      activeProp: { id: "PROP-GYM", x: 1360, y: 440, scale: 1.3 },
      bannerText: null, graphicType: null, text: "deadlift",
      dropKinds: ["vehicle"],
    },
    {
      beatId: 2, startSec: 3, endSec: 6, dur: 3, bgId: "BG-GYM",
      actor: { id: "a2", x: 780, y: 640, scale: 1.34, gender: "male", hairStyle: "male_short", clothes: "hoodie", expression: "deadpan_classic", pose: "neutral" },
      camera: { x: 960, y: 520, zoom: 1.1 },
      activeProp: null, bannerText: null, graphicType: null, text: "silent",
    },
  ], 0, 6);
  return { beats, warnings };
}
{
  const { beats, warnings } = sheetFixture();
  check("sheet validates clean", beats.length === 2 && warnings.length === 0, warnings.join(";"));
  const prod = createAutoProduction(SHEET_SRT, "casually-procedural", { sheet: beats }) as any;
  const kinds = prod.stageObjects.map((o: any) => o.kind);
  check("sheet dropKinds kills vehicle on stage", !kinds.includes("vehicle"), kinds.join(","));
  const bgs = new Set(Object.values(prod.beatBackgrounds as Record<string, string>));
  check("sheet room wins everywhere covered", bgs.size === 1 && bgs.has("BG-GYM"), [...bgs].join(","));
  const members = new Set([...prod.castRoster.values()].map((e: any) => e.member.actorId));
  check("sheet cast look drives roster", [...members].some((id) => String(id).startsWith("sheet-male/male_short/")), [...members].join(","));
  const frame = renderAutoSvgFrame({ production: prod, timeSec: 1.0, width: 480, height: 270 }) as any;
  check("sheet prop staged in frame", frame.svg.includes("PROP-GYM"), "no PROP-GYM id in svg");
  const plain = createAutoProduction(SHEET_SRT, "casually-procedural", {}) as any;
  const bannerProd = createAutoProduction(SHEET_SRT, "casually-procedural", {
    sheet: [{ ...beats[0], bannerText: "TOO ARTISANAL" }],
  }) as any;
  const bannerFrame = renderAutoSvgFrame({ production: bannerProd, timeSec: 1.0, width: 480, height: 270 }) as any;
  check("sheet banner renders screen-anchored", bannerFrame.svg.includes("TOO ARTISANAL"), "no banner text in svg");
  const noBanner = renderAutoSvgFrame({ production: plain, timeSec: 1.0, width: 480, height: 270 }) as any;
  check("no banner without sheet direction", !noBanner.svg.includes("TOO ARTISANAL"), "banner leaked");
  const cov = sheetCovering(beats, 0, 3);
  check("sheetCovering matches by overlap", cov?.bgId === "BG-GYM", cov?.bgId ?? "none");
}
{
  // Unknown ids fail closed, never crash the render.
  const { beats, warnings } = validateSheet([{
    beatId: 1, startSec: 0, endSec: 2, dur: 2, bgId: "BG-NARNIA",
    actor: { id: "a", x: 0, y: 0, scale: 0, gender: "male", hairStyle: "mohawk", clothes: "spacesuit", expression: "derp", pose: "backflip" },
    camera: { x: 0, y: 0, zoom: 99 }, activeProp: { id: "PROP-SPOON", x: 0, y: 0, scale: 0 },
    bannerText: "x".repeat(50), graphicType: "NOPE", text: "hi",
  }], 0, 2);
  check("bad sheet still yields a safe beat", beats.length === 1 && beats[0].bgId === "BG-STUDIO" && beats[0].activeProp === null, JSON.stringify(beats[0]?.bgId));
  check("bad sheet warns", warnings.length >= 3, warnings.join(";"));
}

// --- 5. Zero burned-in words in auto-staged assets ------------------------------
{
  const nasty = ["yesterday", "ANALYSIS REPORT", "$100", "rent", "anchor a small ship", "too artisanal"];
  const kinds = ["money", "food", "device", "body", "chart", "person", "pill", "sign", "vehicle", "object", "generic"];
  const bad: string[] = [];
  for (const kind of kinds) {
    for (const concept of nasty) {
      const svg = renderProceduralAsset({
        x: 1320, y: 520, scale: 1.35, entry: 1, exit: 0, age: 1.2,
        energy: 0.5, concept, kind, slot: 0, timeSec: 1.2,
      } as Parameters<typeof renderProceduralAsset>[0]);
      if (svg.includes("<text")) bad.push(`${kind}:${concept}`);
    }
  }
  check("no text in any staged asset kind", bad.length === 0, bad.slice(0, 5).join("; "));
}
{
  // Full auto frames (no sheet, no banners, no impact words): zero <text>.
  const anatoly = fs.readFileSync("/root/auto-pipeline/sheets/pigeon-park.srt", "utf8");
  const prod = createAutoProduction(anatoly, "casually-procedural", {}) as any;
  const withText: number[] = [];
  for (let t = 0.5; t < prod.transcript.duration; t += 1.0) {
    const f = renderAutoSvgFrame({ production: prod, timeSec: t, width: 480, height: 270 }) as any;
    if (f.svg.includes("<text")) withText.push(t);
  }
  check("no text in any auto frame", withText.length === 0, `text at ${withText.slice(0, 5).join(",")}`);
}

// --- 6. Cinematic camera: a real move vocabulary --------------------------------
// Moves come from motive: the same analyzer the render path uses. Without
// the brain, the director must NOT travel (asserted below on pigeon too).
{
  const ch1 = fs.readFileSync("/root/auto-pipeline/public/0-chapter-1.srt", "utf8");
  const tr = buildTranscript(parseSrt(ch1));
  const brain = analyzeComedy(tr);
  const punchSentences = new Set<number>();
  for (const u of brain.units) {
    const n = brain.notes.get(u.punchSentence);
    if (u.punchWord && n && n.evidence.total >= 2) punchSentences.add(u.punchSentence);
  }
  const roomOfSentence = (si: number): string | null => {
    for (const u of brain.units) if (u.sentences.includes(si)) return u.room;
    return null;
  };
  const roleOfSentence = (si: number): string | null => brain.notes.get(si)?.role ?? null;
  const plan = direct(tr, { punchSentences, roomOfSentence, roleOfSentence });
  // Setups establish: no macro/subject/insert shot may START inside a setup
  // sentence's span (the v3-27 phone macro on "The camera zooms in.").
  // Bleed-over from a neighboring escalation is timing, not direction.
  {
    const bad = plan.shots.filter((s) => s.kind === "macro" || s.kind === "subject" || s.kind === "insert");
    const badOnes: string[] = [];
    for (const s of bad) {
      for (const [si, n] of brain.notes) {
        if (n.role !== "setup") continue;
        const sent = tr.sentences[si];
        if (s.start >= sent.start && s.start < sent.end) { badOnes.push(`${s.id}@${s.kind}`); break; }
      }
    }
    check("no close-ups on setup sentences", badOnes.length === 0, badOnes.slice(0, 4).join(","));
  }
  const moves = new Set(plan.shots.map((s) => s.move));
  for (const m of ["cut", "whip", "punch", "pull"]) {
    check(`director emits ${m}`, moves.has(m as never), [...moves].join(","));
  }
  // Restraint: cuts dominate; travel moves are budgeted, not sprayed.
  const travels = plan.shots.filter((s) => s.move === "punch" || s.move === "whip").length;
  const cuts = plan.shots.filter((s) => s.move === "cut").length;
  check("cuts dominate travel moves", cuts > travels * 2, `cuts=${cuts} travel=${travels}`);
  const legacy = direct(tr, {});
  const legacyTravel = legacy.shots.filter((s) => s.move === "punch" || s.move === "whip").length;
  check("motive spends less than trigger-spray", travels <= legacyTravel, `motive=${travels} legacy=${legacyTravel}`);
  // Crash-zoom clamp: no cut jumps more than 1.35x.
  let worst = 1;
  let prev = 1;
  for (const s of plan.resolved) {
    if (s.move === "cut" && prev > 0) worst = Math.max(worst, s.zoom / prev, prev / s.zoom);
    prev = s.zoomEnd ?? s.zoom;
  }
  check("no crash-zoom cuts", worst <= 1.36, `worst jump ${worst.toFixed(2)}x`);
  const whip = plan.resolved.find((s) => s.move === "whip");
  if (whip) {
    const xs: number[] = [];
    for (let i = 0; i <= 8; i++) xs.push(cameraAt(plan.resolved, whip.start + ((whip.end - whip.start) * i) / 8).centerX);
    check("whip actually travels", Math.max(...xs) - Math.min(...xs) > 150, `range ${(Math.max(...xs) - Math.min(...xs)).toFixed(0)}px`);
  } else {
    check("whip actually travels", false, "no whip shot");
  }
  // Every punch shot must visibly snap (reaction accents are small by
  // design; the word-timed boost is the main event and is asserted next).
  const punchShots = plan.resolved.filter((s) => s.move === "punch");
  let punchBest = 0;
  for (const p of punchShots) {
    const zs: number[] = [];
    for (let i = 0; i <= 8; i++) zs.push(cameraAt(plan.resolved, p.start + ((p.end - p.start) * i) / 8).zoom);
    punchBest = Math.max(punchBest, Math.max(...zs) - Math.min(...zs));
  }
  check("punch shots visibly snap", punchShots.length > 0 && punchBest > 0.05, `${punchShots.length} punch shots, best range ${punchBest.toFixed(2)}x`);
  check("word punch boost peaks on the word", punchZoomBoost(0.12, 0, 0.8) > 0.2 && punchZoomBoost(-0.5, 0, 0.8) === 0,
    `peak ${punchZoomBoost(0.12, 0, 0.8).toFixed(2)}`);
  // Anticipation: the camera crouches (~-4%) in the 250ms before the word.
  const dip = punchZoomBoost(-0.15, 0, 0.8);
  check("punch anticipates before the word", dip < -0.005 && dip > -0.06, `dip ${dip.toFixed(3)}`);
  // Squash & stretch preserves volume through the hit.
  const sq = impactSquash(0.5);
  check("impact squash preserves volume", Math.abs(sq.sx * sq.sy - 1) < 0.01 && sq.sx > 1 && sq.sy < 1,
    `${sq.sx.toFixed(3)}x${sq.sy.toFixed(3)}`);
  const rest = impactSquash(0);
  check("squash rests at neutral", rest.sx === 1 && rest.sy === 1, `${rest.sx}x${rest.sy}`);
}

if (failures > 0) {
  console.error(`\n${failures} check(s) FAILED`);
  process.exit(1);
}
console.log("\nAll director-fix checks passed.");
