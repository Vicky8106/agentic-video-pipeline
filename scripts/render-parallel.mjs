import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const chunksDir = path.join(rootDir, 'output', 'chunks');
if (!fs.existsSync(chunksDir)) fs.mkdirSync(chunksDir, { recursive: true });

// Parse CLI args
const args = process.argv.slice(2);
let totalDuration = 644.1; // default 10min 44s
let chunkSize = 60;        // 60-second chunks
let fps = 24;
let renderRes = '720p';
let concurrency = 2;       // 2 parallel workers (RAM safe under 1.5 GB)
let outName = 'casually_explained_master_10min.mp4';
let audioFile = fs.existsSync('/root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3')
  ? '/root/Desktop/2026-08-27_07-40-20_0-chapter-1.mp3'
  : path.join(rootDir, 'public', 'audio.mp3');

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--duration' && args[i + 1]) totalDuration = parseFloat(args[++i]);
  if (args[i] === '--chunk-size' && args[i + 1]) chunkSize = parseFloat(args[++i]);
  if (args[i] === '--fps' && args[i + 1]) fps = parseInt(args[++i], 10);
  if (args[i] === '--res' && args[i + 1]) renderRes = args[++i];
  if (args[i] === '--concurrency' && args[i + 1]) concurrency = parseInt(args[++i], 10);
  if (args[i] === '--audio' && args[i + 1]) audioFile = args[++i];
  if (args[i] === '--out' && args[i + 1]) outName = args[++i];
}

const finalOutputFile = path.isAbsolute(outName)
  ? outName
  : path.join(rootDir, 'output', outName);

const outDir = path.dirname(finalOutputFile);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log(`=======================================================`);
console.log(`🚀 PARALLEL MULTI-WORKER VIDEO RENDER (CONCURRENCY: ${concurrency})`);
console.log(`⏱️ Duration: ${totalDuration}s | Chunk Size: ${chunkSize}s | FPS: ${fps} | Res: ${renderRes}`);
console.log(`💾 Max Heap per Worker: 450 MB | Total Projected RAM: ~850 MB (< 1.5 GB)`);
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
  } catch (e) {}
}

printMemoryUsage('Initial');

const numChunks = Math.ceil(totalDuration / chunkSize);
const tasks = [];

for (let chunkIdx = 0; chunkIdx < numChunks; chunkIdx++) {
  const startSec = chunkIdx * chunkSize;
  const endSec = Math.min(totalDuration, (chunkIdx + 1) * chunkSize);
  const chunkFileName = `chunk_${String(chunkIdx + 1).padStart(3, '0')}.mp4`;
  const chunkFilePath = path.join(chunksDir, chunkFileName);
  tasks.push({
    chunkIdx: chunkIdx + 1,
    startSec,
    endSec,
    chunkFilePath,
  });
}

function runChunkWorker(task) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    console.log(`▶️ [Worker Launch] Chunk [${task.chunkIdx}/${numChunks}]: ${task.startSec}s -> ${task.endSec}s`);

    const chunkCmd = [
      'scripts/render-chunk.mjs',
      '--start', String(task.startSec),
      '--end', String(task.endSec),
      '--fps', String(fps),
      '--res', renderRes,
      '--out', task.chunkFilePath,
    ];

    const env = {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=450',
    };

    const child = spawn('npx', ['tsx', ...chunkCmd], {
      cwd: rootDir,
      env,
      stdio: ['ignore', 'inherit', 'inherit'],
    });

    child.on('close', (code) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      if (code === 0) {
        console.log(`✅ [Worker Finish] Chunk [${task.chunkIdx}/${numChunks}] in ${elapsed}s`);
        printMemoryUsage(`Post-Chunk ${task.chunkIdx}`);
        resolve();
      } else {
        reject(new Error(`Chunk ${task.chunkIdx} failed with exit code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

// Concurrency pool dispatcher
async function runParallelPool() {
  const masterStart = Date.now();
  let taskIndex = 0;
  let activeWorkers = 0;
  let hasError = null;

  return new Promise((resolve, reject) => {
    function next() {
      if (hasError) return;

      if (taskIndex >= tasks.length && activeWorkers === 0) {
        const totalSec = ((Date.now() - masterStart) / 1000).toFixed(1);
        console.log(`\n🎉 All ${numChunks} chunks rendered in parallel in ${totalSec}s!\n`);
        return resolve();
      }

      while (activeWorkers < concurrency && taskIndex < tasks.length) {
        const currentTask = tasks[taskIndex++];
        activeWorkers++;

        runChunkWorker(currentTask)
          .then(() => {
            activeWorkers--;
            next();
          })
          .catch((err) => {
            hasError = err;
            reject(err);
          });
      }
    }

    next();
  });
}

async function main() {
  try {
    await runParallelPool();

    console.log(`=======================================================`);
    console.log(`🔗 CONCATENATING & AUDIO MUXING ALL ${numChunks} CHUNKS`);
    console.log(`=======================================================`);

    const concatListPath = path.join(chunksDir, 'concat_list.txt');
    const concatContent = tasks.map(t => `file '${t.chunkFilePath}'`).join('\n');
    fs.writeFileSync(concatListPath, concatContent);

    const concatCmd = [
      '/usr/bin/ffmpeg',
      '-y',
      '-fflags', '+genpts',
      '-f', 'concat',
      '-safe', '0',
      '-i', concatListPath,
      '-i', audioFile,
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      '-movflags', '+faststart',
      finalOutputFile,
    ];

    console.log(`[FFmpeg] Executing concat command: ffmpeg ${concatCmd.join(' ')}`);

    const ffmpegProc = spawn(concatCmd[0], concatCmd.slice(1), {
      cwd: rootDir,
      stdio: 'inherit',
    });

    ffmpegProc.on('close', (code) => {
      if (code === 0) {
        const stats = fs.statSync(finalOutputFile);
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`\n=======================================================`);
        console.log(`🎉 PARALLEL MASTER VIDEO RENDER & STITCH COMPLETE!`);
        console.log(`📁 File: ${finalOutputFile} (${sizeMb} MB)`);
        console.log(`=======================================================\n`);
      } else {
        console.error(`FFmpeg concat failed with exit code ${code}`);
        process.exit(code);
      }
    });

  } catch (err) {
    console.error(`❌ Render failed:`, err);
    process.exit(1);
  }
}

main();
