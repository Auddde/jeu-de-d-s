// Points to reach to win
let toReach = 20;

// Objet Player
function Player (firstname, hand, global) {
    this.firstname = firstname
    this.hand = hand
    this.global = global
}

// Instances Players dans mon tableau 
let players =  [ 
    new Player ('Aude', 1, 0 ), 
    new Player ('Linh', 0, 0 )
]

// Div to display scores and name per players
let divScoreCurrent = document.getElementById('divScoreCurrent')
let player1DivGlobal = document.getElementById('player1Global')
let player2DivGlobal = document.getElementById('player2Global')
let prenomDivCurrent = document.getElementById('prenomCurrent')
let cursorDiv1 = document.getElementById('triangle1')
let cursorDiv2 = document.getElementById('triangle2')
let player1Name = document.getElementById('player1')
let player2Name = document.getElementById('player2')

//Affichage des prénoms
player1Name.innerHTML = players[0].firstname
player2Name.innerHTML = players[1].firstname

// Start with player 1
var playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score
prenomCurrent = players[0].firstname
prenomDivCurrent.innerHTML = prenomCurrent
cursorDiv2.style.display = 'none';
// Button recover :  not displayed before playing
let divInteractions = document.getElementById('divInteractions')
divInteractions.style.display = "none"; 
let or = document.getElementById('or')

// Start Game
function partie () {

        // Dice init
        var dice = document.getElementById('dice') 
        var currentDice = 0 // Initialize current score dice for the current player 
        var diceImage = document.getElementById('diceImage')  
        diceImage.innerHTML = `<img src="images/dice-0.png" class="imageDice">`
        
        // Roll the dice
        function getRandomInt(min, max) { // Roll the dice, value at random

            divInteractions.style.display = "block"; 

            currentDice = 0;
            min = Math.ceil(1);
            max = Math.floor(7);
            currentDice = Math.floor(Math.random() * (max - min)) + min; 
            // Affichage
            function imageDisplay (e) {
                var content = `<img src="images/dice-${e}.png" class="imageDice">`
                diceImage.innerHTML = content
            }
            imageDisplay(currentDice)

            currentDice === 1 ? wordingRecover = `Libère tes maïs !` : wordingRecover = `Récupère ces <b>${currentDice} </b>maïs`
            currentDice === 1 ? wordingRecover = `Libère tes maïs !` : wordingRecover = `Récupère ces <b>${currentDice} </b>maïs`
            if (currentDice === 1) { or.style.display = "none"; } else {or.style.display = "block";}
            divScoreCurrent.innerHTML = wordingRecover

            // 1 ! 
            if (currentDice === 1) {
                diceImage.innerHTML = `<img src="images/dice-1.png" class="imageDice">`
                dice.removeEventListener('click', getRandomInt); //éviter la triche en recliquant
            }
        }

        dice.addEventListener('click', getRandomInt)

        // Recover dice value
        function recoverValue () {

                // je défini l'index de mon player en cours
                playerGo = players.map(function(e) { return e.hand; }).indexOf(1);
                playerWait = players.map(function(e) { return e.hand; }).indexOf(0);
                // je defini les div en cours
                players[0].hand === 1 ? playerDivGlobal = player1DivGlobal : playerDivGlobal = player2DivGlobal 
                // ajout du score
                if (currentDice === 1) {
                    players[playerGo].global = 0 
                    dice.addEventListener('click', getRandomInt)
                } else {
                    players[playerGo].global = players[playerGo].global + currentDice
                }
                playerDivGlobal.innerHTML = players[playerGo].global // display in global div 

                //A DEGAGER =>divScoreCurrent.innerHTML = 0 // current score at 0  
                divInteractions.style.display = "none"; 

                // changement de main 
                if (playerGo == 0) {
                    cursorDiv1.style.display = 'none'; 
                    cursorDiv2.style.display = 'block';
                } else {
                    cursorDiv1.style.display = 'block'; 
                    cursorDiv2.style.display = 'none';                    
                }
                players[playerGo].hand = 0
                players[playerWait].hand = 1
                prenomDivCurrent.innerHTML = players[playerWait].firstname
                diceImage.innerHTML = `<img src="images/dice-0.png" class="imageDice">`
                currentDice = 0 // reinitialize le dé
       
            // Done
            if  ( (players[0].global > toReach) || (players[1].global > toReach)) {
                alert('Partie terminée !')
            } 
        }

        var recover = document.getElementById('recover')
        recover.addEventListener('click', recoverValue)
}
partie()
