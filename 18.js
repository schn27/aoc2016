"use strict";

function calc() {
	let row = input.split("");
	let numberOfSafeTiles = 0;
	let numberOfSafeTiles1 = null;

	for (let i = 0; i < requiredRows2; ++i) {
		if (numberOfSafeTiles1 == null && i >= requiredRows) {
			numberOfSafeTiles1 = numberOfSafeTiles;
		}

		numberOfSafeTiles += getNumberOfSafeTiles(row);
		row = generateRowFrom(row);
	}

	return numberOfSafeTiles1 + " " + numberOfSafeTiles;
}

function getNumberOfSafeTiles(row) {
	return row.filter(c => c == ".").length;
}

function generateRowFrom(row) {
	return row.map((c, i) => getTileType((row[i - 1] || ".") + c + (row[i + 1] || ".")));
}

function getTileType(tiles) {
	return ((tiles == "^^.") || (tiles == ".^^") || (tiles == "^..") || (tiles == "..^")) ? "^" : ".";
}

const input = "......^.^^.....^^^^^^^^^...^.^..^^.^^^..^.^..^.^^^.^^^^..^^.^.^.....^^^^^..^..^^^..^^.^.^..^^..^^^..";
const requiredRows = 40;
const requiredRows2 = 400000;
