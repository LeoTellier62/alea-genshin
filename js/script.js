//==============================================================================
// VARIABLES
//==============================================================================

// Data de références de characters et boss
let characBase = null;
let bossesBase = null;

//Data des characters et boss modifiables
let charac1;
let charac2;
let charac3;
let charac4;
let bosses;

//Div d'affichage
const testList = document.getElementById("afficher-all");
const affichList = document.getElementById('list-charac');

//Boutons de jeux
const btnPlay = document.getElementById("btn-play");
const btnWin = document.getElementById("btn-victoire");
const btnLoo = document.getElementById("btn-defaite");
const btnAbd = document.getElementById("btn-abandon");

//Card de characters et boss
const persoA = document.getElementById('perso1');
const persoB = document.getElementById('perso2');
const persoC = document.getElementById('perso3');
const persoD = document.getElementById('perso4');
const bossCard = document.getElementById('boss-card');

//Tableaux
let tour = 0;
const contBtn = document.getElementById('container-btn');
const tabResu = document.getElementById('tableau');


//Images pour numero joueur
const img1P = "img/1P.webp"
const img2P = "img/2P.webp"
const img3P = "img/3P.webp"
const img4P = "img/4P.webp"


//==============================================================================
// DATA FETCH
//==============================================================================

// Charger le fichier JSON
async function loadData() {
    try {
        const responseChar = await fetch('./js/characters.json');
        characBase = await responseChar.json();
        charac1 = JSON.parse(JSON.stringify(characBase));
        charac2 = JSON.parse(JSON.stringify(characBase));
        charac3 = JSON.parse(JSON.stringify(characBase));
        charac4 = JSON.parse(JSON.stringify(characBase));

        characBase.characters.forEach(item => {
            const img = new Image(); 
            img.src = item.picture; 
        });

        const responseBoss = await fetch('./js/bosses.json');
        bossesBase = await responseBoss.json();
        bosses = JSON.parse(JSON.stringify(bossesBase));;
        

        bossesBase.characters.forEach(item => {
            const imgb = new Image(); 
            imgb.src = item.picture; 
        });

        afficherData(charac1,img1P);
        afficherDataBoss(bosses);
    
    } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
    }
}


//==============================================================================
// AFFICHAGES
//==============================================================================

// Fonction pour afficher un personnage dans une div spécifique
function afficherCharact(charac, laDiv, imgP) {
    if (!charac) 
    {
        console.error("Personnage non défini :", charac);
        return;
    }
    
    laDiv.innerHTML = `
        <div class="user-card ${charac.element}">
            <div class="user-photo">
                <img src="${charac.picture}" alt="${charac.name}" />
                <div class="user-nom">${charac.name}</div>
                <img class="extra-img" src="${imgP}" alt="" />
            </div>
            <div class="user-info">
                <div class="user-zone">${charac.zone}</div>
                <div class="user-weapon">${charac.weapon}</div>
                <div class="user-elem">${charac.element}</div>
            </div>
        </div>
        `;
}


//Fonction pour l'affichage du boss
function afficherBoss(charac, laDiv) {
    if (!charac) 
    {
        console.error("Personnage non défini :", charac);
        return;
    }
    
    laDiv.innerHTML = `
        <div class="user-photo">
            <img src="${charac.picture}" alt="${charac.name}" />
            <div class="user-nom">${charac.name}</div>
        </div>
        <div class="user-info">
            <div class="user-zone">${charac.zone}</div>
        </div>
    `;
}


//==============================================================================
// CHANGEMENT ALEATOIRE
//==============================================================================

