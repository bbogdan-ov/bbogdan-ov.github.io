import * as PIXI from "../libs/pixi.js";
import * as utils from "../utils.js";
import * as speedup from "../speedup.js";
import { Thing } from "../objects/thing.js";
import { Timer } from "../utils/timer.js";
import { Color } from "../utils/color.js";

const TINT_FILTER = `
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 uTint;

void main(void) {
	vec4 color = texture2D(uSampler, vTextureCoord);
	gl_FragColor = vec4(color.rgb * uTint, color.a);
}`;

// Clould sprite
export class Cloud extends PIXI.TilingSprite {
	static MIN_SPEED = .02;
	static MAX_SPEED = .1;
	static APPEAR_DURATION = 3_000;

	// All the cloud sprites are packed into the single sprite atlas,
	// that's why we need all of these
	static FRAMES = [
		{x: 2, y: 2, width: 266, height: 188},
		{x: 2, y: 194, width: 237, height: 111},
		{x: 2, y: 309, width: 217, height: 120},
		{x: 223, y: 309, width: 210, height: 88},
		{x: 272, y: 2, width: 151, height: 54},
		{x: 272, y: 60, width: 101, height: 127},
		{x: 243, y: 194, width: 120, height: 42},
		{x: 243, y: 240, width: 107, height: 46},
		{x: 2, y: 433, width: 100, height: 47},
		{x: 2, y: 484, width: 97, height: 67},
		{x: 106, y: 433, width: 93, height: 32},
		{x: 377, y: 60, width: 63, height: 54},
		{x: 377, y: 118, width: 62, height: 21},
		{x: 377, y: 143, width: 52, height: 23}
	];

	constructor(wallpaper, x = 0, y = 0) {
		super(PIXI.Texture.from(`assets/images/clouds-atlas.png`));

		this.wallpaper = wallpaper;

		// Choose random slice from the atlas
		const frame = utils.randomItem(Cloud.FRAMES);
		this.width = frame.width;
		this.height = frame.height;
		this.tilePosition.set(-frame.x, -frame.y);

		this.x = this.realX = x;
		this.y = this.realY = y;
		this.anchor.set(.5);
		this.speed = utils.random(Cloud.MIN_SPEED, Cloud.MAX_SPEED);
		this.alpha = 0;
		this.maxAlpha = this.speed / .1 * .8;

		// Randomize scale
		this.scale.set(utils.random(1.6, 2));
		this.scale.x *= utils.randomBool() ? 1 : -1;
		this.scale.y *= utils.randomBool() ? 1 : -1;
		
		// Setup filter
		this.tintFilter = new PIXI.Filter(
			undefined,
			TINT_FILTER,
			{
				uTint: [1, 1, 1],
				uAlpha: 0,
			}
		);
		this.filters = [this.tintFilter];

		// Timers
		this.appearTimer = new Timer(Cloud.APPEAR_DURATION);
	}

	update(delta) {
		this.appearTimer.update(delta);

		this.alpha = this.appearTimer.progress * this.maxAlpha;

		// Update filter uniforms
		this.tintFilter.uniforms.uTint = this.wallpaper.cloudsTint.rgb;

		this.updateMovement();
		this.updateDestroying();
	}
	updateMovement() {
		// Slowly move cloud to the right and slightly up
		this.realX += this.speed * speedup.speedMul;
		this.realY -= this.speed / 2 * speedup.speedMul;

		// Set render position
		const z = utils.lerp(.2, .6, this.speed / Cloud.MAX_SPEED);
		const scrollOffset = -window.scrollY * z;
		this.x = this.realX;
		this.y = this.realY + scrollOffset;
	}
	updateDestroying() {
		if (
			this.realX - this.width > this.wallpaper.app.view.width ||
			this.realY + this.height < 0
		) {
			this.destroy();
		}
	}

	setPos(x, y) {
		this.x = this.realX = x;
		this.y = this.realY = y;
	}
}
class Raindrop extends PIXI.Sprite {
	constructor(wallpaper, x = 0, y = 0) {
		const url = `assets/images/rain/${utils.randomInt(1, 2)}.png`;
		super(PIXI.Texture.from(url));

		this.wallpaper = wallpaper;

		this.x = x;
		this.y = y;
		this.alpha = utils.random(.4, .8);
		this.speed = utils.random(32, 48);
	}

	update() {
		this.x += this.speed * .2 * speedup.speedMul;
		this.y += this.speed * speedup.speedMul;

		this.updateDestroying();
	}
	updateDestroying() {
		if (this.realY - this.height > this.wallpaper.app.view.height) {
			this.destroy();
		}
	}
}
class FallingThing extends Thing {
	static MIN_SPEED = 2;
	static MAX_SPEED = 20;

