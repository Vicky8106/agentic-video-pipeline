/**
 * Act 2 Scene 19 (126.64–135.26s): act2-s19-real-vs-spontaneous
 * Distinction between a real event and a spontaneous event.
 * Two large placards drop from ceiling: REAL vs SPONTANEOUS.
 * Big red ≠ sign slams down between them on "not the same thing" (134.72s).
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, card,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 126.64;
export const S_END = 135.26;

function renderWorld(t: number): string {
  const showCards = t >= 129.12;
  const showNotEqual = t >= 134.00;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Left placard: REAL EVENT
    (showCards ? `
      <g transform="translate(560, 420)">
        <rect x="-140" y="-80" width="280" height="160" rx="14" fill="#0f172a" stroke="#22c55e" stroke-width="6"/>
        <text x="0" y="-15" font-family="'Impact', sans-serif" font-size="28" fill="#22c55e" text-anchor="middle">REAL EVENT</text>
        <circle cx="0" cy="35" r="22" fill="#22c55e"/>
        <polyline points="-10,35 -3,42 12,25" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      </g>
    ` : "") +
    // Right placard: SPONTANEOUS EVENT
    (showCards ? `
      <g transform="translate(1360, 420)">
        <rect x="-160" y="-80" width="320" height="160" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="6"/>
        <text x="0" y="-15" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" text-anchor="middle">SPONTANEOUS</text>
        <circle cx="0" cy="35" r="22" fill="#ef4444"/>
        <line x1="-12" y1="23" x2="12" y2="47" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
        <line x1="12" y1="23" x2="-12" y2="47" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      </g>
    ` : "") +
    // Red Not Equal Sign (≠)
    (showNotEqual ? `
      <g transform="translate(960, 420)">
        <circle cx="0" cy="0" r="40" fill="#ef4444"/>
        <line x1="-20" y1="-8" x2="20" y2="-8" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
        <line x1="-20" y1="8" x2="20" y2="8" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
        <line x1="-14" y1="22" x2="14" y2="-22" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      </g>
    ` : "") +
    host(960, 680, t, {
      expression: t < 134.0 ? "deadpan_classic" : "skeptical_side_eye",
      spineLean: -2,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 126.64, x: 960, y: 540, zoom: 1.15 },
  { at: 133.50, x: 960, y: 540, zoom: 1.20 },
  // Punch zoom on ≠ sign at 134.72s
  { at: 134.72, x: 960, y: 460, zoom: 1.75 },
  { at: 135.26, x: 960, y: 460, zoom: 1.77 },
]);

export const scene: AuthoredScene = {
  id: "act2-s19-real-vs-spontaneous",
  start: S_START,
  end: S_END,
  intent: "Distinction between a real event and a spontaneous event with falling placards and red not-equal sign.",
  renderWorld,
  camera: baseCamera,
};
