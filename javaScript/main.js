let myPassword = document.querySelector('input[type=password]')
let myEye = document.querySelector('.eyePassword')
let emailField = document.querySelector('.email')
let signInBtn = document.querySelector('.signIn')
let loadingButton = document.querySelector('.loading')


let savedUser = JSON.parse(localStorage.getItem('user'))


    function toggleShowPassowrd () {
        if(myPassword.value != '') {
            if(myPassword.type == 'password') {
                myPassword.type = 'text'
                myEye.classList.remove('fa-eye-slash')
                myEye.classList.add('fa-eye')
                
            }
            else {
                myPassword.type = 'password'
                myEye.classList.remove('fa-eye')
                myEye.classList.add('fa-eye-slash')
            }

        }



    }
    
    myEye.addEventListener('click',toggleShowPassowrd)



    function validateEmail (email) {

        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        return regExp.test(email)


    }





    function validatePassword(password) {




        let regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
        return regExp.test(password)


    }

    myPassword.addEventListener('input',function(){
            let passwordError = document.querySelector('.passwordError')
            if(myPassword.value == '') {
                passwordError.innerHTML='password cannot be empty '
            }
            else {
                if(validatePassword(myPassword.value)) {
                    myPassword.classList.add('greenBorder')
                    passwordError.classList.add('d-none')
                }
                else {
                    myPassword.classList.remove('greenBorder')
                    myPassword.classList.add('redBorder')
                    passwordError.classList.remove('d-none')
                    passwordError.innerHTML = 'Minimum  4 characters , at least one letter and one number'
                
                }
            }


        
    })




    emailField.addEventListener('input' , function () {
        let checkIcon = document.querySelector('.checkIcon')
        let emailError = document.querySelector('.emailError')

        if(emailField.value == '') {
            emailError.classList.remove('d-none')
        }
        else {
            if(   validateEmail(emailField.value)
            ) {
        emailField.classList.add('greenBorder')
        checkIcon.classList.remove('d-none')
        }
    
        else {
            checkIcon.classList.add('d-none')
            emailField.classList.remove('greenBorder')
            emailError.classList.add('d-none')

            emailField.classList.add('redBorder')
    
        }
        }

 
    } )


    function addNewUser() {
let newUser = {
    'userEmail' : emailField.value , 
    'userPassword' : myPassword.value
}




if(validatePassword(myPassword.value) && validateEmail (emailField.value)) {
     localStorage.setItem('user',JSON.stringify(newUser))
    loadingButton.classList.remove('d-none')
    signInBtn.classList.add('d-none')

     setTimeout(() => {
        if (         window.location.href == "file:///C:/ecommerceVanillaJs/home.html"
        ) {
            window.location.href = "file:///C:/ecommerceVanillaJs/home.html"
        }
        else {

            window.location.href = 'https://sarahheshamali2.github.io/EcommerceVanilla/home'
        }

     }, 2000);


}
else {
    loadingButton.classList.add('d-none')
    signInBtn.classList.remove('d-none')
    
}
    

    }







    signInBtn.addEventListener('click',addNewUser)




    console.log(window.location.href);
