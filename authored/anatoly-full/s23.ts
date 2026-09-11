/**
 * Scene 23 (603.46–630.84s): anatoly-s23-archetype-character
 * The Archetype: Anatoly transitioned from person to mythical folklore hero. The clueless janitor with Hercules strength.
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

export const S_START = 603.46;
export const S_END = 630.84;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    janitor(1150, 652, t, { expression: "smug_rock_eyebrow", spineLean: 4 })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 12, x: 1100, y: 550, zoom: 1.3 },
  { at: S_END, x: 1100, y: 550, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s23-archetype-character",
  start: S_START,
  end: S_END,
  intent: "The Archetype: Anatoly transitioned from person to mythical folklore hero. The clueless janitor with Hercules strength.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
