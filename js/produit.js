// URL LOCALHOST
const url = window.location.href.split('http://localhost:3000/', 2);

// URL API
const produitUrl = "http://localhost:3000/api/" + url[1] + "";

const section = document.querySelector('main');

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
        <div class="containerHeader">
            <h2 class='name'>${produit.name}</h2>
        </div>
            <div class='produit'>
                <picture>
                    <img src='${produit.imageUrl}' alt=''>
                </picture>
                <div class="side">
                    <p><strong>Description:</strong></p>
                    <p class='description'>${produit.description}</p>
                    <label for="choice">${legende}
                        <select name="choice" class="choice" required>
                            <option value="" disabled selected value>${option}</option>
                            ${choice ? choices(choice):""}
                        </select>
                    </label>
                    <label for="choice">Quantité:
                        <select name="choice" class="choice" required> 
                            <option value="" disabled selected value>Choississez une quantité</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <p class='price'>${produit.price/100} €</p>
                    <button disabled class="buttonLink">
                        Commander
                    </button>
                </div>
            </div>
        </div>
        `
    )

    const totalPanier = document.querySelector('.panier .total')
    var buttonArray = document.querySelector('button.buttonLink')
    var select = document.querySelectorAll('select');

    class commandeArray {
        constructor(name, imageUrl, description, id, color, quantite, price) {
            this.name = name;
            this.imageUrl = imageUrl;
            this.description = description;
            this.id = id;
            this.color = color;
            this.quantite = parseInt(quantite);
            this.price = price;
        }
    }

    buttonArray.addEventListener('click', function () {
        
        let colorValue = select[0].value;
        let quantiteValue = select[1].value
        let commandeTitle = produit.name + colorValue;

        if (localStorage.length > 0) {
            if (localStorage.getItem(commandeTitle)!=null){
                let currentQuantite = JSON.parse(localStorage.getItem(commandeTitle)).quantite + parseInt(quantiteValue);
                let commande = new commandeArray(produit.name,produit.imageUrl,produit.description,produit._id,colorValue,currentQuantite,produit.price)
                localStorage.setItem(commandeTitle, JSON.stringify(commande))
            } else {
                let commande = new commandeArray(produit.name,produit.imageUrl,produit.description,produit._id,colorValue,quantiteValue,produit.price)
                localStorage.setItem(commandeTitle, JSON.stringify(commande))
            }
        } else {
            let commande = new commandeArray(produit.name,produit.imageUrl,produit.description,produit._id,colorValue,quantiteValue,produit.price)
            localStorage.setItem(commandeTitle, JSON.stringify(commande))
        }

        select[0].selectedIndex = 0;
        select[1].selectedIndex = 0;
        buttonArray.setAttribute('disabled', "")

        totalPanier.innerHTML = localStorage.length;

        if (localStorage.length > 0) {
            totalPanier.classList.add('isFilled')
        } else {
            totalPanier.classList.remove('isFilled')
        }

    })

    for (let i = 0; i < select.length; i++) {
        select[i].addEventListener('change', function () {
            if ((select[0].selectedIndex > 0) && (select[1].selectedIndex > 0)) {
                buttonArray.removeAttribute('disabled')
            }
        })
    }

}

showProduit()