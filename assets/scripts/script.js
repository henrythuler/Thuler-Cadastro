//Pegando o meu elemento do olho aberto
let eye = document.querySelectorAll(".eye");

//Pegando meu elemento do olho fechado
let closedEye = document.querySelectorAll(".closed-eye");

//Pegando o meu input de senha
let passwordInput = document.querySelectorAll('.senha');

//Adicionando o evento de clique para todos os elementos de olho aberto/fechado
for(let i = 0; i < eye.length; i++){

    eye[i].addEventListener('click', () => {

        //Se o olho aberto está sendo exibido, escondemos
        eye[i].classList.replace('show','hide');

        //Exibimos o olho fechado
        closedEye[i].classList.replace('hide','show');

        //Exibimos a senha
        passwordInput[i].setAttribute('type','text');

    })

    closedEye[i].addEventListener('click', () => {

        //Se o olho fechado está sendo exibido, escondemos
        closedEye[i].classList.replace('show','hide');

        //Exibimos o olho aberto
        eye[i].classList.replace('hide','show');

        //Escondemos a senha
        passwordInput[i].setAttribute('type' , 'password');

    })

}

//Validador de formulário
let validator = {

    //Método de controle de envio
    controlSubmit: (event) => {
        
        //Cancelamos a execução natural do envio
        event.preventDefault()

        //Enviado
        let send = true

        //Pegando todos os inputs
        let inputs = document.querySelectorAll('input')

        //Executando a função para limpar os avisos
        validator.clearErrors()

        //Passando por cada input do meu array de inputs
        for(i in inputs){

            //Pegando cada input
            let input = inputs[i]

            //Checando se o input é válido
            let check = validator.checkInput(input)

            //Se não passar na validação
            if(check !== true){

                //Não é enviado
                send = false

                //Exibindo o erro
                validator.showError(input, check)

            }

        }

        //Se passar na validação
        if(send){

            //Enviamos o formulário
            form.submit()

        }

    },

    //Método para a verificação dos inputs
    checkInput: (input) => {

        //Pegando as regras de validação para o input específico
        let rules = input.getAttribute('data-rules');

        //Se houver alguma regra de validação
        if(rules !== null){

            //Separando cada regra
            rules = rules.split('|')

            //Passando por todas as regras
            for(j in rules){

                //Separando o nome e o valor da regra
                let ruleDetails = rules[j].split('=')

                //Verificando o nome da regra
                switch(ruleDetails[0]){

                    //Caso o nome seja "required"
                    case 'required':
                        
                        //Se o input especificado estiver vazio, retornamos o aviso
                        if(input.value == ''){
                            
                            return 'O campo é obrigatório'

                        }

                    break;
                    
                    //Caso o nome seja "min"
                    case 'min':

                        //Se a quantidade de caracteres (desconsiderando espaços) for menor que o valor mínimo, retornamos o aviso
                        if(input.value.trim().length < parseInt(ruleDetails[1])){

                            return `No mínimo ${ruleDetails[1]} caracteres`

                        }
                    
                    break;
                    
                    //Caso o nome seja "max"
                    case 'max':

                        //Se a quantidade de caracteres (desconsiderando espaços) for maior que o valor máximo, retornamos o aviso
                        if(input.value.trim().length > parseInt(ruleDetails[1])){

                            return `No máximo ${ruleDetails[1]} caracteres`

                        }

                    break;
                    
                    //Caso o nome seja "confirm"
                    case 'confirm':

                    //Pegando o valor da minha senha
                    let senha = document.querySelector('.senha').value
                    
                    //Se o valor do input de confirmação de senha não for igual ao de senha, retornamos o aviso
                    if(input.value !== senha){

                        return 'Senha não coincide'

                    }

                    break;

                    //Caso o nome seja "email"
                    case 'email':
                    
                    //Expressão Regular para a validação de email
                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    //Se o email não passar no teste de validação da expressão regular, retornnamos o aviso
                    if(!regex.test(input.value.toLowerCase())){

                        return "Email inválido..."

                    }

                    break;

                }

            }

        }

        //Caso não haja problemas, o input passou na validação
        return true

    },

    //Método para a exibição do aviso
    showError: (input, error) => {

        //Transformando a borda do input que não passou na validação em vermelho
        input.style.borderColor = 'red'

        //Criando o elemento de erro
        let errorElement = document.createElement('div')

        //Adicionando a classe de erro ao elemento criado
        errorElement.classList.add('error')

        //Exibindo a mensagem de aviso
        errorElement.innerHTML = error

        //Inserindo o elemento criado antes do elemento "irmão" do input específico
        input.parentElement.insertBefore(errorElement, input.ElementSibling)

    },

    //Função para limpar os avisos
    clearErrors: () => {

        //Pegando todos os elementos que possuem a classe "error"
        let errorElements = document.querySelectorAll('.error')

        //Pegando todos os meus inputs
        let inputs = document.querySelectorAll('input')

        //Zerando o estilo de todos os meus inputs
        for(input of inputs){

            input.style = ''

        }

        //Removendo todos os elementos de aviso criados
        for(el of errorElements){

            el.remove()

        }

    }

}

//Pegando o meu formulário a ser validado
let form = document.querySelector('.validator')

//Ao formulário ser "enviado", executamos a função de controle de envio
form.addEventListener('submit', validator.controlSubmit)