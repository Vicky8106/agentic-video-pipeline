/**
 * Pigeon Park scene 1 (0.000–12.207s): the morning routine + the mistake.
 *
 * Directed, not detected. Cue-by-cue plan from the script:
 *
 * - Cue 1 "I have started feeding the pigeons in the park every morning."
 *   (0–3.469, setup): establish the ritual. Warm grade fades in over the
 *   park base (morning light arriving WITH the routine), host scatters feed
 *   on a toss loop, three pigeons peck the ground. Camera: slow push
 *   1.02 -> 1.12. Nothing else moves — the calm is the setup.
 * - Cue 2 "They now recognize me. This was my first mistake."
 *   (3.719–7.058, turn): on RECOGNIZE the pecking STOPS mid-bob and all
 *   three heads snap to the host, eyes widening. Punch-in lands on the
 *   snap, then holds while the host leans back in dread. The joke is the
 *   freeze, so everything except the camera holds still.
 * - Cue 3 "Yesterday, the fat one brought a friend. Today, the friend
 *   brought a lawyer." (7.308–12.207, escalation): the fat ringleader
 *   waddles in from camera-right with his pal; on TODAY the tiny lawyer
 *   strides in behind them, briefcase in wing. Camera tracks laterally
 *   with the entrances, then punches on LAWYER_PUNCH ("lawyer").
 *
 * Absolute times below are director choices against the SRT grid, named so
 * a re-time touches one constant, not choreography.
 */
import { renderBackground } from "../../src/assets/BackgroundLibrary.js";
import { renderStickFigure } from "../../src/character/StickFigure.js";
import {
  keyframedCamera,
  withPunch,
  smooth,
  span,
  lerp,
  clamp,
  type AuthoredScene,
  type AuthoredFilm,
} from "../../src/authored/AuthoredScene.js";

export const SCENE_START = 0;
export const SCENE_END = 12.207;
/** "recognize" lands ~1.5s into cue 2. */
export const RECOGNIZE_AT = 5.2;
/** "Today ..." — the lawyer entrance cue. */
export const TODAY_AT = 9.8;
/** ..."brought a lawyer" — punch word. */
export const LAWYER_PUNCH_AT = 11.2;

const HOST_X = 560;
const HOST_Y = 652;

/** 0 while pecking, 1 once the birds have locked onto the host. */
const alertness = (t: number): number => smooth(span(t, RECOGNIZE_AT - 0.08, RECOGNIZE_AT + 0.14));

interface PigeonOpts {
  x: number;
  y: number;
  s: number;
  body: string;
  /** 0 = head down pecking, 1 = head up staring at host. */
  headUp: number;
  /** Side-to-side waddle rock in degrees. */
  waddle: number;
  lawyer?: boolean;
  eyeWiden?: number;
}

/** Bespoke park pigeon: pecking, staring, waddling, lawyering. */
function pigeon(o: PigeonOpts, t: number): string {
  const peck = Math.sin(t * 7.0 + o.x * 0.01) * 0.5 + 0.5;
  const headAngle = lerp(-38 + peck * 26, -4, o.headUp);
  const eyeR = 3.5 + (o.eyeWiden ?? 0) * 3.0;
  const pupilDx = lerp(1.5, -7, o.headUp);
  const briefcase = o.lawyer
    ? `<rect x="-72" y="18" width="34" height="26" rx="4" fill="#78350f" stroke="#0f172a" stroke-width="4"/>` +
      `<line x1="-55" y1="18" x2="-55" y2="30" stroke="#fbbf24" stroke-width="3"/>`
    : ``;
  const tie = o.lawyer
    ? `<polygon points="14,-18 22,-18 18,2" fill="#b91c1c"/>`
    : ``;
  return `<g transform="translate(${o.x.toFixed(1)} ${o.y.toFixed(1)}) rotate(${o.waddle.toFixed(2)}) scale(${o.s})">` +
    `<ellipse cx="0" cy="46" rx="36" ry="7" fill="#0f172a" opacity="0.15"/>` +
    `<ellipse cx="0" cy="0" rx="26" ry="30" fill="${o.body}" stroke="#0f172a" stroke-width="5"/>` +
    `<line x1="-8" y1="28" x2="-8" y2="46" stroke="#f59e0b" stroke-width="5"/>` +
    `<line x1="8" y1="28" x2="8" y2="46" stroke="#f59e0b" stroke-width="5"/>` +
    `<g transform="translate(0 -28) rotate(${headAngle.toFixed(1)})">` +
    `<circle cx="0" cy="-10" r="15" fill="${o.body}" stroke="#0f172a" stroke-width="5"/>` +
    `<circle cx="-4" cy="-12" r="${eyeR.toFixed(1)}" fill="#ffffff"/>` +
    `<circle cx="${(-4 + pupilDx).toFixed(1)}" cy="-12" r="3" fill="#0f172a"/>` +
    `<polygon points="12,-12 26,-8 12,-4" fill="#f59e0b" stroke="#0f172a" stroke-width="2"/>` +
    `${tie}</g>${briefcase}</g>`;
}

/** Feed crumbs arcing from the host's hand to the ground (cue 1 only). */
function feedToss(t: number): string {
  if (t > 3.5) return ``;
  let out = ``;
  for (let i = 0; i < 8; i++) {
    const ph = (t * 0.7 + i / 8) % 1;
    const x = 700 + ph * 430;
    const y = 470 + ph * 290 - Math.sin(Math.PI * ph) * 130;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#d97706" opacity="${(1 - ph * 0.4).toFixed(2)}"/>`;
  }
  return out;
}

