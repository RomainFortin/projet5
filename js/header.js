const burgerMenu = document.querySelector('button.menu');
const navigation = document.querySelector('button.menu ul');
const link = document.querySelectorAll('button.menu ul a');
var navAttr = false;

burgerMenu.addEventListener('click', function (event) {
    navAttr = !navAttr;
    if (navAttr == true) {
        navigation.classList.add('toggleNavigation')
    } else {
        navigation.classList.remove('toggleNavigation')
    }
    event.stopPropagation();
})

navigation.addEventListener('click', function (event) {
    event.stopPropagation();
})

document.addEventListener('click', function () {
    navAttr = false;
    navigation.classList.remove('toggleNavigation')

})

if (window.location.href.includes('teddies')) {
    link[0].classList.add('toggleLink')
} else if (window.location.href.includes('cameras')) {
    link[1].classList.add('toggleLink')
} else if (window.location.href.includes('furniture')) {
    link[2].classList.add('toggleLink')
}

const totalPanier = document.querySelector('.panier .total')

totalPanier.innerHTML = localStorage.length;
if (localStorage.length>0){
    totalPanier.classList.add('isFilled')
} else {
    totalPanier.classList.remove('isFilled')
}