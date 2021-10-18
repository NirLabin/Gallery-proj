'use strict';
const PACMAN = '🟡';

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;

  if (nextCell === POWER_FOOD) {
    if (gPacman.isSuper) return;
    powerUP();
    setTimeout(powerEnd, 5000);
  } else if (nextCell === FOOD || nextCell === CHERRY) {
    updateScore(nextCell === FOOD ? 1 : 10);
    gGame.foodCounter--;
    gEmptyPlace.push(nextLocation);
    if (gGame.foodCounter === 0) gameOver();
  } else if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      return;
    } else {
      killGhost(nextLocation);
      setTimeout(resetGhost, 5000);
    }
  }
  // REMOVE
  var elPrevPacman = getCellEl(gPacman.location);
  elPrevPacman.classList.remove('pacman');
  // ADD
  var elCell = getCellEl(nextLocation);
  elCell.classList.add('pacman');

  // update the model

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  //   gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, EMPTY);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      var elCell = getCellEl(nextLocation);
      elCell.classList.add('up');
      break;
    case 'ArrowDown':
      nextLocation.i++;
      var elCell = getCellEl(nextLocation);
      elCell.classList.add('down');
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      var elCell = getCellEl(nextLocation);
      elCell.classList.add('left');
      break;
    case 'ArrowRight':
      nextLocation.j++;
      var elCell = getCellEl(nextLocation);
      elCell.classList.add('right');
      break;
    default:
      return null;
  }
  return nextLocation;
}

function powerUP() {
  gPacman.isSuper = true;
  for (var i = 0; i < gGhosts.length; i++) gGhosts[i].color = COLOR_GHOST;
}
function powerEnd() {
  gPacman.isSuper = false;
  for (var i = 0; i < gGhosts.length; i++) gGhosts[i].color = gColorsGhost[i];
}

function killGhost(cell) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === cell.i && gGhosts[i].location.j === cell.j) {
      gDeadGhosts.push(gGhosts[i]);
      gGhosts.splice(i, 1);
      renderCell(gPacman.location, PACMAN);
      return;
    }
  }
}
function resetGhost() {
  gGhosts.push(...gDeadGhosts);
  gDeadGhosts = [];
  for (var i = 0; i < gGhosts.length; i++) gGhosts[i].color = gColorsGhost[i];
}
function getCellEl(location) {
  return document.querySelector(`.cell${location.i}-${location.j}`);
}
