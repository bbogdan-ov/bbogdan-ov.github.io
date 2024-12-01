document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLDivElement} */
    const loader = document.querySelector(".loader");
    const loaderPanel = loader.querySelector(".loader-panel");
    const loaderDisplay = loaderPanel.querySelector(".loader-display");

    // Immediately close loader in dev mode
    if (import.meta.env.DEV) {
        loader.remove();
        return;
    }

    // Lock scroll
    document.body.classList.add("lock-scroll");
    scrollTo(0, 0);

    startAnimation();

    addEventListener("load", () => {
        loaderDisplay.innerHTML = `
            <div class="word">
                <div class="char">d</div>
                <div class="char">o</div>
                <div class="char">n</div>
                <div class="char">e</div>
                <div class="char">!</div>
            </div>
        `;

        // Restart animation after changing the text
        startAnimation();

        setTimeout(() => {
            loader.classList.add("loaded");
            loader.ontransitionend = e => {
                if (e.target == loader)
                    loader.remove();
            }
        }, 1000)

        setTimeout(() => {
            // Unlock scroll and make loader click-throughable
            loader.style.pointerEvents = "none";
            document.body.classList.remove("lock-scroll");
        }, 2000);
    });

    function startAnimation() {
        const loaderChars = loaderDisplay.querySelectorAll(".char");

        // Fade in
        loaderChars.forEach((char, index) => char.animate({
            opacity: [0, 1]
        }, {
            duration: 40,
            delay: 80 * index + 200,
            fill: "both",
        }))

        const yKeyframes = {
            transform: [
                `translateY(10px)`,
                `translateY(-10px)`,
                `translateY(10px)`,
            ],
            easing: "ease-in-out",
        }
        const xKeyframes = {
            transform: [
                `translateX(-5px)`,
                `translateX(5px)`,
                `translateX(-5px)`,
            ],
            easing: "ease-in-out",
        }

        // Wave up and down
        loaderChars.forEach((char, index) => char.animate(yKeyframes, {
            duration: 500,
            delay: 80 * index,
            iterations: Infinity,
            composite: "add",
        }));
        // Wave left and right
        loaderChars.forEach((char, index) => char.animate(xKeyframes, {
            duration: 500,
            delay: 20 * index,
            iterations: Infinity,
            composite: "add",
        }));
    }
})
