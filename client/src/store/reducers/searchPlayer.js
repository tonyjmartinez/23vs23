import { SEARCH_PLAYER_SUCCESS, SEARCH_PLAYER_START } from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  A: {
    countingStats: null
  },
  B: {
    countingStats: null
  },
  loading: false
};

const playerSearchStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const playerSearchSuccess = (state, action) => {
  console.log("action", action);
  console.log("playerSearch");

  let updatedStats = {
    countingStats: action.countingStats
  };

  let updatedState = {
    [action.playerAB]: updatedStats
  };

  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLAYER_START:
      return playerSearchStart(state, action);
    case SEARCH_PLAYER_SUCCESS:
      console.log("success");
      return playerSearchSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
