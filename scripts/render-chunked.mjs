import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chunksDir = path.join(rootDir, 'output', 'chunks');
if (!fs.existsSync(chunksDir)) fs.mkdirSync(chunksDir, { recursive: true });

// Parse CLI args
const args = process.argv.slice(2);
let startTime = 0;
let totalDuration = 180; // default 3 minutes
let chunkSize = 60;      // 60-second chunks (1 minute each)
let fps = 24;
let renderRes = '720p';
let outName = 'casually_explained_3min.mp4';
const audioFile = '/root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--start' && args[i + 1]) startTime = parseFloat(args[++i]);
  if (args[i] === '--duration' && args[i + 1]) totalDuration = parseFloat(args[++i]);
  if (args[i] === '--chunk-size' && args[i + 1]) chunkSize = parseFloat(args[++i]);
  if (args[i] === '--fps' && args[i + 1]) fps = parseInt(args[++i], 10);
  if (args[i] === '--res' && args[i + 1]) renderRes = args[++i];
  if (args[i] === '--out' && args[i + 1]) outName = args[++i];
}

const cleanOutBase = path.basename(outName);
const finalOutputFile = path.isAbsolute(outName)
  ? outName
  : path.join(rootDir, outName.startsWith('output/') ? outName : path.join('output', outName));
const desktopOutputFile = path.join('/root/Desktop', cleanOutBase);
fs.mkdirSync(path.dirname(finalOutputFile), { recursive: true });

console.log(`=======================================================`);
console.log(`🎬 RAM-SAFE CHUNKED VIDEO RENDER PIPELINE (MAX 1 GB RAM)`);
console.log(`⏱️ Start Time: ${startTime}s | Total Duration: ${totalDuration}s | Chunk Size: ${chunkSize}s | FPS: ${fps} | Res: ${renderRes}`);
console.log(`📁 Target Output: ${finalOutputFile}`);
console.log(`=======================================================\n`);

function printMemoryUsage(tag = '') {
  try {
    const meminfo = fs.readFileSync('/proc/meminfo', 'utf8');
    const totalMatch = meminfo.match(/MemTotal:\s+(\d+)\s+kB/);
    const availMatch = meminfo.match(/MemAvailable:\s+(\d+)\s+kB/);
    if (totalMatch && availMatch) {
      const totalMb = (parseInt(totalMatch[1], 10) / 1024).toFixed(0);
      const availMb = (parseInt(availMatch[1], 10) / 1024).toFixed(0);
      const usedMb = (totalMb - availMb).toFixed(0);
      console.log(`[RAM Monitor ${tag}] Used: ${usedMb} MB / Total: ${totalMb} MB (Available: ${availMb} MB)`);
    }
  } catch (e) {
    // fallback
  }
}

printMemoryUsage('Before Start');

const numChunks = Math.ceil(totalDuration / chunkSize);
const chunkFiles = [];

const masterStartTime = Date.now();

for (let chunkIdx = 0; chunkIdx < numChunks; chunkIdx++) {
  const startSec = startTime + chunkIdx * chunkSize;
  const endSec = Math.min(startTime + totalDuration, startTime + (chunkIdx + 1) * chunkSize);
  const chunkFileName = `chunk_${String(chunkIdx + 1).padStart(3, '0')}.mp4`;
  const chunkFilePath = path.join(chunksDir, chunkFileName);
  chunkFiles.push(chunkFilePath);

  console.log(`\n-------------------------------------------------------`);
  console.log(`📦 STARTING CHUNK [${chunkIdx + 1}/${numChunks}]: ${startSec}s -> ${endSec}s (${endSec - startSec}s duration)`);
  console.log(`-------------------------------------------------------`);
  printMemoryUsage(`Pre-Chunk ${chunkIdx + 1}`);

  const chunkCmd = [
    'scripts/render-chunk.mjs',
    '--start', String(startSec),
    '--end', String(endSec),
    '--fps', String(fps),
    '--res', renderRes,
    '--out', chunkFilePath,
  ];

  const env = {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=512',
  };

  const result = spawnSync('npx', ['tsx', ...chunkCmd], {
    cwd: rootDir,
    env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.error(`❌ Chunk ${chunkIdx + 1} failed with exit code ${result.status}`);
    process.exit(1);
  }

  printMemoryUsage(`Post-Chunk ${chunkIdx + 1}`);
}

console.log(`\n=======================================================`);
console.log(`🔗 STITCHING & AUDIO MUXING ALL ${numChunks} CHUNKS`);
console.log(`=======================================================`);

// Create FFmpeg concat list
const concatListPath = path.join(chunksDir, 'concat_list.txt');
const concatContent = chunkFiles.map(f => `file '${f}'`).join('\n');
fs.writeFileSync(concatListPath, concatContent);

const concatCmd = [
  '/usr/bin/ffmpeg',
  '-y',
  '-f', 'concat',
  '-safe', '0',
  '-i', concatListPath,
  '-ss', String(startTime),
  '-t', String(totalDuration),
  '-i', audioFile,
  '-c:v', 'copy',
  '-c:a', 'aac',
  '-b:a', '192k',
  '-shortest',
  finalOutputFile,
].join(' ');

console.log(`[FFmpeg] Executing concat command...`);
execSync(concatCmd, { stdio: 'inherit' });

// Copy to desktop if distinct
if (finalOutputFile !== desktopOutputFile) {
  fs.copyFileSync(finalOutputFile, desktopOutputFile);
}

const totalElapsed = ((Date.now() - masterStartTime) / 1000).toFixed(1);
const stats = fs.statSync(finalOutputFile);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

console.log(`\n=======================================================`);
console.log(`🎉 CHUNKED RENDER & STITCHING COMPLETE!`);
console.log(`📁 Output File: ${desktopOutputFile}`);
console.log(`⏱️ Total Time: ${totalElapsed}s`);
console.log(`💾 Final Video Size: ${sizeMb} MB`);
console.log(`=======================================================\n`);
printMemoryUsage('Final');
