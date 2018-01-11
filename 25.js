"use strict";

function calc() {
	const program = input.split("\n").map(line => line.split(" "));
	const pattern = "010101010101010101010101010101";

	for (let a = 0; ; ++a) {
		let cpu = new Cpu(getProgramCopy(program), pattern);
		cpu.setRegisterValue("a", a);
		if (cpu.execute()) {
			return a;
		}
	}

	return null;
}

function getProgramCopy(program) {
	return program.map(c => c.slice());
}

function Cpu(program, outputPattern) {
	let registers = {pc: 0, a: 0, b: 0, c: 0, d: 0};
	let output = [];

	this.execute = () => {
		while ((registers.pc < program.length) && checkOutput()) {
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
			} else if (cmd[0] === "tgl") {
				const addr = registers.pc + getValue(cmd[1]);

				if (addr >= 0 && addr < program.length) {
					const table = {cpy: "jnz", inc: "dec", dec: "inc", jnz: "cpy", tgl: "inc"};
					let command = program[addr];
					command[0] = table[command[0]] || command[0];
				}				
			} else if (cmd[0] === "out") {
				output.push(getValue(cmd[1]));
			}

			++registers.pc;
		}

		return outputPattern.slice(0, output.length) === output.join("");
	}

	this.getRegisterValue = (reg) => registers[reg];
	this.setRegisterValue = (reg, value) => registers[reg] = value;
	this.getOutput = () => output;

	function getValue(operand) {
		return (operand in registers) ? registers[operand] : +operand;
	}

	function checkOutput() {
		return (output.length < outputPattern.length) && (outputPattern.slice(0, output.length) === output.join(""));
	}
}

const input = `cpy a d
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
