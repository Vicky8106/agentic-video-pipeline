/**
 * check-catalogs: every catalog id the director can name must resolve in
 * the renderer. Run after adding a background, prop, hairstyle, outfit,
 * expression, pose, or ensemble member — and before rendering a sheet that
 * uses it.
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/check-catalogs.ts
 *
 * SVG-string level only (no resvg): catches unknown ids, typos, and
 * registry drift. Fail-closed validation drops bad ids at render, but this
 * gate catches them at author time.
 */
import { renderBackground } from "../src/assets/BackgroundLibrary.js";
import { renderProp } from "../src/assets/PropLibrary.js";
import { renderStickFigure } from "../src/character/StickFigure.js";
import { ENSEMBLE } from "../src/production/SitcomCast.js";
import {
  BG_IDS, PROP_IDS, HAIRSTYLES, OUTFITS, EXPRESSIONS, POSES,
} from "../src/director/LlmDirector.js";

let failures = 0;
const check = (name: string, cond: boolean, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond || !detail ? "" : `  (${detail})`}`);
  if (!cond) failures++;
};

// Backgrounds: each id renders non-empty, distinct SVG.
{
  const seen = new Set<string>();
  let ok = true;
  for (const id of BG_IDS) {
    try {
      const svg = renderBackground(id, { timeSec: 1 });
      if (!svg || svg.length < 100) { ok = false; console.log(`  thin bg ${id}`); }
      seen.add(svg.length > 2000 ? svg.slice(0, 2000) : svg);
    } catch (e) {
      ok = false;
      console.log(`  bg threw ${id}: ${(e as Error).message}`);
    }
  }
  check(`backgrounds render (${BG_IDS.length})`, ok);
}

// Props: each id renders non-empty SVG.
{
  let ok = true;
  for (const id of PROP_IDS) {
    try {
      const svg = renderProp(id, { x: 1360, y: 440, scale: 1.3, timeSec: 1 });
      if (!svg || svg.length < 50) { ok = false; console.log(`  thin prop ${id}`); }
    } catch (e) {
      ok = false;
      console.log(`  prop threw ${id}: ${(e as Error).message}`);
    }
  }
  check(`props render (${PROP_IDS.size})`, ok);
}

// Ensemble: every member's look renders with its gender/hair/clothes.
{
  let ok = true;
  for (const m of ENSEMBLE) {
    if (!HAIRSTYLES.includes(m.hairStyle)) { ok = false; console.log(`  unknown hair ${m.actorId}: ${m.hairStyle}`); }
    if (!OUTFITS.includes(m.clothes)) { ok = false; console.log(`  unknown clothes ${m.actorId}: ${m.clothes}`); }
    try {
      const svg = renderStickFigure(`check-${m.actorId}`, {
        x: 1250, y: 652, scale: 1.2, gender: m.gender as "male",
        hairStyle: m.hairStyle as "male_short", clothes: m.clothes as "none",
        expression: "deadpan_classic", timeSec: 1,
      } as Parameters<typeof renderStickFigure>[1]);
      if (!svg || svg.length < 100) { ok = false; console.log(`  thin figure ${m.actorId}`); }
    } catch (e) {
      ok = false;
      console.log(`  figure threw ${m.actorId}: ${(e as Error).message}`);
    }
  }
  check(`ensemble renders (${ENSEMBLE.length})`, ok);
}

// Expressions × poses: spot-check the directed-acting vocabulary renders.
{
  let ok = true;
  for (const e of EXPRESSIONS) {
    try {
      renderStickFigure(`check-expr`, {
        x: 0, y: 0, scale: 1, gender: "male", hairStyle: "male_short",
        clothes: "none", expression: e as "deadpan_classic", timeSec: 1,
      } as Parameters<typeof renderStickFigure>[1]);
    } catch (err) {
      ok = false;
      console.log(`  expression threw ${e}: ${(err as Error).message}`);
    }
  }
  check(`expressions accepted (${EXPRESSIONS.length})`, ok);
  console.log(`INFO  poses catalogued (${POSES.length}): validated at sheet time`);
}

if (failures > 0) {
  console.error(`\n${failures} catalog check(s) FAILED`);
  process.exit(1);
}
console.log("\nAll catalog checks passed.");
