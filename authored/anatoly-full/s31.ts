/**
 * Scene 31 (813.99–841.51s): anatoly-s31-greys-anatomy
 * Don't Learn Fitness from Pranks: Learning lifting from Anatoly is like learning neurosurgery from Grey's Anatomy. Doctor scrubs and scalpel.
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

export const S_START = 813.99;
export const S_END = 841.51;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    drMike(1250, 650, t, { expression: "smug_rock_eyebrow" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1200, y: 550, zoom: 1.35 },
  { at: S_END, x: 1200, y: 550, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s31-greys-anatomy",
  start: S_START,
  end: S_END,
  intent: "Don't Learn Fitness from Pranks: Learning lifting from Anatoly is like learning neurosurgery from Grey's Anatomy. Doctor scrubs and scalpel.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
