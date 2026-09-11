/**
 * Test Suite: Manifest-to-AutoProduction Bridge
 *
 * Verifies that BeatVisualSpec manifests translated via manifestToDirectorSheet
 * are ingested by createAutoProduction and rendered frame-accurately by renderAutoSvgFrame.
 */
import { manifestToDirectorSheet } from "../src/forge/DirectorSheetAdapter.js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { BeatVisualSpec } from "../src/forge/BeatManifestExtractor.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running Manifest-to-AutoProduction Bridge Test...");

  const testSrt = `1
00:00:00,000 --> 00:00:08,000
Welcome to the gym where Anatoly lifts an anchor.

2
00:00:08,000 --> 00:00:16,000
Now in the royal studio holding a gleaming golden mop.

3
00:00:16,000 --> 00:00:24,000
Doctor Mike examines the clinic footage under a magnifying glass.
`;

  const mockManifest: BeatVisualSpec[] = [
    {
      beatIndex: 1,
      startSec: 0.0,
      endSec: 8.0,
      text: "Welcome to the gym where Anatoly lifts an anchor.",
      visualGag: "Anatoly lifts heavy anchor barbell in gym",
      propId: "PROP-ANCHOR-BARBELL",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "JANITOR STRENGTH",
    },
    {
      beatIndex: 2,
      startSec: 8.0,
      endSec: 16.0,
      text: "Now in the royal studio holding a gleaming golden mop.",
      visualGag: "Anatoly crowned king with golden mop",
      propId: "PROP-GOLD-MOP",
      bgId: "BG-STUDIO",
      characterId: "anatoly",
      bannerText: "MOP KING",
    },
    {
      beatIndex: 3,
      startSec: 16.0,
      endSec: 24.0,
      text: "Doctor Mike examines the clinic footage under a magnifying glass.",
      visualGag: "Doctor Mike inspects video with magnifying glass",
      propId: "PROP-MAGNIFYING-GLASS",
      bgId: "BG-CLINIC",
      characterId: "dr_mike",
      bannerText: "SCIENTIFIC PROOF",
    },
  ];

  // 1. Convert manifest to director sheet
  const sheet = manifestToDirectorSheet(mockManifest);
  assert(sheet.length === 3, `Expected 3 sheet beats, got ${sheet.length}`);
  assert(sheet[0].activeProp?.id === "PROP-ANCHOR-BARBELL", "Beat 1 must have activeProp PROP-ANCHOR-BARBELL");
  assert(sheet[1].activeProp?.id === "PROP-GOLD-MOP", "Beat 2 must have activeProp PROP-GOLD-MOP");
  assert(sheet[2].activeProp?.id === "PROP-MAGNIFYING-GLASS", "Beat 3 must have activeProp PROP-MAGNIFYING-GLASS");

  // 2. Feed into createAutoProduction
  const production = createAutoProduction(testSrt, "casually-procedural", { sheet });
  assert(!!production.sheet, "Production must retain the sheet");

  // 3. Render SVG frame at beat 1 (t = 4.0s)
  const frame1 = renderAutoSvgFrame({ production, timeSec: 4.0, width: 1280, height: 720 });
  assert(frame1.svg.includes("PROP-ANCHOR-BARBELL"), "Frame at t=4.0s must include PROP-ANCHOR-BARBELL");
  assert(frame1.svg.includes("JANITOR STRENGTH"), "Frame at t=4.0s must include banner text JANITOR STRENGTH");

  // 4. Render SVG frame at beat 2 (t = 12.0s)
  const frame2 = renderAutoSvgFrame({ production, timeSec: 12.0, width: 1280, height: 720 });
  assert(frame2.svg.includes("PROP-GOLD-MOP"), "Frame at t=12.0s must include PROP-GOLD-MOP");
  assert(frame2.svg.includes("MOP KING"), "Frame at t=12.0s must include banner text MOP KING");

  // 5. Render SVG frame at beat 3 (t = 20.0s)
  const frame3 = renderAutoSvgFrame({ production, timeSec: 20.0, width: 1280, height: 720 });
  assert(frame3.svg.includes("PROP-MAGNIFYING-GLASS"), "Frame at t=20.0s must include PROP-MAGNIFYING-GLASS");
  assert(frame3.svg.includes("SCIENTIFIC PROOF"), "Frame at t=20.0s must include banner text SCIENTIFIC PROOF");

  console.log("All 3 beat frames rendered with verified props, banners, and backgrounds!");
  console.log("BRIDGE-PASS: Manifest successfully bridged to AutoProduction pipeline.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
