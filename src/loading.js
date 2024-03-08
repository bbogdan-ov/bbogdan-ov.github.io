import * as utils from "./utils";

export function initLoading() {
    const screen = document.querySelector(".loading-screen");

    // Remove loading screen in dev mode
    if (import.meta.env.DEV) {
        screen.remove();
        return;
    }
    
    // Lock scrolling
    document.body.style.overflowY = "hidden";
    scrollTo(0, 0);
    
    addEventListener("load", ()=> {
        screen.classList.add("loaded");
        utils.playSound("spring", .8);

        // Free scrolling after 3 secs
        setTimeout(()=> {
            document.body.style.overflowY = "unset";
        }, 3500);
    });
}
