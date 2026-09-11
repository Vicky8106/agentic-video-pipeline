/**
 * Test Suite: BeatSegmenter (GATE-BEAT-01)
 */
import fs from "node:fs";
import { segmentScriptIntoBeats } from "../src/forge/BeatSegmenter.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running BeatSegmenter Tests...");

  const srtPath = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.srt";
  const srt = fs.readFileSync(srtPath, "utf8");

  const beats = segmentScriptIntoBeats(srt, 8.0);
  console.log(`Segmented 973s script into ${beats.length} beats.`);
  console.log(`Sample Beat 1: [${beats[0].startSec}s - ${beats[0].endSec}s] "${beats[0].text}"`);
  console.log(`Sample Beat 10: [${beats[9].startSec}s - ${beats[9].endSec}s] "${beats[9].text}"`);
  console.log(`Sample Last Beat: [${beats[beats.length - 1].startSec}s - ${beats[beats.length - 1].endSec}s] "${beats[beats.length - 1].text}"`);

  // Assertions
  assert(beats.length >= 60 && beats.length <= 130, `Beat count should be between 60 and 130 for 16m video, got ${beats.length}`);
  assert(beats[0].startSec === 0 || beats[0].startSec < 1.0, "First beat must start at beginning");
  assert(beats[beats.length - 1].endSec > 950, "Last beat must cover until near end of audio");

  // Check continuity: zero gaps between beats
  for (let i = 0; i < beats.length - 1; i++) {
    const gap = Math.abs(beats[i + 1].startSec - beats[i].endSec);
    assert(gap < 0.05, `Gap detected between beat ${i + 1} and ${i + 2}: ${gap}s`);
  }

  console.log("PASS: Script successfully segmented into contiguous comedic beats with zero gaps.");
  console.log("GATE-BEAT-01 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
