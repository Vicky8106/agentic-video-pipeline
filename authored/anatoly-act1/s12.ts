/**
 * Act 1 Scene 12 (68.50–87.00s): act1-s12-detective-2am-bedroom
 * Dark bedroom at 2:00 AM: Some guy sitting at home at 2 AM zoomed into a 480p video trying to determine whether a circular piece of metal has the correct circumference. Glowing monitor, red clock 02:03, digital caliper measuring blurry plate.
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

export const S_START = 68.50;
export const S_END = 87.00;

function renderWorld(t: number): string {
  return (
    bedroom2AM(960, 540, t) +
    host(380, 652, t, { expression: "deadpan_classic", isTalking: true })
  );
}

const baseCamera = keyframedCamera([
  { at: 68.50, x: 960, y: 540, zoom: 1.15 },
  { at: 78.00, x: 960, y: 530, zoom: 1.32 },
  { at: 87.00, x: 960, y: 515, zoom: 1.45 }
]);

export const scene: AuthoredScene = {
  id: "act1-s12-detective-2am-bedroom",
  start: S_START,
  end: S_END,
  intent: "Dark bedroom at 2:00 AM: Some guy sitting at home at 2 AM zoomed into a 480p video trying to determine whether a circular piece of metal has the correct circumference. Glowing monitor, red clock 02:03, digital caliper measuring blurry plate.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
