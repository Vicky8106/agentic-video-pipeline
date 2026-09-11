/**
 * Act 3 Scene 41 (406.00–424.96s): act3-s41
 * Binary brain trap: Audience demands REAL or FAKE. Reality is annoying: genuinely strong + produced show.
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

export const S_START = 406.00;
export const S_END = 424.96;

function renderWorld(t: number): string {
  const flip = Math.sin(t * 4) > 0;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(960, 360)">
      <rect x="-180" y="-50" width="360" height="100" rx="12" fill="${flip ? "#22c55e" : "#ef4444"}"/>
      <text x="0" y="20" font-family="'Impact', sans-serif" font-size="56" fill="#ffffff" text-anchor="middle">${flip ? "REAL" : "FAKE"}</text>
    </g>` +
    host(960, 680, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 406.00, x: 960, y: 540, zoom: 1.15 },
  { at: 410.49, x: 960, y: 400, zoom: 1.65 },
  { at: 424.96, x: 960, y: 540, zoom: 1.20 },
]);

export const scene: AuthoredScene = {
  id: "act3-s41",
  start: S_START,
  end: S_END,
  intent: "Binary brain trap: Audience demands REAL or FAKE. Reality is annoying: genuinely strong + produced show.",
  renderWorld,
  camera: baseCamera,
};
