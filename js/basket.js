import {
    order
} from './service.js';


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
        <div class="product-order">
        <picture>
            <img src="${product.imageUrl}" alt="${product.name}" title="${product.name}">
        </picture>
        <div class="side">
            <div class="product-header">
                    <h3 class='name'>
                        <a href="/product?api=${api}&id=${product._id}">${product.name}</a>
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
                        <button class="modify" data-index="${orderIndex}">Modifier</button>
                        <div class="modifyChoice" data-hidden="true">
                            <i class="closeModify fas fa-times"></i>
                            <p>Quantité désirée:</p>
                            <select name="choice">
                                <option value="" disabled selected value>Choisissez une quantité</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button class="details">Valider</button>
                        </div>
                    </div>
                </div>
                <div class="total">
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
        price.push(orderProduct[i].price / 100*orderProduct[i].amount)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        document.querySelector('.totalPrice span').innerHTML = price.reduce(reducer) + ' €'
    }

    let modifyButton = document.querySelectorAll('button.modify')
    let modifyChoice = document.querySelectorAll('.modifyChoice')
    let closeModify = document.querySelectorAll('.closeModify');
    let validateChoiceValue = document.querySelectorAll('.modifyChoice select');
    let validateChoiceButton = document.querySelectorAll('.modifyChoice button');

    function isVisible(a, b) {
        if (b == "true") {
            a.classList.add('visible')
            a.setAttribute('data-hidden', "false")
        } else {
            a.classList.remove('visible')
            a.setAttribute('data-hidden', "true")
        }
    }

    for (let i = 0; i<modifyButton.length; i++){
        [modifyButton[i], closeModify[i], validateChoiceButton[i]].forEach(item => {
            item.addEventListener('click', event => {
                let a = modifyChoice[i]
                let b = a.getAttribute('data-hidden')
    
                isVisible(a, b)
              
            })
            validateChoiceButton[i].addEventListener('click', function(){
                new order(orderProduct[i].choice, parseInt(validateChoiceValue[i].value), orderProduct[i], orderProduct[i].url).modifyOrder()
                document.location.reload();
            })
            
        })
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        let deleteButton = document.querySelectorAll('p.delete');

        deleteButton.forEach(item => {
            item.addEventListener('click', event => {
                let itemIndex = item.getAttribute("data-index")
                orderArray.splice(itemIndex, 1);
                localStorage.setItem('orinoco', JSON.stringify(orderArray))

                document.location.reload();
            })
        })
    })

    document.querySelector('.clear.baksetButton').addEventListener('click', function () {
        localStorage.removeItem('orinoco')
        document.location.reload();
    })

} else {
    localStorage.removeItem('orinoco')
    document.querySelector('#basket').innerHTML = `<h1>Panier</h1><p>Votre panier est vide</p>`
    document.querySelector('.basket .total').classList.remove('isFilled')
}