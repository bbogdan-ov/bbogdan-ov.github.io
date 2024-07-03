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

		closeButton.animate([
			{ transform: "translateY(0px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
			{ transform: "translateY(-10px)", easing: "ease-in-out" },
			{ transform: "translateY(10px)", easing: "ease-in-out" },
		], {
			duration: 10000,
			delay: 2000,
			fill: "both"
		})
		closeButton.animate([
			{ transform: `translateX(${ -innerWidth }px)` },
		], {
			duration: 10000,
			delay: 2000,
			easing: "linear",
			fill: "both"
		});
	}

	function handleAllowClick() {
		const oldBounds = card.getBoundingClientRect();

		card.style.textAlign = "center";
		card.innerHTML = `
			<div class="cookies-marquee"></div>
			<h3>* THANKS *</h3>
			<p>Now i will show you ads based on your activity in the internet!</p>
			<div class="cookies-marquee"></div>
		`;

		const bounds = card.getBoundingClientRect();

		card.style.height = oldBounds.height + "px";
		card.animate(
			{ height: bounds.height + "px" },
			{ duration: 2000, easing: "linear", delay: 500, fill: "both" }
		);
	}
}
