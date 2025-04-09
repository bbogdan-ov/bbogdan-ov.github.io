import * as consts from "./consts.js";

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
	return Math.ceil(random(from, to));
}
export function randomItem(array) {
	return array[randomInt(0, array.length - 1)];
}
export function randomBool(chance = .5) {
	return Math.random() > chance;
}
export function randomString(length, charset = consts.CHARSET) {
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
