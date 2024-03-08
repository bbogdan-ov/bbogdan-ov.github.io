import * as PIXI from "pixi.js";
import * as sections from "./sections";
import * as canvases from "./canvases";
import * as speedup from "./speedup";
import * as utils from "./utils";
import * as games from "./games";
import * as loading from "./loading";

// Pixilate textures
PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

document.addEventListener("DOMContentLoaded", ()=> {
    loading.initLoading();

    canvases.initBackground();
    
    sections.initWelcome();
    sections.initInfo();
    sections.initPromo();
    sections.initVault();
    speedup.init();

    addEventListener("load", ()=> {
        games.initTrashExterminator();
    })
    addEventListener("pointerdown", e=> {
        if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)
            utils.playSound("click", .5);
    })
})

// Fun stuff
function playGoofySounds() {
    utils.playSound(utils.randomItem(["tada", "nerd", "cola", "spring", "slide", "yell", "scream", "sad"]), .5);
}
/** @param el {HTMLElement}  */
export function animateFlyout(el) {
    if (typeof el == "string")
        el = document.querySelector(el);

    if (el.classList.contains("animating"))
        return;

    el.classList.add("animating");
    utils.playSound("slide", .3); 

    const frames = [
        {
            opacity: 0,
            transform: "rotateZ(-270deg) rotateY(360deg) translate(-100%, 300%)"
        },
        {
            opacity: 1
        },
        {
            opacity: 1,
            transform: "rotateZ(0deg) rotateY(0deg) translate(0%, 0)"
        },
    ]
    const opts = { duration: 5000, easing: "ease-out", fill: "forwards" };
    
    el.style.pointerEvents = "unset";
    el.animate(frames, opts).onfinish = ()=> {
        el.classList.remove("animating");
        utils.playSound("tada", .5);
    }
}

window.global_playGoofySounds = playGoofySounds;
window.global_animateFlyout = animateFlyout;
