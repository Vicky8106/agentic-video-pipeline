/**
 * Minimal-failing-subset bisection for the resvg panic frame.
 * Renders variants of /tmp/crash_probe.svg in isolated child processes:
 *   - each top-level layer removed
 *   - viewBox swapped to full-canvas (camera dependency test)
 *   - individual elements removed
 */
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const svg = fs.readFileSync("/tmp/crash_probe.svg", "utf8");
// strip the comment header line for clean parsing
const body = svg.replace(/^<!--[^>]*-->\n/, "");

function tryRender(name, s: string): boolean {
  fs.writeFileSync("/tmp/bisect_input.svg", s);
  const r = spawnSync("node", ["-e", `
    const { Resvg } = require("/root/casually_engine_v7/node_modules/.pnpm/@resvg+resvg-js@2.6.2/node_modules/@resvg/resvg-js/index.js");
    const fs = require("fs");
    const svg = fs.readFileSync("/tmp/bisect_input.svg", "utf8");
    try {
      new Resvg(svg, { fitTo: { mode: "width", value: 1280 }, font: { fontFiles: ["/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"], defaultFontFamily: "Noto Sans", loadSystemFonts: false } }).render();
      process.exit(0);
    } catch (e) { console.error(String(e).slice(0,80)); process.exit(3); }
  `], { encoding: "utf8" });
  const ok = r.status === 0;
  console.log(`${ok ? "OK  " : "FAIL"} ${name} ${ok ? "" : (r.stderr || "").slice(0, 60)}`);
  return ok;
}

// 1. baseline
tryRender("full frame", body);

// 2. swap viewBox
tryRender("viewBox=full-canvas", body.replace(/viewBox="[^"]*"/, 'viewBox="0 0 1920 1080"'));

// 3. remove each top-level group
const groups = ["scene-background", "scene-character", "scene-foreground", "subtitle-band"];
for (const id of groups) {
  const re = new RegExp(`<g id="${id}">[\\s\\S]*?</g>\\n?`);
  const m = body.match(re);
  if (m) tryRender(`without ${id}`, body.replace(m[0], ""));
  else console.log(`SKIP ${id}: no simple match`);
}

// 4. slam card (the <g transform="translate(960 ...) group containing font-size 86)
const slamRe = /<g transform="translate\(\d+ \d+\) rotate\([^)]*\) scale\([^)]*\)" opacity="[^"]*">[\s\S]*?impactShadow[\s\S]*?<\/g>/;
if (slamRe.test(body)) tryRender("without slam card", body.replace(slamRe, ""));

// 5. remove figures one by one (stick-figure groups)
const figRe = /<g id="[^"]*" class="stick-figure"[^>]*>[\s\S]*?<\/g>\s*(?=<g id="[^"]*" class="stick-figure"|<g id="scene-foreground"|<g transform="translate\(960|$)/g;
let figs = [...body.matchAll(/<g id="([^"]+)" class="stick-figure"/g)].map(m => m[1]);
console.log("figures found:", figs);
for (const id of figs) {
  const start = body.indexOf(`<g id="${id}" class="stick-figure"`);
  if (start > -1) {
    // balanced-cut: find matching close by counting <g and </g>
    let depth = 0, i = start, end = -1;
    while (i < body.length) {
      if (body.startsWith("<g", i)) { depth++; i += 2; continue; }
      if (body.startsWith("</g>", i)) { depth--; if (depth === 0) { end = i + 4; break; } i += 4; continue; }
      i++;
    }
    if (end > 0) tryRender(`without figure ${id}`, body.slice(0, start) + body.slice(end));
  }
}
console.log("BISECT DONE — check which removals turn FAIL into OK");
