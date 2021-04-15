// URL LOCALHOST
const url = window.location.href.split('http://localhost:3000/', 2);

// URL API
const produitUrl = "http://localhost:3000/api/" + url[1] + "";

const section = document.querySelector('main');
const title = document.querySelector('h1');

const fetchProduit = async () => {
    produit = await fetch(produitUrl).then(res => res.json());
}


const showProduit = async () => {
    await fetchProduit().then(function(){
        
        for (var i = 0; i < produit.length; i++) {

            if (window.location.href.includes('teddies')) {
                var choice = produit[i].colors
                var legende = "Couleurs:"
                var option = "Choisissez une couleur"
            } else if (window.location.href.includes('cameras')) {
                var choice = produit[i].lenses
                var legende = "Objectifs:"
                var option = "Choisissez un objectif"
            } else if (window.location.href.includes('furniture')) {
                var choice = produit[i].varnish
                var legende = "Vernis:"
                var option = "Choisissez un vernis"
            }
    
            function choices(choices) {
                return choices.map(choice => `<option value="${choice}">${choice}</option>`).join("");
            }
    
            section.innerHTML += (
                `
                <div class='container'>
                <div class="containerHeader">
                    <h2 class='name'>${produit[i].name}</h2>
                </div>
                    <div class='produit'>
                        <picture>
                            <img src='${produit[i].imageUrl}' alt=''>
                        </picture>
                        <div class="side">
                            <p><strong>Description:</strong></p>
                            <p class='description'>${produit[i].description}</p>
                                <label for="choice">${legende}
                                    <select name="choice" class="choice" required>
                                        <option value="" disabled selected value>${option}</option>
                                        ${choice ? choices(choice):""}
                                    </select>
                                </label>
                                <label for="choice">Quantité:
                                    <select name="choice" class="choice" required> 
                                        <option value="" disabled selected value>Choississez une quantité</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                                <p class='price'>${produit[i].price/100} €</p>
                                <button class="buttonLink">
                                    Commander
                                </button>
                        </div>
                    </div>
                </div>
                `
            )
        }
    })


    const totalPanier = document.querySelector('.panier .total')
    var buttonArray = Array.from(document.querySelectorAll('button.buttonLink'))

    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].addEventListener('click', function () {
           
            var produitIndex = buttonArray.indexOf(this)
            localStorage.setItem('commande' + produitIndex, JSON.stringify(produit[produitIndex]))

            totalPanier.innerHTML = localStorage.length;

        })
    }
    
}

showProduit()
