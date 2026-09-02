/**
 * Visual style is deliberately isolated from story/directing logic.
 * A StylePack answers "how should this production look and move?" while the
 * director answers "what should happen and when?".
 */
import type { StickFigureState } from "../character/StickFigure";

export type VisualAssetKind =
  | "character" | "prop" | "environment" | "diagram" | "label"
  | "symbol" | "chart" | "comparison" | "custom";

export type EntranceMotion =
  | "pop" | "drop" | "slide" | "draw" | "scale" | "whip" | "morph" | "stamp";

export interface StylePalette {
  background: string;
  foreground: string;
  ink: string;
  muted: string;
  accent: string;
  accent2: string;
  shadow: string;
}

export interface StyleMotionGrammar {
  preferredEntrances: EntranceMotion[];
  preferredExits: EntranceMotion[];
  punchScale: number;
  reactionScale: number;
  maxStaticHoldSec: number;
  minimumMeaningfulMotionSec: number;
  cameraEnergy: number;
  squash: number;
  overshoot: number;
}

export interface StyleEditGrammar {
  shotKinds: string[];
  transitionKinds: string[];
  preferredCutRangeSec: [number, number];
  punchlineHoldSec: number;
  reactionHoldSec: number;
  maximumShotSec: number;
}

export type StyleMotionIntent = "reveal" | "impact" | "reaction" | "idle" | "transform";
export type StyleEditIntent = "setup" | "reveal" | "escalation" | "punchline" | "reaction";

export interface AssetRequest {
  id: string;
  kind: VisualAssetKind;
  semantic: string;
  variant?: string;
  accent?: string;
}

export interface StyleActorContext {
  state: StickFigureState;
  actorId: string;
  timeSec: number;
}

export interface StylePack {
  id: string;
  version: string;
  palette: StylePalette;
  motion: StyleMotionGrammar;
  edit: StyleEditGrammar;

  /** Render a semantic visual asset. No director code should contain SVG paths. */
  renderAsset(request: AssetRequest, state: Record<string, unknown>): string;

  /** Render an actor using the style's character language/rig. */
  renderActor(context: StyleActorContext): string;

  /** Optional style-specific background/world layer. */
  renderEnvironment(timeSec: number, state: Record<string, unknown>): string;

  /** Map style-neutral motion/edit intent to this style's visual grammar. */
  resolveMotion(intent: StyleMotionIntent, intensity?: number): Record<string, unknown>;
  resolveEdit(intent: StyleEditIntent, intensity?: number): Record<string, unknown>;
}

export type StylePackRegistry = Map<string, StylePack>;

export function createStyleRegistry(packs: StylePack[]): StylePackRegistry {
  return new Map(packs.map((p) => [p.id, p]));
}

export function resolveStyle(registry: StylePackRegistry, id = "casually-explained"): StylePack {
  const style = registry.get(id);
  if (!style) {
    throw new Error(`Unknown style '${id}'. Available: ${[...registry.keys()].join(", ")}`);
  }
  return style;
}
