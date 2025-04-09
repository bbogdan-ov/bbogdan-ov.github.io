export class Timer {
	constructor(duration = 0, time = 0) {
		this.duration = duration;
		this.time = time;
		this.paused = false;
		this.finished = false;
		this.justFinished = false;
	}

	update(delta) {
		this.justFinished = false;
		if (this.finished) return;

		this.time += delta;
		if (this.time >= this.duration) {
			this.time = this.duration;
			this.finished = true;
			this.justFinished = true;
		}
	}

	start(duration) {
		this.time = 0;
		this.duration = duration ?? this.duration;
		this.finished = false;
	}
	stop() {
		this.time = this.duration;
		this.finished = true;
	}

	/** @returns {number} */
	get progress() {
		return this.time / this.duration;
	}
}
