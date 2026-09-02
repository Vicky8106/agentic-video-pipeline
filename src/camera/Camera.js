// Directorial Virtual Camera for 2D Vector Animation
// Features: Dynamic cinematic framing, punch-ins (1.3x - 2.2x), instant cuts, wide pans
export class Camera {
    constructor(baseWidth = 1920, baseHeight = 1080) {
        Object.defineProperty(this, "baseWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1920
        });
        Object.defineProperty(this, "baseHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1080
        });
        // Active interpolated state
        Object.defineProperty(this, "current", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                centerX: 960,
                centerY: 540,
                zoom: 1.0,
            }
        });
        // Target framing
        Object.defineProperty(this, "target", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                centerX: 960,
                centerY: 540,
                zoom: 1.0,
            }
        });
        Object.defineProperty(this, "isInstantCut", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
    }
    setImmediate(state) {
        this.target = { ...this.target, ...state };
        this.current = { ...this.target };
        this.isInstantCut = true;
    }
    /**
     * Instant hard cut to new framing (comedic jump cut)
     */
    cutTo(centerX, centerY, zoom = 1.0) {
        this.setImmediate({ centerX, centerY, zoom });
    }
    /**
     * Set target framing with fast, crisp punch-in response
     */
    setTarget(xOrState, y, zoom) {
        if (typeof xOrState === "number") {
            this.target = {
                centerX: xOrState,
                centerY: y ?? this.target.centerY,
                zoom: zoom ?? this.target.zoom,
            };
        }
        else {
            this.target = {
                ...this.target,
                ...xOrState,
            };
        }
    }
    /**
     * Reset to standard wide locked-off framing
     */
    setWide() {
        this.setTarget(960, 540, 1.0);
    }
    shake(_intensity = 1.0) {
        // Pure rock-solid camera: zero shake
    }
    triggerShake(_intensity = 1.0) {
        // Pure rock-solid camera: zero shake
    }
    /**
     * Smooth exponential lerp update for pans and zooms
     */
    update(_timeMs, snappiness = 0.28) {
        if (this.isInstantCut) {
            this.isInstantCut = false;
            return;
        }
        this.current.centerX += (this.target.centerX - this.current.centerX) * snappiness;
        this.current.centerY += (this.target.centerY - this.current.centerY) * snappiness;
        this.current.zoom += (this.target.zoom - this.current.zoom) * snappiness;
    }
    /**
     * Computes the SVG viewBox string for the current camera state
     * 100% Rock-solid, stable framing with crisp zoom and snap cuts
     */
    getViewBox(_timeSec = 0) {
        const safeZoom = Math.max(0.5, Math.min(3.0, this.current.zoom));
        const w = this.baseWidth / safeZoom;
        const h = this.baseHeight / safeZoom;
        const halfW = w / 2;
        const halfH = h / 2;
        const cx = this.current.centerX;
        const cy = this.current.centerY;
        const minX = cx - halfW;
        const minY = cy - halfH;
        return `${minX.toFixed(2)} ${minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
    }
}
