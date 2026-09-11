/**
 * Scene 15 (386.58–420.73s): anatoly-s15-nuance-vs-drama
 * Nuance vs Drama: People don't want nuanced physics equations, they want fireworks, drama, and shouting. Scale of nuance tipping.
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

export const S_START = 386.58;
export const S_END = 420.73;

function renderWorld(t: number): string {
  const tip = smooth(span(t, S_START + 8, S_START + 14));
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    host(960, 652, t, { expression: "skeptical_side_eye", isTalking: true }) +
    contrastPanels(500, 480, 1.2) +
    card(1420, 480, 1.1, "#ef4444")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 15, x: 960, y: 560, zoom: 1.25 },
  { at: S_END, x: 960, y: 560, zoom: 1.28 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s15-nuance-vs-drama",
  start: S_START,
  end: S_END,
  intent: "Nuance vs Drama: People don't want nuanced physics equations, they want fireworks, drama, and shouting. Scale of nuance tipping.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
