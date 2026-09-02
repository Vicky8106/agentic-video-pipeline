import fs from 'fs';
import { Camera, parseSrt, renderCompleteSvgFrame } from '../src/engine/SvgRenderer.ts';

const srtFile = './public/0-chapter-1.srt';
const subtitles = parseSrt(fs.readFileSync(srtFile, 'utf8'));

console.log(`Verifying all 18 scenes in the full video timeline...`);

const sampleTimestamps = [
  4.5,    // Scene 01
  12.0,   // Scene 02
  24.0,   // Scene 03
  42.0,   // Scene 04
  62.0,   // Scene 05
  84.0,   // Scene 06
  100.0,  // Scene 07
  120.0,  // Scene 08
  140.0,  // Scene 09
  158.0,  // Scene 10
  175.0,  // Scene 11
  210.0,  // Scene 12
  270.0,  // Scene 13
  325.0,  // Scene 14
  380.0,  // Scene 15
  440.0,  // Scene 16
  515.0,  // Scene 17
  600.0,  // Scene 18
];

for (let i = 0; i < sampleTimestamps.length; i++) {
  const t = sampleTimestamps[i];
  const camera = new Camera(1920, 1080);
  const { svg } = renderCompleteSvgFrame({
    timeSec: t,
    subtitles,
    camera,
    width: 1280,
    height: 720,
  });

  if (!svg || svg.length < 500) {
    throw new Error(`Scene ${i + 1} at t=${t}s produced invalid or empty SVG!`);
  }
  console.log(`✅ Scene ${String(i + 1).padStart(2, '0')} at t=${t.toFixed(1)}s: OK (${svg.length} chars)`);
}

console.log(`\n🎉 All 18 scenes successfully validated!`);
