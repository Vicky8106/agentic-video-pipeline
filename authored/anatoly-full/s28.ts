/**
 * Scene 28 (735.61–760.03s): anatoly-s28-views-counter
 * YOU WILL NOT BELIEVE WHAT HAPPENS NEXT: Millions of views counter spinning upwards rapidly like a slot machine.
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

export const S_START = 735.61;
export const S_END = 760.03;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-HOLLYWOOD", { timeSec: t }) +
    host(960, 652, t, { expression: "smug_rock_eyebrow", isTalking: true }) +
    card(520, 460, 1.1, "#f59e0b") +
    card(1400, 460, 1.1, "#10b981")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.08 },
  { at: S_START + 10, x: 960, y: 560, zoom: 1.3 },
  { at: S_END, x: 960, y: 560, zoom: 1.32 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s28-views-counter",
  start: S_START,
  end: S_END,
  intent: "YOU WILL NOT BELIEVE WHAT HAPPENS NEXT: Millions of views counter spinning upwards rapidly like a slot machine.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
