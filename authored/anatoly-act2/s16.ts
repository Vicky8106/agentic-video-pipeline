/**
 * Act 2 Scene 16 (99.08–107.87s): act2-s16-annoyingly-strong
 * Anatoly casually lifts a loaded barbell with one hand while holding tea,
 * looking completely bored while bodybuilder watches in disbelief.
 * On "Annoyingly strong" (106.83s), instant punch zoom into Anatoly's smug grin.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  janitor, builder, barbell,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 99.08;
export const S_END = 107.87;

function renderWorld(t: number): string {
  const liftY = 660 - Math.min(1, Math.max(0, (t - 102.0) * 1.5)) * 120;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Bodybuilder looking devastated and jealous
    builder(420, 640, t, {
      expression: "skeptical_side_eye",
      spineLean: -6,
    }) +
    // Loaded Barbell floating up easily
    barbell(1140, liftY, 1.4) +
    // Anatoly holding barbell easily with one hand
    janitor(1140, 652, t, {
      expression: t < 106.83 ? "deadpan_classic" : "smug_rock_eyebrow",
      rightHandProp: "none",
    }) +
    // Tea cup in Anatoly's hand
    `<g transform="translate(1080, 560)">
      <path d="M -12 -10 L 12 -10 L 8 15 L -8 15 Z" fill="#ffffff" stroke="#334155" stroke-width="2"/>
      <path d="M 8 -5 Q 16 -2 8 8" fill="none" stroke="#334155" stroke-width="2"/>
      <path d="M 0 -12 Q 5 -22 0 -30" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.6"/>
    </g>`
  );
}

const baseCamera = keyframedCamera([
  { at: 99.08, x: 960, y: 540, zoom: 1.15 },
  { at: 106.82, x: 960, y: 540, zoom: 1.25 },
  // Instant snap zoom on "Annoyingly strong."
  { at: 106.83, x: 1140, y: 480, zoom: 1.85 },
  { at: 107.87, x: 1140, y: 480, zoom: 1.88 },
]);

export const scene: AuthoredScene = {
  id: "act2-s16-annoyingly-strong",
  start: S_START,
  end: S_END,
  intent: "Anatoly casually lifts a loaded barbell with one hand while holding tea; bodybuilder gets furious.",
  renderWorld,
  camera: baseCamera,
};
