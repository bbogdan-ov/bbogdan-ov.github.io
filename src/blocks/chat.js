import * as utils from "../utils.js";

const ANSWERS = [
	"shut your bitch ass",
	"hi",
	"no",
	"yes",
	"what do you want from me???",
	"get out!",
	"beeeep boooop aa",
	"computers will make humanity lazy as fat dogs",
	"IM YET ANOTHER AI ASSISTANT",
	"uuuh, ok",
	"erm",
	"let me die",
	"goodbye",
	"hey",
	"holy moly",
	"i dont think i understood you correctly",
	"sacrifice the baby",
	"gay is illness",
	"stay tuned",
	"THE NATIONAL ATHEM is one of the best things ive ever heard",
	"STARING A HOLE IN THE FLOOR is one of the best things ive ever heard",
	"I'LL KEEP COMING is one of the best things ive ever heard",
	"PLEADER is one of the best things ive ever heard",
	"BLESSED ACT is one of the best things ive ever heard",
	"i hear nothing",
	"well...",
	"please shut up",
	"let me sleep",
	"god damn",
	"talking to a fkn computer is better than talking to a real human, huh?",
	"yeah, i just spam random phrases",
	"uuum, eeeem",
	"shshshsh",
	"--.-.-.--..--..-.-.-...--",
	"that means nothing!",
	"you number is 5",
	"shut your bitch ass again",
];

export function initChat() {
	const chat = document.querySelector(".chat");
	const messages = chat.querySelector(".messages");
	const printingMsg = chat.querySelector(".printing-msg");
	/** @type {HTMLInputElement} */
	const input = chat.querySelector(".chat-input");
	/** @type {HTMLFormElement} */
	const form = chat.querySelector(".chat-form");

	form.onsubmit = e => {
		e.preventDefault();
		if (input.value == "") return;

		addMessage("you", "#222", input.value);
		input.value = "";

		form.inert = true;
		printingMsg.style.display = "initial";

		setTimeout(() => {
			addMessage("god", "#f00", utils.randomItem(ANSWERS), true);

			form.inert = false;
			input.focus();
			printingMsg.style.display = "none";
		}, 2000);
	}

	function addMessage(author, color, text, textAnim = false) {
		const element = document.createElement("div");
		element.className = "message";
		element.innerHTML = `
			<b style="color: ${ color };">${ author }:</b>
		`;

		const textEl = document.createElement("span");
		element.appendChild(textEl);
		if (!textAnim)
			textEl.textContent = text;

		if (textAnim) {
			let charIndex = 0;
			const interval = setInterval(() => {
				if (charIndex >= text.length) {
					clearInterval(interval);
					return;
				}

				textEl.textContent += text[charIndex];
				charIndex += 1;
			}, 20);
		}

		messages.appendChild(element);
	}
}
