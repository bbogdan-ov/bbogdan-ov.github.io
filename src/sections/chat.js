import * as funny from "../funny";
import * as vault from "../sections/vault";

const giveMePasswordPlease = ["password please", "password pls", "give me password right now"]
let isAlreadySaid = false;

export function initChat() {
    const input = document.querySelector("#chat-input");
    const button = document.querySelector("#chat-button");

    button.onclick = ()=> {
        // Alert password if user asks
        if (giveMePasswordPlease.includes(input.value.toLowerCase())) {
            if (!isAlreadySaid) {
                alert(`the password is ${ vault.vaultPassword }, but DO NOT TELL ANYONE`);
                isAlreadySaid = true;
            } else {
                alert("I'VE ALREADY GIVEN YOU THE PASSWORD, GO AWAY!")
            }
            return;
        }
        
        // Otherwise play LOVELY animation
        funny.animateFlyout("#lovelove");
    }
}
