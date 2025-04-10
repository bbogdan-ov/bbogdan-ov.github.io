export function initCookies() {
	const block = document.querySelector("#fuck-cookies");
	const closeButton = block.querySelector(".close-button");
	const allowButtons = block.querySelector(".allow-buttons").children;

	for (const btn of allowButtons) {
		btn.onclick = handleAllowClick;
	}

	closeButton.onclick = e => {
		e.preventDefault();

		closeButton.classList.add("fly-away");

		closeButton.animate([
			{ translate: "0 0", easing: "ease-in-out" },
			{ translate: "0 20px", easing: "ease-in-out" },
			{ translate: "0 0", easing: "ease-in-out" },
		], {
			duration: 2_000,
			delay: 2_000,
			iterations: Infinity,
			composite: "add",
		});

		closeButton.animate([
			{ translate: `${ -innerWidth - 100 }px 0` },
		], {
			duration: 10_000,
			delay: 2_000,
			composite: "add",
			easing: "linear",
		}).onfinish = () => closeButton.remove();
	}

	function handleAllowClick() {
		block.style.textAlign = "center";
		block.innerHTML = `
			<div class="cookies-marquee anim-reverse"></div>
			<h3>* THANKS *</h3>
			<p>Now i will show you ads based<br>on your activity in the internet!</p>
			<div class="cookies-marquee"></div>
		`;
	}
}
