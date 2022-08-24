const GameScreen = (props) => {

   const {round, setRound, handleNameChange, playerName, handleConnect} = props
  
  const handleChange = ({ target }) => {

    const newRound = target.value;
    //Validates that the user input a round within 1-20
    if (newRound >= 1 && newRound <= 20){
          setRound(newRound);
        }
  }

   const handleFormSubmit = (e) => {
    e.preventDefault();
    handleConnect();  
   }
   
   

  return (
    <div id='container' className='header'>
      <p>Hi, this is Inyene's math game, choose your parameters and get to calculating!"</p>
      <h2>Select the Number Of Rounds</h2>
      <form onSubmit={handleFormSubmit}>
        <input className="inputVal" name='inputRound' type="number" min="1" max="20" value={round} onChange={handleChange} autoFocus/>
        <div>
          <h2>UserName</h2>
          <input type='text' 
          className="inputVal"
          placeholder='Input your username' 
          value={playerName} 
          onChange={handleNameChange}
          required 
          autoFocus/>
        </div>
          <button id='btn'>Begin Game</button>
      </form>
    </div>
  )
}

export default GameScreen
