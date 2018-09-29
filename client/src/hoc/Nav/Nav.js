import React, { Component } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import Search from "../../containers/Search/Search";
import AnimatedRadar from "../../components/StatDisplay/AnimatedRadar/AnimatedRadar";
class Nav extends Component {
  render() {
    return (
      <React.Fragment>
        <div>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Nav;
