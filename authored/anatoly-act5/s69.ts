/**
 * S4 (902.36–911.73): the janitor callback, staged as a vignette.
 * Janitor-Anatoly walks in mopping; the bodybuilder looms in for
 * "Bro, what are you doing?" (whip between them); on "Remember." the
 * whole world freezes mid-pose and the janitor points down the lens.
 * The freeze IS the direction — the audience holds the warning.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { janitor, builder } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S4_START = 902.36;
export const S4_END = 911.73;
/** "Bro, what are you DOING?" — confrontation lands. */
const BRO_AT = 908.3;
/** "Remember." — the freeze. */
const REMEMBER_AT = 910.9;

function renderWorld(t: number): string {
  const walkK = smooth(span(t, 903.0, 905.5));
  const janX = lerp(60, 620, walkK);
  const frozen = t >= REMEMBER_AT;
  const bIn = smooth(span(t, 906.3, 907.3));
  const builderX = lerp(2100, 1330, bIn);
  return (
    renderBackground("BG-GYM", { timeSec: frozen ? REMEMBER_AT : t }) +
    janitor(janX, 652, frozen ? REMEMBER_AT : t, {
      isWalking: walkK > 0 && walkK < 1,
      expression: frozen ? "smug_rock_eyebrow" : "deadpan_classic",
      pointTarget: frozen ? { x: 960, y: 300 } : undefined,
      spineLean: frozen ? -4 : 6,
    }) +
    (bIn > 0
      ? builder(builderX, 660, frozen ? REMEMBER_AT : t, {
          expression: t < BRO_AT ? "smug_rock_eyebrow" : "shock_jaw_drop",
          spineLean: t < BRO_AT ? 0 : -8,
        })
      : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: S4_START, x: 900, y: 560, zoom: 1.1 },
  { at: 905.5, x: 800, y: 560, zoom: 1.15 },
  { at: 907.3, x: 1050, y: 555, zoom: 1.25 },
  { at: BRO_AT, x: 1250, y: 550, zoom: 1.5 },
  { at: 909.5, x: 800, y: 560, zoom: 1.45 },
  { at: REMEMBER_AT, x: 750, y: 560, zoom: 1.7 },
  { at: S4_END, x: 750, y: 560, zoom: 1.72 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s4-janitor-vignette",
  start: S4_START,
  end: S4_END,
  intent:
    "Callback as theater: walk-in, loom-in, whip between accuser and " +
    "deadpan janitor on 'Bro?', then a true freeze on 'Remember.' — world " +
    "time stops, janitor points down the lens, camera holds the warning. " +
    "The stillness after the whips is the punchline.",
  renderWorld,
  camera: withPunch(baseCamera, REMEMBER_AT, 0.32),
};
