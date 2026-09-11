import { ProductionBOM, RosterItem } from "./ManifestRoster.js";
import { synthesizePropVector, synthesizeCaricatureVector, synthesizeBackgroundVector } from "./VectorSynthesizer.js";
import { validateAndSanitizeSvg } from "./SvgValidator.js";
import { registerSynthesizedProp, registerSynthesizedCaricature, registerSynthesizedBackground } from "./DynamicAssetRegistry.js";
import { LlmConfig } from "./LlmClient.js";

export interface BatchSynthesisReport {
  propsSynthesized: string[];
  backgroundsSynthesized: string[];
  caricaturesSynthesized: string[];
  skippedExisting: string[];
  errors: string[];
}

export async function batchSynthesizeBOM(
  bom: ProductionBOM,
  options: { customConfig?: LlmConfig; maxConcurrency?: number; onProgress?: (msg: string) => void } = {}
): Promise<BatchSynthesisReport> {
  const report: BatchSynthesisReport = {
    propsSynthesized: [],
    backgroundsSynthesized: [],
    caricaturesSynthesized: [],
    skippedExisting: [],
    errors: [],
  };

  const notify = options.onProgress || ((msg: string) => console.log(`[BatchSynthesizer] ${msg}`));

  // 1. Synthesize Novel Props
  const novelProps = bom.props.filter((p) => p.isNovel);
  notify(`Starting synthesis for ${novelProps.length} novel props...`);

  for (let i = 0; i < novelProps.length; i++) {
    const item = novelProps[i];
    try {
      notify(`[${i + 1}/${novelProps.length}] Synthesizing prop ${item.id}...`);
      const synthesized = await synthesizePropVector(
        {
          id: item.id,
          name: item.id.replace("PROP-", "").replace(/-/g, " "),
          description: item.description || `Tactile 2D comedic prop for ${item.id}`,
          holdingStyle: "held_one_hand",
          approximateDimensions: { width: 300, height: 200 },
        },
        options.customConfig
      );

      const val = validateAndSanitizeSvg(synthesized.svgFragment);
      if (val.valid) {
        synthesized.svgFragment = val.sanitizedSvg;
        registerSynthesizedProp(synthesized);
        report.propsSynthesized.push(item.id);
      } else {
        report.errors.push(`Prop ${item.id} SVG invalid: ${val.errors.join(", ")}`);
      }
    } catch (err: any) {
      report.errors.push(`Failed synthesizing prop ${item.id}: ${err.message}`);
    }
    // Polite 500ms breather to prevent rate limits
    await new Promise((r) => setTimeout(r, 500));
  }

  // 2. Synthesize Novel Backgrounds
  const novelBgs = bom.backgrounds.filter((b) => b.isNovel);
  if (novelBgs.length > 0) {
    notify(`Starting synthesis for ${novelBgs.length} novel backgrounds...`);
    for (let i = 0; i < novelBgs.length; i++) {
      const item = novelBgs[i];
      try {
        notify(`[${i + 1}/${novelBgs.length}] Synthesizing background ${item.id}...`);
        const synthesized = await synthesizeBackgroundVector(
          {
            id: item.id,
            name: item.id.replace("BG-", "").replace(/-/g, " "),
            description: `Stage background for ${item.id}`,
            settingMood: "sitcom comedy",
          },
          options.customConfig
        );
        registerSynthesizedBackground(synthesized);
        report.backgroundsSynthesized.push(item.id);
      } catch (err: any) {
        report.errors.push(`Failed synthesizing background ${item.id}: ${err.message}`);
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // 3. Synthesize Novel Caricatures
  const novelChars = bom.characters.filter((c) => c.isNovel);
  if (novelChars.length > 0) {
    notify(`Starting synthesis for ${novelChars.length} novel caricatures...`);
    for (let i = 0; i < novelChars.length; i++) {
      const item = novelChars[i];
      try {
        notify(`[${i + 1}/${novelChars.length}] Synthesizing caricature ${item.id}...`);
        const synthesized = await synthesizeCaricatureVector(
          {
            id: item.id,
            name: item.id.replace(/_/g, " "),
            archetype: "comic",
            description: `Caricature persona for ${item.id}`,
            signatureFeatures: { clothing: "comic outfit" },
          },
          options.customConfig
        );
        registerSynthesizedCaricature(synthesized);
        report.caricaturesSynthesized.push(item.id);
      } catch (err: any) {
        report.errors.push(`Failed synthesizing caricature ${item.id}: ${err.message}`);
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return report;
}
