"use strict";

function calc() {
	return getCheckSum(getData(input, size)) + " " + getCheckSum(getData(input, size2));
}

function getData(str, size) {
	while (str.length < size) {
		str += "0" + str.split("").reverse().map(c => c === "0" ? "1" : "0").join("");
	}

	return str.slice(0, size);
}

function getCheckSum(str) {
	let res = str.split("");

	while (!(res.length % 2)) {
		res = res.reduce((a, e, i) => {
			if (!(i & 1)) {
				a.push(res[i] === res[i + 1] ? "1" : "0")
			}
			return a;
		}, []);
	}

	return res.join("");
}

const input = "00111101111101000";
const size = 272;
const size2 = 35651584;