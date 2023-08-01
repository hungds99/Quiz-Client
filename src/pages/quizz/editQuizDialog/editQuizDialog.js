import {
  Box,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeActions } from "../../../constants";
import AppHelper from "../../../helpers";
import { QuizActions } from "../../../redux/actions/quizActions";
import QuizSelectors from "../../../redux/selectors/quizSelectors";
import UISelectors from "../../../redux/selectors/uiSelectors";
import TopicServices from "../../../services/topicServices";
const useStyles = makeStyles(() => ({
  thumbnail: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  dialogTitle: {
    display: "flex",
  },
}));

function EditQuizDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const fileRef = useRef();

  const [topics, setTopics] = useState([]);

  const open = useSelector(UISelectors.selectOpenQuizDialog);
  const quiz = useSelector(QuizSelectors.selectQuiz);

  const [quizInfo, setQuizInfo] = useState();

  const handleClose = () => {
    dispatch({ type: TypeActions.SET_CLOSE_QUIZ_DIALOG });
  };

  const handleChangeTitle = (e) => {
    setQuizInfo((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const fetchTopics = async () => {
    let { data } = await TopicServices.getAll();
    if (data.code === 200) {
      setTopics([...data.result]);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    setQuizInfo({
      id: quiz.id,
      title: quiz.title ? quiz.title : "Title is default !",
      topic: quiz.topic && quiz.topic,
    });
  }, [quiz]);

  const handleSubmitUpdate = async () => {
    await dispatch(
      QuizActions.update({
        ...quizInfo,
        topic: quizInfo.topic && quizInfo.topic.id,
      })
    );
    handleClose();
  };

  const handleChangeThumbnail = (e) => {
    if (e.target.files) {
      let formData = new FormData();
      formData.append("id", quiz.id);
      formData.append("thumbnail", e.target.files[0]);
      dispatch(QuizActions.upload(formData));
    }
  };

  const handleChangeTopic = (e, value) => {
    setQuizInfo((prev) => ({
      ...prev,
      topic: value,
    }));
  };

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Typography variant="h3">Edit Quiz</Typography>
      </DialogTitle>
      <DialogContent>
        <Box marginBottom={2}>
          <Typography>Thumbnail: </Typography>
          <Box width="250px" maxHeight="300px" padding={2}>
            <img
              className={classes.thumbnail}
              src={AppHelper.getImageLink(quiz.thumbnail)}
              alt="Thumbnail"
            />
            <Button
              startIcon={<PhotoCameraIcon />}
              color="primary"
              onClick={() => fileRef.current.click()}
              size="small"
            >
              Upload thumbnail
            </Button>
            <input
              ref={fileRef}
              type="file"
              name="thumbnail"
              accept="image/*"
              hidden
              onChange={handleChangeThumbnail}
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box marginBottom={2}>
              <Typography>Title: </Typography>
              <TextField
                value={quizInfo && quizInfo.title}
                onChange={handleChangeTitle}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Box marginBottom={2}>
              <Typography>Topic: </Typography>
              <Autocomplete
                options={topics}
                value={quizInfo && quizInfo.topic ? quizInfo.topic : ""}
                onChange={handleChangeTopic}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmitUpdate} >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditQuizDialog.propTypes = {};

export default EditQuizDialog;
