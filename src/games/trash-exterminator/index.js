import * as PIXI from "pixi.js";
import * as utils from "../../utils";
import * as objects from "../../objects";

const DECAY_SHADER_FRAG = `
    varying vec2 vTextureCoord;
    varying vec4 vColor;

    uniform sampler2D uSampler;
    uniform float uFactor;

    vec3 decayColor = vec3(0.0, 0.0, 0.0);

    float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    void main(void)
    {
        vec2 uv = vTextureCoord;
        vec4 color = texture2D(uSampler, uv);

        float a = step(1. - uFactor, color.a * rand(uv));
        
        gl_FragColor = vec4(mix(color.rgb, decayColor.rgb, a), color.a);
    }
`;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const DECAY_DUR = 5;
const DECAY_FINE = 200;
const DESTROY_REWARD = 50;
const INIT_SCORE = 100;

const fancyTextStyle = new PIXI.TextStyle({
    fontFamily: "comic-sans",
    fontSize: 32,
    fill: 0xffffff,
})
const vhsTextStyle = new PIXI.TextStyle({
    fontFamily: "vhs",
    fontSize: 32,
    fill: 0xffffff,
    stroke: 0x0000ff,
    strokeThickness: 4
})

const pauseText = new PIXI.Text("click to play", fancyTextStyle);
pauseText.anchor.set(.5);
const scoreText = new PIXI.Text("0", vhsTextStyle);
// scoreText.anchor.set(.5, 0);
scoreText.visible = false;

let pointerX = 0;
let pointerY = 0;

let score = 0;
let difficulty = 1;
let isGameOver = false;
let isPaused = false;

let trashSpawnTimer = 1;

export function initTrashExterminator() {
    const win = document.querySelector("#trash-exterminator");
    const winContent = win.querySelector(".content");
    const canvasElement = winContent.querySelector("canvas");

    // Remove loading text
    winContent.querySelector(".loading-text").remove();

    const canvas = new PIXI.Application({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        antialias: false,
        backgroundAlpha: 1,
        backgroundColor: 0,
        view: canvasElement
    })
    canvas.ticker.add(ticker);

    pause();
    setScore(INIT_SCORE);

    //
    const trashContainer = new PIXI.Container();
    trashContainer.width = canvas.view.width;
    trashContainer.height = canvas.view.height;

    // Add children
    canvas.stage.addChild(trashContainer);
    scoreText.y = 16;
    canvas.stage.addChild(scoreText);
    pauseText.position.set(canvas.view.width/2, canvas.view.height/2);
    canvas.stage.addChild(pauseText);

    // Events
    canvas.view.addEventListener("click", ()=> {
        resume();
    })
    addEventListener("scroll", ()=> {
        pause();
    })
    addEventListener("pointermove", e=> {
        const bounds = canvas.view.getBoundingClientRect();

        pointerX = (e.clientX - bounds.left) / bounds.width * canvas.view.width;
        pointerY = (e.clientY - bounds.top) / bounds.height * canvas.view.height;
    })
    addEventListener("pointerup", ()=> {
        if (isPaused) return;

        for (const trash of trashContainer.children) {
            trash.stopDragging();
        }
    })

    // Game loop
    function ticker(deltaFrames) {
        if (isPaused) return;
        
        const delta = utils.secs(deltaFrames);
        trashSpawnTimer -= delta;
        difficulty += .001;

        // Animate score text
        if (!isGameOver) {
            scoreText.x += -2;
            if (scoreText.x < -Math.floor(scoreText.width - canvas.view.width)) {
                scoreText.x = 0;
            }
        }

        // Spawn new things
        if (!isGameOver && trashSpawnTimer <= 0) {
            spawnTrash(canvas, trashContainer);
            trashSpawnTimer = 4 / difficulty;
        }
        
        // Update things
        for (const trash of trashContainer.children) {
            if (trash.destroyed) {
                trashContainer.removeChild(trash);
            }

            trash.update(delta);
        }

        // Restart game if game over and all things are destroyed
        if (isGameOver && trashContainer.children.length == 0) {
            restart();
        }
    }
}

