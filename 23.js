"use strict";

function calc() {
	var cpu = new Cpu(input);
	cpu.setRegisterValue("a", 7);
	cpu.execute();

	var cpu2 = new Cpu(input);
	cpu2.setRegisterValue("a", 12);
	cpu2.execute();

	return cpu.getRegisterValue("a") + " " + cpu2.getRegisterValue("a");
}

function Cpu(programText) {
	var program = parseProgramText(programText);

	var registers = {pc: 0, a: 0, b: 0, c: 0, d: 0};

	this.execute = function() {
		while (registers.pc < program.length) {
			var command = program[registers.pc];

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
		if (registers[operand2] != undefined) {
			registers[operand2] = getValue(operand);
		}

		++registers.pc;
	}

	function doInc(operand) {
		if (registers[operand] != undefined) {
			++registers[operand];
		}

		++registers.pc;
	}

	function doDec(operand) {
		if (registers[operand] != undefined) {
			--registers[operand];
		}

		++registers.pc;
	}

	function doJnz(operand, operand2) {
		if (getValue(operand) != 0) {
			registers.pc += getValue(operand2);
		} else {
			++registers.pc;
		}
	}

	function doTgl(operand) {
		var addr = registers.pc + getValue(operand);

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

		++registers.pc;
	}

	function doNop() {
		++registers.pc;
	}

	function getValue(operand) {
		return (operand in registers) ? registers[operand] : parseInt(operand, 10);
	}

	function parseProgramText(text) {
		var code = [];

		text.split("\n").forEach(function(line) {
			var command = line.split(" ");
			code.push({operation: command[0], operand: command[1], operand2: command[2]});
		});

		return code;
	}
}

var input = `cpy a b
dec b
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5
dec b
cpy b c
cpy c d
dec d
inc c
jnz d -2
tgl c
cpy -16 c
jnz 1 c
cpy 86 c
jnz 77 d
inc a
inc d
jnz d -2
inc c
jnz c -5`;
