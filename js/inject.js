const header = document.querySelector('header');

const headerTemplate =
    `
        <a id="logo" href="/">
            <img src="/assets/15675819263013_image1.png" alt="">
        </a>
        <nav>
            <button class="menu" aria-label="navigation">
                <i class="fas fa-bars"></i>
                Menu
                <ul>
                    <li><a href="/teddies">Oursons en peluches</a></li>
                    <li><a href="/cameras">Cameras</a></li>
                    <li><a href="/furniture">Meubles</a></li>
                </ul>
            </button>
            
            <a href="" class="compte">
                <i class="fas fa-user-circle"></i>
                Compte
            </a>
            <a href="" class="panier">
                <i class="fas fa-shopping-basket"></i>
                Compte
            </a>
        </nav>
`;

header.innerHTML = headerTemplate;

const footer = document.querySelector('footer');

const footerTemplate =
    `
        <div class="wrapper">
        <div>
            <h3>Mieux nous connaître</h3>
            <a href="/">A propos d'Orinoco</a>
            <a href="/">Notre objectif</a>
        </div>
        <div>
            <h3>Moyens de paiement</h3>
            <a href="/">Cartes de paiement</a>
            <a href="/">Paiement en plusieurs fois</a>
            <a href="/">Paypal</a>
        </div>
        <div>
            <h3>Besoin d'aide ?</h3>
            <a href="/">Suivre vos commande</a>
            <a href="/">Retours</a>
            <a href="/">Livraison</a>
            <a href="/">Service client</a>
            <a href="/">Accessibilité</a>
        </div>
        <div>
            <h3>Notre groupe</h3>
            <a href="/">Oribook</a>
            <a href="/">Oritextil</a>
        </div>
        </div>
        <div class="social">
        <a href="/">
            <i class="fab fa-facebook-square"></i>
        </a>
        <a href="/">
            <i class="fab fa-twitter-square"></i>
        </a>
        <a href="/">
            <i class="fab fa-instagram-square"></i>
        </a>
        </div>
        <img src="/assets/15675819263013_image1.png" alt="">
`;

footer.innerHTML = footerTemplate;