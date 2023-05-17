const gameContainer = document.getElementById("game");
const scoreDiv = document.createElement('div');

let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
];

const NUMPAIRS = COLORS.length + 3;
let numGuessedCards = 0;
let score = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = (COLORS);

function startScreen() {
  const newDiv = document.createElement('button');
  newDiv.setAttribute('class', 'startGame');
  newDiv.addEventListener("click", () => {
    startNewGame();
    newDiv.remove();
  });
  newDiv.textContent = "Start Game";
  document.getElementById('startGame').append(newDiv);
  
}

function startNewGame() {
  // shuffledColors = shuffle(COLORS);
  let cardsArr = [];

  if (NUMPAIRS > COLORS.length) {
    for (let i = 0; i < NUMPAIRS; i++) {
      function rcv() {
        return Math.floor(Math.random() * (256));
      };
      COLORS[i] = "rgb(" + rcv() + "," + rcv() + "," + rcv() +")";
      console.log(COLORS[i]);
      cardsArr[i] = COLORS[i];
    }
  }
  else {
    for (let i = 0; i < colorPairs; i++) {
      cardsArr[i] = COLORS[i];
    }
}
  shuffledColors = shuffle(cardsArr.concat(cardsArr));
  numGuessedCards = 0;
  score = 0;
  guessedCards = [];
  createDivsForColors(shuffledColors);
  // let scoreDiv = document.createElement('div');
  // scoreDiv.setAttribute('id', 'score');
  document.getElementById('score').append(scoreDiv);
  updateScore();
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let guessedCards = [];

function endGame() {
  console.log("ending the game");
  let restartGameDiv = document.createElement('button');
  restartGameDiv.setAttribute('class', 'startGame');
  restartGameDiv.textContent = 'You Win! \nPlay Again?';
  restartGameDiv.addEventListener('click', () => {
    resetGame(restartGameDiv);
    startNewGame();
  });
  document.getElementById('startGame').appendChild(restartGameDiv);

  evaluateBestScore();
}

function resetGame(restartGameDiv) {
  for (let color of COLORS) {
    for (div of document.querySelectorAll('.' + color)) {
      div.remove();
    }
    // console.log('removed');
  }
  restartGameDiv.remove();
  // document.getElementById('score').remove();

}

function evaluateBestScore() {
  // let scoreDiv = document.getElementById('score');
  let oldBestScore = localStorage.getItem('bestScore');
  let bestScoreText = 'Best Score: ' + oldBestScore + "\nYour Score: " + score;
  if (oldBestScore == null || oldBestScore > score) {
    localStorage.setItem('bestScore', score);
    bestScoreText = 'New Best Score: ' + score;
  }
  scoreDiv.textContent = bestScoreText;
}

  // have restart game button also have it's own styling and div within the .html file so things look nice
function updateScore() {
  scoreDiv.textContent = 'Score: ' + score;
}

function handleCardClick(event) {

  let card = event.target;

  if (guessedCards.length == 2) {
    return;
  }
  

  // console.log(card.style.background, 'hi');
  if (card.style.background != '') {
    //console.log('yellow');
    return;
  }

  revealCard(card);
  if (guessedCards.length == 2) {
    if (guessedCards[0].classList[0] == guessedCards[1].classList[0]) {
      guessedCards = [];
      numGuessedCards += 2;
      if (numGuessedCards == NUMPAIRS * 2) {
        endGame();
      }
    }
    //compare revealed cards:
    //if they're the same, keep them face up

    else {
      setTimeout(() => {
        hideCard(guessedCards[0])
        hideCard(guessedCards[1])
        guessedCards = [];
      }, 100);
    }
    //else do a timeout for at least one second to flip them back over.
  }
}

function revealCard(card) {
  card.style.background = card.classList[0];
  guessedCards.push(card);
  score++;
  updateScore();
}

//does not remove from the guessedcards array. assume instead that when this is called they are also removed from the guessedcards array
function hideCard(card) {
  card.style.background = '';
}

// when the DOM loads
startScreen();
