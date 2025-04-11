export function initTimemachine(website) {
	const timeMachine = document.querySelector("#time-machine");
	const fastForwardButton = timeMachine.querySelector(".fast-forward-button");

	fastForwardButton.onclick = () => {
		website.setFastForward(!website.isFastForward);
	}
}
