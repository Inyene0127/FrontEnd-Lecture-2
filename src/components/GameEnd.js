import React from "react";

const GameEnd = (props) => {
  const { handleHome, handleRestart, timer } = props;

  return (
    <div id="container" className="header">
      <h1>Game Over</h1>
      <h2 className="time_spent">Time Spent:{timer} milliseconds.</h2>
      <button id="btn" onClick={handleRestart}>
        New Game
      </button>
      <button id="btn" onClick={handleHome}>
        Home
      </button>
    </div>
  );
};

export default GameEnd;
