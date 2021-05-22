import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import React, { useEffect } from "react";

const useStyles = makeStyles(() => ({
  paper: {
    marginBottom: 10,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    rowGap: 5,
  },
  score: {
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
    gap: 5,
  },
  timeInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timeTitle: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  time: {
    paddingTop: 20,
  },
  nextBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
}));

function LeftBar({ time, onQuestionTimeCounter }) {
  const classes = useStyles();

  useEffect(() => {
    let counterInterval;
    if (time > -1) {
      let counter = time;
      counterInterval = setInterval(() => {
        onQuestionTimeCounter(counter);
        if (counter === 0) {
          clearInterval(counterInterval);
        }
        counter--;
      }, 1000);
    }
    return () => {
      clearInterval(counterInterval);
    };
  }, [time, onQuestionTimeCounter]);

  return (
    <>
      <Paper className={classes.paper}>
        <Box className={classes.userInfo}>
          <Avatar>H</Avatar>
          <Typography>HungDinh99</Typography>
          <Box className={classes.score}>
            <MonetizationOnIcon
              fontSize="large"
              style={{ color: yellow[500] }}
            />
            <Typography variant="h2">10000</Typography>
          </Box>
        </Box>
      </Paper>
      <Paper>
        <Box className={classes.timeInfo}>
          <Box className={classes.timeTitle}>
            <AccessAlarmsIcon />
            <Typography variant="h5">Time Remain</Typography>
          </Box>
          <Box className={classes.time}>
            <Typography variant="h2">{time}</Typography>
          </Box>
        </Box>
      </Paper>
      <Box className={classes.nextBtn}>
        <Button size="small" variant="contained" fullWidth color="primary">
          Next Question
        </Button>
      </Box>
    </>
  );
}

LeftBar.propTypes = {};

export default LeftBar;
