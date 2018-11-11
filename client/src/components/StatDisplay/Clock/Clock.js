import React from "react";

import { XYPlot, ArcSeries } from "react-vis";

import { EXTENDED_DISCRETE_COLOR_RANGE } from "../../../../node_modules/react-vis/dist/theme.js";
import colors from "../../../styles/colors";
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

  render() {
    console.log("[Clock.js]", this.props.stats);
    let pctArr = [];
    let fgPctA;
    let fgPctB;
    if (this.props.stats[0] && !this.props.stats[1]) {
      console.log("[clock.js]", this.props.stats);
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
      fgPctA = this.props.stats[0];
      fgPctB = this.props.stats[1];
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

    console.log("[Clock.js]", pctArr);

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
              damping: 9,
              stiffness: 300
            }}
            radiusDomain={[0, 3]}
            data={
              pctArr
              // [
              //{
              //  time: pctToClock(this.props.stats[0].FGPCT),
              //  radius0: 1.6,
              //  radius: 2.1,
              //  color: 1
              //},
              // {
              //   time: pctToClock(this.props.stats[1].FGPCT),
              //   radius0: 2.2,
              //   radius: 2.7,
              //   color: 2
              //}
              // ]
            }
            colorRange={[colors.orange, colors.blue]}
          />
        </XYPlot>
      </div>
    );
  }
}
