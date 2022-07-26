import { use } from 'chai';
import React from 'react'
import Styling from './Styling';

const GamePlayed = (props) => {

    const { question, userAnswer, time, correctAnswer, speed} = props;
    
    const hasIncorrectAnswer = userAnswer != correctAnswer;
    const hasCorrectAnswerInTime = userAnswer === correctAnswer.toString() && speed; 


    let colorClass = 'correct_answer--outTime';
  
    if (hasIncorrectAnswer) {
      colorClass = 'incorrect_answer';
    }
    else if (hasCorrectAnswerInTime) {
      colorClass = 'correct_answer--inTime';
    }
    


  return (
    <div>
        <Styling className={colorClass}>
            <p>{question} [{time}]ms = {userAnswer}</p>
        </Styling>
    </div>
  )
}

export default GamePlayed
