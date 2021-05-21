const totalBasket = document.querySelector('.basket .total');
const toggleBasket = document.querySelector('.basket .toggleBasket');

if (localStorage.getItem('orinoco') != null) {
    totalBasket.innerHTML = JSON.parse(localStorage.getItem('orinoco')).length;
    totalBasket.classList.add('isFilled')

} else {
    totalBasket.classList.remove('isFilled')

}

if (localStorage.length != 0) {
    var orderArray = JSON.parse(localStorage.getItem('orinoco'))
}

let price = []

let orderProduct = []

function injectTemplate(product, choice, api, title) {

    let orderIndex = orderArray.findIndex(e => e.choice === product.choice && e.name === product.name)

    document.querySelector('.basketModalWrapper').innerHTML += (
        `
        <h3>${title}</h3>
        <div class="basketModalOrder">
            <picture>
                <img src="${product.imageUrl}" alt="${product.name}" title="${product.name}">
            </picture>
            <div class="side">
                <div class="basketModalHeader">
                        <h4 class='name'>
                            <a href="/product?api=${api}&id=${product._id}">${product.name}</a>
                        </h4>
                    <p class='deleteBasketModal' data-index="${orderIndex}"><i class="far fa-times-circle"></i></p>
                </div>
                <div class="basketModalFooter">
                    <div class="choice">
                        <p class="choiceTitle">${choice}: </p>
                        <p class="choice-value"> ${product.choice}</p>
                    </div>
                    <div class="choice">
                        <p class="choiceTitle">Quantité: </p>
                        <p class="choice-value"> ${product.amount}</p>
                    </div>
                    <div class="basketModalTotal">
                        <p class='totalValue'>${product.price/100*product.amount} €</p>
                    </div>
                </div>
            </div>
        </div>
     `
    )

}


if (orderArray && orderArray.length > 0) {
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].url.includes('teddies')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Couleurs", "teddies", "Oursons")
        } else if (orderArray[i].url.includes('cameras')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Objectifs", "cameras", "Cameras")
        } else if (orderArray[i].url.includes('furniture')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Vernis", "furniture", "Meubles")
        }
        price.push(orderProduct[i].price / 100 * orderProduct[i].amount)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        document.querySelector('.basketModalSum p.priceModal').innerHTML = price.reduce(reducer) + ' €'
    }

    let deleteBasketModal = document.querySelectorAll('p.deleteBasketModal');

    deleteBasketModal.forEach(item => {
        item.addEventListener('click', event => {
            let itemIndex = item.getAttribute("data-index")
            orderArray.splice(itemIndex, 1);
            localStorage.setItem('orinoco', JSON.stringify(orderArray))

            document.location.reload();
        })
    })
} else {
    localStorage.removeItem('orinoco')
    document.querySelector('.basketModal').innerHTML = `<h3>Votre panier est vide</h3>`
    document.querySelector('.basket .total').classList.remove('isFilled')
}


let basketButton = document.querySelector('.basket')
let basketModal = document.querySelector('.basketModal');

function isVisible() {
    let a = basketModal
    let b = basketModal.getAttribute('data-hidden')

    if (b == "true") {
        a.classList.add('basketModalIsOpen')
        toggleBasket.classList.add('isOpen')
        a.setAttribute('data-hidden', "false")
    } else {
        a.classList.remove('basketModalIsOpen')
        toggleBasket.classList.remove('isOpen')
        a.setAttribute('data-hidden', "true")
    }
}

basketButton.addEventListener('click', function (e) {
    e.stopPropagation();
    isVisible()

})

basketModal.addEventListener('click', function (e) {
    e.stopPropagation();
})

document.addEventListener('click', function (e) {
    basketModal.classList.remove('basketModalIsOpen')
    toggleBasket.classList.remove('isOpen')
    basketModal.setAttribute('data-hidden', "true")
})