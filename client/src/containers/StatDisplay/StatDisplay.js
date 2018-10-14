import React, { Component } from "react";
import AnimatedRadar from "../../components/StatDisplay/AnimatedRadar/AnimatedRadar";
import StatsTable from "../../components/Tables/StatsTable";
import { connect } from "react-redux";
import colors from "../../styles/colors";
class StatDisplay extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    console.log(this.props.searchPlayer);
    let countingStats = [];
    let stats = null;
    let names;
    let statsA = this.props.searchPlayer.A.countingStats;
    let statsB = this.props.searchPlayer.B.countingStats;
    let tableStats = {
      A: statsA,
      B: statsB
    };
    if (statsA !== null) {
      statsA.color = colors.blue;
      countingStats[0] = statsA;
      console.log("name", statsA.NAME);
      names = <h2 style={{ color: colors.blue }}>{statsA.NAME}</h2>;
    }
    if (statsB !== null) {
      statsB.color = colors.orange;
      countingStats[1] = statsB;
      names = <h2 style={{ color: colors.orange }}>{statsB.NAME}</h2>;
    }
    if (statsA !== null && statsB !== null) {
      names = (
        <div>
          <h2>
            <span style={{ color: colors.blue }}> {statsA.NAME}</span>
            <span style={{ color: colors.red }}> vs </span>
            <span style={{ color: colors.orange }}>{statsB.NAME}</span>
          </h2>
        </div>
      );
    }
    if (!(statsA == null && statsB == null)) {
      stats = (
        <div>
          {names}
          <AnimatedRadar countingStats={countingStats} />
          <StatsTable tableStats={tableStats} />
        </div>
      );
    }

    return <div style={{ textAlign: "center" }}>{stats}</div>;
  }
}

const mapStateToProps = searchPlayer => {
  return searchPlayer;
};

export default connect(mapStateToProps)(StatDisplay);
