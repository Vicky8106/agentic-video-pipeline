/**
 * Act 2 Scene 24 (175.46–186.91s): act2-s24-real-life-gym
 * "Real life is mostly standing around waiting for someone to finish using the squat rack.
 * Nobody screams, nobody falls to their knees."
 * Two gym bros in awkward silence waiting for squat rack. Ticking clock overhead.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  builder, host,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 175.46;
export const S_END = 186.91;

function renderWorld(t: number): string {
  const footTap = Math.sin(t * 4) * 8;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Squat rack in center
    `<g transform="translate(960, 640)">
      <rect x="-120" y="-180" width="16" height="240" fill="#dc2626"/>
      <rect x="104" y="-180" width="16" height="240" fill="#dc2626"/>
      <line x1="-120" y1="-100" x2="120" y2="-100" stroke="#94a3b8" stroke-width="8"/>
      <!-- Bench with guy sitting doing nothing -->
      <rect x="-80" y="20" width="160" height="15" rx="3" fill="#1e293b"/>
      <line x1="-60" y1="35" x2="-60" y2="60" stroke="#334155" stroke-width="6"/>
      <line x1="60" y1="35" x2="60" y2="60" stroke="#334155" stroke-width="6"/>
    </g>` +
    // Guy 1 sitting on bench staring blankly into space
    builder(960, 620, t, {
      clothes: "bodybuilder_tank",
      expression: "deadpan_classic",
      scale: 1.3,
    }) +
    // Guy 2 standing with crossed arms tapping foot
    host(560, 652, t, {
      expression: "skeptical_side_eye",
      spineLean: 4,
    }) +
    // Ticking analog clock on gym wall
    `<g transform="translate(960, 240)">
      <circle cx="0" cy="0" r="45" fill="#f8fafc" stroke="#334155" stroke-width="5"/>
      <line x1="0" y1="0" x2="0" y2="-25" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="${(Math.cos(t * 2) * 30).toFixed(1)}" y2="${(Math.sin(t * 2) * 30).toFixed(1)}" stroke="#ef4444" stroke-width="2"/>
      <circle cx="0" cy="0" r="4" fill="#ef4444"/>
    </g>`
  );
}

const baseCamera = keyframedCamera([
  { at: 175.46, x: 960, y: 540, zoom: 1.15 },
  { at: 182.47, x: 960, y: 540, zoom: 1.20 },
  // Deadpan punch hold on the guy doing nothing on the bench
  { at: 185.66, x: 960, y: 580, zoom: 1.65 },
  { at: 186.91, x: 960, y: 580, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act2-s24-real-life-gym",
  start: S_START,
  end: S_END,
  intent: "Awkward gym reality: two lifters waiting in deadpan silence for the squat rack with a ticking wall clock.",
  renderWorld,
  camera: baseCamera,
};
