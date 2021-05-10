const totalBasket = document.querySelector('.basket .total')

if(localStorage.getItem('orinoco') != null){
    totalBasket.innerHTML = JSON.parse(localStorage.getItem('orinoco')).length;
    totalBasket.classList.add('isFilled')
} else {
    totalBasket.classList.remove('isFilled')
}