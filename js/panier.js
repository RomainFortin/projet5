if (localStorage.length != 0) {
    var orderArray = JSON.parse(localStorage.getItem('orinoco'))
}

let price = []

let orderProduct = []

let section = '';

function injectTemplate(product, choice, api) {

    let orderIndex = orderArray.findIndex(e => e.choice === product.choice && e.name === product.name)
    section.innerHTML += (
        `
        <div class="product-order">
        <picture>
            <img src="${product.imageUrl}" alt="">
        </picture>
        <div class="side">
            <div class="product-header">
                    <h3 class='name'>
                        <a href="/product?api=${api}&id=${product.id}">${product.name}</a>
                    </h3>
                <p class='delete' data-index="${orderIndex}"><i class="far fa-times-circle"></i>Supprimer</p>
            </div>
            <p class='description'>${product.description}</p>
            <div class="product-footer">
                <div class="choice">
                    <p class="choiceTitle">${choice}:</p>
                    <p class="choice-value">${product.choice}</p>
                </div>
                <div class="choice">
                    <p class="choiceTitle">Quantité:</p>
                    <p class="choice-value">${product.amount}</p>
                    <div class="modify">
                        <button class="modify">Modifier</button>
                        <div class="modifyChoice" hidden="true">
                            <i class="closeModify fas fa-times"></i>
                            <p>Modifier quantité:</p>
                            <input type="text">
                        </div>
                    </div>
                </div>
                <div class="total">
                    <p class='totalValue'>${product.price/100} €</p>
                </div>
            </div>
        </div>
    </div>
     `
    )
    
}

document.addEventListener('DOMContentLoaded', (event) => {
    let deleteButton = document.querySelectorAll('p.delete');

    for (let i = 0; i<deleteButton.length; i++) {
        
    }

    deleteButton.forEach(item => {
        item.addEventListener('click', event => {
            let itemIndex = item.getAttribute("data-index")
            orderArray.splice(itemIndex, 1);
            localStorage.setItem('orinoco', JSON.stringify(orderArray))
            document.location.reload();
        })
        
    })

  })




if (orderArray) {
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].url.includes('teddies')) {
            orderProduct.push(orderArray[i])
            section = document.querySelector('main .container' + '.oursons' + '');
            injectTemplate(orderProduct[i], "Couleurs", "teddies")
        } else if (orderArray[i].url.includes('cameras')) {
            orderProduct.push(orderArray[i])
            section = document.querySelector('main .container' + '.cameras' + '');
            injectTemplate(orderProduct[i], "Objectifs", "cameras")
        } else if (orderArray[i].url.includes('furniture')) {
            orderProduct.push(orderArray[i])
            section = document.querySelector('main .container' + '.furniture' + '');
            injectTemplate(orderProduct[i], "Vernis", "furniture")
        }
    }
} else {
    document.querySelector('#basket').innerHTML = `<h1>Panier</h1>`
}


for (let i = 0; i < orderProduct.length; i++) {
    price.push(orderProduct[i].price / 100)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    document.querySelector('.totalPrice span').innerHTML = price.reduce(reducer) + ' €'
}


var modifyButton = document.querySelector('button.modify')
var modifyChoice = document.querySelector('.modifyChoice')
var closeModify = document.querySelector('.closeModify');

function isVisible(a, b) {
    if (b == "true") {
        a.classList.add('visible')
        a.setAttribute('hidden', "false")
    } else {
        a.classList.remove('visible')
        a.setAttribute('hidden', "true")
    }
}

[modifyButton, closeModify].forEach(item => {
    item.addEventListener('click', event => {
        let a = modifyChoice
        let b = a.getAttribute('hidden')

        isVisible(a, b)
    })
})



document.querySelector('.clear.baksetButton').addEventListener('click', function () {
    localStorage.removeItem('orinoco')

    document.location.reload();
})