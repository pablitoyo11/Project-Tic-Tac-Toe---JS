
let domElements = {

    boardPositionsAll : document.querySelectorAll(".boardposition"),
    gameStartBtn : document.querySelector(".gameStart"),
    gameAddPlayerAll : document.querySelectorAll(".gameAddPlayer"),
    gameAddPlayerNameAll : document.querySelectorAll(".gameAddPlayerName"),
    
    player1Score : document.querySelector(".player1Score"),
    player2Score : document.querySelector(".player2Score"),

    player1Name: document.querySelectorAll(".gameAddPlayerName")[0].value,
    player2Name: document.querySelectorAll(".gameAddPlayerName")[1].value,
};



function createPlayer (userNameInput){
    const playerName = userNameInput;
    let score = 0;
    const getPlayerName = () => {return (playerName)};
    const increaseScore = () => ++score;
    const getScore = () => {return (score)}
    return { getPlayerName, increaseScore, getScore }
};

let players = [
    createPlayer("Player 1"),
    createPlayer("Player 2"),
];

// default game is created with default players
let defaultgame=boardControlInit();
defaultgame.startGame();
//buttons event listener activate
buttonControl ();


   
function boardControlInit (){
    const gameBoardCreate = ()=> (Array(3).fill().map(()=>Array(3).fill(null)));
    gameBoard = gameBoardCreate();
    const cross="cross"; 
    const circle="circle";

    
    let playerX = {
        playerInfo : players[0],
        playerIcon : cross,
    };
    let playerO = {
        playerInfo : players[1],
        playerIcon : circle,
    };

    const startGame = () =>{
        defaultgame.resetGame();
        //if players were not created and is undefined then use default players
        if (players[0]===undefined){  
            players[0]=createPlayer("Player 1");
        }
        if (players[1]===undefined){  
            players[1]=createPlayer("Player 2");
        }
        playerX.playerInfo=players[0];
        playerO.playerInfo=players[1];
    };




    //const cross and circle made this way so it can be changed in the future, with alternative options or user desired element 



    console.log("players:",playerX.playerInfo.getPlayerName(), " vs ", playerO.playerInfo.getPlayerName());
    
    let turn=0;
    const turnPlayed = (x,y) => {

        if (turn % 2 === 0) {
            playerPlaying=playerX.playerIcon;
        } 
        else {
            playerPlaying=playerO.playerIcon;
        };

        if (turn==9) {
            alert("Game over!");
        }
        else{
            if (gameBoard[x][y] == null) {
            //turn sum if it's valid position and doesn't sum if it's an invalid position
                turn++;
                gameBoard[x][y] = playerPlaying;
            }
            else{                
                alert("that's not a valid position!!");
            }
        }

        if (turn>4 && turn<9){
            let  gameWinner =checkWinner(x,y);
            if (gameWinner!=null) {
                gameWinner.playerInfo.increaseScore();
                
                let gameWinnerPlayerName = gameWinner.playerInfo.getPlayerName();
               //console.log(gameWinner.playerInfo.getPlayerName());
               //console.log(playerX.playerInfo.getPlayerName());
               //console.log(players[0].getPlayerName());
                let gameWinnerPlayerIcon = gameWinner.playerIcon;
                let gameWinnerScore=gameWinner.playerInfo.getScore();
                //console log is showing properly but alert is not showing variables (alert must use "+" not ",")
               // console.log("The winner is ",gameWinnerPlayerName," using ",gameWinnerPlayerIcon," their new score is ",gameWinnerScore);
                alert("The winner is "+gameWinnerPlayerName+" using "+gameWinnerPlayerIcon+" their new score is "+gameWinnerScore);
                turn=9; //block all positions and emulate a full board
            }
        }
        renderBoard();
    }
  //  const placeCross = (x,y) => {
  //      (gameBoard[x][y] == null) ? gameBoard[x][y] =  cross : alert("that's not a valid position!!");
  //  }
  //  const placeCircle = (x,y) => {
  //      (gameBoard[x][y] == null) ? gameBoard[x][y] =  circle : alert("that's not a valid position!!");
  //  }//need to reset turn
  //  
    const getBoardStatus = ()=> {return structuredClone(gameBoard)};
    const resetGame = ()=> {
        gameBoard= gameBoardCreate();
        turn=0;
        renderBoard();
    }
    
    //checking winner according to last position used
    const checkWinner =(x,y) => {
        let countX=0;
        let countO=0;
        let activeBoard=getBoardStatus();
        //check column
        for (let index = 0; index <= 2; index++) {
            if (activeBoard[x][index]==cross) countX++;
            if (activeBoard[x][index]==circle) countO++;
        }
        if (countX==3) return playerX;
        if (countO==3) return playerO;
         countX=0;
         countO=0;
        //check row
        for (let index = 0; index <= 2; index++) {
            if (activeBoard[index][y]==cross) countX++;
            if (activeBoard[index][y]==circle) countO++;
        }
        if (countX==3) return playerX;
        if (countO==3) return playerO;
         countX=0;
         countO=0;
        //check diagonals
        if (x==0&&y==0 || x==0&&y==2 || x==1&&y==1 || x==2&&y==0 || x==2&&y==2 ){
            //diagonal
            for (let index = 0; index <= 2; index++) {
                if (activeBoard[index][index]==cross) countX++;
                if (activeBoard[index][index]==circle) countO++;
            }
            if (countX==3) return playerX;
            if (countO==3) return playerO;
             countX=0;
             countO=0;
            //antidiagonal
            for (let index = 0; index <= 2; index++) {
                if (activeBoard[index][2-index]==cross) countX++;
                if (activeBoard[index][2-index]==circle) countO++;
            }
            if (countX==3) return playerX;
            if (countO==3) return playerO;
             countX=0;
             count1O=0;
        }
    }
    
    let boardPositions = domElements.boardPositionsAll;
    //falta agregar player si es X o O
    boardPositions.forEach((boardPositions,index)=> {boardPositions.addEventListener("click", ()=>{turnPlayed(Math.floor(index/3),index%3)})});
    const renderBoard = ()=> {
        renderScore();
        let boardStatus=getBoardStatus();
        for (let indexRow = 0; indexRow <= 2; indexRow++) {
            for (let indexColumn = 0; indexColumn <= 2; indexColumn++) {
                if (boardStatus[indexRow][indexColumn]==null )    {
                    boardPositions[indexRow*3+indexColumn].className = "boardposition";
                }
                if (boardStatus[indexRow][indexColumn]==cross)    {
                    boardPositions[indexRow*3+indexColumn].classList.add(cross);
                }
                if (boardStatus[indexRow][indexColumn]==circle)    {
                    boardPositions[indexRow*3+indexColumn].classList.add(circle);
                }
            }
        }
    }

    const renderScore = () => {
        domElements.player1Score.innerText=(" X, "+players[0].getPlayerName()+" : "+players[0].getScore());
        domElements.player2Score.innerText=(" O, "+players[1].getPlayerName()+ " : "+players[1].getScore());
    }
    
    return {turnPlayed, resetGame, renderBoard, startGame}
};

function buttonControl () {
    domElements.gameStartBtn.addEventListener("click", ()=>{defaultgame.startGame()});
    domElements.gameAddPlayerAll.forEach((gameAddPlayer,index)=> {gameAddPlayer.addEventListener("click", ()=>{players[index]=createPlayer(domElements.gameAddPlayerNameAll[index].value)})});
};      