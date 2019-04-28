import React, { Component } from "react";
import SearchIcon from "react-icons/lib/md/search";
import classes from "./AnimatedRadar.css";
import { RadarChart, XAxis } from "react-vis";
import CircularGridLines from "../../../../node_modules/react-vis/dist/plot/circular-grid-lines";
import colors from "../../../styles/colors";
import "../../../../node_modules/react-vis/dist/style.css";
import "./PolygonStyle.css";
class AnimatedRadar extends Component {
  state = {
    data: this.props.countingStats,
    domain: this.props.domain
  };

  componentWillMount() {}
  tickFormatter = (value, index, scale, tickTotal) => {
    return `${scale.tickFormat(tickTotal, "s")}Wh`; // -> e.g. 1.2kWh
  };
  render() {
    const { data } = this.state;

    return (
      <div
        className="overflow-okay horizontally-centered"
        style={{
          fill: "none",
          stroke: "black"
        }}
      >
        <RadarChart
          animation
          data={this.props.countingStats}
          domains={this.state.domain}
          className={classes.Radar}
          style={{
            polygons: {
              fillOpacity: 0,
              strokeWidth: 3
            },
            axes: {
              text: {
                opacity: 1,
                fontSize: 12,
                stroke: "white"
              }
            },
            labels: {
              textAnchor: "middle",
              stroke: colors.red,
              opacity: 2,
              fontSize: 13
            }
          }}
          margin={{
            left: 60,
            top: 30,
            bottom: 40,
            right: 50
          }}
          width={400}
          height={350}
          tickFormat={(value, index, scale, tickTotal) => {
            return value;
          }}
        />
      </div>
    );
  }
}

export default AnimatedRadar;
