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
    let radar = null;
    let statsA = this.props.searchPlayer.A.countingStats;
    let statsB = this.props.searchPlayer.B.countingStats;
    if (statsA !== null) {
      statsA.color = colors.blue;
      countingStats[0] = statsA;
    }
    if (statsB !== null) {
      statsB.color = colors.orange;
      countingStats[1] = statsB;
    }
    if (!(statsA == null && statsB == null)) {
      radar = <AnimatedRadar countingStats={countingStats} />;
    }

    return (
      <div style={{ textAlign: "center" }}>
        <StatsTable />
        {radar}
      </div>
    );
  }
}

const mapStateToProps = searchPlayer => {
  return searchPlayer;
};

export default connect(mapStateToProps)(StatDisplay);
