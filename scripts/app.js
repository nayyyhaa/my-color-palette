let colorDivs = document.querySelectorAll(".color");
let generateBtn = document.querySelector(".generate")

/*functions*/

/*generating color*/
function generateHex() {
    const hexLetters = "0123456789abcdef";
    let hash = "#";
    for(let i=0; i<6; i++) {
        hash += hexLetters[Math.floor(Math.random()*16)];
    }
    return hash;

    /*chroma library*/
    // let hash = chroma.random();
    // return hash;
}

/*text and bg contrast -luminance*/
function checkLuminence(color,text) {
    let contrast = chroma(color).luminance();
    if(contrast < 0.5) text.style.color = "white";
    else text.style.color = "black";
}

/*get Color*/
function randomColor() {
    colorDivs.forEach((div) => {
        let generatedHex = generateHex();
        let hexText = div.children[0];
        //console.log(color.children); -HTML collection color.childNode: nodelist w/ text and in between elements

        /*setting up color*/
        hexText.innerHTML = generatedHex;
        div.style.backgroundColor = generatedHex;

        /*check luminance for hexText*/
        checkLuminence(generatedHex, hexText);
    })
}

/*Event Listeners*/
document.addEventListener("DOMContentLoaded",randomColor);
generateBtn.addEventListener("click",randomColor);
