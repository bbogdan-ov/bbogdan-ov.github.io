import * as utils from "./utils.js";
import { Website } from "./website.js";

document.addEventListener("DOMContentLoaded", () => {
	const website = new Website();

	window.website = website;

	addEventListener("pointerdown", e => {
		if (
			e.target instanceof HTMLButtonElement ||
			e.target instanceof HTMLAnchorElement
		) {
			utils.playSound("click", .5);
		}
	})
})
