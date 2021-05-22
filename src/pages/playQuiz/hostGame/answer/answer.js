import { Box, makeStyles, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";

const useStyles = makeStyles(() => ({
  wrongAnswer: {
    backgroundColor: "#ff4747",
  },
  correctAnswer: {
    backgroundColor: "#47ff59",
  },
}));

function Answer({ answer }) {
  const classes = useStyles();
  return (
    <>
      <Box
        padding={2}
        className={
          answer.isCorrect ? classes.correctAnswer : classes.wrongAnswer
        }
        width="90%"
        marginBottom={2}
      >
        <Box display="flex" alignItems="center" gridGap={5}>
          {answer.isCorrect ? (
            <CheckCircleOutlineIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
          <Typography>{answer.answer}</Typography>
        </Box>
      </Box>
    </>
  );
}

Answer.propTypes = {};

export default Answer;
