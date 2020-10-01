const gameStats = {
  wins: 0,
  losses: 0,
  draws: 0
}

const hand = {
  playerHand: "",
  aiHand: ""
}

const hands = [...document.querySelectorAll('.pick img')];
const yourChoice = document.querySelector('.your-choice');
const opponent = document.querySelector('.opponent');
const gameWinner = document.querySelector('.game-winner');
const clearOverallResults = document.querySelector('.fas');
const gameCount = document.querySelector('.game-count');
const showWins = document.querySelector('.wins');
const showLosses = document.querySelector('.losses');
const showDraws = document.querySelector('.draws');
const favicon = document.getElementById('favicon')
const faviconsTable = ['./img/rock.png', './img/paper.png', './img/scissors.png'];
const tiitle = document.getElementById('title')
const titleTable = ['Rock', 'Paper', 'Scissors']

const clearShadowBox = function () {
  hands.forEach(hand => hand.style.boxShadow = "");
}

const boldText = function(element){
  return element.style.fontWeight = "bold"
}

const fillTextContent = function(element, value){
  return element.textContent = value;
}

let i=0;
const changeTitleAndFavicon = function(){
  if(i>2) i=0;
    favicon.setAttribute("href", faviconsTable[i]);
    tiitle.textContent = titleTable[i];
    i++;
}

changeTitleAndFavicon();
setInterval(changeTitleAndFavicon, 2000);

const handSelection = function () {
  hand.playerHand = this.dataset.option;
  clearShadowBox();
  this.style.boxShadow = "0 0 0 5px red";
  yourChoice.innerHTML = this.dataset.option.bold();
  fillTextContent(opponent, "");
  fillTextContent(gameWinner, "");
}

const aiChoice = function () {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

const checkResult = function (player, ai) {
  
  if ((player === 'paper' && ai === 'rock') || (player === 'rock' && ai === 'scissors') || (player === 'scissors' && ai === 'paper')) {
    gameStats.wins++;
    return 'win';
  } else if (player === ai) {
    gameStats.draws++;
    return 'draw';
  } else {
    gameStats.losses++;
    return 'loss';
  }
}

const displayGameResults = function (playerHand, aiHand, winner) {

  fillTextContent(yourChoice, playerHand);
  boldText(yourChoice);

  fillTextContent(opponent, aiHand);
  boldText(opponent);

  if (winner === 'win') {
    fillTextContent(gameWinner, "WIN")
    gameWinner.style.color = "green";
  } 
  else if (winner === 'loss') {
    fillTextContent(gameWinner, "LOSS")
    gameWinner.style.color = "red";

  } else {
    fillTextContent(gameWinner, "DRAW")
    gameWinner.style.color = "gray";
  }
}

const displayOverallResults = function (wins, losses, draws) {
  
  const boldTable = [gameCount, showWins, showLosses, showDraws];

  for (const element of boldTable){
    boldText(element);
  }
  
  fillTextContent(gameCount, wins + losses + draws);
  fillTextContent(showWins, wins);
  fillTextContent(showLosses, losses);
  fillTextContent(showDraws, draws);
}

const clearGameResults = function () {
  fillTextContent(hand.playerHand, "");
  fillTextContent(hand.aiHand, "");
}

clearOverallResults.addEventListener('click', function () {

  gameStats.wins = 0;
  gameStats.losses = 0;
  gameStats.draws = 0;

  fillTextContent(gameCount, 0);
  fillTextContent(showWins, 0);
  fillTextContent(showLosses, 0);
  fillTextContent(showDraws, 0);

  fillTextContent(yourChoice, "");
  fillTextContent(opponent, "");
  fillTextContent(gameWinner, "");

  hand.playerHand = "";

  clearShadowBox();
})

hands.forEach(hand => hand.addEventListener('click', handSelection));

document.querySelector('.play').addEventListener('click', startGame);

function startGame() {

  if (!hand.playerHand) return alert('Pick first!');

  clearShadowBox();
  hand.aiHand = aiChoice();
  const gameResult = checkResult(hand.playerHand, hand.aiHand);
  displayGameResults(hand.playerHand, hand.aiHand, gameResult);
  displayOverallResults(gameStats.wins, gameStats.losses, gameStats.draws);
  hand.playerHand = "";
}