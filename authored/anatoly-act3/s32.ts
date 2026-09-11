/**
 * Act 3 Scene 32 (273.95–286.62s): act3-s32
 * News anchor desk with BREAKING NEWS ticker: thumbnail screenshot taken out of context. This is journalism now.
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

export const S_START = 273.95;
export const S_END = 286.62;

function renderWorld(t: number): string {
  const isJournalism = t >= 284.66;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    newsDesk(960, 580) +
    host(960, 620, t, {
      clothes: "suit",
      expression: isJournalism ? "deadpan_classic" : "skeptical_side_eye",
    })
  );
}
const baseCamera = keyframedCamera([
  { at: 273.95, x: 960, y: 540, zoom: 1.15 },
  { at: 283.61, x: 960, y: 540, zoom: 1.25 },
  { at: 284.66, x: 960, y: 520, zoom: 1.65 },
  { at: 286.62, x: 960, y: 520, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act3-s32",
  start: S_START,
  end: S_END,
  intent: "News anchor desk with BREAKING NEWS ticker: thumbnail screenshot taken out of context. This is journalism now.",
  renderWorld,
  camera: baseCamera,
};
