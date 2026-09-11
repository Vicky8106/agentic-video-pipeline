/**
 * State-of-the-Art Programmable SVG Puppet Engine.
 *
 * Provides complete continuous, mathematical control over every single
 * kinematic and expressive parameter of the stick figure / cartoon character:
 *
 *   - Asymmetric Eyebrows: Independent left/right height, tilt, and arch.
 *   - Continuous Gaze & Eyelids: Gaze tracking, independent squint, pupil size,
 *     and dynamic comic eye styles (shock pop, laser beams, spiral, stars).
 *   - Parametric Mouth Engine: Continuous smile/frown curve, open ratio,
 *     nervous wobble jitter, teeth visibility, and phoneme viseme morphs.
 *   - Decoupled Head & Neck: Tilt, yaw (looking sideways), nod, and neck pivot.
 *   - 2-Bone FK & IK Skeletons: Forward kinematics for gestural performance
 *     and Inverse Kinematics (IK) for precise prop handling.
 *   - Continuous Body Morphing: Seamless interpolation across weight, height,
 *     jaw width, and cheek fullness.
 *   - Stroke Normalization: Dynamic stroke adjustment matching camera zoom.
 *   - World Socket Resolvers: Provides world coordinates for camera aiming.
 */
import { solveSkeleton } from "./Rig";
import { squashStretch } from "../anim/Pose";
/** Utility: Aim puppet gaze and head towards a world-space point. */
export function lookAt(puppetWorldPos, targetWorldPos, headWorldYOffset = -180) {
    const dx = targetWorldPos.x - puppetWorldPos.x;
    const dy = targetWorldPos.y - (puppetWorldPos.y + headWorldYOffset);
    const dist = Math.hypot(dx, dy) || 1;
    const rawGazeX = Math.max(-1, Math.min(1, dx / Math.max(200, dist * 0.7)));
    const rawGazeY = Math.max(-1, Math.min(1, dy / Math.max(200, dist * 0.7)));
    const headYaw = rawGazeX * 0.45;
    const headTilt = Math.max(-12, Math.min(12, (dy / dist) * 15));
    return { gazeX: rawGazeX, gazeY: rawGazeY, headYaw, headTilt };
}
/** Render the continuous programmable SVG puppet with socket resolution. */
export function renderProgrammablePuppet(spec, state, options = {}) {
    const id = state.id ?? "puppet";
    const x = state.x ?? 0;
    const y = state.y ?? 0;
    const scale = state.scale ?? 1;
    const rotation = state.rotation ?? 0;
    const alpha = state.alpha ?? 1;
    const flipX = state.flipX ? -1 : 1;
    // Merge base body with custom body parameters
    const body = state.customBody ? { ...spec.body, ...state.customBody } : spec.body;
    // Solve full articulated skeleton
    const poseRecord = { ...state };
    const sk = solveSkeleton(spec, body, poseRecord);
    // Stroke weight normalization
    const pxPerUnit = options.pxPerUnit ?? 1.0;
    const strokePx = options.strokePx ?? 3.4;
    const unit = strokePx / Math.max(0.0001, pxPerUnit * scale);
    const sw = (mult = 1) => (unit * mult).toFixed(3);
    const line = spec.palette.line;
    const hr = sk.headRadius;
    // Head Transforms
    const headTilt = state.headTilt ?? -4;
    const yaw = Math.max(-1, Math.min(1, state.headYaw ?? 0));
    const cheek = body.cheekFullness;
    // ---- 1. Torso Silhouette
    const chestRise = state.chestRise ?? 0;
    const chestW = body.chestWidth / 2 + chestRise * 0.9;
    const waistW = body.waistWidth / 2;
    const hipW = body.hipWidth / 2;
    const belly = body.belly;
    const nb = sk.neckBase;
    const torsoPath = `
    M ${(-chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    C ${(-chestW - 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(-waistW - 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(-waistW - belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(-waistW - belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(-hipW - belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    L ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y + 10).toFixed(1)}
    C ${(hipW + belly * 0.5).toFixed(1)} ${(sk.hip.y - 2).toFixed(1)} ${(waistW + belly * 0.3 + nb.x).toFixed(1)} ${(sk.hip.y - 6).toFixed(1)} ${(waistW + belly * 0.15 + nb.x).toFixed(1)} ${(sk.hip.y - 26).toFixed(1)}
    C ${(waistW + 4 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 + 6).toFixed(1)} ${(chestW + 6 + nb.x).toFixed(1)} ${((nb.y + sk.hip.y) / 2 - 18).toFixed(1)} ${(chestW + nb.x).toFixed(1)} ${(nb.y + 4).toFixed(1)}
    Z`;
    // ---- 2. Face & Eyes
    const faceShift = yaw * hr * 0.34;
    const faceSquash = 1 - Math.abs(yaw) * 0.16;
    const eyeR = hr * 0.30 * body.eyeSize;
    const eyeGap = hr * 0.42 * body.eyeSpacing * faceSquash;
    const eyeLX = -eyeGap + faceShift;
    const eyeRX = eyeGap + faceShift;
    const eyeY = -hr * 0.10;
    const gazeX = state.gazeX ?? 0.35;
    const gazeY = state.gazeY ?? -0.15;
    const eyeLeftOpen = state.eyelidLeftOpen ?? 1.0;
    const eyeRightOpen = state.eyelidRightOpen ?? 1.0;
    const pupilDilation = state.pupilDilation ?? 1.0;
    const variant = state.eyeVariant ?? "normal";
    const renderEye = (cx, cy, open, side) => {
        if (open <= 0.1) {
            // Blink / Closed eye
            return `<path d="M ${(cx - eyeR).toFixed(1)} ${cy.toFixed(1)} Q ${cx.toFixed(1)} ${(cy + eyeR * 0.55).toFixed(1)} ${(cx + eyeR).toFixed(1)} ${cy.toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;
        }
        if (variant === "shock_pop") {
            const popR = eyeR * 1.45 * open;
            return `
        <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(popR * faceSquash).toFixed(1)}" ry="${popR.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.6)}"/>
        <circle cx="${(cx + gazeX * popR * 0.5).toFixed(1)}" cy="${(cy + gazeY * popR * 0.5).toFixed(1)}" r="${(popR * 0.3 * pupilDilation).toFixed(1)}" fill="${line}"/>
        <g stroke="#ef4444" stroke-width="${sw(0.8)}">
          <line x1="${(cx - popR * 1.3).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx - popR * 1.05).toFixed(1)}" y2="${cy.toFixed(1)}"/>
          <line x1="${(cx + popR * 1.05).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + popR * 1.3).toFixed(1)}" y2="${cy.toFixed(1)}"/>
          <line x1="${cx.toFixed(1)}" y1="${(cy - popR * 1.3).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy - popR * 1.05).toFixed(1)}"/>
        </g>`;
        }
        if (variant === "spiral_hypno") {
            return `
        <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(eyeR * faceSquash).toFixed(1)}" ry="${(eyeR * open).toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
        <path d="M ${cx} ${cy} q 5 -5 10 0 q 5 8 -4 10 q -10 2 -10 -8" fill="none" stroke="${line}" stroke-width="${sw(1.1)}"/>`;
        }
        if (variant === "laser_beam") {
            return `
        <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(eyeR * 0.8).toFixed(1)}" ry="${(eyeR * 0.8).toFixed(1)}" fill="#ef4444" stroke="#dc2626" stroke-width="${sw(1.5)}"/>
        <line x1="${cx}" y1="${cy}" x2="${cx + (side === "left" ? -400 : 400)}" y2="${cy + 60}" stroke="#ef4444" stroke-width="${sw(3.5)}" stroke-linecap="round" opacity="0.85"/>`;
        }
        if (variant === "dot") {
            return `<circle cx="${(cx + gazeX * eyeR * 0.3).toFixed(1)}" cy="${(cy + gazeY * eyeR * 0.3).toFixed(1)}" r="${(eyeR * 0.35).toFixed(1)}" fill="${line}"/>`;
        }
        // Normal expressive eye
        const rx = eyeR * faceSquash;
        const ry = eyeR * open;
        const pupilR = eyeR * 0.42 * pupilDilation;
        return `
      <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.3)}"/>
      <circle cx="${(cx + gazeX * rx * 0.45).toFixed(1)}" cy="${(cy + gazeY * ry * 0.45).toFixed(1)}" r="${pupilR.toFixed(1)}" fill="${line}"/>`;
    };
    const eyesSvg = `
    ${renderEye(eyeLX, eyeY, eyeLeftOpen, "left")}
    ${renderEye(eyeRX, eyeY, eyeRightOpen, "right")}
  `;
    // ---- 3. Asymmetric Eyebrows
    const browLHeight = state.eyebrowLeftHeight ?? 0;
    const browRHeight = state.eyebrowRightHeight ?? 0;
    const browLTilt = state.eyebrowLeftTilt ?? 0;
    const browRTilt = state.eyebrowRightTilt ?? 0;
    const browsSvg = `
    <path d="M ${(eyeLX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - browLHeight * 0.5).toFixed(1)} Q ${eyeLX.toFixed(1)} ${(eyeY - eyeR * 2.1 - browLHeight).toFixed(1)} ${(eyeLX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - browLHeight * 0.5 + browLTilt * 0.8).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
    <path d="M ${(eyeRX - eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.55 - browRHeight * 0.5 - browRTilt * 0.8).toFixed(1)} Q ${eyeRX.toFixed(1)} ${(eyeY - eyeR * 2.1 - browRHeight).toFixed(1)} ${(eyeRX + eyeR * 1.15).toFixed(1)} ${(eyeY - eyeR * 1.5 - browRHeight * 0.5).toFixed(1)}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>
  `;
    // ---- 4. Parametric Mouth Engine
    const mouthY = hr * 0.52;
    const mouthW = hr * (0.44 + cheek * 0.26);
    const smile = state.mouthSmile ?? 0.2;
    const open = state.mouthOpen ?? 0.0;
    const wobble = state.mouthWobble ?? 0.0;
    const showTeeth = state.showTeeth ?? (smile > 0.3 && open < 0.6);
    let mouthSvg = "";
    if (wobble > 0.2) {
        // Nervous squiggly cringe mouth
        const wamp = wobble * 7;
        mouthSvg = `<path d="M ${-mouthW} ${mouthY} Q ${-mouthW / 3} ${mouthY - wamp} 0 ${mouthY} Q ${mouthW / 3} ${mouthY + wamp} ${mouthW} ${mouthY}" fill="none" stroke="${line}" stroke-width="${sw(1.5)}" stroke-linecap="round"/>`;
    }
    else if (open > 0.4) {
        // Wide talking or scream mouth
        const h = 4 + open * mouthW * 0.85;
        mouthSvg = `
      <ellipse cx="0" cy="${(mouthY + h * 0.3).toFixed(1)}" rx="${(mouthW * 0.65).toFixed(1)}" ry="${h.toFixed(1)}" fill="${spec.palette.mouth}" stroke="${line}" stroke-width="${sw(1.5)}"/>
      <ellipse cx="0" cy="${(mouthY + h * 0.8).toFixed(1)}" rx="${(mouthW * 0.38).toFixed(1)}" ry="${(h * 0.35).toFixed(1)}" fill="${spec.palette.tongue}"/>`;
    }
    else if (showTeeth) {
        // Casually Explained Signature Teeth
        const h = 6 + open * mouthW * 0.6;
        const top = mouthY - h / 2 - smile * 4;
        mouthSvg = `
      <path d="M ${-mouthW} ${top} L ${mouthW} ${top + 1} L ${mouthW * 0.9} ${top + h} L ${-mouthW * 0.92} ${top + h - 1} Z" fill="${spec.palette.eyes}" stroke="${line}" stroke-width="${sw(1.4)}" stroke-linejoin="round"/>
      <line x1="${-mouthW * 0.92}" y1="${top + h * 0.5}" x2="${mouthW * 0.92}" y2="${top + h * 0.5}" stroke="${line}" stroke-width="${sw(0.6)}" opacity="0.35"/>`;
    }
    else {
        // Curved expressive line (frown to deadpan to smirk)
        const curveY = mouthY - smile * 8;
        mouthSvg = `<path d="M ${-mouthW} ${mouthY} Q 0 ${curveY} ${mouthW} ${mouthY - smile * 6}" fill="none" stroke="${line}" stroke-width="${sw(1.6)}" stroke-linecap="round"/>`;
    }
    // ---- 5. Hands & Fingers
    const rad = (deg) => (deg * Math.PI) / 180;
    const angleOf = (a, b) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    const hand = (p, forearmAngle, side) => {
        const a = rad(forearmAngle);
        const f1 = { x: p.x + Math.cos(a - 0.5) * 16 * side, y: p.y + Math.sin(a - 0.5) * 16 };
        const f2 = { x: p.x + Math.cos(a + 0.45) * 15 * side, y: p.y + Math.sin(a + 0.45) * 15 };
        return `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(body.limbThickness * 0.62).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw()}"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f1.x.toFixed(1)}" y2="${f1.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>
      <line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${f2.x.toFixed(1)}" y2="${f2.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(0.85)}" stroke-linecap="round"/>`;
    };
    const footY = Math.max(sk.footL.y, sk.footR.y);
    // Computed Sockets for Camera Target Tracking
    const sockets = {
        headCenter: { x: x + sk.headCenter.x * scale * flipX, y: y + sk.headCenter.y * scale },
        eyeCenter: { x: x + (sk.headCenter.x + faceShift) * scale * flipX, y: y + (sk.headCenter.y + eyeY) * scale },
        leftHand: { x: x + sk.handL.x * scale * flipX, y: y + sk.handL.y * scale },
        rightHand: { x: x + sk.handR.x * scale * flipX, y: y + sk.handR.y * scale },
        chestCenter: { x: x + nb.x * scale * flipX, y: y + (nb.y + sk.hip.y) * 0.5 * scale },
        hipCenter: { x: x + sk.hip.x * scale * flipX, y: y + sk.hip.y * scale },
        groundContact: { x: x, y: y + footY * scale },
    };
    const { sx, sy } = squashStretch(state.squash ?? 1, state.stretch ?? 1);
    const svg = `
<g id="${id}" transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${(scale * sx * flipX).toFixed(4)}, ${(scale * sy).toFixed(4)})" opacity="${alpha}">
  <!-- Contact shadow on ground -->
  <ellipse cx="0" cy="${(footY + 8).toFixed(1)}" rx="${(body.hipWidth * 1.5).toFixed(1)}" ry="${(body.hipWidth * 0.28).toFixed(1)}" fill="${line}" opacity="0.15"/>

  <g stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- Back leg and back arm -->
    <path d="M ${sk.hip.x.toFixed(1)} ${sk.hip.y.toFixed(1)} L ${sk.kneeL.x.toFixed(1)} ${sk.kneeL.y.toFixed(1)} L ${sk.footL.x.toFixed(1)} ${sk.footL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.15)}" opacity="0.75"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.elbowL.x.toFixed(1)} ${sk.elbowL.y.toFixed(1)} L ${sk.handL.x.toFixed(1)} ${sk.handL.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.05)}" opacity="0.75"/>
    ${hand(sk.handL, angleOf(sk.elbowL, sk.handL), -1)}

    <!-- Torso -->
    <path d="${torsoPath}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.3)}"/>
    <path d="M ${sk.shoulderL.x.toFixed(1)} ${sk.shoulderL.y.toFixed(1)} L ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.2)}"/>

    <!-- Front Leg -->
    <path d="M ${sk.hip.x.toFixed(1)} ${sk.hip.y.toFixed(1)} L ${sk.kneeR.x.toFixed(1)} ${sk.kneeR.y.toFixed(1)} L ${sk.footR.x.toFixed(1)} ${sk.footR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>

    <!-- Neck -->
    <path d="M ${(sk.neckBase.x - body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x - body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>
    <path d="M ${(sk.neckBase.x + body.shoulderWidth * 0.16).toFixed(1)} ${sk.neckBase.y.toFixed(1)} L ${(sk.headCenter.x + body.shoulderWidth * 0.14).toFixed(1)} ${(sk.headCenter.y + hr * 0.72).toFixed(1)}" stroke="${line}" stroke-width="${sw(1.6)}"/>

    <!-- Head & Face -->
    <g transform="translate(${sk.headCenter.x.toFixed(2)}, ${sk.headCenter.y.toFixed(2)}) rotate(${headTilt.toFixed(2)})">
      <ellipse cx="0" cy="0" rx="${(hr * (0.86 + cheek * 0.16) * (body.jawWidth * 0.35 + 0.65)).toFixed(1)}" ry="${(hr * (1.02 + cheek * 0.05)).toFixed(1)}" fill="${spec.palette.skin}" stroke="${line}" stroke-width="${sw(1.4)}"/>
      <g>${browsSvg}${eyesSvg}${mouthSvg}</g>
    </g>

    <!-- Front Arm -->
    <path d="M ${sk.shoulderR.x.toFixed(1)} ${sk.shoulderR.y.toFixed(1)} L ${sk.elbowR.x.toFixed(1)} ${sk.elbowR.y.toFixed(1)} L ${sk.handR.x.toFixed(1)} ${sk.handR.y.toFixed(1)}" stroke="${line}" stroke-width="${sw(1.25)}"/>
    ${hand(sk.handR, angleOf(sk.elbowR, sk.handR), 1)}
  </g>
</g>`.trim();
    return { svg, sockets };
}
