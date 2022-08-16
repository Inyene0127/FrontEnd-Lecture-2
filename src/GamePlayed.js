import { use } from 'chai';
import React from 'react'
import Styling from './Styling';

const GamePlayed = (props) => {

    const { question, userAnswer, time, correct} = props;
     
    

    const hasIncorrectAnswer = !correct;
    const hasCorrectAnswer = correct; 


    let colorClass = '';
  
    if (hasIncorrectAnswer) {
      colorClass = 'incorrect_answer';
    }
    else if (hasCorrectAnswer) {
      colorClass = 'correct_answer';
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
