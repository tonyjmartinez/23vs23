import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Nav from "./hoc/Nav/Nav";
import asyncComponent from "./hoc/asyncComponent";
import Toolbar from "./components/Toolbar/Toolbar";
import Search from "./containers/Search/Search";
import AnimatedRadar from "./components/StatDisplay/AnimatedRadar/AnimatedRadar";
import StatDisplay from "./containers/StatDisplay/StatDisplay";
const AsyncComp = asyncComponent(() => {
  //return import("./containers/Comp.js");
});

class App extends Component {
  state = {
    playerName: "",
    countingStats: []
  };

  showPlayer = player => {
    this.setState({ playerName: player });
  };

  showCountingStats = (stats, playerAB) => {
    console.log("new stats", stats);
    let newStats = [];
    newStats[0] = stats;

    const updatedStats = [...this.state.countingStats];
    if (playerAB === "A") {
      stats.color = "blue";
      updatedStats[0] = stats;
    } else {
      stats.color = "orange";
      updatedStats[1] = stats;
    }
    this.setState({ playerName: updatedStats[0].NAME });
    this.setState({ countingStats: updatedStats });
  };

  render() {
    console.log("Cnt Stats", this.state.countingStats);
    let statDisp = null;
    if (this.state.countingStats.length > 0) {
      statDisp = (
        <StatDisplay
          playerName={this.state.playerName}
          countingStats={this.state.countingStats}
        />
      );
    }

    return (
      <div style={{ marginBottom: "100px" }}>
        <Nav>
          <Toolbar />
        </Nav>
        <Search
          showCountingStats={(stats, playerAB) =>
            this.showCountingStats(stats, playerAB)
          }
        />
        <div style={{ marginTop: "15px" }}>
          <StatDisplay />
        </div>
      </div>
    );
  }
}

export default App;
