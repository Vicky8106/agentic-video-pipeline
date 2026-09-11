/**
 * Scene 11 (277.95–307.86s): anatoly-s11-athleanx-callback
 * Athlean-X Jeff Cavaliere callback: The iconic fake weight controversy where styrofoam plates bounced. Chalkboard anatomy.
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

export const S_START = 277.95;
export const S_END = 307.86;

function renderWorld(t: number): string {
  const bounce = Math.abs(Math.sin((t - S_START) * 4)) * 40;
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(500, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(900, 480, 1.1, "#f59e0b") +
    barbell(1300, 640 - bounce, 1.2)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.05 },
  { at: S_START + 14, x: 1250, y: 550, zoom: 1.35 },
  { at: S_END, x: 1250, y: 550, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s11-athleanx-callback",
  start: S_START,
  end: S_END,
  intent: "Athlean-X Jeff Cavaliere callback: The iconic fake weight controversy where styrofoam plates bounced. Chalkboard anatomy.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
