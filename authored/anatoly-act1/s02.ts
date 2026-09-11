/**
 * Act 1 Scene 02 (7.40–13.00s): act1-s02-cleaning-supplies
 * Anatoly pauses with his mop. On 'cleaning supplies' (10.67s), a thought bubble pops over his head with a doodle of a bleach spray bottle, sponge, and question mark. Deadpan innocent head tilt.
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

export const S_START = 7.40;
export const S_END = 13.00;

function renderWorld(t: number): string {
  const bubblePop = t >= 10.67;
  const popK = smooth(span(t, 10.67, 11.2));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(530, 640, 1.1) +
    janitor(650, 652, t, { expression: "deadpan_classic", spineLean: bubblePop ? 4 : 0 }) +
    (bubblePop ? thoughtBubble(760, 360, popK * 1.2) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 7.40, x: 700, y: 540, zoom: 1.30 },
  { at: 10.67, x: 720, y: 520, zoom: 1.45 },
  { at: 13.00, x: 720, y: 520, zoom: 1.48 }
]);

export const scene: AuthoredScene = {
  id: "act1-s02-cleaning-supplies",
  start: S_START,
  end: S_END,
  intent: "Anatoly pauses with his mop. On 'cleaning supplies' (10.67s), a thought bubble pops over his head with a doodle of a bleach spray bottle, sponge, and question mark. Deadpan innocent head tilt.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
