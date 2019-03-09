import React, { Component } from "react";
const R = require("ramda");
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../styles/colors";
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
const renderTable = countingStats => {
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

const labels = ["PTS", "REB", "AST", "STL", "BLK"];

const populateStats = (stats, player, statsArr) => {
  statsArr[0][player] = { val: stats.PTS };
  statsArr[1][player] = { val: stats.REB };
  statsArr[2][player] = { val: stats.AST };
  statsArr[3][player] = { val: stats.STL };
  statsArr[4][player] = { val: stats.BLK };
  return statsArr;
};
class StatsTable extends Component {
  render() {
    let statsA = this.props.tableStats.A;
    let statsB = this.props.tableStats.B;
    let tableStats = {};
    let playerAFound = this.props.tableStats.A ? true : false;
    let playerBFound = this.props.tableStats.B ? true : false;

    let statsArr = [];
    for (let i = 0; i <= 4; i++) {
      statsArr[i] = {};
    }
    if (playerAFound) {
      statsArr = populateStats(statsA, "A", statsArr);
    }
    if (playerBFound) {
      statsArr = populateStats(statsB, "B", statsArr);
    }

    const table = renderTable(statsArr);
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
