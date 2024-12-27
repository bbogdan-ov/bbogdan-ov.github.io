import * as utils from "../utils";
import * as objects from "../objects";
import * as speedup from "../speedup";

let thingSpawnTimer = 0;

export function tick(delta, app, container) {
	thingSpawnTimer -= delta;

	// Spawn things
	if (thingSpawnTimer <= 0) {
		spawnThing(app, container);
		thingSpawnTimer = utils.random(.2, 6);
	}

	// Remove things that have gone out of screen
	for (const thing of container.children) {
		if (thing.x - thing.width > app.view.width) {
			container.removeChild(thing);
		}
	}
}

function spawnThing(app, container) {
	const thing = new FlyingThing(utils.randomItem(objects.THINGS));
	thing.speedMul = speedup.speedMul;
	thing.setPos(
		-thing.width,
		utils.random(thing.height / 2, app.view.height - thing.height / 2)
	);

	container.addChild(thing);
	return thing;
}

class FlyingThing extends objects.Thing {
	constructor(name, x = 0, y = 0) {
		super(name, x, y);

		this.x = this.moveX = x;
		this.y = this.moveY = y;
		this.scale.set(utils.random(.6, 1.2));

		this.speed = utils.random(2, 10);
	}

	update() {
		this.frameTimer += Math.round(speedup.speedMul);

		this.moveX += this.speed * speedup.speedMul;

		const wave = Math.sin(this.moveX / 300) * this.speed * 8;

		this.x = utils.snap(this.moveX, .5);
		this.y = utils.snap(this.moveY + this.getScrollOffset() + wave, .5);

		this.animate();
	}
	animate() {
		if (this.frameTimer > Math.floor(15 - this.speed)) {
			this.stepAnimation();
			this.rotate();
			this.frameTimer = 0;
		}
	}
	render(renderer) {
		super.render(renderer);
		this.update();
	}

	setPos(x, y) {
		this.x = this.moveX = x;
		this.y = this.moveY = y;
	}
	getScrollOffset() {
		return -window.scrollY * this.speed / 12;
	}
}
