const gameBoard = (() => {
    let board = {};
    const winnerTextBox = document.querySelector('.end-info');
    const modalBox = document.querySelector('.modal');

    const populateBoard = (field, mark, textBox) => {
        board[field] = mark;
        textBox.textContent = mark;
    };

    const checkEnd = (mark, player) => {
        console.log(board)
        if (board[1] === mark && board[2] === mark && board[3] === mark ||
            board[4] === mark && board[5] === mark && board[6] === mark ||
            board[7] === mark && board[8] === mark && board[9] === mark ||
            board[1] === mark && board[4] === mark && board[7] === mark ||
            board[2] === mark && board[5] === mark && board[8] === mark ||
            board[1] === mark && board[5] === mark && board[9] === mark ||
            board[3] === mark && board[6] === mark && board[9] === mark ||
            board[3] === mark && board[5] === mark && board[7] === mark 
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
        if (winner === 'Player1' || winner === 'Computer') {
            winnerTextBox.textContent = `${winner} wins!!`;
        } else {
            winnerTextBox.textContent = "It's a tie!";
        }
        modalBox.style.display = "block";
    }


    const clearAll = () => {
        clearBoard();
        winnerTextBox.textContent = '';
        modalBox.style.display = "none";
    }

    const checkStatus = () => {
        if (winnerTextBox.textContent === '') {
            return 'inProgress';
        } else {
            return 'end';
        }
    }

    return { populateBoard, checkEnd, clearAll, checkStatus };
})();



const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}

const flowControl = (() => {

    // Modal box after finishing the game
    const modalBox = document.querySelector('.modal');
    window.addEventListener('click', function(e) {
        if (e.target == modalBox) {
            modalBox.style.display = 'none';
            gameBoard.clearAll();
            currentMark = markP1;
        }
    });

    // Restart button
    const restart = document.querySelector('.restart button');
    restart.addEventListener('click', () => {
        gameBoard.clearAll();
        currentMark = markP1;
    })

    // Setting players
    const player1 = Player('Player1', 'X');
    const player2 = Player('Computer', 'O');

    const markP1 = player1.getMark();
    const markP2 = player2.getMark();
    let currentMark = markP1;

    // Listening for moves
    const squares = document.getElementsByClassName('square');

    Array.from(squares).forEach((square) => {
        square.addEventListener('click', () => {
            if (document.querySelector('.end-info').textContent) {
                gameBoard.clearAll();
                currentMark = markP1;
            }
            const chosenSquare = document.getElementById(`${square.id}`);
            let squareTextBox = chosenSquare.firstElementChild;

            if (currentMark === markP1 && !squareTextBox.textContent) {
                gameBoard.populateBoard(square.id, markP1, squareTextBox);
                gameBoard.checkEnd(markP1, player1);
                currentMark = markP2;
                if (gameBoard.checkStatus() === 'inProgress') {
                    setTimeout(computerMove, 1000);
                }
            } else if (currentMark === markP2 && !squareTextBox.textContent) {
                gameBoard.populateBoard(square.id, markP2, squareTextBox);
                gameBoard.checkEnd(markP2, player2);
                currentMark = markP1;
            }
        })
    })
})();


const computerMove = () => {
    const endInfoText = document.querySelector('.end-info').textContent
    if (!endInfoText) {
        const squares = document.getElementsByClassName('square');
        let randomInt = getRandomInt(0, 8);
        while (squares[randomInt].firstElementChild.textContent && !endInfoText) {
            randomInt = getRandomInt(0, 8);
        }
        squares[randomInt].firstElementChild.click();
    }

}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);  
}
