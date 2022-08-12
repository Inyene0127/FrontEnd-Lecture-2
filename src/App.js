import React, {useState, useReducer} from 'react'
import GameScreen from './components/GameScreen'
import GamePlay from './components/GamePlay'
import GameEnd from './components/GameEnd'
import GamePlayed from './GamePlayed'
import { GAME_MODES, HTTP_METHODS } from './utils/constants'
import { generateProblemSec, http } from './utils/index';
import {
  reducer,
  changeGameMode,
  changeRound,
  initialState,
  changeCurrentQuestion,
  changeIsLoading,
  changePreviousPlayedRounds,
  changeTimer,
  clearPreviousPlayedRounds,
  changeErrorState,
} from './hooks/reducer';
import GameHistory from './components/GameHistory'



const App = () => {

  const [state, dispatch] = useReducer(reducer,undefined, initialState);
 

  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = (timer) => dispatch(changeTimer(timer)); 
  const setCurrentQuestion = (currentQuestion) => dispatch(changeCurrentQuestion(currentQuestion));
  const setIsLoading = (isLoading) => dispatch(changeIsLoading(isLoading));
  const setPreviousPlayedRounds = (previousPlayedRounds) => dispatch(changePreviousPlayedRounds(previousPlayedRounds));
  const setClearPreviousPlayedRounds = () => dispatch(clearPreviousPlayedRounds());
  const setErrorState = (error) => dispatch(changeErrorState(error));

  const { currentQuestion, gameMode, previousPlayedRounds, round, timer, isLoading, error} = state

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]); 


  const handleGameStart = async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const question = await http({
        url: '/games',
        method: HTTP_METHODS.POST,
        body: {
          type: "mathemagician",
          rounds: round,      
        },
      });
    if (!question) {
        setErrorState('error fetching request');
        return;
      }
      setGameMode(GAME_MODES.GAME_START);
      setCurrentQuestion(generateProblemSec(question)); 
      }
    catch(err) {
       setCurrentQuestion(null);
       setErrorState('Error fetching request');
      }
    finally{
        setIsLoading(false);
      }
    
    
  }

  const handleGamePlay = (playedRoundsArray, request) => {
    
    setPreviousPlayedRounds(playedRoundsArray);

    const currentPlayedRound = [...previousPlayedRounds, playedRoundsArray];

    const allTimers = currentPlayedRound.reduce((total, curr) => {
      return (total += curr.time);
    }, 0);

    setTimer(allTimers);

    if (request) {
      setCurrentQuestion(generateProblemSec(request.game));
    } else {
      setGameMode(GAME_MODES.GAME_END);
      setGameHistory((gameHistory) => [
        ...gameHistory,
        currentPlayedRound,
      ]);
    }
  };

  const handleRestart = () => { 
    setClearPreviousPlayedRounds([]);
    handleGameStart();    
 };

 const handleHome = () => {  
  setGameMode(GAME_MODES.GAME_DISPLAY);
  setClearPreviousPlayedRounds([]);
};

const handleSkip = () => {
  setCurrentQuestion(generateProblemSec(question)); 
} 


  return (
      <div> 
        {error && <div>{error}, please try again</div>}

         {/*current concluded game round */}
        { previousPlayedRounds.map((rounds, index) => {
          return (
          <div key={index} className='game_history'> 
          <GamePlayed {...rounds}/>
            </div>
             )})}         
    
        { gameMode === GAME_MODES.GAME_DISPLAY &&
            <GameScreen 
            handleGameStart={handleGameStart} 
            round={round}  
            setRound={setRound} 
            />}

        { gameMode === GAME_MODES.GAME_START &&
           <GamePlay 
           round={round} 
           currentQuestion={currentQuestion} 
           setPreviousPlayedRounds={setPreviousPlayedRounds}
           setIsLoading={setIsLoading}
           isLoading={isLoading}
           handleGamePlay={handleGamePlay}
           setErrorState={setErrorState}
           handleSkip={handleSkip}/>
          }
        
        { gameMode === GAME_MODES.GAME_END && 
           <GameEnd 
           timer={timer} 
           handleHome={handleHome} 
           handleRestart={handleRestart}/>
          } 
        
        {/*total game round played */}
        { gameMode === GAME_MODES.GAME_END && 
        <GameHistory gameHistory={gameHistory} />
            } 
                     
          
    </div>
  )
}

export default App
