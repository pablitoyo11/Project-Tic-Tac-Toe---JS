
function createPlayer (userNameInput){
    const playerName = userNameInput;
    let score = 0;
    const getPlayerName = () => console.log(playerName);
    const winner = () => ++score;
    const getScore = () => console.log(score);
    return { getPlayerName, winner, getScore }
};

function boardControl (){
    const gameBoardCreate = ()=> (Array(3).fill().map(()=>Array(3).fill(null)));
    gameBoard = gameBoardCreate();

    let turn=0;
    const turnPlayed = (x,y,player) => {
        if (turn==9) {
            alert("Game over, it's a Draw!");
        }
        else{
            if (gameBoard[x][y] == null) {
            //turn sum if it's valid position and doesn't sum if it's an invalid position
                turn++;
                gameBoard[x][y] = player;
            }
            else{                
                alert("that's not a valid position!!");
            }
        }
    }
  //  const placeCross = (x,y) => {
  //      (gameBoard[x][y] == null) ? gameBoard[x][y] =  "X" : alert("that's not a valid position!!");
  //  }
  //  const placeCircle = (x,y) => {
  //      (gameBoard[x][y] == null) ? gameBoard[x][y] =  "O" : alert("that's not a valid position!!");
  //  }//need to reset turn
  //  
    const getBoardStatus = ()=> {return structuredClone(gameBoard)};
    const emptyBoard = gameBoardCreate;
    
    //checking winner according to last position used
    const checkWinner =(x,y) => {
        let activeBoard=getBoardStatus();
        //counter start in 0, count 3 in a line to verify win
        let countX=0;
        let countO=0;
        //check column
        for (let index = 0; index < 2; index++) {
            if (activeBoard[x][index]=="X") countX++;
            if (activeBoard[x][index]=="O") countO++;
        }
        if (countX==3) return "playerXwinner";
        if (countO==3) return "playerOwinner";
         countX=0;
         countO=0;
        //check row
        for (let index = 0; index < 2; index++) {
            if (activeBoard[index][y]=="X") countX++;
            if (activeBoard[index][y]=="O") countO++;
        }
        if (countX==3) return "playerXwinner";
        if (countO==3) return "playerOwinner";
         countX=0;
         countO=0;
        //check diagonals
        if (x==0&&y==0 || x==0&&y==2 || x==1&&y==1 || x==2&&y==0 || x==2&&y==2 ){
            //diagonal
            for (let index = 0; index < 2; index++) {
                if (activeBoard[index][index]=="X") countX++;
                if (activeBoard[index][index]=="O") countO++;
            }
            cecec
            if (countX==3) return "playerXwinner";
            if (countO==3) return "playerOwinner";
             countX=0;
             countO=0;
            //antidiagonal
            for (let index = 0; index < 2; index++) {
                if (activeBoard[index][2-index]=="X") countX++;
                if (activeBoard[index][2-index]=="O") countO++;
            }
            if (countX==3) return "playerXwinner";
            if (countO==3) return "playerOwinner";
             countX=0;
             countO=0;
        }
    }
    return { /*placeCross, placeCircle,*/turnPlayed, getBoardStatus, emptyBoard, checkWinner }
};
/*
function gameControl (player1,player2){
    let game=boardControl();
    
    game.placeCross(x,y);
    game.placeCircle(x,y);
    
}*/