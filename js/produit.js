// URL LOCALHOST
const url = window.location.href.split('http://localhost:3000/', 2);

// URL API
const produitUrl = "http://localhost:3000/api/" + url[1] + "";

const section = document.querySelector('section');
const title = document.querySelector('h1');

const fetchProduit = async () => {
    produit = await fetch(produitUrl).then(res => res.json());
}

const showProduit = async () => {
    await fetchProduit()

    if (window.location.href.includes('teddies')) {
        var choice = produit.colors
    } else if (window.location.href.includes('cameras')) {
        var choice = produit.lenses
    } else {
        var choice = produit.varnish
    }
    section.innerHTML = (
        `
        <div class='article'>
            <h2 class='name'>${produit.name}</h2>
            <p class='choice'>${choice}</p>
            <p class='price'>${produit.price}</p>
            <img src='${produit.imageUrl}' alt=''>
            <p class='description'>${produit.description}</p>
        </div>
        `
    )
}

showProduit()