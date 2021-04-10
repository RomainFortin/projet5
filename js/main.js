const teddiesUrl = "http://localhost:3000/api/teddies/";
const camerasUrl = "http://localhost:3000/api/cameras";
const furnituresUrl = "http://localhost:3000/api/furniture";

const teddiesDiv = document.querySelector('.teddies')
const camerasDiv = document.querySelector('.cameras')
const furnituresDiv = document.querySelector('.furnitures')

const fetchTeddies = async () => {
    teddies = await fetch(teddiesUrl).then(res => res.json());
}
const fetchCameras = async () => {
    cameras = await fetch(camerasUrl).then(res => res.json());
}
const fetchFurnitures = async () => {
    furnitures = await fetch(furnituresUrl).then(res => res.json());
}

const showTeddies = async () => {
    await fetchTeddies()

    for (var i = 0; i < teddies.length; i++) {
        var color = teddies[i].colors;

        function colors(colors) {
            return colors.map(color => `<p>${color}</p>`).join("");
        }

        teddiesDiv.innerHTML += (
            `
                <div class='article'>
                    <img src='${teddies[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${teddies[i].name}</h3>
                        <p class='price'>${teddies[i].price} €</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        ${color ? colors(color):""} 
                    </div>
                    <button class="buttonLink">
                        <a class="idLink" href='/teddies/${teddies[i]._id}' target='_blank'>Détails
                    </button>
                </div>
            `
        )
    }
}


const showCameras = async () => {
    await fetchCameras()

    for (var i = 0; i < cameras.length; i++) {
        var lens = cameras[i].lenses;

        function lenses(lenses) {
            return lenses.map(lens => `<p>${lens}</p>`).join("");
        }
        camerasDiv.innerHTML += (

            `
                <div class='article'>
                    <img src='${cameras[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${cameras[i].name}</h3>
                        <p class='price'>${cameras[i].price} €</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        ${lenses ? lenses(lens):""}   
                    </div>
                    <button class="buttonLink">
                        <a class="idLink" href='/cameras/${cameras[i]._id}' target='_blank'>Détails</a>
                    </button>
                </div>
            `
        )
    }
}
const showFurnitures = async () => {
    await fetchFurnitures()

    for (var i = 0; i < furnitures.length; i++) {
        var varnish = furnitures[i].varnish;

        function varnishes(varnishes) {
            return varnishes.map(varnish => `<p>${varnish}</p>`).join("");
        }
        furnituresDiv.innerHTML += (
            `
                <div class='article'>
                    <img src='${furnitures[i].imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${furnitures[i].name}</h3>
                        <p class='price'>${furnitures[i].price}€</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        ${varnishes ? varnishes(varnish):""}    
                    </div>
                    <button class="buttonLink">
                        <a class="idLink" href='/furniture/${furnitures[i]._id}' target='_blank'>Détails</a>
                    </button>
                </div>
            `
        )
    }
}

showTeddies()
showCameras()
showFurnitures()


