import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const loaderOverlay = loader.querySelector(".loader-flash-overlay");
    const loaderPanel = loader.querySelector(".loader-panel");
    const loaderDisplay = loaderPanel.querySelector(".loader-display");

    // Lock scrolling
    document.body.style.overflowY = "hidden";
    scrollTo(0, 0);

    // Show loader panel
    gsap.to(loaderPanel, {
        opacity: 1,
        duration: 1,
        delay: .2,
        ease: "power1.out",
    });

    startAnimation(1, 1.7);

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
        startAnimation(.5, .4);

        const tl = gsap.timeline({
            delay: 1,
            onComplete: () => {
                // Remove loader on animation end and unlock scroll
                loader.remove()
                document.body.style.overflowY = "";
            }
        });

        tl.fromTo(loader, { filter: "brightness(1)", }, {
            filter: "brightness(6)",
            duration: 4,
            ease: "power2.in",
        });
        tl.to(loaderOverlay, {
            opacity: 1,
            duration: 4,
            ease: "power2.in",
        }, "<");
        tl.to(loader, {
            opacity: 0,
            duration: 2,
            ease: "none"
        }, "-=1");
    })

    function startAnimation(freq, delay) {
        const loaderChars = loaderDisplay.querySelectorAll(".char");

        const offsetX = 5 * freq;
        const offsetY = 10 * freq;

        // Fade in
        gsap.fromTo(loaderChars, { opacity: 0 }, {
            opacity: 1,
            stagger: .06,
            duration: .1,
            ease: "power3.out",
            delay
        });

        // Wave up and down
        gsap.fromTo(loaderChars, { y: offsetY }, {
            keyframes: {
                y: [ offsetY, -offsetY, offsetY ],
                easeEach: "power1.inOut",
            },
            stagger: {
                amount: .6,
                repeat: -1,
            },
            duration: .5,
        });
        // Wave left and right
        gsap.fromTo(loaderChars, { x: -offsetX }, {
            keyframes: {
                x: [ -offsetX, offsetX, -offsetX ],
                easeEach: "power1.inOut",
            },
            stagger: {
                each: .02,
                repeat: -1,
            },
            duration: .5,
        });
    }
})
