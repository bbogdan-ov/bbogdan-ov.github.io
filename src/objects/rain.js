import * as PIXI from "pixi.js"; 
import * as utils from "../utils";
import * as speedup from "../speedup";

const RAIN_NUMBER = 5;

export class Rain extends PIXI.Sprite {
    constructor(x=0, y=0) {
        const url = `/images/rain/${ utils.randomInt(0, RAIN_NUMBER) + 1 }.png`;
        super(PIXI.Texture.from(url));

        this.x = x;
        this.y = y;
        this.alpha = utils.random(.4, .8);
        this.speed = utils.random(32, 48);
    }

    update() {
        this.x += this.speed * .2 * speedup.speedMul;
        this.y += this.speed * speedup.speedMul;
    }
    render(renderer) {
        super.render(renderer);
        this.update();
    }
}
