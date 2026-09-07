import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { getActiveScene } from "./src/scenes/SceneRegistry";
import { Camera } from "./src/camera/Camera";
import { renderStickFigure } from "./src/character/StickFigure";
import { parseSrt, getActiveSubtitle } from "./src/engine/SvgRenderer";

const camera = new Camera(1920, 1080);
const srtContent = fs.readFileSync("./public/0-chapter-1.srt", "utf8");
const subtitles = parseSrt(srtContent);

const t = 4.0;
const scene = getActiveScene(t);
const activeSub = getActiveSubtitle(subtitles, t);
const output = scene.render({ timeSec: t, sceneTime: 4.0, progress: 4.0/8.62, talkingFlap: 0.5, camera });
camera.update(4000, 0.56);
const viewBox = camera.getViewBox(t);

console.log("t=4.0s subtitle:", activeSub?.cleanText);
console.log("viewBox:", viewBox);
