let saveBtn = document.querySelector(".save");
let saveContainer = document.querySelector(".save-container");
let savePopup = document.querySelector(".save-popup");
let closeSave = document.querySelector(".save-close");
let saveName = document.querySelector(".save-name");
let save = document.querySelector(".save-submit");
let libBtn = document.querySelector(".library");
let libContainer = document.querySelector(".library-container");
let libPopup = document.querySelector(".library-popup");
let closeLib = document.querySelector(".library-close");
let cacheDataHexes = [];
let cacheData = [];

/*Functions*/
function openSavePanel(){
    saveContainer.classList.add("active");
    savePopup.classList.add("active");
}
function closeSavePanel(){
    saveContainer.classList.remove("active");
    savePopup.classList.remove("active");
}
function savePalette(){
    
    let paletteInLocal = checkLocalStorage();
    let paletteName = saveName.value;
    colorDivs.forEach(color => {
        cacheDataHexes.push(color.children[0].innerText);
    });
    let localObj = {name: paletteName, palette: cacheDataHexes, paletterNr:paletteInLocal.length}
    cacheData.push(localObj);
    saveLocalStorage(localObj);
    cacheDataHexes = [];
    saveName.value = "";
    saveInLibrary();
}
function openLibPanel(){
    libContainer.classList.add("active");
    libPopup.classList.add("active");
}
function closeLibPanel(){
    libContainer.classList.remove("active");
    libPopup.classList.remove("active");
}

/*local storage*/

function checkLocalStorage(){
    let paletteInLocal;
    if(localStorage.getItem("paletteInLocal"))  return JSON.parse(localStorage.getItem("paletteInLocal"));
    return [];
}

function saveLocalStorage(cacheData){
    let paletteInLocal = checkLocalStorage();
    paletteInLocal.push(cacheData);
    localStorage.setItem("paletteInLocal",JSON.stringify(paletteInLocal));
    
    saveContainer.classList.remove("active");
    savePopup.classList.remove("active");
}
function getLocalPalette(){
    let paletteInLocal = checkLocalStorage();
    let bigPreview = document.createElement("div");
    bigPreview.classList.add("bigpalette-preview");
    paletteInLocal.forEach(savePalette => {
        console.log(savePalette)
        let index = savePalette.paletterNr;
        let palettePreview = document.createElement("div");
        palettePreview.classList.add("palette-preview");
        let paletteTitle = document.createElement("h4");
        paletteTitle.innerText = savePalette.name;
        paletteTitle.classList.add("palette-title");
        let smallPreview = document.createElement("div");
        smallPreview.classList.add("small-preview")
        savePalette.palette.forEach((palette) => {
            
            let smallDiv = document.createElement("div");
            smallDiv.classList.add("small-div")
            smallDiv.style.backgroundColor = palette;
            smallPreview.appendChild(smallDiv);
        })
        let selectBtn = document.createElement("button");
        selectBtn.classList.add("select-btn");
        selectBtn.innerHTML = "Select";
        
        /*select event*/
        selectBtn.addEventListener("click", (e) => {
            colorArray = [];
            closeLibPanel();
            let color = savePalette.palette;
            colorDivs.forEach((div,i) => {
                
                let icons = div.querySelectorAll(".controls button");
                let hexText = div.children[0];
                div.style.backgroundColor = color[i];
                hexText.innerHTML = color[i];
                if(div.classList.contains("locked")) {
                    colorArray.push(hexText.innerText);
                    return;
                }
                else colorArray.push(chroma(color[i]).hex());
                /*check luminance for hexText*/
                checkLuminence(color[i], hexText);
                for(icon of icons) checkLuminence(color[i], icon);

                /*colorize sliders*/
                let Tcolor = chroma(color[i]);
                let sliderItems = div.querySelectorAll(".sliders input");
                const hue = sliderItems[0];
                const saturation = sliderItems[1];
                const brightness = sliderItems[2];
                colorizeSliders(Tcolor, hue, saturation, brightness);
            })
            resetSlider();
        });
        palettePreview.appendChild(paletteTitle);
        palettePreview.appendChild(smallPreview);
        palettePreview.appendChild(selectBtn);
        bigPreview.appendChild(palettePreview);

    });
    libPopup.appendChild(bigPreview);
}

function saveInLibrary(){
    let paletteInLocal = checkLocalStorage();
    let bigPreview = document.createElement("div");
    bigPreview.classList.add("bigpalette-preview");
    cacheData.forEach(savePalette => {
        console.log(savePalette)
        let index = savePalette.paletterNr;
        let palettePreview = document.createElement("div");
        palettePreview.classList.add("palette-preview");
        let paletteTitle = document.createElement("h4");
        paletteTitle.innerText = savePalette.name;
        paletteTitle.classList.add("palette-title");
        let smallPreview = document.createElement("div");
        smallPreview.classList.add("small-preview")
        savePalette.palette.forEach((palette) => {
            
            let smallDiv = document.createElement("div");
            smallDiv.classList.add("small-div")
            smallDiv.style.backgroundColor = palette;
            smallPreview.appendChild(smallDiv);
        })
        let selectBtn = document.createElement("button");
        selectBtn.classList.add("select-btn");
        selectBtn.innerHTML = "Select";
        
        /*select event*/
        selectBtn.addEventListener("click", (e) => {
            colorArray = [];
            closeLibPanel();
            let color = savePalette.palette;
            colorDivs.forEach((div,i) => {
                
                let icons = div.querySelectorAll(".controls button");
                let hexText = div.children[0];
                div.style.backgroundColor = color[i];
                hexText.innerHTML = color[i];
                if(div.classList.contains("locked")) {
                    colorArray.push(hexText.innerText);
                    return;
                }
                else colorArray.push(chroma(color[i]).hex());
                /*check luminance for hexText*/
                checkLuminence(color[i], hexText);
                for(icon of icons) checkLuminence(color[i], icon);

                /*colorize sliders*/
                let Tcolor = chroma(color[i]);
                let sliderItems = div.querySelectorAll(".sliders input");
                const hue = sliderItems[0];
                const saturation = sliderItems[1];
                const brightness = sliderItems[2];
                colorizeSliders(Tcolor, hue, saturation, brightness);
            })
            resetSlider();
        });
        palettePreview.appendChild(paletteTitle);
        palettePreview.appendChild(smallPreview);
        palettePreview.appendChild(selectBtn);
        bigPreview.appendChild(palettePreview);

    });
    libPopup.appendChild(bigPreview);
}
/*Event Listeners*/

getLocalPalette();
saveBtn.addEventListener("click",openSavePanel);
closeSave.addEventListener("click",closeSavePanel);
save.addEventListener("click",savePalette);
//document.addEventListener("DOMContentLoaded",getLocalPalette);

libBtn.addEventListener("click",() => {
    openLibPanel();
});
closeLib.addEventListener("click",closeLibPanel);

