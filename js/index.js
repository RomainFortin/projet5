const teddiesUrl = "http://localhost:3000/api/teddies/";
const camerasUrl = "http://localhost:3000/api/cameras";
const furnituresUrl = "http://localhost:3000/api/furniture";

const fetchApi = async () => {
    teddies = await fetch(teddiesUrl).then(res => res.json());
    cameras = await fetch(camerasUrl).then(res => res.json());
    furnitures = await fetch(furnituresUrl).then(res => res.json());
}

function produitTemplate(name, produit) {

    function insertTemplate(i){

        document.querySelector('.' + name + '').innerHTML += (
            `
                <div class='article'>
                <img src='${produit[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${produit[i].name}</h3>
                        <p class='price'>${produit[i].price/100} €</p>
                    </div>
                    <button class="details">
                        <a class="idLink" href='/${name}/${produit[i]._id}'>Détails</a>
                    </button>
                </div>
            `
        )
    }

    for (let i = 0; i < produit.length; i++) {
        insertTemplate(i)
    }
}


const showProducts = async () => {
    await fetchApi()
    produitTemplate("teddies", teddies, "Couleurs", "colors")
    produitTemplate("cameras", cameras, "Objectifs", "lenses")
    produitTemplate("furniture", furnitures, "Vernis", "varnish")
}

showProducts()