const GameScreen = (props) => {
  const { round, handleSubmit, setRound, handleNameChange, playerName } = props;

  const handleChange = ({ target }) => {
    const newRound = target.value;
    //Validates that the user input a round within 1-20
    if (newRound >= 1 && newRound <= 20) {
      setRound(newRound);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div id="container" className="header">
      <p>
        Hi, this is Inyene's math game, choose your parameters and get to
        calculating!"
      </p>
      <h2>Select the Number Of Rounds</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <input
            className="inputVal"
            name="inputRound"
            type="number"
            min="1"
            max="20"
            value={round}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="input-container">
          <h2 className="input-label">Username</h2>
          <input
            className="inputVal"
            type="text"
            required
            placeholder="Input your username"
            value={playerName}
            onChange={handleNameChange}
          />
        </div>
        <button id="btn" type="submit">
          Begin Game
        </button>
      </form>
    </div>
  );
};

export default GameScreen;
