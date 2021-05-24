import {
  Box,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { IconLink } from "../../../../configs";
import AppHelper from "../../../../helpers";
import HostSelectors from "../../../../redux/selectors/hostSelectors";
import { emitPlayerAnswerQuestion } from "../../../../sockets/hostSockets";
import TopBar from "../topBar/topBar";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 5,
  },
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
  timeBox: {
    color: "#e3524b",
    display: "flex",
    alignItems: "center",
  },
  scoreBox: {
    color: "#db0ba4",
    display: "flex",
    alignItems: "center",
  },
  answerBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3879e0",
    padding: "10px",
    height: "100%",
  },
  image: {
    marginTop: 25,
    marginBottom: 25,
  },
}));

function QuestionArea() {
  const classes = useStyles();
  const { hostId } = useParams();

  const questionResult = useSelector(HostSelectors.selectGameData);
  const questionCounter = useSelector(HostSelectors.selectQuestionCounter);

  const question = useSelector(HostSelectors.selectQuestion);

  const [choiceAnswer, setChoiceAnswer] = useState({
    time: 0,
    isDisable: false,
  });

  useEffect(() => {
    if (questionCounter === 0 && !choiceAnswer.isDisable) {
      setChoiceAnswer({
        isDisable: true,
      });
    }
  }, [hostId, question, questionCounter, choiceAnswer]);

  useEffect(() => {
    if (question && choiceAnswer.isDisable && questionCounter >= 10) {
      setChoiceAnswer({
        answerId: null,
        isDisable: false,
      });
    }
  }, [question, choiceAnswer, questionCounter]);

  const handleSubmitAnwser = (answerId) => {
    let playerAnswer = {
      questionId: question.id,
      answerId: answerId,
      time: questionCounter,
      isDisable: true,
    };
    emitPlayerAnswerQuestion({ hostId, playerAnswer });
    setChoiceAnswer({ answerId: answerId, isDisable: true });
  };
  return (
    <Box>
      <TopBar />
      <Toolbar />
      <Container>
        <Box className={classes.header}>
          <Box className={classes.timeBox}>
            <AccessAlarmIcon />
            <Typography>
              Time Remain:{" "}
              <Box component="span" fontSize={30}>
                {questionCounter}
              </Box>
            </Typography>
          </Box>
          <Box className={classes.scoreBox}>
            <EmojiObjectsIcon />
            <Typography>
              Your Score:{" "}
              <Box component="span" fontSize={30}>
                {questionResult && questionResult.totalScore
                  ? questionResult.totalScore
                  : 0}
              </Box>
            </Typography>
          </Box>
        </Box>
        {question && (
          <Box className={classes.container}>
            <Container>
              <Box className={classes.root}>
                <Box>
                  <Typography variant="h3">{question.question}</Typography>
                </Box>
                <Box className={classes.image}>
                  {question.image ? (
                    <img
                      width="400"
                      src={AppHelper.getImageLink(question.image)}
                      alt="Media question"
                    />
                  ) : (
                    <img width="250" src={IconLink.quiz} alt="Media question" />
                  )}
                </Box>
                <Grid container spacing={2}>
                  {question.answers &&
                    question.answers.map((answer, index) => (
                      <Grid key={index} item xs={6}>
                        <Box className={classes.answerBox}>
                          {choiceAnswer.answerId !== answer._id ? (
                            <IconButton
                              aria-label="unchecked"
                              onClick={() => handleSubmitAnwser(answer._id)}
                              disabled={choiceAnswer.isDisable}
                            >
                              <RadioButtonUncheckedIcon />
                            </IconButton>
                          ) : (
                            <IconButton aria-label="checked">
                              <RadioButtonCheckedIcon />
                            </IconButton>
                          )}

                          <p>{answer.answer}</p>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Container>
          </Box>
        )}
      </Container>
    </Box>
  );
}

QuestionArea.propTypes = {};

export default QuestionArea;
