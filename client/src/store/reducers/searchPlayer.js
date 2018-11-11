import {
  SEARCH_PLAYER_SUCCESS,
  SEARCH_PLAYER_START,
  SEARCH_PLAYER_ERROR,
  CLEAR_PLAYER
} from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  A: {
    stats: null
  },
  B: {
    stats: null
  },
  loading: false,
  error: false
};

const playerSearchStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  });
};

const playerSearchError = state => {
  console.log("error reducer");
  return updateObject(state, {
    error: true
  });
};

const playerSearchSuccess = (state, action) => {
  console.log("action", action);
  console.log("playerSearch");

  let updatedStats = {
    stats: action.stats
  };

  let updatedState = {
    [action.playerAB]: updatedStats
  };

  return updateObject(state, updatedState);
};

const clearPlayer = (state, action) => {
  const updatedStats = {
    stats: null
  };
  const updatedState = {
    [action.player]: updatedStats
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SEARCH_PLAYER_START:
      return playerSearchStart(state, action);
    case SEARCH_PLAYER_SUCCESS:
      console.log("success");
      return playerSearchSuccess(state, action);
    case CLEAR_PLAYER:
      return clearPlayer(state, action);
    case SEARCH_PLAYER_ERROR:
      console.log("error");
      return playerSearchError(state);
    default:
      return state;
  }
};

export default reducer;
