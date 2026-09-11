/**
 * Test Suite: Deduplication & Catalog Cross-Reference (GATE-BEAT-03)
 */
import { compileProductionBOM } from "../src/forge/ManifestRoster.js";
import { BeatVisualSpec } from "../src/forge/BeatManifestExtractor.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running Deduplication & Catalog Cross-Reference Tests...");

  const mockBeats: BeatVisualSpec[] = [
    {
      beatIndex: 1,
      startSec: 0,
      endSec: 8,
      text: "Intro beat with mop",
      visualGag: "Holding mop",
      propId: "PROP-GYM",
      bgId: "BG-GYM",
      characterId: "anatoly",
    },
    {
      beatIndex: 2,
      startSec: 8,
      endSec: 16,
      text: "Novel prop demonstration",
      visualGag: "Holding golden trophy",
      propId: "PROP-GOLD-TROPHY",
      propDescription: "A shiny golden cup trophy",
      bgId: "BG-GYM",
      characterId: "anatoly",
    },
    {
      beatIndex: 3,
      startSec: 16,
      endSec: 24,
      text: "Return of the mop",
      visualGag: "Sweeping with mop",
      propId: "PROP-GYM",
      bgId: "BG-STREET",
      characterId: "anatoly",
    },
    {
      beatIndex: 4,
      startSec: 24,
      endSec: 32,
      text: "Golden trophy celebrated",
      visualGag: "Lifting trophy high",
      propId: "PROP-GOLD-TROPHY",
      bgId: "BG-STREET",
      characterId: "anatoly",
    },
    {
      beatIndex: 5,
      startSec: 32,
      endSec: 40,
      text: "Third mop appearance",
      visualGag: "Leaning on mop",
      propId: "PROP-GYM",
      bgId: "BG-GYM",
      characterId: "anatoly",
    },
  ];

  const bom = compileProductionBOM(mockBeats);

  // Assertions:
  // 1. Total unique props should be 2 (PROP_MOP and PROP-GOLD-TROPHY)
  assert(bom.counts.uniqueProps === 2, `Expected 2 unique props, got ${bom.counts.uniqueProps}`);

  // 2. PROP-GYM should have 3 occurrences: [1, 3, 5]
  const gymItem = bom.props.find((p) => p.id === "PROP-GYM");
  assert(!!gymItem, "PROP-GYM must exist in roster");
  assert(
    JSON.stringify(gymItem!.beatOccurrences) === JSON.stringify([1, 3, 5]),
    `PROP-GYM beat occurrences should be [1, 3, 5], got ${JSON.stringify(gymItem!.beatOccurrences)}`
  );
  assert(gymItem!.isNovel === false, "PROP-GYM must be catalog asset (not novel)");

  // 3. PROP-GOLD-TROPHY should have 2 occurrences: [2, 4] and isNovel = true
  const trophyItem = bom.props.find((p) => p.id === "PROP-GOLD-TROPHY");
  assert(!!trophyItem, "PROP-GOLD-TROPHY must exist in roster");
  assert(
    JSON.stringify(trophyItem!.beatOccurrences) === JSON.stringify([2, 4]),
    `PROP-GOLD-TROPHY occurrences should be [2, 4], got ${JSON.stringify(trophyItem!.beatOccurrences)}`
  );
  assert(trophyItem!.isNovel === true, "PROP-GOLD-TROPHY must be marked isNovel = true");

  // 4. Backgrounds: BG-GYM (beats 1, 2, 5) and BG-STREET (beats 3, 4)
  assert(bom.counts.uniqueBackgrounds === 2, `Expected 2 backgrounds, got ${bom.counts.uniqueBackgrounds}`);
  const gymBg = bom.backgrounds.find((b) => b.id === "BG-GYM");
  assert(!!gymBg, "BG-GYM must exist in roster");
  assert(
    JSON.stringify(gymBg!.beatOccurrences) === JSON.stringify([1, 2, 5]),
    `BG-GYM occurrences should be [1, 2, 5], got ${JSON.stringify(gymBg!.beatOccurrences)}`
  );

  // 5. Total counts check
  assert(bom.counts.novelPropsToSynthesize === 1, "novelPropsToSynthesize must be 1");
  assert(bom.counts.totalUniqueAssets === 5, `Expected 5 total unique assets (2 props + 2 bgs + 1 char), got ${bom.counts.totalUniqueAssets}`);

  console.log("Roster validation passed with complete deduplication metrics:", bom.counts);
  console.log("GATE-BEAT-03 PASS");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
