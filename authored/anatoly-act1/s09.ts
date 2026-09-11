/**
 * Act 1 Scene 09 (41.00–53.00s): act1-s09-successful-janitor-in-history
 * 41-47s: YouTube 50M-view thumbnail mockup with clickbait frame. 47-53s: Cut to Anatoly standing atop a Roman marble pedestal holding his golden mop like Neptune's trident, while dollar bills rain down from the sky.
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

export const S_START = 41.00;
export const S_END = 53.00;

function renderWorld(t: number): string {
  const isPedestal = t >= 47.0;
  if (!isPedestal) {
    return (
      renderBackground("BG-STUDIO", { timeSec: t }) +
      host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
      thumbFrame(1250, 440, 1.4) +
      janitor(1250, 652, t, { expression: "smug_rock_eyebrow" })
    );
  }
  const billY = ((t * 220) % 700) - 200;
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    card(960, 640, 1.6, "#eab308") +
    janitor(960, 520, t, { expression: "smug_rock_eyebrow", scale: 1.35, rightHandProp: "mop" }) +
    card(500, billY, 0.5, "#22c55e") +
    card(1420, (billY + 300) % 700 - 200, 0.5, "#22c55e")
  );
}

const baseCamera = keyframedCamera([
  { at: 41.00, x: 960, y: 540, zoom: 1.10 },
  { at: 47.12, x: 960, y: 510, zoom: 1.35 },
  { at: 53.00, x: 960, y: 500, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "act1-s09-successful-janitor-in-history",
  start: S_START,
  end: S_END,
  intent: "41-47s: YouTube 50M-view thumbnail mockup with clickbait frame. 47-53s: Cut to Anatoly standing atop a Roman marble pedestal holding his golden mop like Neptune's trident, while dollar bills rain down from the sky.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
