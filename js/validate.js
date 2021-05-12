if (localStorage.length != 0) {
    var productArray = JSON.parse(localStorage.getItem('orinoco'))
}


var dataTeddies = {
    "contact": {
        "firstName": "string",
        "lastName": "string",
        "address": "string",
        "city": "string",
        "email": "string"
    },
    "products": []
}

var dataCameras = {
    "contact": {
        "firstName": "string",
        "lastName": "string",
        "address": "string",
        "city": "string",
        "email": "string"
    },
    "products": []
}

var dataFurniture = {
    "contact": {
        "firstName": "string",
        "lastName": "string",
        "address": "string",
        "city": "string",
        "email": "string"
    },
    "products": []
}

if (productArray && productArray.length > 0) {
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].url.includes('teddies')) {
            dataTeddies.products.push(productArray[i])
            
        } else if (productArray[i].url.includes('cameras')) {
            dataCameras.products.push(productArray[i])
            
        } else if (productArray[i].url.includes('furniture')) {
            dataFurniture.products.push(productArray[i])
            
        }
    }
    
}


document.querySelector('button').addEventListener('click', function () {

    document.querySelector('form').addEventListener("submit", function(e){
        e.preventDefault()
        document.querySelector('.modal').classList.add('isValid')
    });

    if (dataTeddies.products.length) {
        console.log(dataTeddies.products);
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(dataTeddies)
        }).then(response => response.json()) 
        .then(json => document.querySelector('.modal_inner .teddies').innerHTML += `<p>${json.orderId}</p>` );
    } 
    if (dataCameras.products.length) {
        console.log(dataCameras.products);
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(dataCameras)
        }).then(response => response.json()) 
        .then(json => document.querySelector('.modal_inner .cameras').innerHTML += `<p>${json.orderId}</p>` );
    } 
     if (dataFurniture.products.length) {
        console.log(dataFurniture.products);
        fetch('http://localhost:3000/api/furniture/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(dataFurniture)
        }).then(response => response.json()) 
        .then(json => document.querySelector('.modal_inner .furniture').innerHTML += `<p>${json.orderId}</p>` );
    }

})

document.querySelector('.closeModal').addEventListener('click', function(){
    localStorage.removeItem('orinoco')
})

let section = document.querySelector('main .container .orderSummary');

let price = []

validateOrder = JSON.parse(localStorage.getItem('orinoco'))



function injectSummaryTemplate(i, choice, type) {

    section.innerHTML += (
        `
            <div class="validate-order">
            <div class="side">
                <div class="product-header">
                    <h3 class='name'>${validateOrder[i].name}</h3>
                </div>
                <div class="product-footer">
                    <p>${type}</p>
                    <div class="choice">
                        <p class="choiceTitle">${choice}:</p>
                        <p class="choice-value">${validateOrder[i].choice}</p>
                    </div>
                    <div class="choice">
                        <p class="choiceTitle">Quantité:</p>
                        <p class="choice-value">${validateOrder[i].amount}</p>
                    </div>
                    <div class="total">
                        <p class='totalValue'>${validateOrder[i].price/100} €</p>
                    </div>
                </div>
            </div>
        </div>
         `
    )
}


for (let i = 0; i < validateOrder.length; i++) {
    if (validateOrder[i].url.includes('teddies')) {
        injectSummaryTemplate(i, "Couleurs", "Oursons")
    } else if (validateOrder[i].url.includes('cameras')) {
        injectSummaryTemplate(i, "Couleurs", "Cameras")
    } else if (validateOrder[i].url.includes('furniture')) {
        injectSummaryTemplate(i, "Couleurs", "Meubles")
    }

    price.push(validateOrder[i].price / 100)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    document.querySelector('.totalPrice span').innerHTML = price.reduce(reducer) + ' €'
}