/**
 * Act 1 Scene 05 (20.20–25.80s): act1-s05-the-anchor-deadlift
 * Anatoly casually pulls the bar off the floor with ONE hand while resting on his mop. On 'anchor a small ship' (22.77s), a giant cartoon battleship anchor slams down behind the barbell with a dust shockwave. On 'Everyone starts screaming' (24.0s), a gym bro runs across the background clutching his head in panic.
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

export const S_START = 20.20;
export const S_END = 25.80;

function renderWorld(t: number): string {
  const liftK = smooth(span(t, 20.5, 22.0));
  const barY = lerp(660, 480, liftK);
  const anchorDrop = smooth(span(t, 22.2, 22.77));
  const anchorLanded = t >= 22.77;
  const screamBroX = lerp(-150, 2100, span(t, 23.8, 25.8));
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    (anchorDrop > 0 ? battleshipAnchor(1040, 520, 1.3, anchorDrop) : ``) +
    dust(1040, 680, anchorLanded ? Math.sin(Math.PI * span(t, 22.77, 23.6)) : 0) +
    barbell(1040, barY, 1.4) +
    janitor(800, 652, t, { expression: "deadpan_classic", spineLean: -4 }) +
    builder(1420, 640, t, { expression: "shock_jaw_drop", scale: 1.6, spineLean: -12 }) +
    (t >= 23.8 ? runningGymBro(screamBroX, 580, t, 1) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 20.20, x: 960, y: 540, zoom: 1.25 },
  { at: 22.77, x: 960, y: 555, zoom: 1.15 },
  { at: 24.00, x: 960, y: 540, zoom: 1.10 },
  { at: 25.80, x: 960, y: 540, zoom: 1.12 }
]);

export const scene: AuthoredScene = {
  id: "act1-s05-the-anchor-deadlift",
  start: S_START,
  end: S_END,
  intent: "Anatoly casually pulls the bar off the floor with ONE hand while resting on his mop. On 'anchor a small ship' (22.77s), a giant cartoon battleship anchor slams down behind the barbell with a dust shockwave. On 'Everyone starts screaming' (24.0s), a gym bro runs across the background clutching his head in panic.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.3, 0.15),
};
