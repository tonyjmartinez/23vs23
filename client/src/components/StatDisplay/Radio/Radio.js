import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import colors from "../../../styles/colors";
const styles = {
  root: {
    color: colors.red,
    "&$checked": {
      color: colors.red
    }
  },
  checked: {}
};

class RadioButtons extends React.Component {
  state = {
    selectedValue: "FGPCT"
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.changeSplit(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ color: "white" }}>
        <Radio
          checked={this.state.selectedValue === "FGPCT"}
          onChange={this.handleChange}
          value="FGPCT"
          name="radio-button-demo"
          classes={{
            root: classes.root,
            checked: classes.checked
          }}
        />
        FG
        <Radio
          checked={this.state.selectedValue === "FG3PTPCT"}
          onChange={this.handleChange}
          value="FG3PTPCT"
          name="radio-button-demo"
          classes={{
            root: classes.root,
            checked: classes.checked
          }}
        />
        3PT
        <Radio
          checked={this.state.selectedValue === "FTPCT"}
          onChange={this.handleChange}
          value="FTPCT"
          name="radio-button-demo"
          classes={{
            root: classes.root,
            checked: classes.checked
          }}
        />
        FT
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtons);
