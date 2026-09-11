/**
 * BeatManifest: asset/background/character counts derived FROM the beat
 * sheet — never hardcoded.
 *
 * The renderer stages exactly the beat sheet, so the manifest is the
 * production's bill of materials: which backgrounds, which character
 * looks, which props, which expressions/poses, and how many of each.
 * Regenerate per script; a new script means a new manifest.
 */

import type { MovieBeat } from "./ShotTimeline.js";

export interface BeatManifest {
  beats: number;
  durationSec: number;
  backgrounds: Record<string, number>;
  characters: Record<string, number>;
  props: Record<string, number>;
  expressions: Record<string, number>;
  poses: Record<string, number>;
  counts: {
    beats: number;
    uniqueBackgrounds: number;
    uniqueCharacters: number;
    uniqueProps: number;
    uniqueExpressions: number;
    uniquePoses: number;
    /** Distinct on-disk asset files the beat sheet needs (bg + char + prop). */
    totalAssetFiles: number;
  };
}

const bump = (m: Record<string, number>, k: string): void => {
  m[k] = (m[k] ?? 0) + 1;
};

export function summarizeBeatManifest(beats: readonly MovieBeat[]): BeatManifest {
  const backgrounds: Record<string, number> = {};
  const characters: Record<string, number> = {};
  const props: Record<string, number> = {};
  const expressions: Record<string, number> = {};
  const poses: Record<string, number> = {};
  let end = 0;
  for (const b of beats) {
    bump(backgrounds, b.bgId);
    bump(characters, `${b.actor.gender}/${b.actor.hairStyle}/${b.actor.clothes}`);
    bump(expressions, b.actor.expression);
    bump(poses, b.actor.pose);
    if (b.activeProp) bump(props, b.activeProp.id);
    if (b.endSec > end) end = b.endSec;
  }
  const counts = {
    beats: beats.length,
    uniqueBackgrounds: Object.keys(backgrounds).length,
    uniqueCharacters: Object.keys(characters).length,
    uniqueProps: Object.keys(props).length,
    uniqueExpressions: Object.keys(expressions).length,
    uniquePoses: Object.keys(poses).length,
    totalAssetFiles:
      Object.keys(backgrounds).length +
      Object.keys(characters).length +
      Object.keys(props).length,
  };
  return { beats: beats.length, durationSec: end, backgrounds, characters, props, expressions, poses, counts };
}

/** One log line for the auto-video run header. */
export function formatManifestLine(m: BeatManifest): string {
  const top = (r: Record<string, number>): string =>
    Object.entries(r)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => `${k}x${v}`)
      .join(" ");
  return (
    `manifest beats=${m.counts.beats} bgs=${m.counts.uniqueBackgrounds} ` +
    `chars=${m.counts.uniqueCharacters} props=${m.counts.uniqueProps} ` +
    `expr=${m.counts.uniqueExpressions} poses=${m.counts.uniquePoses} ` +
    `assets=${m.counts.totalAssetFiles} | top-bg: ${top(m.backgrounds) || "-"} | ` +
    `top-prop: ${top(m.props) || "-"}`
  );
}
