export class order {
    constructor(choiceValue, amountValue, product, productUrl) {
        this.choiceValue = choiceValue
        this.amountValue = amountValue
        this.product = product
        this.placeUrl = productUrl
        this.order = [{
            name: product.name,
            imageUrl: product.imageUrl,
            description: product.description,
            _id: product._id,
            price: product.price,
            url: productUrl,
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