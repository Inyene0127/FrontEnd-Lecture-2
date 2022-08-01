import React,{ useState, useEffect } from 'react'
import SkipButton from './SkipButton';
import { generateNumber } from '../utils';
import { evaluate } from '../utils';
import { generateProblem } from '../utils';
import { GAME_MODES } from '../App';




const GamePlay = (props) => { 
  
  
  const [gameCount, setGameCount] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [question, setQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [skipGame, setSkipGame] = useState(0);
  const [time, setTime] = useState(Date.now())

  const {round, handlePlayedRoundsDisplay, setGameMode} = props


  const timeDifference = Math.floor(Date.now() - time) / 1000;
  
    const playedRoundsObject = {

      id: Math.random(),
      question: question,
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
      time: Date.now()-time,
      speed: timeDifference < 3

  }
    const reset = () => {

      setUserAnswer('');
      setCorrectAnswer('');
      setQuestion('')
      setGameCount((gameCount) => gameCount + 1);
      getProblem(); 
      setTime(Date.now());  

  }
    useEffect(() => {
        getProblem();
    }, []);


    const getProblem = () => {
      const problem = generateProblem();
      setCorrectAnswer(problem.correctAnswer);
      setQuestion(problem.question);
    }
  
  
    const submitForm = (event) => {

      event.preventDefault();    
       
       if ( (userAnswer.toString().length == correctAnswer.toString().length) && (gameCount < round) ) {
        handlePlayedRoundsDisplay(playedRoundsObject);  
        reset();    
       }
       else if ( (userAnswer.toString().length === correctAnswer.toString().length) && gameCount == round ) {
        handlePlayedRoundsDisplay(playedRoundsObject)
        setSkipGame(0);
        setGameMode(GAME_MODES.GAME_END);
        setGameCount(1);
      }
  };
  

    const handleSkip = () => {
      setSkipGame(skipGame + 1)    
      setGameCount((gameCount) => gameCount + 1);
      getProblem();        
    };
      
  

  return (
          <div id='container' className='header'>
            <h1>{question}</h1>
              <form onSubmit={submitForm}>
                <input className="inputVal" value={userAnswer} onChange={(e) => setUserAnswer((e.target.value))} autoFocus/>
                  <button id='btn' type='submit'>Submit</button>
              </form>
              {skipGame < Math.floor(round/3) && <SkipButton onClick={handleSkip}/>}
              
        </div>
  )
}

export default GamePlay
