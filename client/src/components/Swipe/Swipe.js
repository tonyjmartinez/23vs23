import React from "react";
import ReactSwipe from "react-swipe";
import Button from "@material-ui/core/Button";
import Colors from "../../styles/colors";

const style = {
  color: Colors.red,
  margin: "10px auto"
};
const swipe = props => {
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
      <Button
        style={style}
        color="primary"
        variant="outlined"
        onClick={() => reactSwipeEl.prev()}
      >
        Counting
      </Button>
      <Button
        style={style}
        color="primary"
        variant="outlined"
        onClick={() => reactSwipeEl.next()}
      >
        More
      </Button>
    </div>
  );
};

export default swipe;
