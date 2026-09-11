/**
 * Act 3 Scene 34 (302.26–312.69s): act3-s34
 * Fingerprint dusting on weight plate with forensic brush and UV light.
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

export const S_START = 302.26;
export const S_END = 312.69;

function renderWorld(t: number): string {
  const dustK = Math.min(1, Math.max(0, (t - 308.0) * 1.5));
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    forensicBrush(960, 520, dustK) +
    host(540, 652, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 520 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 302.26, x: 960, y: 540, zoom: 1.20 },
  { at: 308.48, x: 960, y: 520, zoom: 1.65 },
  { at: 312.69, x: 960, y: 520, zoom: 1.68 },
]);

export const scene: AuthoredScene = {
  id: "act3-s34",
  start: S_START,
  end: S_END,
  intent: "Fingerprint dusting on weight plate with forensic brush and UV light.",
  renderWorld,
  camera: baseCamera,
};
