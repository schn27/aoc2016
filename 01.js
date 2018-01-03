"use strict";

function calc() {
	let coords = [0, 0];
	let heading = [0, 1];
	let bunnyCoords = null;
	let track = {"0:0": 1};

	input.split(", ").map(e => [e.slice(0, 1), e.slice(1)]).forEach(cmd => {
		const sign = (cmd[0] === "R") ? 1 : -1;
		heading = [sign * heading[1], -sign * heading[0]];
		
		for (let step = +cmd[1]; step > 0; --step) {
			coords = coords.map((c, i) => c + heading[i]);
			
			if (bunnyCoords == null) {
				let key = coords.join(":");
				if (track[key] != undefined) {
					bunnyCoords = coords.slice();
				} else {
					track[key] = 1;
				}
			}
		}
	});

	return getTaxiCubDistance([0, 0], coords) + " " + getTaxiCubDistance([0, 0], bunnyCoords);
}

function getTaxiCubDistance(from, to) {
	return to.reduce((s, e, i) => s + Math.abs(e - from[i]));
}

const input = "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5";
