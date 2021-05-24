import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { ImageLink } from "../../../configs";
import AppHelper from "../../../helpers";
import ScoreServices from "../../../services/scoreServices";

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
  root: {
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  question: {
    textAlign: "center",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: 300,
  },
  answerContainer: {},
  answerBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: 20,
    height: "100%",
    backgroundColor: "orange",
    cursor: "pointer",
  },
  isWrong: {
    backgroundColor: "#ed493e !important",
  },
  isCorrect: {
    backgroundColor: "#3eed5b !important",
  },
}));

function QuestionContainer({
  question,
  hostId,
  userInfo,
  totalScore,
  onChangeTotalScore,
  onNextQuestion,
  isFinish,
  onShowResult,
}) {
  const classes = useStyles();
  const [questionTimeCounter, setQuestionTimeCounter] = useState();
  const counterInterval = useRef();
  const [choiceAnswer, setChoiceAnswer] = useState();
  const [isDisableAnswer, setIsDisableAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loadding, setLoading] = useState(true);

  useEffect(() => {
    let timer = question.time;
    counterInterval.current = setInterval(() => {
      setQuestionTimeCounter(timer);
      if (timer === 0) {
        setIsDisableAnswer(true);
        clearInterval(counterInterval.current);
      }
      timer--;
    }, 1000);

    return () => {
      // Clear state
      setChoiceAnswer();
      setIsDisableAnswer(false);
      setShowAnswer(false);
      setQuestionTimeCounter();
      setLoading(true);
      clearInterval(counterInterval.current);
    };
  }, [question]);

  useEffect(() => {
    if (questionTimeCounter) {
      setLoading(false);
    }
    if (questionTimeCounter === 0) {
      setShowAnswer(true);
    }
  }, [questionTimeCounter]);

  const handleSubmitAnwser = (answerId) => {
    if (!choiceAnswer && !isDisableAnswer) {
      setChoiceAnswer((prev) => ({
        ...prev,
        answerId: answerId,
        time: questionTimeCounter,
      }));

      createPlayerScore(answerId);
      setQuestionTimeCounter(0);
      clearInterval(counterInterval.current);
    }
  };

  const createPlayerScore = async (answerId) => {
    let time = 0;
    // Kiểm tra đáp án có đúng hay không ?
    question.answers.forEach((answer) => {
      if (answerId.toString() === answer._id.toString()) {
        answer.isCorrect && (time = questionTimeCounter);
      }
    });
    let scoreParams = {
      hostId: hostId,
      questionId: question.id,
      answerId: answerId,
      time: time,
    };
    let { data } = await ScoreServices.create(scoreParams);
    if (data.code === 200) {
      onChangeTotalScore(data.result.score);
    }
  };

  return (
    <>
      {!loadding ? (
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Box className={classes.userInfo}>
                <Avatar
                  className={classes.avatar}
                  src={AppHelper.getImageLink(userInfo.avatar)}
                />
                <Typography>{userInfo.username}</Typography>
                <Box className={classes.score}>
                  <MonetizationOnIcon
                    fontSize="large"
                    style={{ color: yellow[500] }}
                  />
                  <Typography variant="h2">{totalScore}</Typography>
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
                  <Typography variant="h2">
                    {questionTimeCounter && questionTimeCounter}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            {questionTimeCounter === 0 && !isFinish ? (
              <Box className={classes.nextBtn}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => onNextQuestion()}
                >
                  Next Question
                </Button>
              </Box>
            ) : null}
            {questionTimeCounter === 0 && isFinish ? (
              <Box className={classes.nextBtn}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => onShowResult()}
                >
                  Show your Result
                </Button>
              </Box>
            ) : null}
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.root}>
              <Box className={classes.container}>
                <Box className={classes.question}>
                  <Typography variant="h4">{question.question}</Typography>
                </Box>
                <Box className={classes.image}>
                  <img
                    width={350}
                    src={AppHelper.getImageLink(question.image)}
                    alt=""
                  />
                </Box>
                <Box className={classes.answerContainer}>
                  <Grid container spacing={2}>
                    {question.answers.map((answer, index) => (
                      <Grid
                        key={index}
                        item
                        xs={6}
                        onClick={() => handleSubmitAnwser(answer._id)}
                      >
                        <Box
                          className={clsx(classes.answerBox, {
                            [classes.isCorrect]: showAnswer && answer.isCorrect,
                            [classes.isWrong]: showAnswer && !answer.isCorrect,
                          })}
                        >
                          <IconButton disabled={isDisableAnswer}>
                            {choiceAnswer &&
                            choiceAnswer.answerId === answer._id ? (
                              <RadioButtonCheckedIcon />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                          <Typography>{answer.answer}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}

QuestionContainer.propTypes = {};

export default QuestionContainer;
