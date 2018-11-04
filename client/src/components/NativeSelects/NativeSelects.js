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
import * as actions from "../../store/actions";
import { connect } from "react-redux";
const selectStyle = {
  width: "45%",
  marginLeft: "10px",
  color: "#0095B3",
  fontSize: "1.2em",
  appearance: "none"
};
const selectStyleYear = {
  width: "35%",
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
  componentDidMount() {
    console.log("native selects", this.props);
  }
  season = event => {
    console.log("event", event.target.value);
    this.setState({ season: event.target.value });
    this.props.fetchPlayersList(event.target.value, this.state.seasonType);
  };

  seasonType = event => {
    let type = event.target.value;
    this.setState({ seasonType: event.target.value });
    this.props.fetchPlayersList(this.state.season, event.target.value);
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
          <option style={optionStyle} value="2018-2019">
            2018-19
          </option>
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
              style={selectStyleYear}
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

export default connect(null, actions)(NativeSelects);
