import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import KeyboardDown from "react-icons/lib/md/keyboard-arrow-down";
import ArrowDown from "react-icons/lib/md/arrow-drop-down-circle";

const selectStyle = {
  width: "25%",
  marginLeft: "10px",
  color: "#0095B3",
  fontSize: "1.2em",
  appearance: "none"
};

const optionStyle = {
  backgroundColor: "#636060",
  border: "none"
};

class NativeSelects extends React.Component {
  state = {
    season: "2017-2018",
    seasonType: "regular"
  };

  season = event => {
    console.log("event", event.target.value);
    this.setState({ season: event.target.value });
    this.props.changeSeason(this.state.seasonType, event.target.value);
  };

  seasonType = event => {
    let type = event.target.value;
    this.setState({ seasonType: event.target.value });
    this.props.changeSeason(event.target.value, this.state.season);
  };

  colorStyle = () => {
    return (
      <ArrowDown
        style={{
          color: "#0095B3",
          right: 0,
          position: "absolute",
          top: "calc(50% - 12px)",
          pointerEvents: "none"
        }}
      />
    );
  };

  render() {
    let options;
    if (this.state.seasonType === "regular") {
      options = (
        <React.Fragment>
          <option style={optionStyle} value="2017-2018">
            2017-18
          </option>
          <option style={optionStyle} value="2016-2017">
            2016-17
          </option>
          <option style={optionStyle} value="2015-2016">
            2015-16
          </option>
        </React.Fragment>
      );
    } else {
      options = (
        <React.Fragment>
          <option style={optionStyle} value="2018">
            2018
          </option>
          <option style={optionStyle} value="2017">
            2017
          </option>
          <option style={optionStyle} value="2016">
            2016
          </option>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <NativeSelect
          IconComponent={this.colorStyle}
          onChange={this.seasonType.bind(this)}
          input={
            <Input
              style={selectStyle}
              name="seasonType"
              id="seasonType-native-helper"
            />
          }
        >
          <option style={optionStyle} value="regular">
            Regular Season
          </option>
          <option style={optionStyle} value="playoff">
            Playoffs
          </option>
        </NativeSelect>
        <NativeSelect
          IconComponent={this.colorStyle}
          onChange={this.season.bind(this)}
          input={
            <Input
              style={selectStyle}
              name="season"
              id="season-native-helper"
            />
          }
        >
          {options}
        </NativeSelect>
      </React.Fragment>
    );
  }
}

export default NativeSelects;
