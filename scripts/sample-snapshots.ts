import fs from "fs";
import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction";

const srtPath = "public/0-chapter-1.srt";
const srtText = fs.readFileSync(srtPath, "utf8");
const production = createAutoProduction(srtText, "casually-procedural");

const outDir = "/root/Desktop/new_sampled_frames";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const fontFiles = [
  "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
].filter(fs.existsSync);

const timestamps = [10, 30, 60, 90, 150, 200, 300, 400, 500, 600];

for (const t of timestamps) {
  const { svg } = renderAutoSvgFrame({ production, timeSec: t, width: 1280, height: 720 });
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1280 },
    font: { fontFiles, defaultFontFamily: "Noto Sans", loadSystemFonts: false },
  });
  const pngData = resvg.render().asPng();
  const filePath = path.join(outDir, `frame_${t}s.png`);
  fs.writeFileSync(filePath, pngData);
  console.log(`Rendered: ${filePath}`);
}
console.log("Done sampling frames!");
