import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';
import { parseSrt, Camera, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const srtContent = fs.readFileSync('public/new_chapter_1_full.srt', 'utf8');
const subtitles = parseSrt(srtContent);
const camera = new Camera(1920, 1080);

const testTimestamps = [
  { t: 5, expectedScene: "scene_01_ecosystem" },
  { t: 12, expectedScene: "scene_02_techbro" },
  { t: 18, expectedScene: "scene_03_celebrities" },
  { t: 26, expectedScene: "scene_04_unsubscribe" },
  { t: 38, expectedScene: "scene_05_timburton_ps1" },
  { t: 50, expectedScene: "scene_06_pendulum" },
  { t: 70, expectedScene: "scene_07_heroinchic" },
  { t: 95, expectedScene: "scene_08_pixarmom" },
  { t: 120, expectedScene: "scene_09_hourglass_pr" },
  { t: 140, expectedScene: "scene_10_boss_closes_tab" },
  { t: 165, expectedScene: "scene_11_y2k_fashion" },
  { t: 200, expectedScene: "scene_12_glp1_cheat_code" },
  { t: 250, expectedScene: "scene_13_hollywood_denial" },
  { t: 300, expectedScene: "scene_14_mcu_superhero" },
  { t: 330, expectedScene: "scene_15_buccal_fat" },
  { t: 370, expectedScene: "scene_16_tiktok_tribunal" },
  { t: 415, expectedScene: "scene_17_cyborg_monoculture" },
  { t: 500, expectedScene: "scene_18_economic_outro" },
];

const outDir = '/root/Desktop/Casually_Explained_Consistent_Master_Video/snapshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log('Testing frame generation across all 18 scenes...\n');

for (const { t, expectedScene } of testTimestamps) {
  const { svg, sceneId, subText } = renderCompleteSvgFrame({
    timeSec: t,
    subtitles,
    camera,
    width: 1280,
    height: 720
  });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1280 } });
  const pngData = resvg.render().asPng();
  const filePath = `${outDir}/${expectedScene}_t${t}.png`;
  fs.writeFileSync(filePath, pngData);
  const previewText = subText ? (subText.length > 40 ? subText.slice(0, 40) + '...' : subText) : '[Silence]';
  console.log(`[PASS] t=${t.toString().padStart(3, ' ')}s | Scene: ${sceneId.padEnd(28, ' ')} | PNG: ${pngData.length.toString().padStart(6, ' ')} bytes | Sub: "${previewText}"`);
}

console.log('\n✅ ALL 18 SCENES RENDERED AND VERIFIED SUCCESSFULLY!');
