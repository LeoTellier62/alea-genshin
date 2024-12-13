let characBase = null;
let bossesBase = null;

let charac1;
let charac2;
let charac3;
let charac4;
let bosses;

const btnPlay = document.getElementById("btn-play");
const persoA = document.getElementById('perso1');
const persoB = document.getElementById('perso2');
const persoC = document.getElementById('perso3');
const persoD = document.getElementById('perso4');
const bossCard = document.getElementById('boss');

const img1P = "img/1P.png"
const img2P = "img/2P.png"
const img3P = "img/3P.png"
const img4P = "img/4P.png"

// Charger le fichier JSON
async function loadData() {
    try {
        const responseChar = await fetch('/js/characters.json');
        characBase = await responseChar.json();
        charac1 = characBase;
        charac2 = characBase;
        charac3 = characBase;
        charac4 = characBase;

        const responseBoss = await fetch('/js/bosses.json');
        bossesBase = await responseBoss.json();
        bosses = bossesBase;
        //afficherData(charac1);
    
    } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
    }
}


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

function afficherBoss(charac, laDiv) {
    if (!charac) 
    {
        console.error("Personnage non défini :", charac);
        return;
    }
    
    laDiv.innerHTML = `
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
}

function afficherData(data) {
    
    data.characters.forEach(user => {
        affichList.innerHTML += `
        <div class="user-card ${user.element}">
            <div class="user-photo">
                <img src="${user.picture}" alt="${user.name}" />
                <div class="user-nom">${user.name}</div>
            </div>
            <div class="user-info">
                <div class="user-zone">${user.zone}</div>
                <div class="user-weapon">${user.weapon}</div>
                <div class="user-elem">${user.element}</div>
            </div>
        </div>

        `;
    });
    
}

function getRandomCharacter() {
    if (!characBase || characBase.length === 0) 
    {
        console.log("Aucun personnage disponible.");
        return null;
    }
    
    const randInd1 = Math.floor(Math.random() * charac1.characters.length);
    const randInd2 = Math.floor(Math.random() * charac2.characters.length);
    const randInd3 = Math.floor(Math.random() * charac3.characters.length);
    const randInd4 = Math.floor(Math.random() * charac4.characters.length);
    const randIndB = Math.floor(Math.random() * bosses.characters.length);
    
    //const randomCharacter = characBase.characters.splice(randomIndex, 1)[0];
        
    const randChar1 = characBase.characters[randInd1];
    const randChar2 = characBase.characters[randInd2];
    const randChar3 = characBase.characters[randInd3];
    const randChar4 = characBase.characters[randInd4];
    const randBoss = bosses.characters[randIndB];
        
    // Supprimer le personnage de la liste
    //charac.splice(randomIndex, 1);

    afficherCharact(randChar1,persoA,img1P);
    afficherCharact(randChar2,persoB,img2P);
    afficherCharact(randChar3,persoC,img3P);
    afficherCharact(randChar4,persoD,img4P);
    afficherBoss(randBoss,bossCard);
}
    

btnPlay.addEventListener('click', () => {
    if (characBase) {
        getRandomCharacter();
    }
});

loadData();