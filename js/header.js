const totalPanier = document.querySelector('.panier .total')

totalPanier.innerHTML = localStorage.length;
if (localStorage.length>0){
    totalPanier.classList.add('isFilled')
} else {
    totalPanier.classList.remove('isFilled')
}