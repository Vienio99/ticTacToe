const gameBoard = (() => {
    let board = {};

    const populateBoard = (field, mark) => {
        board[field] = mark;
    };

    const checkEnd = () => {

    }
    
    return { board, populateBoard, checkEnd };
})();



const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}

const flowControl = (() => {
    const squares = document.getElementsByClassName('square');

    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');

    const markP1 = player1.getMark();
    const markP2 = player2.getMark();
    let currentMark = markP1;

    Array.from(squares).forEach((square) => {
        square.addEventListener('click', () => {
            const chosenSquare = document.getElementById(`${square.id}`);
            let squareTextBox = chosenSquare.firstElementChild;

            if (currentMark === markP1 && !squareTextBox.textContent) {
                squareTextBox.textContent = markP1;
                gameBoard.populateBoard(square.id, markP1);
                currentMark = markP2;
            } else if (currentMark === markP2 && !squareTextBox.textContent) {
                squareTextBox.textContent = markP2;
                gameBoard.populateBoard(square.id, markP2);
                currentMark = markP1;
            }
        })
    })


})();
