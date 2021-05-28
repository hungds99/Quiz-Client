import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IconLink } from "../../../../configs";
import AppHelper from "../../../../helpers";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundImage: `url(${"/static/images/backgrounds/mountains_art_clouds_127766_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  box: {
    backgroundColor: "#DEFEFF",
    padding: 20,
    marginTop: 100,
    borderRadius: 20,
    width: 700,
  },
  question: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  questionInfo: {
    marginBottom: 10,
  },
  scoreBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function PlayerResult({ result }) {
  const classes = useStyles();
  let { question, correctAnswer, playerChoiseAnswer, score, totalScore } =
    result;
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.box}>
            {[
              {
                icon: IconLink.question,
                text: "Question",
                data: question.question,
                image: question.image,
              },
              {
                icon: IconLink.answer,
                text: "Correct Answer",
                data: correctAnswer.answer,
              },
              {
                icon: IconLink.qa,
                text: "Your Answer",
                data:
                  playerChoiseAnswer && playerChoiseAnswer.answer
                    ? playerChoiseAnswer.answer
                    : "You have no answer",
              },
            ].map((value, index) => (
              <Grid key={index} container className={classes.questionInfo}>
                <Grid item xs={3} className={classes.question}>
                  <img width={20} src={value.icon} alt="question" />
                  <Typography>{value.text}:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">{value.data}</Typography>
                  {value.image && (
                    <Box mt={1}>
                      <img
                        width={200}
                        src={AppHelper.getImageLink(value.image)}
                        alt="question"
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            ))}
            <Box className={classes.scoreBox}>
              <Box m={2}>
                <Typography>
                  {playerChoiseAnswer && playerChoiseAnswer.isCorrect ? (
                    <img width="100" src={IconLink.right} alt="Right" />
                  ) : (
                    <img width="100" src={IconLink.wrong} alt="Wrong" />
                  )}
                </Typography>
                <Typography variant="h1">+ {score}</Typography>
              </Box>
              <Typography>Your Total Score: {totalScore}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

PlayerResult.propTypes = {};

export default PlayerResult;
