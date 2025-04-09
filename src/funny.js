import * as utils from "./utils.js";

export function playGoofySounds() {
	utils.playSound(utils.randomItem(["tada", "nerd", "cola", "spring", "slide", "yell", "scream", "sad", "raaah"]), .5);
}

/** @param el {HTMLElement}  */
export function animateFlyout(el) {
	if (typeof el == "string")
		el = document.querySelector(el);

	if (el.classList.contains("animating"))
		return;

	el.classList.add("animating");
	utils.playSound("slide", .3);

	const frames = [
		{ opacity: 0, transform: "rotateZ(-270deg) rotateY(360deg) translate(-100%, 300%)" },
		{ opacity: 1 },
		{ opacity: 1, transform: "rotateZ(0deg) rotateY(0deg) translate(0%, 0)" },
	]
	const opts = {
		duration: 5000,
		easing: "ease-out",
		fill: "forwards",
	};

	el.style.pointerEvents = "";
	el.animate(frames, opts).onfinish = () => {
		el.classList.remove("animating");
		utils.playSound("tada", .5);
	}
}