	constructor(wallpaper, x = 0, y = 0) {
		const name = utils.randomItem(Thing.NAMES);
		super(name, x, y);

		this.wallpaper = wallpaper;

		const speed = utils.random(FallingThing.MIN_SPEED, FallingThing.MAX_SPEED);
		const factor = (speed - FallingThing.MIN_SPEED) / (FallingThing.MAX_SPEED - FallingThing.MIN_SPEED);

		this.frameIndex = utils.randomInt(0, 4);
		this.speed = speed;
		this.scale.set(utils.lerp(.2, 1.6, factor));
		this.alpha = utils.lerp(.5, 1, factor + .2);
		this.angle = -90 / 8;
	}

	update() {
		this.frameTimer += Math.round(speedup.speedMul);

		this.x += this.speed / 4 * speedup.speedMul;
		this.y += this.speed * speedup.speedMul;

		this.updateAnimation();
		this.updateDestroying();
	}
	updateAnimation() {
		if (this.frameTimer > 4) {
			this.stepAnimation();
			this.frameTimer = 0;
		}
	}
	updateDestroying() {
		if (this.y - this.height > this.wallpaper.app.view.height) {
			this.destroy();
		}
	}
}

/** Weather */
class Weather {
	constructor(wallpaper) {
		this.wallpaper = wallpaper;

		this.cloudsTint = Color.fromHex(0xffffff);
		this.bgColor = Color.fromHex(0x4474ce);
	}

	enter() {}
	update(_delta, _factor) {}
	exit() {}
}

/** Clear weather */
class ClearWeather extends Weather {
	constructor(wallpaper) {
		super(wallpaper);

		// Add rainbow
		this.rainbow = PIXI.Sprite.from("assets/images/rainbow.webp");
		this.wallpaper.addChild(this.rainbow);
	}

	update(_delta, factor) {
		this.rainbow.alpha = .6 * factor;
		this.rainbow.y = -window.scrollY / 6;
	}
}

/** Rain weather */
class RainWeather extends Weather {
	static SPAWN_DELAY = 10;

	constructor(wallpaper) {
		super(wallpaper);

		this.overlayElement = document.querySelector(".desaturation-overlay");
		
		this.cloudsTint = Color.fromHex(0x9f9fa0);
		this.bgColor = Color.fromHex(0xa9a9af);

		this.spawnTimer = new Timer();
	}

	spawnRaindrop() {
		const x = utils.random(-400, this.wallpaper.app.view.width);
		const y = -400;
		const raindrop = new Raindrop(this.wallpaper, x, y);
		this.wallpaper.addChild(raindrop);
	}

	update(delta, factor) {
		if (factor <= 0) return;

		this.spawnTimer.update(delta);

		this.overlayElement.style.opacity = factor;

		if (this.spawnTimer.finished) {
			this.spawnRaindrop();
			this.spawnTimer.start(RainWeather.SPAWN_DELAY * utils.lerp(10, 1, factor));
		}
	}
	exit() {
		this.overlayElement.style.opacity = 0;
	}
}

/** Things weather */
class ThingsWeather extends Weather {
	static SPAWN_DELAY = 200;

	constructor(wallpaper) {
		super(wallpaper);

		this.spawnTimer = new Timer();
	}

	spawnThing() {
		const x = utils.random(-256, this.wallpaper.app.view.width + 256);
		const y = -256;
		const thing = new FallingThing(this.wallpaper, x, y);
		this.wallpaper.addChild(thing);
	}

	update(delta, factor) {
		if (factor <= 0) return;

		this.spawnTimer.update(delta);

		if (this.spawnTimer.finished) {
			this.spawnThing();
			this.spawnTimer.start(ThingsWeather.SPAWN_DELAY * utils.lerp(4, 1, factor));
		}
	}
}

/** Weather wallpaper */
export class WeatherWallpaper {
	static SPAWN_CLOUDS_DELAY = 6_000;
	static TRANSITION_DURATION = 5_000;
	static WEATHER_DURATION_MIN = 15_000;
	static WEATHER_DURATION_MAX = 35_000;

