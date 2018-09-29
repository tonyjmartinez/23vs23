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
    searchWidthA: "65%",
    searchWidthB: "65%",
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
      width = "-30%";
    } else {
      width = "-10%";
    }
    this.setState(prevState => {
      return {
        searchWidthA: "80%",
        searchWidthB: "40%",
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
      width = "-30%";
    } else {
      width = "-10%";
    }

    this.setState({
      searchWidthA: "40%",
      searchWidthB: "80%",
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
      searchWidthA: "65%",
      searchWidthB: "65%"
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

  componentWillMount() {
    //this.fetchPlayers("2017-2018-regular");
    this.props.fetchPlayersList("2017-2018", "regular");
  }

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
    debugger;
    this.setState({
      season: season,
      seasonType: seasonType
    });
    this.fetchPlayers(season + "-" + seasonType);
  };

  render() {
    const smallStyle = {
      width: "60%",
      /*border: "5px solid #ccc",*/
      //border: this.state.focusBorder,
      borderRadius: "5px",
      display: "inline-block",
      float: "left",
      padding: "8px 10px",
      lineHeight: "8px",
      outlineWidth: 0
    };

    const wrapperStyle = {
      width: "100%",
      marginLeft: "1.5em",
      outline: "none"
    };

    const dropdownStyle = {
      backgroundColor: "grey",
      color: "white",
      height: "30px",
      lineHeight: "30px"
    };

    const dropdownStyleHL = {
      backgroundColor: "#FF921B",
      color: "white",
      height: "30px",
      lineHeight: "30px"
    };

    const menuStyle = {
      position: "fixed",
      overflow: "auto",
      maxHeight: "50%",
      borderRadius: "5px",
      left: "0px"
    };

    const searchStyle = {};

    const itemStyle = {
      position: "relative",
      left: "20px"
    };

    let spinner = <Spinner style={{}} />;
    let searchIcon = (
      <SearchIcon
        style={searchStyle}
        size={40}
        color="#FF921B"
        onClick={() => {
          let search = this.search;
          let search_value = this.search.value;
          search.focus();
          search.value = search_value;
        }}
      />
    );

    let searchBox = aFocused => {
      let playerAB;
      if (aFocused) {
        playerAB = "A";
      } else {
        playerAB = "B";
      }
      return (
        <SearchBox
          players={this.state.players}
          searchPlayer={value => this.searchPlayer(value, playerAB)}
          placeholder={this.state.placeholder}
          themeColor={aFocused ? "#0095B3" : "#FF921B"}
          width={aFocused ? this.state.searchWidthA : this.state.searchWidthB}
          onSelected={() => (aFocused ? this.aSelected() : this.bSelected())}
          noneSelected={() =>
            aFocused ? this.noneSelected("A") : this.noneSelected("B")
          }
          dropdownWidth={this.state.dropdownWidth}
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
          {this.state.loading ? spinner : searchIcon}
        </div>
        <div
          style={{
            clear: "both",
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

export default connect(null, actions)(Search);
