
let res = []
let totalPrice = document.querySelector('.totalPrice')
let myCartProds = JSON.parse(localStorage.getItem('cartProducts'))
let cartRow = document.getElementById('cartRow')
let emptyCart = document.querySelector('.emptyCart')
let loadScreen = document.querySelector('.loadingScreen')
let signIn = document.querySelector('.signIn')
let mainCont = document.querySelector('.mainCont')
let notfBtn = document.querySelector('.notfBtn')
let logOutBtn = document.querySelector('.logOutBtn')

let user = JSON.parse(localStorage.getItem('user'))

let cartItemsCount = document.querySelector('.cartItemsCount')


        function displayCartProducts () {

        
        let displayedProducts = ''
        let cartInLocalStorage = JSON.parse(localStorage.getItem('cartProducts'))
         res = Array.from(new Set(cartInLocalStorage.map(JSON.stringify)))
        .map(JSON.parse);
         
        
        cartItemsCount.innerHTML = `<h2 class = 'my-3'> Cart (${res.length} items) </h2>`
        
        for(let i=0 ;i < res.length ;i++) {
        displayedProducts += `          <div class="d-flex align-items-center justify-content-between boxShadow p-3 my-2">
                        <div class="cartImg w-25 ">
                            <img src="${res[i].productImage}" alt="cart product" class="w-100 cartImg">
                        </div>
                        <div class="productDescr">
                            <h3>${res[i].productTit}</h3>
                            <h6>sold by <span class = 'fw-bold'>shoppy </span></h6>
                            <div class="return my-2">
                                <i class="fa-solid fa-circle-xmark"></i>
                                <span>This item cannot be exchanged or returned.</span>
        
                            </div>
                            <button class="btn btn-outline-danger my-2" onclick = 'removeItem(${i})'> <i class="fa-regular fa-trash-can"></i>Remove</button>
                        </div>
                        <div class="prodPrice">
                          <div class = 'd-flex align-items-center'>
                         ${res[i].newProductPrice == 0 ? `   <h4 class = 'productPrice'> ${res[i].productPrice} </h4>` : `   <h4 class = 'productPrice'> ${res[i].newProductPrice} </h4>`}
                         ${res[i].prodDiscount ? `<span class ='discount text-danger disCount mx-2'> ${res[i].prodDiscount} </span> `: ''}
                            </div>
                            <button class="btn btn-outline-primary increaseBtn" onclick = 'incrementItem(${i})'>+</button>                    <span class='productC'>${res[i].quantity}</span>
                            <button class="btn btn-outline-primary decreaseBtn" onclick = 'decrementItem(${i})'>-</button>    
                        </div>
                    </div>`
        }
        
        
        let shownTotalPrice = 0
        for(let i =0 ; i < res.length ; i ++) {
            shownTotalPrice += Number( res[i].productPrice)
            
            
        }
        
        
        
        totalPrice.innerHTML =  `<h2 class = 'fw-bold' > Total price : ${shownTotalPrice} USD </h2>`
        let newTotalCartPrice = localStorage.getItem('newTotalCartPrice')
        
        
        if(shownTotalPrice < newTotalCartPrice) {
            totalPrice.innerHTML =  `<h2 class = 'fw-bold' > Total price : ${newTotalCartPrice} USD </h2>`
        
        }
            
        

       if(res.length > 0) {
        cartRow.innerHTML = displayedProducts

       }
       else {
        emptyCart.innerHTML = `                <img src="assets/empty-cart.svg" alt="empty cart" class="w-50 my-3">
        <h3> looks like your cart is empty ! </h3>
        <button class = 'btn btn-outline-primary my-2'> <a href = 'home.html' class = 'text-decoration-none'> Go back Shopping </a> </button>
`

       }
        

       localStorage.setItem('totalAmountToPay',totalPrice.innerHTML)
        
        }
        

        

        if(myCartProds ) {
            displayCartProducts()
            

        }
        else {
            emptyCart.innerHTML = `                <img src="assets/empty-cart.svg" alt="empty cart" class="w-50 my-3">
            <h3> looks like your cart is empty ! </h3>
            <button class = 'btn btn-outline-primary my-2'> <a href = 'home.html' class = 'text-decoration-none'> Go back Shopping </a> </button>
`
        }
        
        function incrementItem(item) {
            let productPrice = document.querySelectorAll('.productPrice')
            let productC = document.querySelectorAll('.productC')
        
            if(res[item].quantity <=4) {
                let increasedCount = ++res[item].quantity
        
                productC[item].innerHTML = increasedCount
                
                let newProductPrice =increasedCount * res[item].productPrice
                
                res[item].newProductPrice = newProductPrice
                productPrice[item].innerHTML =  res[item].newProductPrice
                let newTotalPrice = 0
        
            
                for(let i =0 ; i< res.length;i++){
                newTotalPrice += Number(productPrice[i].innerHTML)        
            
                    }
                    
                
                totalPrice.innerHTML = `<h2 class = 'fw-bold' > Total price : ${newTotalPrice} USD </h2>`
            
            
                localStorage.setItem('cartProducts',JSON.stringify(res))
              
                localStorage.setItem('newTotalCartPrice' ,newTotalPrice )
                localStorage.setItem('totalAmountToPay',totalPrice.innerHTML)

        
            }
        
        
          
        
        
          }
        function decrementItem(item) {
            let productPrice = document.querySelectorAll('.productPrice')
            let productC = document.querySelectorAll('.productC')
        
            if(res[item].quantity > 1) {
                let decreaseCount = --res[item].quantity
        
                productC[item].innerHTML = decreaseCount
                
                let newProductPrice =decreaseCount * res[item].productPrice
                
                res[item].newProductPrice = newProductPrice
                productPrice[item].innerHTML =  res[item].newProductPrice
                let newTotalPrice = 0
                
            
                for(let i =0 ; i< res.length;i++){
                newTotalPrice += Number(productPrice[i].innerHTML)        
            
                    }
                   
        
                
                totalPrice.innerHTML = `<h2 class = 'fw-bold' > Total price : ${newTotalPrice} USD </h2>`
            
                localStorage.setItem('cartProducts',JSON.stringify(res))
              
                localStorage.setItem('newTotalCartPrice' ,newTotalPrice )
                localStorage.setItem('totalAmountToPay',totalPrice.innerHTML)

        
            }
        
        
        
          
        
        
          }
        function removeItem(item) {
            
        res.splice(item,1)    
        let totalPriceAfterDeleteItem = 0
      
            
            
        for(let i =0 ; i < res.length ; i++) {
            totalPriceAfterDeleteItem += Number(res[i].productPrice)
            console.log(res[i].productPrice);
            
        
        }


        let totalPriceNew = 0
        for(let i =0 ; i <res.length ; i++) {

            if(res[i].newProductPrice !=0) {
                totalPriceNew += Number(res[i].newProductPrice 
                   
                )

                
            }
            else if (res.length >1) {
                totalPriceNew += Number(res[i].newProductPrice 
                    + Number( res[i].productPrice)
                    
                )

            }
        }
        
        localStorage.setItem('cartProducts' , JSON.stringify(res))
        
        displayCartProducts()
        
        
        localStorage.setItem('newTotalCartPrice' ,totalPriceAfterDeleteItem )

        if(totalPriceAfterDeleteItem > totalPriceNew) {
            totalPrice.innerHTML =  `<h2 class = 'fw-bold' > Total price : ${totalPriceAfterDeleteItem} USD </h2>`

        }
        else {
            totalPrice.innerHTML =  `<h2 class = 'fw-bold' > Total price : ${totalPriceNew} USD </h2>`

        }
        localStorage.setItem('totalAmountToPay',totalPrice.innerHTML)

        uniqueArray = JSON.parse(localStorage.getItem('cartProducts'))
        resArr = Array.from(new Set(uniqueArray.map(JSON.stringify)))
        .map(JSON.parse)
        notfBtn.innerHTML = `         
        <i class="fa-solid fa-cart-shopping">
         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
             ${resArr.length}
              </span>
        </i>`
        localStorage.setItem('cartLength' , res.length)

        
        }
        JSON.parse(  localStorage.getItem('cartProducts')
        )
        
        
    

        if(user == null) {
            mainCont.classList.add('d-none')
            signIn.classList.remove('d-none')
            setTimeout(() => {
                
                window.location.href = "file:///C:/ecommerceVanillaJs/index.html";
        
             }, 2000);

             

    
            
        }


  
let catgLi = document.querySelectorAll('.catg li')



for(let i =0 ; i < catgLi.length ;i++){
    catgLi[i].addEventListener('click', function(e){
        window.location.href = `file:///C:/ecommerceVanillaJs/categories.html?${e.target.innerHTML}`;

    })
}

let cartItemsLength = localStorage.getItem('cartLength')


if (cartItemsLength ) {
    notfBtn.innerHTML = `         
    <i class="fa-solid fa-cart-shopping">
     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
         ${cartItemsLength}
          </span>
    </i>`
    if (JSON.parse(cartItemsLength) == 0 ) {
        notfBtn.innerHTML = `         
        <i class="fa-solid fa-cart-shopping">
    
        </i>`
     
       
        
    }
    
}

function logOut() {
    localStorage.removeItem('user')
    
    setTimeout(() => {
        if (         window.location.href == "file:///C:/ecommerceVanillaJs/home.html"
        ) {
            window.location.href = "file:///C:/ecommerceVanillaJs/index.html"
        }
        else {
    
            window.location.href = 'https://sarahheshamali2.github.io/EcommerceVanilla/index'
        }
    
    
     }, 2000);
    
    }
    
    logOutBtn.addEventListener('click',logOut)