const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let loadScreen = document.querySelector('.loadingScreen')
let reviews = []
let reviewBody = document.querySelector ('.reviewBody')
const productId = urlParams.get('id')
let rowId = document.querySelector('.rowId')
let prodImages = []

let notfBtn = document.querySelector('.notfBtn')
let logOutBtn = document.querySelector('.logOutBtn')

let prod = []
async function getSingleProduct() {

    let myProducts = await fetch(`https://dummyjson.com/products/${productId}`)
    let myFinalProducts = await myProducts.json()
      prod = myFinalProducts
     
      reviews = prod.reviews
    console.log(prod);
          prodImages = prod.images
      
    loadScreen.classList.add('d-none')
    displaySingleProduct()
    displayReviews () 


}

getSingleProduct()

function displaySingleProduct () {


        rowId.innerHTML = `
                  <div class="col-md-5">
                        <div class="inner">
                          <div class = 'slider' >
                            <img src="${prod.thumbnail}" alt="productDetails" class="w-100 mainImage ">
                            ${prodImages.map((img,i)=> `<img src="${img}" alt="productDetails" class="w-25 my-2 sliderImgs cursorPointer" onclick = 'changeThumbnail(${i})'></img>`)}
                            
                           
                          </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inner">
                            <h3>${prod.title}</h3>
                            <p>${prod.description}</p>
                            <h4>${prod.category}</h4>
                            <h6>${prod.price} USD</h6>
                        </div>
                    </div>
        `
    
}

function displayReviews () {

let reviewStr = ''

for(let i=0 ; i <reviews.length ;i++){

reviewStr += `

   <div class="review">
                                <div class="personReview">
                                <div  class = 'd-flex  align-items-center' >
                                      <span><i class="fa-solid fa-circle-user fa-2x mx-2"></i> </span> <h5>${reviews[i].reviewerName}</h5>

                                </div>
                                    <h6>${reviews[i].reviewerEmail}</h6>
                                    <p>${reviews[i].date.slice(0,10)}</p>
                                    <p class = 'fw-bold'>${reviews[i].comment}</p>
                                    <hr>
                                </div>
                            </div>
`
    
}

if(reviews.length > 0) {
    reviewBody.innerHTML = reviewStr

}
else {

    reviewBody.innerHTML =`No Reviews Yet`
}


}

function changeThumbnail(index) {
    let sliderImgs = document.querySelectorAll('.sliderImgs')
let mainImage = document.querySelector('.mainImage')


mainImage.setAttribute('src' , sliderImgs[index].src)

    


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
        window.location.href = "file:///C:/ecommerceVanillaJs/index.html";
    
     }, 2000);
    
    }
    
    logOutBtn.addEventListener('click',logOut)