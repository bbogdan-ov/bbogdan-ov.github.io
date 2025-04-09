import * as utils from "../utils.js";

// Generate random password so you cant cheat :)
export const password = utils.randomString(4, "0123456789");
let currentPassword = "";
let allowInput = true;

// Load door secret
const doorSecret = new Image();
doorSecret.classList.add("door-secret");
doorSecret.src = "/gifs/jesus.gif";
doorSecret.loading = "lazy";
doorSecret.alt = "JESUS IS REAL";

export function initVault() {
	const vault = document.querySelector(".vault");
	const door = vault.querySelector(".vault-door");
	const numpad = vault.querySelector(".vault-numpad");
	const display = numpad.querySelector(".numpad-display");
	const buttons = numpad.querySelectorAll(".buttons button");

	updateDisplay();

	// Listen number buttons clicks
	buttons.forEach(button => {
		const num = button.getAttribute("data-num");

		button.onclick = () => {
			putNumber(num);
		}
	})

	function putNumber(number) {
		if (!allowInput || currentPassword.length >= password.length) return;

		currentPassword += number.toString();
		updateDisplay();

		// Check password with delay if password input is filled
		if (currentPassword.length >= password.length) {
			allowInput = false;

			setTimeout(() => {
				checkPassword();
			}, 200);
		}
	}
	function resetPassword() {
		currentPassword = "";
		allowInput = true;
		vault.classList.remove("wrong");
		updateDisplay();
	}
	function checkPassword() {
		if (currentPassword == password) {
			correctPassword();
			return;
		}

		wrongPassword();

		setTimeout(resetPassword, 1000);
	}
	function correctPassword() {
		vault.classList.add("opened");
		display.textContent = "CORRECT";
		// Add jesus gif behind the door!
		door.prepend(doorSecret);

		utils.playSound("correct", .6);
	}
	function wrongPassword() {
		vault.classList.add("wrong");
		display.textContent = "WRONG";

		utils.playSound("wrong", .6);
	}

	function updateDisplay() {
		let text = currentPassword;

		// Fill remaining space of display with asterix
		display.textContent = text + "*".repeat(password.length - text.length);
	}
}

