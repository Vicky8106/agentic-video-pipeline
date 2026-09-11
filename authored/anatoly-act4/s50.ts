/**
 * Act 4 Scene 50 (553.59–571.72s): act4-s50
 * Staged setup with genuine surprise: how reality TV, talk shows, and sports docs work.
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

export const S_START = 553.59;
export const S_END = 571.72;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 320)">
      <rect x="-220" y="-40" width="440" height="80" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
      <text x="0" y="14" font-family="'Impact', sans-serif" font-size="28" fill="#facc15" text-anchor="middle">ARRANGED SETUP != FAKE</text>
    </g>` +
    host(960, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 553.59, x: 960, y: 540, zoom: 1.15 },
  { at: 566.94, x: 960, y: 460, zoom: 1.45 },
  { at: 571.72, x: 960, y: 460, zoom: 1.47 },
]);

export const scene: AuthoredScene = {
  id: "act4-s50",
  start: S_START,
  end: S_END,
  intent: "Staged setup with genuine surprise: how reality TV, talk shows, and sports docs work.",
  renderWorld,
  camera: baseCamera,
};
