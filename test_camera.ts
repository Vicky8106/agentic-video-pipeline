import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { getActiveScene } from "./src/scenes/SceneRegistry";
import { Camera } from "./src/camera/Camera";
import { renderStickFigure } from "./src/character/StickFigure";

const camera = new Camera(1920, 1080);
const scene = getActiveScene(5.0);
const output = scene.render({ timeSec: 5.0, sceneTime: 5.0, progress: 5.0 / 8.62, talkingFlap: 0.5, camera });
camera.update(5000, 0.56);
const viewBox = camera.getViewBox(5.0);
const figures = output.stickFigures ? output.stickFigures.map(sf => renderStickFigure(sf.id, sf.state)).join("\n") : "";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1280" height="720">
  <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
  <g id="scene-background">${output.backgroundSvg || ""}</g>
  <g id="scene-character">${figures}</g>
</svg>`.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1280 } });
fs.writeFileSync("/tmp/test_1920_camera_5s.png", resvg.render().asPng());
console.log("SUCCESS! Saved /tmp/test_1920_camera_5s.png, viewBox=", viewBox);
