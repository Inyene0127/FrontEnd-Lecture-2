import React from 'react'


const GameEnd = (props) => {

  
  const {handleClick, handleRestart, timer} = props;
  const timeSpent = Date.now() - timer;
  
  return (
    <div id='container' className='header'>
      <h1>Game Over</h1>
        <h2 className="time_spent">Time Spent:{timeSpent} milliseconds.</h2>
        <button id='btn' onClick={handleRestart}>New Game</button>
        <button id='btn' onClick={handleClick}>Home</button>             
    </div>
  )
}

export default GameEnd
