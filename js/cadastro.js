//================================ Função para formatar NOME ===================================

function formatarTexto(texto) {
    texto = texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '') // Remove tudo que não for letra ou espaço
    return texto
}

document.getElementById('nome').addEventListener('input', function () {
    this.value = formatarTexto(this.value)
})

//============================== Função para Validar DATA ======================================

document.getElementById('data_nascimento').addEventListener('input', function () {
    const errorData = document.getElementById('errorData')
    const dataInput = this.value // yyyy-mm-dd

    const ano = parseInt(dataInput.split('-')[0])

    const isValid = ano >= 1900 && ano <= 2099

    if (isValid) {
        errorData.textContent = "✅ Ano é válido"
        errorData.style.color = "#16A34A"
    } else {
        errorData.textContent = "❌ Ano inválido (permitido: 1900–2099)"
        errorData.style.color = "#DC2626"
    }
})

//================================== Função para formatar CPF ================================

function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '') // remove tudo que não é número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2')
    return cpf
}

document.getElementById('cpf').addEventListener('input', function () {
    this.value = formatarCPF(this.value)

    const cpfValue = this.value.replace(/\D/g, '')
    if (cpfValue.length === 11) {
        CPFvalido(cpfValue)
    }
})

function validaNumerosRepetidos(cpf) {
    const repetidos = [
        '00000000000', '11111111111', '22222222222',
        '33333333333', '44444444444', '55555555555',
        '66666666666', '77777777777', '88888888888',
        '99999999999'
    ]
    return repetidos.includes(cpf)
}

function validarDigitos(cpf) {
    // Primeiro dígito
    let soma = 0
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i)
    }
    let dig1 = (soma * 10) % 11
    if (dig1 === 10 || dig1 === 11) dig1 = 0
    if (dig1 !== parseInt(cpf[9])) return false

    // Segundo dígito
    soma = 0
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i)
    }
    let dig2 = (soma * 10) % 11
    if (dig2 === 10 || dig2 === 11) dig2 = 0
    if (dig2 !== parseInt(cpf[10])) return false

    return true
}

function CPFvalido(cpf) {
    const errorCPF = document.getElementById('errorCPF')

    if (!validaNumerosRepetidos(cpf) && validarDigitos(cpf)) {
        errorCPF.textContent = "✅ CPF válido"
        errorCPF.style.color = "#16A34A"
    } else {
        errorCPF.textContent = "❌ CPF inválido"
        errorCPF.style.color = "#DC2626"
    }
}

//============================== Função para Validar E-mail =================================

document.getElementById('email').addEventListener('input', () => {
    const errorEmail = document.getElementById('errorEmail')
    const emailInput = document.getElementById('email').value

    const isValid = validaEmail(emailInput)

    if (isValid) {
        errorEmail.textContent = "✅ E-mail é válido"
        errorEmail.style.color = "#16A34A" // verde

    } else {
        errorEmail.textContent = "❌ E-mail é válido"
        errorEmail.style.color = "#DC2626" // vermelho
    }
    console.log(isValid)
})

const validaEmail = (email) => {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    return regex.test(email)
}

//============================= Função para formatar o TELEFONE ===============================

function validaNumerosRepetidosTel(tel) {
    const repetidosTel = [
        '00000000000', '11111111111', '22222222222',
        '33333333333', '44444444444', '55555555555',
        '66666666666', '77777777777', '88888888888',
        '99999999999'
    ]

    return repetidosTel.includes(tel)
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '') // remove todos os caracteres que não são números
    telefone = telefone.replace(/^(\d{2})(\d)/, '($1) $2') // adiciona parênteses e espaço
    telefone = telefone.replace(/(\d{4})(\d{4})$/, '$1-$2') // adiciona hífen
    return telefone
}

const inputTel = document.getElementById('tel')

inputTel.addEventListener('input', function () {
    this.value = formatarTelefone(this.value)

    valiTel(this.value)
})

