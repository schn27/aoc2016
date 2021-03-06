"use strict";

function calc() {
	let map = parseInput();
	let optimal = getOptimalPath(map, false);
	let optimalLooped = getOptimalPath(map, true);

	return optimal + " " + optimalLooped;
}

function getOptimalPath(map, looped) {
	let distMatrix = getDistMatrix(map);

	let optimalLength = null;

	let targets = [];
	for (let i = 1; i < map.targets.length; ++i) {
		targets.push(i);
	}

	for (let p = 0, totalPermutations = getFactorial(targets.length); p < totalPermutations; ++p) {
		let arrangedTargets = getPermutation(targets, p);
		let prevTarget = 0;
		let length = 0;

		for (let i = 0; i < arrangedTargets.length; ++i) {
			length += distMatrix[prevTarget][arrangedTargets[i]];
			prevTarget = arrangedTargets[i];

			if (optimalLength != null && length >= optimalLength) {
				break;
			}
		}

		if (looped) {
			length += distMatrix[prevTarget][0];
		}

		if (optimalLength == null || length < optimalLength) {
			optimalLength = length;
		}
	}

	return optimalLength;
}

function getDistMatrix(map) {
	let distMatrix = new Array();

	for (let i = 0; i < map.targets.length; ++i) {
		let row = new Array(map.targets.length);
		row.fill(0);
		distMatrix.push(row);
	}	

	for (let i = 0; i < map.targets.length - 1; ++i) {
		for (let j = i + 1; j < map.targets.length; ++j) {
			let dist = getWaveSteps(map.targets[i], map.targets[j], map.maze);
			distMatrix[i][j] = distMatrix[j][i] = dist;
		}
	}

	return distMatrix;	
}

function getWaveSteps(src, dst, maze) {
	let wave = [];

	for (let y = 0; y < maze.length; ++y) {
		wave.push(new Array(maze[y].length));
	}

	wave[dst[1]][dst[0]] = 0;

	const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	let step;

	for (step = 1; wave[src[1]][src[0]] == undefined; ++step) {
		for (let y = 0; y < wave.length; ++y) {
			for (let x = 0; x < wave[y].length; ++x) {
				if (wave[y][x] == step - 1) {
					moves.forEach(move => {
						if ((maze[y + move[1]][x + move[0]] == ".") && (wave[y + move[1]][x + move[0]] == undefined)) {
							wave[y + move[1]][x + move[0]] = step;
						}						
					});
				}
			}
		}
	}

	return step - 1;
}

function getPermutation(atoms, index) {
	let src = atoms.slice();
	let dest = [];

	for (let i = 0; i < atoms.length; ++i) {
		let item = index % src.length;
		index = Math.floor(index / src.length);
		dest.push(src[item]);
		src.splice(item, 1);
	}

	return dest;
}

function getFactorial(n) {
	let result = n;
	
	while (--n > 0) {
		result *= n;
	}

	return result;
}

function parseInput() {
	let result = {maze: [], targets: []};

	input.split("\n").forEach(line => {
		let row = [];
		
		line.split("").forEach(c => {
			if (c >= "0" && c <= "9") {
				result.targets[+c] = [row.length, result.maze.length];
				c = ".";
			}

			row.push(c);
		});

		result.maze.push(row);
	});

	return result;
}

