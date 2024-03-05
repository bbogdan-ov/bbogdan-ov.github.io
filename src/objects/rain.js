import * as PIXI from "pixi.js"; 
import * as utils from "../utils";
import * as speedup from "../speedup";
import img1 from "../assets/images/rain/1.png";
import img2 from "../assets/images/rain/2.png";
import img3 from "../assets/images/rain/3.png";
import img4 from "../assets/images/rain/4.png";
import img5 from "../assets/images/rain/5.png";

const RAIN_SOURCES_COUNT = 5;
const RAINS = [img1, img2, img3, img4, img5];

export class Rain extends PIXI.Sprite {
    constructor(x=0, y=0) {
        const src = RAINS[utils.randomInt(0, RAIN_SOURCES_COUNT)];
        super(PIXI.Texture.from(src));

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
