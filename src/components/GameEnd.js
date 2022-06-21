import React,{useState} from 'react'

const GameEnd = (props) => {

  const {setPlay} = props

  const replayGame = () => {
    setPlay(0)
  }
  return (
    <div id='third_container' className='.third_header'>
      <h1 id="game_over">Game Over</h1>
        <h2 id="time_spent">Time spent:{Date.now()} ms.</h2>
        <button id='try_again' onClick={replayGame}>Try Again</button>
    </div>
  )
}

export default GameEnd
