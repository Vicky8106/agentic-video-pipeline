/**
 * Act 1 Scene 04 (17.00–20.20s): act1-s04-bodybuilder-laughs
 * The bodybuilder throws his head back laughing with mouth wide open. Anatoly casually steps up to the bar loaded with 6 iron plates on each side, mop still held in his left hand.
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

export const S_START = 17.00;
export const S_END = 20.20;

function renderWorld(t: number): string {
  const laugh = Math.sin((t - 17.0) * 8) * 6;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    builder(1360, 640 + laugh, t, { expression: "smug_chuckle", scale: 1.6, spineLean: -8 }) +
    janitor(840, 652, t, { expression: "deadpan_classic", spineLean: 6, pointTarget: { x: 1040, y: 640 } }) +
    barbell(1040, 660, 1.4)
  );
}

const baseCamera = keyframedCamera([
  { at: 17.00, x: 960, y: 540, zoom: 1.25 },
  { at: 20.20, x: 980, y: 540, zoom: 1.30 }
]);

export const scene: AuthoredScene = {
  id: "act1-s04-bodybuilder-laughs",
  start: S_START,
  end: S_END,
  intent: "The bodybuilder throws his head back laughing with mouth wide open. Anatoly casually steps up to the bar loaded with 6 iron plates on each side, mop still held in his left hand.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
