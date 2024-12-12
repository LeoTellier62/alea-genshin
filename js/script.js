let characBase = null;

let charac1;
let charac2;
let charac3;
let charac4;

const btnPlay = document.getElementById("btn-play");
const affichList = document.getElementById('list-charac');
const persoA = document.getElementById('perso1');
const persoB = document.getElementById('perso2');
const persoC = document.getElementById('perso3');
const persoD = document.getElementById('perso4');

// Charger le fichier JSON
async function loadData() {
    try {
        const response = await fetch('/js/characters.json');
        characBase = await response.json();
        charac1 = characBase;
        charac2 = characBase;
        charac3 = characBase;
        charac4 = characBase;
        console.log("Données des personnages chargées :", characBase);
    
    } catch (error) {
        console.error("Erreur lors du chargement des personnages :", error);
    }
}


// Fonction pour afficher un personnage dans une div spécifique
function afficherCharact(charac, laDiv) {
    if (!charac) 
    {
        console.error("Personnage non défini :", charac);
        return;
    }
    
    laDiv.innerHTML = `
        <div class="user">
            <div class="user-photo">
            <img src="${charac.picture}" alt="${charac.name}" />
            </div>
            <div class="user-nom">${charac.name}</div>
            <div class="user-zone">${charac.zone}</div>
            <div class="user-weapon">${charac.weapon}</div>
            <div class="user-elem">${charac.element}</div>
        </div>
        `;
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
    
    //const randomCharacter = characBase.characters.splice(randomIndex, 1)[0];
        
    const randChar1 = characBase.characters[randInd1];
    const randChar2 = characBase.characters[randInd2];
    const randChar3 = characBase.characters[randInd3];
    const randChar4 = characBase.characters[randInd4];
        
    // Supprimer le personnage de la liste
    //charac.splice(randomIndex, 1);

    afficherCharact(randChar1,persoA);
    afficherCharact(randChar2,persoB);
    afficherCharact(randChar3,persoC);
    afficherCharact(randChar4,persoD);
}
    

btnPlay.addEventListener('click', () => {
    if (characBase) {
        getRandomCharacter();
    }
});

loadData();