/** Style-neutral production intermediate representation.
 *
 * The IR is intentionally independent of SVG, character art, colours and
 * creator-specific visual language.  A director emits intent; a StylePack
 * decides how that intent is drawn and animated.
 */
export type BeatRole = "setup" | "explanation" | "reveal" | "escalation" | "punchline" | "reaction" | "button" | "transition";
export type ActionType =
  | "speak" | "lookAt" | "point" | "walkTo" | "enter" | "exit" | "grab" | "release"
  | "gesture" | "express" | "reveal" | "transform" | "emphasize" | "camera" | "hold";

export interface DirectedAction {
  id: string;
  start: number;
  end: number;
  type: ActionType;
  actor?: string;
  target?: string;
  payload: Record<string, unknown>;
}

export interface VisualPlan {
  /** Semantic concept only. Never an SVG asset name. */
  topic: "money" | "body" | "food" | "device" | "vehicle" | "person" | "sign" | "object" | "compare" | "process" | "problem" | "explain";
  semantic: string;
  interactionTarget?: string;
  entrance?: string;
  intensity?: number;
}

export interface ProductionBeat {
  id: string;
  start: number;
  end: number;
  role: BeatRole;
  triggerWord?: string;
  /** The atomic performance/editing units inside a scene beat. */
  bits?: string[];
  actions: DirectedAction[];
  assets: string[];
  visual?: VisualPlan;
  shotId: string;
  energy: number;
}

export interface ProductionPlan {
  schemaVersion: "1.0" | "1.1" | "1.2";
  styleId: string;
  duration: number;
  beats: ProductionBeat[];
  source: { transcriptVersion: string; directionVersion: string };
  quality: {
    maxStaticHoldSec: number;
    maxShotSec: number;
    minimumActorCoverage: number;
    minimumActionDensityPer10Sec: number;
    minimumBitDensityPer10Sec?: number;
  };
}
