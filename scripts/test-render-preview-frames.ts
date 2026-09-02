import fs from "fs";
import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { Camera, parseSrt, renderCompleteSvgFrame } from "../src/engine/SvgRenderer";

const srtFile = "./public/0-chapter-1.srt";
const subtitles = parseSrt(fs.readFileSync(srtFile, "utf8"));
const outDir = "./output/preview_frames";
fs.mkdirSync(outDir, { recursive: true });

const fontFilesList = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

const testTimestamps = [
  { t: 4.5, name: "scene01_red_carpet_model.png" },
  { t: 12.0, name: "scene02_tech_bro_pivot.png" },
  { t: 24.0, name: "scene03_celebrity_caliper.png" },
  { t: 42.0, name: "scene04_unsubscribe_modal.png" },
  { t: 62.0, name: "scene05_retro_ps1_creator.png" },
  { t: 84.0, name: "scene06_swinging_pendulum.png" },
  { t: 100.0, name: "scene07_kate_moss_90s.png" },
  { t: 120.0, name: "scene08_bbl_hourglass.png" },
  { t: 175.0, name: "scene11_y2k_low_rise.png" },
  { t: 210.0, name: "scene12_glp1_ozempic_pen.png" },
  { t: 380.0, name: "scene15_buccal_fat_slicer.png" },
  { t: 440.0, name: "scene16_tiktok_tribunal.png" },
  { t: 515.0, name: "scene17_cyborg_face_grid.png" },
  { t: 600.0, name: "scene18_economic_outro.png" },
];

console.log("=== RENDERING TEST FRAMES WITH RESVG ===");
let passed = 0;

for (const item of testTimestamps) {
  const camera = new Camera(1920, 1080);
  const { svg, sceneId } = renderCompleteSvgFrame({
    timeSec: item.t,
    subtitles,
    camera,
    width: 1280,
    height: 720,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1280 },
    font: { fontFiles: fontFilesList, defaultFontFamily: "Noto Sans", loadSystemFonts: false },
  });

  const png = resvg.render().asPng();
  const filePath = path.join(outDir, item.name);
  fs.writeFileSync(filePath, png);

  const memMb = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
  console.log(`✅ Rendered t=${item.t.toFixed(1)}s (${sceneId}) -> ${item.name} (${png.length} bytes, Heap: ${memMb} MB)`);
  passed++;
}

console.log(`\n🎉 Successfully rendered ${passed}/${testTimestamps.length} key drama frames!`);
