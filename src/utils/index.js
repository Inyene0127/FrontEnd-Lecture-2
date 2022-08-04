export const operator = ["+", "x", "-", "/"];

export const sign = {
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

export function generateProblemSec(currentQuestion) {
  const { lhs, rhs, operator } = currentQuestion.nextExpression;

  const question = `${lhs} ${operator} ${rhs}`;

  return {
    question,
    ...nextExpression,
  };
}

export const http = async ({ url, method = "GET", body }) => {
  try {
    const req = await fetch(`http://localhost:8081${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await req.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
