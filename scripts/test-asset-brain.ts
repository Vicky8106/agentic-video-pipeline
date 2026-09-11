/**
 * Test Suite: AssetBrain Script Entity Analyzer (GATE-FORGE-01)
 */
import { analyzeScriptForAssets } from "../src/forge/AssetBrain.js";

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

async function run() {
  console.log("Running AssetBrain Script Entity Analyzer Tests...");

  const testScript = `
1
00:00:00,000 --> 00:00:04,000
Gordon Ramsay storms into a chaotic kitchen screaming about the risotto.

2
00:00:04,000 --> 00:00:08,000
He grabs a flaming frying pan and throws it at an espresso machine.
  `.trim();

  const plan = await analyzeScriptForAssets(testScript);
  console.log("Asset plan generated:", {
    props: plan.novelProps.map(p => p.id),
    caricatures: plan.novelCaricatures.map(c => c.id),
    bgs: plan.novelBackgrounds.map(b => b.id),
  });

  assert(Array.isArray(plan.novelProps), "novelProps must be an array");
  assert(Array.isArray(plan.novelCaricatures), "novelCaricatures must be an array");
  assert(Array.isArray(plan.novelBackgrounds), "novelBackgrounds must be an array");

  const hasRelevantProp = plan.novelProps.some(p => 
    p.id.toLowerCase().includes("pan") || 
    p.id.toLowerCase().includes("espresso") || 
    p.id.toLowerCase().includes("kitchen") ||
    p.name.toLowerCase().includes("pan") ||
    p.name.toLowerCase().includes("espresso")
  );
  assert(hasRelevantProp, "Must identify at least one relevant kitchen prop (pan or espresso machine)");

  console.log("PASS: AssetBrain successfully extracted visual gag requirements from script.");
  console.log("GATE-FORGE-01 PASS");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
