// vérifie le localStorage et stocke les commandes
if (localStorage.length != 0) {
    var orderTeddies = JSON.parse(localStorage.getItem('orderTeddies'))
    var orderCameras = JSON.parse(localStorage.getItem('orderCameras'))
    var orderFurniture = JSON.parse(localStorage.getItem('orderFurniture'))
    var storeTotalPrice = JSON.parse(localStorage.getItem('storeTotalPrice'))
}

let validated = document.querySelector('.container.validated')


// vérification de l'existence des commandes et affichage d'une réponse en fonction de l'API
if (orderTeddies != null) {
    validated.innerHTML += `
        <p>Votre commande d'oursons<span>${orderTeddies.orderId}</span> est validée !</p>
    `
} 
if (orderCameras != null) {
    validated.innerHTML += `
    <p>Votre commande de caméras<span>${orderCameras.orderId}</span> est validée !</p>
    `
}
if (orderFurniture != null) {
    validated.innerHTML += `
    <p>Votre commande de meubles<span>${orderFurniture.orderId}</span> est validée !</p>
    `
}

// affiche le prix total des commandes 
validated.innerHTML += `
    <p>Montant total: <span>${storeTotalPrice.price}</span></p>
    `

// vide les résultats de commande
document.querySelector('button').addEventListener('click', function(){
    localStorage.removeItem('orderTeddies')
    localStorage.removeItem('orderCameras')
    localStorage.removeItem('orderFurniture')
    localStorage.removeItem('storeTotalPrice')
})


