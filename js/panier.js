const section = document.querySelector('main div');
var machin = JSON.parse(localStorage.getItem('commande'))

console.log(machin)

section.innerHTML += (
    `
        <div class='container'>
        <div class="containerHeader">
            <h2 class='name'>${machin[1].name} </h2>
        </div>
            <div class='produit'>
                <picture>
                    <img src='${machin[1].imageUrl}' alt=''>
                </picture>
                <div class="side">
                    <p>quantite: ${machin[0]}</p>
                    <p><strong>Description:</strong></p>
                    <p class='description'>${machin[1].description}</p>
                    <p class='description'>Couleur: ${machin[1].colors}</p>
                    <p class='description'>Prix: ${machin[1].price/100}</p>
                </div>
            </div>
        </div>
    `
)

const clear = document.querySelector('button.clear')

clear.addEventListener('click', function(){
    localStorage.clear()
    totalPanier.innerHTML = localStorage.length;
        if (localStorage.length>0){
            totalPanier.classList.add('isFilled')
        } else {
            totalPanier.classList.remove('isFilled')
            section.innerHTML = ""
        }
})