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
    let div = document.createElement("div");
    paletteInLocal.forEach(savePalette => {
        
    // div.appendChild(document.createTextNode(savePalette.name+" : "+savePalette.palette));
    // div.append(document.innerHTML = "\n")
    });
    div.innerHTML=JSON.stringify(paletteInLocal);
    libPopup.appendChild(div);
}
/*Event Listeners*/

saveBtn.addEventListener("click",openSavePanel);
closeSave.addEventListener("click",closeSavePanel);
save.addEventListener("click",savePalette);
//document.addEventListener("DOMContentLoaded",getLocalPalette);

libBtn.addEventListener("click",() => {
    openLibPanel();
    getLocalPalette();
});
closeLib.addEventListener("click",closeLibPanel);

