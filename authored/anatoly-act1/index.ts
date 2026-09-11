/**
 * Anatoly Act 1 Gold Standard (0.00–90.80s): 14 scenes, handcrafted comedy direction.
 */
import type { AuthoredFilm } from "../../src/authored/AuthoredScene.js";
import { scene as s01 } from "./s01.js";
import { scene as s02 } from "./s02.js";
import { scene as s03 } from "./s03.js";
import { scene as s04 } from "./s04.js";
import { scene as s05 } from "./s05.js";
import { scene as s06 } from "./s06.js";
import { scene as s07 } from "./s07.js";
import { scene as s08 } from "./s08.js";
import { scene as s09 } from "./s09.js";
import { scene as s10 } from "./s10.js";
import { scene as s11 } from "./s11.js";
import { scene as s12 } from "./s12.js";
import { scene as s13 } from "./s13.js";
import { scene as s14 } from "./s14.js";

export const WINDOW = { start: 0.00, end: 90.80 };
export const AUDIO = "/root/Desktop/anatoly/0-anatoly-and-the-most-obviously.mp3";

export const film: AuthoredFilm = {
  name: "anatoly-act1",
  scenes: [
    s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14
  ],
};
export default film;
