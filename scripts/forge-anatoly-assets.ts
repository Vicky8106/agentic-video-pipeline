import fs from "node:fs";
import { forgeAssetsForScript } from "../src/forge/ScriptAssetPipeline.js";

async function main() {
  const srtPath = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.srt";
  const srtText = fs.readFileSync(srtPath, "utf8");
  console.log("Analyzing full Anatoly script with LLM Asset Forge...");
  
  const report = await forgeAssetsForScript(srtText, { verbose: true });
  console.log("Asset Forge Report for Anatoly script:", JSON.stringify(report, null, 2));
}

main().catch(console.error);
