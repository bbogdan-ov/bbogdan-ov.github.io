export const SPEEDUP_MUL = 10;

export let isSpeedUp = false;
export let speedMul = 1;

export function init() {
	const speedButton = document.querySelector(".timemachine .speed-button");

	speedButton.onclick = () => {
		isSpeedUp = !isSpeedUp;
		document.body.classList.toggle("speeded", isSpeedUp);

		speedMul = isSpeedUp ? SPEEDUP_MUL : 1;
	}
}
