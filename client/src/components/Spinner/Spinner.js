import React from "react";
import { css } from "react-emotion";
import { BounceLoader } from "react-spinners";
import colors from "../../styles/colors";
const spinStyle = {
  display: "inline-block",
  marginLeft: "5%",
  verticalAlign: "middle"
};

const spinner = () => (
  <div style={spinStyle}>
    <BounceLoader sizeUnit={"px"} size={20} color={colors.orange} />
  </div>
);

export default spinner;
