import { StickFigureState } from "../character/StickFigure";
import { Camera } from "../camera/Camera";

export interface SceneContext {
  timeSec: number;
  sceneTime: number; // seconds since start of this scene
  progress: number; // 0 to 1
  talkingFlap: number; // 0 to 1 for speech flapping
  camera: Camera;
}

export type SceneRenderContext = SceneContext;
export type Scene = SceneModule;

export interface SceneRenderOutput {
  backgroundSvg: string;
  foregroundSvg?: string;
  hostState?: StickFigureState;
  stickFigures?: Array<{ id: string; state: StickFigureState }>;
  cameraTarget?: { x: number; y: number; zoom: number };
  shake?: number;
}

export interface SceneModule {
  id: number | string;
  name: string;
  startTime: number;
  endTime: number;
  render: (ctx: SceneContext) => SceneRenderOutput;
}
