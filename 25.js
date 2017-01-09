"use strict";

function calc() {
	
	for (var a = 0; a < 10000; ++a) {
		var cpu = new Cpu(input, "0101");
		cpu.setRegisterValue("a", 0);
		cpu.execute();

		console.log(a + " " + cpu.getOutput());
	}

	return null;
}

function Cpu(programText, outputPattern) {
	var program = parseProgramText(programText);

	var registers = [];

	registers["pc"] = 0;
	registers["a"] = 0;
	registers["b"] = 0;
	registers["c"] = 0;
	registers["d"] = 0;

	var output = [];

	this.execute = function() {
		while ((registers["pc"] < program.length) 
				&& (output.length < outputPattern.length && outputPattern.slice(0, output.length) == output.join(""))) {
			var command = program[registers["pc"]];

			switch (command.operation) {
			case "cpy":
				doCpy(command.operand, command.operand2);
				break;
			case "inc":
				doInc(command.operand);
				break;
			case "dec":
				doDec(command.operand);
				break;
			case "jnz":
				doJnz(command.operand, command.operand2);
				break;
			case "tgl":
				doTgl(command.operand);
				break;
			case "out":
				doOut(command.operand);
				break;
			default:
				doNop();
			}
		}
	}

	this.getRegisterValue = function(registerName) {
		return registers[registerName];
	}

	this.setRegisterValue = function(registerName, value) {
		registers[registerName] = value;
	}

	this.getOutput = function() {
		return output;
	}

	function doCpy(operand, operand2) {
		if (registers[operand2] != undefined) {
			registers[operand2] = getValue(operand);
		}

		++registers["pc"];
	}

	function doInc(operand) {
		if (registers[operand] != undefined) {
			++registers[operand];
		}

		++registers["pc"];
	}

	function doDec(operand) {
		if (registers[operand] != undefined) {
			--registers[operand];
		}

		++registers["pc"];
	}

	function doJnz(operand, operand2) {
		if (getValue(operand) != 0) {
			registers["pc"] += getValue(operand2);
		} else {
			++registers["pc"];
		}
	}

	function doTgl(operand) {
		var addr = registers["pc"] + getValue(operand);

		if (addr >= 0 && addr < program.length) {
			var command = program[addr];

			switch (command.operation) {
			case "cpy":
				command.operation = "jnz";
				break;
			case "inc":
				command.operation = "dec";
				break;
			case "dec":
				command.operation = "inc";
				break;
			case "jnz":
				command.operation = "cpy";
				break;
			case "tgl":
				command.operation = "inc";
				break;
			default:
				doNop();
			}

			program[addr] = command;
		}

		++registers["pc"];
	}

	function doOut(operand) {
		output.push(getValue(operand));
		++registers["pc"];
	}

	function doNop() {
		++registers["pc"];
	}

	function getValue(operand) {
		return (operand in registers) ? registers[operand] : parseInt(operand, 10);
	}

	function parseProgramText(text) {
		var code = [];

		text.split("\n").forEach(function(line) {
			var command = line.split(" ");
			code.push({
				operation: command[0],
				operand: command[1],
				operand2: command[2]
			});
		});

		return code;
	}
}

var input = `cpy a d
cpy 14 c
cpy 182 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;
