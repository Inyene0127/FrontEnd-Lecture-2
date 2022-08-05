import React, { useState, useReducer } from "react";
import GameScreen from "./components/GameScreen";
import GamePlay from "./components/GamePlay";
import GameEnd from "./components/GameEnd";
import GamePlayed from "./GamePlayed";
import { GAME_MODES, HTTP_METHODS } from "./utils/constants";
import { generateProblemSec, http } from "./utils/index";
import {
  reducer,
  changeGameMode,
  changeRound,
  initialState,
  changePlayedRounds,
  changeCurrentQuestion,
  changeIsLoading,
  changePreviousRoundAnswer,
  changeTimer,
  clearPreviousRoundAnswer,
} from "./hooks/reducer";
import GameHistory from "./components/GameHistory";

const App = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = (timer) => dispatch(changeTimer(timer));
  const setPlayedRounds = (playedRounds) =>
    dispatch(changePlayedRounds(playedRounds));
  const setCurrentQuestion = (currentQuestion) =>
    dispatch(changeCurrentQuestion(currentQuestion));
  const setIsLoading = (isLoading) => dispatch(changeIsLoading(isLoading));
  const setPreviousRoundAnswer = (currentAnswer) => {
    console.log({ setting: currentAnswer });
    return dispatch(changePreviousRoundAnswer(currentAnswer));
  };
  const setClearPreviousRoundAnswer = () =>
    dispatch(clearPreviousRoundAnswer());

  const { currentQuestion, isLoading, previousRoundAnswer, round } = state;
  //

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]);
  // const [currentQuestionId, setCurrentQuestionId] = useState()

  const miniReset = () => {
    handleGameHistory();
    setPlayedRounds([]);
    setTimer(Date.now());
  };

  const handlePlayedRoundsDisplay = (playedRoundsObject) => {
    setPlayedRounds([...playedRounds, playedRoundsObject]);
  };

  const handleGameStart = async () => {
    setIsLoading(true);
    try {
      const question = await http({
        url: "/games",
        method: HTTP_METHODS.POST,
        body: {
          type: "mathemagician",
          rounds: round,
        },
      });

      console.log({ question });

      if (!question) {
        alert("Error from backend");
        return;
      }
      setGameMode(GAME_MODES.GAME_START);
      setCurrentQuestion(generateProblemSec(question));
    } catch (err) {
      setCurrentQuestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimer = async (saveAnswer) => {
    // add upp all timers and set to time state
    setPreviousRoundAnswer(saveAnswer);

    setTimer(allTimers);
  };

  const handleRestart = () => {
    setClearPreviousRoundAnswer();
    // we want to reinitalize the game with the previous round
    handleGameStart();
  };

  const handleHome = (e) => {
    miniReset();
    setGameMode("Game Display");
  };
  return (
    <div>
      {/*current concluded game round */}
      {previousRoundAnswer.map((rounds) => {
        return (
          <div key={rounds.id} className="game_history">
            <GamePlayed {...rounds} />
          </div>
        );
      })}

      {state.gameMode === GAME_MODES.GAME_DISPLAY && (
        <GameScreen
          handleGameStart={handleGameStart}
          round={state.round}
          setRound={setRound}
        />
      )}

      {state.gameMode === GAME_MODES.GAME_START && (
        <GamePlay
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          round={state.round}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setPreviousRoundAnswer={setPreviousRoundAnswer}
          setGameMode={setGameMode}
          handleTimer={handleTimer}
        />
      )}

      {state.gameMode === GAME_MODES.GAME_END && (
        <GameEnd
          timer={state.timer}
          handleHome={handleHome}
          handleRestart={handleRestart}
        />
      )}

      {/*total game round played */}
      {state.gameMode === GAME_MODES.GAME_END && (
        <GameHistory gameHistory={gameHistory} />
      )}
    </div>
  );
};

export default App;
