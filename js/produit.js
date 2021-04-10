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

    if (window.location.href.includes('teddies')) {
        var choice = produit.colors
        var legende = "Couleurs:"
        var option = "Choisissez une couleur"
    } else if (window.location.href.includes('cameras')) {
        var choice = produit.lenses
        var legende = "Objectifs:"
        var option = "Choisissez un objectif"
    } else {
        var choice = produit.varnish
        var legende = "Vernis:"
        var option = "Choisissez un vernis"
    }
    function choices(choices){
       return choices.map(choice => `<option value="">${choice}</option>`).join("");
    }
    
    section.innerHTML = (
        `
        <div class='container'>
        <h2 class='name'>${produit.name}</h2>
            <div class='produit'>
                <picture>
                    <img src='${produit.imageUrl}' alt=''>
                </picture>
                <div class="side">
                    <p><strong>Description:</strong></p>
                    <p class='description'>${produit.description}</p>
                    <label for="choice">${legende}</label>
                    <select name="choice" class="choice">
                        <option value="">${option}</option>
                        ${choice ? choices(choice):""}
                    </select>
                    <p class='price'>${produit.price} €</p>
                    <button class="buttonLink">
                        <p>Commander</p>
                    </button>
                </div>
            </div>
        </div>
        `
    )
}

showProduit()