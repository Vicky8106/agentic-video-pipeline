/**
 * Pipeline Audit Test for Director Critic.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseSrt } from "../src/subtitles/SrtParser";
import { buildTranscript } from "../src/subtitles/Transcript";
import { direct } from "../src/director/Director";
import { auditDirectionPlan } from "../src/director/DirectorCritic";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const srtPath = path.join(root, "public/0-chapter-1.srt");
const srtContent = fs.readFileSync(srtPath, "utf8");
const cues = parseSrt(srtContent);
const transcript = buildTranscript(cues);

console.log(`Ingested SRT: ${cues.length} cues, ${transcript.words.length} words.`);

const plan = direct(transcript);
console.log(`Generated plan: ${plan.scenes.length} scenes, ${plan.resolved.length} shots, ${plan.events.length} events.`);

const report = auditDirectionPlan(plan, transcript);
console.log("\n================ DIRECTORIAL AUDIT REPORT ================");
console.log(`Overall Score : ${report.overallScore}/100 [${report.status}]`);
console.log(`Total Scenes  : ${report.totalScenes}`);
console.log(`Total Shots   : ${report.totalShots} (avg duration: ${report.averageShotDuration}s)`);
console.log(`Macro Punchins: ${report.macroPunchlineCount}`);
console.log(`Summary       : ${report.summary}`);
console.log("==========================================================");

if (report.overallScore < 80) {
  console.error("FAIL: Director audit score below quality threshold (80).");
  process.exit(1);
} else {
  console.log("\nSUCCESS: All directorial quality axes approved!");
}
