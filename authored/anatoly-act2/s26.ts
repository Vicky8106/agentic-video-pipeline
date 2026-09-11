/**
 * Act 2 Scene 26 (194.19–206.37s): act2-s26-the-power-of-contrast
 * "The most entertaining thing about strength isn't strength. It's CONTRAST.
 * The guy who looks weak is strong. The janitor is a powerlifter."
 * Giant CONTRAST marquee sign. Glowing powerhouse Anatoly vs deflated bodybuilder.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  janitor, builder, card,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 194.19;
export const S_END = 206.37;

function renderWorld(t: number): string {
  const pulse = Math.sin(t * 6) * 10;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Top marquee header: CONTRAST
    `<g transform="translate(960, 180)">
      <rect x="-180" y="-40" width="360" height="80" rx="12" fill="#0f172a" stroke="#f59e0b" stroke-width="6"/>
      <text x="0" y="14" font-family="'Impact', sans-serif" font-size="44" fill="#facc15" text-anchor="middle">CONTRAST</text>
    </g>` +
    // Left: Janitor Anatoly glowing with power aura
    `<g transform="translate(560, 652)">
      <circle cx="0" cy="-60" r="${(90 + pulse).toFixed(1)}" fill="#38bdf8" opacity="0.25"/>
      <circle cx="0" cy="-60" r="70" fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="12 8"/>
    </g>` +
    janitor(560, 652, t, {
      expression: "smug_rock_eyebrow",
      scale: 1.25,
      rightHandProp: "mop",
    }) +
    // Right: Deflated bodybuilder looking sheepish
    builder(1360, 652, t, {
      expression: "skeptical_side_eye",
      scale: 1.4,
      spineLean: 8,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 194.19, x: 960, y: 540, zoom: 1.15 },
  // Instant snap on "CONTRAST" at 205.87s
  { at: 203.71, x: 960, y: 380, zoom: 1.55 },
  { at: 206.37, x: 960, y: 380, zoom: 1.57 },
]);

export const scene: AuthoredScene = {
  id: "act2-s26-the-power-of-contrast",
  start: S_START,
  end: S_END,
  intent: "The power of contrast: glowing powerhouse Anatoly next to deflated bodybuilder under neon CONTRAST sign.",
  renderWorld,
  camera: baseCamera,
};
