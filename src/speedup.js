export const SPEEDUP_MUL = 10;

export let isSpeedUp = false;
export let speedMul = 1;

let speedButton;

export function init() {
    speedButton = document.querySelector("#speed-button");

    speedButton.onclick = ()=> {
        toggleSpeedup();
    }
}

export function toggleSpeedup() {
    isSpeedUp = !isSpeedUp;
    speedButton.classList.toggle("active", isSpeedUp);

    speedMul = isSpeedUp ? SPEEDUP_MUL : 1;

    // Speedup elements
    const elements = document.querySelectorAll("[data-speedup]");
    elements.forEach(el=> {
        const dur = el.getAttribute("data-speedup-dur");

        el.style.animationDuration = (parseFloat(dur) / speedMul) + "s";
    });
}
