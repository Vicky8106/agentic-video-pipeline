/**
 * ShowPlan: the shared data contract between the compile phase
 * (intelligence: SRT+MP3 -> plan) and the execute phase
 * (deterministic: plan -> driveGags -> muxed video).
 *
 * Layers (compiler passes) each own one section and are unit-testable
 * on JSON without rendering: classifier -> beatType, asset resolver ->
 * props/cast builders, staging -> marks/entrances, camera -> shot +
 * framings, cutter -> window boundaries. See HOUSE_STYLE.md.
 */
import type { MovieBeat } from "./ShotTimeline";

export type BeatType =
  | "tableau"        // safe default: host + prop, wide shot
  | "comparison"     // X-to-Y shift (sliders, before/after)
  | "escalation"     // growing number/pressure (pendulum, piles)
  | "list"           // parade of items/people entering in line
  | "personification"// an abstraction walks in and does something
  | "reversal"       // expectation flip (faint, confiscation)
  | "callback"       // a previous window's prop/actor returns
  | "superlative"    // biggest/smallest/worst (macro shot bait)
  | "process";       // how-it-works sequence (button presses, drains)

export type ShotKind = "wide" | "punch" | "macro" | "tag";

export interface PlanMark { x: number; y: number; }

export interface PlanEntrance {
  /** Stage side the actor walks in from (nearest-edge rule). */
  from: "left" | "right";
  /** Absolute seconds: walk starts / arrives at mark. */
  start: number;
  end: number;
}

export interface PlanActor {
  id: string;
  role: "host" | "guest" | "crowd";
  gender: string;
  hairStyle: string;
  clothes: string;
  mark: PlanMark;
  entrance: PlanEntrance;
  expression: string;
  pose?: string;
  scale?: number;
  /** Comic effect attached to the actor (e.g. "question", "sparkles"). */
  fx?: string;
}

export interface PlanProp {
  /** Builder name: gag-lib export (e.g. "moneyBag") or "inline:<window>". */
  builder: string;
  at: PlanMark;
  /** Absolute seconds: appear / act (payoff) / settle-or-exit. */
  cue: { appear: number; act: number; settle: number };
  params?: Record<string, number | string>;
}

export interface PlanCamera {
  cx: number;
  cy: number;
  zoom: number;
}

export interface ShowBeat {
  beatId: number;
  startSec: number;
  endSec: number;
  beatType: BeatType;
  shot: ShotKind;
  /** Establish framing (skit open). */
  wide: PlanCamera;
  /** Payoff framing (punch/macro/tag); equals wide when no punch. */
  tight: PlanCamera;
  /** Absolute second the punch lands (<= startSec when no punch). */
  punchAt: number;
  cast: PlanActor[];
  props: PlanProp[];
  /** Source narration line(s) this beat performs. */
  srt: string;
  /** Escape hatch: hand-staging reference overriding this beat (counted). */
  override?: string;
}

export interface ShowWindow {
  windowId: string;
  startSec: number;
  endSec: number;
  beats: ShowBeat[];
}

export interface ShowPlan {
  show: string;
  windows: ShowWindow[];
  generatedAt: string;
  generator: string;
}

/** Downgrade path: a MovieBeat renders as a tableau ShowBeat. */
export function movieBeatToTableau(b: MovieBeat, beatType: BeatType = "tableau"): ShowBeat {
  return {
    beatId: b.beatId,
    startSec: b.startSec,
    endSec: b.endSec,
    beatType,
    shot: "wide",
    wide: { cx: b.camera.x, cy: b.camera.y, zoom: b.camera.zoom },
    tight: { cx: b.camera.x, cy: b.camera.y, zoom: b.camera.zoom },
    punchAt: b.startSec,
    cast: [{
      id: b.actor.id,
      role: "host",
      gender: b.actor.gender,
      hairStyle: b.actor.hairStyle,
      clothes: b.actor.clothes,
      mark: { x: b.actor.x, y: b.actor.y },
      entrance: { from: b.actor.x < 960 ? "left" : "right", start: b.startSec, end: b.startSec },
      expression: b.actor.expression,
      pose: b.actor.pose,
      scale: b.actor.scale,
    }],
    props: b.activeProp ? [{
      builder: b.activeProp.id,
      at: { x: b.activeProp.x, y: b.activeProp.y },
      cue: { appear: b.startSec, act: b.startSec, settle: b.endSec },
    }] : [],
    srt: b.text,
  };
}

/** Structural validator: returns human-readable errors (empty = valid). */
export function validateShowPlan(plan: ShowPlan): string[] {
  const errs: string[] = [];
  if (!plan || !Array.isArray(plan.windows) || plan.windows.length === 0) {
    return ["plan has no windows"];
  }
  let prevEnd = -1;
  for (const w of plan.windows) {
    if (!(w.endSec > w.startSec)) errs.push(`${w.windowId}: endSec <= startSec`);
    if (w.startSec < prevEnd) errs.push(`${w.windowId}: overlaps previous window`);
    prevEnd = w.endSec;
    if (!Array.isArray(w.beats) || w.beats.length === 0) {
      errs.push(`${w.windowId}: no beats`);
      continue;
    }
    for (const b of w.beats) {
      if (!(b.endSec > b.startSec)) errs.push(`${w.windowId} beat ${b.beatId}: endSec <= startSec`);
      if (b.startSec < w.startSec - 1e-6 || b.endSec > w.endSec + 1e-6) {
        errs.push(`${w.windowId} beat ${b.beatId}: outside window bounds`);
      }
      if (b.punchAt < b.startSec - 1e-6 || b.punchAt > b.endSec + 1e-6) {
        errs.push(`${w.windowId} beat ${b.beatId}: punchAt outside beat`);
      }
      for (const c of b.cast ?? []) {
        if (c.entrance.end < c.entrance.start) {
          errs.push(`${w.windowId} beat ${b.beatId} actor ${c.id}: entrance ends before it starts`);
        }
      }
    }
  }
  return errs;
}
