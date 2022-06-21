import React,{useState} from 'react'

const GamePlay = (props) => { 

  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [prev, setPrev] = useState(1);


  function generateNumber(max) {
    return Math.floor(Math.random() * max)
  }

  function generateProblem() {
    return {
      numberOne: generateNumber(10),
      numberTwo: generateNumber(10),
      operator: ['+', 'x'][generateNumber(2)] //incase I want to add more operators.
    }
  }

  let correctAnswer;
  if (currentProblem.operator == "+") {
    correctAnswer = currentProblem.numberOne + currentProblem.numberTwo
  }
  else if (currentProblem.operator == "x") {
    correctAnswer = currentProblem.numberOne * currentProblem.numberTwo
  };

    const Submit = (event) => {
      event.preventDefault();
      const validAnswer = userAnswer >= 0;
          if (!validAnswer) {
            alert('Input a positive number please') ;}
            if (correctAnswer == parseInt(userAnswer)) {
              setPrev((prev) => prev + 1);
              if (prev == props.round) {
                props.setPlay(2);
              }
              setUserAnswer("");
              setCurrentProblem(generateProblem());
            }
              
              
            
          
        } 

  

  return (
    <div>
        <div id='second_container' className='second_header'>
          <div>
            <form onSubmit={Submit}>
      <h1 id='numbers'>{`${currentProblem.numberOne} ${currentProblem.operator} ${currentProblem.numberTwo}`}</h1>
      <input id="inputAns" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}/>
      <button id='btn_1' type='submit'>Submit</button>
      </form>
          </div>
        </div>
    </div>
  )
}

export default GamePlay

