import React, { useState, useReducer, useEffect } from "react";
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
  changeCurrentQuestion,
  changeIsLoading,
  changePreviousRoundAnswer,
  changeTimer,
  clearPreviousRoundAnswer,
  changeErrorState,
} from "./hooks/reducer";
import GameHistory from "./components/GameHistory";

const App = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const [gameHistory, setGameHistory] = useState([]);

  const {
    currentQuestion,
    isLoading,
    previousRoundAnswer,
    round,
    gameMode,
    error,
  } = state;

  // Set game type
  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));

  const setRound = (round) => dispatch(changeRound(round));

  const setTimer = (timer) => dispatch(changeTimer(timer));

  const setCurrentQuestion = (currentQuestion) =>
    dispatch(changeCurrentQuestion(currentQuestion));

  const setIsLoading = (isLoading) => dispatch(changeIsLoading(isLoading));
  const setErrorState = (error) => dispatch(changeErrorState(error));

  const setPreviousRoundAnswer = (currentAnswer) => {
    return dispatch(changePreviousRoundAnswer(currentAnswer));
  };

  const setClearPreviousRoundAnswer = () =>
    dispatch(clearPreviousRoundAnswer());

  // useEffect(() => {
  //   if (gameMode === GAME_MODES.GAME_END) {
  //     const allTimers = previousRoundAnswer.reduce((total, curr) => {
  //       return (total += curr.time);
  //     }, 0);

  //     setTimer(allTimers);
  //     setGameHistory((gameHistory) => [...gameHistory, previousRoundAnswer]);
  //   }
  // }, [gameMode]);

  const handleGameStart = async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const question = await http({
        url: "/games",
        method: HTTP_METHODS.POST,
        body: {
          type: "mathemagician",
          rounds: round,
        },
      });

      if (!question) {
        alert("Error from backend");
        setErrorState("Server unavailable");
        return;
      }
      setGameMode(GAME_MODES.GAME_START);
      setCurrentQuestion(generateProblemSec(question));
    } catch (err) {
      setCurrentQuestion(null);
      setErrorState("Server unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGamePlay = (playedRoundAnswer, request) => {
    // I picked 2 rounds
    //    previousRoundAnswer = []
    // orange = 4
    setPreviousRoundAnswer(playedRoundAnswer);

    // orange = 4, the guy has picked up the orange = 5

    // i wil not be able to get acess to the new previous round answer
    // What i will have access to is the stale/old state

    //fix  1
    const localUpdatedRoundAnswer = [...previousRoundAnswer, playedRoundAnswer];

    const allTimers = localUpdatedRoundAnswer.reduce((total, curr) => {
      return (total += curr.time);
    }, 0);

    setTimer(allTimers);

    if (request) {
      setCurrentQuestion(generateProblemSec(request.game));
    } else {
      setGameMode(GAME_MODES.GAME_END);
      setGameHistory((gameHistory) => [
        ...gameHistory,
        localUpdatedRoundAnswer,
      ]);
    }

    // or fix 2
  };

  const handleRestart = () => {
    setClearPreviousRoundAnswer([]);
    handleGameStart();
  };

  const handleHome = (e) => {
    setGameMode(GAME_MODES.GAME_DISPLAY);
    setClearPreviousRoundAnswer([]);
  };

  return (
    <div>
      {error && <div>{error}, Please try again</div>}
      {/*current concluded game round */}
      {previousRoundAnswer.map((rounds, index) => {
        return (
          <div key={index} className="game_history">
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
          handleGamePlay={handleGamePlay}
          setErrorState={setErrorState}
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
