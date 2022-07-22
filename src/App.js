import React, { useState, useReducer } from "react";
import GameScreen from "./components/GameScreen";
import GamePlay from "./components/GamePlay";
import GameEnd from "./components/GameEnd";
import GamePlayed from "./GamePlayed";
// import {
//   reducer,
//   changeGameMode,
//   changeRound,
//   startTimer,
//   initializer
// } from './hooks/Reducer';

export const GAME_MODES = {
  START_GAME: "Start Game",
  END_GAME: "End Game",
  GAME_DISPLAY: "Game Display",
};

const App = () => {
  // const [state, dispatch] = useReducer(reducer,undefined, initializer);
  // const game = {
  //   start: "start",
  //   play: 'play',
  //   end: 'end'
  // }

  // const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  // const setRound = (round) => dispatch(changeRound(round));
  // const setTimer = () => dispatch(startTimer());

  // Add more descriptive names to the states
  const [gameMode, setGameMode] = useState("Game Display"); //change the name, give a more definitive name to the state
  const [round, setRound] = useState(3);
  const [timer, setTimer] = useState(Date.now());
  const [gameHistory, setGameHistory] = useState([]);
  const [playedRounds, setPlayedRounds] = useState([]);

  const handlePlayedRound = (playedRoundObject) => {
    setPlayedRounds(() => [...playedRounds, playedRoundObject]);
  };

  const handleGameHistory = () => {
    setGameHistory([...gameHistory, playedRounds]);
  };

  const handleRestart = (e) => {
    handleGameHistory();
    setPlayedRounds([]);
    setGameMode(GAME_MODES.GAME_DISPLAY);
    // props.round(3);
  };

  const handleRepeat = () => {
    handleGameHistory();
    setPlayedRounds([]);
    setRound(round);
    setGameMode(GAME_MODES.START_GAME);
  };

  return (
    <div>
      {/* Previous games round */}
      {gameMode === GAME_MODES.END_GAME &&
        gameHistory.map((history, index) => {
          return (
            <div key={index}>
              <h4>Game {index + 1}</h4>
              {history.map((rounds, index) => (
                <GamePlayed key={index} {...rounds} />
              ))}
            </div>
          );
        })}

      {/* Current concluded game round */}
      {playedRounds.map((rounds) => {
        return (
          <div key={rounds.id} className="game_history">
            <GamePlayed {...rounds} />
          </div>
        );
      })}

      {gameMode === GAME_MODES.GAME_DISPLAY && (
        <GameScreen
          setGameMode={setGameMode}
          round={round}
          setRound={setRound}
        />
      )}

      {gameMode === GAME_MODES.START_GAME && (
        <GamePlay
          setGameMode={setGameMode}
          round={round}
          handlePlayedRound={handlePlayedRound}
        />
      )}

      {gameMode === GAME_MODES.END_GAME && (
        <GameEnd
          timer={timer}
          handleRepeat={handleRepeat}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
