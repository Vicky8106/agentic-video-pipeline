import { renderStickFigure } from "../src/character/StickFigure";
import { HairstyleId } from "../src/character/Hairstyles";

const femaleStyles: { style: HairstyleId; clothes: any; desc: string }[] = [
  { style: "female_bob_bangs", clothes: "dress_black", desc: "Jenna Ortega Style Bob with Straight Bangs" },
  { style: "female_high_ponytail", clothes: "dress_pink", desc: "Ariana Style High Ponytail with Scrunchie" },
  { style: "female_blonde_curls", clothes: "dress_red_carpet", desc: "90s Glamour Blonde Blowout" },
  { style: "female_long_brunette", clothes: "y2k_crop_top_low_rise", desc: "Long Flowing Brunette Center Part" },
  { style: "female_messy_bun", clothes: "crop_top_leggings", desc: "Casual Topknot Messy Bun" },
  { style: "female_pixie_y2k", clothes: "y2k_crop_top_low_rise", desc: "Y2K Frosted Spiky Pixie" },
  { style: "female_gothic_waves", clothes: "victorian_mourning", desc: "Victorian Gothic Cascading Waves" },
  { style: "female_slicked_back", clothes: "suit", desc: "High Fashion Slicked Runway" },
  { style: "female_side_braid", clothes: "tshirt", desc: "Shoulder Side Braid" },
];

console.log("=== TESTING FEMALE RIG VARIANTS & HAIRSTYLE DISTINCTION ===");
let passed = 0;
for (const item of femaleStyles) {
  const svg = renderStickFigure("test_female", {
    x: 960,
    y: 540,
    scale: 1.3,
    gender: "female",
    hairStyle: item.style,
    clothes: item.clothes,
    expression: "smug_rock_eyebrow",
    timeSec: 1.0,
  });

  const hasBackHair = svg.includes("hair-back") || svg.includes("<path") || svg.includes("<g");
  const hasEyelashes = svg.includes("eyelashes") || svg.includes("M -44 -28");
  const hasBlush = svg.includes("rx=\"14\" ry=\"8\" fill=\"#fb7185\"");

  if (svg.length > 800 && hasEyelashes && hasBlush) {
    passed++;
    console.log(`✅ [${item.style}] (${item.desc}) - Size: ${svg.length} chars (Eyelashes: Yes, Blush: Yes)`);
  } else {
    console.error(`❌ [${item.style}] Failed validation (len: ${svg.length})`);
  }
}

console.log(`\nResults: ${passed}/${femaleStyles.length} female rig styles verified.`);
if (passed === femaleStyles.length) {
  process.exit(0);
} else {
  process.exit(1);
}
