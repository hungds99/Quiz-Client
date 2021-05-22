import { Box, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeActions } from "../../../constants";
import AppHelper from "../../../helpers";
import QuizSelectors from "../../../redux/selectors/quizSelectors";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 1,
    margin: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
  active: {
    backgroundColor: "#65ec92",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  time: { paddingLeft: 15 },
  answer: { display: "flex", alignItems: "center", marginBottom: 2, gap: 5 },
  image: { display: "flex", justifyContent: "center" },
}));

function Question({ question, isActive }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const questions = useSelector(QuizSelectors.selectQuestions);

  const handleEditQuestion = (questionId) => {
    let questionFinded = questions.find((q) => q.id === questionId);
    dispatch({ type: TypeActions.SET_QUESTION, payload: questionFinded });
  };

  return (
    question && (
      <Card
        className={`${classes.card} ${isActive && classes.active}`}
        onClick={() => handleEditQuestion(question.id)}
      >
        <CardContent>
          <Box className={classes.header}>
            <Typography variant="h6">Q: {question.question}</Typography>
            <Box className={classes.time}>{question.time}s</Box>
          </Box>
          {question.image && (
            <Box className={classes.image}>
              <img
                width="100"
                src={AppHelper.getImageLink(question.image)}
                alt="question media"
              />
            </Box>
          )}

          <Box ml={2} pr={2}>
            {question.answers.map((ans, id) => (
              <Box key={id} className={classes.answer}>
                {ans.isCorrect ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <Typography variant="h6">{ans.answer}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    )
  );
}

Question.propTypes = {};

export default Question;
