const gameContainer = document.getElementById("game");
const COLORS = [
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  
];

const start = document.querySelector('.start')
// const best = document.querySelector(".best")
let score = 0;
let flippedCards = [];
let lockBoard = false;
let moves = 0


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("hidden");
    newDiv.dataset.color = color;
    // newDiv.textContent = color
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}
const moveCounter = document.querySelector(".move-counter")

function movesUpdate(){
  moves++;
  if(moveCounter){
  moveCounter.textContent = moves
  }
}

function bestScoreUpdate(){
  if(moves < bestScore){
    bestScore = moves; 
    localStorage.setItem('bestScore', bestScore);
    bestScoreDisplay.textContent = `Best Score: ${bestScore}`
  }
}
const reset = document.querySelector('#reset')
// reset.style.display = 'none'
function handleCardClick(event) {
  if (lockBoard) return;

  const card = event.target;

  if (!card.classList.contains("hidden")) return;

  card.classList.remove("hidden");
  card.style.backgroundColor = card.dataset.color;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;

    if (flippedCards[0].dataset.color === flippedCards[1].dataset.color) {
      score += 1;
      flippedCards = [];
      lockBoard = false;
    } else {
      setTimeout(function() {
        flippedCards.forEach(function(card) {
          card.classList.add("hidden");
          card.style.backgroundColor = "";
        });
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
  movesUpdate()
  bestScoreUpdate()

  if (score === COLORS.length) {
    setTimeout(function() {
      alert("You Win!")
      // reset.style.display = 'block'
    }, 1000)
    
    // reset.style.display = 'block'
  } 
}

createDivsForColors(shuffledColors);

start.addEventListener('click', function(){
  lockBoard = false; 
  moves = 0
  movesUpdate.textContent = moves;
  // reset.style.display = 'none'
})

bestScoreUpdate.textContent = `Best Score: ${bestScore}`


// start.addEventListener('click',function(){
//   lockBoard = true
//   if(lockBoard){
//     start.textContent = "Resume"
//   } else {
//     start.textContent = "Pause"
//   }
// })
