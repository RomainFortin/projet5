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
    teddiesDiv.innerHTML += (
        teddies.map(teddy => (
            `
                <div class='article'>
                    <img src='${teddy.imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${teddy.name}</h3>
                        <p class='price'>${teddy.price} €</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        <p>${teddy.colors}</p>   
                    </div>
                    <bouton>
                        <a class="idLink" href='/teddies/${teddy._id}' target='_blank'>Commander</a>
                    </bouton>
                </div>
            `
        )).join('')
    )
}
const showCameras = async () => {
    await fetchCameras()
    camerasDiv.innerHTML += (
        cameras.map(camera => (
            `
            <div class='article'>
                    <img src='${camera.imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${camera.name}</h3>
                        <p class='price'>${camera.price} €</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        <p>${camera.lenses}</p>   
                    </div>
                    <bouton>
                        <a class="idLink" href='/cameras/${camera._id}' target='_blank'>Commander</a>
                    </bouton>
                </div>
            `
        )).join('')
    )
}
const showFurnitures = async () => {
    await fetchFurnitures()
    furnituresDiv.innerHTML += (
        furnitures.map(furniture => (
            `
            <div class='article'>
                    <img src='${furniture.imageUrl}' alt=''>
                    <div class='title'>
                        <h3 class='name'>${furniture.name}</h3>
                        <p class='price'>${furniture.price}€</p>
                    </div>
                    <div class='legende'>
                        <p>Couleurs:</p>
                        <p>${furniture.varnish}</p>   
                    </div>
                    <bouton>
                        <a class="idLink" href='/furniture/${furniture._id}' target='_blank'>Commander</a>
                    </bouton>
                </div>
            `
        )).join('')
    )
}

showTeddies()
showCameras()
showFurnitures()