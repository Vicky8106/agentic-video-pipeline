import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { Resvg } from '@resvg/resvg-js';

import { parseSrt, Camera, renderCompleteSvgFrame } from '../src/engine/SvgRenderer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
let startSec = 0;
let endSec = 60;
let fps = 24;
let renderWidth = 1280;
let outFile = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--start' && args[i + 1]) startSec = parseFloat(args[++i]);
  if (args[i] === '--end' && args[i + 1]) endSec = parseFloat(args[++i]);
  if (args[i] === '--fps' && args[i + 1]) fps = parseInt(args[++i], 10);
  if (args[i] === '--res' && args[i + 1]) {
    const r = args[++i].toLowerCase();
    if (r === '720p' || r === '720') renderWidth = 1280;
    if (r === '1080p' || r === '1080') renderWidth = 1920;
  }
  if (args[i] === '--out' && args[i + 1]) outFile = args[++i];
}

if (!outFile) {
  console.error('Error: --out path required');
  process.exit(1);
}

const renderHeight = Math.round((renderWidth * 9) / 16);
const srtFile = fs.existsSync(path.join(rootDir, 'public', '0-chapter-1.srt'))
  ? path.join(rootDir, 'public', '0-chapter-1.srt')
  : path.join(rootDir, 'public', 'new_chapter_1_full.srt');
const srtContent = fs.readFileSync(srtFile, 'utf8');
const subtitles = parseSrt(srtContent);

const camera = new Camera(1920, 1080);
const startFrame = Math.round(startSec * fps);
const endFrame = Math.round(endSec * fps);
const totalFrames = endFrame - startFrame;

console.log(`[ChunkWorker] Rendering chunk: t=[${startSec.toFixed(1)}s -> ${endSec.toFixed(1)}s] (${totalFrames} frames @ ${fps}fps) -> ${path.basename(outFile)}`);

const fontFilesList = [
  '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf',
].filter(f => fs.existsSync(f));

const fontOpts = {
  fontFiles: fontFilesList,
  defaultFontFamily: 'Noto Sans',
  loadSystemFonts: false,
};

// Spawn FFmpeg video encoder with fixed GOP & zero-PTS alignment for seamless joining
const ffmpegArgs = [
  '-y',
  '-f', 'rawvideo',
  '-pix_fmt', 'rgba',
  '-s', `${renderWidth}x${renderHeight}`,
  '-r', String(fps),
  '-i', '-',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '19',
  '-g', String(fps),
  '-keyint_min', String(fps),
  '-sc_threshold', '0',
  '-avoid_negative_ts', 'make_zero',
  '-pix_fmt', 'yuv420p',
  outFile,
];

const ffmpeg = spawn('/usr/bin/ffmpeg', ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });
const startTime = Date.now();

async function run() {
  for (let frameIdx = 0; frameIdx < totalFrames; frameIdx++) {
    const globalFrame = startFrame + frameIdx;
    const t = globalFrame / fps;

    const { svg, sceneId } = renderCompleteSvgFrame({
      timeSec: t,
      subtitles,
      camera,
      width: renderWidth,
      height: renderHeight,
    });

    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: renderWidth },
      font: fontOpts,
    });

    const renderObj = resvg.render();
    const pixelBuffer = renderObj.pixels;

    if (!ffmpeg.stdin.write(pixelBuffer)) {
      await new Promise(resolve => ffmpeg.stdin.once('drain', resolve));
    }

    if (frameIdx % (fps * 5) === 0 || frameIdx === totalFrames - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const pct = (((frameIdx + 1) / totalFrames) * 100).toFixed(1);
      const speed = ((frameIdx + 1) / ((Date.now() - startTime) / 1000)).toFixed(1);
      console.log(`[ChunkWorker] [Frame ${frameIdx + 1}/${totalFrames}] ${pct}% (t=${t.toFixed(1)}s | Scene: ${sceneId} | Speed: ${speed} fps | Elapsed: ${elapsed}s)`);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`[ChunkWorker] ✅ Finished chunk ${path.basename(outFile)} in ${totalTime}s`);
}

run().catch(err => {
  console.error('[ChunkWorker] Error:', err);
  process.exit(1);
});
