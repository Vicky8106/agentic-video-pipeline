import fs from 'node:fs';
import { createAutoProduction, renderAutoSvgFrame } from '../src/production/AutoProduction.js';
const srt=fs.readFileSync(process.argv[2]||'public/0-chapter-1.srt','utf8');
const p=createAutoProduction(srt);
const beats=p.productionPlan.beats;
const shots=p.plan.resolved;
if(!beats.length) throw new Error('No production beats');
if(beats.length < p.transcript.sentences.length) throw new Error('ProductionPlan does not cover every sentence');
const maxShot=Math.max(...shots.map(s=>s.end-s.start));
if(maxShot > p.style.edit.maximumShotSec + .02) throw new Error(`Shot exceeds style maximum: ${maxShot}`);
const actionCount=beats.reduce((n,b)=>n+b.actions.length,0);
const bitCount=beats.reduce((n,b)=>n+(b.bits?.length??0),0);
const density=actionCount/Math.max(.1,p.transcript.duration)*10;
const bitDensity=bitCount/Math.max(.1,p.transcript.duration)*10;
if(density < 10) throw new Error(`Action density too low: ${density.toFixed(1)}/10s`);
if(bitDensity < 3.5) throw new Error(`Bit density too low: ${bitDensity.toFixed(1)}/10s`);
const expressions=beats.reduce((n,b)=>n+b.actions.filter(a=>a.type==='express').length,0);
if(expressions < Math.max(8,p.transcript.sentences.length*.35)) throw new Error('Too few deliberate expression actions');
const revealCount=beats.reduce((n,b)=>n+b.actions.filter(a=>a.type==='reveal').length,0);
const cameraActionCount=beats.reduce((n,b)=>n+b.actions.filter(a=>a.type==='camera').length,0);
if(revealCount < Math.floor(beats.length*.55)) throw new Error('Too few visual reveals');
if(cameraActionCount < Math.floor(beats.length*.4)) throw new Error('Too few beat-level camera actions');
for(const t of [0,p.transcript.duration*.11,p.transcript.duration*.27,p.transcript.duration*.43,p.transcript.duration*.61,p.transcript.duration*.79,Math.max(0,p.transcript.duration-.5)]){
  const f=renderAutoSvgFrame({production:p,timeSec:t,width:640,height:360});
  if(/<image\b/i.test(f.svg)) throw new Error(`Raster image emitted at ${t}`);
  if(!f.svg.includes('auto-host')) throw new Error(`Host missing at ${t}`);
  if(!f.svg.includes('translate(')) throw new Error(`No transform choreography at ${t}`);
}
console.log(JSON.stringify({ok:true,duration:p.transcript.duration,sentences:p.transcript.sentences.length,shots:shots.length,beats:beats.length,actions:actionCount,bits:bitCount,actionDensityPer10s:Number(density.toFixed(2)),bitDensityPer10s:Number(bitDensity.toFixed(2)),maxShot:Number(maxShot.toFixed(3)),expressions,reveals:revealCount,cameraActions:cameraActionCount},null,2));
