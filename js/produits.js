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
    await fetchProduit()

    for (var i=0 ; i<produit.length; i++) {

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
        function choices(choices){
           return choices.map(choice => `<option value="">${choice}</option>`).join("");
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
                        <label for="choice">${legende}</label>
                        <select name="choice" class="choice">
                            <option value="">${option}</option>
                            ${choice ? choices(choice):""}
                        </select>
                        <p class='price'>${produit[i].price} €</p>
                        <button class="buttonLink">
                            <p>Commander</p>
                        </button>
                    </div>
                </div>
            </div>
            `
        )
    }
    
}

showProduit()