/**
 * Scene 08 (197.63–225.03s): anatoly-s08-contrast-theory
 * The Contrast Theory: Split-screen contrast panels. The weak-looking janitor vs the muscle mountain. Contrast is what sells the click.
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

export const S_START = 197.63;
export const S_END = 225.03;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    contrastPanels(960, 420, 1.3) +
    janitor(560, 652, t, { expression: "deadpan_classic" }) +
    builder(1360, 650, t, { expression: "smug_rock_eyebrow", pose: "flexing" }) +
    host(960, 670, t, { expression: "deadpan_classic", isTalking: true })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 540, zoom: 1.05 },
  { at: S_START + 12, x: 960, y: 540, zoom: 1.25 },
  { at: S_END, x: 960, y: 540, zoom: 1.28 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s08-contrast-theory",
  start: S_START,
  end: S_END,
  intent: "The Contrast Theory: Split-screen contrast panels. The weak-looking janitor vs the muscle mountain. Contrast is what sells the click.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
