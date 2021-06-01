let saveBtn = document.querySelector(".save");
let saveContainer = document.querySelector(".save-container");
let savePopup = document.querySelector(".save-popup");
let closeSave = document.querySelector(".save-close");
let libBtn = document.querySelector(".library");
let libContainer = document.querySelector(".library-container");
let libPopup = document.querySelector(".library-popup");
let closeLib = document.querySelector(".library-close");


/*Functions*/
function openSavePanel(){
    saveContainer.classList.add("active");
    savePopup.classList.add("active");
}
function closeSavePanel(){
    saveContainer.classList.remove("active");
    savePopup.classList.remove("active");
}
function openLibPanel(){
    libContainer.classList.add("active");
    libPopup.classList.add("active");
}
function closeLibPanel(){
    libContainer.classList.remove("active");
    libPopup.classList.remove("active");
}

/*Event Listeners*/

saveBtn.addEventListener("click",openSavePanel);
closeSave.addEventListener("click",closeSavePanel);

libBtn.addEventListener("click",openLibPanel);
closeLib.addEventListener("click",closeLibPanel);

