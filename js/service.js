export class order {
    constructor(choiceValue, amountValue, produit, produitUrl) {
        this.choiceValue = choiceValue
        this.amountValue = amountValue
        this.produit = produit
        this.placeUrl = produitUrl
        this.order = [{
            name: produit.name,
            imageUrl: produit.imageUrl,
            description: produit.description,
            id: produit._id,
            price: produit.price,
            url: produitUrl,
            choice: this.choiceValue,
            amount: this.amountValue
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

    modifyOrder() {
        let currentOrder = JSON.parse(localStorage.getItem('orinoco'))
        let indexValue = currentOrder.findIndex(e => e.choice === this.choiceValue)

        currentOrder[indexValue].amount+=this.amountValue

        localStorage.setItem('orinoco', JSON.stringify(currentOrder))
    }
}