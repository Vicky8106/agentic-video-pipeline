#!/usr/bin/env node
/**
 * Materialize the 300+ asset library:
 *   npx tsx scripts/generate-assets.ts [outdir]
 */
import { generateAssetLibrary } from "../src/production/AssetLibrary";
import fs from "node:fs";
import path from "node:path";

const outDir = process.argv[2] || path.resolve(process.cwd(), "assets", "library");
const { total, manifest } = generateAssetLibrary(outDir);

// Count by category
const byCat: Record<string, number> = {};
for (const m of manifest) byCat[m.category] = (byCat[m.category] ?? 0) + 1;

// Sanity: every file must exist, be non-empty, and contain <svg
let bad = 0;
for (const m of manifest) {
  const p = path.join(outDir, m.category, m.file);
  try {
    const s = fs.readFileSync(p, "utf8");
    if (!s.startsWith("<svg") || s.length < 200) bad++;
  } catch { bad++; }
}

console.log(`Asset library: ${total} SVGs -> ${outDir}`);
console.log("By category:", JSON.stringify(byCat));
if (bad > 0) { console.error(`FAIL: ${bad} assets missing/empty`); process.exit(1); }
if (total < 300) { console.error(`FAIL: only ${total} assets (< 300)`); process.exit(1); }
console.log("PASS: 300+ verified assets on disk");
