/**
 * Act 4 Scene 56 (662.91–682.55s): act4-s56
 * Misdirection without fake weights: show the lift, cut the failed attempt, cut the setup.
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

export const S_START = 662.91;
export const S_END = 682.55;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(600, 440)">
      <rect x="-140" y="-50" width="280" height="100" rx="10" fill="#15803d"/>
      <text x="0" y="14" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">SHOW THE LIFT</text>
    </g>` +
    `<g transform="translate(1320, 440)">
      <rect x="-140" y="-50" width="280" height="100" rx="10" fill="#b91c1c"/>
      <text x="0" y="14" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">CUT THE SETUP</text>
    </g>` +
    host(960, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 662.91, x: 960, y: 540, zoom: 1.15 },
  { at: 678.70, x: 600, y: 440, zoom: 1.45 },
  { at: 682.55, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act4-s56",
  start: S_START,
  end: S_END,
  intent: "Misdirection without fake weights: show the lift, cut the failed attempt, cut the setup.",
  renderWorld,
  camera: baseCamera,
};
