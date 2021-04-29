const gameBoard = (player, square) => {
    const board = {};
}



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
    console.log(squares)

    Array.from(squares).forEach((square) => {
        square.addEventListener('click', () => {
            const chosenSquare = document.getElementById(`${square.id}`);

            switch (currentMark) {
                case markP1:
                    chosenSquare.firstElementChild.textContent = markP1;
                    currentMark = markP2;
                    break;
                case markP2:
                    chosenSquare.firstElementChild.textContent = markP2;
                    currentMark = markP1;
                    break;
            }
        })
    })


})();
