import * as utils from "./utils.js";
import { Website } from "./website.js";

document.addEventListener("DOMContentLoaded", () => {
	new Website();

	addEventListener("pointerdown", e => {
		if (
			e.target instanceof HTMLButtonElement ||
			e.target instanceof HTMLAnchorElement
		) {
			utils.playSound("click", .5);
		}
	})
})
