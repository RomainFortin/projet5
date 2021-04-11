var burgerMenu = document.querySelector('button.menu');
var navigation = document.querySelector('button.menu ul');
var link = document.querySelectorAll('button.menu ul a');
var navAttr = false



burgerMenu.addEventListener('click', function(event){
    navAttr = !navAttr;
    if(navAttr == true) {
        navigation.classList.add('toggleNavigation')
    } else {
        navigation.classList.remove('toggleNavigation')
    }
    event.stopPropagation();
})

navigation.addEventListener('click', function(event){
    event.stopPropagation();
})

document.addEventListener('click', function(){
    navAttr = false;
    navigation.classList.remove('toggleNavigation')
    
})

if (window.location.href.includes('teddies')) {
    link[0].classList.add('toggleLink')
} else if (window.location.href.includes('cameras')) {
    link[1].classList.add('toggleLink')
} else {
    link[2].classList.add('toggleLink')
}