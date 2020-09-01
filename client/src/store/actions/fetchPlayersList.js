import * as types from "./types";
import "babel-polyfill";
import axios from "../../axios";
const R = require("ramda");

export const playersListSuccess = (playerList) => {
  return {
    type: types.FETCH_PLAYERS_SUCCESS,
    playerList: playerList,
  };
};

export const playersListStart = (season, seasonType) => {
  return {
    type: types.FETCH_PLAYERS_START,
    season,
    seasonType,
  };
};

const filterPlayers = (player) => player.player.Position !== "C";

const mapPlayer = (player) => {
  let mapped = {};
  let playerInfo = player.player;
  let name = playerInfo.FirstName + " " + playerInfo.LastName;
  mapped.id = name;
  mapped.label = name;
  return mapped;
};
export const fetchPlayersList = (season, seasonType) => async (dispatch) => {
  dispatch(playersListStart(season, seasonType));
  const players = await axios.get(
    "/players?season=" + season + "-" + seasonType,
    {
      mode: "cors",
    }
  );
  let playerList = players.data.data.playerentry;

  let filteredPlayers = R.map(mapPlayer, playerList);

  return dispatch(playersListSuccess(filteredPlayers));
};
