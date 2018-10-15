import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";
import classes from "./Search.css";
import SearchIcon from "react-icons/lib/md/search";
import Spinner from "../../components/Spinner/Spinner";
import NativeSelects from "../../components/NativeSelects/NativeSelects";
import MediaQuery from "react-responsive";
import SearchBox from "../../components/Search/SearchBox.js";
const R = require("ramda");
import axios from "../../axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
class Search extends Component {
  state = {
    focusBorder: "5px solid #ccc",
    players: [],
    season: "2017-2018",
    seasonType: "regular",
    loading: true,
    placeholder: "Loading...",
    searchWidthA: "25%",
    searchWidthB: "25%",
    dropdownWidth: "-10%",
    focused: ""
  };

  mapPlayer = player => {
    let mapped = {};
    let playerInfo = player.player;
    let name = playerInfo.FirstName + " " + playerInfo.LastName;
    mapped.id = name;
    mapped.label = name;
    return mapped;
  };

  aSelected = () => {
    let width;
    if (this.state.focused === "B") {
      width = "-20%";
    } else {
      width = "-20%";
    }
    this.setState(prevState => {
      return {
        searchWidthA: "50%",
        searchWidthB: "25%",
        dropdownWidth: width
      };
    });

    setTimeout(
      function() {
        this.setState({
          focused: "A"
        });
      }.bind(this),
      10
    );
  };

  bSelected = () => {
    let width;
    if (this.state.focused === "A") {
      width = "-20%";
    } else {
      width = "-20%";
    }

    this.setState({
      searchWidthA: "25%",
      searchWidthB: "50%",
      dropdownWidth: width
    });
    setTimeout(
      function() {
        this.setState(prevState => {
          return {
            focused: "B"
          };
        });
      }.bind(this),
      10
    );
  };
  noneSelected = option => {
    this.setState({
      searchWidthA: "25%",
      searchWidthB: "25%"
    });
    setTimeout(
      function() {
        this.setState(prevState => {
          if (prevState.focused === "") {
            return;
          }
          return {
            focused: ""
          };
        });
      }.bind(this),
      0
    );
  };

  fetchPlayers = season => {
    let playerArr = [];
    axios
      .get("/players?season=" + season, {
        mode: "cors"
      })
      .then(res => {
        //let players = JSON.parse(res);
        //players = players.data;
        let players = res.data.data.playerentry;
        let playerArr = [];
        playerArr = R.map(this.mapPlayer, players);
        this.setState({
          players: playerArr,
          loading: false,
          placeholder: "Search"
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    //this.fetchPlayers("2017-2018-regular");
    this.props.fetchPlayersList("2017-2018", "regular");
    console.log("component did mount", this.props.playerList);
  }

  searchForPlayer = (playerName, playerAB) => {
    this.props.searchPlayer(
      this.props.playerList.season + "-" + this.props.playerList.seasonType,
      playerName,
      playerAB
    );
  };

  searchPlayer = (playerName, playerAB) => {
    let player;
    let season = this.state.season;
    let name = playerName;
    playerName = playerName.replace(" ", "-");
    axios
      .get(
        "/playerSearch?season=" +
          season +
          "-" +
          this.state.seasonType +
          "&player=" +
          playerName,
        {
          mode: "cors"
        }
      )
      .then(res => {
        player = res.data.data[0];
        let countingStats = {
          AST: parseFloat(player.stats.AstPerGame["#text"]),
          PTS: parseFloat(player.stats.PtsPerGame["#text"]),
          REB: parseFloat(player.stats.RebPerGame["#text"]),
          STL: parseFloat(player.stats.StlPerGame["#text"]),
          BLK: parseFloat(player.stats.BlkPerGame["#text"]),
          NAME: name
        };
        this.props.showCountingStats(countingStats, playerAB);
        console.log("searchPlayer", playerAB);
      });
  };

  changeSeason = (seasonType, season) => {
    this.setState({
      season: season,
      seasonType: seasonType
    });
    this.fetchPlayers(season + "-" + seasonType);
  };

  searchFocus = () => {
    console.log(this.refs);
    this.refs.SearchBox.refs.myInput.focus();
  };

  render() {
    let playerList = [];
    if (this.props.playerList.playerList) {
      playerList = this.props.playerList.playerList;
    }
    console.log("search playersList props", this.props.playerList);
    let searchBox = aFocused => {
      let playerAB;
      if (aFocused) {
        playerAB = "A";
      } else {
        playerAB = "B";
      }
      return (
        <SearchBox
          players={playerList}
          searchPlayer={value => this.searchForPlayer(value, playerAB)}
          placeholder={this.state.placeholder}
          themeColor={aFocused ? "#0095B3" : "#FF921B"}
          width={aFocused ? this.state.searchWidthA : this.state.searchWidthB}
          onSelected={() => (aFocused ? this.aSelected() : this.bSelected())}
          noneSelected={() =>
            aFocused ? this.noneSelected("A") : this.noneSelected("B")
          }
          dropdownWidth={this.state.dropdownWidth}
          loading={this.props.playerList.loading}
        />
      );
    };

    return (
      <div className={classes.Search}>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <NativeSelects
            changeSeason={(seasonType, season) =>
              this.changeSeason(seasonType, season)
            }
          />
        </div>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            marginTop: "15px"
          }}
        >
          <MediaQuery query="(min-device-width: 601px)">
            {searchBox(true)}
            {searchBox(false)}
          </MediaQuery>
          <MediaQuery query="(max-device-width: 600px)">
            {searchBox(true)}
            {searchBox(false)}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerList: state.playerList
  };
};

export default connect(mapStateToProps, actions)(Search);
