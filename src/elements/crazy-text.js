import * as utils from "../utils.js";

function randomTranslate(min = -1, max = 1) {
	return `${ utils.random(min, max) }px ${ utils.random(min, max) }px`;
}

function animateAppearance(element, delay) {
	const startX = utils.random(-64, 64);
	const startY = utils.random(-64, 64);

	element.style.translate = `${ startX }px ${ startY }px`;
	element.style.opacity = 0;

	return element.animate([
		{ opacity: 1 },
		{ translate: "0 0", opacity: 1 },
	], {
		delay,
		duration: 100,
		easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
		fill: "forwards",
	});
}
function animateJiggle(element) {
	return element.animate([
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
		{ translate: randomTranslate() },
	], {
		duration: 300,
		easing: "linear",
		iterations: Infinity,
	});
}

function createLine() {
	const element = document.createElement("div");
	element.className = "crazy-line";
	return element;
}
function createChar(char) {
	const index = CrazyText.FONT_MAP.indexOf(char);

	const element = document.createElement("div");
	element.className = "crazy-char";

	if (index >= 0) {
		const bgX = 100 / 3 * (index % 4);
		const bgY = 100 / 6 * Math.floor(index / 4);

		element.style.backgroundPosition = `${ bgX }% ${ bgY }%`;
	} else {
		element.style.background = "transparent";
	}

	return element;
}

export class CrazyText {
	static FONT_MAP = "abcdefghijklmnopqrstuvwxyz!?";
	static CHAR_FRAME_SIZE = 128;

	/** @param {string} text */
	constructor(text, delay = 500) {
		text = text.toLowerCase();

		this.element = document.createElement("div");
		this.element.className = "crazy-text";

		let lineElement = createLine();

		// Create chars
		for (let i = 0; i < text.length; i ++) {
			const char = text[i];

			// Append every char (except 'new line') to line element
			if (char != "\n") {
				const charElement = createChar(char);

				animateAppearance(charElement, delay + i * 40)
					.onfinish = () => animateJiggle(charElement);

				lineElement.appendChild(charElement);
			}

			// Append line to the text if line end is reached
			if (i == text.length - 1 || char == "\n") {
				this.element.appendChild(lineElement);
				lineElement = createLine();
			}
		}
	}
}
