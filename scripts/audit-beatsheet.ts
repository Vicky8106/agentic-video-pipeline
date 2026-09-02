import { MOVIE_BEATS } from "/root/casually_engine_v7/src/director/ShotTimeline.ts";
const beats = MOVIE_BEATS;
const last = beats[beats.length - 1];
const gaps = beats.slice(1).map((b, i) => [beats[i].endSec, b.startSec]).filter(([a, b]) => b - a > 0.5);
console.log(JSON.stringify({
  count: beats.length,
  span: [beats[0].startSec, last.endSec],
  gaps: gaps.length,
  distinctBgs: new Set(beats.map(b => b.bgId)).size,
  distinctProps: new Set(beats.map(b => b.activeProp?.id).filter(Boolean)).size,
  beatsWithProp: beats.filter(b => b.activeProp).length,
  distinctActorLooks: new Set(beats.map(b => b.actor.gender + "/" + b.actor.hairStyle)).size,
  bannerBeats: beats.filter(b => b.bannerText).length,
  zoomMin: Math.min(...beats.map(b => b.camera.zoom)),
  zoomMax: Math.max(...beats.map(b => b.camera.zoom)),
  durMin: Math.min(...beats.map(b => b.dur)).toFixed(2),
  durMax: Math.max(...beats.map(b => b.dur)).toFixed(2),
}, null, 1));
