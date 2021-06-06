

//Memory.html


let PokemonImages = [];

let PokemonGen1 = ["Bulbasaur.png", "Caterpie.png", "Charmeleon.png", "Gengar.png", "Ghost.png", "Gyarados.png", "Magikarp.png", "Mewtwo.png", "Nidoking.png", "Onix.png", "Pidgeot.png", "Pikachu.png", "Shiggy.png", "Weezing.png", "Zapdos.png", "Bulbasaur.png", "Caterpie.png", "Charmeleon.png", "Gengar.png", "Ghost.png", "Gyarados.png", "Magikarp.png", "Mewtwo.png", "Nidoking.png", "Onix.png", "Pidgeot.png", "Pikachu.png", "Shiggy.png", "Weezing.png", "Zapdos.png"];
let PokemonGen2 = ["Azumarill.png", "Chikorita.png", "Espeon.png", "Granbull.png", "Hooh.png", "Kingdra.png", "Lugia.png", "Mantine.png", "Miltank.png", "Porygon2.png", "Slugma.png", "Steelix.png", "Tryanitar.png", "Typhlosion.png", "Wobbuffet.png", "Azumarill.png", "Chikorita.png", "Espeon.png", "Granbull.png", "Hooh.png", "Kingdra.png", "Lugia.png", "Mantine.png", "Miltank.png", "Porygon2.png", "Slugma.png", "Steelix.png", "Tryanitar.png", "Typhlosion.png", "Wobbuffet.png"];
let PokemonGen3 = ["Absol.png", "Blaziken.png", "Gardevoir.png", "Groudon.png", "Kyogre.png", "Lunatone.png", "Mawile.png", "Metagross.png", "Minun.png", "Plusle.png", "Regice.png", "Regice.png", "Reptain.png", "Sableye.png", "Sharpedo.png", "Swellow.png", "Absol.png", "Blaziken.png", "Gardevoir.png", "Groudon.png", "Kyogre.png", "Lunatone.png", "Mawile.png", "Metagross.png", "Minun.png", "Plusle.png", "Regice.png", "Regice.png", "Reptain.png", "Sableye.png", "Sharpedo.png", "Swellow.png"];

let ShuffledPokemonImages = [];

let arrayOfCardIds = [];

let firstCardRevealed = 0;

let CardRevealed = 0;

let lifes = 0;

let EasyMode = "Easy";
let MediumMode = "Medium";
let HardMode = "Hard";

let modevalue = "Hard";
let genmode = "Gen1";

//game started html
let lifesHTML = '<div id="lifeshtmlId"><img id="lifesimg" src="https://fontmeme.com/permalink/210605/3cc35532ed01e7cd47cdc80d5367feb7.png" alt="pokemon-font"></div>'
let modeHTML = '<div id="modehtmlId"><img id="modeimg" src="https://fontmeme.com/permalink/210605/84d210e951f3f215a5acbd5a523dd731.png" alt="pokemon-font"></div>'
let gamediv = '<div id="myGame" class="allCards"></div>';

let peppa = 0

function Start() {
    var PlayTheme = new Audio('../Memory-Game/Audio/PokemonGameTheme.mp3');
    var EastereggTheme = new Audio('../Memory-Game/Audio/Numa_Numa_yay.mp3');

    if(peppa == 0){
        PlayTheme.play();
    } else {
        EastereggTheme.play();
    }
    

    //modevalue = document.getElementById("ModeDifficultySelect").value;

    document.body.innerHTML = " ";
    document.body.innerHTML += lifesHTML;
    document.body.innerHTML += modeHTML;
    document.body.innerHTML += gamediv;


    if(modevalue == "Easy"){
        lifes = 35;
    }

    if(modevalue == "Medium"){
        lifes = 20;
    }

    if(modevalue == "Hard"){
        lifes = 10;
    }

    document.getElementById("lifeshtmlId").innerHTML += lifes;
    document.getElementById("modehtmlId").innerHTML += modevalue;


    if(genmode == "Gen1"){
        PokemonImages = PokemonGen1;
    }

    if(genmode == "Gen2"){
        PokemonImages = PokemonGen2;
    }

    if(genmode == "Gen3"){
        PokemonImages = PokemonGen3;
    }


    for (; PokemonImages.length > 0;) {
        let randomPokemonImage = Math.floor(Math.random() * PokemonImages.length);
        ShuffledPokemonImages.push(PokemonImages[randomPokemonImage])
        PokemonImages.splice(randomPokemonImage, 1)

    }
    PokemonImages = ShuffledPokemonImages;


    for (let i = 0; i < PokemonImages.length; i++) {
        let newImage = document.createElement("img");
        newImage.src = "../Memory-Game/Images/CardBack.PNG";
        newImage.id = "CardNo" + i;
        arrayOfCardIds.push(newImage.id);
        newImage.classList.add("oneCard");
        document.getElementById("myGame").append(newImage);
        newImage.addEventListener("click", function () { cardClicked(newImage.id, i); });
    }
}

