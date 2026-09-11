/**
 * Act 3 Scene 43 (443.66–457.35s): act3-s43
 * YouTube Fame Paradox: Anatoly character requires anonymity, but he became world-famous.
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

export const S_START = 443.66;
export const S_END = 457.35;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    janitor(960, 652, t, { expression: "deadpan_classic" }) +
    `<g transform="translate(960, 240)">
      <circle cx="0" cy="0" r="45" fill="#facc15"/>
      <text x="0" y="16" font-family="'Impact', sans-serif" font-size="48" fill="#0f172a" text-anchor="middle">?</text>
    </g>` +
    host(460, 652, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 443.66, x: 960, y: 540, zoom: 1.15 },
  { at: 454.87, x: 960, y: 480, zoom: 1.55 },
  { at: 457.35, x: 960, y: 480, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act3-s43",
  start: S_START,
  end: S_END,
  intent: "YouTube Fame Paradox: Anatoly character requires anonymity, but he became world-famous.",
  renderWorld,
  camera: baseCamera,
};
