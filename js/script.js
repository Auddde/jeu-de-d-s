// Points to reach to win
let toReach = 4;

// Objet Player
function Player (firstname, hand, global) {
    this.firstname = firstname
    this.hand = hand
    //this.round = round
    this.global = global
}

// Instances Players
var player1 = new Player ('Aude', 1, 0 )
var player2 = new Player ('Linh', 0, 0 )


// Div to display scores per players
let divScoreCurrentPlayer1 = document.getElementById('divScoreCurrentPlayer1')
let divScoreCurrentPlayer2 = document.getElementById('divScoreCurrentPlayer2')
let player1DivGlobal = document.getElementById('player1Global')
let player2DivGlobal = document.getElementById('player2Global')

// Joueur en cours, par défaut joueur 1
var divScoreCurrent = divScoreCurrentPlayer1 // div par defaut du joueur en cours, pour le current score
var activePlayerGlobal = player1.global //score global du joueur en cours
var activePlayer = player1.firstname //nom du joueur en cours
var playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score

// Start Game
function partie () {

    // Round tour à tour
    function play () {

        var toDisplay = 0; // Initialize toDisplay

        // Dice
        var dice = document.getElementById('dice') 

        // Roll the dice, value at random
        function getRandomInt(min, max) {
            min = Math.ceil(1);
            max = Math.floor(7);
            toDisplay = Math.floor(Math.random() * (max - min)) + min;
            console.log(`${activePlayer} a tiré : ${toDisplay} + ${activePlayerGlobal}`)
            divScoreCurrent.innerHTML = toDisplay // affiche dans le bloc chiffre du dé lancé
            //return toDisplay
        }

        // Recover dice value
            function recoverValue () {

                // Player1 plays
                if (player1.hand === 1) { 
                    // Add score to Player1 Global 
                    player1.global = player1.global + toDisplay
                    playerDivGlobal.innerHTML = player1.global // display in global div 
                    divScoreCurrent.innerHTML = 0 // current score at 0 
                    console.log(`Ancien score : ${player1.global} =   nouveau ${activePlayerGlobal} = ${toDisplay}`)

                
                    // changement de main 
                    /*
                    player1.hand = 0
                    player2.hand = 1
                    activePlayerGlobal = player2.global
                    activePlayer = player2.firstname
                    divScoreCurrent = divScoreCurrentPlayer2
                    playerDivGlobal = player2DivGlobal
                    console.log('linh doit jouer')*/
            } 

                /*
                // Player2 plays
                else {
                    console.log(`${player2.firstname} récupère ${activePlayerGlobal} `)
                    console.log(`cas 2 >>  player1.hand : ${player1.hand}/  player2.hand = ${player2.hand} `)
                    // Add score to Player1 Global 
                    player2.global = player2.global + toDisplay
                    playerDivGlobal.innerHTML = player2.global // display in global div 
                    divScoreCurrent.innerHTML = 0 // current score at 0                     
                    // changement de main
                    player1.hand = 1
                    player2.hand = 0
                    activePlayerGlobal = player1.global
                    activePlayer = player1.firstname
                    divScoreCurrent = divScoreCurrentPlayer1
                    playerDivGlobal = player1DivGlobal
                    console.log('aude doit jouer')
                }  
                
                */

                // Partie terminée 
                if  (player1.global > toReach) {
                    alert('Partie terminée !')
                } 
            }

            var recover = document.getElementById('recover')
            recover.addEventListener('click', recoverValue)

        // gaming pure : tour à tour
        function tour() {
            console.log('Aude : ' +player1.hand)
            console.log('Linh : ' +player2.hand)
            console.log ('joueur actif :' +activePlayer)

            if (activePlayerGlobal <= toReach) { 
                if (player1.hand == 1) { 
                    dice.addEventListener('click', getRandomInt)
                    console.log(`${activePlayer} doit jouer. (Aude ${player1.hand} - linh ${player2.hand}) `)
                } 
                if (player2.hand == 1) {
                    dice.addEventListener('click', getRandomInt)
                    console.log(`${activePlayer} doit jouer. (Aude ${player1.hand} - linh ${player2.hand}) `)
                }   
            } 
        }
        tour()
    }

    play()

    



}

partie()

console.log(test)