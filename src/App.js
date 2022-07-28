import React, {useState, useReducer} from 'react'
import GameScreen from './components/GameScreen'
import GamePlay from './components/GamePlay'
import GameEnd from './components/GameEnd'
import GamePlayed from './GamePlayed'
import {
  reducer,
  changeGameMode,
  changeRound,
  startTimer,
  initializer
} from './hooks/reducer';

export const GAME_MODES = {
  GAME_DISPLAY: 'Game Display',
  GAME_START: 'Start Game',
  GAME_END: 'End Game'
}


const App = () => {

  const [state, dispatch] = useReducer(reducer,undefined, initializer);
 

  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = () => dispatch(startTimer()); 

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]); 
  //state that handles the array for the round just played.
  const [playedRounds, setPlayedRounds] = useState([]);

  const handlePlayedRoundsDisplay = (playedRoundsObject) => {
    setPlayedRounds(() => [...playedRounds, playedRoundsObject]);
  }

  const handleGameHistory = () => {
    setGameHistory([...gameHistory,playedRounds]); 
  }

  const handleRestart = () => { 
    handleGameHistory();    
    setPlayedRounds([]);
    setRound(state.round)
    setGameMode(GAME_MODES.GAME_START);
    setTimer(Date.now()) 
 };

 const handleClick=(e) => {  
  handleGameHistory();
  setPlayedRounds([]); 
  setGameMode('Game Display');
  setTimer(Date.now())
};
  return (
      <div> 
        {/*total game round played */}
        { state.gameMode === GAME_MODES.GAME_END && gameHistory.map((history, index) => {
                return (
                  <div key={index}>
                    <h4 >Game {index + 1}</h4>
                    {
                      history.map((rounds, index) => (
                        <GamePlayed key={index} {...rounds}/>
                      ))}
                  </div>
                )})
            }
         {/*current concluded game round */}
        { playedRounds.map((rounds) => {
          return (
          <div key={rounds.id} className='game_history'> 
          <GamePlayed {...rounds}/>
            </div>
             )})}         
    
        { state.gameMode === GAME_MODES.GAME_DISPLAY &&
            <GameScreen setGameMode={setGameMode} round={state.round}  setRound={setRound} />}

        { state.gameMode === GAME_MODES.GAME_START &&
           <GamePlay setGameMode={setGameMode} round={state.round} handlePlayedRoundsDisplay={handlePlayedRoundsDisplay}/>
          }
        
        { state.gameMode === GAME_MODES.GAME_END && 
           <GameEnd timer={state.timer} handleClick={handleClick} handleRestart={handleRestart}/>
          }                       
          
    </div>
  )
}

export default App
