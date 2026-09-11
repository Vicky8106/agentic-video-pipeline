/**
 * Act 2 Scene 22 (152.95–163.79s): act2-s22-obviously-videos
 * "Very obviously videos: cameras, multiple camera angles, editing, music, subtitles."
 * Triple camera rigs, overhead boom mic, floating music notes, waveform.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, cameraRig,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 152.95;
export const S_END = 163.79;

function renderWorld(t: number): string {
  const wave = Math.sin(t * 8) * 15;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Left Tripod Camera (CAM A)
    cameraRig(420, 600, 1.2) +
    `<text x="420" y="520" font-family="'Impact', sans-serif" font-size="20" fill="#ef4444" text-anchor="middle">● REC [CAM A]</text>` +
    // Right Tripod Camera (CAM B)
    `<g transform="scale(-1, 1) translate(-1500, 0)">` +
      cameraRig(0, 600, 1.2) +
      `<text x="0" y="520" font-family="'Impact', sans-serif" font-size="20" fill="#ef4444" text-anchor="middle">● REC [CAM B]</text>` +
    `</g>` +
    // Overhead Boom Mic dipping in
    `<g transform="translate(960, 120)">
      <line x1="-300" y1="-100" x2="0" y2="40" stroke="#334155" stroke-width="8"/>
      <rect x="-25" y="30" width="50" height="24" rx="10" fill="#1e293b"/>
    </g>` +
    // Animated music notes and waveform
    `<g transform="translate(960, 260)">
      <text x="-60" y="0" font-family="sans-serif" font-size="28" fill="#facc15">♪</text>
      <text x="60" y="${wave.toFixed(1)}" font-family="sans-serif" font-size="34" fill="#38bdf8">♫</text>
    </g>` +
    // Subtitle card mockup
    `<g transform="translate(960, 840)">
      <rect x="-180" y="-25" width="360" height="50" rx="8" fill="#000000" opacity="0.8"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#facc15" text-anchor="middle">[EPIC PHONK MUSIC PLAYING]</text>
    </g>` +
    // Host in center gesturing to the production rig
    host(960, 652, t, {
      expression: "skeptical_side_eye",
      spineLean: 0,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 152.95, x: 960, y: 540, zoom: 1.15 },
  { at: 157.07, x: 420, y: 560, zoom: 1.35 },
  { at: 160.35, x: 1500, y: 560, zoom: 1.35 },
  { at: 163.15, x: 960, y: 540, zoom: 1.25 },
  { at: 163.79, x: 960, y: 540, zoom: 1.27 },
]);

export const scene: AuthoredScene = {
  id: "act2-s22-obviously-videos",
  start: S_START,
  end: S_END,
  intent: "Multi-camera studio rig with boom mic, recording lights, and phonk music subtitles.",
  renderWorld,
  camera: baseCamera,
};
