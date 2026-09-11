/**
 * Act 1 Scene 06 (25.80–29.50s): act1-s06-camera-zooms-in-destruction
 * Literal motivated camera jump cut: On 'The camera zooms in' (26.10s), an INSTANT 1-FRAME SNAP CUT straight into an extreme macro close-up (zoom: 1.95x) of the bodybuilder's face. His jaw is dragging on the floor, pupils tiny with existential dread.
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

export const S_START = 25.80;
export const S_END = 29.50;

function renderWorld(t: number): string {
  const shudder = Math.sin((t - 25.8) * 12) * 2;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    builder(1380 + shudder, 640, t, { expression: "shock_jaw_drop", scale: 1.7, spineLean: -8 })
  );
}

const baseCamera = keyframedCamera([
  { at: 25.80, x: 1380, y: 520, zoom: 1.95 },
  { at: 29.50, x: 1380, y: 520, zoom: 1.98 }
]);

export const scene: AuthoredScene = {
  id: "act1-s06-camera-zooms-in-destruction",
  start: S_START,
  end: S_END,
  intent: "Literal motivated camera jump cut: On 'The camera zooms in' (26.10s), an INSTANT 1-FRAME SNAP CUT straight into an extreme macro close-up (zoom: 1.95x) of the bodybuilder's face. His jaw is dragging on the floor, pupils tiny with existential dread.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
