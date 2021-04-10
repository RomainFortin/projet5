var burgerMenu = document.querySelector('button.menu');
var navigation = document.querySelector('button.menu ul');
var navAttr = false



burgerMenu.addEventListener('click', function(e){
    navAttr = !navAttr;
    if(navAttr == true) {
        navigation.classList.add('toggleNavigation')
    } else {
        navigation.classList.remove('toggleNavigation')
    }
    e.stopPropagation();
})


document.addEventListener('click', function(e){
    navAttr = false;
    navigation.classList.remove('toggleNavigation')
})