document.querySelector('button').addEventListener('click', function () {

    var userData = {
        contact: {
            firstName: 'string',
            lastName: 'string',
            address: 'string',
            city: 'string',
            email: 'string'
        },
        products: JSON.parse(localStorage.getItem('orinoco'))
    }


    fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: userData
        }).then(window.location = "/order")
        .catch((error) => {
            console.log(error);
        })
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