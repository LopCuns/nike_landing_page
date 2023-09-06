"use strict";
const $navmenu = document.getElementById('navmenu');
const $menuOpener = document.getElementById('menuOpener');
function togglemenu() {
    $navmenu.classList.toggle('opened_nav');
    document.body.classList.toggle('noscroll');
}
$menuOpener.addEventListener('click', togglemenu);
