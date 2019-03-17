import React, { useEffect, useState, useRef } from "react";
import ReactSwipe from "react-swipe";
import Button from "@material-ui/core/Button";
import Colors from "../../styles/colors";

const buttonDivStyle = {
  marginBottom: "15px",
  display: "inline-block"
};
const swipe = props => {
  const setActive = () => {
    if (reactSwipeEl.current.getPos() === 1) {
      reactSwipeEl.current.prev();
    } else {
      reactSwipeEl.current.next();
    }
  };

  const reactSwipeEl = useRef(null);

  const swipeOptions = {
    continuous: false
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
          style={{ color: Colors.red, border: "2px solid white" }}
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
