/*soit l'objet player 
=> .round (le score temporaire, initialisé à 0 à chaque tour.)
====> Le .round est arrété quand le user click sur Hold => s'ajoute à global
====> quand le user D = 1, alors global = 0
=> .global (qui est l'addition de tous les scores temporaires)

soit J1 joueur 1, une instance de player
soit J2 joueur 2, une instance de player

A qui de jouer ? player = 1, player2 = 2*/


let toReach = 4; // Points to reach to win : Game is done when player.global >= toReach

// soit l'objet player
function Player (firstname, hand, round, global) {
    this.firstname = firstname
    this.hand = hand
    this.round = 1
    this.global = 0
}

// fonction valeur du dé au hasard
// soit le dés compris de 1 à 6, at random. si 1 = global => 0
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

let d = (getRandomInt(1, 7));
console.log('le dé : ' +d)

// partie déroulé
    // pour le joueur ayant la main
    // tu choisis un nombre au hasard
    // ce nombre s'ajoute au global
    // la main change
    // tu reboucles

function partie () {
    let player1 = new Player ('Aude', 1 )
    let player2 = new Player ('Linh', 0 )
    console.log(player1)
    console.log(player2)

  
    function play () {
        let activePlayerGlobal = player1.global
        let activePlayer = player1.firstname

        while (activePlayerGlobal <= toReach) { 

            if (player1.hand == 1) { 
                player1.global++
                console.log(`${activePlayer} a ${player1.global} points`)
                player1.hand = 0
                player2.hand = 1
                activePlayerGlobal = player2.global
                activePlayer = player2.firstname
            } else {
                player2.global++
                console.log(`${activePlayer} a ${player2.global} points`)
                player1.hand = 1
                player2.hand = 0
                activePlayerGlobal = player1.global
                activePlayer = player1.firstname
            }    
        } 
    }
    play()

    if  ((player1.global > toReach) | (player2.global > toReach) ) {
        console.log('Partie terminée !')
    }

}

partie()
