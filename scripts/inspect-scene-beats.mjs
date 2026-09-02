import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';
import { Camera, parseSrt, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srtFile = path.join(rootDir, 'public', 'new_chapter_1_full.srt');
const subtitles = parseSrt(fs.readFileSync(srtFile, 'utf8'));
const camera = new Camera(1920, 1080);

const testTimestamps = [
  { name: 'scene01_beat1_redcarpet', t: 1.5 },
  { name: 'scene01_beat2_instagram', t: 4.8 },
  { name: 'scene01_beat3_hollywood', t: 8.0 },
  { name: 'scene02_beat1_cryptobro', t: 11.5 },
  { name: 'scene02_beat2_poofcloud', t: 13.2 },
  { name: 'scene02_beat3_aifounder', t: 15.0 },
  { name: 'scene03_beat1_actresses', t: 18.0 },
  { name: 'scene03_beat2_ariana', t: 20.2 },
  { name: 'scene03_beat3_calipers', t: 22.0 },
  { name: 'scene04_beat1_lunchplate', t: 24.5 },
  { name: 'scene04_beat2_flyingpizza', t: 27.5 },
  { name: 'scene04_beat3_cancelled', t: 30.5 },
  { name: 'scene06_beat1_couchchips', t: 45.0 },
  { name: 'scene06_beat2_wreckingball', t: 50.0 },
  { name: 'scene06_beat3_punchreaction', t: 54.0 },
  { name: 'scene11_beat1_organs', t: 156.0 },
  { name: 'scene11_beat2_miumiubelt', t: 168.0 },
  { name: 'scene11_beat3_pricetag', t: 175.0 },
];

const fontFilesList = [
  '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
].filter(f => fs.existsSync(f));

const fontOpts = {
  fontFiles: fontFilesList,
  defaultFontFamily: 'Noto Sans',
  loadSystemFonts: false,
};

const inspectDir = path.join(rootDir, 'output', 'inspect_beats');
if (!fs.existsSync(inspectDir)) fs.mkdirSync(inspectDir, { recursive: true });

for (const item of testTimestamps) {
  const { svg } = renderCompleteSvgFrame({
    timeSec: item.t,
    subtitles,
    camera,
    width: 1280,
    height: 720,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1280 },
    font: fontOpts,
  });

  const png = resvg.render().asPng();
  const outPath = path.join(inspectDir, `${item.name}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`[SAVED] ${item.name}.png (${png.length} bytes)`);
}
