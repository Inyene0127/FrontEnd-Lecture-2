import React,{useState} from 'react';


const GameScreen = (props) => {

  const [name, setName] = useState('Inyene');

  
  
  
  const handleChange = ({ target }) => {

    const newRound = target.value;
    if (newRound >= 1 && newRound <= 20){
          props.setRound(newRound);
        };
  }

   const handleClick = () => {
    props.setPlay(1);
   }
   
  return (
    <div id='container' className='header'>
      <p>Hi, this is {name}'s math game, choose your parameters and get to calculating!"
      <br /><br />
      Select the Number Of Rounds</p>
      <br/>
      <form id='inputForm'>
        <input id="inputVal" name='inputRound' type="number" min="1" max="20" value={props.round} onChange={handleChange}> 
          </input><br/>
          <button id='btn' onClick={handleClick}>Begin Game</button>
      </form>
    </div>
  )
}

export default GameScreen
