/**
 * Act 4 Scene 52 (594.42–603.74s): act4-s52
 * That is not a failure. That is MARKETING. Gold coin shower.
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

export const S_START = 594.42;
export const S_END = 603.74;

function renderWorld(t: number): string {
  const coinY = Math.sin(t * 8) * 20;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 260)">
      <text x="0" y="20" font-family="'Impact', sans-serif" font-size="64" fill="#facc15" text-anchor="middle">MARKETING</text>
      <circle cx="-160" cy="${coinY.toFixed(1)}" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
      <circle cx="160" cy="${(-coinY).toFixed(1)}" r="18" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
    </g>` +
    janitor(960, 652, t, { expression: "smug_rock_eyebrow" })
  );
}
const baseCamera = keyframedCamera([
  { at: 594.42, x: 960, y: 540, zoom: 1.15 },
  { at: 602.46, x: 960, y: 440, zoom: 1.75 },
  { at: 603.74, x: 960, y: 440, zoom: 1.77 },
]);

export const scene: AuthoredScene = {
  id: "act4-s52",
  start: S_START,
  end: S_END,
  intent: "That is not a failure. That is MARKETING. Gold coin shower.",
  renderWorld,
  camera: baseCamera,
};
