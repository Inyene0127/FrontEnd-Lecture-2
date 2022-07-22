import React from "react";
import Styling from "./Styling";

const GamePlayed = (props) => {
  const { question, userAnswer, time, correctAnswer, speed } = props;

  const hasIncorrectAnswer = userAnswer != correctAnswer;
  const hasCorrectAnswerOnTime =
    userAnswer === correctAnswer?.toString() && speed;

  let colorClass = "correct__answer--outTime";

  if (hasIncorrectAnswer) {
    colorClass = "incorrect__answer";
  } else if (hasCorrectAnswerOnTime) {
    colorClass = "correct__answer--inTime";
  }

  return (
    <Styling className={colorClass}>
      <p>
        {question} [{time}]ms = {userAnswer}
      </p>
    </Styling>
  );
};

export default GamePlayed;
