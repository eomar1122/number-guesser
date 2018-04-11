/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  // console.log(guess);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, You win!`);
  } else {
    // Wrong guess
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game over - You lost, the correct number was ${winningNum}`
      );
    } else {
      // Wrong guess - continues
      // Change border color
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left!`,
        "red"
      );
    }
  }
});

// Random number generator
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  guessInput.disable = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Change message color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
