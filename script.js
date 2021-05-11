var pregame = document.getElementById('pregame')
var game = document.getElementById('game')
game.style.display = 'none';

var btnNew = document.getElementById('btnNew')
btnNew.style.display ='none';

var winner = document.getElementById('winner')
var winnerName = document.getElementById('winnerName')
winner.style.display = 'none';

/* ////////////////////////////////   PREGAMING CODE  ///////////////////////////////////////// */
var startGame = document.getElementById('startGame')
startGame.addEventListener('click', pregaming)

error.style.display = 'none';

var name1Form
var name2Form

function pregaming () {

    game.style.display = 'none';
    btnNew.style.display ='none';

    name1Form = document.getElementById('name1').value
    name2Form = document.getElementById('name2').value

    var radios1 = document.getElementsByName('volaille1');

    for(var i = 0; i < radios1.length; i++){
        if(radios1[i].checked){
            poulet1 = radios1[i].value;
        }
    }

    var radios2 = document.getElementsByName('volaille2');
    for(var i = 0; i < radios2.length; i++){
        if(radios2[i].checked) {
            poulet2 = radios2[i].value;
        }
    }

    // Formular validation
    var error = document.getElementById('error')

    if ((name1Form.length < 3) || (name2Form.length < 3)  || (poulet1 === false ) || (poulet2 === false))  {
        error.style.display = 'block';
        error.style.backgroundColor = "#fce6e6";
        error.innerHTML='Nomme toi Poulet !<br>(entre 2 et 10 caractères)<br>'
    }
    else {
        pregame.style.display = 'none';
        partie ()
    }
}

/* ////////////////////////////////   GAMING CODE  ///////////////////////////////////////// */
// Start Game
function partie () {
        game.style.display = '';
                    
        // Points to reach to win
        let toReach = 20;

        // Objet Player
        function Player (firstname, hand, global) {
            this.firstname = firstname
            this.hand = hand
            this.global = global
        }

        // Instances Players in Array 
        let players =  [ 
            new Player (name1Form, 1, 0 ), 
            new Player (name2Form, 0, 0 )
        ]
     
        // Div to display scores and name/avatar per players
        let divScoreCurrent = document.getElementById('divScoreCurrent')
        let player1DivGlobal = document.getElementById('player1Global')
        let player2DivGlobal = document.getElementById('player2Global')
        let prenomDivCurrent = document.getElementById('prenomCurrent')
        let cursorDiv1 = document.getElementById('triangle1')
        let cursorDiv2 = document.getElementById('triangle2')
        let player1Name = document.getElementById('player1')
        let player2Name = document.getElementById('player2')
        let avatar1 = document.getElementById('avatar1')
        let avatar2 = document.getElementById('avatar2')

        //display firstnames and avatars
        player1Name.innerHTML = players[0].firstname
        player2Name.innerHTML = players[1].firstname
        avatar1.innerHTML = `<img src="images/${poulet1}.jpg" class="avatar">`
        avatar2.innerHTML = `<img src="images/${poulet2}.jpg" class="avatar">`

        // Start with player 1
        var playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score
        prenomCurrent = players[0].firstname
        prenomDivCurrent.innerHTML = prenomCurrent
        cursorDiv2.style.display = 'none';
        // Button recover :  not displayed before playing
        let divInteractions = document.getElementById('divInteractions')
        divInteractions.style.display = "none"; 
        let or = document.getElementById('or')

        // Dice init
        var dice = document.getElementById('dice') 
        var currentDice = 0 // Initialize current score dice for the current player 
        var diceImage = document.getElementById('diceImage')  
        diceImage.innerHTML = `<img src="images/dice-0.png" class="imageDice">`
        
        // Roll the dice
        function getRandomInt(min, max) { // Roll the dice, value at random

            divInteractions.style.display = "block"; 
            // at random
            currentDice = 0;
            min = Math.ceil(1);
            max = Math.floor(7);
            currentDice = Math.floor(Math.random() * (max - min)) + min; 
            // display the dice image
            function imageDisplay (e) {
                var content = `<img src="images/dice-${e}.png" class="imageDice">`
                diceImage.innerHTML = content
            }
            imageDisplay(currentDice)
            // display correct text
            currentDice === 1 ? wordingRecover = `Libère tes maïs !` : wordingRecover = `Récupère ces <b>${currentDice} </b>maïs`
            currentDice === 1 ? wordingRecover = `Libère tes maïs !` : wordingRecover = `Récupère ces <b>${currentDice} </b>maïs`
            if (currentDice === 1) { or.style.display = "none"; } else {or.style.display = "block";}
            divScoreCurrent.innerHTML = wordingRecover
            // 1 ! Free corns !
            if (currentDice === 1) {
                diceImage.innerHTML = `<img src="images/dice-1.png" class="imageDice">`
                dice.removeEventListener('click', getRandomInt); //éviter la triche en recliquant
            }
        }
        dice.addEventListener('click', getRandomInt)

        // Recover dice value
        function recoverValue () {
                // Index of current player
                playerGo = players.map(function(e) { return e.hand; }).indexOf(1);
                playerWait = players.map(function(e) { return e.hand; }).indexOf(0);
                // what are the current div
                players[0].hand === 1 ? playerDivGlobal = player1DivGlobal : playerDivGlobal = player2DivGlobal 
                // add the score
                if (currentDice === 1) {
                    players[playerGo].global = 0 
                    dice.addEventListener('click', getRandomInt)
                } else {
                    players[playerGo].global = players[playerGo].global + currentDice
                }
                playerDivGlobal.innerHTML = players[playerGo].global // display in global div 

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
    
            // Want a new game !
            btnNew.style.display ='';

            function wantANewGame() {
                error.style.backgroundColor = "white";
                error.innerHTML=''
                var form = document.getElementById('form')
                form.reset() // formulaire pregame reset
                winner.style.display = 'none';
                btnNew.style.display = 'none';
                pregame.style.display = '';
                game.style.display = 'none';
                currentDice = 0
                players[playerGo].global = 0
                players[playerWait].global = 0
                player1DivGlobal.innerHTML = 0
                player2DivGlobal.innerHTML = 0
            }
            btnNew.addEventListener('click', wantANewGame ) 
            
            // Done
            if  ( (players[0].global > toReach) || (players[1].global > toReach)) {
                winner.style.display =''
                players[0].global > toReach ? winnerName.innerHTML = players[0].firstname : winnerName.innerHTML = players[1].firstname
                let btnNew2 = document.getElementById('btnNew2')
                btnNew2.addEventListener('click', wantANewGame)
            }
        }

        var recover = document.getElementById('recover')
        recover.addEventListener('click', recoverValue)
}

