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

const insuranceContainer = document.querySelector('.insurance-grid');
var allImgs = document.querySelectorAll('img');
let chosen;
let sequence = 1;
let fileName;

const folderRef = storage.ref('insurance-logos');
const imagensArray = [];


folderRef.listAll().then((result) => {
    const items = result.items;
    const promises = [];

    // Criando um novo array somente com o nome das imagens
    const fileNames = items.map(item => item.name);

    // Ordenação dos nomes dos arquivos em ordem alfabética
    fileNames.sort();

    // Iteração sobre os nomes ordenados
    fileNames.forEach((fileName) => {
        // Pega a referência do arquivo pelo nome
        const itemRef = items.find(item => item.name === fileName);

        // Pega a URL de download para a imagem
        promises.push(itemRef.getDownloadURL());
    });

    // Espera até que todas as URLs de download sejam obtidas
    Promise.all(promises).then((urls) => {
        urls.forEach((url, index) => {
            const fileName = fileNames[index].split('.')[0];

            const img = document.createElement('img');
            img.src = url;
            img.alt = fileName;
            img.id = fileName;
            img.classList.add('insurance');

            insuranceContainer.appendChild(img);
        });
    }).catch((error) => {
        console.error('Erro ao obter URLs de download:', error);
    });
}).catch((error) => {
    console.error('Erro ao listar arquivos do Storage:', error);
});


// Pegando a seguradora que foi clicada
insuranceContainer.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'IMG') {
        chosen = ev.target
        localStorage.setItem('id', chosen.id);
        window.location.href = 'insurance.html';
    }
});

// Fazendo logout do firebase auth
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
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

window.addEventListener('load', () => {
    var overlayPreloader = document.querySelector('.overlay-preloader');
    var preloaderLogo = document.getElementById('asas-rsup');

    setTimeout(() => {
        overlayPreloader.style.display = 'none';
        preloaderLogo.style.display = 'none';
    }, 2000);
})

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();
    const insurances = document.querySelectorAll('.insurance');

    insurances.forEach(insurance => {
        const insuranceID = insurance.id.toLowerCase();
        const isVisible = insurance.style.display !== 'none'; // Verifica se o elemento está visível atualmente

        if (insuranceID.includes(searchString)) {
            if (!isVisible) { // Se o elemento não está visível, exibe-o
                insurance.style.display = 'inline-block';
            }
        } else {
            if (isVisible) { // Se o elemento está visível, oculta-o
                insurance.style.display = 'none';
            }
        }
    });
});

// Verificando se o usuário é Admin
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