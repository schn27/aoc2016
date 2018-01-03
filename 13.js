"use strict";

function calc() {
	let maze = [];
	const mazeWidth = destination[0] * 2;
	const mazeHeight = destination[1] * 2;

	for (let y = 0; y < mazeHeight; ++y) {
		let line = [];
		for (let x = 0; x < mazeWidth; ++x) {
			line.push(getMazeXY(x, y, input) ? "#" : ".");
		}
		maze.push(line);
	}

	let wave = getWave(source, destination, maze);
	let wave2 = getWave([1, 0], source, maze, stepLimit + 1);	// [1, 0] will be always a wall
	
	let locations = wave2.reduce((s, r) => s + r.filter(e => !Number.isNaN(+e)).length, 0);

	return wave[source[1]][source[0]] + " " + locations;
}

function getWave(source, destination, maze, stepLimit) {
	const moves = [[0, -1], [0, 1], [-1, 0], [1, 0]];
	let wave = [];

	for (let y = 0; y < maze.length; ++y) {
		wave.push(maze[y].slice());
	}

	wave[destination[1]][destination[0]] = 0;
	let front = [destination];

	for (let step = 1; Number.isNaN(+wave[source[1]][source[0]]) && (stepLimit == undefined || step < stepLimit); ++step) {
		let newFront = [];

		front.forEach(e => {
			moves.forEach(move => {
				let [x, y] = [e[0] + move[0], e[1] + move[1]];
				if (wave[y][x] === ".") {
					wave[y][x] = step;
					newFront.push([x, y]);
				}
			});
		});

		front = newFront;
	}

	return wave;
}

function getMazeXY(x, y, c) {
	return getParity32(x * x + 3 * x + 2 * x * y + y + y * y + c);
}

function getParity32(value) {
	let result = ((value & 0xAAAAAAAA) >> 1) + (value & 0x55555555);
	result = ((result & 0xCCCCCCCC) >> 2) + (result & 0x33333333);
	result = ((result & 0xF0F0F0F0) >> 4) + (result & 0x0F0F0F0F);
	result = ((result & 0xFF00FF00) >> 8) + (result & 0x00FF00FF);
	result = ((result & 0xFFFF0000) >> 16) + (result & 0x0000FFFF);
	return !!(result % 2);
}

const source = [1, 1];
const destination = [31, 39];
const input = 1364;
const stepLimit = 50;
