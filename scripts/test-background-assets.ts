import { renderBackground, BackgroundId } from "../src/assets/BackgroundLibrary";

const backgrounds: BackgroundId[] = [
  "BG-STUDIO",
  "BG-HOLLYWOOD",
  "BG-CINEMA",
  "BG-90S",
  "BG-Y2K",
  "BG-GYM",
  "BG-CLINIC",
  "BG-RETRO",
  "BG-GOTHIC",
  "BG-TRIBUNAL",
  "BG-OFFICE",
  "BG-KITCHEN",
  "BG-AUDIENCE",
  "BG-END",
];

console.log("=== TESTING 14 CANONICAL BACKGROUNDS ===");
let passed = 0;
for (const bgId of backgrounds) {
  const svg = renderBackground(bgId, { timeSec: 1.0, flashL: true, flashR: false });
  if (svg.length > 200 && svg.includes("<rect")) {
    passed++;
    console.log(`✅ [${bgId}] ${svg.length} chars`);
  } else {
    console.error(`❌ [${bgId}] failed background check (${svg.length} chars)`);
  }
}

console.log(`\nResults: ${passed}/${backgrounds.length} backgrounds passed.`);
if (passed === backgrounds.length) {
  process.exit(0);
} else {
  process.exit(1);
}
