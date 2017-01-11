"use strict";

function calc() {
	var map = parseInput();
	var optimal = getOptimalPath(map, false);
	var optimalLooped = getOptimalPath(map, true);

	return optimal + " " + optimalLooped;
}

function getOptimalPath(map, looped) {
	var distMatrix = getDistMatrix(map);

	var optimalLength = null;

	var targets = [];
	for (var i = 1; i < map.targets.length; ++i) {
		targets.push(i);
	}

	for (var p = 0, totalPermutations = getFactorial(targets.length); p < totalPermutations; ++p) {
		var arrangedTargets = getPermutation(targets, p);
		var prevTarget = 0;
		var length = 0;

		for (var i = 0; i < arrangedTargets.length; ++i) {
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
	var distMatrix = new Array();

	for (var i = 0; i < map.targets.length; ++i) {
		var row = new Array(map.targets.length);
		row.fill(0);
		distMatrix.push(row);
	}	

	for (var i = 0; i < map.targets.length - 1; ++i) {
		for (var j = i + 1; j < map.targets.length; ++j) {
			var dist = getWaveSteps(map.targets[i], map.targets[j], map.maze);
			distMatrix[i][j] = distMatrix[j][i] = dist;
		}
	}

	return distMatrix;	
}

function getWaveSteps(src, dst, maze) {
	var wave = [];

	for (var y = 0; y < maze.length; ++y) {
		wave.push(new Array(maze[y].length));
	}

	wave[dst[1]][dst[0]] = 0;

	var moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

	for (var step = 1; wave[src[1]][src[0]] == undefined; ++step) {
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

	return step - 1;
}

// http://stackoverflow.com/questions/7918806/finding-n-th-permutation-without-computing-others/24257996#24257996
function getPermutation(atoms, index) {
	var src = atoms.slice(), dest = [], item;

	for (var i = 0; i < atoms.length; ++i) {
		item = index % src.length;
		index = Math.floor(index / src.length);
		dest.push(src[item]);
		src.splice(item, 1);
	}

	return dest;
}

function getFactorial(n) {
	var result = n;
	
	while (--n > 0) {
		result *= n;
	}

	return result;
}

function parseInput() {
	var result = {
		maze: [],
		targets: []
	};

	input.split("\n").forEach(function(line) {
		var row = [];
		
		line.split("").forEach(function(c) {
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

var input = `#####################################################################################################################################################################################
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
