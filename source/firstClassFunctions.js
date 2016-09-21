class Calculator {
	static add (a, b) {
		return a + b
	}
}

function subtract (a, b) {
	return a - b
}

const multiply = function (a, b) {
	return a * b
}

const divide = (a, b) =>
  a / b

[1,2,3].map(a => a * 2) // => [2,4,6]

[4,5,6].reduce(Calculator.add, 0) // => 15