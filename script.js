
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
    //cross or circle placed in xy spot
    const placeCross = (x,y) => {
        (gameBoard[x][y] == null) ? gameBoard[x][y] =  "X" : alert("that's not a valid position!!");
    }
    const placeCircle = (x,y) => {
    (gameBoard[x][y] == null) ? gameBoard[x][y] =  "O" : alert("that's not a valid position!!");
    }//need to reset turn
    const getBoardStatus = ()=> console.log(gameBoard);
    const emptyBoard = gameBoardCreate;
    

    return { placeCross, placeCircle, getBoardStatus, emptyBoard, checkWinner }
};
/*
function gameControl (player1,player2){
    let game=boardControl();
    
    game.placeCross(x,y);
    game.placeCircle(x,y);
    
}*/