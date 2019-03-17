import React, { useState } from "react";
import ReactSwipe from "react-swipe";
import Button from "@material-ui/core/Button";
import Colors from "../../styles/colors";

const buttonDivStyle = {
  marginRight: "15px",
  marginLeft: "15px",
  display: "inline-block"
};
const swipe = props => {
  const [countStatsActive, setCountStatsActive] = useState(true);

  const setActive = counting => {
    if (counting) {
      setCountStatsActive(true);
      reactSwipeEl.prev();
    } else {
      setCountStatsActive(false);
      reactSwipeEl.next();
    }
  };

  let cntStatsColor;
  let moreColor;

  if (countStatsActive) {
    cntStatsColor = Colors.red;
    moreColor = Colors.blue;
  } else {
    cntStatsColor = Colors.blue;
    moreColor = Colors.red;
  }

  let reactSwipeEl;

  return (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >
        {props.children}
      </ReactSwipe>
      <div style={buttonDivStyle}>
        <Button
          color="primary"
          style={{ color: cntStatsColor }}
          variant="outlined"
          onClick={() => setActive(true)}
        >
          Counting
        </Button>
      </div>

      <div style={buttonDivStyle}>
        <Button
          color="primary"
          style={{ color: moreColor }}
          variant="outlined"
          onClick={() => setActive(false)}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default swipe;
