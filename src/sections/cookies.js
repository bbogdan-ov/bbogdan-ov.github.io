import gsap from "gsap";

export function initCookies() {
    const card = document.querySelector(".fuck-cookies");
    const closeButton = card.querySelector(".close-button");
    const allowButtons = card.querySelector(".allow-buttons").children;

    for (const btn of allowButtons) {
        btn.onclick = handleAllowClick;
    }

    closeButton.onclick = e=> {
        e.preventDefault();
        e.stopPropagation();

        closeButton.classList.add("fly-away");

        gsap.to(closeButton, {
            keyframes: {
                y: [ 0, 20, 0 ],
                easeEach: "power1.inOut",
            },
            duration: 3,
            delay: 2,
            repeat: -1,
        })
        gsap.to(closeButton, {
            x: -innerWidth - 100,
            duration: 10,
            delay: 2,
            ease: "none",
            onComplete: () => {
                closeButton.remove();
            }
        })

    }

    function handleAllowClick() {
        card.style.textAlign = "center";
        card.innerHTML = `
            <div class="cookies-marquee reverse-anim"></div>
            <h3>* THANKS *</h3>
            <p>Now i will show you ads based on your activity in the internet!</p>
            <div class="cookies-marquee"></div>
        `;
    }
}
