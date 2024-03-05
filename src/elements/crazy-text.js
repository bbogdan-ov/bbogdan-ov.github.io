import * as PIXI from "pixi.js";
import * as utils from "../utils";
import gsap from "gsap";

const FONT_SHEET_SOURCE = utils.url("./assets/images/crazy-font-sheet.png");
const CHAR_SLICE_SIZE = 128;
const CHAR_WIDTH = 40;
const CHAR_HEIGHT = 64;
const FONT_MAP = " abcdefghijklmnopqrstuvwxyz!?";

export class CrazyText {
    constructor(text) {
        this.lines = text.toLowerCase().split("\n");
        this.lineLength = Math.max(...this.lines.map(l=> l.length));

        this.canvas = new PIXI.Application({
            width: (this.lineLength * CHAR_WIDTH) + 32*2 + CHAR_WIDTH,
            height: (this.lines.length * CHAR_HEIGHT) + 32*2 + CHAR_HEIGHT,
            backgroundAlpha: 0,
            antialias: false,
        });
        this.canvas.view.classList.add("crazy-text", "pixelate")

        this.createChars();
        this.startTicker();
    }

    createChars() {
        // Place text at center
        const textX = this.canvas.view.width/2 - this.lineLength * CHAR_WIDTH/2 - CHAR_WIDTH/2;
        const textY = this.canvas.view.height/2 - this.lines.length * CHAR_HEIGHT/2;

        for (let lineIndex = 0; lineIndex < this.lines.length; lineIndex ++) {
            const line = this.lines[lineIndex];

            for (let charIndex = 0; charIndex < line.length; charIndex ++) {
                const char = line[charIndex];
                const mapCharIndex = FONT_MAP.indexOf(char);
                const charSprite = new PIXI.TilingSprite(PIXI.Texture.from(FONT_SHEET_SOURCE), CHAR_SLICE_SIZE, CHAR_SLICE_SIZE);
                charSprite.scale.set(.5);
                charSprite.tilePosition.x = -mapCharIndex * 128; // 

                // Define pos of chars
                const charX = textX + charIndex * CHAR_WIDTH + utils.random(-8, 8);
                const charY = textY + lineIndex * CHAR_HEIGHT + utils.random(-8, 8);

                // Add random offset to pos
                charSprite.x = charX + utils.random(-64, 64)
                charSprite.y = charY + utils.random(-64, 64)
                charSprite.alpha = 0;
                
                // Animate chars to move to defined pos
                gsap.to(charSprite, {
                    keyframes: [
                        { alpha: 1, duration: 0, delay: charIndex * .05 },
                        { x: charX, y: charY, duration: .1, ease: "back.out" },
                    ],
                    delay: 2.5
                });
                
                this.canvas.stage.addChild(charSprite);
            }
        }
    }
    startTicker() {
        let time = 0;

        this.canvas.ticker.add(dt=> {
            time += dt;

            // Reset the timer
            if (time > 200)
                time = 0;

            for (let i = 0; i < this.canvas.stage.children.length; i ++) {
                const charSprite = this.canvas.stage.children[i];

                // Some random movement
                charSprite.anchor.set(
                    utils.random(-1/CHAR_SLICE_SIZE, 1/CHAR_SLICE_SIZE) + Math.sin(time/6 + i)/128 + Math.cos(time/10 + i*2)/128, 
                    utils.random(-1/CHAR_SLICE_SIZE, 1/CHAR_SLICE_SIZE) + Math.cos(time/10 + i)/128 + Math.sin(time/20 + i*2)/128
                );
            }
        })
    }

    appendTo(element) {
        element.append(this.canvas.view);
    }
}
