import { DISPATCH_ACTIONS, GAME_MODES } from "../utils/constants";

// export const changeGameHistory = (newGameHistory) => ({
//   type: 'changeGameHistory',
//   payload: newGameHistory
// });

// export const changePlayedRounds = (newPlayedRounds) => ({
//   type: 'changePlayedRounds',
//   payload: newPlayedRounds
// });

export const initializer = () => ({
  round: 3,
  time: null,
});

export const initialState = {
  round: 3,
  timer: null,
  gameMode: GAME_MODES.GAME_DISPLAY,
  playedRounds: [],
  currentQuestion: null,
};

// Dispatch
export const changeGameMode = (newGameMode) => ({
  type: DISPATCH_ACTIONS.CHANGE_GAME_MODE,
  payload: newGameMode,
});

export const changeRound = (newRound) => ({
  type: DISPATCH_ACTIONS.CHANGE_ROUND,
  payload: newRound,
});
export const changePlayedRounds = (playedRounds) => ({
  type: DISPATCH_ACTIONS.CHANGE_PLAYED_ROUNDS,
  payload: playedRounds,
});
export const changeQuestion = (currentQuestion) => ({
  type: DISPATCH_ACTIONS.SET_CURRENT_QUESTION,
  payload: currentQuestion,
});

export const startTimer = () => ({
  type: DISPATCH_ACTIONS.START_TIMER,
});

// Setter
const setRound = (state, newRound) => ({
  ...state,
  round: newRound,
});

const setGameMode = (state, newGameMode) => ({
  ...state,
  gameMode: newGameMode,
});

const setPlayedRounds = (state, playedRounds) => ({
  ...state,
  playedRounds: playedRounds,
});
const setCurrentQuestion = (state, currentQuestion) => ({
  ...state,
  currentQuestion: currentQuestion,
});

const setTimer = (state) => ({
  ...state,
  timer: Date.now(),
});

export const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_ACTIONS.CHANGE_GAME_MODE:
      return setGameMode(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_ROUND:
      return setRound(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_PLAYED_ROUNDS:
      return setPlayedRounds(state, action.payload);
    case DISPATCH_ACTIONS.START_TIMER:
      return setTimer(state, action.payload);
    case DISPATCH_ACTIONS.SET_CURRENT_QUESTION:
      return setCurrentQuestion(state, action.payload);
    default:
      throw new Error("Invalid");
  }
};
