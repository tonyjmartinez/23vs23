const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const btoa = require("btoa");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
const config = require("./config.js");
const axios = require("axios");
const MySportsFeeds = require("mysportsfeeds-node");
const msf = new MySportsFeeds("1.2", true);
msf.authenticate(config.key, config.pword);
module.exports = function(app) {
  app.get("/app2", function(req, res) {
    res.send({ hello: "there" });
  });

  app.get("/app2/players", async function(req, res) {
    console.log("season:" + req.query.season);
    const url =
      "https://api.mysportsfeeds.com/v1.2/pull/nba/" +
      req.query.season +
      "/roster_players.json";
    console.log("url:" + url);
    const data = await axios({
      url: url,

      type: "GET",
      dataType: "json",
      async: false,
      headers: {
        Authorization: "Basic " + btoa(config.key + ":" + config.pword)
      }
    })
      .then(function(res) {
        return res.data.rosterplayers;
      })
      .catch(function(err) {
        console.log("error", err);
      });
    res.send({ data: data });
  });

  app.get("/app2/playerSearch", async function(req, res) {
    let player = req.query.player;
    let season = req.query.season;
    console.log(player, season);
    let url =
      "https://api.mysportsfeeds.com/v1.2/pull/nba/" +
      season +
      "/cumulative_player_stats.json?player=" +
      player;
    console.log(url);
    const data = await axios({
      url: url,

      type: "GET",
      dataType: "json",
      async: false,
      headers: {
        Authorization: "Basic " + btoa(config.key + ":" + config.pword)
      }
    })
      .then(function(res) {
        return res.data.cumulativeplayerstats.playerstatsentry;
      })
      .catch(function(err) {
        //console.log(err);
      });
    res.send({ data: data });
  });

  app.post("/app2/signup", Authentication.signup);
};
