"use strict";

function calc() {
	var row = input.split("");
	var numberOfSafeTiles = getNumberOfSafeTiles(row);

	for (var rowCounter = 1; rowCounter < requiredRows; ++rowCounter) {
		row = generateRowFrom(row);
		numberOfSafeTiles += getNumberOfSafeTiles(row);
	}

	var numberOfSafeTiles2 = numberOfSafeTiles;

	for (; rowCounter < requiredRows2; ++rowCounter) {
		row = generateRowFrom(row);
		numberOfSafeTiles2 += getNumberOfSafeTiles(row);
	}

	return numberOfSafeTiles + " " + numberOfSafeTiles2;
}

function getNumberOfSafeTiles(row) {
	var result = 0;

	row.forEach(function(c) {
		if (c == ".") {
			++result;
		}
	});
	
	return result;
}

function generateRowFrom(row) {
	var newRow = [];

	for (var i = 0; i < row.length; ++i) {
		newRow.push(getTileType(((i == 0) ? "." : row[i - 1]) + row[i] + ((i == row.length - 1) ? "." : row[i + 1])));
	}

	return newRow;
}

function getTileType(tiles) {
	return ((tiles == "^^.") || (tiles == ".^^") || (tiles == "^..") || (tiles == "..^")) ? "^" : ".";
}

var input = "......^.^^.....^^^^^^^^^...^.^..^^.^^^..^.^..^.^^^.^^^^..^^.^.^.....^^^^^..^..^^^..^^.^.^..^^..^^^..";
var requiredRows = 40;
var requiredRows2 = 400000;
