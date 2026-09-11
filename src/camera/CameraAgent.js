/**
 * Directorial Camera Agent for Casually Explained 2D Animation Engine.
 *
 * Directs kinetic, motivated camera choreography across all 18 scenes:
 * 1. 1920x1080 unconstrained global coordinate space (no 1.5x accidental cropping).
 * 2. Scene-specific focal targets tracking props, co-stars, and visual gags.
 * 3. Per-sentence dolly push-ins (+5% to +8%).
 * 4. Punch-word macro snaps (+0.18x to +0.25x) on comedic climax timestamps.
 * 5. Deadpan host reaction cuts and glides.
 * 6. Continuous living-frame breathing so zero frames are ever static.
 */
// Complete Directorial Shot Blueprint for all 18 scenes
const SCENE_FOCAL_BEATS = {
    scene_01_ecosystem: [
        { start: 0.0, end: 2.0, x: 960, y: 540, zoom: 1.05, isCut: true },
        { start: 2.0, end: 4.8, x: 1260, y: 500, zoom: 1.26 },
        { start: 4.8, end: 7.5, x: 960, y: 380, zoom: 1.22 },
        { start: 7.5, end: 8.62, x: 960, y: 520, zoom: 1.45, isCut: true },
    ],
    scene_02_tech_bro: [
        { start: 0.0, end: 2.8, x: 740, y: 560, zoom: 1.25, isCut: true },
        { start: 2.8, end: 5.5, x: 1320, y: 480, zoom: 1.35 },
        { start: 5.5, end: 6.72, x: 840, y: 520, zoom: 1.42, isCut: true },
    ],
    scene_03_celebrities: [
        { start: 0.0, end: 1.8, x: 960, y: 520, zoom: 1.25, isCut: true },
        { start: 1.8, end: 3.8, x: 960, y: 520, zoom: 1.25 },
        { start: 3.8, end: 5.5, x: 960, y: 520, zoom: 1.25 },
        { start: 5.5, end: 7.47, x: 960, y: 480, zoom: 1.65, isCut: true },
    ],
    scene_04_unsubscribe: [
        { start: 0.0, end: 3.2, x: 960, y: 540, zoom: 1.05, isCut: true },
        { start: 3.2, end: 5.8, x: 1360, y: 420, zoom: 1.28 },
        { start: 5.8, end: 7.12, x: 1360, y: 460, zoom: 1.35 },
        { start: 7.12, end: 9.6, x: 1360, y: 440, zoom: 1.55, isCut: true },
        { start: 9.6, end: 10.16, x: 420, y: 540, zoom: 1.35, isCut: true },
    ],
    scene_05_tim_burton_ps1: [
        { start: 0.0, end: 3.5, x: 1300, y: 500, zoom: 1.28, isCut: true },
        { start: 3.5, end: 7.2, x: 1320, y: 490, zoom: 1.48, isCut: true },
        { start: 7.2, end: 10.8, x: 440, y: 540, zoom: 1.35 },
    ],
    scene_06_pendulum: [
        { start: 0.0, end: 5.5, x: 1200, y: 420, zoom: 1.22, isCut: true },
        { start: 5.5, end: 10.0, x: 480, y: 540, zoom: 1.32 },
        { start: 10.0, end: 14.11, x: 960, y: 500, zoom: 1.20 },
    ],
    scene_07_heroin_chic: [
        { start: 0.0, end: 6.5, x: 1260, y: 520, zoom: 1.25, isCut: true },
        { start: 6.5, end: 14.0, x: 1320, y: 480, zoom: 1.45 },
        { start: 14.0, end: 22.62, x: 440, y: 540, zoom: 1.35 },
    ],
    scene_08_pixar_mom: [
        { start: 0.0, end: 8.5, x: 1280, y: 580, zoom: 1.25, isCut: true },
        { start: 8.5, end: 18.0, x: 1280, y: 500, zoom: 1.45 },
        { start: 18.0, end: 27.71, x: 440, y: 540, zoom: 1.35 },
    ],
    scene_09_hourglass_pr: [
        { start: 0.0, end: 7.5, x: 1260, y: 480, zoom: 1.28, isCut: true },
        { start: 7.5, end: 15.0, x: 1340, y: 460, zoom: 1.42 },
        { start: 15.0, end: 21.16, x: 440, y: 540, zoom: 1.35 },
    ],
    scene_10_boss_closes_tab: [
        { start: 0.0, end: 6.5, x: 1260, y: 460, zoom: 1.28, isCut: true },
        { start: 6.5, end: 14.5, x: 1280, y: 460, zoom: 1.55, isCut: true },
        { start: 14.5, end: 21.49, x: 440, y: 540, zoom: 1.35 },
    ],
    scene_11_y2k_fashion: [
        { start: 0.0, end: 9.5, x: 1260, y: 480, zoom: 1.28, isCut: true },
        { start: 9.5, end: 21.5, x: 1320, y: 420, zoom: 1.55, isCut: true },
        { start: 21.5, end: 33.01, x: 1260, y: 500, zoom: 1.38 },
    ],
    scene_12_glp1_cheat_code: [
        { start: 0.0, end: 13.78, x: 1240, y: 460, zoom: 1.28, isCut: true },
        { start: 13.78, end: 18.48, x: 1260, y: 520, zoom: 1.32, isCut: true },
        { start: 18.48, end: 23.74, x: 1260, y: 300, zoom: 1.45, isCut: true },
        { start: 23.74, end: 26.99, x: 1260, y: 520, zoom: 1.35, isCut: true },
        { start: 26.99, end: 33.50, x: 540, y: 500, zoom: 1.30, isCut: true },
        { start: 33.50, end: 40.51, x: 1380, y: 500, zoom: 1.30, isCut: true },
        { start: 40.51, end: 46.33, x: 1260, y: 520, zoom: 1.32, isCut: true },
        { start: 46.33, end: 51.88, x: 1320, y: 440, zoom: 1.48, isCut: true },
        { start: 51.88, end: 54.82, x: 1260, y: 500, zoom: 1.30, isCut: true },
    ],
    scene_13_hollywood_denial: [
        { start: 0.0, end: 14.0, x: 1260, y: 480, zoom: 1.30, isCut: true },
        { start: 14.0, end: 28.0, x: 1260, y: 480, zoom: 1.42, isCut: true },
        { start: 28.0, end: 42.0, x: 1260, y: 460, zoom: 1.45, isCut: true },
        { start: 42.0, end: 55.0, x: 400, y: 480, zoom: 1.35, isCut: true },
        { start: 55.0, end: 69.46, x: 960, y: 480, zoom: 1.15, isCut: true },
    ],
    scene_14_mcu_superhero: [
        { start: 0.0, end: 6.46, x: 960, y: 520, zoom: 1.05, isCut: true },
        { start: 6.46, end: 16.32, x: 960, y: 520, zoom: 1.08, isCut: true },
        { start: 16.32, end: 26.08, x: 960, y: 520, zoom: 1.15, isCut: true },
        { start: 26.08, end: 41.26, x: 960, y: 500, zoom: 1.18, isCut: true },
    ],
    scene_15_buccal_fat: [
        { start: 0.0, end: 5.76, x: 960, y: 520, zoom: 1.12, isCut: true },
        { start: 5.76, end: 18.09, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 18.09, end: 30.27, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 30.27, end: 59.17, x: 960, y: 520, zoom: 1.15, isCut: true },
    ],
    scene_16_tiktok_tribunal: [
        { start: 0.0, end: 13.5, x: 960, y: 520, zoom: 1.08, isCut: true },
        { start: 13.5, end: 32.5, x: 960, y: 500, zoom: 1.15, isCut: true },
        { start: 32.5, end: 65.71, x: 960, y: 520, zoom: 1.12, isCut: true },
    ],
    scene_17_cyborg_monoculture: [
        { start: 0.0, end: 18.2, x: 960, y: 500, zoom: 1.12, isCut: true },
        { start: 18.2, end: 38.5, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 38.5, end: 66.01, x: 960, y: 520, zoom: 1.08, isCut: true },
    ],
    scene_18_economic_outro: [
        { start: 0.0, end: 23.0, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 23.0, end: 45.0, x: 960, y: 520, zoom: 1.12, isCut: true },
        { start: 45.0, end: 68.0, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 68.0, end: 85.0, x: 960, y: 500, zoom: 1.08, isCut: true },
        { start: 85.0, end: 103.73, x: 960, y: 500, zoom: 1.15, isCut: true },
    ],
};
export class CameraAgent {
    constructor(camera) {
        Object.defineProperty(this, "camera", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: camera
        });
        Object.defineProperty(this, "lastSceneId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "lastTargetKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "lastChangeTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    updateFrame(t, sceneId, sceneTime, sceneProgress, activeSentence, slamPunchAt, outputCameraTarget) {
        // 1. Check for scene-authored priority cut or tight macro zoom
        if (outputCameraTarget && outputCameraTarget.zoom >= 1.40) {
            if (outputCameraTarget.isCut) {
                this.camera.cutTo(outputCameraTarget.x, outputCameraTarget.y, outputCameraTarget.zoom);
            }
            else {
                this.camera.setTarget(outputCameraTarget.x, outputCameraTarget.y, outputCameraTarget.zoom);
            }
            this.lastTargetKey = `${outputCameraTarget.x},${outputCameraTarget.y},${outputCameraTarget.zoom}`;
            this.lastChangeTime = t;
            this.applySmoothDynamics(t, activeSentence, slamPunchAt);
            return;
        }
        // 2. Resolve blueprint target for current scene & time
        const blueprint = this.resolveBlueprintTarget(sceneId, sceneTime);
        let targetX = blueprint.x;
        let targetY = blueprint.y;
        let targetZoom = blueprint.zoom;
        let isCut = blueprint.isCut ?? false;
        // Detect scene transitions
        if (sceneId !== this.lastSceneId) {
            this.lastSceneId = sceneId;
            isCut = true;
        }
        const targetKey = `${targetX.toFixed(1)},${targetY.toFixed(1)},${targetZoom.toFixed(2)}`;
        if (targetKey !== this.lastTargetKey) {
            this.lastTargetKey = targetKey;
            this.lastChangeTime = t;
            if (isCut) {
                this.camera.cutTo(targetX, targetY, targetZoom);
            }
            else {
                this.camera.setTarget(targetX, targetY, targetZoom);
            }
        }
        this.applySmoothDynamics(t, activeSentence, slamPunchAt);
    }
    applySmoothDynamics(t, activeSentence, slamPunchAt) {
        // Continuous exponential glide (snappiness 0.38 for natural camera dolly)
        this.camera.update(Math.round(t * 1000), 0.38);
        // Living-frame sinusoidal breath (±0.6% zoom) during holds > 1.2s
        const hold = t - this.lastChangeTime;
        if (hold > 1.2) {
            const breath = 0.006 * Math.min(1, (hold - 1.2) / 2) * Math.sin(hold * 2 * Math.PI / 9);
            this.camera.current.zoom *= 1 + breath;
        }
        // Per-sentence subtle dolly push (+4% zoom by end of spoken sentence)
        if (activeSentence) {
            const bp = Math.min(1, Math.max(0, (t - activeSentence.start) / Math.max(0.4, activeSentence.end - activeSentence.start)));
            const push = 1 + 0.04 * (1 - (1 - bp) * (1 - bp));
            this.camera.current.zoom *= push;
        }
        // Punch-word slam kinetic impulse (+12% snappy punch)
        if (slamPunchAt !== null) {
            const dt = t - slamPunchAt;
            if (dt >= 0 && dt <= 0.45) {
                const impactProg = dt / 0.45;
                const impulse = 0.12 * Math.sin((1 - impactProg) * Math.PI);
                this.camera.current.zoom *= 1 + impulse;
            }
        }
    }
    resolveBlueprintTarget(sceneId, sceneTime) {
        const segments = SCENE_FOCAL_BEATS[sceneId];
        if (!segments || segments.length === 0) {
            return { start: 0, end: 999, x: 960, y: 540, zoom: 1.05 };
        }
        for (const seg of segments) {
            if (sceneTime >= seg.start && sceneTime < seg.end) {
                return seg;
            }
        }
        return segments[segments.length - 1];
    }
}
