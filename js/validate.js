if (localStorage.length != 0) {
    var productArray = JSON.parse(localStorage.getItem('orinoco'))
}

const orderValidate = async () => {
    var dataTeddies = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }


    var dataCameras = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }

    var dataFurniture = {
        "contact": {
            "firstName": document.querySelector('input#firstName').value,
            "lastName": document.querySelector('input#lastName').value,
            "address": document.querySelector('input#address').value,
            "postalCode": document.querySelector('input#postalCode').value,
            "city": document.querySelector('input#city').value,
            "email": document.querySelector('input#email').value
        },
        "products": []
    }

    if (productArray && productArray.length > 0) {
        for (let i = 0; i < productArray.length; i++) {
            if (productArray[i].url.includes('teddies')) {
                dataTeddies.products.push(productArray[i])

            } else if (productArray[i].url.includes('cameras')) {
                dataCameras.products.push(productArray[i])

            } else if (productArray[i].url.includes('furniture')) {
                dataFurniture.products.push(productArray[i])

            }
        }

    }

    if (dataTeddies.products.length) {
        fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTeddies)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderTeddies', JSON.stringify(json))
                document.location.href="/success"
                localStorage.removeItem('orinoco')
            })

    }
    if (dataCameras.products.length) {
        fetch('http://localhost:3000/api/cameras/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataCameras)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderCameras', JSON.stringify(json))
                document.location.href="/success"
                localStorage.removeItem('orinoco')
            })
    }
    if (dataFurniture.products.length) {
        fetch('http://localhost:3000/api/furniture/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataFurniture)
            }).then(function (response) {
                return response.json();
            })
            .then(function (json) {
                localStorage.setItem('orderFurniture', JSON.stringify(json))
                document.location.href="/success"
                localStorage.removeItem('orinoco')
            })
    }
}

const validate = async () => {
    await orderValidate()
}

document.querySelector('form').addEventListener("submit", function (e) {
    e.preventDefault()
    validate()
});