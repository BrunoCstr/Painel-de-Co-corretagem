const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    storageBucket: ""
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

//Validação dos inputs

let email = document.querySelector('#inputEmail');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let password = document.querySelector('#inputPassword');
let labelPassword = document.querySelector('#labelPassword');
let validPassword = false;

email.addEventListener('input', () => {
    let emailValue = email.value;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailValue)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'E-mail: *Insira um e-mail válido';
        validEmail = false;
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail:';
        validEmail = true;
    }
});

password.addEventListener('input', () => {
    if (password.value.length <= 5) {
        labelPassword.setAttribute('style', 'color: red');
        labelPassword.innerText = 'Senha: *Mínimo 6 caracteres';
        validPassword = false;
    }
    else {
        labelPassword.setAttribute('style', 'color: green');
        labelPassword.innerText = 'Senha:';
        validPassword = true;
    }
});

function autentication() {

    let loginEmail = document.getElementById('inputEmail').value;
    let loginPassword = document.getElementById('inputPassword').value;
    let allValid = false;

    if (validEmail === false && validPassword === false) {
        allValid = false;
    } else {
        allValid = true
    }

    if (loginEmail.trim() != '' && loginPassword.trim() != '' && allValid === true) {

        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .then(() => {
                msgError.setAttribute('style', 'display: none');
                msgError.innerText = '';

                window.location.href = 'home.html'
            })
            .catch(() => {
                msgError.setAttribute('color:', 'red');
                msgError.innerText = 'Senha inválida!'
                msgSuccess.innerText = ''
                msgSuccess.setAttribute('style', 'display: none');
            });
    }
    else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos!</strong>';
        msgSuccess.innerText = '';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

//Logic of showing password
function showPassword() {
    let inputPassword = document.getElementById('inputPassword');
    let eyeShowPassword = document.getElementById('eyePassword');

    if (inputPassword.type === 'password') {
        inputPassword.setAttribute('type', 'text');
        eyeShowPassword.setAttribute('class', 'bi bi-eye-slash');
    } else {
        inputPassword.setAttribute('type', 'password');
        eyeShowPassword.setAttribute('class', 'bi bi-eye')
    }
}