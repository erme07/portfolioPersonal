

let menuOpen = false;

function toggleMobileMenu(){
    menuOpen = !menuOpen;
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');

    const page = document.getElementsByTagName('main')[0];
    // Hide / show section
    if (page.style.display === 'none') {
        page.style.display = 'flex';
    } else {
        page.style.display = 'none';
    }
    document.getElementById('menu-button-open').classList.toggle('hidden');
    document.getElementById('menu-button-close').classList.toggle('hidden');
};

document.addEventListener("click", (e) => {
    if (e.target.closest('#menu-button-open') || e.target.closest('#menu-button-close')) {
        toggleMobileMenu();
        console.log("dentroooooooooooo")
    }
});