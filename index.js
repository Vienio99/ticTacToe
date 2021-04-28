const gameBoard = (player, square) => {
    const board = {};
}



const Player = (username, mark) => {
    const getUsername = () => username;
    const getMark = () => mark;
    return { getUsername, getMark }
}

const flowControl = () => {

}

const squares = document.querySelectorAll('.square');

squares.forEach((square) => {
    square.addEventListener('click', () => {
        const chosenSquare = document.querySelector(`#${square.id} div`);
        chosenSquare.textContent = 'X'
        console.log(chosenSquare.id)
    })
})