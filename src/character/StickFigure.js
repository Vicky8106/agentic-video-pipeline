// Casually Explained / Alex Meyers Style Vector Stick Figure Character Rig
// Faithfully matching the exact art style of /root/Desktop/Picsart_26-08-16_20-36-21-244.png
export function renderStickFigure(id, state) {
    let { x = 0, y = 0, scale = 1, rotation = 0, expression, timeSec = 0, isTalking = true, spineLean = 0, headTilt, pose, gazeX = 0.45, gazeY = -0.2, pointTarget, leftHandTarget, isWalking = false, bodyFacing = "right", blink = false, eyeStyle, eyebrowTilt = 0, eyebrowHeight = 0, eyebrowRaiseLeft, mouthShape, mouthOpen = 0, leftArmAngle1 = 160, leftArmAngle2 = -15, rightArmAngle1 = 20, rightArmAngle2 = 15, leftHandProp = "none", rightHandProp = "none", leftLegAngle1 = 118, leftLegAngle2 = 0, rightLegAngle1 = 62, rightLegAngle2 = 0, costume = "none", comicFx, alpha = 1, } = state;
    // Continuous organic breathing, weight shift, and secondary motion
    if (timeSec > 0) {
        const breath = Math.sin(timeSec * 3.0) * 3.2;
        const sway = Math.sin(timeSec * 1.6) * 2.0;
        y += breath;
        spineLean = (spineLean ?? 0) + sway * 0.7;
        // Automatic natural blinking if not explicitly controlled
        if (state.blink === undefined) {
            const blinkCycle = timeSec % 3.4;
            blink = blinkCycle > 3.25 && blinkCycle < 3.39;
        }
        // Natural gaze micro-saccades
        gazeX = (gazeX ?? 0.45) + Math.sin(timeSec * 1.5) * 0.05;
        gazeY = (gazeY ?? -0.2) + Math.cos(timeSec * 2.0) * 0.03;
        if (isTalking && mouthOpen === 0 && (!mouthShape || mouthShape === "smile_teeth" || mouthShape === "talking_open" || mouthShape === "talking_flap")) {
            // Harmonic syllable fluttering
            const flutter = Math.sin(timeSec * 14.5) * 0.5 + Math.sin(timeSec * 22.0) * 0.3 + 0.2;
            if (flutter > 0.1) {
                mouthShape = "talking_open";
                mouthOpen = Math.min(1.0, Math.max(0.12, flutter));
            }
        }
    }
    // Resolve Expression Presets if expression ID is provided
    if (expression) {
        if (expression.startsWith("disgust_")) {
            headTilt ?? (headTilt = 10);
            eyeStyle ?? (eyeStyle = "squint");
            mouthShape ?? (mouthShape = "cringe_wavy");
            eyebrowRaiseLeft ?? (eyebrowRaiseLeft = true);
            pose ?? (pose = "shrug");
            comicFx ?? (comicFx = "sweat_drop");
        }
        else if (expression.startsWith("cringe_")) {
            headTilt ?? (headTilt = 12);
            eyeStyle ?? (eyeStyle = "squint");
            mouthShape ?? (mouthShape = "cringe_wavy");
            pose ?? (pose = "facepalm");
            comicFx ?? (comicFx = "sweat_drop");
        }
        else if (expression.startsWith("fear_")) {
            headTilt ?? (headTilt = 0);
            eyeStyle ?? (eyeStyle = "shock");
            mouthShape ?? (mouthShape = "open_o");
            pose ?? (pose = "facepalm");
            comicFx ?? (comicFx = "sweat_drop");
        }
        else if (expression.startsWith("frustration_")) {
            headTilt ?? (headTilt = 12);
            eyeStyle ?? (eyeStyle = "deadpan_dots");
            mouthShape ?? (mouthShape = "deadpan_line");
            pose ?? (pose = "facepalm");
            comicFx ?? (comicFx = "sweat_drop");
        }
        else if (expression.startsWith("rage_")) {
            headTilt ?? (headTilt = 0);
            eyeStyle ?? (eyeStyle = "laser");
            mouthShape ?? (mouthShape = "scream");
            pose ?? (pose = "mind_blown");
            comicFx ?? (comicFx = "shock_lightning");
        }
        else if (expression.startsWith("deadpan_")) {
            headTilt ?? (headTilt = 0);
            eyeStyle ?? (eyeStyle = "deadpan_dots");
            mouthShape ?? (mouthShape = "deadpan_line");
            pose ?? (pose = "default");
            comicFx ?? (comicFx = "none");
        }
        else if (expression.startsWith("smug_")) {
            headTilt ?? (headTilt = -8);
            eyeStyle ?? (eyeStyle = "normal");
            mouthShape ?? (mouthShape = "smirk");
            eyebrowRaiseLeft ?? (eyebrowRaiseLeft = true);
            pose ?? (pose = "hands_on_hips");
            comicFx ?? (comicFx = "none");
        }
        else if (expression.startsWith("skeptical_") || expression.startsWith("confused_")) {
            headTilt ?? (headTilt = 14);
            eyeStyle ?? (eyeStyle = "squint");
            mouthShape ?? (mouthShape = "deadpan_line");
            eyebrowRaiseLeft ?? (eyebrowRaiseLeft = true);
            pose ?? (pose = "crossed_arms");
            comicFx ?? (comicFx = "question_marks");
        }
        else if (expression.startsWith("shock_")) {
            headTilt ?? (headTilt = 0);
            eyeStyle ?? (eyeStyle = "eye_pop");
            mouthShape ?? (mouthShape = "jaw_drop");
            pose ?? (pose = "mind_blown");
            comicFx ?? (comicFx = "exclamation");
        }
        else if (expression.startsWith("mind_blown_")) {
            headTilt ?? (headTilt = 0);
            eyeStyle ?? (eyeStyle = "sparkle_star");
            mouthShape ?? (mouthShape = "jaw_drop");
            pose ?? (pose = "mind_blown");
            comicFx ?? (comicFx = "shock_lightning");
        }
        else if (expression.startsWith("crying_") || expression.startsWith("sad_") || expression.startsWith("defeated_")) {
            headTilt ?? (headTilt = 12);
            eyeStyle ?? (eyeStyle = "tear_crying");
            mouthShape ?? (mouthShape = "jaw_drop");
            pose ?? (pose = "facepalm");
            comicFx ?? (comicFx = "sweat_drop");
        }
    }
    // Fallback defaults if not set
    headTilt = (headTilt ?? -6) + Math.sin(timeSec * 2.4) * 1.5 + (isTalking ? Math.sin(timeSec * 6.5) * 1.8 : 0);
    pose ?? (pose = "default");
    eyeStyle ?? (eyeStyle = "normal");
    eyebrowRaiseLeft ?? (eyebrowRaiseLeft = false);
    mouthShape ?? (mouthShape = "smile_teeth");
    comicFx ?? (comicFx = "none");
    // Apply Pose Presets with Continuous Living Gesture Dynamics
    if (pose === "shrug") {
        leftArmAngle1 = (state.leftArmAngle1 ?? 205) + Math.sin(timeSec * 3.6) * 4;
        leftArmAngle2 = (state.leftArmAngle2 ?? -65) + Math.cos(timeSec * 3.2) * 3;
        rightArmAngle1 = (state.rightArmAngle1 ?? -25) - Math.sin(timeSec * 3.6) * 4;
        rightArmAngle2 = (state.rightArmAngle2 ?? 65) - Math.cos(timeSec * 3.2) * 3;
        headTilt += 10;
        if (mouthShape === "smile_teeth")
            mouthShape = "smirk";
        if (eyebrowHeight === 0)
            eyebrowHeight = 8;
    }
    else if (pose === "point_camera") {
        const pointPulse = isTalking ? Math.sin(timeSec * 5.5) * 3.5 : Math.sin(timeSec * 2.5) * 1.5;
        rightArmAngle1 = (state.rightArmAngle1 ?? 0) + pointPulse;
        rightArmAngle2 = (state.rightArmAngle2 ?? 0) - pointPulse * 0.5;
        leftArmAngle1 = (state.leftArmAngle1 ?? 150) + Math.cos(timeSec * 2.8) * 4;
        leftArmAngle2 = (state.leftArmAngle2 ?? -20);
        headTilt += 2;
        gazeX = 0;
        gazeY = 0;
    }
    else if (pose === "facepalm") {
        const sigh = Math.sin(timeSec * 2.0) * 2;
        rightArmAngle1 = (state.rightArmAngle1 ?? -75) + sigh;
        rightArmAngle2 = (state.rightArmAngle2 ?? 135) - sigh;
        leftArmAngle1 = (state.leftArmAngle1 ?? 150) + Math.cos(timeSec * 2.5) * 3;
        leftArmAngle2 = (state.leftArmAngle2 ?? -20);
        headTilt += -9 + sigh;
        if (mouthShape === "smile_teeth")
            mouthShape = "deadpan_line";
    }
    else if (pose === "hands_on_hips") {
        const hipSway = Math.sin(timeSec * 2.0) * 3;
        leftArmAngle1 = (state.leftArmAngle1 ?? 125) + hipSway;
        leftArmAngle2 = (state.leftArmAngle2 ?? -95);
        rightArmAngle1 = (state.rightArmAngle1 ?? 55) - hipSway;
        rightArmAngle2 = (state.rightArmAngle2 ?? 95);
        headTilt += 4;
    }
    else if (pose === "crossed_arms") {
        const chestBreath = Math.sin(timeSec * 3.0) * 2.5;
        leftArmAngle1 = (state.leftArmAngle1 ?? 110) + chestBreath;
        leftArmAngle2 = (state.leftArmAngle2 ?? -115);
        rightArmAngle1 = (state.rightArmAngle1 ?? 70) - chestBreath;
        rightArmAngle2 = (state.rightArmAngle2 ?? 115);
        headTilt += -4;
    }
    else if (pose === "mind_blown") {
        const jitter = Math.sin(timeSec * 18.0) * 3.5;
        leftArmAngle1 = (state.leftArmAngle1 ?? -115) + jitter;
        leftArmAngle2 = (state.leftArmAngle2 ?? 110) - jitter;
        rightArmAngle1 = (state.rightArmAngle1 ?? -65) - jitter;
        rightArmAngle2 = (state.rightArmAngle2 ?? -110) + jitter;
        headTilt += Math.sin(timeSec * 12.0) * 2;
        eyeStyle = "shock";
        mouthShape = "open_o";
    }
    else if (pose === "waving") {
        const waveSweep = Math.sin(timeSec * 8.0) * 26;
        rightArmAngle1 = (state.rightArmAngle1 ?? -70) + waveSweep;
        rightArmAngle2 = (state.rightArmAngle2 ?? 45) + waveSweep * 0.4;
        leftArmAngle1 = (state.leftArmAngle1 ?? 160) + Math.sin(timeSec * 3.0) * 3;
        leftArmAngle2 = (state.leftArmAngle2 ?? -15);
    }
    else {
        // Default conversational gesturing
        if (isTalking) {
            const gL = Math.sin(timeSec * 4.2) * 12 + Math.sin(timeSec * 7.1) * 6;
            const gR = Math.cos(timeSec * 4.8) * 14 - Math.sin(timeSec * 8.3) * 5;
            leftArmAngle1 = (state.leftArmAngle1 ?? 160) + gL;
            leftArmAngle2 = (state.leftArmAngle2 ?? -15) + gL * 0.6;
            rightArmAngle1 = (state.rightArmAngle1 ?? 20) + gR;
            rightArmAngle2 = (state.rightArmAngle2 ?? 15) - gR * 0.6;
        }
        else {
            const idleArm = Math.sin(timeSec * 2.2) * 3;
            leftArmAngle1 = (state.leftArmAngle1 ?? 160) + idleArm;
            leftArmAngle2 = (state.leftArmAngle2 ?? -15);
            rightArmAngle1 = (state.rightArmAngle1 ?? 20) - idleArm;
            rightArmAngle2 = (state.rightArmAngle2 ?? 15);
        }
    }
    // Skeletal anchor points
    const neckX = 0;
    const neckY = -120;
    const shoulderY = -95;
    const hipY = 55;
    // Dynamic Right Arm Inverse Kinematics Targeting
    if (pointTarget) {
        const targetLocalX = (pointTarget.x - x) / (scale ?? 1.32);
        const targetLocalY = (pointTarget.y - y) / (scale ?? 1.32);
        const armDx = targetLocalX - 10;
        const armDy = targetLocalY - shoulderY;
        const targetAngle = (Math.atan2(armDy, armDx) * 180) / Math.PI;
        rightArmAngle1 = targetAngle + Math.sin(timeSec * 6) * 3;
        rightArmAngle2 = -8 + Math.cos(timeSec * 5) * 4;
    }
    // Dynamic Left Arm Inverse Kinematics Targeting
    if (leftHandTarget) {
        const targetLocalX = (leftHandTarget.x - x) / (scale ?? 1.32);
        const targetLocalY = (leftHandTarget.y - y) / (scale ?? 1.32);
        const armDx = targetLocalX - (-10);
        const armDy = targetLocalY - shoulderY;
        const targetAngle = (Math.atan2(armDy, armDx) * 180) / Math.PI;
        leftArmAngle1 = targetAngle + Math.sin(timeSec * 6) * 3;
        leftArmAngle2 = 8 - Math.cos(timeSec * 5) * 4;
    }
    // Active Walking Stride Kinematics
    if (isWalking) {
        const walkPhase = timeSec * 9;
        const stride = Math.sin(walkPhase);
        leftLegAngle1 = (leftLegAngle1 ?? 90) + stride * 32;
        rightLegAngle1 = (rightLegAngle1 ?? 90) - stride * 32;
        leftLegAngle2 = stride > 0 ? stride * 35 : 0;
        rightLegAngle2 = stride < 0 ? -stride * 35 : 0;
        if (!pointTarget)
            rightArmAngle1 = (rightArmAngle1 ?? 90) + stride * 35;
        if (!leftHandTarget)
            leftArmAngle1 = (leftArmAngle1 ?? 90) - stride * 35;
    }
    // Arms Forward Kinematics
    const upperArmLen = 78;
    const foreArmLen = 78;
    // Left arm
    const radL1 = (leftArmAngle1 * Math.PI) / 180;
    const elbowLX = -10 + Math.cos(radL1) * upperArmLen;
    const elbowLY = shoulderY + Math.sin(radL1) * upperArmLen;
    const radL2 = ((leftArmAngle1 + leftArmAngle2) * Math.PI) / 180;
    const handLX = elbowLX + Math.cos(radL2) * foreArmLen;
    const handLY = elbowLY + Math.sin(radL2) * foreArmLen;
    // Right arm
    const radR1 = (rightArmAngle1 * Math.PI) / 180;
    const elbowRX = 10 + Math.cos(radR1) * upperArmLen;
    const elbowRY = shoulderY + Math.sin(radR1) * upperArmLen;
    const radR2 = ((rightArmAngle1 + rightArmAngle2) * Math.PI) / 180;
    const handRX = elbowRX + Math.cos(radR2) * foreArmLen;
    const handRY = elbowRY + Math.sin(radR2) * foreArmLen;
    // Legs Forward Kinematics
    const upperLegLen = 85;
    const lowerLegLen = 85;
    const radLL1 = (leftLegAngle1 * Math.PI) / 180;
    const kneeLX = Math.cos(radLL1) * upperLegLen;
    const kneeLY = hipY + Math.sin(radLL1) * upperLegLen;
    const radLL2 = ((leftLegAngle1 + leftLegAngle2) * Math.PI) / 180;
    const footLX = kneeLX + Math.cos(radLL2) * lowerLegLen;
    const footLY = kneeLY + Math.sin(radLL2) * lowerLegLen;
    const radRL1 = (rightLegAngle1 * Math.PI) / 180;
    const kneeRX = Math.cos(radRL1) * upperLegLen;
    const kneeRY = hipY + Math.sin(radRL1) * upperLegLen;
    const radRL2 = ((rightLegAngle1 + rightLegAngle2) * Math.PI) / 180;
    const footRX = kneeRX + Math.cos(radRL2) * lowerLegLen;
    const footRY = kneeRY + Math.sin(radRL2) * lowerLegLen;
    // Pupil offsets for gaze
    const pOffsetX = gazeX * 6;
    const pOffsetY = gazeY * 5;
    // Facial features markup
    let eyesMarkup = "";
    if (blink) {
        eyesMarkup = `
      <path d="M -44 -16 Q -24 -6 -4 -16" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M 22 -14 Q 38 -4 54 -14" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
    `;
    }
    else if (eyeStyle === "deadpan_dots") {
        eyesMarkup = `
      <line x1="-36" y1="-16" x2="-12" y2="-16" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      <line x1="26" y1="-14" x2="50" y2="-14" stroke="#111" stroke-width="7" stroke-linecap="round"/>
    `;
    }
    else if (eyeStyle === "side_eye") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-10" cy="-16" r="8" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="50" cy="-14" r="7" fill="#111111"/>
    `;
    }
    else if (eyeStyle === "sparkle_star") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <text x="-24" y="-8" font-size="24" fill="#eab308" text-anchor="middle" font-weight="bold">★</text>
      <text x="38" y="-6" font-size="20" fill="#eab308" text-anchor="middle" font-weight="bold">★</text>
    `;
    }
    else if (eyeStyle === "tear_crying") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-20" cy="-14" r="6" fill="#111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="42" cy="-12" r="5" fill="#111"/>
      <!-- Flowing Tears -->
      <path d="M -24 -2 Q -35 25 -28 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M 38 0 Q 48 25 42 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
    `;
    }
    else if (eyeStyle === "eye_pop") {
        // Looney tunes eye pop on spring stalks
        eyesMarkup = `
      <path d="M -24 -16 Q -50 -40 -70 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="-75" cy="-20" rx="26" ry="32" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="-75" cy="-20" r="10" fill="#ef4444"/>

      <path d="M 38 -14 Q 60 -40 85 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="90" cy="-20" rx="24" ry="30" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="90" cy="-20" r="9" fill="#ef4444"/>
    `;
    }
    else if (eyeStyle === "tim_burton") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-12" rx="28" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="38" cy="-10" rx="24" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="-24" cy="-16" rx="20" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="5" fill="#111"/>
      <circle cx="38" cy="-14" r="5" fill="#111"/>
    `;
    }
    else if (eyeStyle === "ps1") {
        eyesMarkup = `
      <polygon points="-44,-16 -24,-34 -4,-16 -24,2" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <polygon points="20,-14 38,-32 56,-14 38,4" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <rect x="-29" y="-21" width="10" height="10" fill="#000"/>
      <rect x="33" y="-19" width="10" height="10" fill="#000"/>
    `;
    }
    else if (eyeStyle === "shock") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="25" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <ellipse cx="38" cy="-14" rx="22" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <circle cx="-24" cy="-16" r="4" fill="#111111"/>
      <circle cx="38" cy="-14" r="4" fill="#111111"/>
    `;
    }
    else if (eyeStyle === "laser") {
        eyesMarkup = `
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="12" fill="#ff0033"/>
      <circle cx="38" cy="-14" r="12" fill="#ff0033"/>
    `;
    }
    else {
        // Exact Reference Eyes
        eyesMarkup = `
      <path d="M -44 -34 Q -28 -44 -12 -36" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${-20 + pOffsetX} ${-36 + pOffsetY} C ${-8 + pOffsetX} ${-36 + pOffsetY} ${-2 + pOffsetX} ${-24 + pOffsetY} ${-8 + pOffsetX} ${-6 + pOffsetY} C ${-14 + pOffsetX} ${8 + pOffsetY} ${-26 + pOffsetX} ${6 + pOffsetY} ${-26 + pOffsetX} ${-8 + pOffsetY} C ${-26 + pOffsetX} ${-24 + pOffsetY} ${-26 + pOffsetX} ${-36 + pOffsetY} ${-20 + pOffsetX} ${-36 + pOffsetY} Z" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${42 + pOffsetX} ${-34 + pOffsetY} C ${54 + pOffsetX} ${-34 + pOffsetY} ${58 + pOffsetX} ${-22 + pOffsetY} ${54 + pOffsetX} ${-4 + pOffsetY} C ${49 + pOffsetX} ${10 + pOffsetY} ${39 + pOffsetX} ${8 + pOffsetY} ${39 + pOffsetX} ${-6 + pOffsetY} C ${39 + pOffsetX} ${-22 + pOffsetY} ${38 + pOffsetX} ${-34 + pOffsetY} ${42 + pOffsetX} ${-34 + pOffsetY} Z" fill="#111111"/>
    `;
    }
    // If gazeTarget is provided, dynamically solve gazeX, gazeY, and headTilt
    if (state.gazeTarget) {
        const dx = state.gazeTarget.x - x;
        const dy = state.gazeTarget.y - (y - 120);
        const dist = Math.hypot(dx, dy) || 1;
        gazeX = Math.max(-1, Math.min(1, dx / Math.max(300, dist * 0.7)));
        gazeY = Math.max(-1, Math.min(1, dy / Math.max(300, dist * 0.7)));
        headTilt ?? (headTilt = Math.max(-14, Math.min(14, (dy / dist) * 12)));
    }
    // Eyebrows (supporting continuous independent left/right controls)
    const hL = state.eyebrowLeftHeight ?? eyebrowHeight;
    const hR = state.eyebrowRightHeight ?? eyebrowHeight;
    let ebL_Y = -48 - hL;
    let ebR_Y = -44 - hR;
    if (eyebrowRaiseLeft || (state.eyebrowLeftHeight && state.eyebrowLeftHeight > 8)) {
        ebL_Y -= 14; // High arched skeptical eyebrow
    }
    const tL = state.eyebrowLeftTilt !== undefined ? state.eyebrowLeftTilt : eyebrowTilt * 8;
    const tR = state.eyebrowRightTilt !== undefined ? state.eyebrowRightTilt : eyebrowTilt * 8;
    const eyebrowsMarkup = `
    <path d="M -45 ${ebL_Y + tL} Q -25 ${ebL_Y - 14} -5 ${ebL_Y - tL}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
    <path d="M 22 ${ebR_Y - tR} Q 42 ${ebR_Y - 14} 62 ${ebR_Y + tR}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
  `;
    // Mouth markup
    const mouthY = 32;
    const mouthH = Math.max(16, 26 + mouthOpen * 18);
    let mouthMarkup = "";
    if (state.mouthWobble && state.mouthWobble > 0.15) {
        const wamp = state.mouthWobble * 10;
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -26 0 Q -15 ${-wamp} -4 0 Q 8 ${wamp} 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
    }
    else if (mouthShape === "deadpan_line" || (state.mouthSmile !== undefined && Math.abs(state.mouthSmile) < 0.15)) {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <line x1="-28" y1="0" x2="22" y2="0" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `;
    }
    else if (mouthShape === "cringe_wavy") {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -26 0 Q -15 -8 -4 0 Q 8 8 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
    }
    else if (mouthShape === "jaw_drop") {
        // Extreme cartoon dropped jaw
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY})">
        <path d="M -25 -10 L 25 -10 L 20 85 C 0 95 -10 95 -20 85 Z" fill="#2b0a0a" stroke="#111111" stroke-width="6"/>
        <rect x="-18" y="-8" width="36" height="12" rx="3" fill="#ffffff"/>
        <!-- Long floppy tongue -->
        <path d="M -12 40 Q 0 90 25 75 Q 10 50 12 40 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      </g>
    `;
    }
    else if (mouthShape === "open_o") {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <ellipse cx="-2" cy="0" rx="16" ry="20" fill="#221111" stroke="#111111" stroke-width="6"/>
        <ellipse cx="-2" cy="8" rx="10" ry="6" fill="#e11d48"/>
      </g>
    `;
    }
    else if (mouthShape === "smirk") {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -24 4 Q 0 8 26 -6" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `;
    }
    else if (mouthShape === "wide_grin") {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -28 -6 Q 0 26 28 -6 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        <line x1="-28" y1="-6" x2="28" y2="-6" stroke="#111111" stroke-width="4"/>
        <line x1="-10" y1="-6" x2="-10" y2="10" stroke="#111111" stroke-width="3"/>
        <line x1="8" y1="-6" x2="8" y2="10" stroke="#111111" stroke-width="3"/>
      </g>
    `;
    }
    else if (mouthShape === "scream") {
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <ellipse cx="-2" cy="10" rx="26" ry="34" fill="#1b0808" stroke="#111111" stroke-width="7"/>
        <rect x="-20" y="-5" width="40" height="10" rx="3" fill="#fff"/>
        <ellipse cx="-2" cy="28" rx="14" ry="8" fill="#e84a5f"/>
      </g>
    `;
    }
    else {
        // Default & speech flapping: Iconic Rectangular Teeth Box
        mouthMarkup = `
      <g id="mouth" transform="translate(0, ${mouthY}) rotate(4)">
        <path d="M -30 ${-mouthH / 2} L 24 ${-mouthH / 2 + 2} L 18 ${mouthH / 2} L -28 ${mouthH / 2 - 2} Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        ${mouthH > 28 ? `<line x1="-27" y1="0" x2="20" y2="0" stroke="#111111" stroke-width="3" opacity="0.3"/>` : ""}
      </g>
    `;
    }
    // Comic FX Markup
    let fxMarkup = "";
    if (comicFx === "sweat_drop") {
        fxMarkup = `
      <g transform="translate(75, -80)">
        <path d="M 0 -20 C 15 -10 15 15 0 20 C -15 15 -15 -10 0 -20 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3" filter="url(#glow)"/>
      </g>
    `;
    }
    else if (comicFx === "question_marks") {
        fxMarkup = `
      <g transform="translate(85, -110)">
        <text x="0" y="0" font-family="'Impact', sans-serif" font-size="36" fill="#f43f5e" filter="url(#glow)">?</text>
        <text x="25" y="-20" font-family="'Impact', sans-serif" font-size="28" fill="#ec4899">?</text>
      </g>
    `;
    }
    else if (comicFx === "exclamation") {
        fxMarkup = `
      <g transform="translate(0, -175)">
        <polygon points="0,0 -20,-30 0,-25 20,-30" fill="#eab308" stroke="#ca8a04" stroke-width="3" filter="url(#glow)"/>
        <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="48" font-weight="bold" fill="#ef4444" text-anchor="middle" filter="url(#glow)">!</text>
      </g>
    `;
    }
    else if (comicFx === "speed_lines") {
        fxMarkup = `
      <g stroke="#94a3b8" stroke-width="4" opacity="0.6">
        <line x1="-120" y1="-80" x2="-60" y2="-80"/>
        <line x1="-140" y1="-40" x2="-70" y2="-40"/>
        <line x1="-130" y1="0" x2="-65" y2="0"/>
      </g>
    `;
    }
    // Hand props helper
    function renderProp(prop, hx, hy, angle) {
        if (prop === "none")
            return "";
        if (prop === "pointer") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <line x1="0" y1="0" x2="110" y2="-70" stroke="#8b4513" stroke-width="6" stroke-linecap="round"/>
          <circle cx="110" cy="-70" r="6" fill="#e74c3c"/>
        </g>
      `;
        }
        if (prop === "phone") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-16" y="-36" width="32" height="52" rx="6" fill="#222" stroke="#111" stroke-width="4"/>
          <rect x="-13" y="-30" width="26" height="40" fill="#673ab7"/>
          <circle cx="0" cy="12" r="3" fill="#fff"/>
        </g>
      `;
        }
        if (prop === "caliper") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <path d="M 0 0 L 120 -60" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          <path d="M 120 -60 L 120 -20 M 60 -30 L 60 -10" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round"/>
          <rect x="50" y="-45" width="40" height="20" rx="3" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
          <text x="70" y="-31" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">0.02mm</text>
        </g>
      `;
        }
        if (prop === "stamp") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-18" y="-45" width="36" height="15" rx="4" fill="#b91c1c" stroke="#111" stroke-width="3"/>
          <rect x="-8" y="-30" width="16" height="30" fill="#78350f" stroke="#111" stroke-width="3"/>
          <circle cx="0" cy="5" r="14" fill="#92400e"/>
        </g>
      `;
        }
        if (prop === "diet_coke") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-14" y="-38" width="28" height="46" rx="4" fill="#c41230" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-36" width="24" height="8" fill="#e0e0e0"/>
          <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Diet</text>
          <text x="0" y="-1" font-family="'Impact', sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Coke</text>
        </g>
      `;
        }
        if (prop === "fidget_spinner") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <circle cx="0" cy="0" r="12" fill="#111"/>
          <circle cx="0" cy="-24" r="10" fill="#06b6d4"/>
          <circle cx="21" cy="12" r="10" fill="#f59e0b"/>
          <circle cx="-21" cy="12" r="10" fill="#ec4899"/>
        </g>
      `;
        }
        if (prop === "coffee_cup") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-14" y="-30" width="28" height="38" rx="4" fill="#ffffff" stroke="#111" stroke-width="4"/>
          <path d="M 14 -20 Q 26 -15 14 -5" fill="none" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-18" width="24" height="14" fill="#854d0e"/>
        </g>
      `;
        }
        if (prop === "syringe") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <rect x="-8" y="-35" width="16" height="42" rx="3" fill="#38bdf8" stroke="#111" stroke-width="3"/>
          <line x1="0" y1="7" x2="0" y2="24" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
          <rect x="-14" y="-42" width="28" height="8" rx="2" fill="#0284c7"/>
        </g>
      `;
        }
        if (prop === "money_bag") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#a16207" stroke-width="4"/>
          <text x="0" y="7" font-family="'Impact', sans-serif" font-size="20" fill="#713f12" text-anchor="middle">$</text>
        </g>
      `;
        }
        if (prop === "bread") {
            return `
        <g transform="translate(${hx} ${hy}) rotate(${angle})">
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#fde047" stroke="#ca8a04" stroke-width="4"/>
          <line x1="-12" y1="-8" x2="-6" y2="8" stroke="#a16207" stroke-width="3"/>
          <line x1="6" y1="-8" x2="12" y2="8" stroke="#a16207" stroke-width="3"/>
        </g>
      `;
        }
        return "";
    }
    // Character Gender, Hair, and Clothes Resolution
    const charGender = state.gender ?? "male";
    const charHair = state.hairStyle ?? (charGender === "female" ? "female_long" : charGender === "doctor" ? "doctor_cap" : charGender === "bodybuilder" ? "bodybuilder_bald" : charGender === "widow" ? "widow_veil" : "host_classic");
    const charClothes = state.clothes ?? (charGender === "female" ? "dress_pink" : charGender === "doctor" ? "doctor_scrubs" : charGender === "bodybuilder" ? "bodybuilder_tank" : charGender === "widow" ? "dress_black" : "none");
    const hasEyelashes = state.eyelashes ?? (charGender === "female" || charGender === "widow");
    const hasBlush = state.blush ?? (charGender === "female" || charGender === "widow");
    // Clothes Markup
    let clothesMarkup = "";
    if (charClothes === "dress_pink") {
        clothesMarkup = `
      <path d="M -22 -75 C -30 -45 -14 -10 -26 55 L 26 55 C 14 -10 30 -45 22 -75 Z" fill="#f472b6" stroke="#db2777" stroke-width="5"/>
      <path d="M -26 55 Q 0 78 26 55" stroke="#db2777" stroke-width="4" fill="#f472b6"/>
      <!-- Sparkly necklace -->
      <path d="M -15 -75 Q 0 -60 15 -75" stroke="#fde047" stroke-width="3" fill="none"/>
      <circle cx="0" cy="-60" r="4" fill="#ec4899"/>
    `;
    }
    else if (charClothes === "dress_black") {
        clothesMarkup = `
      <path d="M -24 -80 C -32 -50 -16 -10 -30 60 L 30 60 C 16 -10 32 -50 24 -80 Z" fill="#18181b" stroke="#09090b" stroke-width="5"/>
      <!-- Lace Collar -->
      <path d="M -24 -80 Q 0 -60 24 -80" stroke="#f4f4f5" stroke-width="4" fill="none"/>
    `;
    }
    else if (charClothes === "crop_top_leggings") {
        clothesMarkup = `
      <path d="M -24 -85 C -30 -65 -18 -52 -18 -52 L 18 -52 C 18 -52 30 -65 24 -85 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="4"/>
      <!-- Exposed Midriff -->
      <rect x="-16" y="-50" width="32" height="22" fill="#fed89b"/>
      <!-- High-Waisted Leggings -->
      <polygon points="-22,-28 22,-28 26,55 -26,55" fill="#18181b" stroke="#0f172a" stroke-width="4"/>
      <line x1="-20" y1="-28" x2="-24" y2="55" stroke="#06b6d4" stroke-width="2"/>
      <line x1="20" y1="-28" x2="24" y2="55" stroke="#06b6d4" stroke-width="2"/>
    `;
    }
    else if (charClothes === "doctor_scrubs") {
        clothesMarkup = `
      <polygon points="-30,-90 30,-90 34,50 -34,50" fill="#0d9488" stroke="#115e59" stroke-width="5"/>
      <polygon points="-12,-90 0,-65 12,-90" fill="#fed89b"/>
      <!-- Stethoscope -->
      <path d="M -20,-90 Q 0,-25 20,-90" stroke="#475569" stroke-width="5" fill="none"/>
      <circle cx="0" cy="-30" r="8" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
    `;
    }
    else if (charClothes === "bodybuilder_tank") {
        clothesMarkup = `
      <!-- Massive Bulging Traps, Deltoids, Pecs, and Tapered Waist -->
      <path d="M -65 -85 C -88 -75 -85 -35 -55 -30 L -32 50 L 32 50 L 55 -30 C 85 -35 88 -75 65 -85 Z" fill="#eab308" stroke="#ca8a04" stroke-width="5"/>
      <!-- Pec Cleavage Separation -->
      <path d="M 0 -80 L 0 -15 M -40 -35 Q 0 -15 40 -35" stroke="#ca8a04" stroke-width="4" fill="none"/>
      <!-- 8-Pack Abs Lines -->
      <line x1="0" y1="-15" x2="0" y2="45" stroke="#a16207" stroke-width="4"/>
      <line x1="-16" y1="-2" x2="16" y2="-2" stroke="#a16207" stroke-width="3"/>
      <line x1="-16" y1="14" x2="16" y2="14" stroke="#a16207" stroke-width="3"/>
      <line x1="-16" y1="30" x2="16" y2="30" stroke="#a16207" stroke-width="3"/>
    `;
    }
    else if (charClothes === "patient_gown") {
        clothesMarkup = `
      <polygon points="-28,-85 28,-85 36,55 -36,55" fill="#e0f2fe" stroke="#38bdf8" stroke-width="5"/>
      <circle cx="-10" cy="-40" r="3" fill="#0284c7"/>
      <circle cx="10" cy="-20" r="3" fill="#0284c7"/>
    `;
    }
    else if (charClothes === "suit") {
        clothesMarkup = `
      <polygon points="-28,-90 28,-90 32,55 -32,55" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
      <polygon points="-10,-90 0,-40 10,-90" fill="#ffffff"/>
      <polygon points="-4,-90 0,-30 4,-90 0,0" fill="#ef4444"/> <!-- Red Tie -->
    `;
    }
    else if (charClothes === "hoodie") {
        clothesMarkup = `
      <polygon points="-28,-90 28,-90 32,55 -32,55" fill="#64748b" stroke="#334155" stroke-width="5"/>
      <rect x="-18" y="10" width="36" height="25" rx="4" fill="#475569"/> <!-- Pocket -->
    `;
    }
    else if (costume === "tech_bro") {
        clothesMarkup = `
      <path d="M -35 -90 L 35 -90 L 40 10 L -40 10 Z" fill="#1a365d" stroke="#0f172a" stroke-width="5"/>
      <path d="M 0 -90 L 0 10" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="12" y="-70" width="18" height="8" rx="2" fill="#e2e8f0"/>
    `;
    }
    // Hair Markup
    let hairMarkup = "";
    if (charHair === "female_long") {
        hairMarkup = `
      <!-- Flowing Long Brunette/Black Hair Framing Face -->
      <path d="
        M -85 140
        C -125 50 -130 -60 -75 -125
        C -20 -170 70 -170 115 -115
        C 155 -55 150 50 120 140
        C 95 100 80 35 70 -5
        L -65 -5
        C -75 35 -90 100 -85 140 Z"
        fill="#291811" stroke="#160d09" stroke-width="6" stroke-linejoin="round"/>
    `;
    }
    else if (charHair === "female_ponytail") {
        hairMarkup = `
      <!-- High Ponytail Hair with Bangs -->
      <path d="M -80 -10 C -110 -80 -40 -155 20 -155 C 90 -155 130 -80 100 -10 Z" fill="#1c1917" stroke="#111" stroke-width="6"/>
      <!-- Swinging Ponytail Tail -->
      <path d="M 80 -110 C 150 -140 185 -70 155 30 C 130 60 110 0 90 -80 Z" fill="#1c1917" stroke="#111" stroke-width="5"/>
      <ellipse cx="85" cy="-95" rx="12" ry="8" fill="#f43f5e"/> <!-- Cute Scrunchie -->
    `;
    }
    else if (charHair === "female_blonde") {
        hairMarkup = `
      <!-- Voluminous Glam Blonde Curls -->
      <path d="
        M -90 125
        C -140 40 -130 -80 -70 -135
        C -15 -175 75 -175 125 -115
        C 165 -50 155 40 120 125
        C 95 70 80 20 70 -5
        L -65 -5
        C -75 20 -90 70 -90 125 Z"
        fill="#fde047" stroke="#ca8a04" stroke-width="6" stroke-linejoin="round"/>
    `;
    }
    else if (charHair === "doctor_cap") {
        hairMarkup = `
      <!-- Surgical Cap & Headlamp -->
      <path d="M -80 0 C -90 -85 -50 -140 0 -140 C 60 -140 95 -85 85 0 Z" fill="#0d9488" stroke="#115e59" stroke-width="6"/>
      <rect x="-75" y="-15" width="155" height="18" rx="4" fill="#14b8a6"/>
      <!-- Forehead Surgical Lamp -->
      <circle cx="0" cy="-60" r="20" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
      <circle cx="0" cy="-60" r="12" fill="#38bdf8" filter="url(#glow)"/>
    `;
    }
    else if (charHair === "bodybuilder_bald") {
        hairMarkup = `
      <!-- Bald Head with Red Sweatband -->
      <rect x="-70" y="-30" width="140" height="20" rx="4" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
    `;
    }
    else if (charHair === "widow_veil") {
        hairMarkup = `
      <!-- Black Victorian Lace Mourning Veil -->
      <path d="
        M -95 160
        C -130 60 -120 -80 -60 -135
        C 0 -170 70 -170 120 -115
        C 160 -50 160 60 125 160 Z"
        fill="#09090b" opacity="0.9" stroke="#18181b" stroke-width="6"/>
      <circle cx="-35" cy="-120" r="14" fill="#450a0a" stroke="#18181b" stroke-width="3"/>
    `;
    }
    else if (charHair === "none") {
        hairMarkup = "";
    }
    else {
        // Default Host Classic Curly Hair
        hairMarkup = `
      <path id="hair-back" d="
        M -75 25
        C -115 15 -125 -45 -85 -70
        C -115 -115 -60 -160 -15 -152
        C 15 -185 85 -175 105 -130
        C 145 -110 160 -45 130 -5
        C 160 45 135 110 90 95
        C 80 55 75 25 65 -5
        L -65 0 Z"
        fill="#0d0d0d" stroke="#0d0d0d" stroke-width="6" stroke-linejoin="round"/>
    `;
    }
    // Extra female facial features (eyelashes & rosy cheeks)
    let femaleDetails = "";
    if (hasEyelashes) {
        femaleDetails += `
      <path d="M -44 -28 L -52 -36 M -36 -34 L -40 -44 M -20 -36 L -20 -46" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <path d="M 44 -26 L 52 -34 M 36 -32 L 40 -42 M 20 -34 L 20 -44" stroke="#111" stroke-width="4" stroke-linecap="round"/>
    `;
    }
    if (hasBlush) {
        femaleDetails += `
      <ellipse cx="-48" cy="18" rx="14" ry="8" fill="#fb7185" opacity="0.6"/>
      <ellipse cx="48" cy="18" rx="14" ry="8" fill="#fb7185" opacity="0.6"/>
    `;
    }
    return `
    <g id="${id}" class="stick-figure" data-gender="${charGender}" data-expression="${expression ?? 'default'}" data-pose="${pose ?? 'default'}" transform="translate(${x}, ${y}) rotate(${rotation}) scale(${scale})" opacity="${alpha}">
      <!-- Floor Drop Shadow -->
      <ellipse cx="0" cy="${footLY > footRY ? footLY + 10 : footRY + 10}" rx="65" ry="14" fill="#111111" opacity="0.16"/>

      <!-- Legs (Back to Front) -->
      <g id="legs" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <line x1="0" y1="${hipY}" x2="${kneeLX}" y2="${kneeLY}"/>
        <line x1="${kneeLX}" y1="${kneeLY}" x2="${footLX}" y2="${footLY}"/>

        <line x1="0" y1="${hipY}" x2="${kneeRX}" y2="${kneeRY}"/>
        <line x1="${kneeRX}" y1="${kneeRY}" x2="${footRX}" y2="${footRY}"/>
      </g>

      <!-- Spine & Torso with arms -->
      <g id="torso" transform="rotate(${spineLean} 0 ${hipY})">
        <line x1="0" y1="${neckY}" x2="0" y2="${hipY}" stroke="#111111" stroke-width="8" stroke-linecap="round"/>

        ${clothesMarkup}

        <!-- Left Arm with 2-finger V hand -->
        <g id="left-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${shoulderY}" x2="${elbowLX}" y2="${elbowLY}"/>
          <line x1="${elbowLX}" y1="${elbowLY}" x2="${handLX}" y2="${handLY}"/>
          <!-- 2-finger open V hand -->
          <line x1="${handLX}" y1="${handLY}" x2="${handLX - 22}" y2="${handLY - 12}"/>
          <line x1="${handLX}" y1="${handLY}" x2="${handLX - 18}" y2="${handLY + 20}"/>
          ${renderProp(leftHandProp, handLX, handLY, leftArmAngle1 + leftArmAngle2)}
        </g>

        <!-- Right Arm with 2-finger V hand -->
        <g id="right-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${shoulderY}" x2="${elbowRX}" y2="${elbowRY}"/>
          <line x1="${elbowRX}" y1="${elbowRY}" x2="${handRX}" y2="${handRY}"/>
          <!-- 2-finger open V hand -->
          <line x1="${handRX}" y1="${handRY}" x2="${handRX + 22}" y2="${handRY - 14}"/>
          <line x1="${handRX}" y1="${handRY}" x2="${handRX + 20}" y2="${handRY + 18}"/>
          ${renderProp(rightHandProp, handRX, handRY, rightArmAngle1 + rightArmAngle2)}
        </g>

        <!-- HEAD GROUP (Crisp Casually Explained / Alex Meyers proportions) -->
        <g id="head" transform="translate(${neckX}, ${neckY}) rotate(${headTilt}) scale(0.72)">
          ${fxMarkup}
          ${hairMarkup}

          <!-- Warm Creamy Peach Head Skin (tilted egg/oval shape) -->
          <path id="head-skin" d="
            M -68 15
            C -82 -40 -68 -80 -18 -85
            C 38 -87 76 -50 78 15
            C 78 68 48 88 5 88
            C -40 88 -68 70 -68 15 Z"
            fill="#fed89b" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>

          <!-- Nose/Cheek Tick Mark (from reference image) -->
          <path d="M -12 8 L -10 20" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>

          <!-- Facial Features -->
          <g id="face">
            ${eyebrowsMarkup}
            ${eyesMarkup}
            ${femaleDetails}
            ${mouthMarkup}
          </g>
        </g>
      </g>
    </g>
  `;
}
