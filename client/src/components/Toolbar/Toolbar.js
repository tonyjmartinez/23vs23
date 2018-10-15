import React from "react";
import classes from "./Toolbar.css";
const toolbar = props => (
  <div className={classes.Toolbar}>
    <div>
      <h3 style={{ marginBottom: "10px" }}>23 vs 23</h3>
    </div>
    <div>NBA Player Stats Comparator</div>
  </div>
);

export default toolbar;
