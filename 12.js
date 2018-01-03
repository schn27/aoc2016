"use strict";

function calc() {
	const program = input.split("\n").map(line => line.split(" "));

	let cpu = new Cpu(program);
	cpu.execute();

	let cpu2 = new Cpu(program);
	cpu2.setRegisterValue("c", 1);
	cpu2.execute();

	return cpu.getRegisterValue("a") + " " + cpu2.getRegisterValue("a");
}

function Cpu(program) {
	let registers = {pc: 0, a: 0, b: 0, c: 0, d: 0};

	this.execute = () => {
		while (registers.pc < program.length) {
			let cmd = program[registers.pc];

			if (cmd[0] === "cpy") {
				registers[cmd[2]] = getValue(cmd[1]);
			} else if (cmd[0] === "inc") {
				++registers[cmd[1]];
			} else if (cmd[0] === "dec") {
				--registers[cmd[1]];
			} else if (cmd[0] === "jnz") {
				if (getValue(cmd[1]) != 0) {
					registers.pc += getValue(cmd[2]) - 1;
				}
			}

			++registers.pc;
		}
	}

	this.getRegisterValue = (reg) => registers[reg];
	this.setRegisterValue = (reg, value) => registers[reg] = value;

	function getValue(operand) {
		return (operand in registers) ? registers[operand] : +operand;
	}
}

const input = `cpy 1 a
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