function valiTel(tel) {
    // remove tudo que não for número para fazer a validação
    const numeros = tel.replace(/\D/g, '')
    const errorTel = document.getElementById('errorTel')

    if (!validaNumerosRepetidosTel(numeros)) {

        if (numeros.length === 10 || numeros.length === 11) {
            errorTel.textContent = "✅ O número é válido"
            errorTel.style.color = "#16A34A" // verde
        } else {
            errorTel.textContent = "❌ O número é inválido (quantidade insuficiente)"
            errorTel.style.color = "#DC2626" // vermelho
        }

    } else {
        errorTel.textContent = "❌ Número inválido (repetido)"
        errorTel.style.color = "#DC2626" // vermelho
    }
}

//============================= Função para validção das senhas ==============================

const senhaInput = document.getElementById('senha')
const confirmarInput = document.getElementById('confirmarSenha')

senhaInput.addEventListener('input', () => {
    validTamanhoSenha(senhaInput)
})

function validTamanhoSenha(senha) {
    const tamSenha = senha.value

    if (tamSenha.length < 6) {
        senha.setCustomValidity('A senha deve ter no mínimo 6 caracteres.')
    } else {
        senha.setCustomValidity('')
    }
    senha.reportValidity()
}

// Validação das senhas

function validSenha() {
    const errorSenha = document.querySelector('#errorSenha')

    if (senhaInput.value === confirmarInput.value) {
        errorSenha.textContent = "✅ As senhas conferem"
        errorSenha.style.color = "#16A34A" // verde

    } else {
        errorSenha.textContent = "❌ As senhas não conferem"
        errorSenha.style.color = "#DC2626" // verde
    }
}

senhaInput.addEventListener('input', () => {
    if (confirmarInput.value !== '') {
        validSenha()
    }
})

confirmarInput.addEventListener('input', validSenha)

// Alternar visibilidade das senhas e ícones

const toggleSenhaIcons = [
    document.getElementById('toggleSenha'),
    document.getElementById('toggleConfirmarSenha')
]

toggleSenhaIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const isPassword = senhaInput.type === 'password'

        senhaInput.type = isPassword ? 'text' : 'password'
        confirmarInput.type = isPassword ? 'text' : 'password'

        toggleSenhaIcons.forEach(i => {
            i.classList.toggle('fa-eye')
            i.classList.toggle('fa-eye-slash')
        })
    })
})

//============================ Função para formatar CEP =======================================

function validaNumerosRepetidosCep(cep) {
    const repetidosCep = [
        '00000000', '11111111', '22222222',
        '33333333', '44444444', '55555555',
        '66666666', '77777777', '88888888',
        '99999999'
    ]

    return repetidosCep.includes(cep)
}

function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '') // Remove tudo que não for número
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2') // Adiciona o hífen
    return cep
}

const cepInput = document.getElementById('cep')
const errorCEP = document.getElementById('errorCEP')

cepInput.addEventListener('input', function () {
    this.value = formatarCEP(this.value)
    const numCep = this.value.replace(/\D/g, '')

    if (!validaNumerosRepetidosCep(numCep)) {

        // Validação quando tiver 9 caracteres (com hífen)
        if (this.value.length === 9) {
            errorCEP.textContent = "✅ CEP válido"
            errorCEP.style.color = "#16A34A" // verde   
        } else {
            errorCEP.textContent = "❌ CEP inválido"
            errorCEP.style.color = "#DC2626" // vermelho
        }
    } else {
        errorCEP.textContent = "❌ CEP inválido números (repetidos)"
        errorCEP.style.color = "#DC2626" // vermelho
    }
})

//======================== Função para validar o campo de radio button =========================

// Seleciona todos os radio buttons com o nome "curso"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form')

    form.addEventListener('submit', function (event) {
        const radioButtons = document.querySelectorAll('input[name="curso"]')
        let checked = false

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                checked = true
                break
            }
        }

        if (!checked) {
            alert('Por favor, selecione uma trilha de aprendizagem.')
            event.preventDefault() // Impede o envio do formulário
        }
    })
})

//=========================== Função para validar se o usuário aceitou os termos ==========================

const checkbox = document.getElementById('checkbox')
const insc = document.getElementById('inscrever')

checkbox.addEventListener('input', () => {
    if (checkbox.checked) {
        insc.style.pointerEvents = 'all'
        insc.style.opacity = '1'
    } else {
        insc.style.pointerEvents = 'none'
        insc.style.opacity = '0.5'
    }
})