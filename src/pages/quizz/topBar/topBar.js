import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Transition from "../../../components/transition/transition";
import { ImageLink, RoutePath } from "../../../configs";
import { CommonEnum, NotiTypeEnum, TypeActions } from "../../../constants";
import { QuizActions, UIActions } from "../../../redux/actions";
import QuizSelectors from "../../../redux/selectors/quizSelectors";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  dialog: { position: "absolute", top: 50 },
  accept: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
}));

function TopBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [openPublic, setOpenPublic] = useState(false);

  const quiz = useSelector(QuizSelectors.selectQuiz);
  const questions = useSelector(QuizSelectors.selectQuestions);

  const handleOpenQuizDialog = () => {
    dispatch({ type: TypeActions.SET_OPEN_QUIZ_DIALOG });
  };

  const handlePublic = async () => {
    let quizParams = {
      id: quiz.id,
      isPublic: !quiz.isPublic,
    };
    await dispatch(QuizActions.update(quizParams));
    handleClosePublic();
    history.push(RoutePath.quiz.detail.replace(":id", quiz.id));
  };

  const handleExit = () => {
    history.push(RoutePath.quiz.detail.replace(":id", quiz.id));
  };

  const handleOpenPublic = () => {
    console.log("Question : ", questions);
    if (questions.length > 1) {
      setOpenPublic(true);
    } else {
      dispatch(
        UIActions.showNotification(
          NotiTypeEnum.warning,
          "Quiz must have at least 2 questions"
        )
      );
    }
  };

  const handleClosePublic = () => {
    setOpenPublic(false);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box mr={5}>
            <RouterLink to="/">
              <img alt="Logo" src={ImageLink.logo} />
            </RouterLink>
          </Box>
          <Typography variant="h5" noWrap>
            {quiz.title ? quiz.title : "Title is default !"}
          </Typography>
          <Box ml={1}>
            <IconButton onClick={handleOpenQuizDialog}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box display="flex" marginLeft="auto" gridGap={10}>
            <Button
              variant="contained"
              startIcon={quiz.isPublic ? <LockIcon /> : <PublicIcon />}
              disableElevation
              size="small"
              onClick={handleOpenPublic}
            >
              {quiz.isPublic ? CommonEnum.private : CommonEnum.public}
            </Button>
            <Button
              variant="contained"
              startIcon={<ExitToAppIcon />}
              color="secondary"
              disableElevation
              size="small"
              onClick={handleExit}
            >
              Exit
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openPublic}
        onClose={handleClosePublic}
        classes={{
          paper: classes.dialog,
        }}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <Typography>
            Do you want {quiz.isPublic ? CommonEnum.private : CommonEnum.public}{" "}
            quiz ?
          </Typography>
          <Box className={classes.accept}>
            <Button
              onClick={handlePublic}
              color="primary"
              fullWidth
              
              size="small"
            >
              Accept
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

TopBar.propTypes = {};

export default TopBar;
