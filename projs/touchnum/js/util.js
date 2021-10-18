'use strict';

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function createNumbers(size) {
	var nums = [];
	for (var i = 0; i < size ** 2; i++) nums.push(i + 1);

	return nums;
}

function drawNum() {
	var idx = getRandomInt(0, gNumbers.length);
	var num = gNumbers[idx];
	gNumbers.splice(idx, 1);
	return num;
}
