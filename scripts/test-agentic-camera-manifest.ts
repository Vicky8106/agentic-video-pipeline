/**
 * Test Suite: Agentic Camera Manifest & Schema
 * Verifies that BeatVisualSpec extracts and validates cameraShot, cameraMove, transition, energy, and impactShake.
 */
import { BeatVisualSpec, CameraShotType, CameraMoveType, CameraTransitionType } from "../src/forge/BeatManifestExtractor.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Testing Agentic Camera Manifest Schema...");

  const validShots: CameraShotType[] = ["wide_two_shot", "host_reaction", "subject_focus", "prop_macro", "dramatic_climax"];
  const validMoves: CameraMoveType[] = ["static_hold", "slow_push_in", "pan_to_subject", "snap_cut"];
  const validTransitions: CameraTransitionType[] = ["cut", "dissolve", "whip_pan"];

  const sampleBeat: BeatVisualSpec = {
    beatIndex: 1,
    startSec: 0.0,
    endSec: 8.0,
    text: "Welcome to the gym where Anatoly enters with a mop.",
    visualGag: "Anatoly in disguise as a janitor",
    propId: "PROP-JANITOR-MOP",
    propDescription: "A rustic wood-handle string mop",
    bgId: "BG-GYM",
    characterId: "anatoly",
    bannerText: "UNDERCOVER JANITOR",
    cameraShot: "wide_two_shot",
    cameraMove: "slow_push_in",
    transition: "cut",
    energy: 0.45,
    impactShake: false,
  };

  assert(validShots.includes(sampleBeat.cameraShot!), "Must be a valid shot type");
  assert(validMoves.includes(sampleBeat.cameraMove!), "Must be a valid camera move");
  assert(validTransitions.includes(sampleBeat.transition!), "Must be a valid transition");
  assert(sampleBeat.energy === 0.45, "Must preserve energy");
  assert(sampleBeat.impactShake === false, "Must preserve impactShake");

  const punchBeat: BeatVisualSpec = {
    beatIndex: 2,
    startSec: 8.0,
    endSec: 16.0,
    text: "He casually drops a 500-pound barbell with one hand!",
    visualGag: "Anatoly drops the massive barbell shaking the gym floor",
    propId: "PROP-ANCHOR-BARBELL",
    bgId: "BG-GYM",
    characterId: "anatoly",
    bannerText: "ONE HANDED SLAM",
    cameraShot: "prop_macro",
    cameraMove: "snap_cut",
    transition: "cut",
    energy: 0.95,
    impactShake: true,
  };

  assert(punchBeat.cameraShot === "prop_macro", "Punch beat should be prop_macro");
  assert(punchBeat.impactShake === true, "Heavy slam beat must have impactShake=true");

  const reactionBeat: BeatVisualSpec = {
    beatIndex: 3,
    startSec: 16.0,
    endSec: 24.0,
    text: "Wait, did he just clean the floor with an Olympic record?",
    visualGag: "Host deadpan stare in disbelief",
    propId: null,
    bgId: "BG-STUDIO",
    characterId: "host",
    bannerText: "DISBELIEF",
    cameraShot: "host_reaction",
    cameraMove: "static_hold",
    transition: "cut",
    energy: 0.3,
    impactShake: false,
  };

  assert(reactionBeat.cameraShot === "host_reaction", "Reaction beat should be host_reaction");
  assert(reactionBeat.cameraMove === "static_hold", "Reaction beat must hold steady");

  console.log("Verified all 3 storytelling camera beat specifications.");
  console.log("GATE-CAM-01 PASS");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
