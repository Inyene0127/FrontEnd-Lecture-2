import React, { useState, useEffect } from "react";
import { GAME_MODES } from "../App";
import { generateProblem } from "../utils";
import SkipButton from "./SkipButton";

const GamePlay = (props) => {
  const [gameCount, setGameCount] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [skipGame, setSkipGame] = useState(0);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    getProblem();
  }, []);

  const getProblem = () => {
    const problem = generateProblem();
    setCorrectAnswer(problem.correctAnswer);
    setQuestion(problem.question);
  };

  const reset = () => {
    setUserAnswer("");
    setCorrectAnswer("");
    setQuestion("");
    setGameCount((gameCount) => gameCount + 1);
    getProblem();
    setTime(Date.now());
  };

  const submitForm = (event) => {
    event.preventDefault();

    const timeDifference = Math.floor((Date.now() - time) / 1000);

    const playedRoundObject = {
      id: Math.random(),
      question: question,
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
      time: Date.now() - time,
      speed: timeDifference < 3,
    };

    if (
      userAnswer.toString().length == correctAnswer.toString().length &&
      gameCount < props.round
    ) {
      props.handlePlayedRound(playedRoundObject);
      reset();
    } else if (
      userAnswer.toString().length === correctAnswer.toString().length &&
      gameCount == props.round
    ) {
      props.handlePlayedRound(playedRoundObject);
      setSkipGame(0);
      props.setGameMode(GAME_MODES.END_GAME);
      setGameCount(1);
    }
  };

  const handleSkip = () => {
    setSkipGame(skipGame + 1);
    setGameCount((gameCount) => gameCount + 1);
    generateProblem();
  };

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
      {skipGame < Math.floor(props.round / 3) ? (
        <SkipButton onClick={handleSkip} />
      ) : null}
    </div>
  );
};

export default GamePlay;
