/**
 * Act 3 Scene 40 (391.11–406.00s): act3-s40
 * YouTube exaggeration: That is impressive vs That is physically impossible - two very different statements.
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

export const S_START = 391.11;
export const S_END = 406.00;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    `<g transform="translate(600, 440)">
      <rect x="-160" y="-60" width="320" height="120" rx="10" fill="#0f172a" stroke="#22c55e" stroke-width="4"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#22c55e" text-anchor="middle">THAT IS IMPRESSIVE</text>
    </g>` +
    `<g transform="translate(1320, 440)">
      <rect x="-180" y="-60" width="360" height="120" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="24" fill="#ef4444" text-anchor="middle">PHYSICALLY IMPOSSIBLE</text>
    </g>` +
    host(960, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 391.11, x: 960, y: 540, zoom: 1.15 },
  { at: 397.43, x: 1320, y: 440, zoom: 1.55 },
  { at: 406.00, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act3-s40",
  start: S_START,
  end: S_END,
  intent: "YouTube exaggeration: That is impressive vs That is physically impossible - two very different statements.",
  renderWorld,
  camera: baseCamera,
};
