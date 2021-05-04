// Global variables
const gameBoardContent = document.querySelector('.game-board');
const modalBox = document.querySelector('.modal');


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
            } else if (!anyAvailableMoves()) {
                displayWinner();
            };
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

    return { populateBoard, checkEnd, clearAll, checkGameStatus, anyAvailableMoves, self };
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

// Computer player logic

// const computerPlayer = (() => {
//     const move = () => {
//         if (gameBoard.anyAvailableMoves()) {
//             const squares = document.getElementsByClassName('square');
//             let randomInt = getRandomInt(0, 8);
//             while (squares[randomInt].firstElementChild.textContent) {
//                 randomInt = getRandomInt(0, 8);
//             }
//             squares[randomInt].firstElementChild.click();
//         }
    
//     }
    
//     const getRandomInt = (min, max) => {
//         return Math.floor(Math.random() * (max - min + 1) + min);  
//     }
//     return { move }
// })();


// Computer player minimax
const computerPlayer = (() => {
    const move = () => {
        if (gameBoard.anyAvailableMoves()) {
            const squares = document.getElementsByClassName('square');
            for (let i = 0; i < Object.keys(gameBoard.self.board).length; i++) {
                console.log(gameBoard.self.board)
                if (gameBoard.self.board[i + 1] === '') {
                    squares[i].click();
                    gameBoardContent.style.pointerEvents = 'auto';
                    break;
                }
        }}}
    return { move }
})();

// // Minmax algorithm
// function minimax(position, depth, maximizingPlayer) {
//     if (depth === 0) {
//         return position;
//     } 
//     if (maximizingPlayer) {
//         let maxEval = -Infinity;
//         for (let i = 0; i < position.length; i++) {
//             evaluation = minimax(position[i], depth - 1, false);
//             maxEval = Math.max(maxEval, evaluation);
//         }
//         return maxEval;
//     }

//     else {
//         let minEval = Infinity;
//         for (let i = 0; i < position.length; i++) {
//             evaluation = minimax(position[i], depth - 1, true);
//             maxEval = Math.min(minEval, evaluation);
//         }
//         return minEval
//     }
// }

// console.log(minimax([1, 2, 3, 4, 5, 6, 7, 8], 1, true))