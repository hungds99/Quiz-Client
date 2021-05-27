import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as yup from "yup";
import Transition from "../../../components/transition/transition";
import { NotiTypeEnum } from "../../../constants";
import AppHelper from "../../../helpers";
import { QuestionActions, UIActions } from "../../../redux/actions";
import QuizSelectors from "../../../redux/selectors/quizSelectors";
import ImageServices from "../../../services/imageServices";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  media: {
    width: "350px",
    height: "235px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  preview: {
    width: "350px",
    height: "235px",
    position: "absolute",
  },
  dialog: { position: "absolute", top: 50 },
}));

const questionSchema = yup.object().shape({
  question: yup.string().required("Question is a required field"),
  answers: yup.array().of(
    yup.object().shape({
      answer: yup.string().required("Answer is a required field"),
    })
  ),
});

function QuestionArea() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const fileRef = useRef();

  const question = useSelector(QuizSelectors.selectQuestion);

  const { id } = useParams();

  const [questionData, setQuestionData] = useState();
  const [correctIndex, setCorrectIndex] = useState(0);

  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(questionSchema) });

  const onSubmit = async () => {
    handleSubmitQuestion();
  };

  useEffect(() => {
    if (_.isEmpty(question)) {
      let defaultQuestion = {
        question: "",
        answers: [
          {
            answer: "",
            isCorrect: false,
          },
          {
            answer: "",
            isCorrect: false,
          },
          {
            answer: "",
            isCorrect: false,
          },
          {
            answer: "",
            isCorrect: false,
          },
        ],
        time: 10,
      };
      setQuestionData(defaultQuestion);
      setValue("question", defaultQuestion.question);
      setValue("answers", defaultQuestion.answers);
    } else {
      setQuestionData(question);
      let correctAnswerIndex = question.answers.findIndex(
        (ans) => ans.isCorrect
      );
      setCorrectIndex(correctAnswerIndex);
      setValue("question", question.question, { shouldValidate: true });
      setValue("answers", question.answers, { shouldValidate: true });
    }
  }, [question, setValue]);

  const handleChangeQuestion = (e) => {
    setQuestionData((prev) => ({
      ...prev,
      question: e.target.value,
    }));
    setValue("question", e.target.value, { shouldValidate: true });
  };

  const handleChangeTime = (e) => {
    setQuestionData((prev) => ({
      ...prev,
      time: e.target.value,
    }));
  };

  const handleChangeCorrectAnswer = (e) => {
    setCorrectIndex(parseInt(e.target.value));
  };

  const handleChangeAnswer = (index, e) => {
    let answerUpdate = questionData.answers[index];
    answerUpdate.answer = e.target.value;

    let newAnswerUpdated = [
      ...questionData.answers.slice(0, index),
      answerUpdate,
      ...questionData.answers.slice(index + 1, questionData.answers.length),
    ];

    setQuestionData((prev) => ({
      ...prev,
      answers: newAnswerUpdated,
    }));
    setValue("answers", newAnswerUpdated, { shouldValidate: true });
  };

  const handleSubmitQuestion = () => {
    if (questionData) {
      // Set Correct Answer
      let answersUpdated = questionData.answers.map((value, index) => {
        if (index === correctIndex) {
          return {
            ...value,
            isCorrect: true,
          };
        }
        return {
          ...value,
          isCorrect: false,
        };
      });

      let questionParams = {
        ...questionData,
        quiz: id,
        answers: [...answersUpdated],
      };

      if (questionParams.id) {
        dispatch(QuestionActions.update(questionParams.id, questionParams));
      } else {
        dispatch(QuestionActions.create(questionParams));
      }
    }
  };

  const handleShowDelete = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    await dispatch(QuestionActions.delete(question.id));
    setOpen(!open);
  };

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    let imageUrl;
    if (file) {
      let formData = new FormData();
      formData.append("image", file);
      let { data } = await ImageServices.upload(formData);
      imageUrl = data.imageUrl;
    }
    setQuestionData((prev) => ({
      ...prev,
      image: imageUrl || question.image,
    }));
    dispatch(
      UIActions.showNotification(NotiTypeEnum.info, "Added question image")
    );
  };

  return questionData ? (
    <>
      <main className={classes.content}>
        <Toolbar />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  label="Question"
                  placeholder="Enter your question..."
                  value={questionData.question}
                  name="question"
                  onChange={handleChangeQuestion}
                  error={errors && errors.question ? true : false}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Time"
                  label="Time(s)"
                  value={questionData.time}
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 60,
                      min: 10,
                    },
                  }}
                  onChange={handleChangeTime}
                  name="time"
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" padding={2}>
            <Box className={classes.media}>
              <img
                className={classes.preview}
                src={AppHelper.getImageLink(questionData.image)}
                alt="Upload media"
              />
              <Box position="absolute" right={-40}>
                <IconButton
                  color="primary"
                  onClick={() => fileRef.current.click()}
                >
                  <PhotoCameraIcon />
                </IconButton>
                <input
                  type="file"
                  name="image"
                  ref={fileRef}
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  onChange={handleChangeImage}
                />
              </Box>
            </Box>
          </Box>

          <RadioGroup
            aria-label="time"
            name="correctAnswer"
            value={correctIndex}
            onChange={handleChangeCorrectAnswer}
          >
            <Grid container spacing={2}>
              {questionData.answers.map((answer, index) => (
                <Grid key={index} item xs={6}>
                  <Box display="flex">
                    <FormControlLabel
                      value={index}
                      control={<Radio color="primary" />}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter your answer..."
                      value={answer.answer}
                      onChange={(e) => handleChangeAnswer(index, e)}
                      error={
                        errors &&
                        errors.answers &&
                        errors.answers[index] &&
                        errors.answers[index]
                          ? true
                          : false
                      }
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <Box
            display="flex"
            justifyContent="center"
            gridGap={10}
            marginTop={4}
          >
            {questionData.id ? (
              <>
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                  >
                    Update Question
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={handleShowDelete}
                  >
                    Delete Question
                  </Button>
                </Box>
              </>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  Add Question
                </Button>
              </Box>
            )}
          </Box>
        </form>
      </main>
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

QuestionArea.propTypes = {};

export default QuestionArea;