function spawnTrash(canvas, container) {
    const trash = new TrashThing(utils.randomItem(objects.TRASH_THINGS));
    trash.x = utils.random(trash.width/2, canvas.view.width - trash.width/2);
    trash.y = -trash.height/2;
    
    container.addChild(trash);
}

function setScore(value) {
    score = value;
    scoreText.text = `${ score } `.repeat(15);

    if (score < 0) {
        isGameOver = true;
        utils.playSound("yell");
    }
}
function restart() {
    setScore(INIT_SCORE);
    isGameOver = false;
    difficulty = 1;
    trashSpawnTimer = 1;
}
function pause() {
    if (isPaused) return;

    isPaused = true;
    pauseText.visible = true;
}
function resume() {
    if (!isPaused) return;

    isPaused = false;
    pauseText.visible = false;
    scoreText.visible = true;
}

class TrashThing extends objects.Thing {
    constructor(name, x=0, y=0) {
        super(name, x, y);

        this.eventMode = "static";
        this.scale.set(utils.random(.6, 1));

        this.decayFilter = new PIXI.Filter(undefined, DECAY_SHADER_FRAG, { uFactor: 0 });
        this.filters = [this.decayFilter];
        this.decayTimer = 0;
        this.isDragging = false;
        this.velX = utils.random(-30, 30);
        this.velY = 0;

        this.on("pointerdown", ()=> {
            this.startDragging();
        })
    }

    update(dt) {
        if (this.destroyed) return;
        
        this.frameTimer ++;
        this.decayTimer += dt;

        if (isGameOver && this.decayTimer < DECAY_DUR/2) {
            this.decayTimer = DECAY_DUR/2;
        }

        // Decay effect
        this.decayFilter.uniforms.uFactor = Math.max((this.decayTimer / DECAY_DUR) * 2 - 1, 0);
        // Destroy on decay 
        if (this.decayTimer >= DECAY_DUR) {
            if (isGameOver)
                this._destroyed = true;
            else
                this.decay();
        }

        // Stop movement on game over
        if (isGameOver) return;
        
        // Gravity
        this.velY += 1;

        // Dragging
        if (this.isDragging) {
            this.velX = (pointerX - this.x) / 2;
            this.velY = (pointerY - this.y) / 2;
        }
       
        this.velX *= .99;
        this.velY *= .99;

        // Yea, the speed of things doesn't depends on frame rate
        this.x += this.velX;
        this.y += this.velY;

        //
        const w = this.width * this.scale.x;
        const h = this.height * this.scale.y;

        // Destroying
        if (this.y + h/2 < 0 && this.velY < 0) {
            this.destroy();
        }

        // Bounce out of screen edges
        // Left
        if (this.x - w/2 < 0) {
            this.velX *= -.9;
            this.x = w/2;
            this.rotate();
        }
        // Right
        if (this.x + w/2 > CANVAS_WIDTH) {
            this.velX *= -.9;
            this.x = CANVAS_WIDTH - w/2;
            this.rotate();
        }
        // Bottom
        if (this.y + h/2 > CANVAS_HEIGHT) {
            this.velY *= -.9;
            this.y = CANVAS_HEIGHT - h/2;
        }

        this.animate();
    }

    rotate() {
        if (!this.isDragging)
            super.rotate();
    }
    
    startDragging() {
        if (this.isDragging || isPaused) return;

        this.isDragging = true;
        this.velX = 0;
        this.velY = 0;
    }
    stopDragging() {
        if (!this.isDragging) return;

        this.isDragging = false;
        if (Math.abs(this.velX) > 15 || Math.abs(this.velY) > 15) {
            utils.playSound(utils.randomItem(["throw-1", "throw-2", "goofy-throw-1", "goofy-throw-2"]), .3);
        }
    }
    
    destroy() {
        this._destroyed = true;
        utils.playSound(utils.randomItem(["tear-1", "tear-2"]), .3);

        setScore(score + DESTROY_REWARD);
    }
    decay() {
        this._destroyed = true;
        utils.playSound("sad", .3);

        setScore(score - DECAY_FINE);
    }
}
