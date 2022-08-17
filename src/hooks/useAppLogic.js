import { useEffect, useReducer, useState } from "react";
import { generateProblemSec, http } from "../utils";
import { GAME_MODES, HTTP_METHODS } from "../utils/constants";
import {
  changeCurrentQuestion,
  changeErrorState,
  changeGameMode,
  changeIsLoading,
  changePreviousPlayedRounds,
  changeRound,
  changeTimer,
  clearPreviousPlayedRounds,
  initialState,
  reducer,
} from "./reducer";
import useSocketConnection from "./useSocketConnection";

const useAppLogic = () => {
  const { connectWrapper, isConnected, setIsConnected } = useSocketConnection();

  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [onlinePlayers, setOnlinePlayers] = useState([]);

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = (timer) => dispatch(changeTimer(timer));
  const setCurrentQuestion = (currentQuestion) =>
    dispatch(changeCurrentQuestion(currentQuestion));
  const setIsLoading = (isLoading) => dispatch(changeIsLoading(isLoading));
  const setPreviousPlayedRounds = (previousPlayedRounds) =>
    dispatch(changePreviousPlayedRounds(previousPlayedRounds));
  const setClearPreviousPlayedRounds = () =>
    dispatch(clearPreviousPlayedRounds());
  const setErrorState = (error) => dispatch(changeErrorState(error));

  const {
    currentQuestion,
    gameMode,
    previousPlayedRounds,
    round,
    timer,
    isLoading,
    error,
  } = state;

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
        setErrorState("error fetching request");
        return;
      }
      setGameMode(GAME_MODES.GAME_START);
      setCurrentQuestion(generateProblemSec(question));
    } catch (err) {
      setCurrentQuestion(null);
      setErrorState("Error fetching request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGamePlay = (playedRoundsArray, request) => {
    setPreviousPlayedRounds(playedRoundsArray);

    const currentPlayedRound = [...previousPlayedRounds, playedRoundsArray];

    const allTimers = currentPlayedRound.reduce((total, curr) => {
      return (total += curr.time);
    }, 0);

    setTimer(allTimers);

    if (request) {
      setCurrentQuestion(generateProblemSec(request.game));
      console.log({ request });
    } else {
      setGameMode(GAME_MODES.GAME_END);
      setGameHistory((gameHistory) => [...gameHistory, currentPlayedRound]);
    }
  };

  const handleRestart = () => {
    setClearPreviousPlayedRounds([]);
    handleGameStart();
  };

  const handleHome = () => {
    setGameMode(GAME_MODES.GAME_DISPLAY);
    setClearPreviousPlayedRounds([]);
  };

  const handleNameChange = ({ target }) => {
    const newName = target.value;
    setPlayerName(newName);
  };

  const handleSubmit = () => {
    if (!playerName.trim()) {
      alert("Please enter player name");
      return;
    }

    if (!isConnected) {
      setIsConnected(true);
    }
    handleGameStart();
  };

  const handleOnlinePlayers = (onlinePlayers) => {
    setOnlinePlayers(onlinePlayers);
  };

  const handleCloseConnection = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    if (isConnected) {
      const newConnection = connectWrapper({
        playerName,
        getOnlinePlayers: handleOnlinePlayers,
      });

      return () => {
        newConnection.close();
      };
    } else {
      // Change the game screen back to home screen and restart
      handleHome();
    }
  }, [isConnected]);

  return {
    // Setting state
    setRound,
    setCurrentQuestion,
    setIsLoading,
    setPreviousPlayedRounds,
    setErrorState,
    setPlayerName,

    // Function call
    handleCloseConnection,
    handleSubmit,
    handleNameChange,
    handleHome,
    handleRestart,
    handleGamePlay,
    handleGameStart,

    // state
    currentQuestion,
    gameMode,
    previousPlayedRounds,
    round,
    timer,
    isLoading,
    error,
    playerName,
    onlinePlayers,
    isConnected,
    gameHistory,
  };
};

export default useAppLogic;
