import React,{ useState } from 'react'

const GameEnd = (props) => {
  
  const handleClick=(e) => {
    props.setGameMode('Game Display');
    props.round(3);
};
  const timeSpent = Date.now() - props.Timer;


  
  return (
    <div id='container' className='header'>
      <h1>Game Over</h1>
        <h2 className="time_spent">Time Spent:{timeSpent} milliseconds.</h2>
        <button id='btn' onClick={handleClick}>Try Again</button>
    </div>
  )
}

export default GameEnd
