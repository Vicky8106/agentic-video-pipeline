import fs from "node:fs";
import path from "node:path";
import { registerDynamicProp, DYNAMIC_PROPS } from "../assets/PropLibrary.js";
import { registerDynamicBackground, DYNAMIC_BACKGROUNDS } from "../assets/BackgroundLibrary.js";
import { registerCaricatureProfile, CARICATURE_REGISTRY, CaricatureProfile } from "../character/CaricatureEngine.js";
import { SynthesizedProp, SynthesizedCaricature, SynthesizedBackground } from "./VectorSynthesizer.js";

const CACHE_DIR = path.resolve(process.cwd(), ".asset_cache");

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

export function saveAssetToCache(type: "prop" | "caricature" | "background", id: string, data: unknown): void {
  ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${type}_${id.toLowerCase().replace(/[^a-z0-9_-]/g, "_")}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.warn(`Failed to save asset ${id} to cache:`, e);
  }
}

export function loadAssetFromCache<T>(type: "prop" | "caricature" | "background", id: string): T | null {
  ensureCacheDir();
  const filePath = path.join(CACHE_DIR, `${type}_${id.toLowerCase().replace(/[^a-z0-9_-]/g, "_")}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function registerSynthesizedProp(prop: SynthesizedProp): void {
  registerDynamicProp(prop.id, {
    svgFragment: prop.svgFragment,
    gripX: prop.gripX,
    gripY: prop.gripY,
    gripAngle: prop.gripAngle,
  });
  saveAssetToCache("prop", prop.id, prop);
}

export function registerSynthesizedCaricature(c: SynthesizedCaricature): void {
  const profile: CaricatureProfile = {
    id: c.id,
    name: c.name,
    customHeadwearSvg: c.headwearSvg,
    customFacialSvg: c.facialSvg,
    customTorsoSvg: c.torsoSvg,
    outfit: "standard",
    headwear: "none",
    facialHair: "none",
    shoeStyle: "casual_sneaker",
  };
  registerCaricatureProfile(profile);
  saveAssetToCache("caricature", c.id, c);
}

export function registerSynthesizedBackground(bg: SynthesizedBackground): void {
  registerDynamicBackground(bg.id, {
    svgFragment: bg.svgFragment,
  });
  saveAssetToCache("background", bg.id, bg);
}

export function listDynamicAssets() {
  return {
    props: Array.from(DYNAMIC_PROPS.keys()),
    backgrounds: Array.from(DYNAMIC_BACKGROUNDS.keys()),
    caricatures: Object.keys(CARICATURE_REGISTRY),
  };
}
