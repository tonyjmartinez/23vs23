import React from "react";

import { XYPlot, ArcSeries } from "react-vis";

import { EXTENDED_DISCRETE_COLOR_RANGE } from "../../../../node_modules/react-vis/dist/theme.js";
import colors from "../../../styles/colors";
import Radio from "../../StatDisplay/Radio/Radio";

const PI = Math.PI;

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

const pctToClock = pct => pct / 50 * PI;

export default class Clock extends React.Component {
  state = {
    split: "FGPCT"
  };
  componentDidMount() {}

  componentWillUnmount() {}

  changeSplit = split => {
    this.setState({ split });
  };

  render() {
    let pctArr = [];
    let fgPctA;
    let fgPctB;
    if (this.props.stats[0] && !this.props.stats[1]) {
      let fgPctA = this.props.stats[0];
      pctArr[0] = {
        time: pctToClock(fgPctA[this.state.split]),
        radius0: 1.6,
        radius: 2.1,
        color: 0
      };
    } else if (this.props.stats[1] && !this.props.stats[0]) {
      fgPctB = this.props.stats[1];
      pctArr[0] = {
        time: pctToClock(fgPctB[this.state.split]),
        radius0: 1.6,
        radius: 2.1,
        color: 1
      };
    } else if (this.props.stats[0] && this.props.stats[1]) {
      fgPctA = this.props.stats[1];
      fgPctB = this.props.stats[0];
      pctArr[0] = {
        time: pctToClock(fgPctA[this.state.split]),
        radius0: 1.6,
        radius: 2.1,
        color: 0
      };
      pctArr[1] = {
        time: pctToClock(fgPctB[this.state.split]),
        radius0: 2.2,
        radius: 2.7,
        color: 1
      };
    }
    let aPct = "";
    let bPct = "";
    let vs = "";
    if (this.props.stats[0] !== undefined) {
      aPct = this.props.stats[0][this.state.split] + " %";
    }
    if (this.props.stats[1] !== undefined) {
      bPct = this.props.stats[1][this.state.split] + " %";
    }

    if (this.props.stats[0] && this.props.stats[1]) {
      vs = "  VS  ";
    }

    return (
      <div style={{ margin: "0px auto", width: "300px" }}>
        <XYPlot
          xDomain={[-3, 3]}
          yDomain={[-3, 3]}
          width={300}
          getAngle={d => d.time}
          getAngle0={d => 0}
          height={300}
        >
          <ArcSeries
            animation={{
              damping: 11,
              stiffness: 100
            }}
            radiusDomain={[0, 3]}
            data={pctArr}
            colorRange={[colors.orange, colors.blue]}
          />
        </XYPlot>
        <span style={{ color: colors.blue, fontSize: "2em" }}>{aPct}</span>
        <span style={{ color: "white", fontSize: "2em" }}>{vs}</span>
        <span style={{ color: colors.orange, fontSize: "2em" }}>{bPct}</span>
        <Radio changeSplit={this.changeSplit} />
      </div>
    );
  }
}
