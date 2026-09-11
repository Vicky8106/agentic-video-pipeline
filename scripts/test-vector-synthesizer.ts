/**
 * Test Suite: VectorSynthesizer & SvgValidator (GATE-FORGE-02)
 */
import { synthesizePropVector, synthesizeCaricatureVector } from "../src/forge/VectorSynthesizer.js";
import { validateAndSanitizeSvg } from "../src/forge/SvgValidator.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running VectorSynthesizer & SvgValidator Tests...");

  // 1. Test Prop Synthesis
  console.log("Testing Prop Synthesis for PROP-ESPRESSO...");
  const prop = await synthesizePropVector({
    id: "PROP-ESPRESSO",
    name: "Italian Commercial Espresso Machine",
    description: "Shiny stainless steel machine with dual brass portafilters, pressure gauges, steam wand, and drip tray",
    holdingStyle: "tabletop",
    approximateDimensions: { width: 300, height: 220 },
  });

  assert(typeof prop.svgFragment === "string" && prop.svgFragment.length > 50, "Prop must return non-empty SVG fragment");
  assert(Number.isFinite(prop.gripX) && Number.isFinite(prop.gripY), "Prop must provide finite grip coordinates");

  // Validate SVG with SvgValidator
  const val = validateAndSanitizeSvg(prop.svgFragment);
  assert(val.valid, `Synthesized prop SVG must pass validation: ${val.errors.join(", ")}`);
  assert(!val.sanitizedSvg.includes("<script"), "Sanitized SVG must not contain <script>");

  console.log(`PASS: Prop synthesized cleanly with grip at (${prop.gripX}, ${prop.gripY}).`);

  // 2. Test Caricature Synthesis
  console.log("Testing Caricature Synthesis for chef_gordon...");
  const chef = await synthesizeCaricatureVector({
    id: "chef_gordon",
    name: "Gordon Ramsay",
    archetype: "chef",
    description: "Aggressive British chef with tall pleated toque hat, furrowed brow, and white double-breasted coat",
    signatureFeatures: {
      headwear: "tall pleated chef toque",
      clothing: "white double-breasted chef jacket with black buttons",
      expression: "furious",
    },
  });

  assert(typeof chef.headwearSvg === "string" && chef.headwearSvg.length > 20, "Must synthesize headwear overlay");
  assert(typeof chef.torsoSvg === "string" && chef.torsoSvg.length > 20, "Must synthesize torso overlay");

  console.log("PASS: Caricature synthesized with headwear and torso overlays.");
  console.log("GATE-FORGE-02 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
