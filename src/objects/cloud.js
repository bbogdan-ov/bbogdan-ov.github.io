import * as PIXI from "pixi.js"; 
import gsap from "gsap";
import * as utils from "../utils";
import * as speedup from "../speedup";

const DARKEN_SHADER_FRAG = `
    varying vec2 vTextureCoord;
    varying vec4 vColor;

    uniform sampler2D uSampler;
    uniform float uFactor;

    vec3 darkenColor = vec3(0.56, 0.56, 0.58);

    void main(void)
    {
        vec4 color = texture2D(uSampler, vTextureCoord);

        gl_FragColor = vec4(mix(color.rgb, darkenColor.rgb * color.a, uFactor), color.a);
    }
`;
const CLOUDS_SOURCES_COUNT = 16;

export class Cloud extends PIXI.Sprite {
    constructor(x=0, y=0) {
        const src = utils.url(`./assets/images/clouds/${ utils.randomInt(0, CLOUDS_SOURCES_COUNT)+1 }.png`)
        super(PIXI.Texture.from(src));

        this.x = this.moveX = x;
        this.y = this.moveY = y;
        this.scale.set(utils.random(1.6, 2)); // Random scale
        this.scale.set(this.scale.x * utils.randomSign(), this.scale.y * utils.randomSign()); // Random flip
        this.anchor.set(.5);

        this.speed = utils.random(.02, .1);
        this.darkenFilter = new PIXI.Filter(undefined, DARKEN_SHADER_FRAG);
        this.filters = [this.darkenFilter];

        this.alpha = 0;
        this.tween = gsap.to(this, {
            alpha: utils.random(.4, .6),
            // TODO: make relative to website speed
            duration: 2 / speedup.speedMul,
            ease: "none"
        })
    }

    update() {
        const scrollOffset = this.getScrollOffset();
        
        // TODO: make movement relative to website speed
        this.moveX += this.speed * speedup.speedMul;
        this.moveY -= this.speed / 2 * speedup.speedMul;
        
        this.x = utils.snap(this.moveX, .5);
        this.y = utils.snap(this.moveY + scrollOffset, .5);
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
        return -window.scrollY * this.speed * 6;
    }
}
