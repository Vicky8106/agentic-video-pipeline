/**
 * Director Sheet Adapter: Bridges BeatManifest to the Video Renderer.
 * Maps extracted BeatVisualSpec items to SheetBeat structures expected by AutoProduction.
 */
import type { SheetBeat } from "../director/DirectorSheet.js";
import type { BeatVisualSpec } from "./BeatManifestExtractor.js";

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
      camera: {
        x: 960,
        y: 540,
        zoom: 1.0,
      },
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
