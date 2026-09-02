import { renderHairstyle, HairstyleId } from "../src/character/Hairstyles";
import { renderOutfit, OutfitId } from "../src/character/Outfits";

const hairstyles: HairstyleId[] = [
  "female_bob_bangs",
  "female_high_ponytail",
  "female_long_brunette",
  "female_blonde_curls",
  "female_messy_bun",
  "female_pixie_y2k",
  "female_gothic_waves",
  "female_slicked_back",
  "female_side_braid",
  "male_host_curly",
  "male_tech_bro",
  "male_bodybuilder_bald",
  "male_doctor_cap",
  "female_widow_veil",
];

console.log("=== TESTING 14 CANONICAL HAIRSTYLES ===");
let passedHair = 0;
for (const h of hairstyles) {
  const res = renderHairstyle(h, 0.5);
  const totalLen = res.backSvg.length + res.frontSvg.length;
  if (totalLen > 50) {
    passedHair++;
    console.log(`✅ [${h}] back: ${res.backSvg.length} chars, front: ${res.frontSvg.length} chars`);
  } else {
    console.error(`❌ [${h}] failed length check: ${totalLen}`);
  }
}

const outfits: OutfitId[] = [
  "dress_red_carpet",
  "dress_pink",
  "dress_black",
  "y2k_crop_top_low_rise",
  "crop_top_leggings",
  "doctor_scrubs",
  "tech_fleece_vest",
  "bodybuilder_tank",
  "victorian_mourning",
  "judge_robes",
  "suit",
  "hoodie",
  "patient_gown",
  "tshirt",
];

console.log("\n=== TESTING CANONICAL OUTFITS ===");
let passedOutfits = 0;
for (const o of outfits) {
  const svg = renderOutfit(o, 0.5);
  if (svg.length > 50 && svg.includes("<path") || svg.includes("<polygon")) {
    passedOutfits++;
    console.log(`✅ [${o}] ${svg.length} chars`);
  } else {
    console.error(`❌ [${o}] failed outfit check`);
  }
}

console.log(`\nResults: ${passedHair}/${hairstyles.length} hairstyles, ${passedOutfits}/${outfits.length} outfits passed.`);
if (passedHair === hairstyles.length && passedOutfits === outfits.length) {
  process.exit(0);
} else {
  process.exit(1);
}
