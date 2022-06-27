import React, {useState} from 'react'
import GameScreen from './GameScreen'
import GamePlay from './GamePlay'
import GameEnd from './GameEnd'

const App = () => {
  const [gameMode, setGameMode] = useState('Game Display');//change the name, give a more definitive name to the state
  const [round, setRound] = useState(3); 
  const [timer, setTimer] = useState(Date.now()); 
  
  
   

  return (
      <div>
        { gameMode === 'Game Display' ?
            <GameScreen setGameMode={setGameMode} round={round}  setRound={setRound}/>
          : ''}

        { gameMode === 'Start Game' ?
           <GamePlay setGameMode={setGameMode} round={round}/>
          : ''}
        
        {gameMode === 'End Game' ? 
           <GameEnd setGameMode={setGameMode} Timer={timer} round={setRound}/>
          : ''}                       
    </div>
  )
}

export default App
