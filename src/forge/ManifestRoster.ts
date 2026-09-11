import { BeatVisualSpec } from "./BeatManifestExtractor.js";
import { PROP_IDS, BG_IDS } from "../director/LlmDirector.js";
import { CARICATURE_REGISTRY } from "../character/CaricatureEngine.js";
import { loadAssetFromCache } from "./DynamicAssetRegistry.js";

export interface RosterItem {
  id: string;
  description?: string;
  beatOccurrences: number[];
  isNovel: boolean;
  inCache: boolean;
}

export interface ProductionBOM {
  totalBeats: number;
  totalDurationSec: number;
  props: RosterItem[];
  backgrounds: RosterItem[];
  characters: RosterItem[];
  counts: {
    uniqueProps: number;
    uniqueBackgrounds: number;
    uniqueCharacters: number;
    totalUniqueAssets: number;
    novelPropsToSynthesize: number;
    novelBackgroundsToSynthesize: number;
    novelCaricaturesToSynthesize: number;
  };
}

export function compileProductionBOM(visuals: BeatVisualSpec[]): ProductionBOM {
  const propMap = new Map<string, { description?: string; beats: number[] }>();
  const bgMap = new Map<string, number[]>();
  const charMap = new Map<string, number[]>();

  let totalDuration = 0;
  for (const v of visuals) {
    if (v.endSec > totalDuration) totalDuration = v.endSec;

    // Track Prop
    if (v.propId) {
      const pId = v.propId.toUpperCase().trim();
      const entry = propMap.get(pId) || { description: v.propDescription, beats: [] };
      entry.beats.push(v.beatIndex);
      if (v.propDescription && !entry.description) entry.description = v.propDescription;
      propMap.set(pId, entry);
    }

    // Track Background
    const bgId = v.bgId.toUpperCase().trim();
    const bgBeats = bgMap.get(bgId) || [];
    bgBeats.push(v.beatIndex);
    bgMap.set(bgId, bgBeats);

    // Track Character
    const charId = v.characterId.toLowerCase().trim();
    const charBeats = charMap.get(charId) || [];
    charBeats.push(v.beatIndex);
    charMap.set(charId, charBeats);
  }

  // Check verified catalogs and disk cache
  const props: RosterItem[] = Array.from(propMap.entries()).map(([id, entry]) => {
    const normalized = id.replace(/_/g, "-");
    const isVerified = PROP_IDS.has(id) || PROP_IDS.has(normalized);
    const inCache = loadAssetFromCache("prop", id) !== null || loadAssetFromCache("prop", normalized) !== null;
    return {
      id,
      description: entry.description,
      beatOccurrences: entry.beats,
      isNovel: !isVerified && !inCache,
      inCache,
    };
  });

  const backgrounds: RosterItem[] = Array.from(bgMap.entries()).map(([id, beats]) => {
    const isVerified = BG_IDS.includes(id as any);
    const inCache = loadAssetFromCache("background", id) !== null;
    return {
      id,
      beatOccurrences: beats,
      isNovel: !isVerified && !inCache,
      inCache,
    };
  });

  const characters: RosterItem[] = Array.from(charMap.entries()).map(([id, beats]) => {
    const isVerified = CARICATURE_REGISTRY[id] !== undefined || ["host", "male", "female"].includes(id);
    const inCache = loadAssetFromCache("caricature", id) !== null;
    return {
      id,
      beatOccurrences: beats,
      isNovel: !isVerified && !inCache,
      inCache,
    };
  });

  const novelPropsToSynthesize = props.filter((p) => p.isNovel).length;
  const novelBackgroundsToSynthesize = backgrounds.filter((b) => b.isNovel).length;
  const novelCaricaturesToSynthesize = characters.filter((c) => c.isNovel).length;

  return {
    totalBeats: visuals.length,
    totalDurationSec: totalDuration,
    props,
    backgrounds,
    characters,
    counts: {
      uniqueProps: props.length,
      uniqueBackgrounds: backgrounds.length,
      uniqueCharacters: characters.length,
      totalUniqueAssets: props.length + backgrounds.length + characters.length,
      novelPropsToSynthesize,
      novelBackgroundsToSynthesize,
      novelCaricaturesToSynthesize,
    },
  };
}
