/**
 * Act 4 Scene 58 (708.18–728.01s): act4-s58
 * The audience complicity: we click every time on SKINNY JANITOR DESTROYS 300KG GYM BRO.
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

export const S_START = 708.18;
export const S_END = 728.01;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 320)">
      <rect x="-300" y="-50" width="600" height="100" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="28" fill="#facc15" text-anchor="middle">SKINNY JANITOR DESTROYS 300KG GYM BRO</text>
    </g>` +
    host(960, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 708.18, x: 960, y: 540, zoom: 1.15 },
  { at: 720.67, x: 960, y: 340, zoom: 1.65 },
  { at: 728.01, x: 960, y: 340, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act4-s58",
  start: S_START,
  end: S_END,
  intent: "The audience complicity: we click every time on SKINNY JANITOR DESTROYS 300KG GYM BRO.",
  renderWorld,
  camera: baseCamera,
};
