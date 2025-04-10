export const SPEEDUP_MUL = 10;

export let isSpeedUp = false;
export let speedMul = 1;

export function init() {
	const speedButton = document.querySelector(".time-machine .speed-button");

	speedButton.onclick = () => {
		isSpeedUp = !isSpeedUp;
		document.body.classList.toggle("fast-forward", isSpeedUp);

		speedMul = isSpeedUp ? SPEEDUP_MUL : 1;
	}
}
