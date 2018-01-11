"use strict";

function calc() {
	const program = input.split("\n").map(line => line.split(" "));;

	let cpu = new Cpu(getProgramCopy(program));
	cpu.setRegisterValue("a", 7);
	cpu.execute();

	let cpu2 = new Cpu(getProgramCopy(program));
	cpu2.setRegisterValue("a", 12);
	cpu2.execute();

	return cpu.getRegisterValue("a") + " " + cpu2.getRegisterValue("a");
}

function getProgramCopy(program) {
	return program.map(c => c.slice());
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
			} else if (cmd[0] === "tgl") {
				const addr = registers.pc + getValue(cmd[1]);

				if (addr >= 0 && addr < program.length) {
					const table = {cpy: "jnz", inc: "dec", dec: "inc", jnz: "cpy", tgl: "inc"};
					let command = program[addr];
					command[0] = table[command[0]] || command[0];
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


const input = `cpy a b
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
