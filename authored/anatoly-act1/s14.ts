/**
 * Act 1 Scene 14 (88.20–90.80s): act1-s14-brother-go-outside
 * Blinding cut from the dark room to stark daylight: Host stands in the doorway looking dead down the lens, kicking open the door to reveal rolling green grass and bright sunshine, pointing outside: 'Brother. That is a weight plate. Go outside.'
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

export const S_START = 88.20;
export const S_END = 90.80;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    greenGrassDoor(1280, 540, 1.0) +
    host(680, 652, t, { expression: "deadpan_classic", isTalking: true, pointTarget: { x: 1280, y: 500 } })
  );
}

const baseCamera = keyframedCamera([
  { at: 88.20, x: 960, y: 540, zoom: 1.28 },
  { at: 90.80, x: 960, y: 540, zoom: 1.30 }
]);

export const scene: AuthoredScene = {
  id: "act1-s14-brother-go-outside",
  start: S_START,
  end: S_END,
  intent: "Blinding cut from the dark room to stark daylight: Host stands in the doorway looking dead down the lens, kicking open the door to reveal rolling green grass and bright sunshine, pointing outside: 'Brother. That is a weight plate. Go outside.'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
