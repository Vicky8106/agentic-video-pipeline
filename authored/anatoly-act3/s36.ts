/**
 * Act 3 Scene 36 (327.94–346.38s): act3-s36
 * 1995 time traveler dialogue: explaining hollow metal discs on the internet to a bewildered 90s guy.
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

export const S_START = 327.94;
export const S_END = 346.38;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    guy1995(620, 640, t) +
    host(1300, 652, t, { expression: "deadpan_classic", pointTarget: { x: 620, y: 540 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 327.94, x: 960, y: 540, zoom: 1.15 },
  { at: 335.67, x: 620, y: 540, zoom: 1.45 },
  { at: 340.01, x: 1300, y: 540, zoom: 1.45 },
  { at: 345.47, x: 620, y: 540, zoom: 1.70 },
  { at: 346.38, x: 620, y: 540, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act3-s36",
  start: S_START,
  end: S_END,
  intent: "1995 time traveler dialogue: explaining hollow metal discs on the internet to a bewildered 90s guy.",
  renderWorld,
  camera: baseCamera,
};
