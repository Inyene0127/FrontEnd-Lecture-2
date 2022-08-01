import { DISPATCH_ACTIONS } from "../utils/constants";

export const changeGameMode = (newGameMode) => ({
      type: DISPATCH_ACTIONS.CHANGE_GAMEMODE,
      payload: newGameMode
});

export const changeRound = (newRound) => ({
  type: DISPATCH_ACTIONS.CHANGE_ROUND,
  payload: newRound
});

export const startTimer = () => ({
  type: DISPATCH_ACTIONS.START_TIMER
});

// export const changePlayedRounds = (newPlayedRounds) => ({
//   type: 'changePlayedRounds',
//   payload: newPlayedRounds
// });

export const initializer = () => ({
  round: 3,
  time: null,
});

const setRound = (state, newRound) => ({
  ...state,
  round: newRound
});

const setGameMode = (state, newGameMode) => ({
  ...state,
  gameMode: newGameMode
});

const setTimer = (state) => ({
  ...state,
  timer: Date.now()
})

export const reducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_ACTIONS.CHANGE_GAMEMODE:
      return setGameMode(state, action.payload);
    case DISPATCH_ACTIONS.CHANGE_ROUND:
      return setRound(state, action.payload);
    case DISPATCH_ACTIONS.START_TIMER:
        return setTimer(state, action.payload);
    default:
      throw new Error("Invalid");
  }
}
