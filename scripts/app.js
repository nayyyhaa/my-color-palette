let colorDivs = document.querySelectorAll(".color");
let generateBtn = document.querySelector(".generate")
let adjustBtns = document.querySelectorAll(".adjust");
let sliders = document.querySelectorAll(".sliders");
let closeBtns = document.querySelectorAll(".close-adjustments");
let sliderInputs = document.querySelectorAll('input[type="range"]')
let colorArray = [];
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
    colorArray = [];
    colorDivs.forEach((div) => {
        let generatedHex = generateHex();
        colorArray.push(chroma(generatedHex).hex());
        let hexText = div.children[0];
        let icons = div.querySelectorAll(".controls button");
        //console.log(color.children); -HTML collection color.childNode: nodelist w/ text and in between elements

        /*setting up color*/
        hexText.innerHTML = generatedHex;
        div.style.backgroundColor = generatedHex;

        /*check luminance for hexText*/
        checkLuminence(generatedHex, hexText);
        for(icon of icons) checkLuminence(generatedHex, icon);

        /*colorize sliders*/
        let color = chroma(generatedHex);
        let sliderItems = div.querySelectorAll(".sliders input");
        const hue = sliderItems[0];
        const saturation = sliderItems[1];
        const brightness = sliderItems[2];
        colorizeSliders(color, hue, saturation, brightness);
    })
    
    /*reset slider*/
    resetSlider();
}

/*colorize Sliders*/
function colorizeSliders(color, hue, saturation, brightness) {
    /*scale saturation*/
    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);

    /*scale lightness*/
    const midLight = color.set('hsl.l',0.5);
    const scaleLight = chroma.scale(["black",midLight,"white"]);

    /*update input color*/
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(0.5)}, ${scaleSat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleLight(0)}, ${scaleLight(0.5)}, ${scaleLight(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
}

/*update bg by slider*/
function updateBackground(e) {
    let index = e.target.getAttribute("data-hue") || e.target.getAttribute("data-sat") || e.target.getAttribute("data-light");
    let slider = e.target.parentElement.querySelectorAll('input[type="range"]');
    let hue = slider[0];
    let saturation = slider[1];
    let lightness = slider[2];

    let color = colorArray[index];
    let bgColor = chroma(color)
        .set("hsl.h",hue.value)
        .set("hsl.s",saturation.value)
        .set("hsl.l",lightness.value);
    colorDivs[index].style.backgroundColor = bgColor;

    /*color to sliders*/
    colorizeSliders(bgColor, hue, saturation, lightness)
}

/*update UI*/
function updateTextUI(index){
    let activeDiv = colorDivs[index];
    let color = chroma(activeDiv.style.backgroundColor);
    let hexText = activeDiv.children[0];
    let icons = activeDiv.querySelectorAll(".controls button");

    hexText.innerText = color.hex();
    /*check luminance for hexText*/
    checkLuminence(color, hexText);
    for(icon of icons) checkLuminence(color,icon);
}

/*open slider*/
function toggleSlider(index) {
    let slider = sliders[index];
    slider.classList.toggle("open");
}
function closeSlider(index) {
    let slider = sliders[index];
    slider.classList.remove("open");
}

/*reset slider*/
function resetSlider() {
    sliderInputs.forEach((slider) => {
        if(slider.name === "hue"){
            let hueColor = colorArray[slider.getAttribute("data-hue")];
            let hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue);
        }
        if(slider.name === "saturation"){
            let satColor = colorArray[slider.getAttribute("data-sat")];
            let satValue = chroma(satColor).hsl()[1];
            slider.value = Math.floor(satValue*100)/100;
        }
        if(slider.name === "lightness"){
            let lightColor = colorArray[slider.getAttribute("data-light")];
            let brightValue = chroma(lightColor).hsl()[2];
            slider.value = Math.floor(brightValue*100)/100;
        }
    })
}

/*Event Listeners*/
document.addEventListener("DOMContentLoaded",randomColor);
generateBtn.addEventListener("click",randomColor);

adjustBtns.forEach((adjust,index) => {
    adjust.addEventListener("click",() => {
        toggleSlider(index);
    });
})

closeBtns.forEach((close,index) => {
    close.addEventListener("click",() => {
        closeSlider(index);
    })
})

sliderInputs.forEach((slider) => {
    slider.addEventListener("input",updateBackground);
})

colorDivs.forEach((div,index) => {
    div.addEventListener("change",()=>{
        updateTextUI(index);
    });
})
