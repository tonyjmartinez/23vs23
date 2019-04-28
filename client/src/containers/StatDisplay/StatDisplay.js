import React, { Component } from "react";
import AnimatedRadar from "../../components/StatDisplay/AnimatedRadar/AnimatedRadar";
import Clock from "../../components/StatDisplay/Clock/Clock";
import PctTable from "../../components/Tables/PctTable";
import StatsTable from "../../components/Tables/StatsTable";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import * as actions from "../../store/actions";
import colors from "../../styles/colors";
import RemoveCircle from "react-icons/lib/md/remove-circle-outline";
import Swipe from "../../components/Swipe/Swipe";
import SwapIcon from "react-icons/lib/md/swap-horiz";
import PlayersBar from "../../components/PlayersBar/PlayersBar";

const countingStatsDomain = [
  { name: "PTS", domain: [0, 35] },
  { name: "REB", domain: [0, 25], tickFormat: t => Math.round(t) },
  { name: "AST", domain: [0, 15], tickFormat: t => Math.round(t) },
  { name: "STL", domain: [0, 10], tickFormat: t => Math.round(t) },
  { name: "BLK", domain: [0, 10], tickFormat: t => Math.round(t) }
];

const moreStatsDomain = [
  { name: "MIN", domain: [0, 45], tickFormat: t => Math.round(t) },
  { name: "BPM", domain: [0, 40], tickFormat: t => Math.round(t) },
  { name: "TO", domain: [0, 10], tickFormat: t => Math.round(t) },
  { name: "DREB", domain: [0, 20], tickFormat: t => Math.round(t) },
  { name: "OREB", domain: [0, 20], tickFormat: t => Math.round(t) }
];

class StatDisplay extends Component {
  componentWillMount() {}
  render() {
    let RemoveIcon = player => (
      <RemoveCircle
        onClick={() => this.props.clearPlayer(player)}
        style={{ marginBottom: "5px", marginLeft: "5px" }}
      />
    );

    const removePlayer = player => {
      this.props.clearPlayer(player);
    };

    let stats = [];
    let statsDisplay = null;
    let names;
    let statsA = this.props.playerStats.A.stats;
    let statsB = this.props.playerStats.B.stats;
    let tableStats = {
      A: statsA,
      B: statsB
    };
    if (statsA !== null) {
      statsA.color = colors.blue;
      stats[0] = statsA;
      names = (
        <PlayersBar
          clearPlayer={player => removePlayer(player)}
          playerAName={statsA.NAME}
        />
      );
    }
    if (statsB !== null) {
      statsB.color = colors.orange;
      stats[1] = statsB;
      names = (
        <PlayersBar
          clearPlayer={player => removePlayer(player)}
          playerBName={statsB.NAME}
        />
      );
    }

    if (statsA !== null && statsB !== null) {
      names = (
        <PlayersBar
          clearPlayer={player => removePlayer(player)}
          playerAName={statsA.NAME}
          playerBName={statsB.NAME}
        />
      );
    }
    if (!(statsA == null && statsB == null)) {
      statsDisplay = (
        <div>
          {names}
          <SwapIcon size={30} color="white" />
          <Swipe>
            <div>
              <AnimatedRadar
                countingStats={stats}
                domain={countingStatsDomain}
              />
              <h3 style={{ color: colors.red }}>Counting Stats Per Game</h3>
              <StatsTable tableStats={tableStats} statsType="counting" />
            </div>
            <div>
              <AnimatedRadar countingStats={stats} domain={moreStatsDomain} />
              <h3 style={{ color: colors.red }}>Stats Per Game</h3>
              <StatsTable tableStats={tableStats} statsType="more" />
            </div>
          </Swipe>

          <hr
            style={{
              width: "70%",
              border: "2px solid " + colors.blue
            }}
          />
          <Clock stats={stats} />
          <h3 style={{ color: colors.red }}>Shooting Splits Per Game</h3>
          <PctTable tableStats={tableStats} />
        </div>
      );
    }
    let error = null;
    if (this.props.playerStats.error) {
      error = <h3 style={{ color: colors.red }}>Player Stats Not Found</h3>;
    }
    return (
      <div style={{ textAlign: "center" }}>
        {error}
        {statsDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { playerStats: state.searchPlayer };
};

export default connect(mapStateToProps, actions)(StatDisplay);
