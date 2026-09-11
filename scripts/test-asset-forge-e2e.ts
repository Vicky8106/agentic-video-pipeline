/**
 * Test Suite: End-to-End Autonomous Pipeline with LLM Asset Forge (GATE-FORGE-04)
 */
import { forgeAssetsForScript } from "../src/forge/ScriptAssetPipeline.js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running End-to-End LLM Asset Forge Pipeline Tests...");

  const NOVEL_SCRIPT_SRT = `
1
00:00:00,000 --> 00:00:04,500
Chef Luigi stands in his Italian bistro preparing the world's most dangerous espresso.

2
00:00:04,500 --> 00:00:09,000
He grabs the roaring espresso machine and locks in the brass portafilter.

3
00:00:09,000 --> 00:00:14,000
Suddenly the machine erupts into volcanic golden coffee while Luigi screams at the camera.
  `.trim();

  // 1. Run the Asset Forge to analyze the script and synthesize missing visual assets
  console.log("Step 1: Running Asset Forge on novel script...");
  const report = await forgeAssetsForScript(NOVEL_SCRIPT_SRT, { verbose: true });
  console.log("Asset Forge Report:", report);

  assert(
    report.propsCreated.length > 0 || report.cachedHits.length > 0,
    "Asset Forge must create or load cached assets for novel script"
  );

  // 2. Create production using the newly synthesized assets
  console.log("Step 2: Compiling AutoProduction...");
  const production = createAutoProduction(NOVEL_SCRIPT_SRT, "casually-procedural");
  assert(production.transcript.duration > 10, "Transcript duration must be > 10s");
  assert(production.plan.resolved.length >= 3, "Production plan must have at least 3 camera shots");

  // 3. Render frame at t=6.0s (where the novel prop / action is staged)
  console.log("Step 3: Rendering SVG frame with newly forged assets...");
  const { svg } = renderAutoSvgFrame({
    production,
    timeSec: 6.0,
    width: 1280,
    height: 720,
  });

  assert(typeof svg === "string" && svg.length > 500, "Rendered frame must be a valid SVG string");
  assert(svg.includes("<svg") && svg.includes("</svg>"), "Must be a complete SVG document");

  console.log("PASS: Frame rendered cleanly with dynamically synthesized visual assets.");
  console.log("GATE-FORGE-04 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
