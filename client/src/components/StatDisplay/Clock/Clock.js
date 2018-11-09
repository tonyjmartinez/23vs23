import React from "react";

import { XYPlot, ArcSeries } from "react-vis";

import { EXTENDED_DISCRETE_COLOR_RANGE } from "../../../../node_modules/react-vis/dist/theme.js";

const PI = Math.PI;

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

const pctToClock = pct => pct / 50 * PI;

export default class Clock extends React.Component {
  state = {
    time: 0
  };

  componentDidMount() {
    console.log("[Clock.js]", this.props.stats[0].REB);
    this._timerId = setInterval(
      () => this.setState({ time: getSeconds() }),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
    this.setState({ timerId: false });
  }

  render() {
    const { time } = this.state;
    const seconds = time % 60;
    const minutes = (time / 60) % 60;
    const hours = (time / (60 * 24)) % 24;
    return (
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
          data={[
            {
              time: pctToClock(this.props.stats[0].FGPCT),
              radius0: 1,
              radius: 1.5,
              color: 0
            },
            {
              time: pctToClock(this.props.stats[0].FG3PTPCT),
              radius0: 1.6,
              radius: 2.1,
              color: 1
            },
            {
              time: pctToClock(this.props.stats[0].FTPCT),
              radius0: 2.2,
              radius: 2.7,
              color: 2
            }
          ]}
          colorRange={EXTENDED_DISCRETE_COLOR_RANGE}
        />
      </XYPlot>
    );
  }
}
