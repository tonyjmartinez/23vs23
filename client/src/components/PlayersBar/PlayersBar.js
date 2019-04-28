import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Colors from "../../styles/colors";
import PlayerChips from "../PlayerChips/PlayerChips";

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#bdbdbd",
    opacity: 0.5
  },
  toolbar: {
    minHeight: 20
  }
});
const playersBar = props => {
  const classes = useStyles();
  //todo: add clearPlayer
  return (
    <div>
      <AppBar position="fixed" color="primary" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <PlayerChips
            playerAName={props.playerAName}
            playerBName={props.playerBName}
            clearPlayer={player => props.clearPlayer(player)}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default playersBar;
