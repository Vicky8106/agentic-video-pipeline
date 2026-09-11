/**
 * S5 (911.73–924.63): the paranoia montage. Every "probably" materializes
 * a crew member behind the magic — camera, editor, pre-video fixers,
 * thumbnail designer — stacking up camera-right until the punchline
 * suspect arrives: the comment-section plate-measurer, caliper in hand,
 * inspecting a plate. Punch on "weight plate".
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { host, crewSil } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S5_START = 911.73;
export const S5_END = 924.63;
/** ..."measuring the weight PLATE" — the caliper snaps shut on the word. */
const PLATE_AT = 924.0;

const CREW = [
  { at: 912.3, x: 1130, gear: "cam" as const },
  { at: 913.8, x: 1290, gear: "edit" as const },
  { at: 915.5, x: 1450, gear: "edit" as const },
  { at: 917.5, x: 1610, gear: "thumb" as const },
];
const CLEAR_AT = 920.6;

const plate = (k: number): string =>
  k <= 0
    ? ``
    : `<g transform="translate(1360 780) scale(${(1.4 * k).toFixed(3)})">` +
      `<circle cx="0" cy="0" r="95" fill="#0f172a" stroke="#475569" stroke-width="8"/>` +
      `<circle cx="0" cy="0" r="26" fill="#4ade80"/>` +
      `<circle cx="0" cy="0" r="95" fill="none" stroke="#f8fafc" stroke-width="3" opacity="0.4"/></g>`;

function renderWorld(t: number): string {
  const clearK = smooth(span(t, CLEAR_AT, CLEAR_AT + 0.4));
  let crew = ``;
  for (const c of CREW) {
    const k = smooth(span(t, c.at, c.at + 0.35));
    if (k > 0 && clearK < 1) {
      crew += `<g opacity="${(1 - clearK).toFixed(2)}">` +
        crewSil(c.x, 700, 1.0, c.gear, t).replace(`scale(1)`, `scale(${(k).toFixed(3)})`) + `</g>`;
    }
  }
  const cal = smooth(span(t, 921.8, 922.3));
  const snapK = t >= PLATE_AT ? Math.max(0, 1 - (t - PLATE_AT) * 1.5) : 0;
  // Bespoke giant caliper: the catalog PROP-FACE is a labeled medical
  // diagram (baked-in words), wrong tool for a plate-measuring gag.
  const jaw = 34 - snapK * 22;
  const caliper =
    cal > 0
      ? `<g transform="translate(1360 ${(420 - snapK * 26).toFixed(1)}) scale(${(1.2 * cal).toFixed(3)})">` +
        `<circle cx="0" cy="-70" r="16" fill="#475569" stroke="#0f172a" stroke-width="5"/>` +
        `<line x1="0" y1="-70" x2="${(-jaw).toFixed(1)}" y2="60" stroke="#94a3b8" stroke-width="14" stroke-linecap="round"/>` +
        `<line x1="0" y1="-70" x2="${jaw.toFixed(1)}" y2="60" stroke="#94a3b8" stroke-width="14" stroke-linecap="round"/>` +
        `<line x1="${(-jaw).toFixed(1)}" y1="60" x2="${(-jaw).toFixed(1)}" y2="92" stroke="#38bdf8" stroke-width="9" stroke-linecap="round"/>` +
        `<line x1="${jaw.toFixed(1)}" y1="60" x2="${jaw.toFixed(1)}" y2="92" stroke="#38bdf8" stroke-width="9" stroke-linecap="round"/>` +
        `</g>`
      : ``;
  return (
    renderBackground("BG-STUDIO", { timeSec: t }) +
    crew +
    plate(cal) +
    caliper +
    host(540, 652, t, {
      expression: t < PLATE_AT ? "skeptical_side_eye" : "smug_rock_eyebrow",
      pointTarget: cal > 0 ? { x: 1360, y: 700 } : { x: 1300, y: 600 },
    })
  );
}

const baseCamera = keyframedCamera([
  { at: S5_START, x: 960, y: 560, zoom: 1.05 },
  { at: 915, x: 1020, y: 555, zoom: 1.12 },
  { at: 918, x: 1080, y: 550, zoom: 1.18 },
  { at: 920.6, x: 1000, y: 560, zoom: 1.15 },
  { at: 922.5, x: 1080, y: 570, zoom: 1.3 },
  { at: PLATE_AT, x: 1100, y: 575, zoom: 1.55 },
  { at: S5_END, x: 1080, y: 570, zoom: 1.5 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s5-crew-montage",
  start: S5_START,
  end: S5_END,
  intent:
    "Suspicion stacking: four crew silhouettes pop in one per 'probably' " +
    "while the camera creeps right counting them; then all clear for the " +
    "real suspect — the plate-measurer, whose caliper snaps shut ON 'weight " +
    "plate' with the punch-in. The rhythm of the repetition IS the camera " +
    "move.",
  renderWorld,
  camera: withPunch(baseCamera, PLATE_AT, 0.34),
};
