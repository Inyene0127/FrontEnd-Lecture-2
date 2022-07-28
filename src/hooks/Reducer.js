export const changeGameMode = (newGameMode) => ({
      type: "changeGameMode",
      payload: newGameMode
});

export const changeRound = (newRound) => ({
  type: 'changeRound',
  payload: newRound
});

export const startTimer = () => ({
  type: 'startTimer'
});

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
    case 'changeGameMode':
      return setGameMode(state, action.payload);
    case 'changeRound':
      return setRound(state, action.payload);
    case 'startTimer':
        return setTimer(state, action.payload);
    default:
      throw new Error("Invalid");
  }
}
