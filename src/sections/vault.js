let password = "";

export function initVault() {
    const vault = document.querySelector(".vault");
    const numbersButtons = vault.querySelectorAll(".buttons button");
    
    numbersButtons.forEach(button=> {
        const num = parseInt(button.getAttribute("data-num"));

        button.onpointerdown = ()=> {
            putNumber(num);
        }
    })

    function putNumber(number) {
        console.log(number);
    }
}

