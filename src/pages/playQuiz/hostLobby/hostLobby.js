import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RoutePath } from "../../../configs";
import AppHelper from "../../../helpers";
import { HostActions } from "../../../redux/actions";
import HostSelectors from "../../../redux/selectors/hostSelectors";
import { emitHostCreateRoom } from "../../../sockets/hostSockets";
import { configSocket } from "../../../sockets/rootSocket";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${"/static/images/backgrounds/flight_balloon_sky_86980_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: 10,
  },
  pinBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  pin: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  playerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  playerLobby: {
    width: "100%",
    backgroundColor: "#CBC0CE",
    textAlign: "center",
    borderRadius: 20,
    paddingTop: 20,
  },
  playerList: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    padding: 20,
    marginTop: 30,
    height: "400px",
    borderRadius: 20,
    justifyContent: "center",
    overflow: "auto",
  },
}));

const HostLobby = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();

  const host = useSelector(HostSelectors.selectHost);
  const players = useSelector(HostSelectors.selectPlayers);

  useEffect(() => {
    dispatch(HostActions.get(id));
  }, [dispatch, id]);

  useEffect(() => {
    configSocket();
    emitHostCreateRoom({ id: id });
  }, [id]);

  const handleStartGame = () => {
    history.push(RoutePath.host.started.replace(":id", host.id));
  };

  return (
    <Box className={classes.root}>
      {host ? (
        <Box paddingTop={10} overflow="hidden">
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Box className={classes.pinBox}>
                <Box bgcolor="#CF4D4D" padding={5} borderRadius={20}>
                  <p>Access Game With PIN</p>
                  <Box className={classes.pin}>
                    <h2>{host.pin}</h2>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.playerContainer}>
                <Box className={classes.playerLobby}>
                  <h3>Player Joinning</h3>
                  <Box className={classes.playerList}>
                    {players.map((player, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={2}
                        gridGap={10}
                        key={index}
                      >
                        <Avatar src={AppHelper.getImageLink(player.avatar)}>
                          H
                        </Avatar>
                        <Typography>{player.username}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box marginTop={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartGame}
                    startIcon={<PlayArrowIcon />}
                  >
                    Start Game
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

HostLobby.propTypes = {};

export default HostLobby;
