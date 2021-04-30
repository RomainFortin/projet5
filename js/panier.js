import {
    order
} from './service.js';

if(localStorage.length != 0){
    var orderArray = JSON.parse(localStorage.getItem('orinoco'))
}

let price = []

let orderProduct = []

let section = '';

function injectTemplate(a) {
    section.innerHTML += (
        `
        <div class="product-order">
        <picture>
            <img src="${a.imageUrl}" alt="">
        </picture>
        <div class="side">
            <div class="product-header">
                    <h3 class='name'>${a.name}</h3>
                <p class='delete'><i class="far fa-times-circle"></i>Supprimer</p>
            </div>
            <p class='description'>${a.description}</p>
            <div class="product-footer">
                <div class="choice">
                    <p class="choiceTitle">Couleurs:</p>
                    <p class="choice-value">${a.choice}</p>
                    <div class="modify">
                        <button class="modify">Modifier</button>
                    </div>
                </div>
                <div class="total">
                    <p class='totalValue'>${a.price/100} €</p>
                </div>
            </div>
        </div>
    </div>
     `
    )
}


for (let i = 0; i < orderArray.length; i++) {
    if (orderArray[i].url.includes('teddies')) {
        orderProduct.push(orderArray[i])
        section = document.querySelector('main .container' + '.oursons' + '');
        injectTemplate(orderProduct[i])
    } else if (orderArray[i].url.includes('cameras')) {
        orderProduct.push(orderArray[i])
        section = document.querySelector('main .container' + '.cameras' + '');
        injectTemplate(orderProduct[i])
    } else if (orderArray[i].url.includes('furniture')) {
        orderProduct.push(orderArray[i])
        section = document.querySelector('main .container' + '.furniture' + '');
        injectTemplate(orderProduct[i])
    } else {
        document.querySelector('main .container').remove()
    }
}


for (let i = 0; i < orderProduct.length; i++) {
    price.push(orderProduct[i].price / 100)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    document.querySelector('.totalPrice').innerHTML = price.reduce(reducer)
}