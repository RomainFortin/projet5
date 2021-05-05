const teddiesUrl = "http://localhost:3000/api/teddies";
const camerasUrl = "http://localhost:3000/api/cameras";
const furnituresUrl = "http://localhost:3000/api/furniture";

const fetchApi = async () => {
    teddies = await fetch(teddiesUrl).then(res => res.json()).catch(error => console.log(error))
    cameras = await fetch(camerasUrl).then(res => res.json()).catch(error => console.log(error))
    furnitures = await fetch(furnituresUrl).then(res => res.json()).catch(error => console.log(error))
}


function produitTemplate(name, produit) {

    function insertTemplate(i) {

        document.querySelector('.' + name + '').innerHTML += (
            `
                <div class='article'>
                <img src='${produit[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${produit[i].name}</h3>
                        <p class='price'>${produit[i].price/100} €</p>
                    </div>
                    <button class="details">
                        <a class="idLink" href='/product?api=${name}&id=${produit[i]._id}'>Détails</a>
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
    

    if (teddies.length){
        produitTemplate("teddies", teddies)
    } else {
        document.querySelector('.teddies').innerHTML = "ERROR"
    }

    if (cameras.length){
        produitTemplate("cameras", cameras)
    } else {
        document.querySelector('.cameras').innerHTML = "ERROR"
    }

    if (furnitures.length){
        produitTemplate("furniture", furnitures)
    } else {
        document.querySelector('.furniture').innerHTML = "ERROR"
    }

    if (!teddies.length && !cameras.length && !furnitures.length){
        window.location = '/404'
    }

}

showProducts()
