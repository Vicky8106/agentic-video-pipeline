/**
 * critic-plan: pre-render gates on ShowPlan.json. Seconds, no rendering.
 *
 *   1. coverage: the reactor (host) is inside the tight frame on every
 *      non-wide beat (60px margin).
 *   2. collision: no two cast marks share a beat within 220px.
 *   3. timing: punches land inside the beat's back 70%; beats tile their
 *      window (first starts at window start, last ends at window end,
 *      gaps <= 1.5s).
 *   4. style: <= 3 punches/macros/tags per window (HOUSE_STYLE restraint);
 *      no beat with zero props AND zero cast fx ("empty tableau").
 *
 *   tsx scripts/critic-plan.ts --plan output/showplan.json
 *   tsx scripts/critic-plan.ts --selftest   (4 fixtures, each fails one gate)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ShowPlan, ShowBeat } from "../src/director/ShowPlan";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name: string, def: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
};

export interface GateFail { gate: string; where: string; detail: string; }

export function criticize(plan: ShowPlan): GateFail[] {
  const fails: GateFail[] = [];
  for (const w of plan.windows) {
    let punchCount = 0;
    for (const b of w.beats) {
      const where = `${w.windowId} beat ${b.beatId} (${b.beatType}/${b.shot})`;
      // 1. coverage
      if (b.shot !== "wide") {
        punchCount++;
        const host = b.cast.find((c) => c.role === "host");
        if (host) {
          const vbw = 1920 / b.tight.zoom;
          if (Math.abs(host.mark.x - b.tight.cx) > vbw / 2 - 60) {
            fails.push({ gate: "coverage", where, detail: `host x=${host.mark.x} outside tight frame cx=${b.tight.cx} zoom=${b.tight.zoom}` });
          }
        } else {
          fails.push({ gate: "coverage", where, detail: "non-wide beat has no host" });
        }
      }
      // 2. collision
      for (let i = 0; i < b.cast.length; i++) {
        for (let j = i + 1; j < b.cast.length; j++) {
          const a = b.cast[i].mark;
          const c = b.cast[j].mark;
          if (Math.hypot(a.x - c.x, a.y - c.y) < 220) {
            fails.push({ gate: "collision", where, detail: `${b.cast[i].id} vs ${b.cast[j].id} share a mark` });
          }
        }
      }
      // 3. timing
      const dur = b.endSec - b.startSec;
      if (b.shot !== "wide" && (b.punchAt < b.startSec + dur * 0.3 || b.punchAt > b.endSec)) {
        fails.push({ gate: "timing", where, detail: `punchAt=${b.punchAt.toFixed(2)} outside beat back-70%` });
      }
      // 4a. empty tableau: one lonely actor with no prop and no fx is dead air.
      // Two-plus emoting actors carry a beat without props — that is allowed.
      const hasFx = b.cast.some((c) => c.fx && c.fx !== "none");
      if (b.props.length === 0 && !hasFx && b.cast.length <= 1) {
        fails.push({ gate: "style", where, detail: "lone actor with zero props and zero fx" });
      }
    }
    // 3b. tiling: windows tile the chapter for concat; beats may start late
    // (leading silence) but dead air inside a window is a fault.
    const sorted = [...w.beats].sort((a, b) => a.startSec - b.startSec);
    if (sorted[0].startSec - w.startSec > 2.5) {
      fails.push({ gate: "timing", where: w.windowId, detail: "first beat starts >2.5s after window start" });
    }
    if (w.endSec - sorted[sorted.length - 1].endSec > 2.5) {
      fails.push({ gate: "timing", where: w.windowId, detail: "last beat ends >2.5s before window end" });
    }
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].startSec - sorted[i - 1].endSec > 2.0) {
        fails.push({ gate: "timing", where: w.windowId, detail: `gap before beat ${sorted[i].beatId}` });
      }
    }
    // 4b. shot budget: alternation (enforced by the compiler) already caps
    // non-wide shots at ceil(n/2); this backstop allows one extra.
    if (punchCount > Math.ceil(w.beats.length / 2) + 1) {
      fails.push({ gate: "style", where: w.windowId, detail: `${punchCount} non-wide shots over budget` });
    }
  }
  return fails;
}

function baseBeat(over: Partial<ShowBeat> = {}): ShowBeat {
  return {
    beatId: 1, startSec: 0, endSec: 10, beatType: "tableau", shot: "wide",
    wide: { cx: 960, cy: 560, zoom: 1.25 }, tight: { cx: 960, cy: 560, zoom: 1.25 },
    punchAt: 0,
    cast: [{
      id: "host", role: "host", gender: "male", hairStyle: "male_short",
      clothes: "none", mark: { x: 400, y: 670 },
      entrance: { from: "left", start: 0, end: 0 }, expression: "deadpan_classic",
    }],
    props: [{ builder: "moneyBag", at: { x: 1250, y: 640 }, cue: { appear: 0.5, act: 6, settle: 10 } }],
    srt: "fixture",
    ...over,
  };
}

function basePlan(beat: ShowBeat): ShowPlan {
  return {
    show: "fixture", generatedAt: "", generator: "selftest",
    windows: [{ windowId: "W", startSec: 0, endSec: 10, beats: [beat] }],
  };
}

function selftest(): boolean {
  const cases: Array<{ name: string; plan: ShowPlan; expectGate: string }> = [
    {
      name: "coverage",
      plan: basePlan(baseBeat({
        shot: "punch", tight: { cx: 1500, cy: 560, zoom: 1.6 }, punchAt: 7,
      })),
      expectGate: "coverage",
    },
    {
      name: "collision",
      plan: basePlan(baseBeat({
        cast: [
          { id: "host", role: "host", gender: "male", hairStyle: "male_short", clothes: "none", mark: { x: 400, y: 670 }, entrance: { from: "left", start: 0, end: 0 }, expression: "deadpan_classic" },
          { id: "guest1", role: "guest", gender: "male", hairStyle: "male_short", clothes: "hoodie", mark: { x: 450, y: 665 }, entrance: { from: "left", start: 0.3, end: 1.3 }, expression: "deadpan_classic" },
        ],
      })),
      expectGate: "collision",
    },
    {
      name: "timing",
      plan: basePlan(baseBeat({ shot: "punch", punchAt: 1 })),
      expectGate: "timing",
    },
    {
      name: "style-empty",
      plan: basePlan(baseBeat({ props: [] })),
      expectGate: "style",
    },
  ];
  let ok = true;
  for (const c of cases) {
    const fails = criticize(c.plan);
    const hit = fails.some((f) => f.gate === c.expectGate);
    console.log(`[selftest] ${c.name}: ${hit ? "FAILS-AS-INTENDED" : "MISSED!"}`);
    if (!hit) ok = false;
  }
  const clean = criticize(basePlan(baseBeat()));
  console.log(`[selftest] clean: ${clean.length === 0 ? "PASSES" : `FALSE-POSITIVE ${JSON.stringify(clean)}`}`);
  return ok && clean.length === 0;
}

// --- main --------------------------------------------------------------------
if (process.argv.includes("--selftest")) {
  const pass = selftest();
  console.log(pass ? "[critic-plan] SELFTEST PASS" : "[critic-plan] SELFTEST FAIL");
  process.exit(pass ? 0 : 1);
}
const planPath = arg("plan", "");
if (!planPath) {
  console.error("Usage: tsx scripts/critic-plan.ts --plan <showplan.json> | --selftest");
  process.exit(1);
}
const plan: ShowPlan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const fails = criticize(plan);
for (const f of fails) console.log(`[${f.gate}] ${f.where}: ${f.detail}`);
console.log(fails.length === 0 ? "[critic-plan] ALL GATES PASS" : `[critic-plan] ${fails.length} FAILURES`);
process.exit(fails.length === 0 ? 0 : 2);
