import { createStyleRegistry } from "./StylePack";
import { casuallyExplainedStyle } from "./casually-explained";
import { casuallyProceduralStyle } from "./casually-procedural";
export const STYLE_REGISTRY = createStyleRegistry([casuallyExplainedStyle, casuallyProceduralStyle]);
export { createStyleRegistry, resolveStyle } from "./StylePack";
