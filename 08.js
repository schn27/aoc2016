"use strict";

function calc() {
	var display = new Display(50, 6);

	input.split("\n").forEach(function(line) {
		display.doCommand(line);
	});

	return display.getNumberOfLitPixels() + "<pre><code>" + display.logPixelsToString() + "</code></pre>";
}

function Display(width, height) {
	var pixels = [];

	for (var j = 0; j < height; ++j) {
		var row = new Array(width);
		row.fill(0);
		pixels.push(row);
	}

	this.logPixelsToString = function() {
		var res = "";
		for (var y = 0; y < height; ++y) {
			/*
			 * replace all '0' with '.', and '1' with "#" 
			 * (http://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript)
			 */
			res += pixels[y].join("").split("0").join(".").split("1").join("#") + "\n";
		}

		return res;
	}

	this.getNumberOfLitPixels = function() {
		var res = 0;
		for (var y = 0; y < height; ++y) {
			for (var x = 0; x < width; ++x) {
				res += pixels[y][x];
			}
		}

		return res;
	}

	this.doCommand = function(command) {
		var args = command.split(" ");
		if (args[0] == "rect" && args.length == 2) {
			doRect(args[1].split("x")[0], args[1].split("x")[1]);
		} else if (args[0] == "rotate" && args.length == 5 && args[3] == "by") {
			if (args[1] == "row") {
				doRotateRow(+args[2].split("=")[1], +args[4]);
			} else if (args[1] == "column") {
				doRotateColumn(+args[2].split("=")[1], +args[4]);
			} else {
				console.log("Unknown rotate command: '" + command + "'");
			}
		} else {
			console.log("Unknown command: '" + command + "'");
		}
	}

	function doRect(w, h) {
		for (var y = 0; y < h; ++y) {
			for (var x = 0; x < w; ++x) {
				pixels[y][x] = 1;
			}
		}
	}

	function doRotateRow(y, n) {
		if (y >= height) {
			return;
		}

		var row = new Array(width);

		for (var x = 0; x < width; ++x) {
			row[(x + n) % width] = pixels[y][x];
		}

		pixels[y] = row;
	}

	function doRotateColumn(x, n) {
		if (x >= width) {
			return;
		}

		var column = new Array(height);

		for (var y = 0; y < height; ++y) {
			column[(y + n) % height] = pixels[y][x];
		}

		for (var y = 0; y < height; ++y) {
			pixels[y][x] = column[y];
		}
	}	
}

var input = `rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x2
rotate row y=1 by 5
rotate row y=0 by 3
rect 1x2
rotate column x=30 by 1
rotate column x=25 by 1
rotate column x=10 by 1
rotate row y=1 by 5
rotate row y=0 by 2
rect 1x2
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=2 by 18
rotate row y=0 by 5
rotate column x=0 by 1
rect 3x1
rotate row y=2 by 12
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate column x=20 by 1
rotate row y=2 by 5
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=2 by 15
rotate row y=0 by 15
rotate column x=10 by 1
rotate column x=5 by 1
rotate column x=0 by 1
rect 14x1
rotate column x=37 by 1
rotate column x=23 by 1
rotate column x=7 by 2
rotate row y=3 by 20
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=3 by 5
rotate row y=2 by 2
rotate row y=1 by 4
rotate row y=0 by 4
rect 1x4
rotate column x=35 by 3
rotate column x=18 by 3
rotate column x=13 by 3
rotate row y=3 by 5
rotate row y=2 by 3
rotate row y=1 by 1
rotate row y=0 by 1
rect 1x5
rotate row y=4 by 20
rotate row y=3 by 10
rotate row y=2 by 13
rotate row y=0 by 10
rotate column x=5 by 1
rotate column x=3 by 3
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=4 by 10
rotate row y=3 by 10
rotate row y=1 by 10
rotate row y=0 by 10
rotate column x=7 by 2
rotate column x=5 by 1
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=4 by 20
rotate row y=3 by 12
rotate row y=1 by 15
rotate row y=0 by 10
rotate column x=8 by 2
rotate column x=7 by 1
rotate column x=6 by 2
rotate column x=5 by 1
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate column x=46 by 2
rotate column x=43 by 2
rotate column x=24 by 2
rotate column x=14 by 3
rotate row y=5 by 15
rotate row y=4 by 10
rotate row y=3 by 3
rotate row y=2 by 37
rotate row y=1 by 10
rotate row y=0 by 5
rotate column x=0 by 3
rect 3x3
rotate row y=5 by 15
rotate row y=3 by 10
rotate row y=2 by 10
rotate row y=0 by 10
rotate column x=7 by 3
rotate column x=6 by 3
rotate column x=5 by 1
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate column x=19 by 1
rotate column x=10 by 3
rotate column x=5 by 4
rotate row y=5 by 5
rotate row y=4 by 5
rotate row y=3 by 40
rotate row y=2 by 35
rotate row y=1 by 15
rotate row y=0 by 30
rotate column x=48 by 4
rotate column x=47 by 3
rotate column x=46 by 3
rotate column x=45 by 1
rotate column x=43 by 1
rotate column x=42 by 5
rotate column x=41 by 5
rotate column x=40 by 1
rotate column x=33 by 2
rotate column x=32 by 3
rotate column x=31 by 2
rotate column x=28 by 1
rotate column x=27 by 5
rotate column x=26 by 5
rotate column x=25 by 1
rotate column x=23 by 5
rotate column x=22 by 5
rotate column x=21 by 5
rotate column x=18 by 5
rotate column x=17 by 5
rotate column x=16 by 5
rotate column x=13 by 5
rotate column x=12 by 5
rotate column x=11 by 5
rotate column x=3 by 1
rotate column x=2 by 5
rotate column x=1 by 5
rotate column x=0 by 1`;
