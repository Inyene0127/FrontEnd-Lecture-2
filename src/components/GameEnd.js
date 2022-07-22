import React from "react";

const GameEnd = (props) => {
  const { handleRepeat, handleRestart } = props;
  const timeSpent = Date.now() - props.timer;

  return (
    <div id="container" className="header">
      <h1>Game Over</h1>
      <h2 className="time_spent">Time Spent:{timeSpent} milliseconds.</h2>
      <button id="btn" onClick={handleRepeat}>
        New Game
      </button>
      <button id="btn" onClick={handleRestart}>
        Home
      </button>
    </div>
  );
};

export default GameEnd;
