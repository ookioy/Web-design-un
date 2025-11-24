class Stopwatch {

    #startTime = 0;
    #elapsedMs = 0;
    #isRunning = false;
    #laps = [];

    start() {
        if (this.#isRunning) { return; }
        this.#startTime = performance.now();
        this.#isRunning = true;
    }

    pause() {
        if (!this.#isRunning) return;
        this.#elapsedMs += performance.now() - this.#startTime;
        this.#isRunning = false;
    }

    resume() {
        if (this.#isRunning) return;
        this.#startTime = performance.now();
        this.#isRunning = true;
    }

    reset() {
        this.#startTime = 0;
        this.#elapsedMs = 0;
        this.#isRunning = false;
        this.#laps = [];
    }

    lap() {
        const timeMs = this.getTime();
        const lastLap = this.#laps[this.#laps.length - 1]?.timeMs || 0;

        const lap = {
            id: this.#laps.length + 1,
            timeMs,
            deltaMs: timeMs - lastLap
        };

        this.#laps.push(lap);
    }


    getTime() {
        if (this.#isRunning) {
            return this.#elapsedMs + (performance.now() - this.#startTime);
        }
        return this.#elapsedMs;
    }


    getLaps() {
        return this.#laps.map(lap => ({ ...lap }));
    }

    static format(ms) {
        const h = Math.floor(ms / 3600000);
        ms %= 3600000;
        const m = Math.floor(ms / 60000);
        ms %= 60000;
        const s = Math.floor(ms / 1000);
        const msPart = Math.floor(ms % 1000);
        const pad = (n, z = 2) => String(n).padStart(z, '0');
        return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(msPart, 3)}`;
    }
}