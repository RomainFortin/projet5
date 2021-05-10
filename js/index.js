const teddiesUrl = "http://localhost:3000/api/teddies";
const camerasUrl = "http://localhost:3000/api/cameras";
const furnituresUrl = "http://localhost:3000/api/furniture";

const fetchApi = async () => {
    teddies = await fetch(teddiesUrl).then(res => res.json()).catch(error => console.log(error))
    cameras = await fetch(camerasUrl).then(res => res.json()).catch(error => console.log(error))
    furnitures = await fetch(furnituresUrl).then(res => res.json()).catch(error => console.log(error))
}


function productTemplate(name, product) {

    function insertTemplate(i) {

        document.querySelector('.' + name + '').innerHTML += (
            `
                <div class='article'>
                <img src='${product[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${product[i].name}</h3>
                        <p class='price'>${product[i].price/100} €</p>
                    </div>
                    <button class="details">
                        <a class="idLink" href='/product?api=${name}&id=${product[i]._id}'>Détails</a>
                    </button>
                </div>
            `
        )
    }

    for (let i = 0; i < product.length; i++) {
        insertTemplate(i)
    }
}


const showProducts = async () => {
    await fetchApi()
    

    if (teddies.length){
        productTemplate("teddies", teddies)
    } else {
        document.querySelector('.teddies').innerHTML = "ERROR"
    }

    if (cameras.length){
        productTemplate("cameras", cameras)
    } else {
        document.querySelector('.cameras').innerHTML = "ERROR"
    }

    if (furnitures.length){
        productTemplate("furniture", furnitures)
    } else {
        document.querySelector('.furniture').innerHTML = "ERROR"
    }


}

showProducts()
