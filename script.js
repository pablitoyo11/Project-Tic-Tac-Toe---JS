let game = {}


function createPlayer (userNameInput){
    const playerName = userNameInput;
    let score = 0;
    const getPlayerName = () => {return (playerName)};
    const increaseScore = () => ++score;
    const getScore = () => {return (score)}
    return { getPlayerName, increaseScore, getScore }
};

function boardControl (playerName1,playerName2){
    const gameBoardCreate = ()=> (Array(3).fill().map(()=>Array(3).fill(null)));
    gameBoard = gameBoardCreate();
    //const cross and circle made this way so it can be changed in the future, with alternative options or user desired element 
    const cross="cross"; 
    const circle="circle";
    const playerX = {
        playerInfo: playerName1,
        playerIcon: cross,
    };
    const playerO = {
        playerInfo: playerName2,
        playerIcon: circle,
    };
console.log("player",playerName2.getPlayerName());
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
             countO=0;
        }
    }
    
    let boardPositions = document.querySelectorAll(".boardposition");
//falta agregar player si es X o O
    boardPositions.forEach((boardPositions,index)=> {boardPositions.addEventListener("click", ()=>{turnPlayed(Math.floor(index/3),index%3)})});
    const renderBoard = ()=> {
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

    return {turnPlayed, resetGame, renderBoard}
};
