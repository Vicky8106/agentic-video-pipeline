/**
 * Act 1 Scene 01 (0.00–7.40s): act1-s01-skinny-guy-walkin
 * Premise setup: Host in stark void introduces the weird YouTube genre. On 'walks into a gym' (4.16s), hard cut to gym doors opening as skinny Anatoly enters pushing his yellow mop bucket.
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

export const S_START = 0.00;
export const S_END = 7.40;

function renderWorld(t: number): string {
  const inGym = t >= 4.16;
  if (!inGym) {
    return (
      renderBackground("BG-STUDIO", { timeSec: t }) +
      host(960, 652, t, { expression: "deadpan_classic", isTalking: true })
    );
  }
  const walkK = smooth(span(t, 4.16, 7.40));
  const janX = lerp(-120, 620, walkK);
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    mopBucket(janX - 90, 640, 1.1) +
    janitor(janX, 652, t, { isWalking: walkK < 1, expression: "deadpan_classic" }) +
    builder(1450, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" })
  );
}

const baseCamera = keyframedCamera([
  { at: 0.00, x: 960, y: 540, zoom: 1.05 },
  { at: 4.16, x: 620, y: 550, zoom: 1.15 },
  { at: 7.40, x: 740, y: 550, zoom: 1.20 }
]);

export const scene: AuthoredScene = {
  id: "act1-s01-skinny-guy-walkin",
  start: S_START,
  end: S_END,
  intent: "Premise setup: Host in stark void introduces the weird YouTube genre. On 'walks into a gym' (4.16s), hard cut to gym doors opening as skinny Anatoly enters pushing his yellow mop bucket.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
