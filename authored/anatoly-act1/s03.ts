/**
 * Act 1 Scene 03 (13.00–17.00s): act1-s03-can-i-try
 * Anatoly invades the personal space of the towering 300lb bodybuilder. On 'Can I try?' (15.96s), a comic speech bubble pops over Anatoly. Low-angle dramatic look up at the mountain of muscle.
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

export const S_START = 13.00;
export const S_END = 17.00;

function renderWorld(t: number): string {
  const approachK = smooth(span(t, 13.0, 15.2));
  const janX = lerp(650, 880, approachK);
  const speechPop = t >= 15.8;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(janX, 652, t, { isWalking: approachK < 1, expression: "deadpan_classic", spineLean: -6 }) +
    builder(1360, 640, t, { expression: "smug_rock_eyebrow", scale: 1.6 }) +
    barbell(1120, 660, 1.3) +
    (speechPop ? speechBubble(janX + 40, 420, "Can I try?", 1.1) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 13.00, x: 1050, y: 540, zoom: 1.25 },
  { at: 15.96, x: 1150, y: 510, zoom: 1.48 },
  { at: 17.00, x: 1150, y: 510, zoom: 1.50 }
]);

export const scene: AuthoredScene = {
  id: "act1-s03-can-i-try",
  start: S_START,
  end: S_END,
  intent: "Anatoly invades the personal space of the towering 300lb bodybuilder. On 'Can I try?' (15.96s), a comic speech bubble pops over Anatoly. Low-angle dramatic look up at the mountain of muscle.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