function getRandomCharacter() {
    if (!characBase || characBase.characters.length === 0 
        || !charac1 || charac1.characters.length === 0 
        || !charac2 || charac2.characters.length === 0 
        || !charac3 || charac3.characters.length === 0 
        || !charac4 || charac4.characters.length === 0 
    ) {
        alert("Aucun personnage disponible.");
        return null;
    }

    if (!bossesBase || bosses.characters.length === 0) {
        alert("Vous avez combattu tous les Boss. Bravo !");
        return null;
    }

    const randInd1 = Math.floor(Math.random() * charac1.characters.length);
    const randInd2 = Math.floor(Math.random() * charac2.characters.length);
    const randInd3 = Math.floor(Math.random() * charac3.characters.length);
    const randInd4 = Math.floor(Math.random() * charac4.characters.length);
    const randIndB = Math.floor(Math.random() * bosses.characters.length);

    const randChar1 = charac1.characters.splice(randInd1, 1)[0];
    const randChar2 = charac2.characters.splice(randInd2, 1)[0];
    const randChar3 = charac3.characters.splice(randInd3, 1)[0];
    const randChar4 = charac4.characters.splice(randInd4, 1)[0];
    const randBoss = bosses.characters.splice(randIndB, 1)[0];

    // Vérification si le boss a dungeon = "Yes"
    if (randBoss.dungeon === "Yes") {
        const selectedNames = new Set();

        // Vérification pour le personnage 1
        while (selectedNames.has(randChar1.name)) {
            const newInd = Math.floor(Math.random() * charac1.characters.length);
            randChar1.name = charac1.characters[newInd].name;
        }
        selectedNames.add(randChar1.name);

        // Vérification pour le personnage 2
        while (selectedNames.has(randChar2.name)) {
            const newInd = Math.floor(Math.random() * charac2.characters.length);
            randChar2.name = charac2.characters[newInd].name;
        }
        selectedNames.add(randChar2.name);

        // Vérification pour le personnage 3
        while (selectedNames.has(randChar3.name)) {
            const newInd = Math.floor(Math.random() * charac3.characters.length);
            randChar3.name = charac3.characters[newInd].name;
        }
        selectedNames.add(randChar3.name);

        // Vérification pour le personnage 4
        while (selectedNames.has(randChar4.name)) {
            const newInd = Math.floor(Math.random() * charac4.characters.length);
            randChar4.name = charac4.characters[newInd].name;
        }
        selectedNames.add(randChar4.name);
    }

    // Affichage des personnages et du boss
    afficherCharact(randChar1, persoA, img1P);
    afficherCharact(randChar2, persoB, img2P);
    afficherCharact(randChar3, persoC, img3P);
    afficherCharact(randChar4, persoD, img4P);
    afficherBoss(randBoss, bossCard);

    // Ajout des résultats dans le tableau
    btnWin.onclick = () => {
        ajouterAuTableau(++tour, [randChar1, randChar2, randChar3, randChar4], randBoss, "Victoire");
        resetBoutons();
    };

    btnLoo.onclick = () => {
        ajouterAuTableau(++tour, [randChar1, randChar2, randChar3, randChar4], randBoss, "Défaite");
        resetBoutons();
    };

    btnAbd.onclick = () => {
        ajouterAuTableau(++tour, [randChar1, randChar2, randChar3, randChar4], randBoss, "Abandon");
        resetBoutons();
    };
}


btnPlay.addEventListener('click', () => {
    if (characBase) {
        getRandomCharacter();
        btnPlay.disabled = true;  
        contBtn.style.display = 'flex';
    }
});


//==============================================================================
// TABLEAUX
//==============================================================================

// Fonction pour ajouter une ligne au tableau
function ajouterAuTableau(tour, characs, boss, resultat) {
    const tableBody = document.querySelector("#tableau tbody");
    
    
    const row = document.createElement("tr");
    row.setAttribute("data-result", resultat.toLowerCase()); 

    
    const cellTour = document.createElement("td");
    cellTour.innerHTML = `<div class="cellTour"> ${tour} </div>`;
    row.appendChild(cellTour);

    
    const cellCharacs = document.createElement("td");
    const imagesP = [img1P, img2P, img3P, img4P]; 
    const allPics = characs.map((charac, index) => `
        <div class="image-container">
            <img src="${imagesP[index]}" class="extra-img" alt="P${index + 1}" style="width: 40px; height: 40px; margin: 0 auto;" />
            <img src="${charac.picture}" class="${charac.element}" title="${charac.name}" />
        </div>
    `).join("");
    cellCharacs.innerHTML = `<div class="cellCharacs"> ${allPics} </div>`;
    row.appendChild(cellCharacs);

    
    const cellBoss = document.createElement("td");
    cellBoss.innerHTML = `<div class="cellBoss">
                            <img src="${boss.picture}" title="${boss.name}"/>
                        </div>`;
    row.appendChild(cellBoss);

    
    const cellResultat = document.createElement("td");
    cellResultat.innerHTML = `<div class="${resultat}"> ${resultat} </div>`;
    row.appendChild(cellResultat);

    
    tableBody.appendChild(row);
}


