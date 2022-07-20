import React from 'react'
import Styling from './Styling';

const GamePlayed = (props) => {

    const { firstNum, secondNum, operator, userAnswer, time, correctAnswer, speed} = props;

  return (
    <div>
        <Styling userAnswer={userAnswer} correctAnswer={correctAnswer} $speed={speed}>
            <p>{firstNum} {operator} {secondNum} [{time}]ms = {userAnswer}</p>
        </Styling>
    </div>
  )
}

export default GamePlayed
