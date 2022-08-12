import React,{ useState } from 'react'
import SkipButton from './SkipButton';
import {  http } from '../utils';
import {  HTTP_METHODS } from '../utils/constants'




const GamePlay = (props) => { 
    
  const [gameCount, setGameCount] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [skipGame, setSkipGame] = useState(0);

  const {
    round,  
    currentQuestion, 
    setIsLoading, 
    isLoading,  
    handleGamePlay,
    setErrorState,
    handleSkip
  } = props;
  const { question } = currentQuestion;
  const { id } = currentQuestion;

  
  const submitForm = async (event) => {
    
      event.preventDefault();
      setIsLoading(true);
      setErrorState(null);
      try { 
  const request = await http({
        url: `/games/${id}/moves`,
        method: HTTP_METHODS.POST,
        body: {
          guess: userAnswer,      
        }
      }) 
      if (!question) {
        alert('Error from backend');
        setErrorState('error fetching request');
        return;
      }
  const { game, move } = request;
  const playedRoundsArray = {
        question: currentQuestion.question,
        userAnswer,
        time: move.timeSpentMillis,
        correct: move.correct,
        speed: true
      }
      if (game.nextExpression){
        handleGamePlay(playedRoundsArray, request);
        setUserAnswer('');
      }else {
        handleGamePlay(playedRoundsArray);
      }
      
    }
    catch (err) {
        setErrorState('Error fetching request');         
    }
    finally{
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <h2>Game is loading...</h2>    
    
  }  


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
