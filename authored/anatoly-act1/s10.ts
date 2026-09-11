/**
 * Act 1 Scene 10 (53.00–61.00s): act1-s10-dr-mike-controversy
 * Dr. Mike Israetel analysis: Dr. Mike caricature in black RP polo pointing a red biomechanics moment-arm vector at Anatoly. On 'caused a controversy' (59.74s), cartoon red lightning bolt strikes between them.
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

export const S_START = 53.00;
export const S_END = 61.00;

function renderWorld(t: number): string {
  const lightning = t >= 59.5;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    drMikeCaricature(520, 640, t) +
    janitor(1360, 652, t, { expression: "deadpan_classic" }) +
    barbell(1180, 660, 1.3) +
    (lightning ? `<line x1="960" y1="0" x2="960" y2="700" stroke="#ef4444" stroke-width="12" stroke-dasharray="20 15"/>` : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 53.00, x: 960, y: 540, zoom: 1.22 },
  { at: 59.74, x: 960, y: 540, zoom: 1.42 },
  { at: 61.00, x: 960, y: 540, zoom: 1.44 }
]);

export const scene: AuthoredScene = {
  id: "act1-s10-dr-mike-controversy",
  start: S_START,
  end: S_END,
  intent: "Dr. Mike Israetel analysis: Dr. Mike caricature in black RP polo pointing a red biomechanics moment-arm vector at Anatoly. On 'caused a controversy' (59.74s), cartoon red lightning bolt strikes between them.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
