import * as PIXI from "pixi.js";
import gsap from "gsap";
import * as objects from "../objects";
import * as utils from "../utils";
import * as consts from "../consts";
import * as speedup from "../speedup";

const WEATHER_DUR = 60;
const WEATHER_CHANGE_DUR = 15;

const backgroundTween = gsap.to(document.body, {
	keyframes: [
		{ background: consts.SUNNY_COLOR, duration: 0 },
		{ background: consts.RAINY_COLOR, duration: 1 }
	],
	ease: "none",
	paused: true
})
const rainbow = PIXI.Sprite.from("/images/rainbow.webp");
rainbow.x = -64;
rainbow.angle = -36;

const weather = {
	cloudsDencity: 1,
	rainFactor: utils.randomItem([0, 1]),
}

let cloudSpawnTimer = 0;
let weatherChangeTimer = WEATHER_DUR;
let rainDropTimer = 0;

export function init(app, container) {
	app.stage.addChild(rainbow)
	spawnStarterClouds(app, container);
}
export function tick(time, delta, app, container) {
	// Timers
	cloudSpawnTimer -= delta;
	weatherChangeTimer -= delta;
	rainDropTimer += delta;

	weather.cloudsDencity = utils.wave(time / 30);
	backgroundTween.seek(weather.rainFactor);

	// Rainbow
	rainbow.alpha = (1 - weather.rainFactor) * .5;
	rainbow.y = 200 - window.scrollY / 6;

	// Spawn cloud when timer is finished
	if (cloudSpawnTimer <= 0) {
		spawnCloud(app, container);
		cloudSpawnTimer = utils.remap(1 - weather.cloudsDencity, 5, 20);
	}

	// Changing weather
	if (weatherChangeTimer <= 0) {
		changeWeather();
		weatherChangeTimer = WEATHER_DUR + utils.random(-10, 10);
	}

	// Rain
	if (weather.rainFactor == 0 ? false : rainDropTimer > .05 * (1 - weather.rainFactor)) {
		rainDropTimer = 0;
		for (let i = 0; i < Math.round(speedup.speedMul); i++) {
			spawnRain(app, container);
		}
	}

	for (const obj of container.children) {
		if (obj instanceof objects.Cloud) {
			// Update clouds color based on weather
			obj.darkenFilter.uniforms.uFactor = weather.rainFactor;

			// Removing clouds
			if (obj.moveX - obj.width > app.view.width || obj.moveY + obj.height < 0)
				container.removeChild(obj);
		} else if (obj instanceof objects.Rain) {
			// Removing rain
			if (obj.y > app.view.height)
				container.removeChild(obj);
		}
	}
}

// Weather
function changeWeather() {
	if (weather.rainFactor == 1) {
		// a sunny day...
		gsap.to(weather, {
			rainFactor: 0,
			duration: WEATHER_CHANGE_DUR / speedup.speedMul,
			ease: "none",
		})
	} else {
		// rain!
		gsap.to(weather, {
			rainFactor: 1,
			duration: WEATHER_CHANGE_DUR / speedup.speedMul,
			ease: "none",
		})
	}
}

// Clouds
function spawnStarterClouds(app, container) {
	// Fill screen with random amount of clouds
	for (let i = 0; i < utils.randomInt(10, 20); i++) {
		const offset = utils.random(0, 300);
		const cloud = spawnCloud(app, container);
		cloud.setPos(cloud.moveX + offset, cloud.moveY - offset)
	}
}
function spawnCloud(app, container) {
	const cloud = new objects.Cloud();
	let x = 0;
	let y = 0;

	// Choose random spawn screen side (left of bottom)
	if (utils.randomBool()) {
		// Left side
		x = -cloud.width;
		y = utils.random(cloud.height, app.view.height);
	} else {
		// Bottom side
		x = utils.random(-cloud.width, app.view.width);
		y = app.view.height + cloud.height;
	}

	cloud.setPos(x, y);
	container.addChild(cloud);

	return cloud;
}

// Rain
function spawnRain(app, container) {
	const rain = new objects.Rain();
	rain.x = utils.random(-rain.width * 2, app.view.width);
	rain.y = utils.random(-rain.height * 3, -rain.height);

	container.addChild(rain);
	return rain;
}
