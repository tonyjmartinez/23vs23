import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/styles";
import Colors from "../../styles/colors";
import PlayerIcon from "react-icons/lib/md/person-outline";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    margin: "0px auto"
  },
  chip: {
    margin: "5px auto"
  },
  divs: {
    width: "40%",
    display: "inline-block"
  },
  versus: {
    width: "10%",
    display: "inline-block",
    margin: "0px auto",
    marginTop: "10px",
    color: Colors.red,
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  playerA: {
    margin: "5px auto",
    backgroundColor: Colors.blue
  },
  avatarA: {
    backgroundColor: "#00acc1"
  },
  avatarB: {
    backgroundColor: "#ff6f00"
  },
  iconA: {
    color: Colors.blue
  },

  playerB: {
    margin: "5px auto",
    backgroundColor: Colors.orange
  }
});
const playerChips = props => {
  const classes = useStyles();
  let aName;
  let bName;
  if (props.playerAName !== undefined) {
    if (props.playerAName.length > 14) {
      aName = props.playerAName.slice(0, 14) + "...";
    } else {
      aName = props.playerAName;
    }
  }

  if (props.playerBName !== undefined) {
    if (props.playerBName.length > 14) {
      bName = props.playerBName.slice(0, 14) + "...";
    } else {
      bName = props.playerBName;
    }
  }
  let versus = null;
  if (props.playerAName !== undefined && props.playerBName !== undefined) {
    versus = <div className={classes.versus}>VS</div>;
  }

  const playerA = (
    <div className={classes.divs}>
      <Chip
        avatar={
          <Avatar className={classes.avatarA}>
            <PlayerIcon color={"white"} size={30} />
          </Avatar>
        }
        label={aName}
        onDelete={() => props.clearPlayer("A")}
        className={classes.playerA}
        color="primary"
      />
    </div>
  );

  const playerB = (
    <div className={classes.divs}>
      <Chip
        avatar={
          <Avatar className={classes.avatarB}>
            <PlayerIcon color={"white"} size={30} />
          </Avatar>
        }
        label={bName}
        onDelete={() => props.clearPlayer("B")}
        className={classes.playerB}
        color="primary"
      />
    </div>
  );

  return (
    <div className={classes.root}>
      {props.playerAName !== undefined ? playerA : null}
      {versus !== null ? versus : null}
      {props.playerBName !== undefined ? playerB : null}
    </div>
  );
};

export default playerChips;
