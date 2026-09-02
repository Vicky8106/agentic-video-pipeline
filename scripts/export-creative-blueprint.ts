/**
 * Exports the automated Director Plan to public/director_creative_blueprint.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const srtPath = path.join(root, "public/0-chapter-1.srt");
const srtContent = fs.readFileSync(srtPath, "utf8");
const cues = parseSrt(srtContent);
const transcript = buildTranscript(cues);

console.log(`🎬 Directing episode from ${cues.length} cues...`);
const plan = direct(transcript);

const outPath = path.join(root, "public/director_creative_blueprint.json");
fs.writeFileSync(outPath, JSON.stringify(plan, null, 2));

console.log(`✅ Saved Creative Director Blueprint to ${outPath} (${plan.resolved.length} shots, ${plan.events.length} beat events)`);
