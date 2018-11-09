import * as types from "./types";
import "babel-polyfill";
import axios from "../../axios";
import { task, of, rejected } from "folktale/concurrency/task";
export const searchPlayerStart = playerAB => {
  return {
    type: types.SEARCH_PLAYER_START,
    playerAB
  };
};

export const searchPlayerError = () => {
  return {
    type: types.SEARCH_PLAYER_ERROR
  };
};
export const searchPlayerSuccess = (countingStats, playerAB) => {
  return {
    type: types.SEARCH_PLAYER_SUCCESS,
    countingStats,
    playerAB
  };
};

export const searchPlayerTask = (season, playerName) =>
  task(resolver => {
    const res = axios
      .get("/playerSearch?season=" + season + "&player=" + playerName, {
        mode: "cors"
      })
      .then(res => {
        console.log(res);
        resolver.resolve(res);
      })
      .catch(err => {
        resolver.reject(err);
      });
  });

export const clearPlayerDispatch = player => {
  console.log(types.CLEAR_PLAYER);
  return {
    type: types.CLEAR_PLAYER,
    player
  };
};

export const clearPlayer = player => dispatch => {
  return dispatch(clearPlayerDispatch(player));
};

export const searchPlayer = (
  season,
  playerName,
  playerAB
) => async dispatch => {
  dispatch(searchPlayerStart(playerAB));
  let player;
  let name = playerName;
  playerName = playerName.replace(" ", "-");
  const res = await searchPlayerTask(season, playerName)
    .run()
    .promise()
    .catch(e => "error");
  console.log("res", res);
  if (res.data.data === undefined) {
    console.log("player not found");
    return dispatch(searchPlayerError());
  }
  player = res.data.data[0];
  console.log("searchPlayer.js", player);
  let countingStats = {
    AST: parseFloat(player.stats.AstPerGame["#text"]),
    PTS: parseFloat(player.stats.PtsPerGame["#text"]),
    REB: parseFloat(player.stats.RebPerGame["#text"]),
    STL: parseFloat(player.stats.StlPerGame["#text"]),
    BLK: parseFloat(player.stats.BlkPerGame["#text"]),
    FGPCT: parseFloat(player.stats.FgPct["#text"]),
    FG3PTPCT: parseFloat(player.stats.Fg3PtPct["#text"]),
    FTPCT: parseFloat(player.stats.FtPct["#text"]),
    NAME: name
  };
  //this.props.showCountingStats(countingStats, playerAB);
  console.log("searchPLayer action", countingStats);
  return dispatch(searchPlayerSuccess(countingStats, playerAB));
};
