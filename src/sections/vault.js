import * as utils from "../utils";
import jesus_img from "/gifs/jesus.gif";

// Generate random password so you cant cheat :)
export const vaultPassword = utils.randomString(4, "0123456789");
let currentPassword = "";
let isPasswordCorrent = false;
let allowInput = true;

const doorSecret = new Image();
doorSecret.classList.add("door-secret");
doorSecret.src = jesus_img;
doorSecret.loading = "lazy";
doorSecret.alt = "JESUS IS REAL";

// Log password if in dev mode
if (import.meta.env.DEV)
    console.log(vaultPassword);

export function initVault() {
    const vault = document.querySelector(".vault");
    const numbersButtons = vault.querySelectorAll(".buttons button");
    const passwordInput = vault.querySelector(".password-input");
    const door = document.querySelector("#vault-door");

    updateInput();

    // Listen number buttons clicks
    numbersButtons.forEach(button=> {
        const num = button.getAttribute("data-num");

        button.onpointerdown = ()=> {
            putNumber(num);
        }
    })

    function putNumber(number) {
        if (!allowInput || currentPassword.length >= vaultPassword.length) return;

        currentPassword += number.toString();
        updateInput();

        // Send password with delay if password input is filled
        if (currentPassword.length >= vaultPassword.length) {
            allowInput = false;
            
            setTimeout(()=> {
                sendPassword();
            }, 200);
        }
    }
    function resetPassword() {
        currentPassword = "";
        passwordInput.classList.remove("wrong");
        allowInput = true;
        updateInput();
    }
    function sendPassword() {
        if (currentPassword == vaultPassword)
            correctPassword();
        else
            wrongPassword();
        
        // Don't reset password if it is correct
        if (isPasswordCorrent) return;

        setTimeout(()=> {
            resetPassword();
        }, 1000);
    }
    function wrongPassword() {
        passwordInput.classList.add("wrong");
        passwordInput.textContent = "WRONG";

        utils.playSound("wrong", .6);
    } 
    function correctPassword() {
        passwordInput.textContent = "CORRECT";
        // Open door if password is correct
        door.classList.add("opened");
        // Prepend jesus gif!
        door.prepend(doorSecret);

        isPasswordCorrent = true;
        utils.playSound("correct", .6);
    }

    function updateInput() {
        let text = currentPassword;

        // Fill remaining space of input with asterix
        if (text.length < vaultPassword.length)
            text += "*".repeat(vaultPassword.length - text.length);
        
        passwordInput.textContent = text;
    }
}

