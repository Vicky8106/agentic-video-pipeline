# PLAN: LLM Asset Forge Engine

## Problem Statement
The current pipeline relies on a closed catalog of ~25 props, ~15 backgrounds, and a fixed set of caricatures. When a new script introduces un-cataloged entities (e.g. an espresso machine, an astronaut helmet, a medieval sword, or a chef's kitchen), the engine either omits them or falls back to generic stick figures. The user wants the LLM to act as the "brain" to dynamically design and generate brand-new, broadcast-ready vector assets for any drop-in script automatically.

## Architecture

```
Script (SRT / Text)
      │
      ▼
[AssetBrain: Script Entity Analyzer] ──(LLM)──> Extracts missing characters, props, settings
      │
      ▼
[VectorSynthesizer: SVG Generator] ──(LLM)──> Generates 4px/7px stroke compliant SVG code + grip anchors
      │
      ▼
[SvgValidator & Sanitizer] ──> Verifies XML, enforces viewBox, bounds, and security
      │
      ▼
[DynamicAssetRegistry] ──> Persists to cache & registers into PropLibrary, CaricatureEngine, BackgroundLibrary
      │
      ▼
[AutoProduction & Director] ──> Renders video utilizing the freshly synthesized assets
```

## Module Boundaries

1. `src/forge/LlmClient.ts`:
   - Unified multi-provider LLM caller supporting Gemini (`gemini-flash-latest`), OpenAI/NVIDIA, and Anthropic. Reads keys from environment or `/root/.env`.
2. `src/forge/AssetBrain.ts`:
   - Analyzes script/transcript sentences against existing catalogs (`PROP_IDS`, `BG_IDS`, `CARICATURE_PROFILES`).
   - Identifies required new props, custom caricature archetypes, or backgrounds.
3. `src/forge/VectorSynthesizer.ts`:
   - Prompts the LLM with strict vector design tokens:
     - 4px inner detail strokes, 7px outer contour strokes
     - Bounding boxes and aspect ratios
     - Grip metadata `{ gripX, gripY, gripAngle }` for prop manipulation by `HandRig`
     - Valid SVG fragments (`<g>...</g>`)
4. `src/forge/SvgValidator.ts`:
   - XML parsing validation, strip unsafe tags (`<script>`, event handlers).
   - Validates coordinates, stroke-width tokens, and dimensions.
5. `src/forge/DynamicAssetRegistry.ts`:
   - In-memory and on-disk caching (`.asset_cache/`).
   - Dynamic injection into `PropLibrary`, `BackgroundLibrary`, and `CaricatureEngine`.
6. `src/forge/ScriptAssetPipeline.ts`:
   - High-level orchestrator: `forgeAssetsForScript(transcript, options)`.
   - Wired directly into `AutoProduction.ts` and `generate-auto.ts`.

## Test Plan & Verification
1. `scripts/test-asset-brain.ts` (GATE-FORGE-01)
2. `scripts/test-vector-synthesizer.ts` (GATE-FORGE-02)
3. `scripts/test-asset-registry.ts` (GATE-FORGE-03)
4. `scripts/test-asset-forge-e2e.ts` (GATE-FORGE-04)
