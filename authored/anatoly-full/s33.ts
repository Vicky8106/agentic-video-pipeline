/**
 * S1 (853.46–872.02): "staged, but the weights are real."
 * Thesis setup in the gym. The barbell falls OUT of the argument: on
 * "fake" it slams to the floor with dust and the camera dips with the
 * impact — the weights are the proof, so they get the only move.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { host, dust } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S1_START = 853.46;
export const S1_END = 872.02;
/** ..."make the weights FAKE" — the slam lands with the word. */
const SLAM_AT = 861.9;

function renderWorld(t: number): string {
  const drop = span(t, 861.2, SLAM_AT);
  const barY = drop < 1 ? lerp(-300, 640, drop * drop) : 640;
  return (
    renderBackground("BG-GYM", { timeSec: t }) +
    (drop > 0
      ? `<g transform="translate(1380 ${barY.toFixed(1)}) scale(1.15)">${renderProp("PROP-GYM", { x: 0, y: 0, scale: 1, timeSec: t })}</g>`
      : ``) +
    dust(1380, 690, drop >= 1 ? Math.sin(Math.PI * span(t, SLAM_AT, SLAM_AT + 0.9)) : 0) +
    host(560, 652, t, {
      expression: t < SLAM_AT ? "deadpan_classic" : "smug_rock_eyebrow",
      pointTarget: drop >= 1 ? { x: 1380, y: 620 } : undefined,
      spineLean: 4,
    })
  );
}

const baseCamera = keyframedCamera([
  { at: S1_START, x: 960, y: 560, zoom: 1.02 },
  { at: 858, x: 940, y: 560, zoom: 1.1 },
  { at: SLAM_AT, x: 940, y: 572, zoom: 1.05 },
  { at: 862.8, x: 920, y: 560, zoom: 1.2 },
  { at: 866, x: 900, y: 560, zoom: 1.3 },
  { at: S1_END, x: 890, y: 560, zoom: 1.32 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s1-real-weights",
  start: S1_START,
  end: S1_END,
  intent:
    "Thesis setup: one slow push while the argument builds, then a single " +
    "motivated slam — the barbell drops ON 'fake' with dust and a camera " +
    "dip, because the weights are the evidence. Host points at the proof " +
    "after it lands. Nothing else moves.",
  renderWorld,
  camera: withPunch(baseCamera, SLAM_AT, 0.3),
};
