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

const insuranceName = document.getElementById('inputNameInsurance');
const UnitName = document.getElementById('inputUnit');
const inputStatus = document.getElementById('inputStatus');
const color = document.getElementById('color');
const emailUnit = document.getElementById('inputEmailUnit');
const passwordUnit = document.getElementById('inputPasswordUnit');
const msgError = document.querySelector('.msgError');
const msgSuccess = document.querySelector('.msgSuccess');


// Função para submeter os dados da seguradora cadastrada
function submitUnit() {
    db.collection('franchises').add({
       insuranceName: insuranceName.value,
       unitName: UnitName.value,
       unitStatus: inputStatus.value,
       statusColor: color.value,
       email: emailUnit.value,
       password: passwordUnit.value
    })

    msgSuccess.innerText = 'Unidade cadastrada com sucesso!';
    msgSuccess.style.color = '#14FF00';

    setTimeout( function () {
        location.reload();
    }, 1500);
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