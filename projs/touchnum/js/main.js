'use strict';
var gSize;
var gNumbers;
var elDisplayTime = document.querySelector('.display span');
var elRecord = document.querySelector('.record');
var elRestart = document.querySelector('.restart');
var elBtnsCon = document.querySelector('.btns');

var nextNum = 1;
var gInterval;

function sizeChoose(elBtn, size) {
  gSize = size;
  gNumbers = createNumbers(gSize);
  renderBoard();
}

function renderBoard() {
  var strHtml = '';

  for (var i = 0; i < gSize; i++) {
    strHtml += '<tr>';

    for (var j = 0; j < gSize; j++) {
      strHtml += `<td onclick="cellClicked(this)" > ${drawNum()} </td>`;
    }
    strHtml += '</tr>';
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHtml;
}

function cellClicked(clickedNum) {
  if (+clickedNum.innerText !== nextNum) return;

  nextNum === 1 && timer(new Date());
  elBtnsCon.style.display = 'none';
  elRestart.style.display = 'inline-block';
  nextNum++;
  clickedNum.classList.add('clicked');

  if (+clickedNum.innerText === gSize ** 2) {
    clearInterval(gInterval);
    elRecord.innerText = `Your record is ${elDisplayTime.innerText}`;
  }
}

function timer(start) {
  function startTimer() {
    elDisplayTime.innerText = `${(new Date() - start) / 1000}`;
  }
  gInterval = setInterval(startTimer, 1);
}
function restartGame(elBtn) {
  location.reload();
}
