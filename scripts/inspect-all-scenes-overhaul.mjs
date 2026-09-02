import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { Camera, parseSrt, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const srtFile = './public/0-chapter-1.srt';
const subtitles = parseSrt(fs.readFileSync(srtFile, 'utf8'));

const testPoints = [
  { name: 'scene12_01_cheat_code', t: 186.0 },
  { name: 'scene12_02_ozempic_pen', t: 194.0 },
  { name: 'scene12_03_stomach_padlock', t: 205.0 },
  { name: 'scene12_05_seductive_bread', t: 234.0 },
  { name: 'scene13_01_wind_gust', t: 248.0 },
  { name: 'scene13_02_couch_pennies', t: 265.0 },
  { name: 'scene13_03_firehose_water', t: 285.0 },
  { name: 'scene13_04_cheese_skull', t: 298.0 },
  { name: 'scene14_01_mcu_poster', t: 310.0 },
  { name: 'scene14_02_shrinkwrap_ham', t: 322.0 },
  { name: 'scene14_03_chicken_broccoli', t: 330.0 },
  { name: 'scene14_04_neon_syringe', t: 342.0 },
  { name: 'scene15_01_pumpkin_surgeon', t: 360.0 },
  { name: 'scene15_02_deli_slicer', t: 375.0 },
  { name: 'scene15_03_victorian_mourner', t: 392.0 },
  { name: 'scene16_01_wednesday_dance', t: 420.0 },
  { name: 'scene16_02_zapruder_projector', t: 450.0 },
  { name: 'scene16_03_size4_siren', t: 464.0 },
  { name: 'scene17_01_rpg_creator', t: 480.0 },
  { name: 'scene17_02_obama_hope_bread', t: 510.0 },
  { name: 'scene17_03_frozen_forehead', t: 540.0 },
  { name: 'scene18_01_gold_wheelbarrow', t: 580.0 },
  { name: 'scene18_02_tuxedo_butler', t: 605.0 },
  { name: 'scene18_03_envelope_celeb', t: 620.0 },
  { name: 'scene18_04_youtube_outro', t: 640.0 },
];

const inspectDir = './output/inspect_overhaul_later_scenes';
if (!fs.existsSync(inspectDir)) fs.mkdirSync(inspectDir, { recursive: true });

for (const pt of testPoints) {
  const camera = new Camera(1920, 1080);
  
  for (let i = 0; i < 15; i++) {
    renderCompleteSvgFrame({
      timeSec: pt.t,
      subtitles,
      camera,
      width: 1280,
      height: 720,
    });
  }

  const { svg } = renderCompleteSvgFrame({
    timeSec: pt.t,
    subtitles,
    camera,
    width: 1280,
    height: 720,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1280 } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(inspectDir, `${pt.name}.png`), png);
  console.log(`Saved ${pt.name}.png (${png.length} bytes)`);
}

console.log('\nAll 25 overhaul test frames saved to output/inspect_overhaul_later_scenes/');
