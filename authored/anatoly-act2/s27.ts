/**
 * Act 2 Scene 27 (206.37–220.63s): act2-s27-the-magic-trick
 * "Basically a magic trick. Except instead of a rabbit out of a hat... he pulls 250kg off the floor."
 * Magician table: Anatoly pulls a giant 250KG iron plate out of a top hat.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, janitor, magicianHatWithBarbell,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 206.37;
export const S_END = 220.63;

function renderWorld(t: number): string {
  const pull = Math.min(1, Math.max(0, (t - 216.0) * 1.5));
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Magician Table with red tablecloth
    `<g transform="translate(960, 680)">
      <rect x="-160" y="-80" width="320" height="20" rx="4" fill="#7f1d1d" stroke="#991b1b" stroke-width="3"/>
      <polygon points="-150,-60 150,-60 130,80 -130,80" fill="#991b1b"/>
      <line x1="-120" y1="80" x2="-120" y2="140" stroke="#1e293b" stroke-width="8"/>
      <line x1="120" y1="80" x2="120" y2="140" stroke="#1e293b" stroke-width="8"/>
    </g>` +
    // Top hat with barbell plate pulling out
    magicianHatWithBarbell(960, 560, pull) +
    // White cartoon bunny rabbit peeking out of table side looking confused
    `<g transform="translate(1180, 580)">
      <!-- Bunny ears -->
      <ellipse cx="-8" cy="-35" rx="5" ry="18" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <ellipse cx="8" cy="-35" rx="5" ry="18" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <ellipse cx="-8" cy="-35" rx="2" ry="12" fill="#f43f5e"/>
      <ellipse cx="8" cy="-35" rx="2" ry="12" fill="#f43f5e"/>
      <!-- Head -->
      <circle cx="0" cy="-10" r="16" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
      <circle cx="-5" cy="-12" r="2" fill="#0f172a"/>
      <circle cx="5" cy="-12" r="2" fill="#0f172a"/>
      <polygon points="-2,-6 2,-6 0,-3" fill="#f43f5e"/>
    </g>` +
    // Anatoly holding the top of the plate pulling it out
    janitor(740, 652, t, {
      expression: pull > 0.5 ? "smug_rock_eyebrow" : "deadpan_classic",
      rightHandProp: "none",
      pointTarget: { x: 960, y: 480 },
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 206.37, x: 960, y: 540, zoom: 1.15 },
  { at: 216.00, x: 960, y: 540, zoom: 1.20 },
  // Punch zoom on 250KG plate emerging from hat at 218.00s
  { at: 218.00, x: 960, y: 460, zoom: 1.70 },
  { at: 220.63, x: 960, y: 460, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "act2-s27-the-magic-trick",
  start: S_START,
  end: S_END,
  intent: "Magic trick: Anatoly pulls a giant 250KG iron plate out of a magician top hat with sparklers.",
  renderWorld,
  camera: baseCamera,
};
