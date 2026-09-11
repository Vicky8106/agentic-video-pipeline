/**
 * Act 3 Scene 35 (312.69–327.94s): act3-s35
 * Jeff lifts real weights in response: debating credibility based on whether a metal disc is hollow.
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

export const S_START = 312.69;
export const S_END = 327.94;

function renderWorld(t: number): string {
  const lift = Math.min(1, Math.max(0, (t - 315.0) * 1.5));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    barbell(960, 660 - lift * 120, 1.4) +
    builder(960, 652, t, { expression: lift > 0 ? "smug_rock_eyebrow" : "deadpan_classic" }) +
    host(460, 652, t, { expression: "skeptical_side_eye" })
  );
}
const baseCamera = keyframedCamera([
  { at: 312.69, x: 960, y: 540, zoom: 1.15 },
  { at: 324.30, x: 960, y: 540, zoom: 1.30 },
  { at: 327.34, x: 960, y: 540, zoom: 1.32 },
  { at: 327.94, x: 960, y: 540, zoom: 1.33 },
]);

export const scene: AuthoredScene = {
  id: "act3-s35",
  start: S_START,
  end: S_END,
  intent: "Jeff lifts real weights in response: debating credibility based on whether a metal disc is hollow.",
  renderWorld,
  camera: baseCamera,
};
