/**
 * Scene 16 (420.73–446.46s): anatoly-s16-clickbait-formula
 * The Clickbait Formula: Giant glowing red arrow and red dotted circle pointing at Anatoly's face with shocked open-mouth expression.
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

export const S_START = 420.73;
export const S_END = 446.46;

function renderWorld(t: number): string {
  const pulse = Math.sin((t - S_START) * 5) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic" }) +
    janitor(1120, 652, t, { expression: "shock_jaw_drop" }) +
    clickbaitArrow(900, 440, 30, 1.3) +
    dottedCircle(1120, 540, 110, pulse)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.12 },
  { at: S_START + 12, x: 1100, y: 540, zoom: 1.45 },
  { at: S_END, x: 1100, y: 540, zoom: 1.48 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s16-clickbait-formula",
  start: S_START,
  end: S_END,
  intent: "The Clickbait Formula: Giant glowing red arrow and red dotted circle pointing at Anatoly's face with shocked open-mouth expression.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
