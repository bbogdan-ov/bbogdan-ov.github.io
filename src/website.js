import { initWelcome } from "./blocks/welcome.js";
import { initChat } from "./blocks/chat.js";
import { initCookies } from "./blocks/cookies.js";
import { initInfo } from "./blocks/info.js";
import { initPromo } from "./blocks/promo.js";
import { Vault } from "./blocks/vault.js";
import { initTrashExterminator } from "./games/trash-exterminator.js";
import { WeatherWallpaper } from "./wallpapers/weather.js";
import { initTimemachine } from "./blocks/time-machine.js";

export class Website {
	static FAST_FORWARD_SPEED = 10;

	constructor() {
		/** The entire site speed multiplier */
		this.speed = 1;

		this.wallpaper = new WeatherWallpaper(this);
		this.vault = new Vault();

		addEventListener("load", () => {
			initTrashExterminator();
		})

		initWelcome();
		initChat();
		initCookies();
		initInfo();
		initPromo();
		initTimemachine(this);
	}

	setFastForward(enabled) {
		if (enabled)
			this.speed = Website.FAST_FORWARD_SPEED;
		else
			this.speed = 1;

		document.body.classList.toggle("fast-forward", enabled);
	}

	get isFastForward() {
		return this.speed > 1;
	}
}
