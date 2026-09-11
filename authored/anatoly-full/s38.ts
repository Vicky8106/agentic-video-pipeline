/**
 * S6 (924.63–941.0): the Gump gag + the triple identity.
 * Two directed shots in one scene: a bodybuilder run-cycle sprints across
 * the park carrying a barbell ("muscular Forrest Gump", punch on the name),
 * then a hard cut to a dark stage where three spotlights pick out athlete,
 * creator, character one per phrase — pull-back reveals all three, punch
 * on "very good at all three".
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderProp } from "../../src/assets/PropLibrary.js";
import { builder, janitor, suit, host, verdictStage } from "./shared.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  type AuthoredScene,
} from "../../src/authored/AuthoredScene.js";

export const S6_START = 924.63;
export const S6_END = 941.0;
const GUMP_AT = 932.5;
const CUT_AT = 934.8;
const THREE_AT = 940.0;

const spot = (x: number, k: number): string =>
  k <= 0
    ? ``
    : `<polygon points="${x - 160},-400 ${x + 160},-400 ${x + 90},900 ${x - 90},900" ` +
      `fill="#fef9c3" opacity="${(0.35 * k).toFixed(2)}"/>`;

function renderWorld(t: number): string {
  if (t < CUT_AT) {
    const run = smooth(span(t, 927.9, 933.8));
    const x = lerp(150, 1780, run);
    const bob = run > 0 && run < 1 ? Math.abs(Math.sin(t * 9)) * -26 : 0;
    return (
      renderBackground("BG-PARK", { timeSec: t }) +
      host(540, 652, t, { expression: "deadpan_classic" }) +
      (run > 0
        ? `<g transform="translate(${x.toFixed(1)} ${(640 + bob).toFixed(1)}) scale(0.55)">` +
          renderProp("PROP-GYM", { x: 0, y: -260, scale: 1, timeSec: t }) + `</g>` +
          builder(x, 660 + bob, t, {
            isWalking: true,
            bodyFacing: "right",
            expression: "deadpan_classic",
            isTalking: false,
          })
        : ``)
    );
  }
  const a = smooth(span(t, CUT_AT, CUT_AT + 0.4));
  const c = smooth(span(t, 936.0, 936.4));
  const j = smooth(span(t, 937.4, 937.8));
  return (
    verdictStage() +
    spot(560, a) + spot(960, c) + spot(1360, j) +
    (a > 0 ? builder(560, 660, t, { expression: "smug_rock_eyebrow", rightArmAngle1: 150, leftArmAngle1: 30, isTalking: false }) : ``) +
    (c > 0
      ? `<g opacity="${c.toFixed(2)}">` +
        suit(960, 652, t, { isTalking: false }) +
        `<g transform="translate(1130 480) scale(0.9)">` +
        renderProp("PROP-CAM", { x: 0, y: 0, scale: 1, timeSec: t }) + `</g></g>`
      : ``) +
    (j > 0 ? janitor(1360, 652, t, { isTalking: false }) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: S6_START, x: 960, y: 560, zoom: 1.05 },
  { at: 928, x: 900, y: 560, zoom: 1.1 },
  { at: 931, x: 1050, y: 555, zoom: 1.15 },
  { at: GUMP_AT, x: 1150, y: 555, zoom: 1.35 },
  { at: 934.5, x: 1100, y: 555, zoom: 1.3 },
  { at: CUT_AT, x: 960, y: 560, zoom: 1.0 },
  { at: 937.5, x: 960, y: 570, zoom: 0.92 },
  { at: THREE_AT, x: 960, y: 565, zoom: 1.0 },
  { at: S6_END, x: 960, y: 565, zoom: 1.05 },
]);

export const scene: AuthoredScene = {
  id: "anatoly-s6-gump-triple",
  start: S6_START,
  end: S6_END,
  intent:
    "Sight-gag then thesis image: the Gump run sprints laterally with a " +
    "barbell overhead (punch on the name), then a hard cut to darkness " +
    "where spotlights deal out athlete/creator/character one per phrase " +
    "and the camera pulls back to hold all three on 'very good at all " +
    "three'. Two rooms, one argument.",
  renderWorld,
  camera: withPunch(withPunch(baseCamera, GUMP_AT, 0.28), THREE_AT, 0.34),
};
