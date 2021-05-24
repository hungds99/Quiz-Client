import { Box, makeStyles, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import React from "react";
function Answer({ answer }) {
  return (
    <>
      <Box padding={2} width="90%" marginBottom={2}>
        <Box display="flex" alignItems="center" gridGap={5}>
          {answer.isCorrect ? (
            <CheckCircleOutlineIcon style={{ color: green[500] }} />
          ) : (
            <CancelIcon color="secondary" />
          )}
          <Typography>{answer.answer}</Typography>
        </Box>
      </Box>
    </>
  );
}

Answer.propTypes = {};

export default Answer;
