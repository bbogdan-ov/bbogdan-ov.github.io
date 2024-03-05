import * as utils from "../utils";

let isInjected = false;
let isInjecting = false;
let isEjecting = false;

export function initPromo() {
    const tv = document.querySelector("#promo-tv");
    /** @type {HTMLVideoElement} */
    const video = tv.querySelector(".tv-video");
    const lagsImage = tv.querySelector(".lags-image");
    const progressText = tv.querySelector(".tv-progress-text");
    const playButton = tv.querySelector(".tv-play-button");
    const stopButton = tv.querySelector(".tv-stop-button");

    video.onplay = ()=> {
        playButton.classList.add("playing");
        lagsImage.style.visibility = "hidden";
        isInjecting = false;
    }
    video.onpause = ()=> {
        playButton.classList.remove("playing");
    }
    video.ontimeupdate = ()=> {
        if (!isInjected || isEjecting) return;
        updateProgressText();
    }
    playButton.onclick = ()=> {
        if (isEjecting) return;
        if (!isInjected) {
            isInjecting = true;
            isInjected = true;
            progressText.textContent = "STOP"

            setTimeout(()=> {
                video.play();
            }, 1000);
            return;
        }
        
        if (video.paused)
            video.play();
        else
            video.pause();
    }
    stopButton.onclick = ()=> {
        if (isEjecting || !isInjected || isInjecting) return;
        isEjecting = true;

        video.pause();

        progressText.textContent = "EJECT";

        setTimeout(()=> {
            video.currentTime = 0;
            isInjected = false;
            isEjecting = false;
            progressText.textContent = "--:--";
            lagsImage.style.visibility = "visible";
        }, 1000)
    }

    function updateProgressText() {
        const secs = Math.floor(video.currentTime);
        const totalSecs = Math.floor(video.duration);

        progressText.textContent = `00:${ utils.formatTime(secs) } / 00:${ utils.formatTime(totalSecs) }`;
    }
}
