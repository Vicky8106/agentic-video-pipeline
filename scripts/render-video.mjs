import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { Resvg } from '@resvg/resvg-js';

import { parseSrt, Camera, renderCompleteSvgFrame } from './SvgRenderer.bundle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.resolve(rootDir, 'output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Parse CLI args
const args = process.argv.slice(2);
let duration = 60; // default 60s (1 minute output)
let fps = 24;
let outName = 'casually_explained_1min.mp4';
let renderWidth = 1280; // 720p default

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--duration' && args[i + 1]) duration = parseFloat(args[++i]);
  if (args[i] === '--fps' && args[i + 1]) fps = parseInt(args[++i], 10);
  if (args[i] === '--out' && args[i + 1]) outName = args[++i];
  if (args[i] === '--res' && args[i + 1]) {
    const r = args[++i].toLowerCase();
    if (r === '720p' || r === '720') renderWidth = 1280;
    if (r === '1080p' || r === '1080') renderWidth = 1920;
  }
}

const renderHeight = Math.round((renderWidth * 9) / 16);
const outputFile = path.join(outputDir, outName);
const desktopOutputFile = path.join('/root/Desktop', outName);
const audioFile = '/root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3';
const srtFile = '/root/Desktop/casually-explained-video/public/new_chapter_1_full.srt';

console.log(`[Renderer] Starting 100% Pure Vector 2D Animation Renderer`);
console.log(`[Config] Duration: ${duration}s | FPS: ${fps} | Res: ${renderWidth}x${renderHeight} | Output: ${outputFile}`);

// 1. Load Subtitles
const srtContent = fs.readFileSync(srtFile, 'utf8');
const subtitles = parseSrt(srtContent);
console.log(`[SRT] Loaded ${subtitles.length} subtitle cues.`);

// 2. Initialize Camera & Canvas
const camera = new Camera(1920, 1080);
const totalFrames = Math.floor(duration * fps);

// Font configuration
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

// 3. Spawn FFmpeg process with direct uncompressed RGBA rawvideo pipe (high throughput)
const ffmpegArgs = [
  '-y',
  '-f', 'rawvideo',
  '-pix_fmt', 'rgba',
  '-s', `${renderWidth}x${renderHeight}`,
  '-r', String(fps),
  '-i', '-',
  '-ss', '0',
  '-i', audioFile,
  '-t', String(duration),
  '-map', '0:v:0',
  '-map', '1:a:0',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '19',
  '-pix_fmt', 'yuv420p',
  '-c:a', 'aac',
  '-b:a', '192k',
  '-shortest',
  outputFile,
];

console.log(`[FFmpeg] Spawning FFmpeg rawvideo muxer...`);
const ffmpeg = spawn('/usr/bin/ffmpeg', ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

const startTime = Date.now();

// 4. Render frames sequentially
async function run() {
  for (let frame = 0; frame < totalFrames; frame++) {
    const t = frame / fps;

    // Render 100% vector SVG frame
    const { svg, sceneId } = renderCompleteSvgFrame({
      timeSec: t,
      subtitles,
      camera,
      width: 1920,
      height: 1080,
    });

    // Rasterize with resvg-js (native Rust SVG engine with cached Noto Sans Bold)
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: renderWidth },
      font: fontOpts,
    });
    const renderedImg = resvg.render();
    const rawPixels = renderedImg.pixels;

    // Pipe raw RGBA buffer directly into ffmpeg stdin
    const canWrite = ffmpeg.stdin.write(rawPixels);
    if (!canWrite) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    if (frame % (fps * 5) === 0 || frame === totalFrames - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const progress = (((frame + 1) / totalFrames) * 100).toFixed(1);
      const fpsRender = ((frame + 1) / Math.max(0.1, (Date.now() - startTime) / 1000)).toFixed(1);
      console.log(`[Frame ${frame + 1}/${totalFrames}] Progress: ${progress}% (t=${t.toFixed(1)}s | Scene: ${sceneId} | Speed: ${fpsRender} fps | Elapsed: ${elapsed}s)`);
    }
  }

  ffmpeg.stdin.end();

  ffmpeg.on('close', (code) => {
    if (code === 0) {
      // Copy to Desktop
      try {
        fs.copyFileSync(outputFile, desktopOutputFile);
      } catch (err) {
        console.warn(`[Warning] Could not copy to desktop: ${err.message}`);
      }

      const stats = fs.statSync(outputFile);
      const totalSec = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`\n========================================`);
      console.log(`🎬 100% PURE VECTOR RENDER COMPLETE!`);
      console.log(`📁 File: ${outputFile}`);
      console.log(`📁 Desktop Copy: ${desktopOutputFile}`);
      console.log(`⏱️ Duration: ${duration}s (${totalFrames} frames)`);
      console.log(`💾 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`⚡ Total Render Time: ${totalSec}s`);
      console.log(`========================================\n`);
      process.exit(0);
    } else {
      console.error(`[Error] FFmpeg exited with code ${code}`);
      process.exit(code);
    }
  });
}

run().catch((err) => {
  console.error('[Fatal Error]', err);
  ffmpeg.stdin.end();
  process.exit(1);
});
