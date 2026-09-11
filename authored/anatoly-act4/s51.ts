/**
 * Act 4 Scene 51 (571.72–594.42s): act4-s51
 * The illusion worked: arguing over reality means marketing success.
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

export const S_START = 571.72;
export const S_END = 594.42;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 320)">
      <rect x="-240" y="-50" width="480" height="100" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="6"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="36" fill="#38bdf8" text-anchor="middle">THE ILLUSION WORKED</text>
    </g>` +
    janitor(960, 652, t, { expression: "smug_rock_eyebrow" })
  );
}
const baseCamera = keyframedCamera([
  { at: 571.72, x: 960, y: 540, zoom: 1.15 },
  { at: 591.88, x: 960, y: 480, zoom: 1.60 },
  { at: 594.42, x: 960, y: 480, zoom: 1.62 },
]);

export const scene: AuthoredScene = {
  id: "act4-s51",
  start: S_START,
  end: S_END,
  intent: "The illusion worked: arguing over reality means marketing success.",
  renderWorld,
  camera: baseCamera,
};
