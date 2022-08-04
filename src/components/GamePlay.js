import React,{ useState, useEffect } from 'react'
import SkipButton from './SkipButton';
import { generateNumber, generateProblemSec, http } from '../utils';
import { evaluate } from '../utils';
import { generateProblem } from '../utils';
// import { http } from '../utils';
import { GAME_MODES, HTTP_METHODS } from '../utils/constants'




const GamePlay = (props) => { 
  
  const [gameCount, setGameCount] = useState(1);
  // const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [skipGame, setSkipGame] = useState(0);
  // const [time, setTime] = useState(Date.now())

  const {round, handlePlayedRoundsDisplay, setGameMode, currentQuestion, setCurrentQuestion,setIsLoading, isLoading} = props;
  const { question } = currentQuestion;
  const { id } = currentQuestion;



  // const timeDifference = Math.floor(Date.now() - time) / 1000;
  
  //   const playedRoundsObject = {

  //     id: Math.random(),
  //     question: question,
  //     userAnswer: userAnswer,
  //     time: Date.now()-time,
  //     speed: timeDifference < 3

  // }
    const reset = () => {

      setUserAnswer('');
      // setCorrectAnswer('');
      // setGameCount((gameCount) => gameCount + 1);
      // setTime(Date.now());  

  }
  // useEffect(() => {
  //   setTimeout(() => setIsLoading(true), 500);
  // }, []);
  
    // console.log(nextQuestion);
    const submitForm = async (event) => {
      event.preventDefault();
      try { 
      const request = await http({
        url: `/games/${id}/moves`,
        method: HTTP_METHODS.POST,
        body: {
          guess: userAnswer,      
        }
      }) 
      console.log(request)
      if (request.game.nextExpression !== null){
        setUserAnswer('');
        // handlePlayedRoundsDisplay(playedRoundsObject); 
        setCurrentQuestion(generateProblemSec(request.game));
    }else if (request.game.nextExpression === null) {
        setGameMode(GAME_MODES.GAME_END);
      }
    }
    catch (err) {
        console.log('error fetching data', err) 
    } 
      //  if ( (userAnswer.toString().length == correctAnswer.toString().length) && (gameCount < round) ) {
      //    
      //   reset();    
      //  }
      //  else if ( (userAnswer.toString().length === correctAnswer.toString().length) && gameCount == round ) {
      //   handlePlayedRoundsDisplay(playedRoundsObject)
      //   setSkipGame(0);
      //   setGameMode(GAME_MODES.GAME_END);
      //   setGameCount(1);
      // }
  };
  

    const handleSkip = () => {
      setSkipGame(skipGame + 1)    
      setGameCount((gameCount) => gameCount + 1);       
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
