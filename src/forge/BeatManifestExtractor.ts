import { ScriptBeat } from "./BeatSegmenter.js";
import { callLlm, parseLlmJson, LlmConfig } from "./LlmClient.js";
import { PROP_GLOSS, BG_IDS } from "../director/LlmDirector.js";
import { CARICATURE_REGISTRY } from "../character/CaricatureEngine.js";

export type CameraShotType =
  | "wide_two_shot"
  | "host_reaction"
  | "subject_focus"
  | "prop_macro"
  | "dramatic_climax";

export type CameraMoveType =
  | "static_hold"
  | "slow_push_in"
  | "pan_to_subject"
  | "snap_cut";

export type CameraTransitionType =
  | "cut"
  | "dissolve"
  | "whip_pan";

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
  cameraShot?: CameraShotType;
  cameraMove?: CameraMoveType;
  transition?: CameraTransitionType;
  energy?: number;
  impactShake?: boolean;
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
You are the Lead Cinematographer & Visual Gag Director for a 2D comedy explainer animation (Casually Explained / Alex Meyers style).
You are given a sequence of comedic script beats (each 5-10s long).
For EVERY SINGLE BEAT in the sequence, you must direct visual storytelling and camera choreography:
1. visualGag: A punchy 1-sentence description of the visual gag or visual metaphor on screen.
2. propId: An existing prop ID OR a novel prop ID (must start with "PROP-", e.g. "PROP-BALANCE-SCALE", "PROP-TEA-CUP", "PROP-TOP-HAT", "PROP-TV-1950S", "PROP-POPCORN"). If no prop is needed, set to null.
3. propDescription: If a novel prop, describe its visual comedic appearance in 1 sentence.
4. bgId: The background ID (e.g. "BG-GYM", "BG-STUDIO", "BG-CLINIC", "BG-OFFICE", "BG-NEWS-DESK", "BG-COURT", etc.).
5. characterId: The character on screen (e.g. "anatoly", "bodybuilder", "dr_mike", "host", "chef", "detective").
6. bannerText: A punchy 1-4 word staged label or null.
7. cameraShot: Comedic camera framing:
   - "wide_two_shot": Establishing banter or wide stage with host and co-star.
   - "host_reaction": Close-up on host for deadpan, skepticism, eyebrow raise, or shock.
   - "subject_focus": Medium punch-in framing the guest/co-star on the right.
   - "prop_macro": Extreme macro close-up framing the punchline prop.
   - "dramatic_climax": Peak climax punchline framing with maximum zoom.
8. cameraMove: Dynamic camera move during the beat:
   - "static_hold": Completely steady locked-off shot. Zero jitter.
   - "slow_push_in": Smooth dramatic push-in as tension builds.
   - "pan_to_subject": Smooth horizontal pan from host to the subject/prop.
   - "snap_cut": Instant 1-frame jump cut on the beat boundary for comedic surprise.
9. transition: "cut" | "dissolve" | "whip_pan".
10. energy: Comedic energy number from 0.1 (calm deadpan) to 1.0 (peak chaotic punchline).
11. impactShake: boolean. ONLY true if there is an actual physical collision/slam/crash (e.g. barbell dropped, table smashed).

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
      "bannerText": "..." | null,
      "cameraShot": "wide_two_shot" | "host_reaction" | "subject_focus" | "prop_macro" | "dramatic_climax",
      "cameraMove": "static_hold" | "slow_push_in" | "pan_to_subject" | "snap_cut",
      "transition": "cut" | "dissolve" | "whip_pan",
      "energy": 0.5,
      "impactShake": false
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

    // Map back with time bounds and camera defaults
    return beatsChunk.map((b) => {
      const match = list.find((v) => v.beatIndex === b.beatIndex);
      const defaultShot: CameraShotType = match?.propId
        ? "prop_macro"
        : match?.characterId && match.characterId !== "host"
        ? "subject_focus"
        : "wide_two_shot";

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
        cameraShot: match?.cameraShot || defaultShot,
        cameraMove: match?.cameraMove || "static_hold",
        transition: match?.transition || "cut",
        energy: typeof match?.energy === "number" ? match.energy : 0.4,
        impactShake: Boolean(match?.impactShake),
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
      cameraShot: "wide_two_shot",
      cameraMove: "static_hold",
      transition: "cut",
      energy: 0.4,
      impactShake: false,
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
