"use strict";

function calc() {
	var scrambler = new Scrambler("abcdefgh");

	input.split("\n").forEach(function(line) {
		scrambler.doCommand(line);
	});

	var unScrambler = new Scrambler("fbgdceah");

	input.split("\n").reverse().forEach(function(line) {
		unScrambler.doCommand(line, "undo");
	});

	return scrambler.getScrambled() + " " + unScrambler.getScrambled();
}

function Scrambler(initString) {
	var scrambled = initString.split("");

	this.getScrambled = function() {
		return scrambled.join("");
	}

	this.doCommand = function(command, undo) {
		var tokens = command.split(" ");

		switch (tokens[0] + " " + tokens[1]) {
		case "swap position":
			doSwapPosition(+tokens[2], +tokens[5]);
			break;

		case "swap letter":
			doSwapLetter(tokens[2], tokens[5]);
			break;

		case "rotate left":
			if (undo == "undo") {
				doRotateRight(+tokens[2]);
			} else {
				doRotateLeft(+tokens[2]);
			}
			break;

		case "rotate right":
			if (undo == "undo") {
				doRotateLeft(+tokens[2]);
			} else {
				doRotateRight(+tokens[2]);
			}
			break;

		case "rotate based":
			if (undo == "undo") {
				undoRotateBased(tokens[6]);
			} else {
				doRotateBased(tokens[6]);
			}
			break;

		case "reverse positions":
			doReverse(+tokens[2], +tokens[4]);
			break;

		case "move position":
			if (undo == "undo") {
				doMove(+tokens[5], +tokens[2]);
			} else {
				doMove(+tokens[2], +tokens[5]);
			}
			break;
		}
	}

	function doSwapPosition(x, y) {
		var sx = scrambled[x];
		scrambled[x] = scrambled[y];
		scrambled[y] = sx;
	}

	function doSwapLetter(x, y) {
		for (var i = 0; i < scrambled.length; ++i) {
			if (scrambled[i] == x) {
				scrambled[i] = y;
			} else if (scrambled[i] == y) {
				scrambled[i] = x;
			}
		}
	}

	function doRotateLeft(x) {
		rotate(-x);
	}

	function doRotateRight(x) {
		rotate(x);	
	}

	function doRotateBased(x) {
		var index = scrambled.indexOf(x);
		rotate(1 + index + (index >= 4 ? 1 : 0));
	}

	function undoRotateBased(x) {
		var steps = [1, 1, 6, 2, 7, 3, 0, 4];
		rotate(-steps[scrambled.indexOf(x)]);
	}

	function rotate(steps) {
		var result = new Array(scrambled.length);
		
		for (var i = 0; i < scrambled.length; ++i) {
			if (steps >= 0) {
				result[(i + steps) % scrambled.length] = scrambled[i];
			} else {
				result[i] = scrambled[(i - steps) % scrambled.length];
			}
		}

		scrambled = result;
	}

	function doReverse(x, y) {
		scrambled = scrambled.slice(0, x).concat(scrambled.slice(x, y + 1).reverse()).concat(scrambled.slice(y + 1, scrambled.length));
	}

	function doMove(x, y) {
		var result = scrambled.slice(0, x).concat(scrambled.slice(x + 1, scrambled.length));
		result = result.slice(0, y).concat(scrambled[x]).concat(result.slice(y, result.length));
		scrambled = result;
	}
}

var input = `swap position 2 with position 7
swap letter f with letter a
swap letter c with letter a
rotate based on position of letter g
rotate based on position of letter f
rotate based on position of letter b
swap position 3 with position 6
swap letter e with letter c
swap letter f with letter h
rotate based on position of letter e
swap letter c with letter b
rotate right 6 steps
reverse positions 4 through 7
rotate based on position of letter f
swap position 1 with position 5
rotate left 1 step
swap letter d with letter e
rotate right 7 steps
move position 0 to position 6
swap position 2 with position 6
swap position 2 with position 0
swap position 0 with position 1
rotate based on position of letter d
rotate right 2 steps
rotate left 4 steps
reverse positions 0 through 2
rotate right 2 steps
move position 6 to position 1
move position 1 to position 2
reverse positions 2 through 5
move position 2 to position 7
rotate left 3 steps
swap position 0 with position 1
rotate based on position of letter g
swap position 5 with position 0
rotate left 1 step
swap position 7 with position 1
swap letter g with letter h
rotate left 1 step
rotate based on position of letter g
reverse positions 1 through 7
reverse positions 1 through 4
reverse positions 4 through 5
rotate left 2 steps
swap letter f with letter d
swap position 6 with position 3
swap letter c with letter e
swap letter c with letter d
swap position 1 with position 6
rotate based on position of letter g
move position 4 to position 5
swap letter g with letter h
rotate based on position of letter h
swap letter h with letter f
swap position 3 with position 6
rotate based on position of letter c
rotate left 3 steps
rotate based on position of letter d
swap position 0 with position 7
swap letter e with letter d
move position 6 to position 7
rotate right 5 steps
move position 7 to position 0
rotate left 1 step
move position 6 to position 2
rotate based on position of letter d
rotate right 7 steps
swap position 3 with position 5
move position 1 to position 5
rotate right 0 steps
move position 4 to position 5
rotate based on position of letter b
reverse positions 2 through 4
rotate right 3 steps
swap letter b with letter g
rotate based on position of letter a
rotate right 0 steps
move position 0 to position 6
reverse positions 5 through 6
rotate left 2 steps
move position 3 to position 0
swap letter g with letter b
move position 6 to position 1
rotate based on position of letter f
move position 3 to position 2
reverse positions 2 through 7
swap position 0 with position 4
swap letter e with letter b
rotate left 4 steps
reverse positions 0 through 4
rotate based on position of letter a
rotate based on position of letter b
rotate left 6 steps
rotate based on position of letter d
rotate left 7 steps
swap letter c with letter d
rotate left 3 steps
move position 4 to position 6
move position 3 to position 2
reverse positions 0 through 6`;
