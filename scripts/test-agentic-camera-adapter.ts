/**
 * Test Suite: Agentic Camera Adapter
 * Verifies that DirectorSheetAdapter maps agent camera directives to precise
 * Alex Meyers coordinates and produces smooth dynamic trajectories.
 */
import { manifestToDirectorSheet, computeCinematicCamera } from "../src/forge/DirectorSheetAdapter.js";
import { BeatVisualSpec } from "../src/forge/BeatManifestExtractor.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Testing Agentic Camera Adapter & Coordinate Mapping...");

  const beats: BeatVisualSpec[] = [
    {
      beatIndex: 1,
      startSec: 0.0,
      endSec: 6.0,
      text: "Setting up the scene in the gym.",
      visualGag: "Establishing shot of the fitness gym",
      propId: null,
      bgId: "BG-GYM",
      characterId: "host",
      bannerText: "ESTABLISHING SHOT",
      cameraShot: "wide_two_shot",
      cameraMove: "slow_push_in",
      transition: "cut",
      energy: 0.3,
      impactShake: false,
    },
    {
      beatIndex: 2,
      startSec: 6.0,
      endSec: 12.0,
      text: "Anatoly appears wiping the floor with his mop.",
      visualGag: "Anatoly in janitor outfit enters",
      propId: "PROP-JANITOR-MOP",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "THE CLEANER",
      cameraShot: "subject_focus",
      cameraMove: "pan_to_subject",
      transition: "cut",
      energy: 0.6,
      impactShake: false,
    },
    {
      beatIndex: 3,
      startSec: 12.0,
      endSec: 18.0,
      text: "He grips the colossal 500-pound barbell!",
      visualGag: "Extreme close-up on the iron barbell plates",
      propId: "PROP-ANCHOR-BARBELL",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "500 LBS",
      cameraShot: "prop_macro",
      cameraMove: "snap_cut",
      transition: "cut",
      energy: 0.9,
      impactShake: true,
    },
    {
      beatIndex: 4,
      startSec: 18.0,
      endSec: 24.0,
      text: "The host looks at the camera in complete deadpan disbelief.",
      visualGag: "Host stunned deadpan reaction",
      propId: null,
      bgId: "BG-STUDIO",
      characterId: "host",
      bannerText: "UNBELIEVABLE",
      cameraShot: "host_reaction",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.4,
      impactShake: false,
    },
  ];

  // Test 1: Coordinate mapping for wide two-shot
  const cam1 = computeCinematicCamera(beats[0]);
  assert(Math.abs(cam1.x - 960) < 1e-2 && Math.abs(cam1.y - 540) < 1e-2, "Wide two-shot should center at (960, 540)");
  assert(cam1.zoom >= 1.0 && cam1.zoom <= 1.05, "Wide two-shot zoom should be ~1.02");
  assert(cam1.targetZoom > cam1.zoom, "slow_push_in must have targetZoom > startZoom");

  // Test 2: Pan to subject
  const cam2 = computeCinematicCamera(beats[1]);
  assert(cam2.targetX > cam2.x, "pan_to_subject must pan horizontally toward subject mark (1420)");
  assert(cam2.targetX === 1420, "pan_to_subject targetX should be 1420");

  // Test 3: Prop macro
  const cam3 = computeCinematicCamera(beats[2]);
  assert(cam3.zoom >= 1.80 && cam3.zoom <= 1.95, "Prop macro should have tight zoom ~1.85");
  assert(cam3.x === 1220 && cam3.y === 550, "Prop macro should frame active prop mark");
  assert(cam3.impactShake === true, "Heavy slam beat must have impactShake=true");

  // Test 4: Host reaction
  const cam4 = computeCinematicCamera(beats[3]);
  assert(cam4.x === 520 && cam4.y === 560, "Host reaction must frame host close-up at (520, 560)");
  assert(cam4.zoom >= 1.40 && cam4.zoom <= 1.55, "Host reaction zoom should be ~1.48");
  assert(cam4.targetZoom === cam4.zoom, "static_hold must keep targetZoom === startZoom");

  // Test 5: Full manifest translation to DirectorSheet
  const sheet = manifestToDirectorSheet(beats);
  assert(sheet.length === 4, `Expected 4 sheet beats, got ${sheet.length}`);
  for (let i = 0; i < sheet.length; i++) {
    const sb = sheet[i];
    assert(Number.isFinite(sb.camera.x), `Beat ${i} camera.x must be finite`);
    assert(Number.isFinite(sb.camera.y), `Beat ${i} camera.y must be finite`);
    assert(Number.isFinite(sb.camera.zoom), `Beat ${i} camera.zoom must be finite`);
    assert(sb.camera.zoom >= 0.95 && sb.camera.zoom <= 2.4, `Beat ${i} camera.zoom within valid range`);
  }

  console.log("All 5 camera adapter checks passed successfully.");
  console.log("GATE-CAM-02 PASS");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
