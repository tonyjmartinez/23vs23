import React, { Component } from "react";
import AnimatedRadar from "../../components/StatDisplay/AnimatedRadar/AnimatedRadar";
class StatDisplay extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "white" }}>{this.props.playerName}</h1>
        <AnimatedRadar countingStats={this.props.countingStats} />
      </div>
    );
  }
}

export default StatDisplay;
