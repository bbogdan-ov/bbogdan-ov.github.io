export function initLoading() {
    const screen = document.querySelector(".loading-screen");

    scrollTo(0, 0);
    // Lock scrolling
    document.body.style.overflowY = "hidden";
    
    addEventListener("load", ()=> {
        screen.classList.add("loaded");

        // Free scrolling after 3 secs
        setTimeout(()=> {
            document.body.style.overflowY = "unset";
        }, 3500);
    });
}
