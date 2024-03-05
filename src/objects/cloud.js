import * as PIXI from "pixi.js"; 
import gsap from "gsap";
import * as utils from "../utils";
import * as speedup from "../speedup";
import img1 from "../assets/images/clouds/1.png";
import img2 from "../assets/images/clouds/2.png";
import img3 from "../assets/images/clouds/3.png";
import img4 from "../assets/images/clouds/4.png";
import img5 from "../assets/images/clouds/5.png";
import img6 from "../assets/images/clouds/6.png";
import img7 from "../assets/images/clouds/7.png";
import img8 from "../assets/images/clouds/8.png";
import img9 from "../assets/images/clouds/9.png";
import img10 from "../assets/images/clouds/10.png";
import img11 from "../assets/images/clouds/11.png";
import img12 from "../assets/images/clouds/12.png";
import img13 from "../assets/images/clouds/13.png";
import img14 from "../assets/images/clouds/14.png";
import img15 from "../assets/images/clouds/15.png";
import img16 from "../assets/images/clouds/16.png";

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
const CLOUDS = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16];

export class Cloud extends PIXI.Sprite {
    constructor(x=0, y=0) {
        const src = CLOUDS[utils.randomInt(0, CLOUDS_SOURCES_COUNT)];
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
