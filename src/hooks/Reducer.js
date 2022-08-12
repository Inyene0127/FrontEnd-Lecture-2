import { GAME_MODES } from '../utils/constants'
import { DISPATCH_ACTIONS } from "../utils/constants";

//DISPATCH
export const changeGameMode = (newGameMode) => ({
      type: DISPATCH_ACTIONS.CHANGE_GAMEMODE,
      payload: newGameMode
});

export const changeRound = (newRound) => ({
  type: DISPATCH_ACTIONS.CHANGE_ROUND,
  payload: newRound
});

export const changeTimer = (timer) => ({
  type: DISPATCH_ACTIONS.CHANGE_TIMER,
  payload: timer
});

export const changeCurrentQuestion = (currentQuestion) => ({
  type: DISPATCH_ACTIONS.CHANGE_CURRENT_QUESTION,
  payload: currentQuestion
});

export const changeIsLoading = (isLoading) => ({
  type: DISPATCH_ACTIONS.CHANGE_IS_LOADING,
  payload: isLoading
});

export const changePreviousPlayedRounds = (previousPlayedRounds) => ({
  type: DISPATCH_ACTIONS.CHANGE_PREVIOUS_PLAYED_ROUNDS,
  payload: previousPlayedRounds
});

export const clearPreviousPlayedRounds = () => ({
  type: DISPATCH_ACTIONS.CLEAR_PREVIOUS_PLAYED_ROUNDS,
});

export const changeErrorState = (error) => ({
  type: DISPATCH_ACTIONS.CHANGE_ERROR_STATE,
  payload: error
});



export const initialState = () => ({
  round: 3,
  timer: null,
  gameMode: GAME_MODES.GAME_DISPLAY,
  currentQuestion: null,
  isLoading: false,
  previousPlayedRounds: [],
  error: null,

});

//SETTER
const setRound = (state, newRound) => ({
  ...state,
  round: newRound
});

const setGameMode = (state, newGameMode) => ({
  ...state,
  gameMode: newGameMode
});

const setTimer = (state, timer) => ({
  ...state,
  timer: timer
});



const setCurrentQuestion = (state, newCurrentQuestion) => ({
  ...state,
  currentQuestion: newCurrentQuestion
});

const setIsLoading = (state, newIsLoading) => ({
  ...state,
  isLoading: newIsLoading,
});

const setPreviousPlayedRounds = (state, previousPlayedRounds) => ({
  ...state,
  previousPlayedRounds: [...state.previousPlayedRounds, previousPlayedRounds]
});

const setClearPreviousPlayedRounds = (state) => ({
  ...state,
  previousPlayedRounds: []
});

const setErrorState = (state, error) => ({
  ...state,
  error,
});


export const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_ACTIONS.CHANGE_GAMEMODE:
      return setGameMode(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_ROUND:
      return setRound(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_TIMER:
      return setTimer(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_CURRENT_QUESTION:
      return setCurrentQuestion(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_IS_LOADING:
      return setIsLoading(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_PREVIOUS_PLAYED_ROUNDS:
      return setPreviousPlayedRounds(state, action.payload);
    case DISPATCH_ACTIONS.CLEAR_PREVIOUS_PLAYED_ROUNDS:
      return setClearPreviousPlayedRounds(state);
    case DISPATCH_ACTIONS.CHANGE_ERROR_STATE:
      return setErrorState(state, action.payload);  
        default:
      throw new Error("Invalid");
  }
}
