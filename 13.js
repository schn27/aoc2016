"use strict";

function calc() {
	var maze = [];
	var mazeWidth = destination[0] * 2;
	var mazeHeight = destination[1] * 2;

	for (var y = 0; y < mazeHeight; ++y) {
		var line = [];
		for (var x = 0; x < mazeWidth; ++x) {
			line.push(getMazeXY(x, y, input) ? "#" : ".");
		}
		maze.push(line);
	}

	var wave = getWave(source, destination, maze);
	var wave2 = getWave([1, 0], source, maze, stepLimit + 1);	// [1, 0] will be always a wall
	var locations = 0;
	
	for (var y = 0; y < wave2.length; ++y) {
		for (var x = 0; x < wave2[0].length; ++x) {
			if (wave2[y][x] != undefined) {
				++locations;
			}
		}
	}

	return wave[source[1]][source[0]] + " " + locations;
}

function getWave(source, destination, maze, stepLimit) {
	var moves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	var wave = [];

	for (var y = 0; y < maze.length; ++y) {
		wave.push(new Array(maze[y].length));
	}

	wave[destination[1]][destination[0]] = 0;

	for (var step = 1; (wave[source[1]][source[0]] == undefined) && (stepLimit == undefined || step < stepLimit); ++step) {
		for (var y = 0; y < wave.length; ++y) {
			for (var x = 0; x < wave[y].length; ++x) {
				if (wave[y][x] == step - 1) {
					moves.forEach(function(move) {
						if ((maze[y + move[1]][x + move[0]] == ".") && (wave[y + move[1]][x + move[0]] == undefined)) {
							wave[y + move[1]][x + move[0]] = step;
						}
					});
				}
			}
		}
	}

	return wave;
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
var stepLimit = 50;
