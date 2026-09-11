/**
 * Act 1 Scene 13 (87.00–88.20s): act1-s13-enhance-macro
 * Instant macro punch cut on 'Enhance.' Extreme close-up of the pixel grid reflection in the detective glasses.
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

export const S_START = 87.00;
export const S_END = 88.20;

function renderWorld(t: number): string {
  return (
    bedroom2AM(960, 540, t) +
    speechBubble(960, 420, "Enhance.", 1.2)
  );
}

const baseCamera = keyframedCamera([
  { at: 87.00, x: 960, y: 515, zoom: 1.95 },
  { at: 88.20, x: 960, y: 515, zoom: 1.98 }
]);

export const scene: AuthoredScene = {
  id: "act1-s13-enhance-macro",
  start: S_START,
  end: S_END,
  intent: "Instant macro punch cut on 'Enhance.' Extreme close-up of the pixel grid reflection in the detective glasses.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