// Initialiser le tableau HTML
function initialiserTableau() {
    tabResu.innerHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Tour</th>
                    <th>Personnages</th>
                    <th>Boss</th>
                    <th>Résultat</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
}

// Fonction pour filtrer le tableau
function filtrerTableau(type) {
    const rows = document.querySelectorAll("#tableau tbody tr");

    rows.forEach(row => {
        const result = row.getAttribute("data-result"); 
        if (type === "all" || result === type) {
            row.style.display = ""; 
        } else {
            row.style.display = "none"; 
        }
    });
}

// Sélectionner tous les boutons de filtre
const filterButtons = document.querySelectorAll('#filter-buttons button');

// Activer le premier bouton par défaut
if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
}

// Ajouter un gestionnaire d'événements à chaque bouton
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Supprimer la classe active de tous les boutons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Ajouter la classe active au bouton cliqué
    button.classList.add('active');
  });
});

// Ajout des écouteurs aux boutons
document.getElementById("filter-all").addEventListener("click", () => filtrerTableau("all"));
document.getElementById("filter-victories").addEventListener("click", () => filtrerTableau("victoire"));
document.getElementById("filter-defeats").addEventListener("click", () => filtrerTableau("défaite"));
document.getElementById("filter-abandons").addEventListener("click", () => filtrerTableau("abandon"));


//==============================================================================
// RULES
//==============================================================================

//Pour fermer le Pop-up d'entrée
const startGameButton = document.getElementById('start-game');

startGameButton.addEventListener('click', () => {
  const rulesPopup = document.getElementById('popup-rules');
  rulesPopup.style.display = 'none'; // Cache le pop-up
  document.body.classList.remove('popup-active'); // Enlève l'effet de flou
});


//==============================================================================
// RESTART
//==============================================================================

function resetBoutons() {
    btnPlay.disabled = false;
    contBtn.style.display = 'none';
}

// Ajout d'un événement au bouton pour afficher le pop-up
document.getElementById('refresh').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.classList.add('popup-visible');
});

// Action pour le bouton "Oui"
document.getElementById('confirm-yes').addEventListener('click', () => {
    location.reload(); 
});

// Action pour le bouton "Non"
document.getElementById('confirm-no').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.classList.remove('popup-visible');
});


//==============================================================================
// INIT
//==============================================================================
// Lancement initial
initialiserTableau();
loadData();


//==============================================================================
// UTILITY DEV
//==============================================================================

//Fonctions secondaires pour verifier les Data
function afficherData(data,imgP) {
    
    data.characters.forEach(charac => {
        testList.innerHTML += `
        <div class="user-card ${charac.element}" style="width:230px;height :400px;">
            <div class="user-photo">
                <img src="${charac.picture}" alt="${charac.name}" />
                <div class="user-nom">${charac.name}</div>
                <img class="extra-img" src="${imgP}" alt="" />
            </div>
            <div class="user-info">
                <div class="user-zone">${charac.zone}</div>
                <div class="user-weapon">${charac.weapon}</div>
                <div class="user-elem">${charac.element}</div>
            </div>
        </div>
        `;
    });
    
}

function afficherDataBoss(data) {
    
    data.characters.forEach(charac => {
        testList.innerHTML += `
        <div class="user-card Basique" id="boss-card">
            <div class="user-photo">
                <img src="${charac.picture}" alt="${charac.name}" />
                <div class="user-nom">${charac.name}</div>
            </div>
            <div class="user-info">
                <div class="user-zone">${charac.zone}</div>
            </div>
        </div>
        `;
    });
    
}