const input = `#####################################################################################################################################################################################
#.....#...#.#...............#...........#.......#.#...#.......#...#.......#.....#.............#.........#...#.........#.......#.#.#4....#.....#...#.......#.........#.#.....#.......#
###.###.#.#.###.###.#.#####.#.###.#.###.#.#.#.#.#.#.#.###.###.#.#.#.###.#.#.###.#.###.#.#.#######.#.#.#.###.#.#.#.###.#.#####.#.#.###.###.#.###.#.###.#.#.#.###.###.#.#.#.#.#.#.#.###
#...#.....#.....#...#.......#.#.#.#.#...#.....#.#...#.....#...#...#.#...#.#.......#.....#.#.........#...#.#.#...#...#.........#...#.......#.#...#.........#.#...#...#.#.#.#.....#...#
#.###.###.#.#.#.#.#######.#.#.#.#.#.###.#.#.###.#.###.#.###.#.#.#.#########.###.#.#.#.###.###.#.###.###.#.#.#.#.#####.#.###.#.#.###.#.#.#.#.###.###.#.#####.#.#####.#.###.#.###.#.#.#
#.#.....#.#.....#.....#...#.....#.#...#...#.#.......#.#.#.....#.......#...#...#.#.#.#.....#...#.#.#.....#...#.#.#...........#...#...#.#.#.....#...........#.#.#.......#.............#
#.#####.#####.#.#####.#.#.#.###.#.#.#.#.#.#####.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.###.#.###.#.#.#.###.#.#.#.###.#.#.#.###.#.#.###########.#.###.#.#.#.#.#.#.#.#####.#.###.#.#####.###.#.#
#...#.....#.......#.#.#.#...#...#...#.#.#.......#.....#.........#.#...........#.#.........#.#.....................#.......#.....#.............#.........#.....#.....#...#.#.#.......#
#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#####.#####.#.###.#.#.###.#.#####.###.#.#.#.#######.#.#.#######.#.#.###.#.#.#.#######.###.###.###.#######.#.#####.#.#.#.#.###.###.#.#.#######.#
#...............#...#.#6..#...#...#...#...#.........#...#.#.....#.....#...#.#.....#.......#...#.#.....#...#.....#.........#...........#.#...........#...#0..#.............#.#...#...#
#.#.#####.#########.#.#####.#.#.#######.#.#.#.#.###.###.#.###.#.#####.#.#.#.#########.#.#######.#.#.#.#.#.#.#.#.#.###.###.#.#.#######.###.#########.#.#.###.#.#.#.#.#.###.#.#.###.#.#
#.#.....#.#.#...#.....#.....#...#.............#...#.......#...#...#...#.#.#.....#.#...#.......#.#...#.......#.#...#...#.......#.....#...#...#...#.#...#.....#.#...#...#.#...#.#...#.#
#.###.#.###.#.#.#.###.###.#.###.#.#.###.#####.#####.#.#####.###.#.#######.###.#.#.#########.###.#.#.#.###.#.#.###.###.#.###.###.###.#.#.#####.###.#.#.###.#.#.###.#.###.#####.#.###.#
#.#.........#.#.........#.......#...#.........#.................#.....#.#.......#.#.....#.#.....#.#.........#.....#.#.......#.#.............#.....#...#.....#.....#.......#.......#.#
###.#####.#.#.#.#.#.###.#.#.#.#.#.#.#.#.#.###.#.#.#.#.###.###.#.#.#.###.#.#.###.#.#.#.###.#.#.#####.###.###.#.###.#.###.###.#.###.#.###.#####.#.#.#.#####.#.#.#.#####.###.#.#.###.#.#
#...#...#.#...#.....#...#...#...#...#.#.......#.#.#.....#...#.#.....#.........#.#...#.......#.......#.#...#.....#...#.............#...............#.....#.#.....#...#.#...#.........#
#.###.#.#.#.#.#.#.#.#.#####.#####.#.#####.#######.#####.#.#########.###.#.###.#.#.###.#.#.#.#.#.#.#.#.#.#.###.#.###.#.#.#.#.###.#.#.#.###.#####.###.#.#.#.#.#.#.#.#.#.#.#.#.#####.###
#.#.....#...#.......#...#.#.#.#.#...#...#...#...#...................#...........#.....#.#...#.........#.#.......#.#...#.#.#.#...................#...#...#.#...#.....#.#1#.....#.....#
###.#.#####.#.#.#.#.###.#.###.#.#.#.#.#.###.#.#.#.#.#.#.#####.###.###.#.#.#.#.#.#.###.#.#.#.###.#######.#.###.#.#.#.#.###.#.#########.#.#.#.#.#.###.#.#.#####.###.#.#########.#.#.#.#
#.#...#.....#.....#...#.#.#...#.......#...#.....#.#...#.....#...#.....#...#.#.....#.......#...#...#.......#...#...#...#...#...........#.#.....#...#.........#.#.....#.#.#.......#...#
#.#.#.#.#####.#.#.###.#.#.#.#.#.###.#.###.#.#.###.#.#.###.#.###.#.###.#####.#.#.#.#.#.#.###.#.#.#.#.#.###.#####.#.#.###.#.#.###.#.#.#.#.#.#.#.#####.#.#.###.#.#.###.#.#.###.#.#.###.#
#.....#7#.#...#.#.................#...............#.#.#...#.#...#.#...#.....#...#.....#...#.#.#.......#...#...........#...........#.#.....#...#.........#.#.......#.#.#.....#.......#
#.#.#.###.#.#.###.#.#.#.#.#.#.###.#.#.#.###.#.###.#.#.#.#.#.#.#.###.#.#.#.#####.#.#.#.###.#.#.#####.#.#.###########.#.#####.#.#.#.###.#.#.#.#.#####.#.###.###.#.###.#.#.###.#.#######
#.#.....#.#.#.#...........#.#.#.......#...........#...#.......#...#.#...#.....#.#.....#...#.....#.#.......#.#.#.......#.#.......#.............#.#...#.#.#.#...........#.......#.....#
#.#####.#####.#.#.###.#.#.#.#.#####.#.#.#.###.###.#.#.#.#.#######.#.#.#.#.###.#.#.#.#.#.#.#######.#.###.###.#.#.#.#.#.#.#.#.#####.#.#.#######.#.#.###.#.#.#####.###.###.#.#.#.#.#.#.#
#.......#.#...#.....#...#.......#...#...#.....#...#.#...#...#.....#.#.#.#.....#.#.....#.....#...#...#...#.....#.#...#.#...#...#.............#.#...#.....#...#.....#.....#.#.....#.#.#
#.#.#####.#.###.#########.###.#.#.#.###.#.#.###.#.#.#.#.#.#.#.###.#.###.###.###.#####.#.###.#.#.#.#.#.#.#.###.#####.#.#.#.#.#.###.#.#.#.###.#.###.###.#.#.#.#.###.#.###.###.###.#.###
#...#.....#.#.#.#.........#...#.....#.........#...#.....#.....#.....#...................#.......#...#...#.....#.......#...#...#.......#.....#.#...#.#...#.#.........#.#.#...#.#.#...#
###.#.#.#.#.#.#.#.###.#.#.#######.###.#######.#####.#.#.#.###.#.#.###.#######.###.#.###.###########.#.#####.###.#####.#.#######.#########.###.###.#.#.#.#.#.#.#.#.#.#.###.#.#.#.#.#.#
#.....#...............#.............#...#.#.#.........#.#.....#...#.....#...#.....#.#.....#...#.#...#.#.....#.........#.#...............#.#.#...#.......#.#.....#.#...............#.#
#.#.###.#.###.###.#.#.#.#.###.#.#.#.#.#.#.#.#####.#.###.#.#.#.#.#.#.#.###.#.###.#.#.#.#.#.###.#.#.#.###.###.#.#####.#.#.#.#.#.#.#######.#.#.###.###.#.#.#.#.#.#.#.#.#####.#####.#.###
#...#...#...............#.......#...#.....#.....#.#...#.........#.#...#...#.....#...#.#...#...#...#...#.....#.#.....#.....#.#...#.....#.........#.........#.......#.......#3........#
#####.#.###.#.#.###.#####.#.#.#.###.#.#.#####.#.#.###.#.#.###.#.###.#.#.#.#.#.#.#.#.#.#.#.###.#.#####.#.#.#.#.#######.###.#.#####.#.#.#.#####.#.#.#######.#.###.###.#.#####.#.#.#.#.#
#.#...#...#...#.......#.....#...#.#...............#.#...#...#.#.....#.#.....#.#.#...#...#.........#.....#...#...........#.#.#.........#...........#...................#.....#.#.....#
#.#.###.#.#.#.#.#.###.#.#.#.#.#.#.#.#####.#.#######.#.###.###############.#.###.#.#.#.#.#####.###.#.#####.#.#.#.#.#.###.#.#.#.#.###.#.#.###.#.#####.#.#.#####.#########.#####.###.###
#.#.#.....#.....#...#...#...#.....#.........#.#...#...#.........#...#...#.......#.............#.............#.#.....#.#...#.#.......#...#.#.#...#.....#.#.......#...#...#.....#...#.#
#.#.#.#.#.#######.#.#.###.###.###.###.#.###.#.#.#.#.#.#.#.#.###.#.#.#########.#.#.###.###.#.#.#.#.#.#.#######.#.#####.#.#.#######.#.#.#.#.###.#.#.###.#.#####.#.#.#.#.#.#.#######.#.#
#.#.#.#...#...........#.#.....#.#...#.#.#.#.......#.#.....#...#.#...#.#.#...#...#.#.#.......#...#.#.....#.........#.....#.....#.#.....#...#.#.....#...#...#.......#.....#.....#.....#
#.#.#.###.#.#.###.###.#.#.#.#.#.#######.#.###.#####.###.#.#.#.###.#.#.#.###.#.###.#.###.#.###.#.#.#.###.#.#.#####.###.###.#.###.###.#.#.###.#####.#.#.###.###.###.#.###.###.#.#.#.#.#
#...#.................#.............#...#...#.......#.....#.#.#.........#...#...#.......#.#...#.....#...#.#.......#.#.......#.#...#.#.#.............#.....#...#.#...#.....#.#.#.....#
#.#.#####.#.#.#.###.#.###.#########.#.#.###.#.#.###.#.###.#.###.#####.#.#.#.#.#.#.#####.#.#.#.#####.#.#.#######.#.#.#.#####.#.#.#.#####.#.#.#.###.#####.#.#.###.#.#.#.###.#.###.#.#.#
#5....#...#.#...........#...#...#.#.#.#...#.#.#.....#...........#...#.#.......#.....#...#.........#.#.#.#.......#.#...#...#...#.#.#........2#...#.#...#...#.#...#.#...#.......#...#.#
#####################################################################################################################################################################################`;
