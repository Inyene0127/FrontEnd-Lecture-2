import React, { useState } from "react";
import { GAME_MODES } from "../App";

const GameScreen = (props) => {
  const { round, setGameMode, setRound } = props;

  const handleChange = ({ target }) => {
    const newRound = target.value;

    // Validating user round input
    if (newRound >= 1 && newRound <= 20) {
      setRound(newRound);
    }
  };

  const handleClick = () => {
    setGameMode(GAME_MODES.START_GAME);
  };

  return (
    <div id="container" className="header">
      <p>
        Hi, this is Inyene's math game, choose your parameters and get to
        calculating!"
      </p>
      <h2>Select the Number Of Rounds</h2>
      <form>
        <input
          className="inputVal"
          name="inputRound"
          type="number"
          min="1"
          max="20"
          value={round}
          onChange={handleChange}
          autoFocus
        ></input>
        <button id="btn" onClick={handleClick}>
          Begin Game
        </button>
      </form>
    </div>
  );
};

export default GameScreen;
