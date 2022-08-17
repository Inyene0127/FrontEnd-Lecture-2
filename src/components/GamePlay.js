import React, { useState } from "react";
import { generateProblemSec, http } from "../utils";
import { HTTP_METHODS } from "../utils/constants";

const GamePlay = (props) => {
  const [gameCount, setGameCount] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [skipGame, setSkipGame] = useState(1);

  const {
    round,
    currentQuestion,
    setIsLoading,
    isLoading,
    handleGamePlay,
    setErrorState,
    setCurrentQuestion,
    onlinePlayers,
    isConnected,
    handleCloseConnection = { handleCloseConnection },
  } = props;
  const { question } = currentQuestion;
  const { id } = currentQuestion;

  const handleSkip = (e) => {
    e.preventDefault();
    setCurrentQuestion(generateProblemSec());
  };

  const submitForm = async (event, skip) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorState(null);
    try {
      const request = await http({
        url: `/games/${id}/moves`,
        method: HTTP_METHODS.POST,
        body: {
          guess: skip ? "skip" : userAnswer,
        },
      });
      if (!question) {
        alert("Error from backend");
        setErrorState("error fetching request");
        return;
      }
      const { game, move } = request;

      console.log({ game });
      setSkipGame(game.skipsRemaining);
      const playedRoundsArray = {
        question: currentQuestion.question,
        userAnswer,
        time: move.timeSpentMillis,
        correct: move.correct,
        // skipped: move.skipped
      };
      if (game.nextExpression) {
        handleGamePlay(playedRoundsArray, request);
        setUserAnswer("");
      } else {
        handleGamePlay(playedRoundsArray);
      }
    } catch (err) {
      setErrorState("Error fetching request");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h2>Game is loading...</h2>;
  }

  return (
    <div id="container" className="header">
      {isConnected && (
        <div>
          <button onClick={handleCloseConnection}>Disconnect</button>

          <p>Online Players</p>
          <ul>
            {onlinePlayers.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
      <h1>{question}</h1>
      <form onSubmit={submitForm}>
        <input
          className="inputVal"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
        />
        <button id="btn" type="submit">
          Submit
        </button>
      </form>
      {!!skipGame && (
        <button onClick={(e) => submitForm(e, true)} id="btn">
          Skip
        </button>
      )}
    </div>
  );
};

export default GamePlay;
