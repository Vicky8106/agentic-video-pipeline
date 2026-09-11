/**
 * Act 2 Scene 15 (90.80–99.08s): act2-s15-real-vs-youtube
 * "How much of Anatoly is real? And how much of Anatoly is... YouTube?"
 * Host stands next to a mechanical balance scale comparing REAL vs YOUTUBE.
 * On "YouTube?" (97.48s), instant punch zoom into host's deadpan face.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, balanceScale, card,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 90.80;
export const S_END = 99.08;

function renderWorld(t: number): string {
  const tilt = t >= 95.0 ? Math.sin((t - 95.0) * 3) * 0.4 : 0;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    balanceScale(1300, 520, tilt) +
    host(640, 652, t, {
      expression: t < 97.48 ? "deadpan_classic" : "skeptical_side_eye",
      pointTarget: t >= 93.5 ? { x: 1300, y: 520 } : undefined,
      spineLean: t >= 97.48 ? -3 : 0,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 90.80, x: 960, y: 540, zoom: 1.15 },
  { at: 97.47, x: 960, y: 540, zoom: 1.18 },
  // Instant punch zoom on "YouTube?"
  { at: 97.48, x: 640, y: 480, zoom: 1.85 },
  { at: 99.08, x: 640, y: 480, zoom: 1.87 },
]);

export const scene: AuthoredScene = {
  id: "act2-s15-real-vs-youtube",
  start: S_START,
  end: S_END,
  intent: "Host questions how much of Anatoly is real vs YouTube using mechanical balance scale.",
  renderWorld,
  camera: baseCamera,
};
