"use strict";

function calc() {
	return getCheckSum(getData(input, size)) + " " + getCheckSum(getData(input, size2));
}

function getData(str, size) {
	while (str.length < size) {
		var result = str + "0";
		
		str.split("").reverse().forEach(function(c) {
			result += c == "0" ? "1" : "0";
		});

		str = result;
	}

	return str.slice(0, size);
}

function getCheckSum(str) {
	while (!(str.length % 2)) {
		var result = [];

		for (var i = 0; i < str.length; i += 2) {
			result.push(str[i] == str[i + 1] ? "1" : "0");
		}

		str = result.join("");
	}

	return str;
}

var input = "00111101111101000";
var size = 272;
var size2 = 35651584;