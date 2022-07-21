import React,{ useState, useEffect } from 'react'


const GameEnd = (props) => {

  const timeSpent = Date.now() - props.Timer;
  
    const handleRepeat = () => { 
      props.setGameHistory([...props.gameHistory, props.playedRounds]);      
      props.setPlayedRounds([]);
      props.setGameCount(1);
      props.round(props.rounds)
      props.setGameMode('Start Game'); 
    };


  const handleClick=(e) => {  
    props.setPlayedRounds([]); 
    props.setGameCount(1);
    props.setGameMode('Game Display');
    // props.round(3);
};

  
  return (
    <div id='container' className='header'>
      <h1>Game Over</h1>
        <h2 className="time_spent">Time Spent:{timeSpent} milliseconds.</h2>
        <button id='btn' onClick={handleRepeat}>New Game</button>
        <button id='btn' onClick={handleClick}>Home</button>             
    </div>
  )
}

export default GameEnd
