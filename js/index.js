const teddiesUrl = "http://localhost:3000/api/teddies/";
const camerasUrl = "http://localhost:3000/api/cameras";
const furnituresUrl = "http://localhost:3000/api/furniture";

const fetchApi = async () => {
    teddies = await fetch(teddiesUrl).then(res => res.json());
    cameras = await fetch(camerasUrl).then(res => res.json());
    furnitures = await fetch(furnituresUrl).then(res => res.json());
}

class produitTemplate {
    constructor(name, produit, legende ,choices) {
        this.name = name;
        this.produit = produit;
        this.legende = legende;
        this.choices = choices

        for (let i = 0; i < produit.length; i++) {
            var itemChoice = produit[i][choices];

            function choice(a) {
                return a.map(itemChoice => `<p>${itemChoice}</p>`).join("");
            }

            document.querySelector('.'+name+'').innerHTML += (
                `
                <div class='article'>
                    <img src='${produit[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${produit[i].name}</h3>
                        <p class='price'>${produit[i].price/100} €</p>
                    </div>
                    <div class='legende'>
                        <p>${legende}:</p>
                        ${itemChoice ? choice(itemChoice):""} 
                    </div>
                    <button>
                        <a class="idLink" href='/${name}/${produit[i]._id}'>Détails</a>
                    </button>
                </div>
            `
            )
        }
    }
}


const showProducts = async () => {
    await fetchApi()
    new produitTemplate("teddies", teddies, "Couleurs", "colors")
    new produitTemplate("cameras", cameras,"Objectifs", "lenses")
    new produitTemplate("furniture", furnitures,"Vernis", "varnish")
}

showProducts()