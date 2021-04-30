import {
    order
} from './service.js';

// URL LOCALHOST
const url = window.location.href.split('http://localhost:3000/', 2);

// URL API
const produitUrl = "http://localhost:3000/api/" + url[1] + "";

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
                        <label for="choice">${legende}
                            <select name="choice" class="choice" required>
                                <option value="" disabled selected value>${option}</option>
                                ${choice ? choices(choice):""}
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
    var select = document.querySelector('select');

    buttonArray.addEventListener('click', function () {

        let choiceValue = select.value;

        let currentOrder = JSON.parse(localStorage.getItem('orinoco'))

        


        if (currentOrder != null) {

            if(currentOrder.findIndex(e => e.choice === choiceValue) < 0) {
                new order(choiceValue, produit, produitUrl).addOrder()
            } else {
                localStorage.setItem('orinoco', JSON.stringify(currentOrder))
            }
                
        } else {
          new order(choiceValue, produit, produitUrl).placeOrder()
        }

        select.selectedIndex = 0;
        buttonArray.setAttribute('disabled', "")

        totalPanier.innerHTML = JSON.parse(localStorage.getItem('orinoco')).length;

        if (localStorage.length > 0) {
            totalPanier.classList.add('isFilled')
        } else {
            totalPanier.classList.remove('isFilled')
        }

    })

        select.addEventListener('change', function () {
            if ((select.selectedIndex > 0)) {
                buttonArray.removeAttribute('disabled')
            }
        })

}

showProduit()