// script.js
function startGame(game) {
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    // Hide all games
    document.getElementById('ticTacToe').style.display = 'none';
    document.getElementById('guessNumber').style.display = 'none';
    document.getElementById('rockPaperScissors').style.display = 'none';
    document.getElementById('numberGuessing').style.display = 'none';
    document.getElementById('simpleQuiz').style.display = 'none';

    // Show the selected game
    document.getElementById(game).style.display = 'block';
}

// Tic Tac Toe
document.getElementById('game-container').innerHTML += `
    <div id="ticTacToe">
        <h2>Tic Tac Toe</h2>
        <div id="ttt-board">
            <div class="ttt-cell" data-index="0"></div>
            <div class="ttt-cell" data-index="1"></div>
            <div class="ttt-cell" data-index="2"></div>
            <div class="ttt-cell" data-index="3"></div>
            <div class="ttt-cell" data-index="4"></div>
            <div class="ttt-cell" data-index="5"></div>
            <div class="ttt-cell" data-index="6"></div>
            <div class="ttt-cell" data-index="7"></div>
            <div class="ttt-cell" data-index="8"></div>
        </div>
        <button onclick="startGame('game-menu')">Back to Menu</button>
    </div>
`;

let currentPlayer = 'X';
const board = Array(9).fill(null);

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert('It\'s a draw!'), 10);
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

document.querySelectorAll('#ttt-board .ttt-cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Guess the Number
document.getElementById('game-container').innerHTML += `
    <div id="guessNumber">
        <h2>Guess the Number</h2>
        <p>Guess a number between 1 and 100</p>
        <input type="number" id="guess-input" min="1" max="100" />
        <button onclick="guessNumber()">Guess</button>
        <p id="guess-result"></p>
        <button onclick="startGame('game-menu')">Back to Menu</button>
    </div>
`;

function guessNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const userGuess = parseInt(document.getElementById('guess-input').value, 10);
    const result = document.getElementById('guess-result');

    if (userGuess === randomNumber) {
        result.textContent = 'Congratulations! You guessed the number.';
    } else {
        result.textContent = `Try again. The number was ${randomNumber}.`;
    }
}

// Rock Paper Scissors
document.getElementById('game-container').innerHTML += `
    <div id="rockPaperScissors">
        <h2>Rock Paper Scissors</h2>
        <button onclick="playRPS('rock')">Rock</button>
        <button onclick="playRPS('paper')">Paper</button>
        <button onclick="playRPS('scissors')">Scissors</button>
        <p id="rps-result"></p>
        <button onclick="startGame('game-menu')">Back to Menu</button>
    </div>
`;

function playRPS(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = document.getElementById('rps-result');

    if (userChoice === computerChoice) {
        result.textContent = `It's a tie! Computer chose ${computerChoice}.`;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result.textContent = `You win! Computer chose ${computerChoice}.`;
    } else {
        result.textContent = `You lose! Computer chose ${computerChoice}.`;
    }
}

// Number Guessing Game
document.getElementById('game-container').innerHTML += `
    <div id="numberGuessing">
        <h2>Number Guessing Game</h2>
        <p>Guess a number between 1 and 50</p>
        <input type="number" id="number-guess-input" min="1" max="50" />
        <button onclick="numberGuess()">Guess</button>
        <p id="number-guess-result"></p>
        <button onclick="startGame('game-menu')">Back to Menu</button>
    </div>
`;

function numberGuess() {
    const numberToGuess = Math.floor(Math.random() * 50) + 1;
    const userGuess = parseInt(document.getElementById('number-guess-input').value, 10);
    const result = document.getElementById('number-guess-result');

    if (userGuess === numberToGuess) {
        result.textContent = 'You guessed it right!';
    } else {
        result.textContent = `Wrong guess. The number was ${numberToGuess}.`;
    }
}

// Simple Quiz
document.getElementById('game-container').innerHTML += `
    <div id="simpleQuiz">
        <h2>Simple Quiz</h2>
        <p>What is the capital of France?</p>
        <input type="text" id="quiz-answer" />
        <button onclick="checkAnswer()">Submit</button>
        <p id="quiz-result"></p>
        <button onclick="startGame('game-menu')">Back to Menu</button>
    </div>
`;

function checkAnswer() {
    const correctAnswer = 'Paris';
    const userAnswer = document.getElementById('quiz-answer').value.trim();
    const result = document.getElementById('quiz-result');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        result.textContent = 'Correct!';
    } else {
        result.textContent = 'Incorrect. The correct answer is Paris.';
    }
}
