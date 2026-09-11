/**
 * Scene 02 (25.49–52.88s): anatoly-s02-mop-deadlift
 * Emotional destruction: Bodybuilder watches in horror as Anatoly one-hand deadlifts the barbell while mopping the floor. Snap zoom on bodybuilder jaw drop.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, suit, drMike, scroller,
  dust, cursor, clickbaitArrow, dottedCircle, cameraRig, barbell,
  crewSil, verdictStage, contrastPanels, thumbFrame, card,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 25.49;
export const S_END = 52.88;

function renderWorld(t: number): string {
  const liftK = smooth(span(t, S_START + 6.0, S_START + 10.0));
  const barY = lerp(660, 480, liftK);
  const shock = t >= S_START + 10;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(820, 652, t, { expression: "deadpan_classic", spineLean: -4, pointTarget: { x: 1380, y: 500 } }) +
    barbell(960, barY, 1.3) +
    dust(960, 680, liftK > 0 && liftK < 1 ? liftK : 0) +
    builder(1380, 650, t, { expression: shock ? "shock_jaw_drop" : "smug_rock_eyebrow", spineLean: shock ? -8 : 0 })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 1100, y: 560, zoom: 1.15 },
  { at: S_START + 8, x: 1250, y: 550, zoom: 1.45 },
  { at: S_START + 18, x: 1380, y: 540, zoom: 1.65 },
  { at: S_END, x: 1380, y: 540, zoom: 1.68 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s02-mop-deadlift",
  start: S_START,
  end: S_END,
  intent: "Emotional destruction: Bodybuilder watches in horror as Anatoly one-hand deadlifts the barbell while mopping the floor. Snap zoom on bodybuilder jaw drop.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
