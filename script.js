function binomialexp() {
	const n = document.getElementById("binom").value;
	console.log(n);
	const str = `(x+1)^${n}`;
	const trim = (value) => (value === 1 ? "" : value === -1 ? "-" : value);
	const factorial = (value, total = 1) =>
		value <= 1 ? total : factorial(value - 1, total * value);
	const find = (str = "") => {
		let [op1, coefficient, variable, op2, constant, power] = str
			.match(/(\W)(\d*)(\w)(\W)(\d+)..(\d+)/)
			.slice(1);
		power = +power;
		if (!power) {
			return "1";
		}
		if (power === 1) {
			return str.match(/\((.*)\)/)[1];
		}
		coefficient =
			op1 === "-"
				? coefficient
					? -coefficient
					: -1
				: coefficient
				? +coefficient
				: 1;
		constant = op2 === "-" ? -constant : +constant;
		const factorials = Array.from({ length: power + 1 }, (_, i) =>
			factorial(i)
		);
		let result = "";
		for (let i = 0, p = power; i <= power; ++i, p = power - i) {
			let judge =
				(factorials[power] / (factorials[i] * factorials[p])) *
				(coefficient * p * constant * i);
			if (!judge) {
				continue;
			}
			result += p ? trim(judge) + variable + (p === 1 ? "" : `^${p}`) : judge;
			result += "+";
		}
		return result.replace(/\+\-/g, "-").replace(/\+$/, "");
	};
	console.log(find(str));
	const result = find(str);
	console.log(result);
}
