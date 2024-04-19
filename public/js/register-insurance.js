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
const storage = firebase.storage();

auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
        window.location.href = 'restricted.html';
    }
});

const insuranceName = document.getElementById('inputInsurance');
let cocorretagem = false;
const coYES = document.getElementById('yes');
const coNO = document.getElementById('no');
const products = document.getElementById('inputProducts');
const process = document.getElementById('inputProcess');
const matriz = document.getElementById('inputMatriz');
const color = document.getElementById('color');
const inputImg = document.getElementById('inputImg');
const msgError = document.querySelector('.msgError');
const msgSuccess = document.querySelector('.msgSuccess');
let insuranceImg;

function COvalidation() {
    if (coYES.checked === true && coNO.checked === false) {
        cocorretagem = true;
    } else {
        cocorretagem = false;
    }
}

// Toda vez em que o radio for marcado ele irá executar a função pra ver se a opção é sim/não
coYES.addEventListener('change', () => { COvalidation(); });
coNO.addEventListener('change', () => { COvalidation(); });

// Função para submeter os dados da seguradora cadastrada
function submitInsurance() {
    if (inputImg.files.length > 0) {
        const file = inputImg.files[0];
        const folderRef = firebase.storage().ref('insurance-logos');

        folderRef.child(`${insuranceName.value}.png`).put(file).then(() => {
            const fileRef = folderRef.child(`${insuranceName.value}.png`)
            fileRef.getDownloadURL()
                .then(url => {
                    insuranceImg = url;
                    db.collection('insurance').add({
                        name: insuranceName.value.toUpperCase(),
                        cocorretagem: cocorretagem,
                        products: products.value,
                        process: process.value,
                        matriz: matriz.value,
                        color: color.value,
                        imgURL: insuranceImg
                    })

                    msgSuccess.innerText = 'Seguradora cadastrada com sucesso!';
                    msgSuccess.style.color = '#14FF00';

                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                })
                .catch(error => {
                    console.error('Erro ao obter o url da imagem:', error);
                })
        })
            .catch((error) => {
                console.error('Erro no upload:', error);
            })
    } else {
        msgError.innerText = 'Faça upload do logo da seguradora.';
        msgError.style.color = 'red';
    }
}

function home() {
    window.location.href = 'home.html';
}

// Fazendo logout do firebase auth
function logout() {
    firebase.auth().signOut()
    .then(() => {
        window.location.href = 'index.html';
    })
}

function editInsurance() {
    window.location.href = 'edit-insurance.html';
}


const settings = document.getElementById('settings');

document.addEventListener('DOMContentLoaded', () => {
    
    auth.onAuthStateChanged((user) => {
        if (user) {
            const loginName = user.displayName;

            var query = db.collection('users').where('name', '==', loginName);

            query.get()
                .then(snapshot => {
                    if (snapshot.empty) {
                    } else {
                        snapshot.forEach(doc => {
                            if (doc.data().admin === true) {
                                settings.style.display = 'inline';
                            }
                            else {
                                settings.style.display = 'none';
                            }
                        })
                    }
                })
        } else {
            window.location.href = 'restricted.html';
        }
    });
})

function back() {
    window.location.href = 'settings.html';
}