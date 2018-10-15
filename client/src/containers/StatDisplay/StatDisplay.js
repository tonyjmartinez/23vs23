import React, { Component } from "react";
import AnimatedRadar from "../../components/StatDisplay/AnimatedRadar/AnimatedRadar";
import StatsTable from "../../components/Tables/StatsTable";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import colors from "../../styles/colors";
import RemoveCircle from "react-icons/lib/md/remove-circle-outline";
class StatDisplay extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    let RemoveIcon = player => (
      <RemoveCircle
        onClick={() => this.props.clearPlayer(player)}
        style={{ marginBottom: "5px", marginLeft: "5px" }}
      />
    );
    console.log("statdisplay", this.props);
    let countingStats = [];
    let stats = null;
    let names;
    let statsA = this.props.playerStats.A.countingStats;
    let statsB = this.props.playerStats.B.countingStats;
    let tableStats = {
      A: statsA,
      B: statsB
    };
    if (statsA !== null) {
      statsA.color = colors.blue;
      countingStats[0] = statsA;
      console.log("name", statsA.NAME);
      names = (
        <h2 style={{ color: colors.blue }}>
          {statsA.NAME}
          {RemoveIcon("A")}
        </h2>
      );
    }
    if (statsB !== null) {
      statsB.color = colors.orange;
      countingStats[1] = statsB;
      names = (
        <h2 style={{ color: colors.orange }}>
          {statsB.NAME}
          {RemoveIcon("B")}
        </h2>
      );
    }
    if (statsA !== null && statsB !== null) {
      names = (
        <div>
          <h2>
            <span style={{ color: colors.blue }}>
              {" "}
              {statsA.NAME}
              {RemoveIcon("A")}
            </span>
            <span style={{ color: colors.red }}> vs </span>
            <span style={{ color: colors.orange }}>
              {statsB.NAME}
              {RemoveIcon("B")}
            </span>
          </h2>
        </div>
      );
    }
    if (!(statsA == null && statsB == null)) {
      stats = (
        <div>
          {names}
          <AnimatedRadar countingStats={countingStats} />
          <h3 style={{ color: colors.red }}>Counting Stats Per Game</h3>
          <StatsTable tableStats={tableStats} />
        </div>
      );
    }

    return <div style={{ textAlign: "center" }}>{stats}</div>;
  }
}

const mapStateToProps = state => {
  return { playerStats: state.searchPlayer };
};

export default connect(mapStateToProps, actions)(StatDisplay);
