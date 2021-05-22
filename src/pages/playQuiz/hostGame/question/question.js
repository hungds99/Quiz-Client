import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Answer from "../answer/answer";

const useStyles = makeStyles(() => ({
  isActive: {
    backgroundColor: "#e2eca9",
  },
}));

function Question({ index, question, isActive }) {
  const classes = useStyles();
  return (
    <Box className={isActive && classes.isActive} paddingLeft={2}>
      <Grid container>
        <Grid item xs={12}>
          <Box paddingTop={1} marginBottom={1}>
            {index + 1}. {question.question}
          </Box>
          {question.image && (
            <Box display="flex" justifyContent="center" marginBottom={1}>
              <img
                width="200"
                height="auto"
                src={`http://localhost:4002/${question.image}`}
                alt="Media question"
              />
            </Box>
          )}
        </Grid>
        {question.answers.map((answer, id) => (
          <Grid key={id} item xs={6}>
            <Answer answer={answer} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

Question.propTypes = {};

export default Question;
