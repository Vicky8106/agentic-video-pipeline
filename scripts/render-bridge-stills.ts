/**
 * Render visual proof stills for the Manifest-to-AutoProduction bridge.
 */
import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { manifestToDirectorSheet } from "../src/forge/DirectorSheetAdapter.js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { BeatVisualSpec } from "../src/forge/BeatManifestExtractor.js";

async function run() {
  const outDir = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/stills_bridge";
  fs.mkdirSync(outDir, { recursive: true });

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

  const sheet = manifestToDirectorSheet(mockManifest);
  const production = createAutoProduction(testSrt, "casually-procedural", { sheet });

  const timestamps = [
    { t: 4.0, name: "bridge_beat1_anchor_barbell.png" },
    { t: 12.0, name: "bridge_beat2_gold_mop.png" },
    { t: 20.0, name: "bridge_beat3_magnifying_glass.png" },
  ];

  for (const item of timestamps) {
    const { svg } = renderAutoSvgFrame({ production, timeSec: item.t, width: 1280, height: 720 });
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1280 } });
    const png = resvg.render().asPng();
    const dest = path.join(outDir, item.name);
    fs.writeFileSync(dest, png);
    console.log(`Rendered frame at t=${item.t}s -> ${dest} (${png.length} bytes)`);
  }

  console.log("Visual proof rendered successfully!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
