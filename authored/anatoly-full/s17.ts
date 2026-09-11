/**
 * Scene 17 (446.46–474.73s): anatoly-s17-fame-ruins-prank
 * Fame ruins the prank: Anatoly walks in, and everyone in the gym immediately pulls out their phones screaming 'ARE YOU ANATOLY?!'
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

export const S_START = 446.46;
export const S_END = 474.73;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    janitor(780, 652, t, { expression: "smug_rock_eyebrow" }) +
    scroller(1220, 650, t, { expression: "shock_eye_pop", pointTarget: { x: 780, y: 520 } }) +
    scroller(1480, 650, t, { expression: "shock_eye_pop", pointTarget: { x: 780, y: 520 } })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 800, y: 560, zoom: 1.35 },
  { at: S_END, x: 800, y: 560, zoom: 1.38 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s17-fame-ruins-prank",
  start: S_START,
  end: S_END,
  intent: "Fame ruins the prank: Anatoly walks in, and everyone in the gym immediately pulls out their phones screaming 'ARE YOU ANATOLY?!'",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
