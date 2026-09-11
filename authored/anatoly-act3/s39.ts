/**
 * Act 3 Scene 39 (374.88–391.11s): act3-s39
 * Dr. Mike Israetel analysis: Technique, range of motion, biomechanics moment arms vs what the video proves.
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

export const S_START = 374.88;
export const S_END = 391.11;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    drMikeCaricature(600, 640, t) +
    barbell(1200, 660, 1.4) +
    janitor(1200, 652, t, { expression: "deadpan_classic" })
  );
}
const baseCamera = keyframedCamera([
  { at: 374.88, x: 960, y: 540, zoom: 1.15 },
  { at: 381.94, x: 600, y: 540, zoom: 1.40 },
  { at: 387.13, x: 1200, y: 540, zoom: 1.40 },
  { at: 391.11, x: 960, y: 540, zoom: 1.25 },
]);

export const scene: AuthoredScene = {
  id: "act3-s39",
  start: S_START,
  end: S_END,
  intent: "Dr. Mike Israetel analysis: Technique, range of motion, biomechanics moment arms vs what the video proves.",
  renderWorld,
  camera: baseCamera,
};
