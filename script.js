// Game Variables
let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// DOM Elements
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const resultDisplay = document.getElementById('result');
const gameMessageDisplay = document.getElementById('gameMessage');
const playerChoiceDisplay = document.getElementById('playerChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('resetBtn');

// Event Listeners
choiceBtns.forEach(btn => {
    btn.addEventListener('click', handlePlayerChoice);
});

resetBtn.addEventListener('click', resetGame);

// Handle Player Choice
function handlePlayerChoice(e) {
    const playerChoice = e.currentTarget.dataset.choice;
    playRound(playerChoice);
}

// Get Computer Choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Determine Winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}

// Play Round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // Update display
    updateDisplay(playerChoice, computerChoice, result);
    updateScore(result);
}

// Update Display
function updateDisplay(playerChoice, computerChoice, result) {
    // Update choice displays with animation
    playerChoiceDisplay.style.animation = 'none';
    computerChoiceDisplay.style.animation = 'none';

    setTimeout(() => {
        playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
        computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
        playerChoiceDisplay.style.animation = 'choiceAppear 0.4s ease';
        computerChoiceDisplay.style.animation = 'choiceAppear 0.4s ease';
    }, 10);

    // Update result message
    if (result === 'win') {
        resultDisplay.textContent = '🎉 You Win!';
        resultDisplay.style.color = '#00ff88';
        gameMessageDisplay.textContent = `Your ${playerChoice} beats computer's ${computerChoice}`;
        gameMessageDisplay.style.color = '#00ff88';
    } else if (result === 'lose') {
        resultDisplay.textContent = '😔 You Lose!';
        resultDisplay.style.color = '#ff6b6b';
        gameMessageDisplay.textContent = `Computer's ${computerChoice} beats your ${playerChoice}`;
        gameMessageDisplay.style.color = '#ff6b6b';
    } else {
        resultDisplay.textContent = '🤝 It\'s a Tie!';
        resultDisplay.style.color = '#ffd700';
        gameMessageDisplay.textContent = `Both chose ${playerChoice}`;
        gameMessageDisplay.style.color = '#ffd700';
    }
}

// Update Score
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        playerScoreDisplay.style.animation = 'none';
        setTimeout(() => {
            playerScoreDisplay.style.animation = 'pulse 0.5s ease';
        }, 10);
    } else if (result === 'lose') {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        computerScoreDisplay.style.animation = 'none';
        setTimeout(() => {
            computerScoreDisplay.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// Reset Game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    playerChoiceDisplay.textContent = '👤';
    computerChoiceDisplay.textContent = '🤖';
    resultDisplay.textContent = 'Choose your move!';
    resultDisplay.style.color = '#ffffff';
    gameMessageDisplay.textContent = '';

    // Add reset animation
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.opacity = '0.5';
    setTimeout(() => {
        gameContainer.style.opacity = '1';
    }, 200);
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    console.log('Rock Paper Scissors Game Loaded! 🎮');
});
