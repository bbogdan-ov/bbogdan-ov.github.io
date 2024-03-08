import * as utils from "../utils";

// Generate random password so you cant cheat :)
const password = utils.randomString(4, "0123456789");
let currentPassword = "";
let isPasswordCorrent = false;
let allowInput = true;

// Log password if in dev mode
if (import.meta.env.DEV)
    console.log(password);

export function initVault() {
    const vault = document.querySelector(".vault");
    const numbersButtons = vault.querySelectorAll(".buttons button");
    const passwordInput = vault.querySelector(".password-input");

    updateInput();

    // Listen number buttons clicks
    numbersButtons.forEach(button=> {
        const num = button.getAttribute("data-num");

        button.onpointerdown = ()=> {
            putNumber(num);
        }
    })

    function putNumber(number) {
        if (!allowInput || currentPassword.length >= password.length) return;

        currentPassword += number.toString();
        updateInput();

        // Send password with delay if password input is filled
        if (currentPassword.length >= password.length) {
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
        if (currentPassword == password)
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

        isPasswordCorrent = true;
        utils.playSound("correct", .6);
    }

    function updateInput() {
        let text = currentPassword;

        // Fill remaining space of input with asterix
        if (text.length < password.length)
            text += "*".repeat(password.length - text.length);
        
        passwordInput.textContent = text;
    }
}