	constructor() {
		const canvas = document.querySelector(".background-canvas");
		this.app = new PIXI.Application({
			resizeTo: window,
			antialias: false,
			backgroundAlpha: 0,
			autoDensity: false,
			powerPreference: "high-performance",
			view: canvas,
		});
		this.app.ticker.add(() => this.update());

		// Init container
		this.container = new PIXI.Container();
		this.app.stage.addChild(this.container);

		this.cloudsTint = Color.fromHex(0xffffff);

		this.cloudsTimer = new Timer();
		this.weatherTimer = new Timer(WeatherWallpaper.WEATHER_DURATION_MIN);

		// Weather
		/** @type {Weather[]} */
		this.weathers = [
			new ClearWeather(this),
			new RainWeather(this),
			new ThingsWeather(this),
		];
		this.curWeatherIdx = utils.randomInt(0, this.weathers.length - 1);
		this.prevWeatherIdx = null;
		this.weatherTransition = new Timer(
			WeatherWallpaper.TRANSITION_DURATION,
			WeatherWallpaper.TRANSITION_DURATION,
		);
		
		// Update all weathers on startup
		for (let i = 0; i < this.weathers.length; i ++) {
			const weather = this.weathers[i];
			if (i == this.curWeatherIdx) {
				weather.enter();
				weather.update(0, 1);
			} else {
				weather.exit();
				weather.update(0, 0);
			}
		}

		// Update params
		document.body.style.backgroundColor = this.curWeather().bgColor.toString();
		this.cloudsTint = this.curWeather().cloudsTint;

		this.spawnInitialClouds();
	}

	addChild(child) {
		this.container.addChild(child);
		return child;
	}

	spawnCloud() {
		const cloud = new Cloud(this);

		// Choose random screen side (left or bottom)
		if (utils.randomBool()) {
			// Left
			cloud.setPos(
				-cloud.width,
				utils.random(cloud.height, this.app.view.height),
			);
		} else {
			// Bottom
			cloud.setPos(
				utils.random(-cloud.width, this.app.view.width),
				this.app.view.height + cloud.height,
			);
		}

		this.addChild(cloud);
		return cloud;
	}
	spawnInitialClouds() {
		// Fill screen with random amount of clouds
		for (let i = 0; i < utils.randomInt(10, 20); i++) {
			const offset = utils.random(0, 300);
			const cloud = this.spawnCloud();
			cloud.setPos(cloud.realX + offset, cloud.realY - offset);
		}
	}

	update() {
		const delta = this.app.ticker.deltaMS * speedup.speedMul;

		this.cloudsTimer.update(delta);
		this.weatherTimer.update(delta);
		this.weatherTransition.update(delta);

		if (this.weatherTimer.finished) {
			const duration = utils.random(
				WeatherWallpaper.WEATHER_DURATION_MIN,
				WeatherWallpaper.WEATHER_DURATION_MAX,
			);

			this.enterWeather(utils.randomInt(0, this.weathers.length - 1));
			this.weatherTimer.start(duration);
		}

		this.updateWeather(delta);
		this.updateClouds();
		this.updateObjects(delta);
	}
	updateWeather(delta) {
		let factor = utils.sineInOut(this.weatherTransition.progress);
		if (this.weatherTransition.finished)
			factor = 1;

		const curWeather = this.curWeather();
		const prevWeather = this.prevWeather();
		curWeather.update(delta, factor);

		if (this.weatherTransition.justFinished)
			prevWeather?.exit();

		// Update transition
		if (this.weatherTransition.finished || !prevWeather)
			return;

		prevWeather.update(delta, 1 - factor);

		this.cloudsTint = Color.lerpNew(prevWeather.cloudsTint, curWeather.cloudsTint, factor);

		const bgColor = Color.lerpNew(prevWeather.bgColor, curWeather.bgColor, factor);
		document.body.style.backgroundColor = bgColor.toString();
	}
	updateClouds() {
		// Spawn clouds
		if (this.cloudsTimer.finished) {
			this.spawnCloud();
			this.cloudsTimer.start(WeatherWallpaper.SPAWN_CLOUDS_DELAY);
		}
	}
	updateObjects(delta) {
		for (const child of this.container.children) {
			if ("update" in child)
				child.update(delta);
		}
	}

	enterWeather(idx) {
		if (this.curWeatherIdx == idx || !this.weatherTransition.finished)
			return;

		this.prevWeatherIdx = this.curWeatherIdx;
		this.curWeatherIdx = idx;

		this.curWeather().enter();

		this.weatherTransition.start();
	}

	/** @returns {Weather} */
	curWeather() {
		return this.weathers[this.curWeatherIdx];
	}
	/** @returns {Weather | null} */
	prevWeather() {
		if (this.prevWeatherIdx === null)
			return null;
		return this.weathers[this.prevWeatherIdx];
	}
}
