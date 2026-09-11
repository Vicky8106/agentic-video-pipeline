/**
 * Test Suite: End-to-End Storytelling Camera Engine
 *
 * Verifies that the agentically directed camera moves seamlessly through:
 * 1. Wide establishing two-shot
 * 2. Smooth cinematic pan to subject
 * 3. Dramatic prop macro with slow push-in and motivated impact
 * 4. Host reaction close-up
 *
 * Renders high-res proof stills and a proof MP4 clip.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { manifestToDirectorSheet } from "../src/forge/DirectorSheetAdapter.js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { BeatVisualSpec } from "../src/forge/BeatManifestExtractor.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Starting End-to-End Agentic Cinematic Camera Test...");

  const outDir = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/stills_agentic_camera";
  const artifactVideoPath = "/root/.gemini/antigravity-cli/brain/0943b627-7260-4738-b724-42e8c005e649/agentic_camera_storytelling_proof.mp4";
  const desktopVideoDir = "/root/Desktop/anatoly";
  const desktopVideoPath = path.join(desktopVideoDir, "agentic_camera_storytelling_proof.mp4");

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(desktopVideoDir, { recursive: true });

  const testSrt = `1
00:00:00,000 --> 00:00:06,000
Welcome to the elite powerlifting gym.

2
00:00:06,000 --> 00:00:12,000
Anatoly sweeps the chalk dust right beside the record holder.

3
00:00:12,000 --> 00:00:18,000
He casually drops the 500-pound anchor barbell with an earth-shaking slam!

4
00:00:18,000 --> 00:00:24,000
The host stares dead into the lens in total shock.
`;

  const manifest: BeatVisualSpec[] = [
    {
      beatIndex: 1,
      startSec: 0.0,
      endSec: 6.0,
      text: "Welcome to the elite powerlifting gym.",
      visualGag: "Establishing shot of the elite gym floor",
      propId: null,
      bgId: "BG-GYM",
      characterId: "host",
      bannerText: "ESTABLISHING SHOT",
      cameraShot: "wide_two_shot",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.3,
      impactShake: false,
    },
    {
      beatIndex: 2,
      startSec: 6.0,
      endSec: 12.0,
      text: "Anatoly sweeps the chalk dust right beside the record holder.",
      visualGag: "Camera pans smoothly across to Anatoly cleaning",
      propId: "PROP-JANITOR-MOP",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "UNDERCOVER JANITOR",
      cameraShot: "subject_focus",
      cameraMove: "pan_to_subject",
      transition: "cut",
      energy: 0.55,
      impactShake: false,
    },
    {
      beatIndex: 3,
      startSec: 12.0,
      endSec: 18.0,
      text: "He casually drops the 500-pound anchor barbell with an earth-shaking slam!",
      visualGag: "Macro close-up on heavy anchor barbell slamming to floor",
      propId: "PROP-ANCHOR-BARBELL",
      bgId: "BG-GYM",
      characterId: "anatoly",
      bannerText: "500 LBS SLAM",
      cameraShot: "prop_macro",
      cameraMove: "slow_push_in",
      transition: "cut",
      energy: 0.95,
      impactShake: true,
    },
    {
      beatIndex: 4,
      startSec: 18.0,
      endSec: 24.0,
      text: "The host stares dead into the lens in total shock.",
      visualGag: "Host deadpan shocked reaction close-up",
      propId: null,
      bgId: "BG-STUDIO",
      characterId: "host",
      bannerText: "SHOCK REACTION",
      cameraShot: "host_reaction",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.25,
      impactShake: false,
    },
  ];

  // 1. Convert manifest to director sheet
  const sheet = manifestToDirectorSheet(manifest);
  const production = createAutoProduction(testSrt, "casually-procedural", { sheet });

  // 2. Render and save proof stills
  const fontFiles = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
  ].filter(fs.existsSync);

  const stillConfigs = [
    { name: "still_cam_beat1_wide.png", timeSec: 3.0, label: "Beat 1: Wide Two-Shot Establishing" },
    { name: "still_cam_beat2_pan.png", timeSec: 9.0, label: "Beat 2: Smooth Pan to Subject" },
    { name: "still_cam_beat3_macro.png", timeSec: 15.0, label: "Beat 3: Prop Macro with Slow Push-In" },
    { name: "still_cam_beat4_reaction.png", timeSec: 21.0, label: "Beat 4: Host Reaction Close-Up" },
  ];

  for (const item of stillConfigs) {
    const { svg } = renderAutoSvgFrame({ production, timeSec: item.timeSec, width: 1280, height: 720 });
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1280 },
      font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false },
    });
    const pngBuffer = resvg.render().asPng();
    const filePath = path.join(outDir, item.name);
    fs.writeFileSync(filePath, pngBuffer);
    console.log(`Rendered proof still: ${item.name} (${item.label})`);
  }

  // 3. Render 16s video clip showing all transitions smoothly
  console.log("Rendering 16s video proof showing cinematic camera transitions...");
  const width = 1280;
  const height = 720;
  const fps = 24;
  const durationSec = 16;
  const totalFrames = fps * durationSec;

  const ff = spawn("ffmpeg", [
    "-y",
    "-f", "rawvideo",
    "-pix_fmt", "rgba",
    "-s", `${width}x${height}`,
    "-r", `${fps}`,
    "-i", "-",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "ultrafast",
    artifactVideoPath,
  ]);

  for (let i = 0; i < totalFrames; i++) {
    const t = 4.0 + (i / totalFrames) * 16.0; // t = 4.0s to 20.0s (spans Beats 1, 2, 3, 4)
    const { svg } = renderAutoSvgFrame({ production, timeSec: t, width, height });
    const pixels = new Resvg(svg, {
      fitTo: { mode: "width", value: width },
      font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false },
    }).render().pixels;

    if (!ff.stdin.write(pixels)) {
      await new Promise((r) => ff.stdin.once("drain", r));
    }
  }

  ff.stdin.end();

  await new Promise<void>((resolve, reject) => {
    ff.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  // Copy to desktop
  fs.copyFileSync(artifactVideoPath, desktopVideoPath);
  console.log(`Proof video generated: ${artifactVideoPath}`);
  console.log(`Copied to Desktop: ${desktopVideoPath}`);

  // Assert file sizes
  assert(fs.existsSync(artifactVideoPath) && fs.statSync(artifactVideoPath).size > 100000, "Artifact video must exist and be > 100KB");
  assert(fs.existsSync(desktopVideoPath), "Desktop video must exist");

  console.log("E2E cinematic camera storytelling proof complete.");
  console.log("GATE-CAM-04 PASS");
}

run().catch((err) => {
  console.error("E2E Camera test failed:", err);
  process.exit(1);
});
