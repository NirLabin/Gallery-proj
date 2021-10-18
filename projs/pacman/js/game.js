'use strict';
const WALL = '⛔️';
const FOOD = '▫️';
const EMPTY = ' ';
const POWER_FOOD = '🍌';
const CHERRY = '🍒';

var cherryInterval;
var gEmptyPlace = [];
var gBoard;
var gGame = {
  score: 0,
  foodCounter: 56,
  isOn: false,
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  cherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1)
      ) {
        board[i][j] = POWER_FOOD;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
  clearInterval(cherryInterval);
  var elModal = document.querySelector('.modal ');
  elModal.style.display = 'block';
  var strHtml = '';
  if (checkFood()) {
    strHtml +=
      '<h2>Victorious</h2> <button onclick="playAgain()">PLAY AGAIN</button>';
  } else {
    strHtml +=
      '<h2>Game over...</h2> <button onclick="playAgain()">PLAY AGAIN</button>';
  }
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  var elModal = document.querySelector('.modal');
  elModal.innerHTML = strHtml;
}

function checkFood() {
  if (gGame.foodCounter === 0) return true;
  else return false;
}

function playAgain() {
  location.reload();
}

function addCherry() {
  var random = Math.floor(Math.random() * gEmptyPlace.length);
  gBoard[gEmptyPlace[random].i][gEmptyPlace[random].j] = CHERRY;
  renderCell(gEmptyPlace[random], CHERRY);
}
