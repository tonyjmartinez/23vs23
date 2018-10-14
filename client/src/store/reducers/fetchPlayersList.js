import {
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_START,
  FETCH_PLAYERS_LIST
} from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  playerList: null,
  loading: false,
  season: "2017-2018",
  seasonType: "regular"
};

const fetchPlayersStart = (state, action) => {
  console.log("fetch start");
  return updateObject(state, {
    loading: true,
    season: action.season,
    seasonType: action.seasonType
  });
};

const fetchPlayersSuccess = (state, action) => {
  console.log("fetch success", state);
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
