/* ////////////////////////////////   VARIABLES  /////////////////////////////////////////////////// */

// parameters
var toReach = 99;

// 3 steps : game, pregame and winner
var pregame = document.getElementById('pregame') 

var game = document.getElementById('game')  
game.style.display = 'none';

var winner = document.getElementById('winner')
var winnerName = document.getElementById('winnerName')
winner.style.display = 'none';

//Values of pre-gaming formular (thumbnails)
var radios1
var radios2

// Players initializing
function Player (firstname, hand, global) {
    this.firstname = firstname
    this.hand = hand
    this.global = global
}
var players =  [ 
    new Player ('joueur1', 1, 0 ), 
    new Player ('joueur2', 0, 0 )
]

//buttons
var startGame = document.getElementById('startGame') // to send pregaming form
startGame.addEventListener('click', pregaming)

var btnNew = document.getElementById('btnNew') // for new game
btnNew.style.display ='none';
var btnNew2 = document.getElementById('btnNew2')

var divInteractions = document.getElementById('divInteractions') // interactions block
var or = document.getElementById('or')

var recover = document.getElementById('recover') // recover my points

// players gaming personnalization : name, thumbnail, current score per players
var divScoreCurrent
var player1DivGlobal
var player2DivGlobal
var prenomDivCurrent 
var cursorDiv1 
var cursorDiv2 
var player1Name 
var player2Name
var avatar1 
var avatar2 
var playerDivGlobal // div par défaut du joueur en cours pour le global score

// Items
var dice = document.getElementById('dice') 
var currentDice // current score dice 
var diceImage = document.getElementById('diceImage')  
     



/* ////////////////////////////////   PREGAMING CODE  ///////////////////////////////////////////// */

error.style.display = 'none';

function pregaming () { // values of the form and send them
    // Not displayed
    game.style.display = 'none';
    btnNew.style.display ='none';
    // Values for players
    players[0].firstname = document.getElementById('name1').value
    players[1].firstname = document.getElementById('name2').value
    players[0].global = 0
    players[1].global = 0
    players[0].hand = 1
    players[1].hand = 0

    radios1 = document.getElementsByName('volaille1');
    for(let i = 0; i < radios1.length; i++){
        if(radios1[i].checked){
            poulet1 = radios1[i].value;
        }
    }
    radios2 = document.getElementsByName('volaille2');
    for(let i = 0; i < radios2.length; i++){
        if(radios2[i].checked) {
            poulet2 = radios2[i].value;
        }
    }
    // Verification ok or not ok
    if ((players[0].firstname.length < 3) || (players[1].firstname.length < 3)  || (poulet1 === false ) || (poulet2 === false))  {
        issuesDisplay()
    }
    else {
        pregame.style.display = 'none';
        game.style.display = '';
        partie()
    }
}

function issuesDisplay () { // Display issues if formular not validated
    var error = document.getElementById('error')
    error.style.display = 'block';
    error.style.backgroundColor = "#fce6e6";
    error.innerHTML='Nomme toi Poulet !<br>(entre 2 et 10 caractères)<br>'
}



/* ////////////////////////////////   GAMING CODE  //////////////////////////////////////////////// */

function partie () { // Init the game if form is validated !

    btnNew.style.display ='';
    // Div to display personnalized informations :  scores and name/avatar per players
    divScoreCurrent = document.getElementById('divScoreCurrent')
    player1DivGlobal = document.getElementById('player1Global')
    player2DivGlobal = document.getElementById('player2Global')
    prenomDivCurrent = document.getElementById('prenomCurrent')
    cursorDiv1 = document.getElementById('triangle1')
    cursorDiv2 = document.getElementById('triangle2')
    player1Name = document.getElementById('player1')
    player2Name = document.getElementById('player2')
    avatar1 = document.getElementById('avatar1')
    avatar2 = document.getElementById('avatar2')

    //display firstnames and avatars
    player1Name.innerHTML = players[0].firstname
    player2Name.innerHTML = players[1].firstname
    avatar1.innerHTML = `<img src="images/${poulet1}.jpg" class="avatar">`
    avatar2.innerHTML = `<img src="images/${poulet2}.jpg" class="avatar">`

    // Start with player 1
    playerDivGlobal = player1DivGlobal // div par défaut du joueur en cours pour le global score
    prenomCurrent = players[0].firstname
    prenomDivCurrent.innerHTML = prenomCurrent
    cursorDiv2.style.display = 'none';

    // Button recover :  not displayed before playing
    divInteractions.style.display = "none"; 

    // Dice init
    currentDice = 0 // Initialize current score dice for the current player 
    diceImage.innerHTML = `<img src="images/dice-0.png" class="imageDice">`       
}

function getRandomInt(min, max) {  // Roll the dice at random             
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

function recoverValue () { // Recover dice value
    console.log('ça joue')
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

    // Change of player
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

    // Done : there is a winner
    if  ( (players[0].global > toReach) || (players[1].global > toReach)) {
        winner.style.display =''
        players[0].global > toReach ? winnerName.innerHTML = players[0].firstname : winnerName.innerHTML = players[1].firstname
        btnNew2.addEventListener('click', wantANewGame)
    }    
} 

function wantANewGame() { // Want a new game !
    currentDice = 0
    error.style.backgroundColor = "white";
    error.innerHTML=''
    var form = document.getElementById('form')
    form.reset() // formulaire pregame reset
    winner.style.display = 'none';
    btnNew.style.display = 'none';
    pregame.style.display = '';
    game.style.display = 'none';
    player1DivGlobal.innerHTML = 0
    player2DivGlobal.innerHTML = 0
}

dice.addEventListener('click', getRandomInt)
recover.addEventListener('click', recoverValue)
btnNew.addEventListener('click', wantANewGame ) 

