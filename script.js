const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const gameInstructions = document.querySelector(
  '[data-testid="gameInstructions"]'
);

let score = 0;
let targetColor;
let colorList = ["red", "blue", "green", "yellow", "purple", "orange"];

function generateColor() {
  return colorList[Math.floor(Math.random() * colorList.length)];
}
console.log(generateColor());

function setupNewGame() {
  targetColor = generateColor();
  colorBox.style.backgroundColor = targetColor;

  // Randomize color options
  const correctIndex = Math.floor(Math.random() * colorOptions.length);
  colorOptions.forEach((btn, index) => {
    const color = generateColor();
    btn.style.backgroundColor = color;
    btn.dataset.color = color;
    if (index === correctIndex) {
      btn.dataset.correct = true;
    } else {
      delete btn.dataset.correct;
    }
  });

  gameStatus.textContent = "";
}

function handleColorOptionClick(e) {
  const clickedColor = e.target.style.backgroundColor;
  const isCorrect = e.target.dataset.correct;

  if (isCorrect) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    gameStatus.textContent = "Correct! Well done!";
    gameStatus.style.color = "green";
  } else {
    gameStatus.textContent = "Wrong! Try again!";
    gameStatus.style.color = "red";
  }

  // Add animation or fade-out effect for wrong guesses
  setTimeout(setupNewGame, 1500);
}

function init() {
  setupNewGame();
  colorOptions.forEach((option) => {
    option.addEventListener("click", handleColorOptionClick);
  });

  newGameButton.addEventListener("click", setupNewGame);
}

init();
