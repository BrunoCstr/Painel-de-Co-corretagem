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

var displayName;

auth.onAuthStateChanged((user) => {
    if (user) {
        // Pegando o nome do usuário autenticado
        displayName = user.displayName;
        var textHome = document.querySelector('.text-home');
        textHome.innerText = `Olá ${displayName}, o que deseja fazer?`;
    } else {
        // Caso o usuário não esteja logado, será mandado para essa página.
        window.location.href = 'restricted.html';
    }
});

// Fazendo logout do firebase auth
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        })
}

function home() {
    window.location.href = 'home.html';
}

// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var myVivus = new Vivus('asas-rsup', {
    start: 'autostart',
    animTimingFunction: Vivus.EASE
});

new Vivus('asas-rsup', {}, function (myVivus) {
    myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);
})

function exitPreloader() {
    // Função para verificar se os elementos foram carregados
    function checkElementsLoaded() {
        var overlayPreloader = document.querySelector('.overlay-preloader');
        var preloaderLogo = document.getElementById('asas-rsup');
        var dynamicElementsLoaded = document.querySelectorAll('p');

        // Verifica se os elementos dinâmicos foram carregados
        if (dynamicElementsLoaded.length > 0) {
            setTimeout(() => {
                overlayPreloader.style.display = 'none';
                preloaderLogo.style.display = 'none';
            }, 2000);
        } else {
            // Se os elementos ainda não foram carregados, aguarde e verifique novamente
            setTimeout(checkElementsLoaded, 100);
        }
    }

    // Inicie a verificação
    checkElementsLoaded();
}

function insurance() {
    window.location.href = 'insurance-grid.html';
}

function query() {
    window.location.href = 'query.html';
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