import { analyzeScriptForAssets } from "./AssetBrain.js";
import { synthesizePropVector, synthesizeCaricatureVector, synthesizeBackgroundVector } from "./VectorSynthesizer.js";
import { validateAndSanitizeSvg } from "./SvgValidator.js";
import { registerSynthesizedProp, registerSynthesizedCaricature, registerSynthesizedBackground, loadAssetFromCache } from "./DynamicAssetRegistry.js";
export async function forgeAssetsForScript(scriptText, options = {}) {
    const report = {
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
        const plan = await analyzeScriptForAssets(scriptText, options.customConfig);
        if (options.verbose) {
            console.log(`[AssetForge] Plan resolved: ${plan.novelProps.length} props, ${plan.novelCaricatures.length} caricatures, ${plan.novelBackgrounds.length} backgrounds`);
        }
        // 1. Synthesize Props
        for (const p of plan.novelProps) {
            try {
                const cached = loadAssetFromCache("prop", p.id);
                if (cached) {
                    registerSynthesizedProp(cached);
                    report.cachedHits.push(p.id);
                    continue;
                }
                if (options.verbose)
                    console.log(`[AssetForge] Synthesizing prop ${p.id} (${p.name})...`);
                const synthesized = await synthesizePropVector(p, options.customConfig);
                const val = validateAndSanitizeSvg(synthesized.svgFragment);
                if (!val.valid) {
                    report.errors.push(`Prop ${p.id} SVG validation failed: ${val.errors.join(", ")}`);
                    continue;
                }
                synthesized.svgFragment = val.sanitizedSvg;
                registerSynthesizedProp(synthesized);
                report.propsCreated.push(p.id);
            }
            catch (err) {
                report.errors.push(`Failed synthesizing prop ${p.id}: ${err.message}`);
            }
        }
        // 2. Synthesize Caricatures
        for (const c of plan.novelCaricatures) {
            try {
                const cached = loadAssetFromCache("caricature", c.id);
                if (cached) {
                    registerSynthesizedCaricature(cached);
                    report.cachedHits.push(c.id);
                    continue;
                }
                if (options.verbose)
                    console.log(`[AssetForge] Synthesizing caricature ${c.id} (${c.name})...`);
                const synthesized = await synthesizeCaricatureVector(c, options.customConfig);
                registerSynthesizedCaricature(synthesized);
                report.caricaturesCreated.push(c.id);
            }
            catch (err) {
                report.errors.push(`Failed synthesizing caricature ${c.id}: ${err.message}`);
            }
        }
        // 3. Synthesize Backgrounds
        for (const b of plan.novelBackgrounds) {
            try {
                const cached = loadAssetFromCache("background", b.id);
                if (cached) {
                    registerSynthesizedBackground(cached);
                    report.cachedHits.push(b.id);
                    continue;
                }
                if (options.verbose)
                    console.log(`[AssetForge] Synthesizing background ${b.id} (${b.name})...`);
                const synthesized = await synthesizeBackgroundVector(b, options.customConfig);
                const val = validateAndSanitizeSvg(synthesized.svgFragment);
                if (!val.valid) {
                    report.errors.push(`Background ${b.id} SVG validation failed: ${val.errors.join(", ")}`);
                    continue;
                }
                synthesized.svgFragment = val.sanitizedSvg;
                registerSynthesizedBackground(synthesized);
                report.backgroundsCreated.push(b.id);
            }
            catch (err) {
                report.errors.push(`Failed synthesizing background ${b.id}: ${err.message}`);
            }
        }
    }
    catch (err) {
        report.errors.push(`AssetForge pipeline execution error: ${err.message}`);
    }
    return report;
}
