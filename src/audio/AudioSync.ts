export class AudioSync {
  private audio: HTMLAudioElement;
  private isLoaded: boolean = false;
  private listeners: ((time: number) => void)[] = [];

  constructor(audioSrc: string) {
    this.audio = new Audio(audioSrc);
    this.audio.preload = "auto";

    this.audio.addEventListener("loadedmetadata", () => {
      this.isLoaded = true;
      console.log(`[AudioSync] Audio loaded: ${this.audio.duration}s`);
    });

    this.audio.addEventListener("timeupdate", () => {
      this.notify(this.audio.currentTime);
    });
  }

  public get audioElement(): HTMLAudioElement {
    return this.audio;
  }

  public get currentTime(): number {
    return this.audio.currentTime;
  }

  public get duration(): number {
    return this.audio.duration || 185;
  }

  public get isPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended;
  }

  public play(): Promise<void> {
    return this.audio.play();
  }

  public pause(): void {
    this.audio.pause();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(seconds: number): void {
    const clamped = Math.max(0, Math.min(this.duration, seconds));
    this.audio.currentTime = clamped;
    this.notify(clamped);
  }

  public setPlaybackRate(rate: number): void {
    this.audio.playbackRate = rate;
  }

  public onTimeUpdate(callback: (time: number) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notify(time: number): void {
    for (const cb of this.listeners) {
      cb(time);
    }
  }
}
