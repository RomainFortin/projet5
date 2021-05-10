import {
    order
} from './service.js';



// URL LOCALHOST
const urlApi = new URL(window.location.href).searchParams.get('api')
const urlId = new URL(window.location.href).searchParams.get('id')

// URL API
const productUrl = window.location.origin+"/api/" + urlApi+"/"+urlId;

const section = document.querySelector('main');

let product

const fetchProduct = async () => {
    product = await fetch(productUrl).then(res => res.json());
}


const showProduct = async () => {
    await fetchProduct()

    if (window.location.href.includes('teddies')) {
        var choice = product.colors
        var legend = "Couleurs:"
        var option = "Choisissez une couleur"
    } else if (window.location.href.includes('cameras')) {
        var choice = product.lenses
        var legend = "Objectifs:"
        var option = "Choisissez un objectif"
    } else if (window.location.href.includes('furniture')) {
        var choice = product.varnish
        var legend = "Vernis:"
        var option = "Choisissez un vernis"
    }

    function choices(choices) {
        return choices.map(choice => `<option value="${choice}">${choice}</option>`).join("");
    }

    section.innerHTML = (
        `
        <div class='container'>
            <div class='product'>
                <picture>
                    <img src='${product.imageUrl}' alt='${product.name}' title='${product.name}'>
                </picture>
                <div class="side">
                    <div class="sideHeader">
                        <h2 class='name'>${product.name}</h2>
                        <p class='price'>${product.price/100} €</p>
                    </div>
                    <p class='description'>${product.description}</p>
                    <div class="selection">
                        <label for="choiceValue">${legend}
                            <select name="choice" id="choiceValue" required>
                                <option value="" disabled selected value>${option}</option>
                                ${choice ? choices(choice):""}
                            </select>
                        </label for="amountValue">
                        <label>Quantité:
                            <select name="choice" id="amountValue" required>
                            <option value="" disabled selected value>Choisissez une quantité</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                        </label>
                    </div>
                    <button disabled class="order">
                        Commander
                    </button>
                </div>
            </div>
        </div>
        `
    )

    var buttonArray = document.querySelector('button.order')
    var select = document.querySelectorAll('select');

    buttonArray.addEventListener('click', function () {

        let choiceValue = select[0].value;
        let amountValue = parseInt(select[1].value);

        let currentOrder = JSON.parse(localStorage.getItem('orinoco'))

        if (currentOrder != null) {

            if(currentOrder.findIndex(e => e.choice === choiceValue) < 0 && currentOrder.findIndex(e => e.name === name)) {
                new order(choiceValue, amountValue, product, productUrl).addOrder()
            } else {
                new order(choiceValue, amountValue, product, productUrl).modifyOrder()
            }
                
        } else {
          new order(choiceValue, amountValue, product, productUrl).placeOrder()
        }

        document.location.reload();

    })

    for (let i = 0; i <select.length; i++){
        select[i].addEventListener('change', function () {
            if ((select[0].selectedIndex > 0) && (select[1].selectedIndex > 0)) {
                buttonArray.removeAttribute('disabled')
            }
        })
    }
        

}

showProduct()