"use strict";

function calc() {
	var discs = parseDiscs();
	var discs2 = discs.slice();
	
	discs2.push([11, discs.length + 1]);

	return getStartTime(discs) + " " + getStartTime(discs2);
}

function getStartTime(discs) {
	var time = 0;

	for (var found = false; !found;) {
		var found = true;
		
		for (var i = 0; i < discs.length && found; ++i) {
			found &= !((discs[i][1] + time) % discs[i][0]);
		}

		if (!found) {
			++time;
		} 
	}

	return time;
}

function parseDiscs() {
	var discs = [];

	input.split("\n").forEach(function(line) {
		var tokens = line.split(" ");
		var positions = +tokens[3];
		var offset = (+tokens[11] + discs.length + 1) % positions;
		discs.push([positions, offset]);
	});

	return discs;
}

var input = `Disc #1 has 17 positions; at time=0, it is at position 1.
Disc #2 has 7 positions; at time=0, it is at position 0.
Disc #3 has 19 positions; at time=0, it is at position 2.
Disc #4 has 5 positions; at time=0, it is at position 0.
Disc #5 has 3 positions; at time=0, it is at position 0.
Disc #6 has 13 positions; at time=0, it is at position 5.`;
