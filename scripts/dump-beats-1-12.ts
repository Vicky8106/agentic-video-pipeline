import { MOVIE_BEATS } from "/root/casually_engine_v7/src/director/ShotTimeline.ts";
// Dump beats 1-12 as the authoring baseline: sentence, timing, current direction
for (const b of MOVIE_BEATS.slice(0, 12)) {
  console.log(JSON.stringify({
    id: b.beatId, t: [b.startSec, b.endSec],
    text: b.text.slice(0, 110),
    bg: b.bgId, actor: `${b.actor.gender}/${b.actor.hairStyle}/${b.actor.clothes} @${b.actor.x},${b.actor.y} expr=${b.actor.expression} pose=${b.actor.pose}`,
    cam: b.camera, prop: b.activeProp ? `${b.activeProp.id}@${b.activeProp.x},${b.activeProp.y}` : null,
    banner: b.bannerText, graphic: b.graphicType,
  }));
}
