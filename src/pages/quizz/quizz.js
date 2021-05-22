import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  List,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { TypeActions } from "../../constants";
import { QuizActions } from "../../redux/actions/quizActions";
import QuizSelectors from "../../redux/selectors/quizSelectors";
import UISelectors from "../../redux/selectors/uiSelectors";
import EditQuizDialog from "./editQuizDialog/editQuizDialog";
import Question from "./question/question";
import QuestionArea from "./questionArea/questionArea";
import TopBar from "./topBar/topBar";
import _ from "lodash";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  card: {
    padding: 1,
    margin: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function Quizz() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(QuizActions.get(id));
  }, [dispatch, id]);

  const quiz = useSelector(QuizSelectors.selectQuiz);
  const questions = useSelector(QuizSelectors.selectQuestions);
  const question = useSelector(QuizSelectors.selectQuestion);

  const handleCreateNewQuestion = () => {
    dispatch({ type: TypeActions.SET_QUESTION, payload: {} });
  };

  return (
    quiz && (
      <Box>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                {questions.length > 0
                  ? questions.map((qsn, index) => (
                      <Question
                        key={index}
                        question={qsn}
                        isActive={qsn.id === question.id}
                      />
                    ))
                  : null}
              </List>
            </div>
            <Box padding={2} display="flex" justifyContent="center">
              {!_.isEmpty(question) && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleCreateNewQuestion}
                >
                  Add Question
                </Button>
              )}
            </Box>
          </Drawer>
          <QuestionArea />
        </div>
        <EditQuizDialog />
      </Box>
    )
  );
}
