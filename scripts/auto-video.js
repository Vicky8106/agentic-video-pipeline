#!/usr/bin/env node
/**
 * auto-video: direction in, finished video out. No per-video tuning.
 *
 * Authored film (primary — the directing agent staged every second):
 *   NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts \
 *     --film authored/<name>/index.js --audio voice.mp3 --out video.mp4 --jobs 2
 *
 * Agent sheet (legacy previz path; direction still authored, never regex):
 *   NODE_OPTIONS="--max-old-space-size=512" npx tsx scripts/auto-video.ts \
 *     --script story.srt --audio voice.mp3 --out video.mp4 --jobs 2 --sheet beats.json
 *
 * What each path stages:
 * - --film: the authored film module IS the direction (scenes, cameras,
 *   choreography). Workers rasterize; nothing is decided at render time.
 * - --sheet: an agent-directed beat sheet drives the deterministic renderer.
 * - Without --film or --sheet the command fails: the regex fallback and the
 *   runtime LLM director were removed, so undirecteded video no longer renders.
 * - Lip-sync truth: from the voice amplitude envelope.
 * - Timing master: the audio duration.
 *
 * Speed without quality loss (all pixel-identical to single-process):
 * - Font subsetting: resvg re-parses ~1.4MB of TTF per frame (~90% of frame
 *   cost). Subsetting to the script's glyphs + fixed repertoire once per
 *   run removes it. Falls back to full fonts if subsetting fails.
 * - Parallel chunks: --jobs 2 renders beat-aligned chunks in 2 worker
 *   processes (pure camera track => seamless). 720p+ auto-caps to 1 worker:
 *   measured ~270MB/worker at <=540p vs ~470MB at 720p, and the device
 *   budget is 800MB. Scale out across machines past that.
 * - Envelope cache + text-free frames skip font loading entirely.
 *
 * Defaults: punch-word impact typography stays OFF (opt in with
 * --impact-words); style-pack environmental labels (signage, prop tags)
 * remain, since blank signboards read as broken. Deterministic
 * pure-function frames, sequential-per-worker 512MB heaps.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn, spawnSync, execFileSync } from "node:child_process";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { loadScript } from "../src/auto/script.js";
import { probeDuration, buildEnvelope, findPeaks } from "../src/auto/audio.js";
import { renderAuthoredFrame, coverageGaps } from "../src/authored/AuthoredScene.js";
import { validateSheet } from "../src/director/DirectorSheet.js";
import { summarizeBeatManifest, formatManifestLine } from "../src/director/BeatManifest.js";
// Bump when renderer code changes so stale chunks never pass resume.
const PIPELINE_VERSION = 16;
const MAX_JOBS = 2;
const args = process.argv.slice(2);
const get = (name, fallback = "") => {
    const i = args.indexOf(name);
    return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const flag = (name) => args.includes(name);
const FULL_FONTS = [
    "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);
function fmtSrt(t) {
    const ms = Math.max(0, Math.round(t * 1000));
    const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
    const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const r = String(ms % 1000).padStart(3, "0");
    return `${h}:${m}:${s},${r}`;
}
function toSrt(cues) {
    return cues.map((c) => `${c.id}\n${fmtSrt(c.start)} --> ${fmtSrt(c.end)}\n${c.text}\n`).join("\n");
}
function ffprobeDuration(file) {
    const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], { encoding: "utf8" }).trim();
    return Number(out);
}
/**
 * Direction is authored or it does not exist. There is no regex fallback
 * and no runtime LLM call: an undirecteded second fails here, loudly,
 * instead of rendering a confident wrong video. Direct new work as an
 * authored film (docs/AUTHORED_SCENES.md, rendered with --film) or an
 * agent sheet (--sheet beats.json, checked with check-sheet.ts).
 */
/**
 * Load an agent-authored director sheet (--sheet beats.json, written by the
 * coding-agent director and checked with check-sheet.ts). Validated
 * fail-closed; zero usable beats throws so a broken sheet never renders.
 */
