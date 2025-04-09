import * as PIXI from "../libs/pixi.js";

export class Thing extends PIXI.TilingSprite {
	static NAMES = ["tape", "clock", "lighter", "book", "uno-red", "uno-blue", "disk"];
	static TRASH_NAMES = [...Thing.NAMES, "paper", "battery"];

	constructor(name, x = 0, y = 0) {
		const url = `assets/images/things/${name}.png`;
		super(PIXI.Texture.from(url), 128, 128);

		this.anchor.set(.5);

		this.frameTimer = 0;
		this.frameIndex = 0;
		this.frames = [0, 1, 2, 3, 4, 5, 6, 7];
		this.x = x;
		this.y = y;

		if (name == "tape")
			this.height = 256;
		else if (name == "book")
			this.height = 192;
		else if (name == "disk")
			this.frames = [0, 1, 2, 3];
	}

	updateAnimation() {
		if (this.frameTimer > 15) {
			this.stepAnimation();
			this.frameTimer = 0;
		}
	}

	rotate() {
		this.angle += 22.5;
	}
	stepAnimation() {
		if (this.frames.length <= 0) return;

		const frame = this.frames[this.frameIndex];
		this.tilePosition.x = -frame * this.width;

		this.frameIndex++;
		if (this.frameIndex >= this.frames.length)
			this.frameIndex = 0;
	}
}
