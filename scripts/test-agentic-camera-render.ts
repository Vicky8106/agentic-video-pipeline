/**
 * Test Suite: Agentic Camera Render Engine
 * Verifies that AutoProduction treats the agent sheet as authoritative camera driver,
 * executes smooth progressive moves, eliminates random jitter on calm beats,
 * and activates impact shake only when specified.
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

function extractTransform(svg: string): { sx: number; sy: number; scale: number; rot: number } {
  // Finds worldTransform: translate(sx sy) scale(scale) rotate(rot ...)
  const match = svg.match(/transform="translate\(([-\d.]+)\s+([-\d.]+)\)\s+scale\(([-\d.]+)\)\s+rotate\(([-\d.]+)/);
  if (!match) {
    throw new Error("Could not find world transform in SVG output");
  }
  return {
    sx: parseFloat(match[1]),
    sy: parseFloat(match[2]),
    scale: parseFloat(match[3]),
    rot: parseFloat(match[4]),
  };
}

async function run() {
  console.log("Testing Agentic Camera Render Engine in AutoProduction...");

  const testSrt = `1
00:00:00,000 --> 00:00:06,000
Welcome to the gym where Anatoly enters.

2
00:00:06,000 --> 00:00:12,000
Anatoly sweeps the floor right near the weights.

3
00:00:12,000 --> 00:00:18,000
He casually drops the 500-pound barbell with a crash!

4
00:00:18,000 --> 00:00:24,000
The host stares in complete disbelief.
`;

  const manifest: BeatVisualSpec[] = [
    {
      beatIndex: 1,
      startSec: 0.0,
      endSec: 6.0,
      text: "Welcome to the gym where Anatoly enters.",
      visualGag: "Establishing shot",
      propId: null,
      bgId: "BG-GYM",
      characterId: "host",
      bannerText: "GYM INTRO",
      cameraShot: "wide_two_shot",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.3,
      impactShake: false,
    },
    {
      beatIndex: 2,
      startSec: 6.0,
      endSec: 12.0,
      text: "Anatoly sweeps the floor right near the weights.",
      visualGag: "Pan to Anatoly cleaning",
      propId: "PROP-JANITOR-MOP",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "JANITOR AT WORK",
      cameraShot: "subject_focus",
      cameraMove: "pan_to_subject",
      transition: "cut",
      energy: 0.5,
      impactShake: false,
    },
    {
      beatIndex: 3,
      startSec: 12.0,
      endSec: 18.0,
      text: "He casually drops the 500-pound barbell with a crash!",
      visualGag: "Barbell crash impact",
      propId: "PROP-ANCHOR-BARBELL",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "500 LBS CRASH",
      cameraShot: "prop_macro",
      cameraMove: "slow_push_in",
      transition: "cut",
      energy: 0.95,
      impactShake: true,
    },
    {
      beatIndex: 4,
      startSec: 18.0,
      endSec: 24.0,
      text: "The host stares in complete disbelief.",
      visualGag: "Host deadpan reaction",
      propId: null,
      bgId: "BG-STUDIO",
      characterId: "host",
      bannerText: "DISBELIEF",
      cameraShot: "host_reaction",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.25,
      impactShake: false,
    },
  ];

  const sheet = manifestToDirectorSheet(manifest);
  const production = createAutoProduction(testSrt, "casually-procedural", { sheet });

  // 1. Verify Beat 1 (static hold): absolutely 0 drift and 0 jitter across frames
  const f1_a = renderAutoSvgFrame({ production, timeSec: 1.5, width: 1920, height: 1080 });
  const f1_b = renderAutoSvgFrame({ production, timeSec: 4.5, width: 1920, height: 1080 });
  const t1_a = extractTransform(f1_a.svg);
  const t1_b = extractTransform(f1_b.svg);

  assert(Math.abs(t1_a.scale - 1.02) < 1e-2, `Beat 1 scale should be ~1.02, got ${t1_a.scale}`);
  assert(Math.abs(t1_a.scale - t1_b.scale) < 1e-4, "Beat 1 static hold must have identical scale across timestamps");
  assert(Math.abs(t1_a.sx - t1_b.sx) < 1e-4, "Beat 1 static hold must have identical sx across timestamps");
  assert(t1_a.rot === 0 && t1_b.rot === 0, "Beat 1 must have ZERO rotation/shake");
  console.log("Beat 1 static hold verified (rock-solid, 0 shake, 0 jitter).");

  // 2. Verify Beat 2 (pan to subject): horizontal translation glides smoothly toward subject
  const f2_start = renderAutoSvgFrame({ production, timeSec: 6.2, width: 1920, height: 1080 });
  const f2_mid = renderAutoSvgFrame({ production, timeSec: 9.0, width: 1920, height: 1080 });
  const f2_end = renderAutoSvgFrame({ production, timeSec: 11.8, width: 1920, height: 1080 });
  const t2_start = extractTransform(f2_start.svg);
  const t2_mid = extractTransform(f2_mid.svg);
  const t2_end = extractTransform(f2_end.svg);

  assert(t2_start.sx > t2_mid.sx && t2_mid.sx > t2_end.sx, "Pan to subject must glide smoothly to the right (decreasing sx)");
  assert(t2_start.rot === 0 && t2_end.rot === 0, "Pan to subject must have ZERO shake");
  console.log("Beat 2 pan_to_subject verified (smooth progressive glide, 0 shake).");

  // 3. Verify Beat 3 (prop macro with push-in & impact shake)
  const f3_impact = renderAutoSvgFrame({ production, timeSec: 12.05, width: 1920, height: 1080 });
  const f3_late = renderAutoSvgFrame({ production, timeSec: 16.5, width: 1920, height: 1080 });
  const t3_impact = extractTransform(f3_impact.svg);
  const t3_late = extractTransform(f3_late.svg);

  assert(t3_late.scale > t3_impact.scale, "slow_push_in must increase scale across the beat");
  assert(t3_impact.rot !== 0 || Math.abs(t3_impact.sx) > 0, "Impact moment must trigger motivated physical shake");
  assert(Math.abs(t3_late.rot) < 1e-3, "Impact shake must fully decay within the beat");
  console.log("Beat 3 prop macro with push-in and motivated impact verified.");

  // 4. Verify Beat 4 (host reaction): close-up on host, rock solid
  const f4 = renderAutoSvgFrame({ production, timeSec: 20.0, width: 1920, height: 1080 });
  const t4 = extractTransform(f4.svg);
  assert(t4.scale >= 1.45 && t4.scale <= 1.55, `Host reaction scale should be ~1.48, got ${t4.scale}`);
  assert(t4.rot === 0, "Host reaction must have ZERO shake");
  console.log("Beat 4 host reaction close-up verified.");

  console.log("GATE-CAM-03 PASS");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
