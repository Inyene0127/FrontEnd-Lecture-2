import React, {useState} from 'react'
import GameScreen from './GameScreen'
import GamePlay from './GamePlay'
import GameEnd from './GameEnd'

const App = () => {
  const [play, setPlay] = useState(0);
  const [round, setRound] = useState('3');   

  return (
      <div>
        { play === 0 ?
            <GameScreen setPlay={setPlay} round={round} setRound={setRound}/>
          : ''}

        { play === 1 ?
           <GamePlay setPlay={setPlay} round={round}/>
          : ''}
        
        {play === 2 ? 
           <GameEnd setPlay={setPlay}/>
          : ''}                       
    </div>
  )
}

export default App
