const gameBoard = (() => {
    let board = {};
    const winnerTextBox = document.querySelector('.end-info');

    const populateBoard = (field, mark) => {
        board[field] = mark;
    };

    const checkEnd = (mark, player) => {
        if (board[1] === mark && board[2] === mark && board[3] === mark ||
            board[4] === mark && board[5] === mark && board[6] === mark ||
            board[7] === mark && board[8] === mark && board[9] === mark ||
            board[1] === mark && board[4] === mark && board[7] === mark ||
            board[2] === mark && board[5] === mark && board[8] === mark ||
            board[1] === mark && board[5] === mark && board[9] === mark ||
            board[3] === mark && board[6] === mark && board[9] === mark
            ) {
                displayWinner(player.getUsername());
            } else if (Object.keys(board).length === 9) {
                displayWinner();
            };
    };

    const clearBoard = () => {
        const squares = document.getElementsByClassName('square');
        Array.from(squares).forEach((square) => {
            square.firstElementChild.textContent = '';
        })
        board = {};
    }

    const displayWinner = (winner) => {
        if (winner === 'Player1' || winner === 'Player2') {
            winnerTextBox.textContent = `${winner} wins!!`;
        } else {
            winnerTextBox.textContent = "It's a tie!";
        }
    }


    const clearAll = () => {
        clearBoard();
        winnerTextBox.textContent = '';
    }
    return { populateBoard, checkEnd, clearAll };
})();



const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}

const flowControl = (() => {
    gameBoard.clearAll();
    const restart = document.querySelector('.restart button');

    restart.addEventListener('click', () => {
        gameBoard.clearAll();
    })
    
    const squares = document.getElementsByClassName('square');

    const player1 = Player('Player1', 'X');
    const player2 = Player('Player2', 'O');

    const markP1 = player1.getMark();
    const markP2 = player2.getMark();
    let currentMark = markP1;

    Array.from(squares).forEach((square) => {
        square.addEventListener('click', () => {
            if (document.querySelector('.end-info').textContent) {
                gameBoard.clearAll();
                currentMark = markP1;
            }
            const chosenSquare = document.getElementById(`${square.id}`);
            let squareTextBox = chosenSquare.firstElementChild;

            if (currentMark === markP1 && !squareTextBox.textContent) {
                squareTextBox.textContent = markP1;
                gameBoard.populateBoard(square.id, markP1);
                currentMark = markP2;
                gameBoard.checkEnd(markP1, player1);
            } else if (currentMark === markP2 && !squareTextBox.textContent) {
                squareTextBox.textContent = markP2;
                gameBoard.populateBoard(square.id, markP2);
                currentMark = markP1;
                gameBoard.checkEnd(markP2, player2);
            }
        })
    })


})();
