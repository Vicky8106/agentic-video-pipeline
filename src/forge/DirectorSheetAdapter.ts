/**
 * Director Sheet Adapter: Bridges BeatManifest to the Video Renderer.
 * Maps extracted BeatVisualSpec items to SheetBeat structures expected by AutoProduction.
 */
import type { SheetBeat } from "../director/DirectorSheet.js";
import type { BeatVisualSpec } from "./BeatManifestExtractor.js";

export function computeCinematicCamera(spec: BeatVisualSpec): {
  x: number;
  y: number;
  zoom: number;
  targetX: number;
  targetY: number;
  targetZoom: number;
  move: string;
  transition: string;
  energy: number;
  impactShake: boolean;
} {
  const shot = spec.cameraShot || (spec.propId ? "prop_macro" : spec.characterId !== "host" ? "subject_focus" : "wide_two_shot");
  const move = spec.cameraMove || "static_hold";
  const transition = spec.transition || "cut";
  const energy = typeof spec.energy === "number" ? spec.energy : 0.4;
  const impactShake = Boolean(spec.impactShake);

  let startX = 960;
  let startY = 540;
  let startZoom = 1.02;

  switch (shot) {
    case "wide_two_shot":
      startX = 960;
      startY = 540;
      startZoom = 1.02;
      break;
    case "host_reaction":
      startX = 520;
      startY = 560;
      startZoom = 1.48;
      break;
    case "subject_focus":
      startX = 1420;
      startY = 520;
      startZoom = 1.52;
      break;
    case "prop_macro":
      startX = 1220;
      startY = 550;
      startZoom = 1.85;
      break;
    case "dramatic_climax":
      startX = 1340;
      startY = 500;
      startZoom = 2.10;
      break;
  }

  let targetX = startX;
  let targetY = startY;
  let targetZoom = startZoom;

  if (move === "slow_push_in") {
    targetZoom = Math.min(2.35, startZoom + 0.16);
  } else if (move === "pan_to_subject") {
    startX = 740;
    startY = 540;
    startZoom = Math.min(1.20, startZoom);
    targetX = 1420;
    targetY = 520;
    targetZoom = 1.52;
  }

  return {
    x: startX,
    y: startY,
    zoom: startZoom,
    targetX,
    targetY,
    targetZoom,
    move,
    transition,
    energy,
    impactShake,
  };
}

export function manifestToDirectorSheet(manifest: BeatVisualSpec[]): SheetBeat[] {
  return manifest.map((m) => {
    const charId = (m.characterId || "host").toLowerCase().trim();

    let gender = "male";
    let clothes = "casual";
    let hairStyle = "none";
    let expression = "talking";
    let pose = "talking";
    const actorX = 1450;

    if (charId === "anatoly") {
      clothes = "janitor";
      hairStyle = "none";
      expression = "confident";
      pose = m.propId?.includes("MOP") ? "sweeping" : "talking";
    } else if (charId === "bodybuilder") {
      clothes = "gym_tank";
      hairStyle = "male_short_dark";
      expression = "laughing";
      pose = "flexing";
    } else if (charId === "dr_mike") {
      clothes = "doctor_scrubs";
      hairStyle = "male_buzzcut";
      expression = "skeptical";
      pose = "explaining";
    }

    const dur = Math.max(0.5, m.endSec - m.startSec);
    const camera = computeCinematicCamera(m);

    return {
      beatId: m.beatIndex,
      startSec: m.startSec,
      endSec: m.endSec,
      dur,
      bgId: m.bgId || "BG-STUDIO",
      actor: {
        id: charId,
        x: actorX,
        y: 640,
        scale: 1.34,
        gender,
        hairStyle,
        clothes,
        expression,
        pose,
      },
      camera,
      activeProp: m.propId
        ? {
            id: m.propId,
            x: 1200,
            y: 560,
            scale: 1.0,
          }
        : null,
      bannerText: m.bannerText || null,
      graphicType: null,
      text: m.text,
      dropKinds: [],
    };
  });
}
