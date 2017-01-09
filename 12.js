"use strict";

function calc() {
	var cpu = new Cpu(input);
	cpu.execute();

	var cpu2 = new Cpu(input);
	cpu2.setRegisterValue("c", 1);
	cpu2.execute();

	return cpu.getRegisterValue("a") + " " + cpu2.getRegisterValue("a");
}

function Cpu(programText) {
	var program = parseProgramText(programText);

	var registers = [];

	registers["pc"] = 0;
	registers["a"] = 0;
	registers["b"] = 0;
	registers["c"] = 0;
	registers["d"] = 0;

	this.execute = function() {
		while (registers["pc"] < program.length) {
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

	function doCpy(operand, operand2) {
		registers[operand2] = getValue(operand);
		++registers["pc"];
	}

	function doInc(operand) {
		++registers[operand];
		++registers["pc"];
	}

	function doDec(operand) {
		--registers[operand];
		++registers["pc"];
	}

	function doJnz(operand, operand2) {
		if (getValue(operand) != 0) {
			registers["pc"] += getValue(operand2);
		} else {
			++registers["pc"];
		}
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

var input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 14 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;
