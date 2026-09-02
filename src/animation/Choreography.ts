import type { DirectedAction, ProductionBeat } from "../core/ProductionPlan";

export function action(
  type: DirectedAction["type"],
  start: number,
  end: number,
  payload: Record<string, unknown> = {},
  actor?: string,
  target?: string,
): DirectedAction {
  return {
    id: `${type}-${start.toFixed(3)}-${Math.round(end * 1000)}-${actor ?? "scene"}-${target ?? ""}`,
    type,
    start,
    end: Math.max(end, start + 0.001),
    payload,
    actor,
    target,
  };
}

export function sequenceBeat(beat: Omit<ProductionBeat, "actions"> & { actions?: DirectedAction[] }): ProductionBeat {
  return { ...beat, actions: beat.actions ?? [] };
}

/**
 * A reusable cartoon-comedy performance.  The important property is that the
 * reveal is a choreography sequence rather than a static asset swap.
 */
export function comedyReveal(start: number, end: number, actor = "host", target?: string): DirectedAction[] {
  const span = Math.max(0.5, end - start);
  const a = Math.min(0.22, span * 0.16);
  const impact = Math.min(0.11, span * 0.08);
  const reaction = Math.min(0.46, span * 0.26);
  const reveal = start + a;
  const hit = reveal + impact;
  const reactionEnd = Math.min(end, hit + reaction);
  return [
    action("gesture", start, reveal, { gesture: "anticipate", amount: 0.75 }, actor, target),
    action("lookAt", start + a * 0.45, hit, { target: target ?? "camera", tracking: true }, actor, target),
    action("reveal", reveal, hit, { entrance: "pop", overshoot: true }, actor, target),
    action("camera", hit, Math.min(end, hit + 0.14), { move: "punch", target, amount: 1 }, actor, target),
    action("express", hit, reactionEnd, { expression: "surprised" }, actor, target),
    action("hold", reactionEnd, end, { reaction: true }, actor, target),
  ];
}

export function anticipationImpactReaction(start: number, end: number, actor = "host", target?: string) {
  return comedyReveal(start, end, actor, target);
}

/** Split a beat into explicit performance bits. */
export function bitWindows(start: number, end: number, count: number): Array<[number, number]> {
  const n = Math.max(1, Math.min(count, Math.floor((end - start) / 0.24) || 1));
  const span = (end - start) / n;
  return Array.from({ length: n }, (_, i) => [start + i * span, i === n - 1 ? end : start + (i + 1) * span]);
}
