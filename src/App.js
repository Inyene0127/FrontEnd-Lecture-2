import React, {useState, useReducer} from 'react'
import GameScreen from './components/GameScreen'
import GamePlay from './components/GamePlay'
import GameEnd from './components/GameEnd'
import GamePlayed from './GamePlayed'
import { GAME_MODES } from './utils/constants'
import {
  reducer,
  changeGameMode,
  changeRound,
  startTimer,
  initialState,
  changePlayedRounds
} from './hooks/reducer';
import GameHistory from './components/GameHistory'



const App = () => {

  const [state, dispatch] = useReducer(reducer,undefined, initialState);
 

  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = () => dispatch(startTimer()); 
  const setPlayedRounds = (playedRounds) => dispatch(changePlayedRounds(playedRounds))
  const {playedRounds} = state
  //

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]); 

  const miniReset = () => {
    handleGameHistory();    
    setPlayedRounds([]);
    setTimer(Date.now()) 
  }
  
  const handlePlayedRoundsDisplay = (playedRoundsObject) => {
    setPlayedRounds([...playedRounds, playedRoundsObject]);
  }

  const handleGameHistory = () => {
    setGameHistory([...gameHistory,playedRounds]); 
  }

  const handleRestart = () => { 
    setRound(state.round)
    setGameMode(GAME_MODES.GAME_START);
    miniReset()
    
 };

 const handleHome=(e) => {  
  miniReset()
  setGameMode('Game Display');
};
  return (
      <div> 
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
           <GameEnd timer={state.timer} handleHome={handleHome} handleRestart={handleRestart}/>
          } 
        
        {/*total game round played */}
        { state.gameMode === GAME_MODES.GAME_END && 
        <GameHistory gameHistory={gameHistory} />
            } 
                     
          
    </div>
  )
}

export default App
