const tabsArray = Array.from(document.querySelectorAll("[data-type='tab']"))
const boxesArray = Array.from(document.querySelectorAll("[data-type='box']"))
const boxTitle = document.getElementById("tab-title");


const deactiveTabs = ()=>{
    tabsArray.forEach((el)=>{
        el.children[0].classList.remove("open")
        el.children[2].classList.remove("active")
    })
}

const activeTab = (tabName)=>{
    tabsArray.forEach((el)=>{
        if(el.dataset.tab===tabName){
            el.children[0].classList.add("open")
            el.children[2].classList.add("active")
        }
    })
}

const deactiveBoxes=()=>{
    boxesArray.forEach((el)=>{
        el.classList.add("hidden")
    })
}

const activeBox = (boxName)=>{
    boxesArray.forEach((el)=>{
        if(el.dataset.box===boxName){
            el.classList.remove("hidden")
        }
    })
}

const setBoxTitle = (title)=>{
    boxTitle.innerText = title
}

document.addEventListener("click", (e) => {
    const tabElement = e.target.closest('[data-type="tab"]');
    if (tabElement && tabElement.dataset.tab) {
        const tabName = tabElement.dataset.tab;
        deactiveBoxes();
        deactiveTabs();
        activeTab(tabName);
        activeBox(tabName);
        setBoxTitle(tabName);
    }
});
