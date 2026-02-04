
const $textContainer = document.querySelector(".text-container");

const codeText={
    date: new Date().toDateString(),
    lines : 0
}

const getNumberLines = ()=> {

    const style = window.getComputedStyle($textContainer);
    const lineHeight = parseFloat(style.lineHeight);

    // fallback si line-height es "normal"
    const computedLineHeight = isNaN(lineHeight) ? parseFloat(style.fontSize) * 1.2 : lineHeight;

    const maxHeight = $textContainer.offsetHeight;
    return Math.ceil(maxHeight / computedLineHeight);
}

const setDate=()=>{
    const datecontainer = document.getElementById("date");
    datecontainer.innerText = "\"" + codeText.date + "\"";
}

const generateLineNumbers = (lines) => {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= lines; i++) {
        const lineNumber = document.createElement("div");
        lineNumber.className = "grid grid-cols-2 justify-end";
        lineNumber.innerHTML = `<span class="col-span-1 mr-3">${i}</span>`;
        fragment.appendChild(lineNumber);
    }
    document.getElementById("line-numbers").innerHTML=''
    document.getElementById("line-numbers").appendChild(fragment);
}


document.addEventListener("click",(e)=>{
    if(e.target.closest('.toggle')){
        if(e.target.closest("#contacts")){
            if(getComputedStyle(document.getElementById("contacts-links")).display === "none"){
                document.querySelector("#contacts .arrow").style.transform = "rotate(90deg)"
                document.getElementById("contacts-links").style.display = "block"
            }
            else{
                document.querySelector("#contacts .arrow").style.transform = "rotate(0deg)"
                document.getElementById("contacts-links").style.display = "none"
            }
        }else if(e.target.closest("#find-me-in")){
            if(getComputedStyle(document.getElementById("find-links")).display === "none"){
                document.querySelector("#find-me-in .arrow").style.transform = "rotate(90deg)"
                document.getElementById("find-links").style.display = "block"
            }
            else{
                document.querySelector("#find-me-in .arrow").style.transform = "rotate(0deg)"
                document.getElementById("find-links").style.display = "none"
            }
        }
    }
})

document.addEventListener("input",(e)=>{
    if(e.target.id === "name-input"){
        document.getElementById("name-value").innerText = e.target.value
    }
    else if(e.target.id === "email-input"){
        document.getElementById("email-value").innerText = e.target.value
    }
    else if(e.target.id === "message-input"){
        document.getElementById("message-value").innerText = e.target.value
    }else 
        return;
    if(getNumberLines() !==  codeText.lines){
        codeText.lines = getNumberLines();
        generateLineNumbers(codeText.lines);
    }
})

generateLineNumbers(getNumberLines());
setDate();

window.addEventListener("resize",(e)=>{
    generateLineNumbers(getNumberLines());
})