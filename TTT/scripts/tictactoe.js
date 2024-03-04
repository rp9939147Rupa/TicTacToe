let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let username = '';

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    if (username.trim() !== '') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        startGame();
    }
});

function startGame() {
    gameActive = true;
    renderBoard();
}

function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => cellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            endGame(`${username} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        endGame('It\'s a draw!');
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function endGame(message) {
    gameActive = false;
    document.getElementById('result').textContent = message;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').textContent = '';
    renderBoard();
}
