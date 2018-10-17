import React, { Component } from "react";
import classes from "./SearchBox.css";
import ReactAutocomplete from "react-autocomplete";
import MediaQuery from "react-responsive";
import Person from "react-icons/lib/md/person";
import PersonOutline from "react-icons/lib/md/person-outline";
import SearchIcon from "react-icons/lib/md/search";

import Spinner from "../Spinner/Spinner";
class searchBox extends Component {
  state = {
    value: "",
    focus: false,
    dropdownOpacity: 0
  };
  onBlur = () => {
    this.setState({ focus: false, dropdownOpacity: 0 });
    this.props.noneSelected();
  };
  onFocus = () => {
    this.setState({ value: "" });
    this.setState({ focus: true });
    this.props.onSelected();
    setTimeout(
      function() {
        this.setState({ dropdownOpacity: 1 });
      }.bind(this),
      500
    );
  };
  render() {
    let border;
    if (this.state.focus) {
      border = "5px solid " + this.props.themeColor;
    } else {
      border = "5px solid #ccc";
    }
    const inputStyle = {
      width: this.props.width,
      border: border,
      borderRadius: "5px",
      display: "inline-block",
      padding: "8px 10px",
      lineHeight: "8px",
      outlineWidth: 0,
      backgroundColor: "grey",
      color: "white",
      textOverflow:'ellipsis',
      margin: "0px auto",
      transition: "width 0.6s ease-in-out",
      transitionTimingFunction: "linear",
      fontSize: "16px",

    };
    const wrapperStyle = {
      width: "50%",
      display: "inline-block",
      outline: "none",
      textAlign: "center",
      whiteSpace: "nowrap"
    };

    const dropdownStyle = {
      backgroundColor: "grey",
      textOverflow: "ellipsis",
      height: "30px",
      lineHeight: "30px",
      color: "white",
      textAlign: "left",
      paddingLeft: "10px"
    };

    const dropdownStyleHL = {
      backgroundColor: this.props.themeColor,
      color: "white",
      height: "30px",
      lineHeight: "30px",
      textAlign: "left",
      paddingLeft: "10px"
    };
    let personIcon = <Person />;

    if (this.state.focus) {
      personIcon = <Person color={this.props.themeColor} size={30} />;
    } else {
      personIcon = <PersonOutline color={this.props.themeColor} size={30} />;
    }

    let placeholder = "Loading...";
    if (!this.props.loading) {
      placeholder = "Search";
    }

    let searchIcon = <Spinner style={{}} />;
    let loading = true;
    if (!this.props.loading) {
      loading = false;
      searchIcon = (
        <SearchIcon
          onClick={() => this.searchFocus.focus()}
          size={30}
          color={this.props.themeColor}
          style={{}}
        />
      );
    }
    return (
      <ReactAutocomplete
        renderInput={props => {
          return (
            <div
              style={{
                marginTop: "0em",
                width: "100%",
                marginRight: "auto",
                marginLeft: "auto"
              }}
            >
              <label
                onClick={() => {
                  this.searchFocus.focus();
                }}
                style={{ marginTop: "0.3em" }}
              >
                {personIcon}
              </label>
              <input
                id="auto"
                className={classes.PlaceHolder}
                spellCheck="false"
                type="text"
                {...props}
              />

              {searchIcon}
            </div>
          );
        }}
        wrapperStyle={wrapperStyle}
        inputProps={{
          style: inputStyle,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          placeholder: placeholder
        }}
        renderMenu={(items, value, style) => {
          let newStyle = {
            position: "fixed",
            overflow: "auto",
            maxHeight: "50%",
            borderRadius: "5px",
            width: "30%",
            transform: "translate(" + this.props.dropdownWidth + ", 0)",
            transition: "opacity 0.6s ease-in",
            opacity: this.state.dropdownOpacity
          };
          return (
            <div style={Object.assign(style, newStyle)} children={items} />
          );
        }}
        items={this.props.players}
        ref={ip => (this.searchFocus = ip)}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        getItemValue={item => item.label}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            style={highlighted ? dropdownStyleHL : dropdownStyle}
            className={classes.Dropdown}
          >
            <span className={classes.DropItem}>{item.label}</span>
          </div>
        )}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => {
          this.props.searchPlayer(value);
          this.setState({ value: value});
          this.searchFocus.blur();
        }}
      />
    );
  }
}

export default searchBox;
