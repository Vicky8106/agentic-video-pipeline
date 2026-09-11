import { ScriptBeat } from "./BeatSegmenter.js";
import { callLlm, parseLlmJson, LlmConfig } from "./LlmClient.js";
import { PROP_GLOSS, BG_IDS } from "../director/LlmDirector.js";
import { CARICATURE_REGISTRY } from "../character/CaricatureEngine.js";

export interface BeatVisualSpec {
  beatIndex: number;
  startSec: number;
  endSec: number;
  text: string;
  visualGag: string;
  propId: string | null;
  propDescription?: string;
  bgId: string;
  characterId: string;
  bannerText: string | null;
}

export async function extractBeatVisualsChunk(
  beatsChunk: ScriptBeat[],
  customConfig?: LlmConfig
): Promise<BeatVisualSpec[]> {
  const existingPropSummary = Object.entries(PROP_GLOSS)
    .map(([k, v]) => `${k} (${v})`)
    .join("; ");
  const existingBgs = BG_IDS.join(", ");
  const existingCaricatures = Object.keys(CARICATURE_REGISTRY).join(", ");

  const systemPrompt = `
You are the Lead Visual Gag Director for a 2D comedy explainer animation (Casually Explained / Alex Meyers style).
You are given a sequence of comedic script beats (each 5-10s long).
For EVERY SINGLE BEAT in the sequence, you must specify:
1. visualGag: A punchy 1-sentence description of the visual gag or visual metaphor on screen.
2. propId: An existing prop ID OR a novel prop ID (must start with "PROP-", e.g. "PROP-BALANCE-SCALE", "PROP-TEA-CUP", "PROP-TOP-HAT", "PROP-TV-1950S", "PROP-POPCORN"). If no prop is needed, set to null.
3. propDescription: If a novel prop, describe its visual comedic appearance in 1 sentence.
4. bgId: The background ID (e.g. "BG-GYM", "BG-STUDIO", "BG-CLINIC", "BG-OFFICE", "BG-NEWS-DESK", "BG-COURT", etc.).
5. characterId: The character on screen (e.g. "anatoly", "bodybuilder", "dr_mike", "host", "chef", "detective").
6. bannerText: A punchy 1-4 word staged label or null.

Existing Verified Assets:
- Props: ${existingPropSummary}
- Backgrounds: ${existingBgs}
- Characters: ${existingCaricatures}

IMPORTANT: Do NOT summarize the beats into one! Output one entry per beat in the exact JSON schema.
Return JSON ONLY:
{
  "visuals": [
    {
      "beatIndex": 1,
      "visualGag": "...",
      "propId": "PROP-NAME" | null,
      "propDescription": "...",
      "bgId": "BG-NAME",
      "characterId": "char_id",
      "bannerText": "..." | null
    }
  ]
}
`.trim();

  const userPrompt = `
Beats to direct:
${beatsChunk.map((b) => `Beat #${b.beatIndex} [${b.startSec}s - ${b.endSec}s]: "${b.text}"`).join("\n\n")}
`.trim();

  const rawJson = await callLlm(
    {
      systemPrompt,
      userPrompt,
      temperature: 0.2,
      jsonMode: true,
      timeoutMs: 40000,
    },
    customConfig
  );

  try {
    const parsed = parseLlmJson<{ visuals: BeatVisualSpec[] }>(rawJson);
    const list = Array.isArray(parsed.visuals) ? parsed.visuals : [];

    // Map back with time bounds
    return beatsChunk.map((b) => {
      const match = list.find((v) => v.beatIndex === b.beatIndex);
      return {
        beatIndex: b.beatIndex,
        startSec: b.startSec,
        endSec: b.endSec,
        text: b.text,
        visualGag: match?.visualGag || "Standard host narration",
        propId: match?.propId || null,
        propDescription: match?.propDescription || undefined,
        bgId: match?.bgId || "BG-STUDIO",
        characterId: match?.characterId || "host",
        bannerText: match?.bannerText || null,
      };
    });
  } catch (err) {
    console.warn("extractBeatVisualsChunk parse fallback:", err);
    return beatsChunk.map((b) => ({
      beatIndex: b.beatIndex,
      startSec: b.startSec,
      endSec: b.endSec,
      text: b.text,
      visualGag: "Host narration",
      propId: null,
      bgId: "BG-STUDIO",
      characterId: "host",
      bannerText: null,
    }));
  }
}

export async function extractFullBeatManifest(
  beats: ScriptBeat[],
  chunkSize = 12,
  customConfig?: LlmConfig
): Promise<BeatVisualSpec[]> {
  const allVisuals: BeatVisualSpec[] = [];

  for (let i = 0; i < beats.length; i += chunkSize) {
    const chunk = beats.slice(i, i + chunkSize);
    console.log(`[BeatManifest] Analyzing beats ${chunk[0].beatIndex} to ${chunk[chunk.length - 1].beatIndex} of ${beats.length}...`);
    const visuals = await extractBeatVisualsChunk(chunk, customConfig);
    allVisuals.push(...visuals);
  }

  return allVisuals;
}
