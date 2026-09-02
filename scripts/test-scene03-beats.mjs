import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { Camera, parseSrt, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const srtFile = './public/0-chapter-1.srt';
const subtitles = parseSrt(fs.readFileSync(srtFile, 'utf8'));
const camera = new Camera(1920, 1080);

const testPoints = [
  { name: 'scene03_01_intro', t: 16.0 },
  { name: 'scene03_02_jenna', t: 17.5 },
  { name: 'scene03_03_emma', t: 19.2 },
  { name: 'scene03_04_ariana', t: 20.5 },
  { name: 'scene03_05_caliper_clamped', t: 21.8 },
];

const inspectDir = './output/inspect_scene03';
if (!fs.existsSync(inspectDir)) fs.mkdirSync(inspectDir, { recursive: true });

for (const pt of testPoints) {
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
