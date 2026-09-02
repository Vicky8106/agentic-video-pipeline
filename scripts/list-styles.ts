import { STYLE_REGISTRY } from "../src/styles/index.js";
for (const [id, style] of STYLE_REGISTRY) console.log(`${id} v${style.version} — maxShot=${style.edit.maximumShotSec}s, palette=${style.palette.background}`);
