/**
 * Test Suite: BatchSynthesizer (GATE-BEAT-04)
 */
import { batchSynthesizeBOM } from "../src/forge/BatchSynthesizer.js";
import { ProductionBOM } from "../src/forge/ManifestRoster.js";
import { renderProp } from "../src/assets/PropLibrary.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running BatchSynthesizer Tests...");

  const testBOM: ProductionBOM = {
    totalBeats: 2,
    totalDurationSec: 16.0,
    props: [
      {
        id: "PROP-TEA-CUP",
        description: "Fine porcelain teacup with saucer and rising steam swirl",
        beatOccurrences: [1],
        isNovel: true,
        inCache: false,
      },
      {
        id: "PROP-MAGIC-TOPHAT",
        description: "Magician black silk top hat with rabbit ears poking out",
        beatOccurrences: [2],
        isNovel: true,
        inCache: false,
      },
    ],
    backgrounds: [],
    characters: [],
    counts: {
      uniqueProps: 2,
      uniqueBackgrounds: 0,
      uniqueCharacters: 0,
      totalUniqueAssets: 2,
      novelPropsToSynthesize: 2,
      novelBackgroundsToSynthesize: 0,
      novelCaricaturesToSynthesize: 0,
    },
  };

  const report = await batchSynthesizeBOM(testBOM);
  console.log("Batch synthesis report:", report);

  assert(report.propsSynthesized.includes("PROP-TEA-CUP"), "Must synthesize PROP-TEA-CUP");
  assert(report.propsSynthesized.includes("PROP-MAGIC-TOPHAT"), "Must synthesize PROP-MAGIC-TOPHAT");

  // Verify renderProp can immediately render both newly synthesized assets
  const svgTea = renderProp("PROP-TEA-CUP", { x: 50, y: 50 });
  const svgHat = renderProp("PROP-MAGIC-TOPHAT", { x: 50, y: 50 });

  assert(svgTea.includes("PROP-TEA-CUP") && svgTea.includes("<path"), "PROP-TEA-CUP must render valid SVG");
  assert(svgHat.includes("PROP-MAGIC-TOPHAT") && svgHat.includes("<path"), "PROP-MAGIC-TOPHAT must render valid SVG");

  console.log("PASS: BatchSynthesizer successfully generated, validated, and mounted novel assets.");
  console.log("GATE-BEAT-04 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
