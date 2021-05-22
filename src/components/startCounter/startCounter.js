import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundImage: `url(${"/static/images/backgrounds/landscape_art_road_127350_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  counterBox: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    backgroundColor: `rgba(255, 255, 255, 0.5)`,
    width: "100%",
    textAlign: "center",
    padding: "50px",
  },
  counterText: {
    fontSize: 100,
  },
  answerBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3879e0",
    padding: "10px",
    height: "100%",
  },
}));

function StartCounter({ startCounter }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.counterBox}>
        <Box className={classes.counter}>
          <h1 className={classes.counterText}>
            {startCounter > 9
              ? "Start"
              : startCounter === 0
              ? "Go"
              : startCounter}
          </h1>
        </Box>
      </Box>
    </Box>
  );
}

StartCounter.propTypes = {};

export default StartCounter;
