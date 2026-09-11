/**
 * Scene 04 (86.45–116.30s): anatoly-s04-touch-grass
 * 'Enhance! Brother, that is a weight plate. Go outside.' CSI style magnifying glass inspector examining iron collar. Host tells internet detectives to touch grass.
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

export const S_START = 86.45;
export const S_END = 116.30;

function renderWorld(t: number): string {
  const pulse = Math.sin((t - S_START) * 6) * 0.5 + 0.5;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(500, 652, t, { expression: "skeptical_side_eye", isTalking: true, pointTarget: { x: 1280, y: 540 } }) +
    barbell(1280, 620, 1.3) +
    dottedCircle(1280, 620, 90, pulse) +
    clickbaitArrow(1120, 480, 45, 1.1)
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.12 },
  { at: S_START + 10, x: 1080, y: 550, zoom: 1.4 },
  { at: S_START + 20, x: 1250, y: 540, zoom: 1.6 },
  { at: S_END, x: 1250, y: 540, zoom: 1.62 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s04-touch-grass",
  start: S_START,
  end: S_END,
  intent: "'Enhance! Brother, that is a weight plate. Go outside.' CSI style magnifying glass inspector examining iron collar. Host tells internet detectives to touch grass.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
