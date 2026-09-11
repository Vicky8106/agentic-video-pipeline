/**
 * Act 3 Scene 42 (424.96–443.66s): act3-s42
 * The Thumbnail Formula: 900-point font EXPOSED, giant yellow circle, red arrow, terrified face.
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

export const S_START = 424.96;
export const S_END = 443.66;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    giantExposedThumbnail(960, 480) +
    host(420, 680, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 424.96, x: 960, y: 540, zoom: 1.15 },
  { at: 435.64, x: 960, y: 480, zoom: 1.45 },
  { at: 441.21, x: 960, y: 420, zoom: 1.85 },
  { at: 443.66, x: 960, y: 420, zoom: 1.87 },
]);

export const scene: AuthoredScene = {
  id: "act3-s42",
  start: S_START,
  end: S_END,
  intent: "The Thumbnail Formula: 900-point font EXPOSED, giant yellow circle, red arrow, terrified face.",
  renderWorld,
  camera: baseCamera,
};
