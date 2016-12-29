"use strict";

function calc() {
	var coords = [0, 0];
	var heading = 0;
	var track = [];
	var bunnyCoords = null;

	track["0:0"] = 1;

	input.split(", ").forEach(function(command) {
		heading = turn(heading, command.substring(0, 1));
		
		for (var i = parseInt(command.substring(1)); i > 0; --i) {
			coords = move(coords, heading, 1);
			
			if (bunnyCoords == null) {
				var key = coords[0] + ":" + coords[1];
				if (track[key] !== undefined) {
					bunnyCoords = [coords[0], coords[1]];
				} else {
					track[key] = 1;
				}
			}
		}
	});

	return getTaxiCubDistance([0, 0], coords) + " " + getTaxiCubDistance([0, 0], bunnyCoords);
}

function getTaxiCubDistance(from, to) {
	return Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
}

function turn(heading, turn) {
	var newHeading = heading;

	if (turn == "L") {
		--newHeading;
	} else if (turn == "R") {
		++newHeading;
	}

	if (newHeading < 0) {
		newHeading += 4;
	} else if (newHeading >= 4) {
		newHeading -= 4;
	}

	return newHeading;
}

function move(coords, heading, distance) {
	var newCoords = [coords[0], coords[1]];

	switch (heading) {
	case 0:
		newCoords[1] += distance;
		break;
	case 1:
		newCoords[0] += distance;
		break;
	case 2:
		newCoords[1] -= distance;
		break;
	case 3:
		newCoords[0] -= distance;
		break;
	}

	return newCoords;
}

var input = "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5";
