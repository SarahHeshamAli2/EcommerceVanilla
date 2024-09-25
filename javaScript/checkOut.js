let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
let rowItems = document.querySelector('.rowItems')
let cartItemss = document.querySelector('.cartItemss')
cartItemss.innerHTML = cartProducts.length + ` items`
let subTotal = document.querySelector('.subTotal')
let totalPayment =        localStorage.getItem('totalAmountToPay')
let placeOrderBtn = document.querySelector('.placeOrder')

function getCartProducts () {

    let cartItems = ''

    for(let i=0 ; i<cartProducts.length ; i++){

        cartItems += ` 
                   <div class="row item">
                                <div class="col-4 align-self-center"><img class="img-fluid" src="${cartProducts[i].productImage}"></div>
                                <div class="col-8">
                                    <div class="row"><b>$ ${cartProducts[i].newProductPrice > cartProducts[i].productPrice ?cartProducts[i].newProductPrice : cartProducts[i].productPrice }</b></div>
                                    <div class="row text-muted">${cartProducts[i].productDescription.slice(0,45)}</div>
                                    <div class="row">Qty:${cartProducts[i].quantity}</div>
                                </div>
                            </div>
        
        `
    }

    rowItems.innerHTML = cartItems
}
subTotal.innerHTML =  `                              
                                <div class="col text-right fw-light specialTxt">${totalPayment}</div>



`


getCartProducts()


function paymentSuccess() {
    let checkOut = document.querySelector('.checkOut')
    let paymentSucc = document.querySelector('.paymentSucc')

    setTimeout(() => {
        checkOut.classList.add('d-none')
        paymentSucc.classList.remove('d-none')
    }, 1500);

    let keysToRemove = ["cartProducts", "newTotalCartPrice","cartLength","totalAmountToPay"];

for (key of keysToRemove) {
    localStorage.removeItem(key);
}
    
    

}

placeOrderBtn.addEventListener('click',paymentSuccess)