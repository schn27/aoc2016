"use strict";

function calc() {
	return getGameResult(input) + " " + getGame2Result(input);
}

function getGameResult(n) {
	let pow2 = getNearestPow2(n);
	return (n == pow2) ? 1 : ((n - (pow2 >> 1)) * 2 + 1);
}

function getGame2Result(n) {
	let pow3 = getNearestPow3(n);
	return (n < 2 * pow3 / 3) ? (n - pow3 / 3) : (2 * n - pow3);
}

function getNearestPow2(value) {
	let result = value - 1;
	
	result |= result >> 1;
	result |= result >> 2;
	result |= result >> 4;
	result |= result >> 8;
	result |= result >> 16;
	result |= result >> 64;

	return result + 1;
}

function getNearestPow3(value) {
	let pow3 = 1;
	
	while (pow3 < value) {
		pow3 *= 3;
	}

	return pow3;
}

const input = 3004953;
