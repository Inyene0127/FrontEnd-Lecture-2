import React, { useState, useEffect } from "react";
import SkipButton from "./SkipButton";
import { generateProblemSec, http } from "../utils";
import { GAME_MODES, HTTP_METHODS } from "../utils/constants";

const GamePlay = (props) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [skipGame, setSkipGame] = useState(0);

  const {
    round,
    currentQuestion,
    setIsLoading,
    isLoading,
    handleGamePlay,
    setErrorState,
  } = props;

  const { id, question } = currentQuestion;

  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorState(null);

    try {
      const request = await http({
        url: `/games/${id}/moves`,
        method: HTTP_METHODS.POST,
        body: {
          guess: userAnswer,
        },
      });

      if (!request) {
        alert("Error from backend");
        setErrorState("Server unavailable");
        return;
      }

      const { game, move } = request;

      const playedRoundAnswer = {
        question: currentQuestion.question,
        userAnswer,
        time: move.timeSpentMillis,
        correct: move.correct,
        speed: true,
      };

      if (game.nextExpression) {
        handleGamePlay(playedRoundAnswer, request);
      } else {
        handleGamePlay(playedRoundAnswer);
      }

      setUserAnswer("");
    } catch (err) {
      console.log("error fetching data", err);
      setErrorState("Server unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    setSkipGame(skipGame + 1);
    setGameCount((gameCount) => gameCount + 1);
  };

  if (isLoading) {
    return <div>Game is Loading...</div>;
  }

  return (
    <div id="container" className="header">
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
      {skipGame < Math.floor(round / 3) && <SkipButton onClick={handleSkip} />}
    </div>
  );
};

export default GamePlay;
