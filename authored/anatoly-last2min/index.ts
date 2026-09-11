/**
 * Anatoly finale: the last 2 minutes (853.46–973.57s), directed beat by
 * beat. Seven scenes, no undirecteds, no fallbacks.
 */
import type { AuthoredFilm } from "../../src/authored/AuthoredScene.js";
import { scene as s1 } from "./s1-real-weights.js";
import { scene as s2 } from "./s2-understands.js";
import { scene as s3 } from "./s3-real-lift.js";
import { scene as s4 } from "./s4-janitor-vignette.js";
import { scene as s5 } from "./s5-crew-montage.js";
import { scene as s6 } from "./s6-gump-triple.js";
import { scene as s7 } from "./s7-closer.js";

export const WINDOW = { start: 853.46, end: 973.57 };
export const AUDIO = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3";

export const film: AuthoredFilm = {
  name: "anatoly-last2min",
  scenes: [s1, s2, s3, s4, s5, s6, s7],
};
export default film;
