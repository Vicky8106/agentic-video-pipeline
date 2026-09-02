export class AudioSync {
    constructor(audioSrc) {
        Object.defineProperty(this, "audio", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isLoaded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
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
    get audioElement() {
        return this.audio;
    }
    get currentTime() {
        return this.audio.currentTime;
    }
    get duration() {
        return this.audio.duration || 185;
    }
    get isPlaying() {
        return !this.audio.paused && !this.audio.ended;
    }
    play() {
        return this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    toggle() {
        if (this.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    }
    seek(seconds) {
        const clamped = Math.max(0, Math.min(this.duration, seconds));
        this.audio.currentTime = clamped;
        this.notify(clamped);
    }
    setPlaybackRate(rate) {
        this.audio.playbackRate = rate;
    }
    onTimeUpdate(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter((cb) => cb !== callback);
        };
    }
    notify(time) {
        for (const cb of this.listeners) {
            cb(time);
        }
    }
}
