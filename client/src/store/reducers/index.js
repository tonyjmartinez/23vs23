import { combineReducers } from "redux";
import fetchPlayersList from "./fetchPlayersList";
import searchPlayer from "./searchPlayer";
export default combineReducers({
  playerList: fetchPlayersList,
  searchPlayer: searchPlayer
});
