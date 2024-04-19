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

function home() {
    window.location.href = 'home.html';
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
                                window.location.href = 'restricted.html';
                            }
                        })
                    }
                })
        } else {
            window.location.href = 'restricted.html';
        }
    });
})

// Fazendo logout do firebase auth
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
}

function registerInsurance() {
    window.location.href = 'register-insurance.html';
}


function registerUnit() {
    window.location.href = 'register-unit.html';
}

function registerCollab() {
    window.location.href = 'register.html';
}