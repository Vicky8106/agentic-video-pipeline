/**
 * Single entry that assembles the whole pipeline from data files.
 *
 * Everything here is built once and is immutable afterwards: the returned
 * `frame(t)` is a pure function, so a caller may invoke it from any process in
 * any order.
 */
import fs from "fs";
import path from "path";

import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript, Transcript } from "../src/subtitles/Transcript";
import { direct, DirectionPlan } from "../src/director/Director";
import { buildPerformance, Performance } from "../src/director/Performance";
import { renderFrame, EngineInput } from "../src/engine/RenderEngine";
import { CharacterSpec, makeSpec, BODY_PRESETS, hashSeed, HairStyle } from "../src/character/CharacterSpec";
import { buildBlinkPlan, BlinkPlan, Envelope } from "../src/audio/Envelope";
import { cameraAt, viewBoxFor } from "../src/camera/CameraTrack";

export interface EngineBundle {
  engine: EngineInput;
  plan: DirectionPlan;
  transcript: Transcript;
  perf: Performance;
  duration: number;
  frame: (t: number) => ReturnType<typeof renderFrame>;
  /** Camera travel in screen pixels at t, used by the shake layer. */
  cameraScaleAt: (t: number, renderWidth: number) => number;
}

const HAIRS: HairStyle[] = ["long_wave", "bob", "short_swoop", "bun"];

/**
 * Load character specs. Any JSON in `characters/*.json` overrides the
 * procedural defaults, which is the seam where an image-derived spec lands:
 * fit these numbers to a reference photo and the rig handles the rest.
 */
function loadSpecs(root: string, ids: string[]): Record<string, CharacterSpec> {
  const specs: Record<string, CharacterSpec> = {
    host: makeSpec("host", "Host", { body: { ...BODY_PRESETS.average }, hair: "short_swoop" }),
    default: makeSpec("default", "Extra", {}),
  };

  const dir = path.join(root, "characters");
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        const id = raw.id ?? path.basename(f, ".json");
        specs[id] = { ...makeSpec(id, raw.displayName ?? id), ...raw };
      } catch (err) {
        console.warn(`[specs] skipping ${f}: ${(err as Error).message}`);
      }
    }
  }

  for (const id of ids) {
    if (specs[id]) continue;
    const seed = hashSeed(id);
    const body = seed > 0.66 ? BODY_PRESETS.lean : seed > 0.33 ? BODY_PRESETS.hourglass : BODY_PRESETS.average;
    specs[id] = makeSpec(id, id, {
      hair: HAIRS[Math.floor(seed * HAIRS.length) % HAIRS.length],
      body: { ...body },
    });
  }
  return specs;
}

export function createEngine(root: string, opts: { fps?: number } = {}): EngineBundle {
  const fps = opts.fps ?? 24;
  const srtFile = [
    path.join(root, "public/0-chapter-1.srt"),
    path.join(root, "public/subtitles.srt"),
    path.join(root, "public/new_chapter_1_full.srt"),
  ].find((p) => fs.existsSync(p));
  if (!srtFile) throw new Error("no SRT found in public/");

  const cues = parseSrt(fs.readFileSync(srtFile, "utf8"));
  const transcript = buildTranscript(cues);

  const envPath = path.join(root, "public/envelope.json");
  let envelope: Envelope | null = null;
  if (fs.existsSync(envPath)) {
    const raw = JSON.parse(fs.readFileSync(envPath, "utf8"));
    envelope = { hop: raw.hop, values: raw.values, sampleRate: raw.sampleRate };
  } else {
    console.warn("[engine] no public/envelope.json - lip-sync falls back to pose defaults");
  }

  const plan = direct(transcript, { fps });
  const perf = buildPerformance(plan, { hostId: "host" });
  const specs = loadSpecs(root, perf.ids);

  const blinkPlans: Record<string, BlinkPlan> = {};
  for (const id of new Set(["host", ...perf.ids])) {
    blinkPlans[id] = buildBlinkPlan(hashSeed(id), transcript.duration + 1);
  }

  const engine: EngineInput = {
    plan, perf, transcript, envelope, specs, blinkPlans,
    hostId: "host", width: 1280, height: 720, fps,
  };

  return {
    engine, plan, transcript, perf,
    duration: transcript.duration,
    frame: (t: number) => renderFrame(engine, t),
    cameraScaleAt: (t: number, renderWidth: number) =>
      pxPerUnitAt(plan, t, renderWidth),
  };
}

function pxPerUnitAt(plan: DirectionPlan, t: number, renderWidth: number): number {
  const pose = cameraAt(plan.resolved, t);
  const vb = viewBoxFor(pose, 1920, 1080).split(/[ ,]+/).map(Number);
  return vb[2] > 0 ? renderWidth / vb[2] : 1;
}
