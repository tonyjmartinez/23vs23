import {
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_START,
  FETCH_PLAYERS_LIST
} from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  playerList: null,
  loading: false
};

const fetchPlayersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const fetchPlayersSuccess = (state, action) => {
  console.log(action.playerList);
  return updateObject(state, { playerList: action.playerList, loading: false });
};
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return fetchPlayersSuccess(state, action);
    case FETCH_PLAYERS_START:
      return fetchPlayersStart(state, action);
    default:
      return state;
  }
};

export default reducer;
