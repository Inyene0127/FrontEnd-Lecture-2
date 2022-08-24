import {useState, useReducer, useEffect} from 'react'
import useSocketConnection from './useSocketConnection'
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
} from './reducer';
import { generateProblemSec, http } from '../utils';
import { GAME_MODES, HTTP_METHODS } from '../utils/constants';


const useAppLogic = () => {
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
  setClearPreviousPlayedRounds([]);
  setGameMode(GAME_MODES.GAME_DISPLAY);
};

 const handleChange = ({ target }) => {
   const newName = target.value;
  setPlayerName(newName);
  };
  
 const handleConnect = () => {
   if (!playerName.trim()){
    alert('Please input your username');
    return;
   }


    if (!isConnected){
      setIsConnected(true);  
    }
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
    }else {
      handleHome();
    }
  }, [isConnected]);
  return {
    handleOnlinePlayers,
    handleDisconnect,
    handleConnect,
    handleChange,
    handleHome,
    handleRestart,
    handleGamePlay,
    handleGameStart,
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
    setCurrentQuestion,
    setErrorState,
    setIsLoading,
    setPlayerName,
    setPreviousPlayedRounds,
    setRound,
  };
}

export default useAppLogic
