import React from "react";
import GamePlayed from "../GamePlayed";

const GameHistory = (props) => {
  const { gameHistory } = props;
  return (
    <div>
      {gameHistory.map((history, index) => {
        return (
          <div key={index}>
            <h4>Game {index + 1}</h4>
            {history.map((rounds, index) => (
              <GamePlayed key={index} {...rounds} />
            ))}
          </div>
        );
      })}
      {/*current concluded game round */}
    </div>
  );
};

export default GameHistory;
