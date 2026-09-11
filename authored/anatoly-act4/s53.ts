/**
 * Act 4 Scene 53 (603.74–625.48s): act4-s53
 * Persona vs Person: audience confuses exaggerated character with actual personality.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, cameraRig, speechBubble, barbell,
  vintageTelevision, gordonRamsayCaricature, radioactiveForklift, skinnerBoxRat,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 603.74;
export const S_END = 625.48;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(600, 440)">
      <rect x="-140" y="-60" width="280" height="120" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#38bdf8" text-anchor="middle">THE CHARACTER</text>
    </g>` +
    `<g transform="translate(1320, 440)">
      <rect x="-140" y="-60" width="280" height="120" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#22c55e" text-anchor="middle">THE ATHLETE</text>
    </g>` +
    host(960, 680, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 603.74, x: 960, y: 540, zoom: 1.15 },
  { at: 617.51, x: 960, y: 500, zoom: 1.35 },
  { at: 625.48, x: 960, y: 500, zoom: 1.37 },
]);

export const scene: AuthoredScene = {
  id: "act4-s53",
  start: S_START,
  end: S_END,
  intent: "Persona vs Person: audience confuses exaggerated character with actual personality.",
  renderWorld,
  camera: baseCamera,
};
