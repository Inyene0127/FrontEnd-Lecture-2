import React, {useState, useReducer} from 'react'
import GameScreen from './components/GameScreen'
import GamePlay from './components/GamePlay'
import GameEnd from './components/GameEnd'
import GamePlayed from './GamePlayed'
// import {
//   reducer,
//   changeGameMode,
//   changeRound,
//   startTimer,
//   initializer
// } from './hooks/Reducer';

const App = () => {

  // const [state, dispatch] = useReducer(reducer,undefined, initializer);
  // const game = {
  //   start: "start",
  //   play: 'play',
  //   end: 'end'
  // }

  // const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  // const setRound = (round) => dispatch(changeRound(round));
  // const setTimer = () => dispatch(startTimer()); 







  const [gameCount, setGameCount] = useState(1);
  const [gameMode, setGameMode] = useState('Game Display');//change the name, give a more definitive name to the state
  const [round, setRound] = useState(3); 
  const [timer, setTimer] = useState(Date.now());
  const [gameHistory, setGameHistory] = useState([]); 
  const [playedRounds, setPlayedRounds] = useState([]);

  
  return (
      <div> 
        
        { gameMode === 'End Game' && gameHistory.map((history, index) => {
                return (
                  <div>
                    <h4 key={Date.now()}>Game {index + 1}</h4>
                    {
                      history.map((rounds) => (
                        <GamePlayed {...rounds}/>
                      ))}
                  </div>
                )})
            }

        { playedRounds.map((rounds) => {
          return (
          <div key={rounds.id} className='game_history'> 
          <GamePlayed {...rounds}/>
            </div>
             )})}         
    
        { gameMode === 'Game Display' ?
            <GameScreen setGameMode={setGameMode} round={round}  setRound={setRound} />
          : ''}

        { gameMode === 'Start Game' ?
           <GamePlay setGameMode={setGameMode} round={round} playedRounds={playedRounds} setPlayedRounds={setPlayedRounds} timer={timer} gameHistory={gameHistory} setGameHistory={setGameHistory} gameCount={gameCount} setGameCount={setGameCount}/>
          : ''}
        
        { gameMode === 'End Game' ? 
           <GameEnd setGameMode={setGameMode} Timer={timer} round={setRound} rounds={round} setPlayedRounds={setPlayedRounds} playedRounds={playedRounds} gameHistory={gameHistory} setGameHistory={setGameHistory} gameCount={gameCount} setGameCount={setGameCount}/>
          : ''}                       
          
    </div>
  )
}

export default App
