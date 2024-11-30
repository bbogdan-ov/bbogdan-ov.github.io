import * as PIXI from "pixi.js";
import * as things from "./things";
import * as weather from "./weather";
import * as utils from "../utils";
import * as speedup from "../speedup";

export function initBackground() {
    const canvas = document.querySelector(".background-canvas");
    const app = new PIXI.Application({
        resizeTo: window,
        antialias: false,
        backgroundAlpha: 0,
        autoDensity: false,
        powerPreference: "high-performance",
        view: canvas
    });
    app.ticker.add(tick);

    const thingsContainer = new PIXI.Container();
    const weatherContainer = new PIXI.Container();

    // Init
    weather.init(app, weatherContainer);

    app.stage.addChild(thingsContainer);
    app.stage.addChild(weatherContainer);

    // Tick
    let time = 0;
    function tick(deltaFrames) {
        // Frames delta time to seconds delta time
        const delta = utils.secs(deltaFrames) * speedup.speedMul;
        time += delta;
        
        things.tick(delta, app, thingsContainer);
        weather.tick(time, delta, app, weatherContainer);
    }
}
