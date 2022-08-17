import GameScreen from "./components/GameScreen";
import GamePlay from "./components/GamePlay";
import GameEnd from "./components/GameEnd";
import GamePlayed from "./GamePlayed";
import { GAME_MODES } from "./utils/constants";

import GameHistory from "./components/GameHistory";
import useAppLogic from "./hooks/useAppLogic";

const App = () => {
  const {
    // Setting state
    setRound,
    setCurrentQuestion,
    setIsLoading,
    setPreviousPlayedRounds,
    setErrorState,

    // Function call
    handleCloseConnection,
    handleSubmit,
    handleNameChange,
    handleHome,
    handleRestart,
    handleGamePlay,

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
  } = useAppLogic();

  return (
    <div>
      {error && <div>{error}, please try again</div>}
      {isConnected ? (
        <div>{playerName} is connected</div>
      ) : (
        <div>You are not connected</div>
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
          handleSubmit={handleSubmit}
          round={round}
          setRound={setRound}
          playerName={playerName}
          handleNameChange={handleNameChange}
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
