import { callLlm, parseLlmJson, LlmConfig } from "./LlmClient.js";
import { PROP_GLOSS, BG_IDS } from "../director/LlmDirector.js";
import { CARICATURE_REGISTRY } from "../character/CaricatureEngine.js";

export interface NovelPropSpec {
  id: string;
  name: string;
  description: string;
  holdingStyle: "tabletop" | "held_one_hand" | "held_two_hands" | "ground";
  approximateDimensions: { width: number; height: number };
}

export interface NovelCaricatureSpec {
  id: string;
  name: string;
  archetype: string;
  description: string;
  signatureFeatures: {
    headwear?: string;
    facialHair?: string;
    clothing: string;
    expression?: string;
  };
}

export interface NovelBackgroundSpec {
  id: string;
  name: string;
  description: string;
  settingMood: string;
}

export interface AssetPlan {
  novelProps: NovelPropSpec[];
  novelCaricatures: NovelCaricatureSpec[];
  novelBackgrounds: NovelBackgroundSpec[];
}

export async function analyzeScriptForAssets(
  scriptText: string,
  customConfig?: LlmConfig
): Promise<AssetPlan> {
  const existingPropSummary = Object.entries(PROP_GLOSS)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  const existingBgs = BG_IDS.join(", ");
  const existingCaricatures = Object.keys(CARICATURE_REGISTRY).join(", ");

  const systemPrompt = `
You are the Lead Art Director and Visual Gag Designer for a 2D comedy animated series (Casually Explained / Alex Meyers / Sitcom style).
Your job is to read the provided script/transcript and decide what visual assets are needed to make the jokes and story visually hilarious and accurate.

Existing asset catalog:
- Backgrounds: ${existingBgs}
- Existing Props: ${existingPropSummary}
- Existing Character Archetypes: ${existingCaricatures}

Instructions:
1. ONLY request a novel asset if an existing asset is completely inadequate for the core gag or subject matter. If an existing asset fits (e.g. gym, phone, money), reuse it!
2. If the story mentions specific prominent items (e.g. "espresso machine", "laser gun", "chef pan", "space helmet", "trophy") or characters (e.g. "Gordon Ramsay", "astronaut", "chef", "detective"), specify them as novel assets.
3. Every prop ID MUST start with "PROP-" in uppercase (e.g. "PROP-ESPRESSO", "PROP-CHEF-PAN").
4. Every caricature ID MUST be lowercase alphanumeric with underscores (e.g. "gordon_ramsay", "astronaut").
5. Every background ID MUST start with "BG-" in uppercase (e.g. "BG-KITCHEN-STATION", "BG-SPACESHIP").
6. Output pure JSON matching the exact schema below. Do not wrap in markdown quotes.

JSON Schema:
{
  "novelProps": [
    {
      "id": "PROP-NAME",
      "name": "Human Name",
      "description": "Visual comedic details, colors, textures",
      "holdingStyle": "tabletop" | "held_one_hand" | "held_two_hands" | "ground",
      "approximateDimensions": { "width": 300, "height": 200 }
    }
  ],
  "novelCaricatures": [
    {
      "id": "char_id",
      "name": "Character Name",
      "archetype": "chef" | "worker" | "powerlifter" | "formal" | "casual",
      "description": "Visual silhouette and key traits",
      "signatureFeatures": {
        "headwear": "chef toque / helmet / cap (or none)",
        "facialHair": "mustache / beard / clean",
        "clothing": "description of outfit overlay",
        "expression": "furious / deadpan_classic / shocked / smug"
      }
    }
  ],
  "novelBackgrounds": [
    {
      "id": "BG-NAME",
      "name": "Background Name",
      "description": "Horizon line, wall colors, floor texture, props in background",
      "settingMood": "industrial / corporate / clinical / comic"
    }
  ]
}
`.trim();

  const userPrompt = `Script Content:\n${scriptText}`;

  const rawJson = await callLlm(
    {
      systemPrompt,
      userPrompt,
      temperature: 0.1,
      jsonMode: true,
    },
    customConfig
  );

  try {
    const parsed = parseLlmJson<AssetPlan>(rawJson);
    return {
      novelProps: Array.isArray(parsed.novelProps) ? parsed.novelProps : [],
      novelCaricatures: Array.isArray(parsed.novelCaricatures) ? parsed.novelCaricatures : [],
      novelBackgrounds: Array.isArray(parsed.novelBackgrounds) ? parsed.novelBackgrounds : [],
    };
  } catch (err) {
    console.warn("AssetBrain failed to parse LLM response, returning empty asset plan:", err);
    return { novelProps: [], novelCaricatures: [], novelBackgrounds: [] };
  }
}
