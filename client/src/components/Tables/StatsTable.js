import React, { Component } from "react";
const R = require("ramda");
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button";
const styles = {
  table: {
    borderCollapse: "collapse",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    fontSize: "2em",
    width: "20%"
  }
};

const mapIndexed = R.addIndex(R.map);
const renderTable = (countingStats, labels) => {
  let table = mapIndexed((val, idx) => {
    let stats = val;
    let aVal = stats.A ? (
      <td style={{ color: colors.blue }}>{stats.A.val}</td>
    ) : null;
    let bVal = stats.B ? (
      <td style={{ color: colors.orange }}>{stats.B.val}</td>
    ) : null;
    return (
      <tr key={idx}>
        {aVal}
        <td>{labels[idx]}</td>
        {bVal}
      </tr>
    );
  }, countingStats);
  return table;
};

const labels = statsType => {
  if (statsType === "counting") {
    return ["PTS", "REB", "AST", "STL", "BLK"];
  } else if (statsType === "more") {
    return ["MIN", "BPM", "TO", "DREB", "OREB"];
  }
};

const populateStats = (stats, player, statsArr, statsType) => {
  if (statsType === "counting") {
    statsArr[0][player] = { val: stats.PTS };
    statsArr[1][player] = { val: stats.REB };
    statsArr[2][player] = { val: stats.AST };
    statsArr[3][player] = { val: stats.STL };
    statsArr[4][player] = { val: stats.BLK };
  } else {
    statsArr[0][player] = { val: stats.MIN };
    statsArr[1][player] = { val: stats.BPM };
    statsArr[2][player] = { val: stats.TO };
    statsArr[3][player] = { val: stats.DREB };
    statsArr[4][player] = { val: stats.OREB };
  }
  return statsArr;
};

class StatsTable extends Component {
  render() {
    let statsA = this.props.tableStats.A;
    let statsB = this.props.tableStats.B;
    let tableStats = {};
    let playerAFound = this.props.tableStats.A ? true : false;
    let playerBFound = this.props.tableStats.B ? true : false;

    let statsVals = [];
    for (let i = 0; i <= 4; i++) {
      statsVals[i] = {};
    }
    if (playerAFound) {
      statsVals = populateStats(statsA, "A", statsVals, this.props.statsType);
    }
    if (playerBFound) {
      statsVals = populateStats(statsB, "B", statsVals, this.props.statsType);
    }

    const table = renderTable(statsVals, labels(this.props.statsType));
    const { classes } = this.props;
    return (
      <div style={{ marginBottom: "45px" }}>
        <table className={classes.table}>
          <tbody>{table}</tbody>
        </table>
      </div>
    );
  }
}
export default withStyles(styles)(StatsTable);
