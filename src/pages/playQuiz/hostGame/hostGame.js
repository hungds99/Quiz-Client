import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import LinkHref from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TimerIcon from "@material-ui/icons/Timer";
import ViewListIcon from "@material-ui/icons/ViewList";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import RankedList from "../../../components/rankedList/rankedList";
import StartCounter from "../../../components/startCounter/startCounter";
import { IconLink, RoutePath } from "../../../configs";
import { RESET_HOST } from "../../../constants/types";
import HostSelectors from "../../../redux/selectors/hostSelectors";
import {
  emitHostNextQuestion,
  emitShowPlayersRanked,
} from "../../../sockets/hostSockets";
import { emitHostJoinGame } from "../../../sockets/quizSockets";
import "./hostGame.css";
import Question from "./question/question";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  container: {
    height: "100%",
    backgroundColor: "#3e403f",
  },
  answerBox: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: "10px",
    paddingBottom: "10px",
    gap: 5,
  },
  questionContainer: {
    marginTop: "10px",
    width: "100%",
    height: "75vh",
    overflow: "auto",
    backgroundColor: "#ffffff",
  },
  questionCounter: {
    fontSize: 20,
    color: "#4205f7",
  },
  dialog: { position: "absolute", top: 40 },
  dialogTitle: {
    textAlign: "center",
  },
}));

function HostGame() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const startCounter = useSelector(HostSelectors.selectStartCounter);
  const questionCounter = useSelector(HostSelectors.selectQuestionCounter);

  const question = useSelector(HostSelectors.selectQuestion);
  const questions = useSelector(HostSelectors.selectQuestions);

  const playersTotalScore = useSelector(HostSelectors.selectPlayersTotalScore);

  const quiz = useSelector(HostSelectors.selectQuiz);

  const players = useSelector(HostSelectors.selectPlayers);

  useEffect(() => {
    if (id) {
      emitHostJoinGame(id);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_HOST });
    };
  }, [dispatch]);

  const handleNextQuestion = () => {
    emitHostNextQuestion(id);
  };

  const handleShowRanked = () => {
    emitShowPlayersRanked(id);
    setOpen(true);
  };

  const handleTopRankDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {startCounter > -1 ? (
        <StartCounter startCounter={startCounter} />
      ) : (
        !_.isEmpty(question) &&
        startCounter && (
          <Box className={classes.container}>
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  component={Link}
                  to={RoutePath.dashboard.library}
                >
                  <HomeIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {quiz.title}
                </Typography>
                <Button color="inherit" startIcon={<PeopleIcon />}>
                  {players.length} Players
                </Button>
              </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
              <Box paddingTop={2}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box>
                      <Box className={classes.headerTitle}>
                        <StarBorderIcon />
                        <p>Top Rank</p>
                      </Box>
                      <Box marginTop={2}>
                        <RankedList playerRanked={playersTotalScore} />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Box className={classes.headerTitle}>
                        <ViewListIcon />
                        <p>Question List</p>
                      </Box>
                      <Box className={classes.questionContainer} id="style-1">
                        {questions.length > 0 &&
                          questions.map((qtn, index) => (
                            <Question
                              key={index}
                              question={qtn}
                              index={index}
                              isActive={qtn.id === question.id}
                            />
                          ))}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box className={classes.headerTitle}>
                      <TimerIcon />
                      <p>
                        Time :{" "}
                        <span className={classes.questionCounter}>
                          {questionCounter}
                        </span>
                      </p>
                    </Box>
                    {questionCounter === 0 && (
                      <Box marginTop={2} display="flex" justifyContent="center">
                        {question && question.isLastQuestion ? (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleShowRanked}
                          >
                            Show Player Ranked
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleNextQuestion}
                          >
                            Next Question
                          </Button>
                        )}
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        )
      )}
      <Dialog
        open={open}
        onClose={handleTopRankDialog}
        fullWidth={true}
        maxWidth={"sm"}
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography>
          <Box>
            <img width={50} src={IconLink.cup} alt="winner ranked" />
          </Box>
          <Typography variant="h4">Top Ranked Players</Typography>
        </DialogTitle>
        <DialogContent>
          <RankedList playerRanked={playersTotalScore} />
          <Box mt={5} mb={2} textAlign="center">
            <Typography component={LinkHref} href={RoutePath.home}>
              Finish Game
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

HostGame.propTypes = {};

export default HostGame;