function loadAgentSheet(sheetArg, windowEnd) {
    const p = path.isAbsolute(sheetArg) ? sheetArg : path.join(ROOT, sheetArg);
    const raw = JSON.parse(fs.readFileSync(p, "utf8"));
    const { beats, warnings } = validateSheet(raw, 0, windowEnd);
    if (beats.length === 0)
        throw new Error(`Agent sheet ${p} has zero usable beats: ${warnings.join("; ")}`);
    return { beats, director: "agent-sheet", warnings };
}
async function resolveBeatSheet(windowEnd, sheetArg = "") {
    if (!sheetArg) {
        throw new Error("no direction: pass --sheet <beats.json> (agent-directed, check-sheet.ts green) " +
            "or render an authored film with --film <film-module> (docs/AUTHORED_SCENES.md). " +
            "The regex fallback and runtime LLM director were removed; undirecteded video no longer renders.");
    }
    return loadAgentSheet(sheetArg, windowEnd);
}
async function renderChunk(renderFrame, t0, t1, file, tag, width, height, fps, fontFiles) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const baseFont = { defaultFontFamily: "Noto Sans", loadSystemFonts: false };
    const ff = spawn("/usr/bin/ffmpeg", [
        "-y", "-hide_banner", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", String(fps), "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
        "-g", "24", "-keyint_min", "24", "-sc_threshold", "0", "-flags", "+cgop",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", file,
    ], { stdio: ["pipe", "inherit", "inherit"] });
    const frames = Math.max(1, Math.round((t1 - t0) * fps));
    for (let i = 0; i < frames; i++) {
        const t = Math.min(t1 - 1e-6, t0 + i / fps);
        const svg = renderFrame(t);
        // Text-free frames skip font loading: identical pixels, ~10x faster.
        const font = svg.includes("<text") ? { ...baseFont, fontFiles } : baseFont;
        const pixels = new Resvg(svg, { fitTo: { mode: "width", value: width }, font }).render().pixels;
        if (!ff.stdin.write(pixels))
            await new Promise((r) => ff.stdin.once("drain", r));
        if (i % (fps * 5) === 0)
            console.log(`[${tag}] ${(100 * i / frames).toFixed(0)}% t=${t.toFixed(1)}s`);
    }
    ff.stdin.end();
    await new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))));
}
/**
 * Voice-driven emphasis: loud peaks inside punchline/escalation beats
 * become shake events (screen energy follows the performance). Capped at
 * one per beat, >=2s apart, so it can never turn into zoom spam.
 * Deterministic: parent and workers compute the same injection.
 */
function injectVoicePeaks(production, envelope, finalDuration) {
    const peaks = findPeaks(envelope, 0.55, 2.0).filter((t) => t < finalDuration);
    const existing = production.plan.events.filter((e) => e.kind === "shake" || e.kind === "flash").map((e) => e.t);
    let injected = 0;
    for (const t of peaks) {
        const beat = production.productionPlan.beats.find((b) => t >= b.start && t <= b.end);
        if (!beat || (beat.role !== "punchline" && beat.role !== "escalation"))
            continue;
        if (existing.some((e) => Math.abs(e - t) < 1.0))
            continue;
        production.plan.events.push({ t, kind: "shake", payload: { strength: 0.3, decay: 0.3 }, reason: "voice-peak" });
        existing.push(t);
        injected++;
    }
    production.plan.events.sort((a, b) => a.t - b.t);
    return injected;
}
/**
 * Subset the fonts to this video's glyphs. resvg parses the font files on
 * EVERY frame, so 1.4MB of TTF is ~90% of frame cost; a few-KB subset with
 * identical outlines renders identical pixels. Falls back to full fonts.
 */
