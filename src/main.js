import * as sections from "./sections/index.js";
import * as speedup from "./speedup.js";
import * as utils from "./utils.js";
// import * as games from "./games/index.js";
import * as funny from "./funny.js";
import { WeatherWallpaper } from "./wallpapers/weather.js";

document.addEventListener("DOMContentLoaded", () => {
	new WeatherWallpaper();

	sections.initWelcome();
	sections.initInfo();
	sections.initPromo();
	sections.initVault();
	sections.initChat();
	sections.initCookies();
	speedup.init();

	// addEventListener("load", () => {
	// 	games.initTrashExterminator();
	// })
	addEventListener("pointerdown", e => {
		if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)
			utils.playSound("click", .5);
	})
})

window.global_playSound = utils.playSound;
window.global_playGoofySounds = funny.playGoofySounds;
window.global_animateFlyout = funny.animateFlyout;
