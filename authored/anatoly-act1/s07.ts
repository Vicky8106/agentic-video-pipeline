/**
 * Act 1 Scene 07 (29.50–35.40s): act1-s07-it-is-okay
 * Hard cut back to Anatoly standing completely frozen, deadpan, holding his mop, blinking once. On 34.33s, a tiny comic speech bubble pops: 'It is okay.'
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

export const S_START = 29.50;
export const S_END = 35.40;

function renderWorld(t: number): string {
  const speechPop = t >= 34.0;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(640, 640, 1.1) +
    janitor(780, 652, t, { expression: "deadpan_classic", isTalking: t >= 34.33 }) +
    (speechPop ? speechBubble(920, 440, "It is okay.", 1.15) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 29.50, x: 780, y: 550, zoom: 1.45 },
  { at: 34.33, x: 800, y: 540, zoom: 1.55 },
  { at: 35.40, x: 800, y: 540, zoom: 1.56 }
]);

export const scene: AuthoredScene = {
  id: "act1-s07-it-is-okay",
  start: S_START,
  end: S_END,
  intent: "Hard cut back to Anatoly standing completely frozen, deadpan, holding his mop, blinking once. On 34.33s, a tiny comic speech bubble pops: 'It is okay.'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
