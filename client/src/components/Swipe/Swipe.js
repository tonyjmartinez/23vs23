import React, { useEffect, useState, useRef } from "react";
import ReactSwipe from "react-swipe";
import Button from "@material-ui/core/Button";
import Colors from "../../styles/colors";

const buttonDivStyle = {
  marginRight: "15px",
  marginLeft: "15px",
  display: "inline-block"
};
const swipe = props => {
  const setActive = () => {
    reactSwipeEl.current.next();
  };

  const reactSwipeEl = useRef(null);

  const swipeOptions = {
    continuous: true
  };

  return (
    <div>
      <ReactSwipe
        className="carousel"
        ref={reactSwipeEl}
        swipeOptions={swipeOptions}
      >
        {props.children}
      </ReactSwipe>
      <div style={buttonDivStyle}>
        <Button
          color="primary"
          style={{ color: Colors.red }}
          variant="outlined"
          onClick={() => setActive()}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default swipe;
