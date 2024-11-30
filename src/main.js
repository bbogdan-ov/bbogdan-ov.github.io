import * as PIXI from "pixi.js";
import * as sections from "./sections";
import * as canvases from "./canvases";
import * as speedup from "./speedup";
import * as utils from "./utils";
import * as games from "./games";
import * as loader from "./loader";
import * as funny from "./funny";

// Pixilate textures
PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

document.addEventListener("DOMContentLoaded", ()=> {
    loader.initLoader();

    canvases.initBackground();
    
    sections.initWelcome();
    sections.initInfo();
    sections.initPromo();
    sections.initVault();
    sections.initChat();
	sections.initCookies();
    speedup.init();

    addEventListener("load", ()=> {
        games.initTrashExterminator();
    })
    addEventListener("pointerdown", e=> {
        if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)
            utils.playSound("click", .5);
    })
})

window.global_playSound = utils.playSound;
window.global_playGoofySounds = funny.playGoofySounds;
window.global_animateFlyout = funny.animateFlyout;
