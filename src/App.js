import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import {
  AuthRoute,
  DashboardAuthRoute,
  isAuthenticated,
  MainAuthRoute,
} from "./auth";
import CustomizedSnackbars from "./components/common/customizedSnackbars/customizedSnackbars";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { RoutePath } from "./configs";
import Dashboard from "./pages/dashboard";
import Explore from "./pages/explore/explore";
import Home from "./pages/home";
import HostManager from "./pages/hostManager/hostManager";
import JoinHistory from "./pages/joinHistory/joinHistory";
import NotFound from "./pages/notFound/notFound";
import HostGame from "./pages/playQuiz/hostGame/hostGame";
import HostLobby from "./pages/playQuiz/hostLobby/hostLobby";
import PlayerGame from "./pages/playQuiz/playerGame/playerGame";
import PlayerJoin from "./pages/playQuiz/playerJoin/playerJoin";
import PlayerLobby from "./pages/playQuiz/playerLobby/playerLobby";
import PlayQuizSolo from "./pages/playQuizSolo/playQuizSolo";
import QuizDetail from "./pages/quizDetail/quizDetail";
import Quizz from "./pages/quizz/quizz";
import TopicManager from "./pages/topicManager/topicManager";
import { UserActions } from "./redux/actions";
import UISelectors from "./redux/selectors/uiSelectors";
import { GlobalStyles, Theme } from "./theme";
import "./utils/i18n";

// Fix some code
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#ffffff",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector(UISelectors.selectLoading);

  useEffect(() => {
    let token = isAuthenticated();
    if (token) {
      const {
        user: { id },
      } = jwtDecode(token);
      dispatch(UserActions.getUserInfo(id));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Switch>
        {/* Home */}
        <MainAuthRoute path={RoutePath.home} component={Home} exact />

        {/* Explore */}
        <MainAuthRoute path={RoutePath.explore} component={Explore} />

        {/* Authentication */}
        <Route path={RoutePath.login} component={Login} />
        <Route path={RoutePath.register} component={Register} />

        {/* Dashboard */}
        <DashboardAuthRoute
          path={RoutePath.dashboard.library}
          component={Dashboard}
          exact
        />
        <DashboardAuthRoute
          path={RoutePath.quiz.detail}
          component={QuizDetail}
          exact
        />
        <DashboardAuthRoute
          path={RoutePath.dashboard.topic}
          component={TopicManager}
        />
        <DashboardAuthRoute
          path={RoutePath.dashboard.host}
          component={HostManager}
        />
        <DashboardAuthRoute
          path={RoutePath.dashboard.joinHistory}
          component={JoinHistory}
        />

        {/* Quiz */}
        <AuthRoute path={RoutePath.quiz.edit} component={Quizz} exact />

        {/* Host */}
        <AuthRoute path={RoutePath.host.lobby} component={HostLobby} exact />
        <AuthRoute path={RoutePath.host.started} component={HostGame} />

        {/* Player */}
        <AuthRoute path={RoutePath.player.join} component={PlayerJoin} />
        <AuthRoute
          path={RoutePath.player.lobby}
          component={PlayerLobby}
          exact
        />
        <AuthRoute path={RoutePath.player.started} component={PlayerGame} />

        {/* Player Solo */}
        <AuthRoute path={RoutePath.player.solo} component={PlayQuizSolo} />

        {/* Not Found */}
        <MainAuthRoute component={NotFound} />
      </Switch>

      {/* Loadding Page */}
      <Backdrop open={loading} className={classes.backdrop}>
        <Box className={classes.wrapper}>
          <CircularProgress color="primary" />
        </Box>
      </Backdrop>

      {/* Show notification */}
      <CustomizedSnackbars />
    </ThemeProvider>
  );
};

export default App;
