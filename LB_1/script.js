let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const result = document.getElementById("result");
const attemptsText = document.getElementById("attempts");

document.getElementById("tryBtn").addEventListener("click", checkGuess);
document.getElementById("resetBtn").addEventListener("click", resetGame);

function checkGuess() {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 100) {
    result.textContent = "Введіть число від 1 до 100!";
    result.className = "result hint";
    return;
  }

  attempts++;
  attemptsText.textContent = `Спроб: ${attempts}`;

  if (guess === secretNumber) {
    result.textContent = `Вітаю! Ви вгадали число ${secretNumber} за ${attempts} спроб(и).`;
    result.className = "result correct";
  } else if (guess < secretNumber) {
    result.textContent = "Загадане число більше.";
    result.className = "result hint";
  } else {
    result.textContent = "Загадане число менше.";
    result.className = "result hint";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessInput.value = "";
  result.textContent = "";
  attemptsText.textContent = "Спроб: 0";
}
