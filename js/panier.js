const section = document.querySelector('main .container');

class panierTemplate{
    constructor(name, imageUrl, color, description, quantite, price){
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.quantite = quantite;
        this.price = price;

        section.innerHTML += (
            `
                <div class='container'>
                <div class="containerHeader">
                    <h2 class='name'>${name} </h2>
                </div>
                    <div class='produit'>
                    <picture>
                        <img src='${imageUrl}' alt=''>
                    </picture>
                    <div class="side">
                    <p class='description'>Couleur: ${color}</p>
                    <p><strong>Description:</strong></p>
                    <p class='description'>${description}</p>
                        <p>quantite: ${quantite}</p>
                        <p class='description'>Prix: ${price/100*quantite}</p>
                    </div>
                </div>
                
            `
        )
    }
}

for (var i = 0; i < localStorage.length; i++) {
    var machin = JSON.parse(localStorage.getItem(localStorage.key(i)))
    new panierTemplate(machin.name, machin.imageUrl, machin.color, machin.description, machin.quantite, machin.price*machin.quantite)
 }



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