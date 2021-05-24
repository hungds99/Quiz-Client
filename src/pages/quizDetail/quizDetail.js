import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Transition from "../../components/transition/transition";
import { IconLink, RoutePath } from "../../configs";
import { CommonEnum, NotiTypeEnum } from "../../constants";
import AppHelper from "../../helpers";
import { QuizActions, UIActions } from "../../redux/actions";
import QuizSelectors from "../../redux/selectors/quizSelectors";
import UISelectors from "../../redux/selectors/uiSelectors";
import HostServices from "../../services/hostServices";
import QuizServices from "../../services/quizServices";

const useStyles = makeStyles(() => ({
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
  quizAction: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  detail: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  dialog: { position: "absolute", top: 50 },
}));

function QuizDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hitory = useHistory();
  const { id } = useParams();

  const loading = useSelector(UISelectors.selectLoading);
  const quiz = useSelector(QuizSelectors.selectQuiz);
  const questions = useSelector(QuizSelectors.selectQuestions);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(QuizActions.get(id));
  }, [dispatch, id]);

  const handleCreateHost = async () => {
    let { data } = await HostServices.create(quiz.id);
    if (data.code === 200) {
      hitory.push(RoutePath.host.lobby.replace(":id", data.result.id));
    }
  };

  const handleShowDelete = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    let { data } = await QuizServices.delete(id);
    if (data.code === 200) {
      setOpen(false);
      hitory.push(RoutePath.dashboard.library);
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.success,
          "Deleted question sucessfully"
        )
      );
    }
  };

  return !loading ? (
    <>
      <Card raised>
        <CardHeader
          title="Quiz Detail"
          action={
            <Tooltip title="Go back">
              <IconButton component={Link} to={RoutePath.dashboard.library}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <img
                    width="100%"
                    src={AppHelper.getImageLink(quiz.thumbnail)}
                    alt="Quiz media"
                  />
                </Box>
                <Box mt={1}>
                  <Box className={classes.detail}>
                    <img width="25" src={IconLink.tag} alt="quiz title" />
                    <Typography variant="h5">
                      {quiz.title ? quiz.title : "Title is default !"}
                    </Typography>
                  </Box>
                  <Box className={classes.detail}>
                    <img width="25" src={IconLink.tag} alt="quiz title" />
                    <Typography variant="h5">
                      {quiz.topic ? quiz.topic.name : CommonEnum.other}
                    </Typography>
                  </Box>
                  <Box className={classes.detail}>
                    <img width="25" src={IconLink.tag} alt="quiz title" />
                    <Typography variant="h5">
                      {dayjs(quiz.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                  <Box className={classes.detail}>
                    <img width="25" src={IconLink.tag} alt="quiz title" />
                    <Typography variant="h5">
                      {questions.length} Questions
                    </Typography>
                  </Box>
                  <Box className={classes.detail}>
                    <img
                      width="25"
                      src={quiz.isPublic ? IconLink.tag : IconLink.tag}
                      alt="quiz title"
                    />
                    <Typography variant="h5">
                      {quiz.isPublic ? CommonEnum.public : CommonEnum.private}
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.quizAction}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={RoutePath.quiz.edit.replace(":id", quiz.id)}
                    disableElevation
                  >
                    Edit Quiz
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    disableElevation
                    onClick={handleShowDelete}
                  >
                    Delete Quiz
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleCreateHost}
                    disableElevation
                  >
                    Create Host
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={8}>
                {questions &&
                  questions.map((question, index) => (
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
                              {answer.isCorrect ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: green[500] }}
                                />
                              ) : (
                                <CancelIcon color="secondary" />
                              )}
                              <Typography>{answer.answer}</Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleShowDelete}
        classes={{
          paper: classes.dialog,
        }}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <Typography>Do you want delete ?</Typography>
          <Button
            onClick={handleDelete}
            fullWidth
            color="secondary"
            autoFocus
            size="small"
          >
            Accept
          </Button>
        </DialogContent>
      </Dialog>
    </>
  ) : null;
}

QuizDetail.propTypes = {};

export default QuizDetail;
