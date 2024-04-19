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

auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
        window.location.href = 'restricted.html';
    }
});

// Variáveis globais
const imgContainer = document.querySelector('.insurance-img-container');
const unityContainer = document.querySelector('.unity-container');
const coPositive = document.querySelector('.positive');
const coNegative = document.querySelector('.negative');
const coProduct = document.querySelector('.product-co');
const process = document.querySelector('.process');
const code = document.querySelector('.code-status');
const select = document.getElementById('select-unidades');
const insuranceID = localStorage.getItem('id').toUpperCase();
let cocorretagemDB;
let colorDB;
let imgURLDB;
let matrizDB;
let processDB;
let productsDB;

// Script para gerar os dados das franquias no select
var query = db.collection('franchises').where('insuranceName', '==', insuranceID);

query.get()
    .then(snapshot => {
        if (snapshot.empty) {
            return;
        }

        snapshot.forEach(doc => {
            var option = document.createElement('option');
            option.value = doc.data().unitName;
            option.text = doc.data().unitName;
            select.appendChild(option);

            select.addEventListener('change', () => {
                var unit = select.value;

                function selectData() {
                    var query2 = db.collection('franchises')
                        .where('unitName', '==', unit)
                        .where('insuranceName', '==', insuranceID)

                    query2.get()
                        .then(snapshot => {
                            if (!snapshot.empty) {
                                snapshot.forEach(doc => {
                                    unityContainer.innerHTML = '';

                                    var imgUnit = document.createElement('img');
                                    imgUnit.className = 'img-unit';
                                    imgUnit.src = '/images/loja 1.png';
                                    imgUnit.style.display = 'block';
                                    var nameUnit = document.createElement('p');
                                    nameUnit.innerText = unit;
                                    nameUnit.className = 'name-unit';

                                    var questionStatus = document.createElement('p');
                                    questionStatus.innerText = 'Status da unidade: '
                                    questionStatus.className = 'status-unit';
                                    var strStatus = document.createElement('p');
                                    strStatus.innerText = doc.data().unitStatus;
                                    strStatus.style.color = doc.data().statusColor;
                                    strStatus.style.display = 'inline';
                                    questionStatus.append(strStatus);

                                    var emailUnit = document.createElement('p');
                                    emailUnit.className = 'email-unit';
                                    emailUnit.innerText = doc.data().email;
                                    var passwordUnit = document.createElement('p');
                                    passwordUnit.className = 'password-unit';
                                    passwordUnit.innerText = doc.data().password;

                                    unityContainer.append(imgUnit, nameUnit, questionStatus, passwordUnit, emailUnit);
                                });
                            }
                        })
                        .catch(err => {
                            console.error('Erro ao obter documentos:', err);
                        });
                }

                switch (unit) {
                    case 'Bruscagin Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Campos e Santana Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Can Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Dias e Freire Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Faccin Corretora de Seguros LTDA':
                        selectData();
                        break;
                    case 'Gera Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Harmata Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Neves & Abreu Corretoras de Seguros LTDA':
                        selectData()
                        break;
                    case 'Protect Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Queiroz Maia Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'RS Corretora de Seguros e Previdencia LTDA':
                        selectData()
                        break;
                    case 'ST Ferrari Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'TACOMAQ Corretora de Seguros LTDA':
                        selectData()
                        break;
                    case 'Selecione uma unidade':
                        unityContainer.innerHTML = '';
                        break;
                }

            })
        });
    })
    .catch(err => {
        console.error('Erro ao obter documentos:', err);
    })


//Função para adicionar as informações da seguradora na Matriz
function insuranceData(title, url, coProductsStr, processStr, codeStr, codeColor) {
    //Trocando o título
    document.title = title.toUpperCase();

    //Imagem da seguradora
    imgContainer.style.backgroundImage = url;

    var coProduct2 = document.createElement('p');
    coProduct2.innerText = coProductsStr;
    coProduct2.style.display = 'inline';
    coProduct.append(coProduct2);

    var process2 = document.createElement('p');
    process2.innerText = processStr;
    process2.style.display = 'inline';
    process.append(process2);

    var code2 = document.createElement('p');
    code2.innerText = codeStr;
    code2.style.color = codeColor;
    code2.style.display = 'inline';
    code.append(code2);
}


// Pegando os dados da seguradora do banco de dados
var query = db.collection('insurance').where('name', '==', insuranceID);

query.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            imgURLDB = doc.data().imgURL;
            cocorretagemDB = doc.data().cocorretagem;
            productsDB = doc.data().products;
            processDB = doc.data().process;
            matrizDB = doc.data().matriz;
            colorDB = doc.data().color;

            if (cocorretagemDB === true) {
                coPositive.style.display = 'inline'
            } else {
                coNegative.style.display = 'inline'
            }

            switch (insuranceID) {
                case "AGROBRASIL":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "AIG":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#0a30a6';
                    break;
                case "AKAD":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "ALFA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#0032a0';
                    break;
                case "ALLIANZ":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case 'AVLA':
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "AMERICANLIFE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#2d286b';
                    break;
                case "AMIL":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#4614ff';
                    break;
                case "ARUANA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "ASAS":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "AXA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#050f99';
                    break;
                case "AZOS":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#00af00';
                    break;
                case "AZUL":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#0001ff';
                    break;
                case "BMG":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#ff620e';
                    break;
                case "BRADESCO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#cc0a2f';
                    break;
                case "C6":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "CAPEMISA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#ee8c01';
                    break;
                case "CHUBB":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "DRYVE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#0252d4';
                    break;
                case "ESSOR":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "EXCELSIOR":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "EZZE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#303031';
                    break;
                case "FAIRFAX":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'black';
                    break;
                case "GENTE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case 'GOLDENCROSS':
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "HDI":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "INTERMAC":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "JUNTO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'black';
                    break;
                case "KIPP":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "KORV":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#2a2a2a';
                    break;
                case "LEVE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "LIBERTY":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#fed701';
                    break;
                case "LIVO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "LIVONIUS":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "MAPFRE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#f21b29';
                    break;
                case "MBM":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "METLIFE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "MITSUI":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "NEWE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "NOTREDAME":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "ODONTOPREV":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "OMINT":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case 'PRUDENTIAL':
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "PETLOVE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#5f17eb';
                    break;
                case "PORTOSEGURO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "POTTENCIAL":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "PREVENTSENIOR":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "PREVISUL":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "QUALICORP":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "RODOBENS":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SANCOR":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = '#8b0d58';
                    break;
                case "SOMBRERO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SOMPO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SUHAI":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SULAMERICA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SURA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "SWISSRE":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "TOKIO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "TOO":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "UNIFISA":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "UNIMED":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
                case "ZURICH":
                    insuranceData(insuranceID, 'url(' + imgURLDB + ')', productsDB, processDB, matrizDB, colorDB);
                    imgContainer.style.backgroundColor = 'white';
                    break;
            }
        });
    }).catch((error) => {
        console.error('Erro ao recuperar as informações da seguradora:', error);
    });

// ======================================================================================================================

// Caso o usuário não esteja logado ele será mandado para uma página restrita
auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
        window.location.href = 'restricted.html';
    }
});

// Função para voltar para a home
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

// Verificando se o usuário é admin, caso seja ele irá mostrar o a opção de configurações
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
    window.location.href = 'insurance-grid.html';
}

