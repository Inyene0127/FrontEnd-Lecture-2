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
  changePreviousPlayedRounds,
  changeTimer,
  clearPreviousPlayedRounds,
  changeErrorState,
} from "./hooks/reducer";
import GameHistory from "./components/GameHistory";
import { connect as defaultConnectWebSocket } from "./components/Websocket";
import useSocketConnection from "./hooks/useSocketConnection";

// const init = () => ({
//   connecting: false,
//   connected: false,
//   connectionError: null,
// });

// const appReducer = (state, action) => {
//   switch (action.type) {
//     case "CONNECTING":
//       return {
//         ...state,
//         connecting: true,
//         connected: false,
//         webSocketConnection: action.payload,
//       };
//     case "CONNECTED":
//       return { ...state, connecting: false, connected: true };
//     case "DISCONNECTED":
//       return {
//         ...state,
//         connecting: false,
//         connected: false,
//         connectionError: action.payload.reason,
//       };
//     case "MESSAGE_RECEIVED":
//       return null;
//     default:
//       throw new Error("Bad WebSocket reducer usage");
//   }
// };

// const connectionDescription = (state) => {
//   if (state.connected) {
//     return "Connected";
//   } else if (state.connecting) {
//     return "Connecting";
//   } else {
//     const details = state.connectionError ? `(${state.connectionError})` : "";
//     return `Disconnected${details}`;
//   }
// };

// const initiateConnection = (connectWebSocket) => {
//   const webSocketConnection = (connectWebSocket || defaultConnectWebSocket)({
//     onOpen: () => {
//       console.log('server is running')
//     },
//       onClose: ({ reason }) => console.log({reason})
//         // dispatch({ type: "DISCONNECTED", payload: { reason } }),
//     //   onMessage: ({ type, event }) => {
//       //   //     dispatch({ type: "MESSAGE_RECEIVED", payload: { type, event } });
//       //   },
//       // });
//       // dispatch({ type: "CONNECTING", payload: webSocketConnection });
//     })
//     return webSocketConnection;
// };

const App = (props) => {
  const { connectWrapper, isConnected, setIsConnected } = useSocketConnection();

  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const connectWebSocket = props.connectWebSocket || defaultConnectWebSocket;

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

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]);
  const [playerName, setPlayerName] = useState("");

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

  const handleChange = ({ target }) => {
    const newName = target.value;
    setPlayerName(newName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConnected(true);
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
    }
  }, [isConnected]);

  return (
    <div>
      {error && <div>{error}, please try again</div>}
      {gameMode === GAME_MODES.GAME_DISPLAY && (
        <div>
          <form onSubmit={handleSubmit}>
            Your Name:{" "}
            <input
              type="text"
              placeholder="Input your username"
              value={playerName}
              onChange={handleChange}
            ></input>
            <button>Submit</button>
          </form>
        </div>
      )}

      {/*current concluded game round */}
      {previousPlayedRounds.map((rounds, index) => {
        return (
          <div key={index} className="game_history">
            <GamePlayed {...rounds} />
          </div>
        );
      })}

      {gameMode === GAME_MODES.GAME_DISPLAY && (
        <GameScreen
          handleGameStart={handleGameStart}
          round={round}
          setRound={setRound}
          setPlayerName={setPlayerName}
          playerName={playerName}
        />
      )}

      {gameMode === GAME_MODES.GAME_START && (
        <GamePlay
          round={round}
          currentQuestion={currentQuestion}
          setPreviousPlayedRounds={setPreviousPlayedRounds}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          handleGamePlay={handleGamePlay}
          setErrorState={setErrorState}
          setCurrentQuestion={setCurrentQuestion}
          onlinePlayers={onlinePlayers}
          isConnected={isConnected}
          handleCloseConnection={handleCloseConnection}
        />
      )}

      {gameMode === GAME_MODES.GAME_END && (
        <GameEnd
          timer={timer}
          handleHome={handleHome}
          handleRestart={handleRestart}
        />
      )}

      {/*total game round played */}
      {gameMode === GAME_MODES.GAME_END && (
        <GameHistory gameHistory={gameHistory} />
      )}
    </div>
  );
};

export default App;
