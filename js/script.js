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
// Start with player 1
var playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score

// Start Game
function partie () {

        // Dice init
        var dice = document.getElementById('dice') 
        var currentDice // Initialize current score dice for the current player 
        var diceImage = document.getElementById('diceImage')  
        
        // Roll the dice
        function getRandomInt(min, max) { // Roll the dice, value at random
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
            divScoreCurrent.innerHTML = currentDice
            // 1 ! 
            if (currentDice === 1) {
                recoverValue(1)
            }
        }
        dice.addEventListener('click', getRandomInt)

        // Recover dice value
        function recoverValue (i) {

                // je défini l'index de mon player en cours
                playerGo = players.map(function(e) { return e.hand; }).indexOf(1);
                playerWait = players.map(function(e) { return e.hand; }).indexOf(0);
                // je defini les div en cours
                players[0].hand === 1 ? playerDivGlobal = player1DivGlobal : playerDivGlobal = player2DivGlobal 
                // ajout du score
                i === 1 ? players[playerGo].global = 0 : players[playerGo].global = players[playerGo].global + currentDice 
                playerDivGlobal.innerHTML = players[playerGo].global // display in global div 
                divScoreCurrent.innerHTML = 0 // current score at 0 
                // changement de main 
                players[playerGo].hand = 0
                players[playerWait].hand = 1
            
            // Done
            if  (players[0].global > toReach) {
                alert('Partie terminée !')
            } 
        }

        var recover = document.getElementById('recover')
        recover.addEventListener('click', recoverValue)

}
partie()
