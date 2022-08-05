import React, { useState, useEffect } from "react";
import SkipButton from "./SkipButton";
import { generateNumber, generateProblemSec, http } from "../utils";
import { evaluate } from "../utils";
import { generateProblem } from "../utils";
// import { http } from '../utils';
import { GAME_MODES, HTTP_METHODS } from "../utils/constants";
import { changePreviousRoundAnswer } from "../hooks/reducer";

const GamePlay = (props) => {
  const [gameCount, setGameCount] = useState(1);
  // const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState("");
  const [skipGame, setSkipGame] = useState(0);

  // const [time, setTime] = useState(Date.now())

  const {
    round,
    setGameMode,
    currentQuestion,
    setCurrentQuestion,
    setIsLoading,
    isLoading,
    setPreviousRoundAnswer,
    handleTimer,
  } = props;
  const { question } = currentQuestion;
  const { id } = currentQuestion;

  // const timeDifference = Math.floor(Date.now() - time) / 1000;

  //   const playedRoundsObject = {

  //     id: Math.random(),
  //     question: question,
  //     userAnswer: userAnswer,
  //     time: Date.now()-time,
  //     speed: timeDifference < 3

  // }
  const reset = () => {
    setUserAnswer("");
    // setCorrectAnswer('');
    // setGameCount((gameCount) => gameCount + 1);
    // setTime(Date.now());
  };
  // useEffect(() => {
  //   setTimeout(() => setIsLoading(true), 500);
  // }, []);

  // console.log(nextQuestion);
  const submitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const request = await http({
        url: `/games/${id}/moves`,
        method: HTTP_METHODS.POST,
        body: {
          guess: userAnswer,
        },
      });

      if (!question) {
        alert("Error from backend");
        return;
      }

      const { game, move } = request;

      const saveAnswer = {
        question: currentQuestion.question,
        userAnswer,
        time: move.timeSpentMillis,
        correct: move.correct,
        speed: true,
      };

      if (game.nextExpression !== null) {
        // handlePlayedRoundsDisplay(playedRoundsObject);
        setPreviousRoundAnswer(saveAnswer);
        setCurrentQuestion(generateProblemSec(request.game));
      } else if (game.nextExpression === null) {
        console.log({ saveAnswer });
        handleTimer(saveAnswer);
        setGameMode(GAME_MODES.GAME_END);
      }

      setUserAnswer("");
    } catch (err) {
      console.log("error fetching data", err);
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
