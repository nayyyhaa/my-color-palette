let colorDivs = document.querySelectorAll(".color");
let hexText = document.querySelectorAll(".color h2")
let generateBtn = document.querySelector(".generate")

/*functions*/

function generateHex() {
    const hexLetters = "0123456789abcdef";
    let hash = "#";
    for(let i=0; i<6; i++) {
        hash += hexLetters[Math.floor(Math.random()*16)];
    }
    return hash;
}

function randomColor() {
    colorDivs.forEach((color) => {
        let generatedHex = generateHex();
        //console.log(color.childNodes[1]);
        color.childNodes[1].innerHTML = generatedHex;
        color.style.backgroundColor = generatedHex;
    })
}

/*Event Listeners*/
document.addEventListener("DOMContentLoaded",randomColor);
generateBtn.addEventListener("click",randomColor);
