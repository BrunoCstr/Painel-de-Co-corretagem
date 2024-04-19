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


//Lógica do disparo de redefinição senha
function forgotpassword() {
  const email = document.getElementById('inputEmail').value;
  const msgSuccess = document.getElementById('msgSuccess');
  const msgError = document.getElementById('msgError');

  msgSuccess.innerText = '';
  msgError.innerText = '';

  //Coleção dos usuários no database
  const users = db.collection('users');
  const searchUser = email;
  let existingEmail = false;


  //Verifica se o email informado no input está presente na coleção do database
  (async () => {
    try {
      const querySnapshot = await users.where('email', '==', searchUser).get();

      if (!querySnapshot.empty) {
        querySnapshot.forEach(() => {
          existingEmail = true;
        });
      } else {
        msgError.innerText = 'E-mail não cadastrado!'
        msgError.style.color = 'red';
        existingEmail = false;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
    }
  })();


  // Envio do e-mail de redefinição
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      if (existingEmail === true) {
        msgSuccess.innerText = 'Enviado! Verifique sua caixa de entrada.'
        msgSuccess.style.color = 'green';

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 6000);
      }
    })
    .catch((error) => {

      msgError.innerText = 'ERRO! Entre em contato com o administrador do sistema';
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage, errorCode);
    });
}

// Validação do input
const inputEmail = document.getElementById('inputEmail');
const labelEmail = document.getElementById('labelEmail');

inputEmail.addEventListener('input', () => {
  let emailValue = inputEmail.value;
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(emailValue)) {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'E-mail: *Insira um e-mail válido';
  } else {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'E-mail';
  }
});