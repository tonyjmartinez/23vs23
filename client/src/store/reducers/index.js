import { combineReducers } from "redux";
import fetchPlayersListReducer from "./fetchPlayersListReducer";

export default combineReducers({
  playerList: fetchPlayersListReducer
});
