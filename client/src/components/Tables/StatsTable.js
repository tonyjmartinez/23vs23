import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  table: {
    borderCollapse: "collapse",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    fontSize: "2em"
  }
};
class StatsTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <table className={classes.table}>
          <tbody>
            <tr>
              <td>PTS</td>
              <td>15</td>
              <td>10</td>
            </tr>
            <tr>
              <td>PTS</td>
              <td>15</td>
              <td>10</td>
            </tr>
            <tr>
              <td>PTS</td>
              <td>15</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default withStyles(styles)(StatsTable);