function host(t: number): string {
  const scattering = t < 3.5;
  const dread = smooth(span(t, 5.6, 6.6));
  const tossPhase = Math.sin(t * 7.0);
  return renderStickFigure("host", {
    x: HOST_X,
    y: HOST_Y,
    scale: 1.25,
    gender: "male",
    hairStyle: "male_short",
    clothes: "hoodie",
    expression: t < RECOGNIZE_AT ? "deadpan_classic" : "shock_eye_pop",
    timeSec: t,
    isTalking: true,
    mouthShape: "talking_flap",
    mouthOpen: 0.35 + 0.3 * Math.abs(Math.sin(t * 5.2)),
    spineLean: scattering ? 8 + tossPhase * 3 : -6 * dread,
    headTilt: 6 * dread,
    eyebrowTilt: -0.8 * dread,
    gazeTarget: { x: 1300, y: 700 },
    rightArmAngle1: scattering ? 65 + tossPhase * 14 : 55,
    rightArmAngle2: scattering ? -22 : 12,
  } as Parameters<typeof renderStickFigure>[1]);
}

function renderWorld(t: number): string {
  const alert = alertness(t);
  // Morning grade arrives WITH the routine in cue 1, then stays.
  const grade = 0.22 * smooth(span(t, 0.2, 3.2));
  // Entrances ride in from camera-right during cue 3.
  const enterK = smooth(span(t, 7.4, 8.8));
  const lawyerK = smooth(span(t, TODAY_AT, TODAY_AT + 1.1));
  const fatX = lerp(2150, 1500, enterK);
  const palX = lerp(2280, 1360, enterK);
  const lawyerX = lerp(2200, 1640, lawyerK);
  const waddle = (ph: number): number => (enterK < 1 ? Math.sin(t * 9 + ph) * 5 * (1 - enterK * 0.4) : 0);
  const residentsPeck = (seed: number): number => (alert < 1 ? Math.sin(t * 7 + seed) * 4 : 0);
  return (
    renderBackground("BG-PARK", { timeSec: t }) +
    `<rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdba74" opacity="${grade.toFixed(3)}"/>` +
    feedToss(t) +
    host(t) +
    // Resident trio: pecking (head down) until the snap, then staring.
    pigeon({ x: 1230, y: 760, s: 1.0, body: "#94a3b8", headUp: alert, waddle: residentsPeck(0), eyeWiden: alert }, t) +
    pigeon({ x: 1360, y: 790, s: 0.85, body: "#cbd5e1", headUp: alert, waddle: residentsPeck(2.1), eyeWiden: alert }, t) +
    pigeon({ x: 1120, y: 800, s: 0.7, body: "#64748b", headUp: alert, waddle: residentsPeck(4.2), eyeWiden: alert }, t) +
    // Cue-3 entrants: always alert, waddling in with purpose.
    (t > 7.3 ? pigeon({ x: fatX, y: 740, s: 1.3, body: "#94a3b8", headUp: 1, waddle: waddle(0), eyeWiden: 0.4 }, t) : ``) +
    (t > 7.5 ? pigeon({ x: palX, y: 790, s: 1.0, body: "#cbd5e1", headUp: 1, waddle: waddle(2.1), eyeWiden: 0.4 }, t) : ``) +
    (t > TODAY_AT ? pigeon({ x: lawyerX, y: 800, s: 0.55, body: "#475569", headUp: 1, waddle: waddle(4.2), lawyer: true, eyeWiden: 0.6 }, t) : ``)
  );
}

const baseCamera = keyframedCamera([
  { at: 0, x: 960, y: 560, zoom: 1.02 },
  { at: 3.4, x: 920, y: 560, zoom: 1.12 },
  { at: 5.2, x: 900, y: 560, zoom: 1.14 },
  { at: 6.2, x: 880, y: 560, zoom: 1.56 },
  { at: 7.3, x: 900, y: 558, zoom: 1.5 },
  { at: 8.8, x: 1120, y: 550, zoom: 1.18 },
  { at: 10.4, x: 1110, y: 550, zoom: 1.2 },
  { at: 11.4, x: 1090, y: 552, zoom: 1.5 },
  { at: 12.207, x: 1080, y: 555, zoom: 1.34 },
]);

const scene: AuthoredScene = {
  id: "pigeon-s1-morning-feed",
  start: SCENE_START,
  end: SCENE_END,
  intent:
    "Cue 1 establishes the feeding ritual (warm grade + toss loop, slow push, " +
    "nothing else moves). Cue 2's joke is the freeze: all pecking stops ON " +
    "'recognize' and the punch-in lands on the head-snap, holding through " +
    "'my first mistake' while the host recoils. Cue 3 escalates by entrances " +
    "only — fat one, pal, then the lawyer — tracked laterally, punching on " +
    "'lawyer'. No move fires without its sentence.",
  renderWorld,
  camera: withPunch(withPunch(baseCamera, RECOGNIZE_AT, 0.1), LAWYER_PUNCH_AT, 0.3),
};

export const film: AuthoredFilm = { name: "pigeon-park-s1", scenes: [scene] };
export default film;
