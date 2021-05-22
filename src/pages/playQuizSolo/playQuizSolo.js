import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import StartCounter from "../../components/startCounter/startCounter";
import HostServices from "../../services/hostServices";
import QuizServices from "../../services/quizServices";
import ScoreServices from "../../services/scoreServices";
import QuestionContainer from "./questionContainer/questionContainer";
import QuizResultDialog from "./quizResultDialog/quizResultDialog";
import TopBar from "./topBar/topBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 30,
    paddingTop: 10,
  },
  dialog: {
    position: "absolute",
    top: 50,
  },
}));

function PlayQuizSolo() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const { hostId } = useParams();
  const [hostData, setHostData] = useState();
  const [quiz, setQuiz] = useState();
  const [startCounter, setStartCounter] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [playerAnswer, setPlayerAnswer] = useState();

  const fetchHost = async (id) => {
    let { data } = await HostServices.get(id);
    let { code, result } = data;
    if (code === 200) {
      setHostData(result);
      setCurrentQuestion(result.currentQuestion);
      setOpen(false);
    }
  };

  const fetchTotalScore = async (hostId, playerId) => {
    let { data } = await ScoreServices.getPlayerTotalScore({
      hostId,
      playerId,
    });
    if (data.code === 200 && data.result) {
      setTotalScore(data.result.totalScore);
    }
  };

  const fetchQuiz = async (id) => {
    let { data } = await QuizServices.get(id);
    setQuiz(data);
  };

  useEffect(() => {
    fetchHost(hostId);
  }, [hostId]);

  useEffect(() => {
    if (hostData && startCounter === 0) {
      fetchQuiz(hostData.quiz);
      fetchTotalScore(hostData.id, hostData.creator.id);
    }
  }, [hostData, startCounter]);

  useEffect(() => {
    let counterInterval;
    // && hostData.currentQuestion === 0
    if (hostData) {
      let counter = 2;
      counterInterval = setInterval(() => {
        setStartCounter(counter);
        if (counter === -1) {
          clearInterval(counterInterval);
        }
        counter--;
      }, 1000);
    }
    return () => {
      clearInterval(counterInterval);
    };
  }, [hostData]);

  const handleChangeTotalScore = (score) => {
    let newTotalScore = totalScore + score;
    setTotalScore(newTotalScore);
  };

  const handleNextQuestion = async () => {
    let newCurrentQuestion = currentQuestion + 1;
    if (newCurrentQuestion < quiz.questions.length) {
      setCurrentQuestion(newCurrentQuestion);
      await HostServices.updateCurrentQuestion(hostData.id, newCurrentQuestion);
    }
  };

  const handleShowResult = async () => {
    let { data } = await ScoreServices.getPlayerAnswerResult({
      hostId: hostData.id,
      playerId: hostData.creator.id,
    });
    if (data.code === 200) {
      setPlayerAnswer(data.result);
      setShowResult(true);
    }
  };

  return (
    <>
      {open ? (
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : startCounter > -1 ? (
        <StartCounter startCounter={startCounter} />
      ) : (
        quiz && (
          <Box className={classes.root}>
            <TopBar title={quiz.title} />
            <Toolbar />
            <Container className={classes.container}>
              <QuestionContainer
                question={quiz.questions[currentQuestion]}
                userInfo={hostData.creator}
                hostId={hostData.id}
                totalScore={totalScore}
                onChangeTotalScore={handleChangeTotalScore}
                onNextQuestion={handleNextQuestion}
                onShowResult={handleShowResult}
                isFinish={quiz.questions.length - 1 === currentQuestion}
              />
            </Container>
          </Box>
        )
      )}
      {quiz && playerAnswer && (
        <QuizResultDialog
          isOpen={showResult}
          quiz={quiz}
          playerAnswer={playerAnswer}
          totalScore={totalScore}
        />
      )}
    </>
  );
}

PlayQuizSolo.propTypes = {};

export default PlayQuizSolo;
