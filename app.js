/* 
FUNCTIONS OF THE GAME
    - Player must guess a number between a min and max
    - Player gets a certain amount of guesses
    - Notifies player of remaining guesses after each failed attempt
    - Notifies player of the correct answer if they lose
    - Lets the player play again
*/

// NUMBER VARIABLES

let min = 1,
  max = 10,
  guessesLeft = 4,
  // RANDOMISE THE CORRECT NUMBER
  correctAnswer = Math.floor(Math.random() * 10 + 1);

// UI VARIABLES

const game = document.querySelector("#game"),
  guessInput = document.querySelector("#guess-input"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

// SET THE MIN AND MAX TO UI

minNum.textContent = min;
maxNum.textContent = max;

function setMessage(msg, colour) {
  message.textContent = msg;
  message.style.color = colour;
}

// LISTEN FOR USER INPUT

guessBtn.addEventListener("click", function() {
  // CHECK USER KEYED NUMBER BETWEEN MIN AND MAX
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess === "" || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return;
  } else if (guess !== correctAnswer) {
    // IF ANSWER IS INCORRECT
    guessesLeft -= 1;
    setMessage(
      `Whoops, that isn't right! You have ${guessesLeft} guesses remaining.`,
      "red"
    );
    guessInput.style.borderColor = "#F08080";
    if (guessesLeft === 1) {
      setMessage(
        `Whoops, that isn't right! You have ${guessesLeft} guess remaining!`,
        "red"
      );
    }
    // IF USER RUNS OUT OF TRIES
    if (guessesLeft === 0) {
      setMessage(`Game over! The answer was ${correctAnswer}. Try again?`);
      guessBtn.value = "Try Again";
      guessInput.disabled = true;
      guessBtn.addEventListener("mousedown", function() {
        location.reload();
      });
    }
    return;
    // IF USER GUESSES CORRECT ANSWER
  } else {
    setMessage(`Yes! That was the correct answer!`, "green");
    guessInput.style.borderColor = "#90EE90";
    guessBtn.value = "Try Again";
    guessInput.disabled = true;
    guessBtn.addEventListener("mousedown", function() {
      location.reload();
      return;
    });
  }
});
