document.querySelector('button').addEventListener('click', function(){

    var userData = {
        contact: {
            firstName: 'string',
            lastName: 'string',
            address: 'string',
            city: 'string',
            email: 'string'
            },
            products: JSON.parse(localStorage.getItem('orinoco'))
    }


    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        body: userData
    }).then(window.location = "/order")
    .catch ((error) => {
        console.log(error);
    })
    
})


// function sendOrder(form) {




// }
