const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy123456789"

export function sineInOut(t) {
	return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function lerp(from, to, t) {
	if (t <= 0)
		return from;
	if (t >= 1)
		return to;
	return from + (to - from) * t;
}

export function random(from, to) {
	return lerp(from, to, Math.random());
}
export function randomInt(from, to) {
	return Math.floor(random(from, to + 1));
}
export function randomItem(array) {
	return array[randomInt(0, array.length - 1)];
}
export function randomBool(chance = .5) {
	return Math.random() > chance;
}
export function randomString(length, charset = CHARSET) {
	let result = "";
	for (let i = 0; i < length; i++)
		result += randomItem(charset);
	return result;
}

export function formatTime(time) {
	const str = time.toString();
	if (str.length == 0)
		return "00";
	else if (str.length == 1)
		return "0" + str;
	else
		return str;
}

export function playSound(name, volume = 1) {
	const url = `assets/audios/${name}.mp3`;
	const audio = new Audio(url);
	audio.volume = volume;
	audio.play();
	return audio
}
export function playGoofySound() {
	const name = randomItem([
		"tada",
		"nerd",
		"cola",
		"spring",
		"slide",
		"yell",
		"scream",
		"sad",
		"raaah",
	]);
	playSound(name, .5);
}
export function animateFlyout(el) {
	if (typeof el == "string")
		el = document.querySelector(el);

	if (el.classList.contains("animating"))
		return;

	el.classList.add("animating");
	playSound("slide", .3);

	const frames = [
		{ opacity: 0, transform: "rotateZ(-270deg) rotateY(360deg) translate(-100%, 300%)" },
		{ opacity: 1 },
		{ opacity: 1, transform: "rotateZ(0deg) rotateY(0deg) translate(0%, 0)" },
	]
	const opts = {
		duration: 5000,
		easing: "ease-out",
		fill: "forwards",
	};

	el.style.pointerEvents = "";
	el.animate(frames, opts).onfinish = () => {
		el.classList.remove("animating");
		playSound("tada", .5);
	}
}

window.playSound = playSound;
window.playGoofySound = playGoofySound;
window.animateFlyout = animateFlyout;
