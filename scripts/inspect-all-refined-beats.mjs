import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { Camera, parseSrt, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const srtFile = './public/0-chapter-1.srt';
const subtitles = parseSrt(fs.readFileSync(srtFile, 'utf8'));

const testPoints = [
  { name: 'scene01_02_instagram_punchin', t: 3.5 },
  { name: 'scene01_03_billboard_punchin', t: 6.0 },
  { name: 'scene02_03_poof_punchin', t: 12.5 },
  { name: 'scene02_04_aifounder_punchin', t: 14.0 },
  { name: 'scene03_04_actresses_punchin', t: 20.2 },
  { name: 'scene03_05_caliper_macro', t: 21.8 },
  { name: 'scene04_02_flying_pizza_punchin', t: 27.5 },
  { name: 'scene04_04_stamp_macro', t: 30.5 },
  { name: 'scene05_02_host_90s_closeup', t: 38.0 },
  { name: 'scene05_04_ps1_macro', t: 42.5 },
  { name: 'scene06_02_pendulum_punchin', t: 49.0 },
  { name: 'scene06_03_couch_duck_punchin', t: 52.5 },
  { name: 'scene07_01_katemoss_runway', t: 62.0 },
  { name: 'scene07_02_foodpyramid_punchin', t: 70.0 },
  { name: 'scene07_03_chaise_lounge_punchin', t: 76.0 },
  { name: 'scene08_02_pixarmom_punchin', t: 90.0 },
  { name: 'scene08_03_gravity_macro', t: 99.0 },
  { name: 'scene08_04_miami_billboard', t: 106.0 },
  { name: 'scene09_01_hourglass_punchin', t: 111.0 },
  { name: 'scene09_04_pharma_macro', t: 127.5 },
  { name: 'scene10_01_spinner_punchin', t: 132.0 },
  { name: 'scene10_03_boss_terror_closeup', t: 142.0 },
  { name: 'scene10_04_ctrlw_macro', t: 148.5 },
  { name: 'scene11_02_evicted_organs_punchin', t: 160.0 },
  { name: 'scene11_04_miumiu_pricetag_macro', t: 174.5 },
  { name: 'scene11_05_error404_resolution', t: 180.0 },
];

const inspectDir = './output/inspect_punchins_v2';
if (!fs.existsSync(inspectDir)) fs.mkdirSync(inspectDir, { recursive: true });

for (const pt of testPoints) {
  const camera = new Camera(1920, 1080);
  
  // Warm up camera for 15 frames to settle lerp
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

console.log('\nAll 26 punch-in test frames saved to output/inspect_punchins_v2/');
