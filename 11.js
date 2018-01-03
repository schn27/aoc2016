"use strict";

function calc() {
	let column = new Column(input);
	let column2 = new Column(input);

	column2.injectObject(0, {type: "elerium", device: "generator"});
	column2.injectObject(0, {type: "elerium", device: "microchip"});
	column2.injectObject(0, {type: "dilithium", device: "generator"});
	column2.injectObject(0, {type: "dilithium", device: "microchip"});

	return column.solve() + " " + column2.solve();
}

function Column(description) {
	let elevator = 0;
	let floors = [];

	parseDescription();

	this.solve = () => {
		let moves = 0;

		const isGoalReached = () => 
			floors.slice(0, floors.length - 1).every(f => f.length == 0);

		while (!isGoalReached()) {
			++moves;

			let goingUp = (elevator == 0) || (floors[elevator - 1].length == 0);

			if (goingUp) {
				moveUp();
			} else {
				moveDown();
			}
		}

		return moves;
	}

	this.injectObject = (floor, object) => floors[floor].push(object);

	function moveUp() {
		for (let i = 0; i < floors[elevator].length - 1; ++i) {
			for (let j = i; j < floors[elevator].length; ++j) {
				let object1 = floors[elevator][i];
				let object2 = floors[elevator][j];
				let newSrcFloor = removeFromFloor(removeFromFloor(floors[elevator], object1), object2);
				let newDstFloor = addToFloor(addToFloor(floors[elevator + 1], object1), object2);

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
		for (let i = 0; i < floors[elevator].length; ++i) {
			let object = floors[elevator][i];
			let newSrcFloor = removeFromFloor(floors[elevator], object);
			let newDstFloor = addToFloor(floors[elevator - 1], object);

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
		return [...floor, object];
	}

	function removeFromFloor(floor, object) {
		let newFloor = floor.slice();
		newFloor.splice(newFloor.indexOf(object), 1);
		return newFloor;	
	}

	function isFloorOk(floor) {
		let pairs = [];

		floor.forEach(o => {
			if (pairs[o.type] == undefined) {
				pairs[o.type] = 0;
			}

			pairs[o.type] |= (o.device === "microchip") ? 1 : 2;
		});

		let unpairedMicrochip = false;
		let anyGenerator = false;

		pairs.forEach(pair => {
			if (pair == 1) {
				unpairedMicrochip = true;
			} else if (pair == 2 || pair == 3) {
				anyGenerator = true;
			}
		});

		return !(unpairedMicrochip && anyGenerator);
	}

	function parseDescription() {
		description.split("\n").forEach(line => parseFloorObjects(line));
	}

	function parseFloorObjects(line, objects) {
		let words = line.split(" ");
		let floor = parseFloorNumber(words[1]);

		if (floors[floor] == undefined) {
			floors[floor] = [];
		}

		for (let i = 4; i < words.length; ++i) {
			if ((words[i] === "a") || (words[i] === "an")) {
				let type = words[i + 1];
				let device = words[i + 2].split(",").join("").split(".").join("");

				if (device === "microchip") {
					type = type.split("-")[0];
				}

				floors[floor].push({type, device});

				i += 2;
			}
		}
	}

	function parseFloorNumber(floorNumber) {
		const floorList = ["first", "second", "third", "fourth"];
		return floorList.indexOf(floorNumber);
	}
}

const input = `The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
The fourth floor contains nothing relevant.`;
