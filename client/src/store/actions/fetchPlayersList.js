import * as types from "./types";
import "babel-polyfill";
import axios from "../../axios";

export const playersListSuccess = players => {
  return {
    type: types.FETCH_PLAYERS_SUCCESS,
    playerList: players
  };
};

export const fetchPlayersList = (season, seasonType) => async dispatch => {
  console.log("fetchList");
  const players = await axios.get(
    "/players?season=" + season + "-" + seasonType,
    {
      mode: "cors"
    }
  );
  console.log("players", players);
  let playerList = players.data.data[0];
  dispatch(playersListSuccess(playerList));
};
