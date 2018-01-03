"use strict";

function calc() {
	const discs = input.split("\n").map(line => line.match(/\d+/g).map(Number));
	const discs2 = [...discs, [discs.length, 11, 0, 1]];

	return getStartTime(discs) + " " + getStartTime(discs2);
}

function getStartTime(discs) {
	let time = 0;

	while (!discs.every(d => !((d[0] + d[2] + d[3] + time) % d[1]))) {
		++time;
	}

	return time;
}

const input = `Disc #1 has 17 positions; at time=0, it is at position 1.
Disc #2 has 7 positions; at time=0, it is at position 0.
Disc #3 has 19 positions; at time=0, it is at position 2.
Disc #4 has 5 positions; at time=0, it is at position 0.
Disc #5 has 3 positions; at time=0, it is at position 0.
Disc #6 has 13 positions; at time=0, it is at position 5.`;
