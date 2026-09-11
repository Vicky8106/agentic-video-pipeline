/**
 * Act 2 Scene 23 (163.79–175.46s): act2-s23-the-formula
 * "The storyline: always a skinny guy, always a very large guy, always a very large weight...
 * and somehow, always a satisfying ending."
 * Lineup: Skinny Anatoly, 6-plate Barbell, Hulking Bodybuilder. Confetti shower on satisfying ending.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  janitor, builder, barbell,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 163.79;
export const S_END = 175.46;

function renderWorld(t: number): string {
  const showConfetti = t >= 172.09;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    // Skinny Guy: Anatoly on left
    janitor(480, 652, t, {
      expression: "deadpan_classic",
      scale: 1.1,
    }) +
    // Massive Barbell in center
    barbell(960, 660, 1.5) +
    // Very Large Guy on right
    builder(1440, 640, t, {
      expression: "smug_rock_eyebrow",
      scale: 1.6,
    }) +
    // Confetti and celebration sparkles for satisfying ending
    (showConfetti ? `
      <g transform="translate(960, 300)">
        <polygon points="-120,-40 -110,-30 -130,-20" fill="#facc15"/>
        <polygon points="-60,-80 -50,-60 -70,-50" fill="#38bdf8"/>
        <polygon points="60,-70 80,-80 70,-55" fill="#ef4444"/>
        <polygon points="120,-30 140,-45 135,-20" fill="#22c55e"/>
        <circle cx="-160" cy="-60" r="8" fill="#facc15"/>
        <circle cx="160" cy="-60" r="8" fill="#38bdf8"/>
        <!-- Gold Thumbs Up Icon -->
        <g transform="translate(0, -60) scale(1.4)">
          <circle cx="0" cy="0" r="28" fill="#facc15"/>
          <path d="M -8 10 L 8 10 L 12 -4 L 6 -14 L 0 -14 L -4 -6 L -8 -6 Z" fill="#713f12"/>
        </g>
      </g>
    ` : "")
  );
}

const baseCamera = keyframedCamera([
  { at: 163.79, x: 960, y: 540, zoom: 1.15 },
  // Pan to skinny guy at 167.07
  { at: 167.07, x: 480, y: 540, zoom: 1.40 },
  // Pan to very large guy at 170.75
  { at: 170.75, x: 1440, y: 540, zoom: 1.40 },
  // Snap out to full satisfying ending at 172.09
  { at: 172.09, x: 960, y: 480, zoom: 1.25 },
  { at: 175.46, x: 960, y: 480, zoom: 1.27 },
]);

export const scene: AuthoredScene = {
  id: "act2-s23-the-formula",
  start: S_START,
  end: S_END,
  intent: "The classic YouTube formula lineup: skinny Anatoly, massive barbell, hulking bodybuilder, and confetti shower.",
  renderWorld,
  camera: baseCamera,
};
