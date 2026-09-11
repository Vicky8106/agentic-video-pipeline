/**
 * Scene 03 (52.88–86.45s): anatoly-s03-fake-weight-debate
 * The fake weights debate & Dr. Mike: Clinic stage. Dr. Mike enters with biomechanics clipboard, pointing at barbell leverage diagrams.
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

export const S_START = 52.88;
export const S_END = 86.45;

function renderWorld(t: number): string {
  const enterK = smooth(span(t, S_START + 3.0, S_START + 8.0));
  const docX = lerp(2100, 1260, enterK);
  return (
    renderBackground("BG-CLINIC", { timeSec: t }) +
    host(460, 652, t, { expression: "deadpan_classic", isTalking: t < S_START + 15 }) +
    drMike(docX, 650, t, { expression: "smug_rock_eyebrow", isTalking: t >= S_START + 15, pointTarget: { x: 800, y: 400 } }) +
    card(850, 480, 1.0, "#38bdf8")
  );
}

const baseCamera = keyframedCamera([
  { at: S_START, x: 960, y: 560, zoom: 1.1 },
  { at: S_START + 12, x: 1150, y: 550, zoom: 1.35 },
  { at: S_START + 24, x: 1200, y: 540, zoom: 1.55 },
  { at: S_END, x: 1200, y: 540, zoom: 1.58 }
]);

export const scene: AuthoredScene = {
  id: "anatoly-s03-fake-weight-debate",
  start: S_START,
  end: S_END,
  intent: "The fake weights debate & Dr. Mike: Clinic stage. Dr. Mike enters with biomechanics clipboard, pointing at barbell leverage diagrams.",
  renderWorld,
  camera: withPunch(baseCamera, S_START + 0.5, 0.2),
};
