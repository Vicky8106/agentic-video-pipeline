/**
 * Act 2 Scene 25 (186.91–194.19s): act2-s25-14-views-vs-millions
 * "Scrolling Instagram pretending you aren't waiting for the bench. 14 views. Anatoly has millions."
 * Split screen: Phone with 14 views vs Viral Video with 140,000,000 views.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import {
  host, instagramPhone,
} from "./shared.js";
import {
  keyframedCamera,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S_START = 186.91;
export const S_END = 194.19;

function renderWorld(t: number): string {
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    // Left: Guy on phone with 14 views
    instagramPhone(520, 500, t) +
    // Right: Viral YouTube video player mockup with 140M views
    `<g transform="translate(1360, 500)">
      <rect x="-180" y="-120" width="360" height="240" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
      <rect x="-160" y="-100" width="320" height="150" fill="#18181b"/>
      <!-- Play button icon -->
      <polygon points="-20,-25 -20,25 25,0" fill="#ef4444"/>
      <!-- Viral View Count -->
      <rect x="-160" y="65" width="320" height="40" fill="#09090b"/>
      <text x="0" y="92" font-family="'Impact', sans-serif" font-size="24" fill="#facc15" text-anchor="middle">142,850,912 VIEWS</text>
    </g>` +
    // Host pointing from bottom
    host(960, 720, t, {
      expression: "skeptical_side_eye",
      pointTarget: { x: 1360, y: 500 },
    })
  );
}

const baseCamera = keyframedCamera([
  { at: 186.91, x: 520, y: 500, zoom: 1.35 },
  { at: 191.95, x: 960, y: 540, zoom: 1.15 },
  // Instant snap zoom to millions of views at 194.19s
  { at: 193.50, x: 1360, y: 540, zoom: 1.65 },
  { at: 194.19, x: 1360, y: 540, zoom: 1.67 },
]);

export const scene: AuthoredScene = {
  id: "act2-s25-14-views-vs-millions",
  start: S_START,
  end: S_END,
  intent: "Split screen comparison: phone with 14 views vs viral video counter exploding to 142 million views.",
  renderWorld,
  camera: baseCamera,
};
