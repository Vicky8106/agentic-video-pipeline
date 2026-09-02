import { Camera } from "../camera/Camera";
import { parseSrt } from "../subtitles/SrtParser";
import { getActiveScene } from "../scenes/SceneRegistry";
import { renderStickFigure } from "../character/StickFigure";
export { Camera, parseSrt };
export function getActiveSubtitle(subtitles, timeSec) {
    for (const sub of subtitles) {
        if (timeSec >= sub.start && timeSec <= sub.end) {
            return sub;
        }
    }
    return null;
}
export function renderCompleteSvgFrame(opts) {
    const { timeSec, subtitles, camera, width = 1920, height = 1080 } = opts;
    // 1. Resolve Active Handcrafted Gold-Standard Scene (Scenes 01 through 18)
    const activeScene = getActiveScene(timeSec);
    const sceneDuration = activeScene.endTime - activeScene.startTime;
    const sceneElapsed = timeSec - activeScene.startTime;
    const progress = Math.min(1, Math.max(0, sceneElapsed / Math.max(0.1, sceneDuration)));
    const activeSub = getActiveSubtitle(subtitles, timeSec);
    const isSpeaking = activeSub !== null;
    const talkingFlap = isSpeaking ? Math.sin(timeSec * 16) * 0.5 + 0.5 : 0;
    const sceneContext = {
        timeSec,
        sceneTime: sceneElapsed,
        progress,
        talkingFlap,
        camera,
    };
    const output = activeScene.render(sceneContext);
    // 2. Camera Controls & Motivated Punch-ins
    if (output.cameraTarget) {
        camera.setTarget(output.cameraTarget.x, output.cameraTarget.y, output.cameraTarget.zoom);
    }
    camera.update(timeSec * 1000);
    const viewBox = camera.getViewBox(timeSec);
    const bgSvg = output.backgroundSvg || "";
    const fgSvg = output.foregroundSvg || "";
    // 3. Dynamic Host & Guest Character Performance
    let charSvg = "";
    const isBlinking = (timeSec % 3.4) > 3.22;
    if (output.stickFigures && output.stickFigures.length > 0) {
        charSvg = output.stickFigures
            .map((sf) => {
            if (sf.id === "host_stick" || sf.id.includes("host")) {
                const figureState = { ...sf.state };
                if (figureState.mouthOpen === undefined || figureState.mouthOpen === 0) {
                    figureState.mouthOpen = isSpeaking ? Math.abs(Math.sin(timeSec * 16)) * 0.9 : 0;
                }
                if (figureState.blink === undefined) {
                    figureState.blink = isBlinking;
                }
                if (!figureState.gazeTarget && output.cameraTarget && output.cameraTarget.x > 700) {
                    figureState.gazeTarget = { x: output.cameraTarget.x, y: output.cameraTarget.y };
                }
                const breathY = Math.sin(timeSec * 3.2) * 3.5;
                const speakBob = isSpeaking ? Math.sin(timeSec * 8) * 2.5 : 0;
                figureState.y = (figureState.y ?? 630) + breathY + speakBob;
                if (isSpeaking && figureState.pose === undefined) {
                    const gestureL = Math.sin(timeSec * 4.5) * 14;
                    const gestureR = Math.cos(timeSec * 5) * 18;
                    figureState.leftArmAngle1 = (figureState.leftArmAngle1 ?? 160) + gestureL;
                    figureState.rightArmAngle1 = (figureState.rightArmAngle1 ?? 20) + gestureR;
                    figureState.spineLean = (figureState.spineLean ?? 0) + Math.sin(timeSec * 2.8) * 3;
                }
                return renderStickFigure(sf.id, figureState);
            }
            return renderStickFigure(sf.id, sf.state);
        })
            .join("\n");
    }
    else if (output.hostState) {
        const figureState = { ...output.hostState };
        if (figureState.mouthOpen === undefined || figureState.mouthOpen === 0) {
            figureState.mouthOpen = isSpeaking ? Math.abs(Math.sin(timeSec * 16)) * 0.9 : 0;
        }
        if (figureState.blink === undefined) {
            figureState.blink = isBlinking;
        }
        if (!figureState.gazeTarget && output.cameraTarget && output.cameraTarget.x > 700) {
            figureState.gazeTarget = { x: output.cameraTarget.x, y: output.cameraTarget.y };
        }
        const breathY = Math.sin(timeSec * 3.2) * 3.5;
        const speakBob = isSpeaking ? Math.sin(timeSec * 8) * 2.5 : 0;
        figureState.y = (figureState.y ?? 630) + breathY + speakBob;
        if (isSpeaking && figureState.pose === undefined) {
            const gestureL = Math.sin(timeSec * 4.5) * 14;
            const gestureR = Math.cos(timeSec * 5) * 18;
            figureState.leftArmAngle1 = (figureState.leftArmAngle1 ?? 160) + gestureL;
            figureState.rightArmAngle1 = (figureState.rightArmAngle1 ?? 20) + gestureR;
            figureState.spineLean = (figureState.spineLean ?? 0) + Math.sin(timeSec * 2.8) * 3;
        }
        charSvg = renderStickFigure("host-figure", figureState);
    }
    let subText = "";
    if (activeSub) {
        subText = activeSub.cleanText;
    }
    let fullSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Global Infinite Full-Bleed Backdrop -->
  <rect id="global-backdrop" x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>

  <g id="scene-background">${bgSvg}</g>
  <g id="scene-character">${charSvg}</g>
  <g id="scene-foreground">${fgSvg}</g>
</svg>
  `.trim();
    fullSvg = fullSvg.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
    return {
        svg: fullSvg,
        viewBox,
        sceneId: String(activeScene.id),
        subText,
    };
}
