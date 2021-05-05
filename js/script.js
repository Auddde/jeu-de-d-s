// Points to reach to win
let toReach = 20;

// Objet Player
function Player (firstname, hand, global) {
    this.firstname = firstname
    this.hand = hand
    //this.round = round
    this.global = global
}

// Instances Players dans mon tableau 
let players =  [ 
    new Player ('Aude', 1, 0 ), 
    new Player ('Linh', 1, 0 )
]

// Div to display scores per players
let divScoreCurrentPlayer1 = document.getElementById('divScoreCurrentPlayer1')
let divScoreCurrentPlayer2 = document.getElementById('divScoreCurrentPlayer2')
let player1DivGlobal = document.getElementById('player1Global')
let player2DivGlobal = document.getElementById('player2Global')

// Start with player 1
var divScoreCurrent = divScoreCurrentPlayer1 // div par defaut du joueur en cours, pour le current score
var activePlayerGlobal = players[0].global //score global du joueur en cours
var activePlayer = players[0].firstname //nom du joueur en cours
var playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score

// Start Game
function partie () {

    // Round tour à tour
    function play () {

        // Dice init
        var dice = document.getElementById('dice') 
        var currentDice = 0;   // Initialize current score dice for the current player   
        
        // Roll the dice
        function getRandomInt(min, max) { // Roll the dice, value at random
            min = Math.ceil(1);
            max = Math.floor(7);
            currentDice = Math.floor(Math.random() * (max - min)) + min;
            divScoreCurrent.innerHTML = currentDice 
        }

        // Recover dice value
            function recoverValue () {

                // Player1 plays
                if (players[0].hand === 1) { 
                    // Add score to Player1 Global 
                    players[0].global = players[0].global + currentDice
                    playerDivGlobal.innerHTML = players[0].global // display in global div 
                    divScoreCurrent.innerHTML = 0 // current score at 0 
                    // changement de main       
                    players[0].hand = 0
                    players[1].hand = 1
                    activePlayerGlobal = players[1].global
                    activePlayer = players[1].firstname
                    divScoreCurrent = divScoreCurrentPlayer2
                    playerDivGlobal = player2DivGlobal
                } 

                // Player2 plays
                else {
                    // Add score to Player1 Global 
                    players[1].global = players[1].global + currentDice
                    playerDivGlobal.innerHTML = players[1].global // display in global div 
                    divScoreCurrent.innerHTML = 0 // current score at 0                     
                    // changement de main
                    players[0].hand = 1
                    players[1].hand = 0
                    activePlayerGlobal = players[0].global
                    activePlayer = players[0].firstname
                    divScoreCurrent = divScoreCurrentPlayer1
                    playerDivGlobal = player1DivGlobal
                }  
              
                // Done
                if  (players[0].global > toReach) {
                    alert('Partie terminée !')
                } 
            }

            var recover = document.getElementById('recover')
            recover.addEventListener('click', recoverValue)

        // gaming : tour à tour
        function tour() {
            if (activePlayerGlobal <= toReach) { 
                if (players[0].hand == 1) { 
                    dice.addEventListener('click', getRandomInt)
                } 
                if (players[1].hand == 1) {
                    dice.addEventListener('click', getRandomInt)
                }   
            } 
        }
        tour()
    }
    play()
}
partie()
