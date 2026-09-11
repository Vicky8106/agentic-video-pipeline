import { callLlm, LlmConfig } from "./LlmClient.js";
import { NovelPropSpec, NovelCaricatureSpec, NovelBackgroundSpec } from "./AssetBrain.js";

export interface SynthesizedProp {
  id: string;
  name: string;
  svgFragment: string;
  gripX: number;
  gripY: number;
  gripAngle: number;
  holdingStyle: string;
}

export interface SynthesizedCaricature {
  id: string;
  name: string;
  headwearSvg: string;
  facialSvg: string;
  torsoSvg: string;
  proportions?: {
    headScale?: number;
    torsoWidth?: number;
    shoulderWidth?: number;
    trapBulge?: number;
  };
}

export interface SynthesizedBackground {
  id: string;
  name: string;
  svgFragment: string;
}

export async function synthesizePropVector(
  spec: NovelPropSpec,
  customConfig?: LlmConfig
): Promise<SynthesizedProp> {
  const systemPrompt = `
You are the Master Vector Artist for a broadcast-grade 2D comedy animation engine.
Your task is to write clean, volumetric SVG code for a prop.

Design Tokens & Aesthetic Constraints:
1. Style: Clean 2D cartoon / sitcom look (Casually Explained / Alex Meyers / Cuphead / Rick & Morty).
2. Stroke weights:
   - Outer silhouette / boundary strokes: stroke-width="6" or "7", stroke="#0f172a", stroke-linecap="round", stroke-linejoin="round".
   - Interior details & creases: stroke-width="3.5" or "4", stroke="#1e293b".
3. Palette: Vibrant, flat cartoon fills (#ef4444, #3b82f6, #f59e0b, #10b981, #e2e8f0, etc.). Include a bright highlight shape (<path fill="#ffffff" opacity="0.35"/>) and a contact drop shadow at the bottom (<ellipse cx="..." cy="..." rx="..." ry="..." fill="#000000" opacity="0.2"/>).
4. Canonical ViewBox: Center the prop in viewBox="0 0 400 300".
5. Grip Coordinate: Determine the exact coordinate (gripX, gripY) where a cartoon hand should grasp the prop (e.g. the handle of a mug, shaft of a tool, grip of a racket).
6. Return JSON ONLY:
{
  "gripX": 200,
  "gripY": 180,
  "gripAngle": 0,
  "svgFragment": "<g id=\\"PROP-NAME\\"> ... </g>"
}
Do NOT include outer <svg> wrapper; output the <g> element containing paths, rects, ellipses.
`.trim();

  const userPrompt = `
Generate SVG for Prop:
ID: ${spec.id}
Name: ${spec.name}
Description: ${spec.description}
Holding Style: ${spec.holdingStyle}
`.trim();

  const rawJson = await callLlm(
    {
      systemPrompt,
      userPrompt,
      temperature: 0.1,
      jsonMode: true,
    },
    customConfig
  );

  const clean = rawJson.replace(/```(?:json)?\s*([\s\S]*?)```/i, "$1").trim();
  const parsed = JSON.parse(clean);

  return {
    id: spec.id,
    name: spec.name,
    svgFragment: parsed.svgFragment || `<g id="${spec.id}"><rect x="100" y="100" width="200" height="100" fill="#94a3b8" stroke="#0f172a" stroke-width="5"/></g>`,
    gripX: Number(parsed.gripX) || 200,
    gripY: Number(parsed.gripY) || 150,
    gripAngle: Number(parsed.gripAngle) || 0,
    holdingStyle: spec.holdingStyle,
  };
}

export async function synthesizeCaricatureVector(
  spec: NovelCaricatureSpec,
  customConfig?: LlmConfig
): Promise<SynthesizedCaricature> {
  const systemPrompt = `
You are the Lead Character Designer for a 2D comedy animation engine.
You are designing modular vector SVG overlays for a stylized stickman character rig.
The stickman has a round peach head (radius ~36px, eyes around y=-16..-14, eyebrows around y=-48) and a stick torso from (0, 36) to (0, 160).

Overlays Needed:
1. headwearSvg: Hat, cap, helmet, or hairstyle positioned to fit over the head (center 0,0; head top is around y=-36..-50). Outer stroke stroke-width="5" stroke="#0f172a".
2. facialSvg: Facial features such as signature mustache, beard, goatee, glasses, or facial scars around y=-15..+25.
3. torsoSvg: Chest/clothing overlay (e.g. chef coat, apron, space suit torso, lab coat, uniform) centered at x=0, y=36 to y=150.
4. proportions: optional modifiers { "headScale": 1.0, "torsoWidth": 40, "shoulderWidth": 60, "trapBulge": 0 }.

Return JSON ONLY:
{
  "headwearSvg": "<g id=\\"headwear\\">...</g>",
  "facialSvg": "<g id=\\"facial\\">...</g>",
  "torsoSvg": "<g id=\\"torso\\">...</g>",
  "proportions": { "headScale": 1.0, "shoulderWidth": 50, "torsoWidth": 40, "trapBulge": 0 }
}
`.trim();

  const userPrompt = `
Design Caricature Overlays for:
ID: ${spec.id}
Name: ${spec.name}
Archetype: ${spec.archetype}
Description: ${spec.description}
Signature Features: ${JSON.stringify(spec.signatureFeatures)}
`.trim();

  const rawJson = await callLlm(
    {
      systemPrompt,
      userPrompt,
      temperature: 0.1,
      jsonMode: true,
    },
    customConfig
  );

  const clean = rawJson.replace(/```(?:json)?\s*([\s\S]*?)```/i, "$1").trim();
  const parsed = JSON.parse(clean);

  return {
    id: spec.id,
    name: spec.name,
    headwearSvg: parsed.headwearSvg || "",
    facialSvg: parsed.facialSvg || "",
    torsoSvg: parsed.torsoSvg || "",
    proportions: parsed.proportions || {},
  };
}

export async function synthesizeBackgroundVector(
  spec: NovelBackgroundSpec,
  customConfig?: LlmConfig
): Promise<SynthesizedBackground> {
  const systemPrompt = `
You are the Background Layout Artist for a 2D comedy animation engine.
Write a full 1280x720 SVG background stage layout.

Design Constraints:
1. viewBox="0 0 1280 720".
2. Floor horizon at y=520 to 560.
3. Solid cartoon background walls with architectural details (windows, posters, counters, panels).
4. Strokes: stroke-width="4" or "5", stroke="#1e293b".
5. Mood lighting: subtle floor shadows, gradients, or ambient glow.
6. Return JSON ONLY:
{
  "svgFragment": "<g id=\\"${spec.id}\\"> ... </g>"
}
`.trim();

  const userPrompt = `
Design Background Stage for:
ID: ${spec.id}
Name: ${spec.name}
Description: ${spec.description}
Mood: ${spec.settingMood}
`.trim();

  const rawJson = await callLlm(
    {
      systemPrompt,
      userPrompt,
      temperature: 0.1,
      jsonMode: true,
    },
    customConfig
  );

  const clean = rawJson.replace(/```(?:json)?\s*([\s\S]*?)```/i, "$1").trim();
  const parsed = JSON.parse(clean);

  return {
    id: spec.id,
    name: spec.name,
    svgFragment: parsed.svgFragment || `<g id="${spec.id}"><rect width="1280" height="720" fill="#f8fafc"/><line x1="0" y1="540" x2="1280" y2="540" stroke="#cbd5e1" stroke-width="4"/></g>`,
  };
}
