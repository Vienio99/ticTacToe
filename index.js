// Gameboard with it's functions
const gameBoard = (() => {
    const self = this;
    this.board = { 1: '', 2: '', 3: '',
            4: '', 5: '', 6: '',
            7: '', 8: '', 9: '' };



    const winnerTextBox = document.querySelector('.end-info');

    const populateBoard = (field, mark, textBox) => {
        self.board[field] = mark;
        textBox.textContent = mark;
    };

    const checkEnd = (mark, player) => {
        if (self.board[1] === mark && self.board[2] === mark && self.board[3] === mark ||
            self.board[4] === mark && self.board[5] === mark && self.board[6] === mark ||
            self.board[7] === mark && self.board[8] === mark && self.board[9] === mark ||
            self.board[1] === mark && self.board[4] === mark && self.board[7] === mark ||
            self.board[2] === mark && self.board[5] === mark && self.board[8] === mark ||
            self.board[1] === mark && self.board[5] === mark && self.board[9] === mark ||
            self.board[3] === mark && self.board[6] === mark && self.board[9] === mark ||
            self.board[3] === mark && self.board[5] === mark && self.board[7] === mark 
            ) {
                displayWinner(player.getUsername());
                return player.getMark();
            } else if (!anyAvailableMoves()) {
                displayWinner();
                return 'tie';
            };
    };

    const checkEndMiniMax = () => {
        if (self.board[1] === 'X' && self.board[2] === 'X' && self.board[3] === 'X' ||
            self.board[4] === 'X' && self.board[5] === 'X' && self.board[6] === 'X' ||
            self.board[7] === 'X' && self.board[8] === 'X' && self.board[9] === 'X' ||
            self.board[1] === 'X' && self.board[4] === 'X' && self.board[7] === 'X' ||
            self.board[2] === 'X' && self.board[5] === 'X' && self.board[8] === 'X' ||
            self.board[1] === 'X' && self.board[5] === 'X' && self.board[9] === 'X' ||
            self.board[3] === 'X' && self.board[6] === 'X' && self.board[9] === 'X' ||
            self.board[3] === 'X' && self.board[5] === 'X' && self.board[7] === 'X' 
            ) {
                return 'X';
            } else if (
                self.board[1] === 'O' && self.board[2] === 'O' && self.board[3] === 'O' ||
                self.board[4] === 'O' && self.board[5] === 'O' && self.board[6] === 'O' ||
                self.board[7] === 'O' && self.board[8] === 'O' && self.board[9] === 'O' ||
                self.board[1] === 'O' && self.board[4] === 'O' && self.board[7] === 'O' ||
                self.board[2] === 'O' && self.board[5] === 'O' && self.board[8] === 'O' ||
                self.board[1] === 'O' && self.board[5] === 'O' && self.board[9] === 'O' ||
                self.board[3] === 'O' && self.board[6] === 'O' && self.board[9] === 'O' ||
                self.board[3] === 'O' && self.board[5] === 'O' && self.board[7] === 'O'
            ) {
                return 'O';
            } else if (!anyAvailableMoves()) {
                return 'tie';
            }
    };

    const clearBoard = () => {
        const squares = document.getElementsByClassName('square');
        Array.from(squares).forEach((square) => {
            square.firstElementChild.textContent = '';
        })
        self.board = { 1: '', 2: '', 3: '',
                    4: '', 5: '', 6: '',
                    7: '', 8: '', 9: ''  };
    }

    const modalBox = document.querySelector('.modal');
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

    const checkGameStatus = () => {
        if (winnerTextBox.textContent === '') {
            return 'inProgress';
        } else {
            return 'end';
        }
    }

    const anyAvailableMoves = () => {
        for (let i = 0; i < Object.keys(self.board).length + 1; i++) {
            if (self.board[i] === '') {
                return true;
            }
        }
    }

    return { populateBoard, checkEnd, clearAll, checkGameStatus, anyAvailableMoves, self, checkEndMiniMax };
})();

console.log(gameBoard.board)

// Player factory function
const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}

// Flow control of the game
const flowControl = (() => {
    const modalBox = document.querySelector('.modal');
    // Modal box after finishing the game
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

            if (!gameBoard.anyAvailableMoves()) {
                gameBoard.clearAll();
                currentMark = markP1;
            }
            const chosenSquare = document.getElementById(`${square.id}`);
            let squareTextBox = chosenSquare.firstElementChild;
            const gameBoardContent = document.querySelector('.game-board');
            if (currentMark === markP1 && !squareTextBox.textContent) {
                gameBoardContent.style.pointerEvents = 'auto';
                gameBoard.populateBoard(square.id, markP1, squareTextBox);
                gameBoard.checkEnd(markP1, player1);
                currentMark = markP2;
                if (gameBoard.checkGameStatus() === 'inProgress') {
                    gameBoardContent.style.pointerEvents = 'none';
                    setTimeout(computerPlayer.move, 1000);
                }
            } else if (currentMark === markP2 && !squareTextBox.textContent) {
                gameBoard.populateBoard(square.id, markP2, squareTextBox);
                gameBoard.checkEnd(markP2, player2);
                currentMark = markP1;
            }
        })
    })
})();

// Computer player minimax
const computerPlayer = (() => {
    const move = () => {
        if (gameBoard.anyAvailableMoves()) {
            bestMove();
        }}
    return { move }
})();

function bestMove() {
    const squares = document.getElementsByClassName('square');
    const gameBoardContent = document.querySelector('.game-board');
    let move;
    let bestScore = -Infinity;
    for (let i = 0; i < Object.keys(gameBoard.self.board).length; i++) {
        if (gameBoard.self.board[i + 1] === '') {
            gameBoard.self.board[i + 1] = 'O';
            let score = minimax(gameBoard.self.board, 0, false);
            gameBoard.self.board[i + 1] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }

        }
    }
    squares[move].click();
    gameBoardContent.style.pointerEvents = 'auto';
}

// Minmax algorithm
function minimax(board, depth, isMaximizing) {
    let scores = {
        X: -1,
        O: 1,
        tie: 0
    };
    let result = gameBoard.checkEndMiniMax();
    if (result != null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < Object.keys(board).length; i++) {
            if (board[i + 1] === '') {
                board[i + 1] = 'O';
                let score = minimax(board, depth + 1, false)
                board[i + 1] = '';
                bestScore = Math.max(score, bestScore)
              }
            }
        return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < Object.keys(board).length; i++) {
                if (board[i + 1] === '') {
                    board[i + 1] = 'X';
                    let score = minimax(board, depth + 1, true)
                    board[i + 1] = '';
                    bestScore = Math.min(score, bestScore)
                  }
                }
            return bestScore;
        }
}


