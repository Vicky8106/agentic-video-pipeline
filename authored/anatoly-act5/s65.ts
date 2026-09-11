/**
 * Act 5 Scene 65 (829.49–853.46s): act5-s65
 * Learning surgery from Grey's Anatomy analogy: technically there are doctors, there is still a problem.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, builder, barbell,
  executiveDesk, callSheetClipboard, cinemaSeats, operatingRoom,
} from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 829.49;
export const S_END = 853.46;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    operatingRoom(960, 520) +
    host(440, 680, t, { expression: "skeptical_side_eye", pointTarget: { x: 960, y: 520 } })
  );
}
const baseCamera = keyframedCamera([
  { at: 829.49, x: 960, y: 540, zoom: 1.15 },
  { at: 843.21, x: 960, y: 480, zoom: 1.55 },
  { at: 853.46, x: 960, y: 480, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act5-s65",
  start: S_START,
  end: S_END,
  intent: "Learning surgery from Grey's Anatomy analogy: technically there are doctors, there is still a problem.",
  renderWorld,
  camera: baseCamera,
};
