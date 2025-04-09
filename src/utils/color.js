import * as utils from "../utils.js";

export class Color {
	constructor(red, green, blue) {
		this.rgb = [red, green, blue];
	}

	toString() {
		return `rgb(${ this.getRedInt() }, ${ this.getGreenInt() }, ${ this.getBlueInt() })`;
	}
	getRedInt() {
		return Math.floor(this.rgb[0] * 255);
	}
	getGreenInt() {
		return Math.floor(this.rgb[1] * 255);
	}
	getBlueInt() {
		return Math.floor(this.rgb[2] * 255);
	}

	get red() {
		return this.rgb[0];
	}
	get green() {
		return this.rgb[1];
	}
	get blue() {
		return this.rgb[2];
	}

	/** Lerp between two RGB colors and return a new one */
	static lerpNew(from, to, t) {
		return new Color(
			utils.lerp(from.red, to.red, t),
			utils.lerp(from.green, to.green, t),
			utils.lerp(from.blue, to.blue, t),
		);
	}
	static fromHex(hex) {
		return new Color(
			((hex & 0xff0000) >> 16) / 255,
			((hex & 0x00ff00) >> 8) / 255,
			(hex & 0x0000ff) / 255,
		);
	}
}
