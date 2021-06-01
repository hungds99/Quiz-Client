import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BookIcon from "@material-ui/icons/Book";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PeopleIcon from "@material-ui/icons/People";
import TodayIcon from "@material-ui/icons/Today";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppHelper from "../../../helpers";
import UserSelectors from "../../../redux/selectors/userSelectors";
import QuizServices from "../../../services/quizServices";
import ScoreServices from "../../../services/scoreServices";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 10,
    marginBottom: 10,
  },
  answerBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: "1px solid blue",
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
  yourChoosen: {
    position: "absolute",
    right: 0,
    transform: "rotate(15deg)",
    backgroundColor: "rgba(255, 255, 0, 0.6)",
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function HistoryResult({ host, isOpen, onClose }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const credentials = useSelector(UserSelectors.selectCredentials);

  const [playerAnswer, setPlayerAnswer] = useState();
  const [quiz, setQuiz] = useState();

  const fetchQuiz = async (id) => {
    let { data } = await QuizServices.get(id);
    if (data) {
      setQuiz(data);
    }
  };

  const fetchPlayerAnswer = async (hostIdParam, playerIdParam) => {
    let { data } = await ScoreServices.getPlayerAnswerResult({
      hostId: hostIdParam,
      playerId: playerIdParam,
    });
    if (data.code === 200) {
      setPlayerAnswer(data.result);
    }
  };

  useEffect(() => {
    if (host) {
      fetchPlayerAnswer(host._id, credentials.id);
      fetchQuiz(host.quiz);
    }
  }, [host, credentials]);

  useEffect(() => {
    if (quiz && playerAnswer) {
      setLoading(false);
    }
  }, [quiz, playerAnswer]);

  return (
    <>
      <Dialog open={isOpen} onClose={() => onClose()}>
        {loading ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : (
          <>
            <DialogTitle disableTypography>
              <Box display="flex" gridGap={10}>
                <img
                  width="200"
                  src={AppHelper.getImageLink(quiz.thumbnail)}
                  alt="thumb"
                />
                <Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {quiz.title ? quiz.title : "Title is default !"}
                  </Typography>
                  <Box mt={2} mb={2}>
                    <Grid container spacing={1}>
                      {[
                        {
                          icon: <TodayIcon />,
                          data: dayjs(quiz.createdAt).format("DD/MM/YYYY"),
                        },
                        {
                          icon: <HelpOutlineIcon />,
                          data: `${quiz.questions.length} Questions`,
                        },
                        {
                          icon: <PeopleIcon />,
                          data: quiz.isPublic ? "Public" : "Private",
                        },
                        {
                          icon: <BookIcon />,
                          data: quiz.topic ? quiz.topic.name : "Khác",
                        },
                      ].map((value, index) => (
                        <Grid key={index} item xs={6}>
                          <Box display="flex" alignItems="center" gridGap={2}>
                            {value.icon}
                            <Typography variant="caption">
                              {value.data}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box>
                {quiz.questions && quiz.questions.length > 0
                  ? quiz.questions.map((question, index) => (
                      <Paper className={classes.paper} key={index}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} className={classes.questionHeader}>
                            <Typography>
                              {index + 1}. {question.question}
                            </Typography>
                            <Typography>{question.time}s</Typography>
                          </Grid>
                          {question.image && (
                            <Grid item xs={12}>
                              <Box display="flex" justifyContent="center">
                                <img
                                  width="200"
                                  height="auto"
                                  src={AppHelper.getImageLink(question.image)}
                                  alt="Media"
                                />
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                        <Grid container spacing={3}>
                          {question.answers.map((answer, id) => (
                            <Grid key={id} item xs={6}>
                              <Box className={classes.answerBox}>
                                {answer.isCorrect ? (
                                  <CheckCircleOutlineIcon
                                    style={{ color: green[500] }}
                                  />
                                ) : (
                                  <CancelIcon color="secondary" />
                                )}
                                <Typography>{answer.answer}</Typography>
                                {playerAnswer.map(
                                  (pa, index) =>
                                    pa.playerAnswer === answer._id && (
                                      <Box
                                        key={index}
                                        className={classes.yourChoosen}
                                      >
                                        <Typography variant="caption">
                                          Your Answer + {pa.score}
                                        </Typography>
                                      </Box>
                                    )
                                )}
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    ))
                  : null}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

HistoryResult.propTypes = {};

export default HistoryResult;
