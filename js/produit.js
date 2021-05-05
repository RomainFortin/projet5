import {
    order
} from './service.js';



// URL LOCALHOST
const urlApi = new URL(window.location.href).searchParams.get('api')
const urlId = new URL(window.location.href).searchParams.get('id')

// URL API
const produitUrl = window.location.origin+"/api/" + urlApi+"/"+urlId;

console.log(produitUrl);

const section = document.querySelector('main');

let produit = ""

const fetchProduit = async () => {
    produit = await fetch(produitUrl).then(res => res.json());
}


const showProduit = async () => {
    await fetchProduit()

    if (window.location.href.includes('teddies')) {
        var choice = produit.colors
        var legende = "Couleurs:"
        var option = "Choisissez une couleur"
    } else if (window.location.href.includes('cameras')) {
        var choice = produit.lenses
        var legende = "Objectifs:"
        var option = "Choisissez un objectif"
    } else if (window.location.href.includes('furniture')) {
        var choice = produit.varnish
        var legende = "Vernis:"
        var option = "Choisissez un vernis"
    }

    function choices(choices) {
        return choices.map(choice => `<option value="${choice}">${choice}</option>`).join("");
    }

    section.innerHTML = (
        `
        <div class='container'>
            <div class='produit'>
                <picture>
                    <img src='${produit.imageUrl}' alt=''>
                </picture>
                <div class="side">
                    <div class="sideHeader">
                        <h2 class='name'>${produit.name}</h2>
                        <p class='price'>${produit.price/100} €</p>
                    </div>
                    <p class='description'>${produit.description}</p>
                    <div class="selection">
                        <label for="choiceValue">${legende}
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

    const totalPanier = document.querySelector('.panier .total')
    var buttonArray = document.querySelector('button.order')
    var select = document.querySelectorAll('select');

    buttonArray.addEventListener('click', function () {

        let choiceValue = select[0].value;
        let amountValue = parseInt(select[1].value);

        let currentOrder = JSON.parse(localStorage.getItem('orinoco'))

        if (currentOrder != null) {

            if(currentOrder.findIndex(e => e.choice === choiceValue) < 0 && currentOrder.findIndex(e => e.name === name)) {
                new order(choiceValue, amountValue,produit, produitUrl).addOrder()
            } else {
                new order(choiceValue, amountValue,produit, produitUrl).modifyOrder()
            }
                
        } else {
          new order(choiceValue, amountValue, produit, produitUrl).placeOrder()
        }

        select[0].selectedIndex = 0;
        select[1].selectedIndex = 0;
        buttonArray.setAttribute('disabled', "")

        totalPanier.innerHTML = JSON.parse(localStorage.getItem('orinoco')).length;

        if (localStorage.getItem('orinoco').length) {
            totalPanier.classList.add('isFilled')
        } else {
            totalPanier.classList.remove('isFilled')
        }

    })

    for (let i = 0; i <select.length; i++){
        select[i].addEventListener('change', function () {
            if ((select[0].selectedIndex > 0) && (select[1].selectedIndex > 0)) {
                buttonArray.removeAttribute('disabled')
            }
        })
    }
        

}

showProduit()