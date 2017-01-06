"use strict";

function calc() {
	var column = new Column(input);
	var column2 = new Column(input);

	column2.injectObject(0, {type: "elerium", device: "generator"});
	column2.injectObject(0, {type: "elerium", device: "microchip"});
	column2.injectObject(0, {type: "dilithium", device: "generator"});
	column2.injectObject(0, {type: "dilithium", device: "microchip"});

	return column.solve() + " " + column2.solve();
}

function Column(description) {
	var elevator = 0;
	var floors = [];

	parseDescription();

	this.solve = function() {
		var moves = 0;

		while (!isGoalReached()) {
			++moves;

			var goingUp = (elevator == 0) || (floors[elevator - 1].length == 0);

			if (goingUp) {
				moveUp();
			} else {
				moveDown();
			}
		}

		return moves;
	}

	this.injectObject = function(floor, object) {
		floors[floor].push(object);
	}

	function isGoalReached() {
		var result = true;

		for (var i = 0; i < floors.length - 1; ++i) {
			result &= floors[i].length == 0;
		}

		return !!result;
	}

	function moveUp() {
		for (var i = 0; i < floors[elevator].length - 1; ++i) {
			for (var j = i; j < floors[elevator].length; ++j) {
				var object1 = floors[elevator][i];
				var object2 = floors[elevator][j];
				var newSrcFloor = removeFromFloor(removeFromFloor(floors[elevator], object1), object2);
				var newDstFloor = addToFloor(addToFloor(floors[elevator + 1], object1), object2);

				if (isFloorOk(newSrcFloor) && isFloorOk(newDstFloor)) {
					floors[elevator] = newSrcFloor;
					floors[elevator + 1] = newDstFloor;
					++elevator;
					return;
				}
			}
		}

		throw new Exception("Can't move up");
	}

	function moveDown() {
		for (var i = 0; i < floors[elevator].length; ++i) {
			var object = floors[elevator][i];
			var newSrcFloor = removeFromFloor(floors[elevator], object);
			var newDstFloor = addToFloor(floors[elevator - 1], object);

			if (isFloorOk(newSrcFloor) && isFloorOk(newDstFloor)) {
				floors[elevator] = newSrcFloor;
				floors[elevator - 1] = newDstFloor;
				--elevator;
				return;
			}
		}

		throw new Exception("Can't move down");
	}

	function addToFloor(floor, object) {
		var newFloor = floor.slice();
		newFloor.push(object);
		return newFloor;
	}

	function removeFromFloor(floor, object) {
		var newFloor = floor.slice();
		newFloor.splice(newFloor.indexOf(object), 1);
		return newFloor;	
	}

	function isFloorOk(floor) {
		var pairs = [];

		floor.forEach(function(o) {
			if (pairs[o.type] == undefined) {
				pairs[o.type] = 0;
			}

			pairs[o.type] |= (o.device == "microchip") ? 1 : 2;
		});

		var unpairedMicrochip = false;
		var anyGenerator = false;

		pairs.forEach(function(pair) {
			if (pair == 1) {
				unpairedMicrochip = true;
			} else if (pair == 2 || pair == 3) {
				anyGenerator = true;
			}
		});

		return !(unpairedMicrochip && anyGenerator);
	}

	function parseDescription() {
		description.split("\n").forEach(function(line) {
			parseFloorObjects(line);
		});
	}

	function parseFloorObjects(line, objects) {
		var words = line.split(" ");
		var floor = parseFloorNumber(words[1]);

		if (floors[floor] == undefined) {
			floors[floor] = [];
		}

		for (var i = 4; i < words.length; ++i) {
			if ((words[i] == "a") || (words[i] == "an")) {
				var type = words[i + 1];
				var device = words[i + 2].split(",").join("").split(".").join("");

				if (device == "microchip") {
					type = type.split("-")[0];
				}

				floors[floor].push({
					type: type,
					device: device,
					toString: function() {return this.type + " " + this.device;}
				});

				i += 2;
			}
		}
	}

	function parseFloorNumber(floorNumber) {
		var floorList = ["first", "second", "third", "fourth"];
		return floorList.indexOf(floorNumber);
	}
}

var input = `The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
The fourth floor contains nothing relevant.`;
