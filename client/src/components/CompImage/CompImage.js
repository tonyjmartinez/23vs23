import React from "react";

import classes from "./CompImage.css";
import comp_image from "../../assets/comp_image.jpg";

const compImage = props => (
  <div className={classes.CompImage}>
    <p className={classes.CompText}>Picture of a computer</p>
    <img src={comp_image} className={classes.CompImg} />
  </div>
);

export default compImage;
