/**
 * Test Suite: End-to-End Multi-Beat Production (GATE-BEAT-05)
 *
 * Verifies full end-to-end integration:
 * 1. Script Segmentation (BeatSegmenter)
 * 2. Visual Beat Manifest Extraction (BeatManifestExtractor)
 * 3. Production BOM Compilation & Deduplication (ManifestRoster)
 * 4. Batch Synthesis of Novel Assets (BatchSynthesizer)
 * 5. Direct Vector Rendering of all beat assets into valid SVG
 */
import fs from "node:fs";
import { segmentScriptIntoBeats } from "../src/forge/BeatSegmenter.js";
import { extractFullBeatManifest } from "../src/forge/BeatManifestExtractor.js";
import { compileProductionBOM } from "../src/forge/ManifestRoster.js";
import { batchSynthesizeBOM } from "../src/forge/BatchSynthesizer.js";
import { renderProp } from "../src/assets/PropLibrary.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running GATE-BEAT-05 End-to-End Multi-Beat Production Test...");

  const srtPath = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.srt";
  assert(fs.existsSync(srtPath), `SRT file must exist at ${srtPath}`);
  const srt = fs.readFileSync(srtPath, "utf8");

  // Step 1: Segment script into comedic beat windows
  const allBeats = segmentScriptIntoBeats(srt, 8.0);
  assert(allBeats.length >= 80, `Expected 80+ beats in full Anatoly script, got ${allBeats.length}`);

  // Test across a multi-beat slice (first 6 beats, ~48s)
  const testBeats = allBeats.slice(0, 6);
  console.log(`[Step 1] Segmented ${testBeats.length} beats for E2E verification.`);

  // Step 2: Extract visual manifest for all beats in slice
  console.log("[Step 2] Extracting visual manifest via LLM...");
  const manifest = await extractFullBeatManifest(testBeats, 6);
  assert(manifest.length === testBeats.length, `Expected ${testBeats.length} manifest items, got ${manifest.length}`);

  console.log("Extracted Manifest for Slice:");
  manifest.forEach((m) => {
    console.log(`  Beat #${m.beatIndex} [${m.startSec}s - ${m.endSec}s]: Prop=${m.propId || "none"}, BG=${m.bgId}, Char=${m.characterId}, Gag="${m.visualGag}"`);
  });

  // Step 3: Compile Production Bill of Materials
  console.log("[Step 3] Compiling Production Bill of Materials...");
  const bom = compileProductionBOM(manifest);
  console.log("Production BOM counts:", bom.counts);
  assert(bom.counts.totalUniqueAssets >= 3, `Expected at least 3 unique assets, got ${bom.counts.totalUniqueAssets}`);

  // Step 4: Batch synthesize any novel assets
  console.log("[Step 4] Batch synthesizing novel assets in BOM...");
  const synthesisReport = await batchSynthesizeBOM(bom);
  console.log("Synthesis report:", synthesisReport);
  assert(synthesisReport.errors.length === 0, `Synthesis had errors: ${synthesisReport.errors.join(", ")}`);

  // Step 5: Render vector frames for each beat's assets
  console.log("[Step 5] Rendering vector assets for all beats...");
  let renderedPropsCount = 0;
  for (const beat of manifest) {
    if (beat.propId) {
      const svg = renderProp(beat.propId, { x: 960, y: 540 });
      assert(svg.length > 50, `Rendered SVG for prop ${beat.propId} must be non-empty`);
      assert(svg.includes("<path") || svg.includes("<rect") || svg.includes("<g") || svg.includes("<ellipse"), `Prop ${beat.propId} must contain valid vector tags`);
      renderedPropsCount++;
    }
  }

  console.log(`Successfully verified and rendered ${renderedPropsCount} props across ${manifest.length} beats.`);
  console.log("GATE-BEAT-05 PASS: Multi-beat production pipeline fully verified end-to-end.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
