import {
    order
} from './service.js';


if (localStorage.length != 0) {
    var orderArray = JSON.parse(localStorage.getItem('orinoco'))
}

let price = []

let orderProduct = []

function injectTemplate(product, choice, api, title) {

    let orderIndex = orderArray.findIndex(e => e.choice === product.choice && e.name === product.name)

    document.querySelector('.basketWrapper').innerHTML += (
        `
        <div class="container">
            <h2>${title}</h2>
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
        </div>
     `
    )

}


if (orderArray && orderArray.length > 0) {
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].url.includes('teddies')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Couleurs", "teddies", "Oursons")
        } 
         if (orderArray[i].url.includes('cameras')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Objectifs", "cameras", "Cameras")
        } 
         if (orderArray[i].url.includes('furniture')) {
            orderProduct.push(orderArray[i])
            injectTemplate(orderProduct[i], "Vernis", "furniture", "Meubles")
        } 
        price.push(orderProduct[i].price / 100 * orderProduct[i].amount)
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
            validateChoiceValue[i].selectedIndex = 0
        }
    }

    for (let i = 0; i < modifyButton.length; i++) {
        [modifyButton[i], closeModify[i], validateChoiceButton[i]].forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                let a = modifyChoice[i]
                let b = a.getAttribute('data-hidden')

                isVisible(a, b)

            })

            modifyChoice[i].addEventListener('click', function(e){
                e.stopPropagation();
            })


            validateChoiceButton[i].addEventListener('click', function () {
                new order(orderProduct[i].choice, parseInt(validateChoiceValue[i].value), orderProduct[i], orderProduct[i].url).modifyOrder()
                document.location.reload();
            })

            document.addEventListener('click', function (e) {
                modifyChoice[i].classList.remove('visible')
                modifyChoice[i].setAttribute('data-hidden', "true")
                validateChoiceValue[i].selectedIndex = 0
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
    document.querySelector('#basket').innerHTML = `<h1>Votre panier est vide</h1>`
    document.querySelector('.basket .total').classList.remove('isFilled')
}

const orderValidate = async () => {
    var dataTeddies = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }


    var dataCameras = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }

    var dataFurniture = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }

    if (orderArray && orderArray.length > 0) {
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i].url.includes('teddies')) {
                dataTeddies.products.push(orderArray[i])

            } else if (orderArray[i].url.includes('cameras')) {
                dataCameras.products.push(orderArray[i])

            } else if (orderArray[i].url.includes('furniture')) {
                dataFurniture.products.push(orderArray[i])

            }
        }

    }

    if (dataTeddies.products.length) {
        fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTeddies)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderTeddies', JSON.stringify(json))
                document.location.href = "/success"
                localStorage.removeItem('orinoco')
            })

    }
    if (dataCameras.products.length) {
        fetch('http://localhost:3000/api/cameras/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCameras)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderCameras', JSON.stringify(json))
                document.location.href = "/success"
                localStorage.removeItem('orinoco')
            })
    }
    if (dataFurniture.products.length) {
        fetch('http://localhost:3000/api/furniture/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFurniture)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderFurniture', JSON.stringify(json))
                document.location.href = "/success"
                localStorage.removeItem('orinoco')
            })
    }
}

const validate = async () => {
    await orderValidate()
}

document.querySelector('form').addEventListener("submit", function (e) {
    e.preventDefault()
    validate()
});