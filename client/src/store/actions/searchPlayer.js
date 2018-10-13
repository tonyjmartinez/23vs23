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
        console.log(err);
      });
  });

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
    .promise();
  console.log("res", res);
  player = res.data.data[0];
  let countingStats = {
    AST: parseFloat(player.stats.AstPerGame["#text"]),
    PTS: parseFloat(player.stats.PtsPerGame["#text"]),
    REB: parseFloat(player.stats.RebPerGame["#text"]),
    STL: parseFloat(player.stats.StlPerGame["#text"]),
    BLK: parseFloat(player.stats.BlkPerGame["#text"]),
    NAME: name
  };
  //this.props.showCountingStats(countingStats, playerAB);
  console.log("searchPLayer action", countingStats);
  return dispatch(searchPlayerSuccess(countingStats, playerAB));
};
