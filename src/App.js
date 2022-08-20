import React, {useState, useReducer, useEffect} from 'react'
import GameScreen from './components/GameScreen'
import GamePlay from './components/GamePlay'
import GameEnd from './components/GameEnd'
import GamePlayed from './GamePlayed'
import { GAME_MODES, HTTP_METHODS } from './utils/constants'
import { generateProblemSec, http } from './utils/index';
import GameHistory from './components/GameHistory'
import useSocketConnection from './hooks/useSocketConnection'
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
} from './hooks/reducer';

const App = () => {

  const [state, dispatch] = useReducer(reducer,undefined, initialState);
  const setGameMode = (gameMode) => dispatch(changeGameMode(gameMode));
  const setRound = (round) => dispatch(changeRound(round));
  const setTimer = (timer) => dispatch(changeTimer(timer)); 
  const setCurrentQuestion = (currentQuestion) => dispatch(changeCurrentQuestion(currentQuestion));
  const setIsLoading = (isLoading) => dispatch(changeIsLoading(isLoading));
  const setPreviousPlayedRounds = (previousPlayedRounds) => dispatch(changePreviousPlayedRounds(previousPlayedRounds));
  const setClearPreviousPlayedRounds = () => dispatch(clearPreviousPlayedRounds());
  const setErrorState = (error) => dispatch(changeErrorState(error));
 
  //Destructuring
  const { currentQuestion, gameMode, previousPlayedRounds, round, timer, isLoading, error} = state
  const { connectWrapper, setIsConnected, isConnected } = useSocketConnection();

  //state that handles the array for the total rounds played
  const [gameHistory, setGameHistory] = useState([]); 
  const [playerName, setPlayerName] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState([]);

  //Function that handles the fetch request when the game starts
  const handleGameStart = async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const question = await http({
        url: '/games',
        method: HTTP_METHODS.POST,
        body: {
          type: "mathemagician",
          rounds: round,      
        },
      });   
    if (!question) {
        setErrorState('error fetching request');
        return;
      }
      setGameMode(GAME_MODES.GAME_START);
      setCurrentQuestion(generateProblemSec(question)); 
      }
    catch(err) {
       setCurrentQuestion(null);
       setErrorState('Error fetching request');
      }
    finally{
        setIsLoading(false);
      } 
  }

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
      setGameHistory((gameHistory) => [
        ...gameHistory,
        currentPlayedRound,
      ]);
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
  
 const handleConnect = (e) => {
    e.preventDefault();
    setIsConnected(true);  
    handleGameStart();
  }
  const handleDisconnect = () => {
    setIsConnected(false);
  }

  const handleOnlinePlayers = ((onlinePlayers) => {
    setOnlinePlayers(onlinePlayers);
  }); 
  
  useEffect(() => {
    if (isConnected) {
      const newConnection = connectWrapper({
        playerName,        
        getOnlinePlayers: handleOnlinePlayers,
      });  
      return () => {
        newConnection.close();
      }
    }
  }, [isConnected]);

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
