"use strict";

function calc() {
	var maze = [];

	for (var y = 0; y < 100; ++y) {
		var line = [];
		for (var x = 0; x < 100; ++x) {
			line.push(getMazeXY(x, y, input) ? "#" : ".");
		}
		maze.push(line);
	}

	var wave = waveAlgorithm(source, destination, maze);
	var wave2 = waveAlgorithm([1, 0], source, maze, 51);	// [1, 0] will be always a wall
	var locations = 0;
	
	for (var y = 0; y < 100; ++y) {
		for (var x = 0; x < 100; ++x) {
			if (wave2[y][x] != undefined) {
				++locations;
			}
		}
	}

	return getSteps(source, wave) + " " + locations;
}

function waveAlgorithm(source, destination, maze, stageLimit) {
	var moves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	var wave = [];

	for (var y = 0; y < maze.length; ++y) {
		wave.push(new Array(maze[y].length));
	}

	wave[destination[1]][destination[0]] = 0;

	for (var stage = 1; (wave[source[1]][source[0]] == undefined) && (stageLimit == undefined || stage < stageLimit); ++stage) {
		for (var y = 0; y < wave.length; ++y) {
			for (var x = 0; x < wave[y].length; ++x) {
				if (wave[y][x] == stage - 1) {
					moves.forEach(function(move) {
						if ((maze[y + move[1]][x + move[0]] == ".") && (wave[y + move[1]][x + move[0]] == undefined)) {
							wave[y + move[1]][x + move[0]] = stage;
						}
					});
				}
			}
		}
	}

	return wave;
}

function getSteps(source, wave) {
	var moves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	var steps = 0;
	var coord = source.slice();

	for (;;) {
		var stage = wave[coord[1]][coord[0]];
		
		if (stage == 0) {
			return steps;
		}

		for (var i = 0; i < moves.length; ++i) {
			if (wave[coord[1] + moves[i][1]][coord[0] + moves[i][0]] == stage - 1) {
				coord[0] += moves[i][0];
				coord[1] += moves[i][1];
				break;
			}
		}

		++steps;
	}
}

function getMazeXY(x, y, c) {
	return getParity32(x * x + 3 * x + 2 * x * y + y + y * y + c);
}

function getParity32(value) {
	var result = ((value & 0xAAAAAAAA) >> 1) + (value & 0x55555555);
	result = ((result & 0xCCCCCCCC) >> 2) + (result & 0x33333333);
	result = ((result & 0xF0F0F0F0) >> 4) + (result & 0x0F0F0F0F);
	result = ((result & 0xFF00FF00) >> 8) + (result & 0x00FF00FF);
	result = ((result & 0xFFFF0000) >> 16) + (result & 0x0000FFFF);
	return !!(result % 2);
}

var source = [1, 1];
var destination = [31, 39];
var input = 1364;
