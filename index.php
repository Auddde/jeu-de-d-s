<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/style.css" rel="stylesheet">
    <title>Combat de coqs</title>
    <meta name="description" content="Bienvenue dans l'arène des Maïs, où s'affrontent les plus redoutables coqs de la basse-cour !">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
    <link rel="icon" href="favicon.ico" />
</head>
<body>
    <header class="container-fluid">
        <div class="col-start-1 col-end-13 position-relative">
            <div class="flex justifycontent-center">
                <img src="images/logo.gif" class="logo">
                <h1>Combat de coqs</h1>
            </div>
            <span class="slogan">Picore 20 maïs pour devenir le roi de la basse-cour !</span><br>
            <button class= "btn-new" id="btnNew">+ Nouvelle partie</button>
        </div>
    </header>

    <div class="winner flex justifycontent-center alignitems-center" id="winner">
        <div class="winner-modal textalign-center">
            <img src="images/couronne.png" class="couronne"><br>
            <h1>Gloire au roi des poulets</h1>
            <div class="winnerName" id="winnerName"></div><br>
            <button id="btnNew2" class="margin-t15">+ Nouvelle partie</button>
        </div>
    </div>

    <div class="container-fluid flex justifycontent-center alignitems-center game" id="pregame">
            <div class="textalign-center alignitems-center pregame">
                <h2>Nouvelle partie</h2>
                <form id="form">
                    <div id="error" class="error"></div>
                    <fieldset>
                        <legend>Poulet 1</legend>
                        <label for="name">Nom</label><br>
                        <input type="text" name="name" id="name1" required minlength="4" maxlength="8" class="margin-b15"><br>
                        Choisis ton piaf<br>
                        <label>
                            <input type="radio" name="volaille1" value="poulet1" checked>
                            <img src="images/avatar1.gif" class="thumbnail">
                        </label>
                        
                        <label>
                            <input type="radio" name="volaille1" value="poulet2">
                            <img src="images/avatar2.gif"  class="thumbnail">
                        </label> 
                        
                        <label>
                            <input type="radio" name="volaille1" value="poulet3">
                            <img src="images/avatar3.gif"  class="thumbnail">
                        </label>           
                    </fieldset>    
                    <fieldset>
                        <legend>Poulet 2</legend>
                        <label for="name">Nom</label><br>
                        <input type="text" name="name" id="name2" required minlength="4" maxlength="8" class="margin-b15"><br>

                        <span style="margin-top:200px">Choisis ton piaf</span><br>
                        <label>
                            <input type="radio" name="volaille2" value="poulet1">
                            <img src="images/avatar1.gif" class="thumbnail">
                        </label>
                        
                        <label>
                            <input type="radio" name="volaille2" value="poulet2" checked>
                            <img src="images/avatar2.gif" class="thumbnail">
                        </label> 
                        
                        <label>
                            <input type="radio" name="volaille2" value="poulet3">
                            <img src="images/avatar3.gif" class="thumbnail">
                        </label>           
                    </fieldset>      
                </form>
                <button class="btn-startgame" id="startGame">Commencer la partie</button>
            </div>
    </div> 

    <div class="container-fluid flex position-relative screens game justifycontent-center" id="game">
        <div class="screen flex justifycontent-center alignitems-center">
            <div class="textalign-center poulet-section"> 
                <h2 id="player1"></h2>
                <div class="total-player"  id="player1Global">0</div>
                <div id="avatar1"></div>
            </div>
        </div>
        <div class="screen flex justifycontent-center alignitems-center ">
            <div class="textalign-center poulet-section">
                <h2 id="player2"></h2>
                <div class="total-player" id="player2Global">0</div>
                <div id="avatar2"></div>
            </div>
        </div>
        <div class="interactive-game">
                <button id="dice">
                    <div class="triangle1 triangle" id="triangle1"></div>
                    <div class="triangle2 triangle" id="triangle2"></div>
                    <div class="instructions">
                        <div id="prenomCurrent"></div>
                        Lance le dés !
                    </div>
                    <div class="des dice" id="diceImage">
                    </div>
                </button>
                <div id="divInteractions">
                    <div class="or" id="or">
                        <b>ou</b>
                    </div>
                    <button id="recover">
                        <span id="divScoreCurrent"></span>
                    </button>
                </div>        
        </div>
    </div> 

    <script src="script.js"></script>
    <noscript><p>Merci d'activer Javasript !</p></noscript>
</body>
</html> 