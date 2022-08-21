import GameScreen from "./components/GameScreen";
import GamePlay from "./components/GamePlay";
import GameEnd from "./components/GameEnd";
import GamePlayed from "./GamePlayed";
import GameHistory from "./components/GameHistory";
import { GAME_MODES } from "./utils/constants";
import useAppLogic from "./hooks/useAppLogic";
 

const App = () => {
  const {
    //function call
    handleDisconnect,
    handleConnect,
    handleChange,
    handleHome,
    handleRestart,
    handleGamePlay,
    handleGameStart,

    //state
    playerName,
    error,
    gameMode,
    previousPlayedRounds,
    isLoading,
    timer,
    isConnected,
    currentQuestion,
    round,
    onlinePlayers,
    gameHistory,

    //setting state
    setCurrentQuestion,
    setErrorState,
    setIsLoading,
    setPlayerName,
    setPreviousPlayedRounds,
    setRound,
  } = useAppLogic();

  

  return (
      <div> 
        {error && <div>{ error }, please try again</div>}
        { gameMode === GAME_MODES.GAME_DISPLAY &&
          <div>
            <form onSubmit={ handleConnect }>
            Your Name: <input type='text' placeholder='Input your username' value={playerName} onChange={handleChange} autoFocus/>
            <button>CONNECT</button>
            </form>
          </div>
          }
         {/*current concluded game round */}
        { previousPlayedRounds.map((rounds, index) => {
          return (
          <div key={index} className='game_history'> 
          <GamePlayed {...rounds}/>
            </div>
             )})}  
        { gameMode === GAME_MODES.GAME_DISPLAY &&
            <GameScreen
            handleGameStart={handleGameStart} 
            round={round}  
            setRound={setRound} 
            setPlayerName={setPlayerName}
            playerName={playerName}
            />}
        { gameMode === GAME_MODES.GAME_START &&
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
           handleDisconnect={handleDisconnect}
           />
          }
        { gameMode === GAME_MODES.GAME_END && 
           <GameEnd 
           timer={timer} 
           handleHome={handleHome} 
           handleRestart={handleRestart}/>
          } 
        {/*total game round played */}
        { gameMode === GAME_MODES.GAME_END && 
        <GameHistory gameHistory={gameHistory} />
            }    
    </div>
  )
}
export default App
