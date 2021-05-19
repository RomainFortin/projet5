const totalBasket = document.querySelector('.basket .total');

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

let section;

function injectTemplate(product, choice, api) {

    let orderIndex = orderArray.findIndex(e => e.choice === product.choice && e.name === product.name)

    section.innerHTML += (
        `
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
            section = document.querySelector('.basketModalInner' + '.oursons' + '');
            injectTemplate(orderProduct[i], "Couleurs", "teddies")
        } else if (orderArray[i].url.includes('cameras')) {
            orderProduct.push(orderArray[i])
            section = document.querySelector('.basketModalInner' + '.cameras' + '');
            injectTemplate(orderProduct[i], "Objectifs", "cameras")
        } else if (orderArray[i].url.includes('furniture')) {
            orderProduct.push(orderArray[i])
            section = document.querySelector('.basketModalInner' + '.furniture' + '');
            injectTemplate(orderProduct[i], "Vernis", "furniture")
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
}else {
    localStorage.removeItem('orinoco')
    document.querySelector('.basket .total').classList.remove('isFilled')
}


let basketButton = document.querySelector('.basket')
let basketModal = document.querySelector('.basketModal');

function isVisible(a, b) {
    if (b == "true") {
        a.classList.add('basketModalIsOpen')
        a.setAttribute('data-hidden', "false")
    } else {
        a.classList.remove('basketModalIsOpen')
        a.setAttribute('data-hidden', "true")
    }
}

basketButton.addEventListener('click', function () {
    basketModal.classList.add('basketModalIsOpen')

    let a = basketModal
    let b = a.getAttribute('data-hidden')

    isVisible(a, b)

})

basketModal.addEventListener('click', function(e){
    e.stopPropagation();
})