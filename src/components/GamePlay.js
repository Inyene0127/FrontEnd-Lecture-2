import React,{ useState, useEffect } from 'react'
import SkipButton from './SkipButton';


const GamePlay = (props) => { 

  const {gameCount, setGameCount} = props
  const [userAnswer, setUserAnswer] = useState('');
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [skipGame, setSkipGame] = useState(0);
  
  // const [button, setButton] = useState(<button id='btn'>Skip</button>)
  
  
  const time = Date.now();

    useEffect(() => {
        generateProblem();
    }, []);
 
  function generateNumber(max) {
    return Math.floor(Math.random() * max)
  }

 const sign = {
        
          signs: ['+' , 'x', '-', '/' ][generateNumber(4)]

  }

  function generateProblem() {
    
      setFirstNum(generateNumber(20));
      setSecondNum(generateNumber(20));
      setOperator(sign.signs);
    }
  
  const evaluate = (firstNum, secondNum, operator) => {
      if (operator == '+') {
        return firstNum + secondNum;
      }
      else if (operator == 'x') {
        return firstNum * secondNum;
      }
      else if (operator == '-') {
        return firstNum - secondNum;
      }
      else if (operator == '/') {
        return Math.floor(firstNum / secondNum);
      }
  }
  
  
  

  
    const Submit = (event) => {
      event.preventDefault();
      
      const correctAnswer = evaluate(firstNum, secondNum, operator);
      // console.log(correctAnswer);
       
       if ( (userAnswer.toString().length == correctAnswer.toString().length) && (gameCount < props.round) ) {
       
        props.setPlayedRounds(() => [...props.playedRounds, {
          id: Math.random(),
          firstNum: firstNum,
          secondNum: secondNum,
          correctAnswer: correctAnswer,
          operator: operator,
          userAnswer: userAnswer,
          time: Date.now()-time,
          speed: Math.floor((Date.now()-time)/1000) < 3
      }]);
        setUserAnswer('');
        setGameCount((gameCount) => gameCount + 1);
        generateProblem();      
       }
       else if ( (userAnswer.toString().length === correctAnswer.toString().length) && gameCount == props.round ) {
      
        props.setPlayedRounds(() => [...props.playedRounds, {
          id: Math.random(),
          firstNum: firstNum,
          secondNum: secondNum,
          correctAnswer: correctAnswer,
          operator: operator,
          userAnswer: userAnswer,
          time: Date.now()-time,
          speed: Math.floor((Date.now()-time)/1000) < 3
      }]);
      setSkipGame(0);
      props.setGameMode('End Game'); 
      
    }
  };
  

    const handleSkip = () => {

      setSkipGame(skipGame + 1)    
      setGameCount((gameCount) => gameCount + 1);
      generateProblem();
         
                
    };
      



    
    
    
         

  

  return (
          <div id='container' className='header'>
            <h1>{firstNum} {operator} {secondNum}</h1>
              <form onSubmit={Submit}>
                <input className="inputVal" value={userAnswer} onChange={(e) => setUserAnswer((e.target.value))} autoFocus/>
                  <button id='btn' type='submit'>Submit</button>
              </form>
              {skipGame < Math.floor(props.round/3) ? <SkipButton onClick={handleSkip}/> : null}
              
        </div>
  )
}

export default GamePlay
