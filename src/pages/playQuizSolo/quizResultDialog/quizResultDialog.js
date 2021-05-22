import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PeopleIcon from "@material-ui/icons/People";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import TodayIcon from "@material-ui/icons/Today";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Transition from "../../../components/transition/transition";
import { ImageLink, RoutePath } from "../../../configs";

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
  action: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
  dialogActions: {
    justifyContent: "space-between",
    padding: "5px 24px",
  },
}));

function QuizResultDialog({ isOpen, quiz, playerAnswer, onClose, totalScore }) {
  const classes = useStyles();
  const hitory = useHistory();

  useEffect(() => {
    console.log("Player Answer 1: ", playerAnswer);
  }, [playerAnswer]);

  const handleCloseQuiz = () => {
    onClose && onClose();
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
        <DialogTitle disableTypography>
          <Box display="flex" gridGap={10}>
            <img
              width="200"
              src={
                quiz.thumbnail
                  ? `http://localhost:4002/${quiz.thumbnail}`
                  : ImageLink.defaultImage
              }
              alt="thumb"
            />
            <Box>
              <Typography gutterBottom variant="h5" component="h2">
                {quiz.title ? quiz.title : "Bạn chưa đặt tên !"}
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
                        <Typography variant="caption">{value.data}</Typography>
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
                              src={`http://localhost:4002/${question.image}`}
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
                              <CheckCircleOutlineIcon />
                            ) : (
                              <RadioButtonUncheckedIcon />
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
        <DialogActions className={classes.dialogActions}>
          <Typography>Total Score: {totalScore}</Typography>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={RoutePath.home}
          >
            Go back home
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

QuizResultDialog.propTypes = {};

export default QuizResultDialog;
