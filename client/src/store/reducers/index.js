import { combineReducers } from "redux";
import fetchPlayersList from "./fetchPlayersList";

export default combineReducers({
  playerList: fetchPlayersList
});
