import React,{ useState, useEffect } from 'react'

const GamePlay = (props) => { 

  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameCount, setgameCount] = useState(1);

    useEffect(() => {
      setCurrentProblem(generateProblem());
      //  let correctAnswer;
    }, []);
 
  function generateNumber(max) {
    return Math.floor(Math.random() * max)
  }

  function generateProblem() {
    return {
      numberOne: generateNumber(10),
      numberTwo: generateNumber(10),
      operator: ['+', 'x', '-'][generateNumber(3)]//incase I want to add more operators.
    }
  }


    const Submit = (event) => {
      event.preventDefault();

      let correctAnswer;

      if (currentProblem.operator == "+") {
        
        correctAnswer = currentProblem.numberOne + currentProblem.numberTwo;
        console.log(correctAnswer);
      }
          else if (currentProblem.operator == "x") {
      
          correctAnswer = currentProblem.numberOne * currentProblem.numberTwo;
          console.log(correctAnswer);
        }
        //   else if (currentProblem.operator == "/") {
        //     setCorrectAnswer(currentProblem.numberOne / currentProblem.numberTwo)
        // }
          else if (currentProblem.operator == "-") {
            
          correctAnswer = currentProblem.numberOne - currentProblem.numberTwo;
           console.log(correctAnswer);
        }

      const validAnswer = parseInt(userAnswer);

          if (typeof (validAnswer) !== 'number'){
            alert('Input a positive number please'); 
          }
          if (correctAnswer == parseInt(userAnswer)) {
              setgameCount((gameCount) => gameCount + 1);
          if (gameCount == props.round) {
                props.setGameMode('End Game');
              }
              setUserAnswer("");
              setCurrentProblem(generateProblem());
              correctAnswer;
              console.log(correctAnswer);
            }
        } 

  

  return (
          <div id='container' className='header'>
            <h1>{`${currentProblem.numberOne} ${currentProblem.operator} ${currentProblem.numberTwo}`}</h1>
              <form onSubmit={Submit}>
                <input className="inputVal" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}/>
                  <button id='btn' type='submit' >Submit</button>
              </form>
        </div>//reduce the number of divs used.
  )
}

export default GamePlay

