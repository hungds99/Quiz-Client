import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Globe as GlobeIcon,
  HelpCircle as HelpCircleIcon,
} from "react-feather";
import { useHistory } from "react-router";
import { RoutePath } from "../../configs";
import { CommonEnum } from "../../constants";
import AppHelper from "../../helpers";
import HostServices from "../../services/hostServices";
import QuizServices from "../../services/quizServices";
import Transition from "../transition/transition";

const useStyles = makeStyles(() => ({
  media: {
    height: 140,
  },
  dialog: { position: "absolute", top: 10 },
  creator: { display: "flex", alignItems: "center", gap: 5 },
  paper: {
    padding: 10,
    marginBottom: 10,
  },
  answerBox: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
}));

function QuizDialog({ isOpen, quizId, onClose }) {
  const classes = useStyles();
  const hitory = useHistory();

  const [quiz, setQuiz] = useState();
  const [loading, setLoading] = useState(true);

  const handleCloseQuiz = () => {
    onClose();
  };

  const fetchQuiz = async (id) => {
    let { data } = await QuizServices.get(id);
    if (data) {
      setQuiz(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz(quizId);
  }, [quizId]);

  const handleCreateHost = async () => {
    let { data } = await HostServices.create(quiz.id);
    if (data.code === 200) {
      hitory.push(RoutePath.host.lobby.replace(":id", data.result.id));
    }
  };

  const handleCreateSinglePlay = async () => {
    let { data } = await HostServices.createSinglePlay(quiz.id);
    if (data.code === 200) {
      hitory.push(RoutePath.player.solo.replace(":hostId", data.result.id));
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        onClose={handleCloseQuiz}
        classes={{
          paper: classes.dialog,
        }}
      >
        {!loading ? (
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
                          icon: <CalendarIcon />,
                          data: dayjs(quiz.createdAt).format("DD/MM/YYYY"),
                        },
                        {
                          icon: <HelpCircleIcon />,
                          data: `${quiz.questions.length} Questions`,
                        },
                        {
                          icon: <GlobeIcon />,
                          data: quiz.isPublic
                            ? CommonEnum.public
                            : CommonEnum.private,
                        },
                        {
                          icon: <BookmarkIcon />,
                          data: quiz.topic ? quiz.topic.name : CommonEnum.other,
                        },
                      ].map((value, index) => (
                        <Grid key={index} item xs={6}>
                          <Box display="flex" alignItems="center" gridGap={5}>
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
              <Box className={classes.action}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleCreateSinglePlay}
                  disableElevation
                >
                  Start Quiz
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleCreateHost}
                  disableElevation
                >
                  Create a host
                </Button>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box>
                {quiz.questions && quiz.questions.length > 0
                  ? quiz.questions.map((question, index) => (
                      <Paper className={classes.paper} key={index}>
                        <Grid container>
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
                          <Grid item container>
                            {question.answers.map((answer, id) => (
                              <Grid
                                key={id}
                                item
                                xs={6}
                                className={classes.answerBox}
                              >
                                {/* {answer.isCorrect ? (
                                  <CheckCircleOutlineIcon />
                                ) : (
                                  <RadioButtonUncheckedIcon />
                                )} */}
                                <RadioButtonUncheckedIcon />
                                <Typography>{answer.answer}</Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  : null}
              </Box>
            </DialogContent>
          </>
        ) : (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

QuizDialog.propTypes = {};

export default QuizDialog;
