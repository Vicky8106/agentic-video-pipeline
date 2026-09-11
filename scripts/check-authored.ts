/**
 * check-authored: the authored-film gate. An authored scene earns its seconds
 * only if a director's motive is on record and every covered frame renders.
 *
 *   NODE_OPTIONS=--max-old-space-size=512 npx tsx scripts/check-authored.ts \
 *     --film ../authored/pigeon-park/scene1-morning-feed.js
 *
 * Fails closed: gaps in coverage, missing intent, out-of-bounds cameras,
 * thin/placeholder frames, or a scene whose frames don't change over time
 * (a directed scene is a performance, never a slideshow).
 */
import {
  coverageGaps,
  renderAuthoredFrame,
  type AuthoredFilm,
} from "../src/authored/AuthoredScene.js";

const args = process.argv.slice(2);
const get = (name: string, fallback = "") => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};

const filmPath = get("--film", "../authored/pigeon-park/scene1-morning-feed.js");
const mod = await import(filmPath) as {
  film: AuthoredFilm;
  WINDOW?: { start: number; end: number };
};
const film = mod.film;
const start = Number(get("--start", String(mod.WINDOW?.start ?? film.scenes[0].start)));
const end = Number(get("--end", String(mod.WINDOW?.end ?? film.scenes[film.scenes.length - 1].end)));

let failures = 0;
const check = (name: string, cond: boolean, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond || !detail ? "" : `  (${detail})`}`);
  if (!cond) failures++;
};

// 1. Coverage: the declared window tiles with no gaps and no overlaps.
{
  const gaps = coverageGaps(film, start, end);
  check(`window [${start},${end}] fully covered (no undirecteds)`, gaps.length === 0, JSON.stringify(gaps));
  const sorted = [...film.scenes].sort((a, b) => a.start - b.start);
  let overlap = false;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end > sorted[i + 1].start + 1e-6) overlap = true;
  }
  check("scenes do not overlap", !overlap);
}

// 2. Intent: every scene carries its motive on record.
{
  const bad = film.scenes.filter((s) => !s.intent || s.intent.trim().length < 40);
  check(`intents on record (${film.scenes.length})`, bad.length === 0, bad.map((s) => s.id).join(","));
}

// 3. Cameras stay inside the compostable world; zooms stay cinematic.
{
  let ok = true;
  for (const s of film.scenes) {
    for (let t = s.start; t <= s.end + 1e-6; t += 0.5) {
      const c = s.camera(t);
      if (![c.x, c.y, c.zoom].every(Number.isFinite)) { ok = false; console.log(`  non-finite cam ${s.id} @${t}`); }
      if (c.x < 200 || c.x > 1720 || c.y < 200 || c.y > 880) { ok = false; console.log(`  cam out of bounds ${s.id} @${t}: ${c.x},${c.y}`); }
      if (c.zoom < 0.8 || c.zoom > 2.4) { ok = false; console.log(`  zoom out of range ${s.id} @${t}: ${c.zoom}`); }
    }
  }
  check("cameras in bounds", ok);
}

// 4. Frames render: non-empty, no error strings, no catalog placeholders.
{
  let ok = true;
  for (const s of film.scenes) {
    for (const t of [s.start + 0.05, (s.start + s.end) / 2, s.end - 0.05]) {
      try {
        const svg = renderAuthoredFrame(film, t);
        if (!svg || svg.length < 2000) { ok = false; console.log(`  thin frame ${s.id} @${t}`); }
        if (/undefined|NaN/.test(svg)) { ok = false; console.log(`  error string in frame ${s.id} @${t}`); }
        if (/&gt;PROP-|&gt;BG-/.test(svg)) { ok = false; console.log(`  placeholder leak in frame ${s.id} @${t}`); }
      } catch (e) {
        ok = false;
        console.log(`  frame threw ${s.id} @${t}: ${(e as Error).message}`);
      }
    }
  }
  check("frames render clean", ok);
}

// 5. Anti-slideshow: a directed performance changes over time.
{
  let ok = true;
  for (const s of film.scenes) {
    const a = renderAuthoredFrame(film, s.start + 0.05);
    const b = renderAuthoredFrame(film, (s.start + s.end) / 2);
    const c = renderAuthoredFrame(film, s.end - 0.05);
    if (a === b || b === c) { ok = false; console.log(`  static scene ${s.id}`); }
  }
  check("scenes perform (frames differ)", ok);
}

if (failures > 0) {
  console.error(`\n${failures} authored check(s) FAILED`);
  process.exit(1);
}
console.log("\nAll authored checks passed.");
