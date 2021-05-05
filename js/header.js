const totalPanier = document.querySelector('.panier .total')

if(localStorage.getItem('orinoco')){
    totalPanier.innerHTML = JSON.parse(localStorage.getItem('orinoco')).length;
}

if (localStorage.length>0){
    totalPanier.classList.add('isFilled')
} else {
    totalPanier.classList.remove('isFilled')
}