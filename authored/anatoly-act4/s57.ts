/**
 * Act 4 Scene 57 (682.55–708.18s): act4-s57
 * Power of editing: ten-second clip contains no lies, still gives completely different story.
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

export const S_START = 682.55;
export const S_END = 708.18;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 320)">
      <rect x="-240" y="-50" width="480" height="100" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="6"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="36" fill="#38bdf8" text-anchor="middle">THE POWER OF EDITING</text>
    </g>` +
    host(960, 680, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 682.55, x: 960, y: 540, zoom: 1.15 },
  { at: 698.13, x: 960, y: 480, zoom: 1.50 },
  { at: 708.18, x: 960, y: 480, zoom: 1.52 },
]);

export const scene: AuthoredScene = {
  id: "act4-s57",
  start: S_START,
  end: S_END,
  intent: "Power of editing: ten-second clip contains no lies, still gives completely different story.",
  renderWorld,
  camera: baseCamera,
};
