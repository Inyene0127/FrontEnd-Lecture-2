const operator = ["+", "x", "-", "/"];

const sign = {
  signs: operator[generateNumber(operator.length)],
};

export function generateNumber(max) {
  return Math.floor(Math.random() * max);
}

export const evaluate = (firstNum, secondNum, operator) => {
  if (operator == "+") {
    return firstNum + secondNum;
  } else if (operator == "x") {
    return firstNum * secondNum;
  } else if (operator == "-") {
    return firstNum - secondNum;
  } else if (operator == "/") {
    return Math.floor(firstNum / secondNum);
  }
};

export function generateProblem() {
  const firstNumber = generateNumber(20);
  const secondNumber = generateNumber(20);
  const operator = sign.signs;

  const correctAnswer = evaluate(firstNumber, secondNumber, operator);

  const question = `${firstNumber} ${operator} ${secondNumber}`;

  return {
    correctAnswer,
    question,
  };
}
