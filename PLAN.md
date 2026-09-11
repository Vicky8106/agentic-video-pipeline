# PLAN: Beat-by-Beat Asset Manifest & Synthesis Engine

## Problem Statement
A single macro-prompt over a 30,000-character, 16-minute script causes Macro Summarization Bias, reducing a 72-scene comedy film to just 5-6 broad theme items. A broadcast-grade 16-minute animated video requires a complete Production Bill of Materials of 50–100 distinct visual assets (props, stage environments, and character archetypes) corresponding to individual 5–10 second comedic beats.

## System Architecture

```
Script (SRT) ──> [BeatSegmenter] (Chunks into ~60-80 discrete 5-10s beats)
                       │
                       ▼
            [BeatManifestExtractor] (Processes in act-sized batches of 10-15 beats)
                       │
                       ▼
          [ProductionBillOfMaterials] (50-100 unique assets mapped to beat IDs)
                       │
                       ▼
         [CatalogDeduplicator & Filter] (Separates existing library vs missing assets)
                       │
                       ▼
           [BatchVectorSynthesizer] (Sequentially synthesizes missing SVGs with retry backoff)
                       │
                       ▼
         [DynamicAssetRegistry & Cache] (.asset_cache & live mounting into runtime libraries)
```

## Module Specifications

1. `src/forge/BeatSegmenter.ts`:
   - Segments raw SRT into contiguous comedic beat windows (target 6–10s, min 4s, max 14s).
   - Guarantees 100% time coverage [0, duration] with zero gaps.

2. `src/forge/BeatManifestExtractor.ts`:
   - Analyzes beats in focused act/sequence chunks (10–15 beats per LLM call).
   - Determines the specific visual metaphor, required prop, and background for each beat.
   - Prevents macro-summarization bias.

3. `src/forge/ManifestRoster.ts`:
   - Compiles the full Production Bill of Materials.
   - Tracks which beats utilize which assets, frequency counts, and holding styles.
   - Deduplicates against existing verified catalogs.

4. `src/forge/BatchSynthesizer.ts`:
   - Synthesizes missing novel assets in a controlled sequential queue.
   - Handles rate limits and retries.
   - Validates each SVG with `SvgValidator` before registering.

5. Integration into `ScriptAssetPipeline.ts` & `generate-auto.ts`:
   - When a full script is processed, it generates the full beat-by-beat manifest and synthesizes all missing assets.
