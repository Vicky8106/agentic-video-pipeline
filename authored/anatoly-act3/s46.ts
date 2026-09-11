/**
 * Act 3 Scene 46 (480.31–497.32s): act3-s46
 * The Law of YouTube: Success destroys the conditions that created success.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, suit, drMike, barbell, dust, clickbaitArrow,
  newsDesk, forensicBrush, guy1995, wizardFigure, giantExposedThumbnail, billboardRig,
  drMikeCaricature, speechBubble,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 480.31;
export const S_END = 497.32;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 320)">
      <rect x="-240" y="-50" width="480" height="100" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="34" fill="#facc15" text-anchor="middle">SUCCESS DESTROYS CONDITIONS</text>
    </g>` +
    host(960, 680, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 480.31, x: 960, y: 540, zoom: 1.15 },
  { at: 491.86, x: 960, y: 440, zoom: 1.55 },
  { at: 497.32, x: 960, y: 440, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act3-s46",
  start: S_START,
  end: S_END,
  intent: "The Law of YouTube: Success destroys the conditions that created success.",
  renderWorld,
  camera: baseCamera,
};
