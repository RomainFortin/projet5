if (localStorage.length != 0) {
    var orderTeddies = JSON.parse(localStorage.getItem('orderTeddies'))
    var orderCameras = JSON.parse(localStorage.getItem('orderCameras'))
    var orderFurniture = JSON.parse(localStorage.getItem('orderFurniture'))
}


let validated = document.querySelector('.container.validated')


if (orderTeddies != null) {
    validated.innerHTML += `
        <p>Votre commande d'oursons<span>${orderTeddies.orderId}</span>est validée!</p>
    `
} 
if (orderCameras != null) {
    validated.innerHTML += `
    <p>Votre commande de caméras<span>${orderCameras.orderId}</span>est validée!</p>
    `
}
if (orderFurniture != null) {
    validated.innerHTML += `
    <p>Votre commande de meubles<span>${orderFurniture.orderId}</span>est validée!</p>
    `
}



