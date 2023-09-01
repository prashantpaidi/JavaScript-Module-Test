const winContainer = document.querySelector('.win-container');
const playArea = document.querySelector('.play-area');
const closeRulesButton = document.getElementById('close');
const openButton = document.getElementById('rulesBtn');
const rulesNotice = document.getElementById('rulesNotice');
const nextBtn = document.getElementById('nextBtn');
const playAgainBtn = document.getElementById('play-again');
const cupContainer = document.querySelector('.cup-container');
const scoreContainer = document.querySelector('.score-container');
const rePlayBtn = document.getElementById('rePlay');

let userScore = 0;
let computerScore = 0;

// load the storged data
document.addEventListener('DOMContentLoaded', function () {
  const storedComputerScore = localStorage.getItem('computerScore');
  const storedUserScore = localStorage.getItem('userScore');

  // Update scores if they exist in local storage.
  if (storedComputerScore) {
    computerScore = parseInt(storedComputerScore);
    updateComputerScore(computerScore);
  }

  if (storedUserScore) {
    userScore = parseInt(storedUserScore);
    updateUserScore();
  }

  openButton.addEventListener('click', () => {
    rulesNotice.style.visibility = 'visible';
  });

  closeRulesButton.addEventListener('click', () => {
    rulesNotice.style.visibility = 'hidden';
  });
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function updateUserScore() {
  document.getElementById('userScore').textContent = userScore;
  localStorage.setItem('userScore', userScore.toString());
}

function updateComputerScore() {
  document.getElementById('computerScore').textContent = computerScore;
  localStorage.setItem('computerScore', computerScore.toString());
}



function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    displayResult(userChoice, computerChoice, 'TIE UP'); // 'tie';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    updateUserScore();
    displayResult(userChoice, computerChoice, 'YOU WIN');
  } else {
    computerScore++;
    updateComputerScore();
    displayResult(userChoice, computerChoice, 'YOU LOST');
  }
}

const choices = document.querySelectorAll('.choice');

choices.forEach((choice) => {
  choice.addEventListener('click', playGame);
});

function playGame(event) {
  const userChoice = event.currentTarget.id;
  const computerChoice = getComputerChoice();

  determineWinner(userChoice, computerChoice);
}

function displayResult(userChoice, computerChoice, resultMessage) {
  // game_rules display
  winContainer.style.display = 'flex';
  playArea.style.display = 'none';
  // update class for image containter

  // udpate images
  let userChoiceImage = document.getElementById('userChoiceImage');
  let computerChoiceImage = document.getElementById('computerChoiceImage');

  userChoiceImage.src = `images/${userChoice}.png`; // Update img src
  computerChoiceImage.src = `images/${computerChoice}.png`;

  userChoiceImage.alt = `User's choice: ${userChoice}`;
  computerChoiceImage.alt = `Computer's choice: ${computerChoice}`; // Update alt for computer choice image

  const message = document.getElementById('message');
  message.textContent = resultMessage;

  // add style
  winContainer.querySelector('.left div div').classList.add(userChoice);
  winContainer.querySelector('.right div div').classList.add(computerChoice);

  if (resultMessage == 'YOU WIN') {
    // user win
    winContainer.querySelector('.left div').classList.add('circle');

    // view next button
    nextBtn.style.display = 'block';
    rulesBtn.style.right = '10%';
  } else if (resultMessage == 'YOU LOST') {
    winContainer.querySelector('.right div').classList.add('circle');
  }
}

nextBtn.addEventListener('click', function () {
  openButton.style.right = '2%';
  scoreContainer.style.display = 'none';
  playArea.style.display = 'none';
  winContainer.style.display = 'none';
  cupContainer.style.display = 'flex';
  nextBtn.style.display = 'none';
});

playAgainBtn.addEventListener('click', function () {
  openButton.style.right = '2%';
  nextBtn.style.display = 'none';
  winContainer.style.display = 'none';
  cupContainer.style.display = 'none';
  playArea.style.display = 'flex';
  resetClass();
});

rePlayBtn.addEventListener('click', function () {
  rulesBtn.style.right = '2%';
  nextBtn.style.display = 'none';
  scoreContainer.style.display = 'flex';
  winContainer.style.display = 'none';
  cupContainer.style.display = 'none';
  playArea.style.display = 'flex';
  resetClass();
});

// reset classes

const resetClass = () => {
  // Remove all classes from the element
  winContainer.querySelector('.left div').className = '';
  winContainer.querySelector('.right div').className = '';

  winContainer.querySelector('.left div div').className = '';
  winContainer.querySelector('.right div div').className = '';
};
