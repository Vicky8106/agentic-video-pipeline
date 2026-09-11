/**
 * Act 3 Scene 45 (469.45–480.31s): act3-s45
 * The Billboard analogy: Becoming famous for sneaking into houses, then putting your face on a highway billboard.
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

export const S_START = 469.45;
export const S_END = 480.31;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    billboardRig(960, 460) +
    host(440, 680, t, { expression: "deadpan_classic", pointTarget: { x: 960, y: 460 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 469.45, x: 960, y: 540, zoom: 1.15 },
  { at: 478.23, x: 960, y: 460, zoom: 1.65 },
  { at: 480.31, x: 960, y: 460, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act3-s45",
  start: S_START,
  end: S_END,
  intent: "The Billboard analogy: Becoming famous for sneaking into houses, then putting your face on a highway billboard.",
  renderWorld,
  camera: baseCamera,
};