function subsetFonts(scriptText, chunkDir) {
    const dir = path.join(chunkDir, "fonts");
    try {
        const seen = new Set();
        for (const ch of scriptText) {
            const cp = ch.codePointAt(0);
            if (cp >= 0x20 && cp <= 0x10ffff)
                seen.add(cp.toString(16).toUpperCase());
        }
        const ranges = [
            "0020-007E", "00A0-00FF", "2000-206F", "20A0-20CF",
            "2100-214F", "2190-21FF", "2200-22FF", "25A0-25FF", "2600-26FF", "1F300-1FAFF",
        ];
        const unicodes = [...ranges, ...[...seen].map((h) => `U+${h}`)].join(",");
        fs.mkdirSync(dir, { recursive: true });
        const out = [];
        for (const f of FULL_FONTS) {
            const base = path.basename(f, ".ttf") + "-sub.ttf";
            const target = path.join(dir, base);
            const r = spawnSync("pyftsubset", [f, `--unicodes=${unicodes}`, `--output-file=${target}`], { encoding: "utf8" });
            if (r.status !== 0 || !fs.existsSync(target))
                throw new Error(`pyftsubset failed for ${f}`);
            out.push(target);
        }
        const before = FULL_FONTS.reduce((a, f) => a + fs.statSync(f).size, 0);
        const after = out.reduce((a, f) => a + fs.statSync(f).size, 0);
        console.log(`[auto-video] fonts subset ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
        return out;
    }
    catch (err) {
        console.warn(`[auto-video] font subsetting failed, using full fonts: ${err.message}`);
        return FULL_FONTS;
    }
}
function loadOrBuildEnvelope(audio, chunkDir, hopMs = 20) {
    const cache = path.join(chunkDir, "envelope.json");
    try {
        const st = fs.statSync(audio);
        const prev = JSON.parse(fs.readFileSync(cache, "utf8"));
        if (prev.audioPath === path.resolve(audio) && prev.mtimeMs === st.mtimeMs && prev.size === st.size && prev.hopMs === hopMs) {
            console.log(`[auto-video] envelope cache hit (${prev.envelope.values.length} buckets)`);
            return prev.envelope;
        }
    }
    catch { /* rebuild */ }
    const envelope = buildEnvelope(audio, hopMs);
    try {
        const st = fs.statSync(audio);
        fs.writeFileSync(cache, JSON.stringify({ audioPath: path.resolve(audio), mtimeMs: st.mtimeMs, size: st.size, hopMs, envelope }));
    }
    catch { /* cache is best-effort */ }
    return envelope;
}
function rssMb(pid) {
    try {
        const txt = fs.readFileSync(`/proc/${pid}/status`, "utf8");
        const m = txt.match(/VmRSS:\s+(\d+)\s+kB/);
        return m ? Number(m[1]) / 1024 : 0;
    }
    catch {
        return 0;
    }
}
/** Whole subtree: workers spawn their own ffmpeg, which must count too. */
function treeRss(pid) {
    let sum = rssMb(pid);
    let kids = [];
    try {
        for (const d of fs.readdirSync("/proc")) {
            if (!/^\d+$/.test(d))
                continue;
            try {
                const txt = fs.readFileSync(`/proc/${d}/status`, "utf8");
                const m = txt.match(/PPid:\s+(\d+)/);
                if (m && Number(m[1]) === pid)
                    kids.push(Number(d));
            }
            catch { /* raced exit */ }
        }
    }
    catch { /* no procfs: direct RSS only */ }
    for (const k of kids)
        sum += treeRss(k);
    return sum;
}
async function runPool(items, jobs, spawnOne) {
    const pending = [...items];
    const running = new Map();
    let failed = 0;
    let peakMb = 0;
    let samples = 0;
    const sample = () => {
        let sum = 0;
        for (const c of running.values()) {
            if (c.pid)
                sum += treeRss(c.pid);
        }
        samples++;
        if (sum > peakMb)
            peakMb = sum;
    };
    await new Promise((resolve) => {
        const pump = () => {
            sample();
            if (failed > 0) {
                for (const c of running.values())
                    try {
                        c.kill();
                    }
                    catch { /* already out */ }
            }
            if (pending.length === 0 && running.size === 0)
                return resolve();
            while (failed === 0 && pending.length > 0 && running.size < jobs) {
                const i = pending.shift();
                const child = spawnOne(i);
                running.set(i, child);
                child.on("close", (code) => {
                    running.delete(i);
                    if (code !== 0)
                        failed++;
                    pump();
                });
            }
            if (running.size > 0)
                setTimeout(pump, 2000);
            else
                resolve();
        };
        pump();
    });
    sample();
    console.log(`[auto-video] workers peak combined RSS=${peakMb.toFixed(0)}MB over ${samples} samples (device budget 800MB)`);
    return failed;
}
async function workerMain(planFile, index) {
    const plan = JSON.parse(fs.readFileSync(planFile, "utf8"));
    if (plan.version !== PIPELINE_VERSION) {
        console.error(`[worker] stale plan (want v${PIPELINE_VERSION}), rerun the parent`);
        process.exit(2);
    }
    const height = Math.round((plan.width * 9) / 16);
    const tag = `chunk ${index + 1}/${plan.bounds.length - 1}`;
    // Film mode: the directing agent already staged every second; the worker
    // only rasterizes. No envelope, no sheet, no voice-peak injection.
    if (plan.filmFile) {
        const mod = await import(pathToFileURL(plan.filmFile).href);
        const film = mod.film;
        await renderChunk((t) => renderAuthoredFrame(film, t), plan.bounds[index], plan.bounds[index + 1], plan.chunkFiles[index], tag, plan.width, height, plan.fps, plan.fontFiles);
        console.log(`[worker] CHUNK_COMPLETE ${plan.chunkFiles[index]}`);
        return;
    }
    const cues = loadScript(plan.script, plan.audioDur);
    const envelope = JSON.parse(fs.readFileSync(plan.envelopeFile, "utf8"));
    const sheet = plan.sheetFile
        ? validateSheet(JSON.parse(fs.readFileSync(plan.sheetFile, "utf8")), 0, plan.audioDur).beats
        : [];
    const production = createAutoProduction(toSrt(cues), plan.style, {
        envelope, srtPath: plan.script, ...(plan.wordSidecar ? { wordSidecar: plan.wordSidecar } : {}),
        ...(sheet.length > 0 ? { sheet } : {}),
    });
    injectVoicePeaks(production, envelope, plan.finalDuration);
    await renderChunk((t) => renderAutoSvgFrame({ production, timeSec: t, width: plan.width, height, impactWords: plan.impactWords }).svg, plan.bounds[index], plan.bounds[index + 1], plan.chunkFiles[index], tag, plan.width, height, plan.fps, plan.fontFiles);
    console.log(`[worker] CHUNK_COMPLETE ${plan.chunkFiles[index]}`);
}
/**
 * Film mode: render an authored film through the same parallel chunk
 * machinery. The directing agent staged every second already; the parent
 * only tiles scene boundaries, farms out rasterization, concats, and muxes
 * the matching voice-track window. Usage:
 *
 *   ... auto-video.ts --film authored/<name>/index.js --audio voice.mp3 \
 *     --out film.mp4 [--film-t0 S] [--film-t1 S] [--jobs 2] [--width 480] [--fps 8]
 */
async function filmParentMain() {
    const filmArg = get("--film");
    const audioArg = get("--audio");
    const outArg = get("--out", "output/authored-film.mp4");
    const fps = Number(get("--fps", "8"));
    const width = Number(get("--width", "480"));
    const chunkSec = Number(get("--chunk-sec", "60"));
    const keepChunks = flag("--keep-chunks");
    const stillCount = Number(get("--stills", "6"));
    let jobs = Number(get("--jobs", "2"));
    if (!filmArg || !audioArg) {
        console.error("Usage: tsx scripts/auto-video.ts --film <film-module> --audio <voice.mp3> --out <video.mp4> [--film-t0 S] [--film-t1 S] [--jobs 2] [--width 480] [--fps 8] [--chunk-sec 60]");
        process.exit(2);
    }
    const mod = await import(pathToFileURL(path.resolve(filmArg)).href);
    const film = mod.film;
    const t0 = get("--film-t0") ? Number(get("--film-t0")) : (mod.WINDOW?.start ?? film.scenes[0].start);
    const t1 = get("--film-t1") ? Number(get("--film-t1")) : (mod.WINDOW?.end ?? film.scenes[film.scenes.length - 1].end);
    const gaps = coverageGaps(film, t0, t1);
    if (gaps.length > 0) {
        throw new Error(`authored film covers none of [${t0},${t1}]: gaps at ${JSON.stringify(gaps)} — direct the gap, no fallback renders it`);
    }
    console.log(`[auto-video] film=${film.name} window=[${t0},${t1}] scenes=${film.scenes.length}`);
    if (!Number.isFinite(jobs) || jobs < 1)
        jobs = 1;
    if (width >= 1280 && jobs > 1) {
        console.log("[auto-video] 720p+ capped to 1 worker on the 800MB device; split chunks across machines for more");
        jobs = 1;
    }
    if (jobs > MAX_JOBS) {
        console.error(`[auto-video] --jobs capped at ${MAX_JOBS} on this device (800MB RAM budget)`);
        process.exit(2);
    }
    if (!fs.existsSync(audioArg))
        throw new Error(`Audio not found: ${audioArg}`);
    const chunkDir = path.join(path.dirname(outArg), ".chunks-" + path.basename(outArg, path.extname(outArg)));
    fs.mkdirSync(chunkDir, { recursive: true });
    const metaFile = path.join(chunkDir, "meta.json");
    const meta = { version: PIPELINE_VERSION, mode: "film", film: path.resolve(filmArg), width, fps, t0, t1 };
    try {
        const prev = JSON.parse(fs.readFileSync(metaFile, "utf8"));
        if (JSON.stringify(prev) !== JSON.stringify(meta)) {
            console.log("[auto-video] film/pipeline changed, re-rendering all chunks");
            for (const f of fs.readdirSync(chunkDir))
                fs.rmSync(path.join(chunkDir, f), { force: true });
        }
    }
    catch { /* fresh */ }
    fs.writeFileSync(metaFile, JSON.stringify(meta));
    // Chunk at scene boundaries: cuts land on directed edits by construction.
    const starts = film.scenes.map((s) => s.start).filter((s) => s > t0 + 0.5 && s < t1 - 1);
    const bounds = [t0];
    for (const s of starts) {
        if (s - bounds[bounds.length - 1] >= chunkSec)
            bounds.push(s);
    }
    bounds.push(t1);
    console.log(`[auto-video] chunks=${bounds.length - 1} bounds=[${bounds.map((b) => b.toFixed(1)).join(", ")}]`);
    const chunkFiles = bounds.slice(0, -1).map((_, i) => path.join(chunkDir, `c${String(i + 1).padStart(3, "0")}.mp4`));
    const plan = {
        version: PIPELINE_VERSION, script: "", audioDur: t1,
        out: path.resolve(outArg), chunkDir: path.resolve(chunkDir), chunkFiles: chunkFiles.map((f) => path.resolve(f)),
        width, fps, style: "authored", impactWords: false, bounds, finalDuration: t1 - t0,
        envelopeFile: "", fontFiles: FULL_FONTS, filmFile: path.resolve(filmArg),
    };
    const planFile = path.join(chunkDir, "plan.json");
    fs.writeFileSync(planFile, JSON.stringify(plan));
    const todo = [];
    for (let i = 0; i < bounds.length - 1; i++) {
        const expected = bounds[i + 1] - bounds[i];
        let ok = false;
        if (fs.existsSync(chunkFiles[i])) {
            try {
                ok = Math.abs(ffprobeDuration(chunkFiles[i]) - expected) < 0.6;
            }
            catch {
                ok = false;
            }
        }
        if (ok)
            console.log(`[chunk ${i + 1}/${bounds.length - 1}] resume ${chunkFiles[i]}`);
        else
            todo.push(i);
    }
    if (todo.length > 0) {
        console.log(`[auto-video] rendering ${todo.length} chunk(s) with ${jobs} worker(s)`);
        const failed = await runPool(todo, jobs, (i) => {
            const child = spawn(process.execPath, [path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs"), path.join(ROOT, "scripts", "auto-video.ts"), "--plan", planFile, "--worker-index", String(i)], {
                cwd: ROOT, stdio: ["ignore", "inherit", "inherit"],
                env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=512" },
            });
            return child;
        });
        if (failed > 0)
            throw new Error(`${failed} chunk(s) failed`);
    }
    const listFile = path.join(chunkDir, "list.txt");
    fs.writeFileSync(listFile, chunkFiles.map((f) => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join("\n") + "\n");
    const silent = path.join(chunkDir, "silent.mp4");
    let r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silent]);
    if (r.status !== 0)
        throw new Error("concat failed");
    fs.mkdirSync(path.dirname(outArg), { recursive: true });
    r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-i", silent, "-ss", String(t0), "-t", String(t1 - t0),
        "-i", audioArg, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", outArg]);
    if (r.status !== 0)
        throw new Error("mux failed");
    const stillDir = path.join(path.dirname(outArg), "stills-" + path.basename(outArg, path.extname(outArg)));
    fs.mkdirSync(stillDir, { recursive: true });
    for (let i = 0; i < stillCount; i++) {
        const t = ((t1 - t0) * (i + 0.5)) / stillCount;
        spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-ss", String(t.toFixed(2)), "-i", outArg, "-frames:v", "1", path.join(stillDir, `still_${i + 1}.png`)]);
    }
    if (!keepChunks) {
        for (const f of [...chunkFiles, silent, listFile, planFile])
            fs.rmSync(f, { force: true });
    }
    const got = ffprobeDuration(outArg);
    console.log(`[auto-video] DONE ${outArg} duration=${got.toFixed(2)}s stills=${stillDir}`);
}
async function parentMain() {
    const scriptArg = get("--script");
    const audioArg = get("--audio");
    const outArg = get("--out", "output/auto-video.mp4");
    const fps = Number(get("--fps", "24"));
    const width = Number(get("--width", "1280"));
    const style = get("--style", "casually-procedural");
    const chunkSec = Number(get("--chunk-sec", "60"));
    const capDur = get("--duration") ? Number(get("--duration")) : 0;
    const impactWords = flag("--impact-words");
    const keepChunks = flag("--keep-chunks");
    const stillCount = Number(get("--stills", "6"));
    let jobs = Number(get("--jobs", "2"));
    if (!scriptArg || !audioArg) {
        console.error("Usage: tsx scripts/auto-video.ts --script <file.srt|txt|md> --audio <voice.mp3> --out <video.mp4> [--jobs 2] [--width 1280] [--fps 24] [--chunk-sec 60] [--duration N] [--impact-words] [--word-timings words.json] [--sheet beats.json]");
        process.exit(2);
    }
    if (!Number.isFinite(jobs) || jobs < 1)
        jobs = 1;
    // Measured on this device (Termux/Android, 800MB budget): a worker subtree
    // holds ~270MB at <=540p and ~470MB at 720p. Two workers + parent fit under
    // 800MB at <=540p (~640MB); at 720p even two workers exceed it (~1GB).
    if (width >= 1280 && jobs > 1) {
        console.log("[auto-video] 720p+ capped to 1 worker on the 800MB device (measured ~470MB/worker); split chunks across machines for more");
        jobs = 1;
    }
    if (jobs > MAX_JOBS) {
        console.error(`[auto-video] --jobs capped at ${MAX_JOBS} on this device (800MB RAM budget); split chunks across machines for more`);
        process.exit(2);
    }
    if (!fs.existsSync(scriptArg))
        throw new Error(`Script not found: ${scriptArg}`);
    if (!fs.existsSync(audioArg))
        throw new Error(`Audio not found: ${audioArg}`);
    console.log(`[auto-video] script=${scriptArg} audio=${audioArg} jobs=${jobs}`);
    const audioDur = probeDuration(audioArg);
    const cues = loadScript(scriptArg, audioDur);
    const srtText = toSrt(cues);
    console.log(`[auto-video] cues=${cues.length} audio=${audioDur.toFixed(2)}s`);
    const chunkDir = path.join(path.dirname(outArg), ".chunks-" + path.basename(outArg, path.extname(outArg)));
    fs.mkdirSync(chunkDir, { recursive: true });
    const metaFile = path.join(chunkDir, "meta.json");
    const meta = { version: PIPELINE_VERSION, width, fps, style, script: path.resolve(scriptArg), audio: path.resolve(audioArg) };
    try {
        const prev = JSON.parse(fs.readFileSync(metaFile, "utf8"));
        if (prev.version !== meta.version || prev.width !== meta.width || prev.fps !== meta.fps || prev.style !== meta.style) {
            console.log("[auto-video] pipeline changed, re-rendering all chunks");
            for (const f of fs.readdirSync(chunkDir))
                fs.rmSync(path.join(chunkDir, f), { force: true });
        }
    }
    catch { /* fresh */ }
    fs.writeFileSync(metaFile, JSON.stringify(meta));
    const envelope = loadOrBuildEnvelope(audioArg, chunkDir);
    console.log(`[auto-video] envelope buckets=${envelope.values.length}`);
    const wordSidecar = get("--word-timings");
    const sheetArg = get("--sheet");
    // Agent sheet first: it drives the manifest AND the render. Validated
    // fail-closed here so the parent and every worker share one good sheet.
    const sheetPre = sheetArg ? loadAgentSheet(sheetArg, audioDur).beats : [];
    const production = createAutoProduction(srtText, style, {
        envelope, srtPath: path.resolve(scriptArg), ...(wordSidecar ? { wordSidecar } : {}),
        ...(sheetPre.length > 0 ? { sheet: sheetPre } : {}),
    });
    console.log(`[auto-video] word-timings=${production.wordTiming.source} words=${production.wordTiming.count}${wordSidecar ? ` sidecar=${wordSidecar}` : ""}${sheetPre.length > 0 ? ` sheet-beats=${sheetPre.length}` : ""}`);
    // Drop-in brain: what the render actually stages (units, rooms, punches).
    const comedyUnits = production.comedy.units;
    const unitRooms = comedyUnits.map((u) => u.room ?? "?").join(",");
    const unitPunches = comedyUnits.map((u) => u.punchWord ?? "-").join(" / ");
    console.log(`[auto-video] comedy units=${comedyUnits.length} rooms=${unitRooms} punches=${unitPunches}`);
    // Direction is authored or it does not exist: without --sheet this throws
    // instead of rendering regex-fallback video (removed).
    const beatSheet = await resolveBeatSheet(audioDur, sheetArg);
    const manifest = summarizeBeatManifest(beatSheet.beats);
    console.log(`[auto-video] director=${beatSheet.director} sheet-beats=${beatSheet.beats.length}`);
    console.log(`[auto-video] ${formatManifestLine(manifest)}`);
    for (const w of beatSheet.warnings.slice(0, 5))
        console.warn(`[auto-video] director warning: ${w}`);
    let finalDuration = Math.max(audioDur, production.transcript.duration);
    if (capDur > 0)
        finalDuration = Math.min(finalDuration, capDur);
    const keep = Math.min(envelope.values.length, Math.ceil(finalDuration / envelope.hop));
    const trimmed = { ...envelope, values: envelope.values.slice(0, keep), duration: finalDuration };
    const envelopeFile = path.join(chunkDir, "envelope-trimmed.json");
    fs.writeFileSync(envelopeFile, JSON.stringify(trimmed));
    const injected = injectVoicePeaks(production, trimmed, finalDuration);
    console.log(`[auto-video] beats=${production.productionPlan.beats.length} injected=${injected}`);
    // Chunk at beat boundaries: every boundary lands on a hard cut, so the
    // fixed-GOP concat never slices mid-shot and the pure camera track makes
    // boundaries seamless by construction.
    const starts = production.productionPlan.beats.map((b) => b.start).filter((s) => s > 0.5 && s < finalDuration - 1);
    const bounds = [0];
    for (const s of starts) {
        if (s - bounds[bounds.length - 1] >= chunkSec)
            bounds.push(s);
    }
    bounds.push(finalDuration);
    console.log(`[auto-video] chunks=${bounds.length - 1} bounds=[${bounds.map((b) => b.toFixed(1)).join(", ")}]`);
    const fontFiles = subsetFonts(cues.map((c) => c.text).join(" "), chunkDir);
    const chunkFiles = bounds.slice(0, -1).map((_, i) => path.join(chunkDir, `c${String(i + 1).padStart(3, "0")}.mp4`));
    const plan = {
        version: PIPELINE_VERSION, script: path.resolve(scriptArg), audioDur,
        out: path.resolve(outArg), chunkDir: path.resolve(chunkDir), chunkFiles: chunkFiles.map((f) => path.resolve(f)),
        width, fps, style, impactWords, bounds, finalDuration, envelopeFile: path.resolve(envelopeFile), fontFiles,
        ...(wordSidecar ? { wordSidecar: path.resolve(wordSidecar) } : {}),
        ...(sheetArg ? { sheetFile: path.resolve(sheetArg) } : {}),
    };
    const planFile = path.join(chunkDir, "plan.json");
    fs.writeFileSync(planFile, JSON.stringify(plan));
    const todo = [];
    for (let i = 0; i < bounds.length - 1; i++) {
        const expected = bounds[i + 1] - bounds[i];
        let ok = false;
        if (fs.existsSync(chunkFiles[i])) {
            try {
                ok = Math.abs(ffprobeDuration(chunkFiles[i]) - expected) < 0.6;
            }
            catch {
                ok = false;
            }
        }
        if (ok)
            console.log(`[chunk ${i + 1}/${bounds.length - 1}] resume ${chunkFiles[i]}`);
        else
            todo.push(i);
    }
    if (todo.length > 0) {
        console.log(`[auto-video] rendering ${todo.length} chunk(s) with ${jobs} worker(s)`);
        const failed = await runPool(todo, jobs, (i) => {
            const child = spawn(process.execPath, [path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs"), path.join(ROOT, "scripts", "auto-video.ts"), "--plan", planFile, "--worker-index", String(i)], {
                cwd: ROOT, stdio: ["ignore", "inherit", "inherit"],
                env: { ...process.env, NODE_OPTIONS: "--max-old-space-size=512" },
            });
            return child;
        });
        if (failed > 0)
            throw new Error(`${failed} chunk(s) failed`);
    }
    const listFile = path.join(chunkDir, "list.txt");
    // Absolute paths: concat resolves entries relative to the list file.
    fs.writeFileSync(listFile, chunkFiles.map((f) => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join("\n") + "\n");
    const silent = path.join(chunkDir, "silent.mp4");
    let r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silent]);
    if (r.status !== 0)
        throw new Error("concat failed");
    fs.mkdirSync(path.dirname(outArg), { recursive: true });
    r = spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-i", silent, "-i", audioArg,
        "-map", "0:v:0", "-map", "1:a:0", "-t", String(finalDuration),
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-af", "apad", "-movflags", "+faststart", outArg]);
    if (r.status !== 0)
        throw new Error("mux failed");
    const stillDir = path.join(path.dirname(outArg), "stills-" + path.basename(outArg, path.extname(outArg)));
    fs.mkdirSync(stillDir, { recursive: true });
    for (let i = 0; i < stillCount; i++) {
        const t = (finalDuration * (i + 0.5)) / stillCount;
        spawnSync("/usr/bin/ffmpeg", ["-y", "-v", "error", "-ss", String(t.toFixed(2)), "-i", outArg, "-frames:v", "1", path.join(stillDir, `still_${i + 1}.png`)]);
    }
    if (!keepChunks) {
        for (const f of [...chunkFiles, silent, listFile, planFile, envelopeFile])
            fs.rmSync(f, { force: true });
    }
    const got = ffprobeDuration(outArg);
    let hwm = 0;
    try {
        const m = fs.readFileSync("/proc/self/status", "utf8").match(/VmHWM:\s+(\d+)\s+kB/);
        if (m)
            hwm = Number(m[1]) / 1024;
    }
    catch { /* no procfs */ }
    console.log(`[auto-video] DONE ${outArg} duration=${got.toFixed(2)}s stills=${stillDir} parent-peak=${hwm.toFixed(0)}MB`);
}
const planArg = get("--plan");
const workerArg = get("--worker-index");
if (planArg && workerArg !== "") {
    workerMain(planArg, Number(workerArg)).catch((err) => {
        console.error(`[worker] FAIL ${err?.message ?? err}`);
        process.exit(1);
    });
}
else if (get("--film")) {
    filmParentMain().catch((err) => {
        console.error(`[auto-video] FAIL ${err?.message ?? err}`);
        process.exit(1);
    });
}
else {
    parentMain().catch((err) => {
        console.error(`[auto-video] FAIL ${err?.message ?? err}`);
        process.exit(1);
    });
}
