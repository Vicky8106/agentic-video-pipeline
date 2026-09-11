import { analyzeScriptForAssets, AssetPlan } from "./AssetBrain.js";
import { synthesizePropVector, synthesizeCaricatureVector, synthesizeBackgroundVector, SynthesizedProp, SynthesizedCaricature, SynthesizedBackground } from "./VectorSynthesizer.js";
import { validateAndSanitizeSvg } from "./SvgValidator.js";
import { registerSynthesizedProp, registerSynthesizedCaricature, registerSynthesizedBackground, loadAssetFromCache } from "./DynamicAssetRegistry.js";
import { LlmConfig } from "./LlmClient.js";
import { segmentScriptIntoBeats, ScriptBeat } from "./BeatSegmenter.js";
import { extractFullBeatManifest, BeatVisualSpec } from "./BeatManifestExtractor.js";
import { compileProductionBOM, ProductionBOM } from "./ManifestRoster.js";
import { batchSynthesizeBOM, BatchSynthesisReport } from "./BatchSynthesizer.js";
export { manifestToDirectorSheet } from "./DirectorSheetAdapter.js";

export interface ForgeOptions {
  customConfig?: LlmConfig;
  dryRun?: boolean;
  verbose?: boolean;
}

export interface ForgeReport {
  propsCreated: string[];
  caricaturesCreated: string[];
  backgroundsCreated: string[];
  cachedHits: string[];
  errors: string[];
}

export async function forgeAssetsForScript(
  scriptText: string,
  options: ForgeOptions = {}
): Promise<ForgeReport> {
  const report: ForgeReport = {
    propsCreated: [],
    caricaturesCreated: [],
    backgroundsCreated: [],
    cachedHits: [],
    errors: [],
  };

  try {
    if (options.verbose) {
      console.log("[AssetForge] Analyzing script for required visual assets...");
    }

    const plan: AssetPlan = await analyzeScriptForAssets(scriptText, options.customConfig);

    if (options.verbose) {
      console.log(`[AssetForge] Plan resolved: ${plan.novelProps.length} props, ${plan.novelCaricatures.length} caricatures, ${plan.novelBackgrounds.length} backgrounds`);
    }

    // 1. Synthesize Props
    for (const p of plan.novelProps) {
      try {
        const cached = loadAssetFromCache<SynthesizedProp>("prop", p.id);
        if (cached) {
          registerSynthesizedProp(cached);
          report.cachedHits.push(p.id);
          continue;
        }

        if (options.verbose) console.log(`[AssetForge] Synthesizing prop ${p.id} (${p.name})...`);
        const synthesized = await synthesizePropVector(p, options.customConfig);
        const val = validateAndSanitizeSvg(synthesized.svgFragment);
        if (!val.valid) {
          report.errors.push(`Prop ${p.id} SVG validation failed: ${val.errors.join(", ")}`);
          continue;
        }
        synthesized.svgFragment = val.sanitizedSvg;
        registerSynthesizedProp(synthesized);
        report.propsCreated.push(p.id);
      } catch (err: any) {
        report.errors.push(`Failed synthesizing prop ${p.id}: ${err.message}`);
      }
    }

    // 2. Synthesize Caricatures
    for (const c of plan.novelCaricatures) {
      try {
        const cached = loadAssetFromCache<SynthesizedCaricature>("caricature", c.id);
        if (cached) {
          registerSynthesizedCaricature(cached);
          report.cachedHits.push(c.id);
          continue;
        }

        if (options.verbose) console.log(`[AssetForge] Synthesizing caricature ${c.id} (${c.name})...`);
        const synthesized = await synthesizeCaricatureVector(c, options.customConfig);
        registerSynthesizedCaricature(synthesized);
        report.caricaturesCreated.push(c.id);
      } catch (err: any) {
        report.errors.push(`Failed synthesizing caricature ${c.id}: ${err.message}`);
      }
    }

    // 3. Synthesize Backgrounds
    for (const b of plan.novelBackgrounds) {
      try {
        const cached = loadAssetFromCache<SynthesizedBackground>("background", b.id);
        if (cached) {
          registerSynthesizedBackground(cached);
          report.cachedHits.push(b.id);
          continue;
        }

        if (options.verbose) console.log(`[AssetForge] Synthesizing background ${b.id} (${b.name})...`);
        const synthesized = await synthesizeBackgroundVector(b, options.customConfig);
        const val = validateAndSanitizeSvg(synthesized.svgFragment);
        if (!val.valid) {
          report.errors.push(`Background ${b.id} SVG validation failed: ${val.errors.join(", ")}`);
          continue;
        }
        synthesized.svgFragment = val.sanitizedSvg;
        registerSynthesizedBackground(synthesized);
        report.backgroundsCreated.push(b.id);
      } catch (err: any) {
        report.errors.push(`Failed synthesizing background ${b.id}: ${err.message}`);
      }
    }
  } catch (err: any) {
    report.errors.push(`AssetForge pipeline execution error: ${err.message}`);
  }

  return report;
}

export interface ManifestPipelineOptions {
  beatDurationSec?: number;
  batchSize?: number;
  customConfig?: LlmConfig;
  verbose?: boolean;
}

export interface ManifestPipelineResult {
  beats: ScriptBeat[];
  manifest: BeatVisualSpec[];
  bom: ProductionBOM;
  synthesisReport: BatchSynthesisReport;
}

/**
 * High-precision Beat-by-Beat Manifest & Production Bill of Materials pipeline.
 * Decomposes script into granular comedic beats (4-10s), extracts visual gags & assets
 * per beat, compiles the production roster (50-100 assets for long scripts),
 * and batch-synthesizes all novel assets using the LLM.
 */
export async function forgeManifestForScript(
  scriptOrSrtText: string,
  options: ManifestPipelineOptions = {}
): Promise<ManifestPipelineResult> {
  const beatSec = options.beatDurationSec ?? 8.0;
  const batchSize = options.batchSize ?? 10;

  if (options.verbose) {
    console.log(`[ManifestPipeline] Segmenting script into ${beatSec}s comedic beats...`);
  }
  const beats = segmentScriptIntoBeats(scriptOrSrtText, beatSec);

  if (options.verbose) {
    console.log(`[ManifestPipeline] Total beats: ${beats.length}. Extracting visual manifest in batches of ${batchSize}...`);
  }
  const manifest = await extractFullBeatManifest(beats, batchSize, options.customConfig);

  if (options.verbose) {
    console.log(`[ManifestPipeline] Compiling Production Bill of Materials across ${manifest.length} beats...`);
  }
  const bom = compileProductionBOM(manifest);

  if (options.verbose) {
    console.log(`[ManifestPipeline] Production BOM resolved:`, bom.counts);
    console.log(`[ManifestPipeline] Batch synthesizing novel assets...`);
  }
  const synthesisReport = await batchSynthesizeBOM(bom, {
    customConfig: options.customConfig,
    onProgress: options.verbose ? (msg) => console.log(`[ManifestPipeline] ${msg}`) : undefined,
  });

  return {
    beats,
    manifest,
    bom,
    synthesisReport,
  };
}