function cardClicked(idOfClickedCard, PokemonIndex) {


    if (idOfClickedCard != firstCardRevealed && CardRevealed != 2) {
        document.getElementById(idOfClickedCard).src = "../Memory-Game/Images/Gens/" + PokemonImages[PokemonIndex];
        CardRevealed++;
        if (CardRevealed == 1) firstCardRevealed = idOfClickedCard;

        var cardClickedAudio = new Audio('../Memory-Game/Audio/Pokemon_(A_Button).mp3');
        cardClickedAudio.play();

        if (CardRevealed == 2) {
            let imageNameOffFirstCard = document.getElementById(firstCardRevealed).src;
            let imagesNameOffSecondCard = document.getElementById(idOfClickedCard).src;
            if (imageNameOffFirstCard == imagesNameOffSecondCard) {
                for (let i = 0; i < arrayOfCardIds.length; i++) {
                    if (arrayOfCardIds[i] == firstCardRevealed) {
                        arrayOfCardIds.splice(i, 1)
                        i--;
                    }

                    if (arrayOfCardIds[i] == idOfClickedCard) {
                        arrayOfCardIds.splice(i, 1)
                        i--;
                    }
                }


                lifes++;
            }


            lifes--;
            document.getElementById("lifeshtmlId").innerHTML = lifesHTML + lifes;

            setTimeout(function () {
                putAllImageBack();   //Q try to change this
            }, 1000);
        }
    }

}

function putAllImageBack() {

    if (arrayOfCardIds.length == 0) {
        window.location.href = 'Win.html';
    }

    if (lifes == 0) {
        window.location.href = 'GameOver.html';
    }

    for (CardIds of arrayOfCardIds) {
        document.getElementById(CardIds).src = "../Memory-Game/Images/CardBack.PNG";
        firstCardRevealed = 0;
        CardRevealed = 0;
    }
}


function easymode() {
    modevalue = "Easy";
    genmodeclear();
}

function mediummode() {
    modevalue = "Medium";
    genmodeclear();
}

function hardmode() {
    modevalue = "Hard";
    genmodeclear();
}

//gen choosing

//let genHTMLtext = ;
//let gendivimg = '<div id="gendivimg"> </div>'
let gen1HTML = '<img onclick="gen1mode();" id="gen1" src="../Memory-Game/Images/Gen%20images/gen1.jpg"></img>';
let gen2HTML = '<img onclick="gen2mode();" id="gen2" src="../Memory-Game/Images/Gen%20images/gen2.jpg"></img>';
let gen3HTML = '<img onclick="gen3mode();" id="gen3" src="../Memory-Game/Images/Gen%20images/gen3.jpg"></img>';

function genmodeclear() {
    document.body.innerHTML = " ";
    document.body.innerHTML += gen1HTML;
    document.body.innerHTML += gen2HTML;
    document.body.innerHTML += gen3HTML;
}

function gen1mode() {
    genmode = "Gen1";
    Start();
}

function gen2mode() {
    genmode = "Gen2";
    Start();

}

function gen3mode() {
    genmode = "Gen3";
    Start();
}