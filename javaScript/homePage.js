

let allProducts =[]
let logOutBtn = document.querySelector('.logOutBtn')
let loadScreen = document.querySelector('.loadingScreen')
let mainCont = document.querySelector('.mainCont')
let signIn = document.querySelector('.signIn')

let user = JSON.parse(localStorage.getItem('user'))
let notfBtn = document.querySelector('.notfBtn')



if(user == null) {
    mainCont.classList.add('d-none')
    signIn.classList.remove('d-none')
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


async function getAllProducts() {
    let myProducts = await fetch(`https://dummyjson.com/products`)
    let myFinalProducts = await myProducts.json()
    loadScreen.classList.add('d-none')
    allProducts = myFinalProducts.products   

    
     
displayAllProducts()


}

function displayAllProducts() {
    let homeProductsRow = document.querySelector('#homeProductsRow')

    let myContainer = ''
    for(let i=0 ; i<allProducts.length ;i++) {
        myContainer += `     <div class="col-lg-2 col-sm-3 p-3 productDet mx-1  ">
        <a href = 'productDetails.html?id=${allProducts[i].id}' onclick = 'getProductDetails (${allProducts[i].id})' class="text-decoration-none p-3">             <div class="product position-relative">
                <img src="${allProducts[i].images[0]}" alt="" class="w-100 productImg">
                <h4 class = 'productTitle'>${allProducts[i].title.slice(0,25)}</h4>
                <p class='productDesc'>${allProducts[i].description.slice(0,75)}...</p>
                    <div class = 'd-flex align-items-center'>
                    <h4 class = 'productPrice'> ${Math.round(allProducts[i].price)}  </h4>
                 ${allProducts[i].discountPercentage ? `<span class ='discount text-danger disCount'> -${allProducts[i].discountPercentage}% </span> `: ''}
                    </div>
                <h3 class ='d-none prodID'>${allProducts[i].id} </h3>
                ${allProducts[i].availabilityStatus == 'In Stock' ? ` <span class='d-block my-2 fw-bold'>${allProducts[i].availabilityStatus} </span>
` : `<span class='d-block my-2 text-danger fw-bold'>${allProducts[i].availabilityStatus} </span>`}

                

            </div></a>
                   <button  class="btn btn-dark addToCart " onclick = 'addToCart(${i})'>Add to cart</button>


        </div>`
    }


    homeProductsRow.innerHTML = myContainer
}

getAllProducts()



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

let addedToCart = []
let uniqueArray = []
let res = []
if(JSON.parse(localStorage.getItem('cartProducts'))) {

    addedToCart = JSON.parse(localStorage.getItem('cartProducts'))

   


}

function addToCart(index) {

    let addToCartBtn = document.querySelectorAll('.addToCart')
    let productImg = document.querySelectorAll ('.productImg')
    let productDescription = document.querySelectorAll('.productDesc')
    let productTit = document.querySelectorAll('.productTitle')
    let productPrice = document.querySelectorAll('.productPrice')
    let productId = document.querySelectorAll('.prodID')
    let disCount = document.querySelectorAll('.disCount')

    let newProduct = {
        productImage: productImg[index].src,
        productDescription : productDescription[index].innerHTML,
        productTit: productTit[index].innerHTML,
        productPrice : productPrice[index].innerHTML,
        productId : productId[index].innerHTML,
        prodDiscount : disCount[index].innerHTML,
        quantity : 1,
        newProductPrice : 0

        

    }


    addedToCart.push(newProduct)
    let productAddedSucc = document.querySelector('.productAddSucc')
    addToCartBtn[index].innerHTML=`<i class="fa-solid fa-spinner fa-spin">`



 

 

    

setTimeout(() => {
    addToCartBtn[index].innerHTML=`Add to Cart`
    productAddedSucc.classList.remove('d-none')
    
}, 1000);
setTimeout(() => {
    productAddedSucc.classList.add('d-none')

}, 2000);
    
    localStorage.setItem('cartProducts',JSON.stringify(addedToCart))
  
    uniqueArray = JSON.parse(localStorage.getItem('cartProducts'))
    res = Array.from(new Set(uniqueArray.map(JSON.stringify)))
    .map(JSON.parse)
    notfBtn.innerHTML = `         
    <i class="fa-solid fa-cart-shopping">
     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
         ${res.length}
          </span>
    </i>`
   

    localStorage.setItem('cartLength' , res.length)

    


    
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

 



let catgLi = document.querySelectorAll('.catg li')



for(let i =0 ; i < catgLi.length ;i++){
    catgLi[i].addEventListener('click', function(e){
        window.location.href = `file:///C:/ecommerceVanillaJs/categories.html?${e.target.innerHTML}`;

    })
}

