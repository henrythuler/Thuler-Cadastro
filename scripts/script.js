let eye = document.querySelectorAll(".eye");
let closedEye = document.querySelectorAll(".closed-eye");
let passwordInput = document.querySelectorAll('.senha');

for(let i = 0; i < eye.length; i++){

    eye[i].addEventListener('click', () => {

        eye[i].classList.replace('show','hide');
        closedEye[i].classList.replace('hide','show');
        passwordInput[i].setAttribute('type','text');

    })

    closedEye[i].addEventListener('click', () => {

        closedEye[i].classList.replace('show','hide');
        eye[i].classList.replace('hide','show');
        passwordInput[i].setAttribute('type' , 'password');

    })

}

let validator = {

    controlSubmit: (event) => {
        
        event.preventDefault()

        let send = true

        let inputs = document.querySelectorAll('input')

        validator.clearErrors()

        for(i in inputs){

            let input = inputs[i]

            let check = validator.checkInput(input)

            if(check !== true){

                send = false
                validator.showError(input, check)

            }

        }

        if(send){

            form.submit()

        }

    },

    checkInput: (input) => {

        let rules = input.getAttribute('data-rules');

        if(rules !== null){

            rules = rules.split('|')

            for(j in rules){

                let ruleDetails = rules[j].split('=')

                switch(ruleDetails[0]){

                    case 'required':
                        
                        if(input.value == ''){
                            
                            return 'O campo é obrigatório'

                        }

                    break;

                    case 'min':

                        if(input.value.trim().length < parseInt(ruleDetails[1])){

                            return `No mínimo ${ruleDetails[1]} caracteres`

                        }
                    
                    break;
                    
                    case 'max':

                        if(input.value.trim().length > parseInt(ruleDetails[1])){

                            return `No máximo ${ruleDetails[1]} caracteres`

                        }

                    break;

                    case 'confirm':

                    let senha = document.querySelector('.senha').value

                    if(input.value !== senha){

                        return 'Senha não coincide'

                    }

                    break;

                    case 'email':
                    
                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if(!regex.test(input.value.toLowerCase())){

                        return "Email inválido..."

                    }

                    break;

                }

            }

        }

        return true

    },

    showError: (input, error) => {

        input.style.borderColor = 'red'
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)

    },

    clearErrors: () => {

        let errorElements = document.querySelectorAll('.error')

        let inputs = document.querySelectorAll('input')

        for(input of inputs){

            input.style = ''

        }

        for(el of errorElements){

            el.remove()

        }

    }

}

let form = document.querySelector('.validator')
form.addEventListener('submit', validator.controlSubmit)