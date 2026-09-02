import { renderProp } from "../src/assets/PropLibrary";

const props = [
  "PROP-PHONE",
  "PROP-CAM",
  "PROP-RED",
  "PROP-SCREEN",
  "PROP-PEND",
  "PROP-FOOD",
  "PROP-MONEY",
  "PROP-MED",
  "PROP-BROWSER",
  "PROP-CLOCK",
  "PROP-GYM",
  "PROP-FACE",
  "PROP-GAME",
  "PROP-BAT",
  "PROP-EMAIL",
  "PROP-BELL",
  "PROP-SCALE",
  "PROP-WATER",
  "PROP-WALK",
  "PROP-BOT",
  "PROP-TEARS",
  "PROP-SUB",
  "PROP-CARB",
  "PROP-BILLBOARD",
  "PROP-LOOP",
  "PROP-SHIELD",
  "PROP-MIRROR",
  "PROP-MARVEL",
  "PROP-SURGERY",
  "PROP-DELI",
  "PROP-CONTRACT",
  "PROP-QUESTION",
  "PROP-OUTSOURCE",
  "PROP-TRIAL",
  "PROP-ROSE",
  "PROP-GRID",
];

console.log("=== TESTING 36 CANONICAL PROPS ===");
let passed = 0;
for (const p of props) {
  const svg = renderProp(p, { x: 100, y: 100, scale: 1.2, timeSec: 1.5 });
  if (svg.length > 100 && svg.includes("<g id=")) {
    passed++;
    console.log(`✅ [${p}] ${svg.length} chars`);
  } else {
    console.error(`❌ [${p}] failed prop check (${svg.length} chars)`);
  }
}

console.log(`\nResults: ${passed}/${props.length} canonical props passed.`);
if (passed === props.length) {
  process.exit(0);
} else {
  process.exit(1);
}
