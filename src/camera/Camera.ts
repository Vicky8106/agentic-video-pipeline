// Directorial Virtual Camera for 2D Vector Animation
// Features: Dynamic cinematic framing, punch-ins (1.3x - 2.2x), instant cuts, wide pans

export interface CameraState {
  centerX: number;
  centerY: number;
  zoom: number; // 1.0 = standard 1920x1080
}

export class Camera {
  private baseWidth: number = 1920;
  private baseHeight: number = 1080;

  // Active interpolated state
  public current: CameraState = {
    centerX: 960,
    centerY: 540,
    zoom: 1.0,
  };

  // Target framing
  public target: CameraState = {
    centerX: 960,
    centerY: 540,
    zoom: 1.0,
  };

  private isInstantCut: boolean = false;

  /**
   * Trauma (0..1): screen-shake energy. Purely opt-in — at 0 the camera
   * is byte-identical to the rock-solid path. Decays exponentially in
   * update(); deterministic integer-hash noise keeps renders reproducible.
   */
  public trauma: number = 0;
  public maxShake: number = 16;
  private lastMs: number | null = null;

  /** Kick the camera (slams, confiscations, pendulum near-misses). */
  public addTrauma(amount: number) {
    this.trauma = Math.min(1, Math.max(0, this.trauma + amount));
  }

  private noise1(n: number): number {
    let h = (n | 0) * 374761393 + 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    h = h ^ (h >> 16);
    return ((h >>> 0) % 2000) / 1000 - 1;
  }

  constructor(baseWidth = 1920, baseHeight = 1080) {
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }

  public setImmediate(state: Partial<CameraState>) {
    this.target = { ...this.target, ...state };
    this.current = { ...this.target };
    this.isInstantCut = true;
  }

  /**
   * Instant hard cut to new framing (comedic jump cut)
   */
  public cutTo(centerX: number, centerY: number, zoom: number = 1.0) {
    this.setImmediate({ centerX, centerY, zoom });
  }

  /**
   * Set target framing with fast, crisp punch-in response
   */
  public setTarget(xOrState: number | Partial<CameraState>, y?: number, zoom?: number) {
    if (typeof xOrState === "number") {
      this.target = {
        centerX: xOrState,
        centerY: y ?? this.target.centerY,
        zoom: zoom ?? this.target.zoom,
      };
    } else {
      this.target = {
        ...this.target,
        ...xOrState,
      };
    }
  }

  /**
   * Reset to standard wide locked-off framing
   */
  public setWide() {
    this.setTarget(960, 540, 1.0);
  }

  public shake(_intensity = 1.0) {
    // Pure rock-solid camera: zero shake
  }

  public triggerShake(_intensity = 1.0) {
    // Pure rock-solid camera: zero shake
  }

  /**
   * Smooth exponential lerp update for pans and zooms
   */
  public update(_timeMs: number, snappiness = 0.28) {
    if (this.lastMs === null) this.lastMs = _timeMs;
    const dt = Math.max(0, (_timeMs - this.lastMs) / 1000);
    this.lastMs = _timeMs;
    this.trauma *= Math.exp(-dt * 2.2);
    if (this.trauma < 0.001) this.trauma = 0;
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
  public getViewBox(_timeSec: number = 0): string {
    // Trauma shake: squared falloff, applied AFTER follow so it never
    // fights tracking. Zero trauma reproduces the rock-solid viewBox exactly.
    const shake = this.trauma * this.trauma;
    const frame = Math.floor(_timeSec * 60);
    const shX = this.noise1(frame * 2 + 1) * this.maxShake * shake;
    const shY = this.noise1(frame * 2 + 2) * this.maxShake * shake;
    const safeZoom = Math.max(0.5, Math.min(3.0, this.current.zoom + shake * 0.05));
    const w = this.baseWidth / safeZoom;
    const h = this.baseHeight / safeZoom;

    const halfW = w / 2;
    const halfH = h / 2;

    const cx = this.current.centerX + shX;
    const cy = this.current.centerY + shY;

    const minX = cx - halfW;
    const minY = cy - halfH;

    return `${minX.toFixed(2)} ${minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`;
  }
}

