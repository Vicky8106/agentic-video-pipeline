/**
 * Scene 24 (630.84–657.97s): anatoly-s24-radioactive-forklift
 * Gordon Ramsay cooking metaphor & Radioactive Forklift: He is not accidentally strong; he is lifting your mortgage. Radioactive forklift glowing.
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

export const S_START = 630.84;
export const S_END = 657.97;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    host(480, 652, t, { expression: "deadpan_classic", isTalking: true }) +
    barbell(1280, 520, 1.4) +
    janitor(1180, 652, t, { expression: "smug_rock_eyebrow" })
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1250, y: 550, zoom: 1.4 },
  { at: S_END, x: 1250, y: 550, zoom: 1.42 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s24-radioactive-forklift",
  start: S_START,
  end: S_END,
  intent: "Gordon Ramsay cooking metaphor & Radioactive Forklift: He is not accidentally strong; he is lifting your mortgage. Radioactive forklift glowing.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
