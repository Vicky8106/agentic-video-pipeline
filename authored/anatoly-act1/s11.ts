/**
 * Act 1 Scene 11 (61.00–68.50s): act1-s11-fake-weights-debate
 * People started arguing about fake weights, fake reactions, staged videos. Split screen comment section cards, red question marks popping over weights.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, suit, drMike, scroller,
  dust, cursor, clickbaitArrow, dottedCircle, cameraRig, barbell,
  crewSil, verdictStage, contrastPanels, thumbFrame, card,
  mopBucket, thoughtBubble, speechBubble, egoGhost, battleshipAnchor,
  runningGymBro, drMikeCaricature, bedroom2AM, greenGrassDoor,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 61.00;
export const S_END = 68.50;

function renderWorld(t: number): string {
  const pulse = Math.sin((t - 61.0) * 6) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    contrastPanels(960, 420, 1.3) +
    barbell(960, 640, 1.3) +
    dottedCircle(960, 640, 100, pulse) +
    host(460, 652, t, { expression: "skeptical_side_eye", isTalking: true })
  );
}

const baseCamera = keyframedCamera([
  { at: 61.00, x: 960, y: 540, zoom: 1.15 },
  { at: 68.50, x: 960, y: 540, zoom: 1.25 }
]);

export const scene: AuthoredScene = {
  id: "act1-s11-fake-weights-debate",
  start: S_START,
  end: S_END,
  intent: "People started arguing about fake weights, fake reactions, staged videos. Split screen comment section cards, red question marks popping over weights.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
