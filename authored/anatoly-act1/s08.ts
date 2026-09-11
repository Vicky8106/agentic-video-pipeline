/**
 * Act 1 Scene 08 (35.40–41.00s): act1-s08-personality-lifted-ego-ghost
 * Hard cut to Host in studio on left: 'No. It is not okay.' On right: The bodybuilder is slumped over, while his translucent white ego ghost floats upward toward the ceiling with a golden angel halo.
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

export const S_START = 35.40;
export const S_END = 41.00;

function renderWorld(t: number): string {
  const ghostK = smooth(span(t, 36.5, 41.0));
  const ghostY = lerp(620, 240, ghostK);
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(460, 652, t, { expression: "skeptical_side_eye", isTalking: true, pointTarget: { x: 1320, y: 480 } }) +
    builder(1360, 680, t, { expression: "defeated_face_down", scale: 1.4, spineLean: -18 }) +
    egoGhost(1360, ghostY, t)
  );
}

const baseCamera = keyframedCamera([
  { at: 35.40, x: 960, y: 540, zoom: 1.25 },
  { at: 38.00, x: 960, y: 520, zoom: 1.30 },
  { at: 41.00, x: 960, y: 510, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "act1-s08-personality-lifted-ego-ghost",
  start: S_START,
  end: S_END,
  intent: "Hard cut to Host in studio on left: 'No. It is not okay.' On right: The bodybuilder is slumped over, while his translucent white ego ghost floats upward toward the ceiling with a golden angel halo.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
