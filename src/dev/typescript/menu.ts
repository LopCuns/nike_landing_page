const $navmenu = document.getElementById('navmenu') as HTMLElement
const $menuOpener = document.getElementById('menuOpener') as HTMLElement

function togglemenu (){
  $navmenu.classList.toggle('opened_nav')
  document.body.classList.toggle('noscroll')
}

$menuOpener.addEventListener('click',togglemenu)