import { BackgroundId, renderBackground } from "../assets/BackgroundLibrary";
import { renderProp } from "../assets/PropLibrary";
import { HairstyleId } from "../character/Hairstyles";
import { OutfitId } from "../character/Outfits";
import { renderActionLines } from "../anim/ComicMarkups";
import { getActiveBeat, MovieBeat } from "./ShotTimeline";

export function renderDirectedMovieFrame(timeSec: number): {
  backgroundSvg: string;
  stickFigures: Array<{ id: string; state: any }>;
  cameraTarget: { x: number; y: number; zoom: number; isCut?: boolean };
} {
  const beat = getActiveBeat(timeSec);
  const beatElapsed = timeSec - beat.startSec;
  const isCut = beatElapsed < 0.12; // Instant hard cut on every new beat!

  // 1. Environment Render
  let bg = renderBackground(beat.bgId as BackgroundId, { timeSec });

  // 2. Active Prop Render
  if (beat.activeProp) {
    bg += renderProp(beat.activeProp.id, {
      x: beat.activeProp.x,
      y: beat.activeProp.y,
      scale: beat.activeProp.scale,
      timeSec,
    });
  }

  // 3. Thematic Top Banner
  if (beat.bannerText) {
    bg += `
      <g transform="translate(960, 140)" filter="url(#cardShadow)">
        <rect x="-300" y="-35" width="600" height="70" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="5"/>
        <text x="0" y="10" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" fill="#fbbf24" letter-spacing="2" text-anchor="middle">
          ${beat.bannerText}
        </text>
      </g>
    `;
  }

  // 4. Overlays & Action Lines
  if (beat.camera.zoom >= 1.5 || beat.graphicType === "STAMP") {
    bg += renderActionLines({ x: beat.camera.x, y: beat.camera.y }, 260, timeSec);
  }

  // 5. Pose Configuration
  let leftArmAngle1 = 160;
  let leftArmAngle2 = 170;
  let rightArmAngle1 = 20;
  let rightArmAngle2 = 10;
  let spineLean = 0;

  switch (beat.actor.pose) {
    case "pointing_right":
      rightArmAngle1 = 55;
      rightArmAngle2 = 65;
      leftArmAngle1 = 170;
      spineLean = -4;
      break;
    case "finger_guns":
      leftArmAngle1 = 135;
      leftArmAngle2 = 145;
      rightArmAngle1 = 45;
      rightArmAngle2 = 55;
      spineLean = 6;
      break;
    case "facepalm":
      leftArmAngle1 = 85;
      leftArmAngle2 = 50;
      rightArmAngle1 = 15;
      spineLean = 10;
      break;
    case "flexing":
      leftArmAngle1 = 110;
      leftArmAngle2 = 45;
      rightArmAngle1 = 70;
      rightArmAngle2 = 135;
      spineLean = 0;
      break;
    case "waving":
      rightArmAngle1 = 80 + Math.sin(timeSec * 8) * 20;
      rightArmAngle2 = 130 + Math.sin(timeSec * 8) * 20;
      leftArmAngle1 = 165;
      break;
    case "peace_sign":
      rightArmAngle1 = 65;
      rightArmAngle2 = 120;
      leftArmAngle1 = 165;
      break;
    case "wednesday_dance":
      leftArmAngle1 = 90 + Math.sin(timeSec * 10) * 35;
      leftArmAngle2 = 50 + Math.cos(timeSec * 10) * 30;
      rightArmAngle1 = 90 + Math.cos(timeSec * 10) * 35;
      rightArmAngle2 = 130 + Math.sin(timeSec * 10) * 30;
      spineLean = Math.sin(timeSec * 5) * 12;
      break;
    case "flail":
      leftArmAngle1 = 110 + Math.sin(timeSec * 12) * 40;
      rightArmAngle1 = 70 + Math.cos(timeSec * 12) * 40;
      spineLean = Math.sin(timeSec * 6) * 10;
      break;
  }

  const actorState = {
    x: beat.actor.x,
    y: beat.actor.y,
    scale: beat.actor.scale,
    gender: beat.actor.gender,
    hairStyle: beat.actor.hairStyle as HairstyleId,
    clothes: beat.actor.clothes as OutfitId,
    expression: beat.actor.expression,
    leftArmAngle1,
    leftArmAngle2,
    rightArmAngle1,
    rightArmAngle2,
    spineLean,
    timeSec,
  };

  return {
    backgroundSvg: bg,
    stickFigures: [{ id: beat.actor.id, state: actorState }],
    cameraTarget: {
      x: beat.camera.x,
      y: beat.camera.y,
      zoom: beat.camera.zoom,
      isCut,
    },
  };
}
