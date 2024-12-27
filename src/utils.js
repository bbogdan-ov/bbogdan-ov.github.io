import * as consts from "./consts";

export function remap(alpha, from, to) {
	return alpha * (to - from) + from;
}
export function snap(value, size) {
	return Math.floor(value / size) * size;
}

export function random(from, to) {
	return remap(Math.random(), from, to);
}
export function randomInt(from, to) {
	return Math.floor(random(from, to));
}
export function randomItem(array) {
	return array[randomInt(0, array.length)];
}
export function randomBool(chance = .5) {
	return Math.random() > chance;
}
export function randomSign() {
	return randomBool() ? 1 : -1;
}
export function randomString(length, charset = consts.ASCII) {
	let result = "";
	for (let i = 0; i < length; i++)
		result += randomItem(charset);
	return result;
}

/** Frames to seconds */
export function secs(frames) {
	return frames / 60
}
/** Seconds to frames */
export function frames(secs) {
	return secs * 60
}

export function formatTime(time) {
	const str = time.toString()
	if (str.length == 0)
		return "00"
	if (str.length == 1)
		return "0" + str
	return str;
}

export function wave(time, from = 0, to = 1, func = Math.cos) {
	return remap((func(time) + 1) / 2, from, to);
}

export function playSound(name, volume = 1) {
	const url = `/audios/${name}.mp3`;
	const audio = new Audio(url);
	audio.volume = volume;
	audio.play();
	return audio
}
