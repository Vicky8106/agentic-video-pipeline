#!/usr/bin/env node
/**
 * One-command production:
 *   node scripts/generate-auto.mjs --audio narration.mp3 --srt narration.srt --out video.mp4
 *
 * The SRT drives direction; audio only supplies final duration/sync.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { Resvg } from "@resvg/resvg-js";
import { createAutoProduction, renderAutoSvgFrame } from "../src/production/AutoProduction.js";
import { forgeManifestForScript, manifestToDirectorSheet } from "../src/forge/ScriptAssetPipeline.js";
import type { SheetBeat } from "../src/director/DirectorSheet.js";

const args=process.argv.slice(2);
const get=(name, fallback="")=>{const i=args.indexOf(name);return i>=0?args[i+1]??fallback:fallback};
const audio=get("--audio");
const srt=get("--srt");
const out=get("--out","output/casually-explained.mp4");
const fps=Number(get("--fps","24"));
const width=Number(get("--width","1280"));
const style=get("--style","casually-procedural");
const limitDuration=get("--duration") ? Number(get("--duration")) : null;
if(!audio||!srt){console.error("Usage: pnpm generate --audio audio.mp3 --srt script.srt --out video.mp4");process.exit(2)}
if(!fs.existsSync(audio)) throw new Error(`Audio not found: ${audio}`);
if(!fs.existsSync(srt)) throw new Error(`SRT not found: ${srt}`);
fs.mkdirSync(path.dirname(out),{recursive:true});
const srtText=fs.readFileSync(srt,"utf8");
let sheet: SheetBeat[] = [];
if (!args.includes("--no-auto-assets")) {
  try {
    const result = await forgeManifestForScript(srtText, { verbose: true });
    sheet = manifestToDirectorSheet(result.manifest);
    console.log(`[AssetForge] Generated & mapped ${sheet.length} beats to director sheet (${result.bom.counts.totalUniqueAssets} unique assets).`);
  } catch (e: any) {
    console.warn("[AssetForge] Dynamic asset generation note:", e.message);
  }
}
const production = createAutoProduction(srtText, style, { sheet: sheet.length > 0 ? sheet : undefined });
const duration=production.transcript.duration;
if(!duration) throw new Error("SRT contains no timed words");

let audioDuration=duration;
try { audioDuration=Number(execFileSync("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",audio],{encoding:"utf8"}).trim()); } catch {}
let finalDuration=Math.min(audioDuration||duration,duration);
if (limitDuration && limitDuration > 0) {
  finalDuration = Math.min(finalDuration, limitDuration);
}
const height=Math.round(width*9/16);
const temp=out+".video-only.mp4";
const ff=spawn("ffmpeg",["-y","-f","rawvideo","-pix_fmt","rgba","-s",`${width}x${height}`,"-r",String(fps),"-i","-","-an","-c:v","libx264","-preset","fast","-crf","19","-pix_fmt","yuv420p","-movflags","+faststart",temp],{stdio:["pipe","inherit","inherit"]});

const fontFiles=[
 "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
 "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
 "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
].filter(fs.existsSync);
const start=Date.now();
const frames=Math.ceil(finalDuration*fps);
for(let i=0;i<frames;i++){
  const t=Math.min(finalDuration-1e-6,i/fps);
  const {svg}=renderAutoSvgFrame({production,timeSec:t,width,height});
  const pixels=new Resvg(svg,{fitTo:{mode:"width",value:width},font:{fontFiles,defaultFontFamily:"Noto Sans",loadSystemFonts:false}}).render().pixels;
  if(!ff.stdin.write(pixels)) await new Promise(r=>ff.stdin.once("drain",r));
  if(i%120===0 && (global as any).gc) (global as any).gc();
  if(i%Math.max(1,fps*5)===0) console.log(`render ${((i+1)/frames*100).toFixed(1)}% t=${t.toFixed(1)}s`);
}
ff.stdin.end();
await new Promise((resolve,reject)=>ff.on("close",c=>c===0?resolve():reject(new Error(`ffmpeg video exited ${c}`))));
await new Promise((resolve,reject)=>{
  const mux=spawn("ffmpeg",["-y","-i",temp,"-i",audio,"-map","0:v:0","-map","1:a:0","-t",String(finalDuration),"-c:v","copy","-c:a","aac","-b:a","192k","-shortest","-movflags","+faststart",out],{stdio:["ignore","inherit","inherit"]});
  mux.on("close",c=>c===0?resolve():reject(new Error(`ffmpeg mux exited ${c}`)));
});
fs.rmSync(temp,{force:true});
const elapsed=(Date.now()-start)/1000;
console.log(`\nDONE: ${out}`);
console.log(`duration=${finalDuration.toFixed(2)}s frames=${frames} renderTime=${elapsed.toFixed(1)}s`);
console.log(`style=${production.style.id} shots=${production.plan.resolved.length} events=${production.plan.events.length} scenes=${production.plan.scenes.length}`);
