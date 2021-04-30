export class order {
    constructor(choiceValue, produit, produitUrl) {
        this.choiceValue = choiceValue
        this.produit = produit
        this.placeUrl = produitUrl
        this.order = [{
            name: produit.name,
            imageUrl: produit.imageUrl,
            description: produit.description,
            id: produit._id,
            price: produit.price,
            url: produitUrl,
            choice: this.choiceValue
        }]
    }

    placeOrder() {
        localStorage.setItem('orinoco', JSON.stringify(this.order))
    }

    addOrder() {
        let currentOrder = JSON.parse(localStorage.getItem('orinoco'))

       currentOrder.push(this.order[0])

        localStorage.setItem('orinoco', JSON.stringify(currentOrder))
    }
}