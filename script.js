const home = document.getElementById('home');
const game = document.getElementById('game');
const playWithFriendBtn = document.getElementById('playWithFriend');
const playWithAIBtn = document.getElementById('playWithAI');
const backHomeBtn = document.getElementById('backHome');
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const winnerDisplay = document.getElementById('winner');
const restartBtn = document.getElementById('restart');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let isAIEnabled = false;

initializeHome();

function initializeHome() {
    playWithFriendBtn.addEventListener('click', () => startGame(false));
    playWithAIBtn.addEventListener('click', () => startGame(true));
    backHomeBtn.addEventListener('click', showHome);
}

function startGame(aiEnabled) {
    isAIEnabled = aiEnabled;
    home.style.display = 'none';
    game.style.display = 'block';
    initializeGame();
}

function showHome() {
    game.style.display = 'none';
    home.style.display = 'block';
    resetGame();
}

function initializeGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', cellClicked);
        cell.textContent = "";
    });
    restartBtn.addEventListener('click', resetGame);
    currentPlayer = "X";
    currentPlayerDisplay.textContent = `${currentPlayer}'s turn`;
    winnerDisplay.textContent = "";
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if (isAIEnabled && running && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    currentPlayerDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            announceWinner(options[a]);
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = `It's a draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function announceWinner(winner) {
    winnerDisplay.textContent = `${winner} wins!`;
    winnerDisplay.style.animation = 'winnerAnimation 1s infinite';
    running = false;
}

function resetGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayerDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    winnerDisplay.textContent = "";
    running = true;
}

function aiMove() {
    let availableCells = options.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        updateCell(cell, randomIndex);
        checkWinner();
    }
}