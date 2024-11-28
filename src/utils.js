import * as consts from "./consts";
//import click_audio from "/audios/click.mp3";
//import cola_audio from "/audios/cola.mp3";
//import goofyThrow1_audio from "/audios/goofy-throw-1.mp3";
//import goofyThrow2_audio from "/audios/goofy-throw-2.mp3";
//import nerd_audio from "/audios/nerd.mp3";
//import raaah_audio from "/audios/raaah.mp3";
//import sad_audio from "/audios/sad.mp3";
//import scream_audio from "/audios/scream.mp3";
//import slide_audio from "/audios/slide.mp3";
//import spring_audio from "/audios/spring.mp3";
//import tada_audio from "/audios/tada.mp3";
//import tear1_audio from "/audios/tear-1.mp3";
//import tear2_audio from "/audios/tear-2.mp3";
//import throw1_audio from "/audios/throw-1.mp3";
//import throw2_audio from "/audios/throw-2.mp3";
//import yell_audio from "/audios/yell.mp3";
//import wrong_audio from "/audios/wrong.mp3";
//import correct_audio from "/audios/correct.mp3";
//import knock_audio from "/audios/knock.mp3";
//import meow_audio from "/audios/meow.mp3";

//export const AUDIO_NAMES = {
//    "click": click_audio,
//    "cola": cola_audio,
//    "goofy-throw-1": goofyThrow1_audio,
//    "goofy-throw-2": goofyThrow2_audio,
//    "nerd": nerd_audio,
//    "raaah": raaah_audio,
//    "sad": sad_audio,
//    "scream": scream_audio,
//    "slide": slide_audio,
//    "spring": spring_audio,
//    "tada": tada_audio,
//    "tear-1": tear1_audio,
//    "tear-2": tear2_audio,
//    "throw-1": throw1_audio,
//    "throw-2": throw2_audio,
//    "yell": yell_audio,
//    "wrong": wrong_audio,
//    "correct": correct_audio,
//    "knock": knock_audio,
//    "meow": meow_audio,
//}

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
export function randomBool(chance=.5) {
    return Math.random() > chance;
}
export function randomSign() {
    return randomBool() ? 1 : -1;
}
export function randomString(length, charset=consts.ASCII) {
    let result = "";
    for (let i = 0; i < length; i ++) 
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

export function wave(time, from=0, to=1, func=Math.cos) {
    return remap((func(time) + 1) / 2, from, to);
}

export function playSound(name, volume=1) {
    const url = `/audios/${ name }.mp3`;
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play();
    return audio
}
