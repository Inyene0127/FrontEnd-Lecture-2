import React,{ useState } from 'react';


const GameScreen = (props) => {

  // const {round} = props.state
  
  const handleChange = ({ target }) => {

    const newRound = target.value;
    if (newRound >= 1 && newRound <= 20){
          props.setRound(newRound);
        };
  }

   const handleClick = () => {
    props.setGameMode('Start Game');
   }
  return (
    <div id='container' className='header'>
      <p>Hi, this is Inyene's math game, choose your parameters and get to calculating!"</p>
      <h2>Select the Number Of Rounds</h2>
      <form>
        <input className="inputVal" name='inputRound' type="number" min="1" max="20" value={props.round} onChange={handleChange} autoFocus> 
        
          </input>
          <button id='btn' onClick={handleClick}>Begin Game</button>
      </form>
    </div>
  )
}

export default GameScreen
