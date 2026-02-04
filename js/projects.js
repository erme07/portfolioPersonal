const $techs_selected = document.getElementById("techs-selected")
const projects_array = Array.from(document.querySelectorAll(".project"))

const techs_array = []

document.addEventListener("input",(e)=>{
    if(e.target.checked)
        techs_array.push(e.target.id)
    else{
        const index = techs_array.indexOf(e.target.id)
        if (index > -1)
            techs_array.splice(index, 1);
    }

    if(techs_array.length === 0)
        $techs_selected.innerText = "All; "
    else
        $techs_selected.innerText = techs_array.join("; ") + "; "

    projects_array.forEach(project => {
        const project_techs = project.dataset.tech.split("-")
        if(techs_array.some(el => project_techs.includes(el.toLowerCase())))
            project.style.display = "block"
        else if(techs_array.length === 0)
            project.style.display = "block"
        else 
            project.style.display = "none"
            
    })
})


document.addEventListener("click",(e)=>{
    if(e.target.closest('#section-content-title')){
        if(e.target.closest('.mobile')){
            if(getComputedStyle(document.getElementById("filters")).display === "none"){
                document.querySelector("#section-arrow-menu-mobile").style.transform = "rotate(0deg)"
                document.getElementById("filters").style.display = "block"
            }
            else{
                document.querySelector("#section-arrow-menu-mobile").style.transform = "rotate(-90deg)"
                document.getElementById("filters").style.display = "none"
            }
        }else{

            if(getComputedStyle(document.getElementById("filters")).display === "none"){
                document.querySelector("#section-arrow-menu").style.transform = "rotate(90deg)"
                document.getElementById("filters").style.display = "block"
            }
            else{
                document.querySelector("#section-arrow-menu").style.transform = "rotate(0deg)"
                document.getElementById("filters").style.display = "none"
            }
        }
        console.log("dentroooooooooooo")
    }
})