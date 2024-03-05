import * as PIXI from "pixi.js";
import * as things from "./things";
import * as weather from "./weather";
import * as utils from "../../utils";
import * as speedup from "../../speedup";

export function initBackground() {
    const view = document.querySelector("#background-canvas");
    const canvas = new PIXI.Application({
        resizeTo: window,
        antialias: false,
        backgroundAlpha: 0,
        autoDensity: false,
        powerPreference: "high-performance",
        view
    });
    canvas.ticker.add(tick);

    const thingsContainer = new PIXI.Container();
    const weatherContainer = new PIXI.Container();

    // Init
    weather.init(canvas, weatherContainer);

    canvas.stage.addChild(thingsContainer);
    canvas.stage.addChild(weatherContainer);

    // Tick
    let time = 0;
    function tick(deltaFrames) {
        // Frames delta time to seconds delta time
        const delta = utils.secs(deltaFrames) * speedup.speedMul;
        time += delta;
        
        things.tick(delta, canvas, thingsContainer);
        weather.tick(time, delta, canvas, weatherContainer);
    }
}
