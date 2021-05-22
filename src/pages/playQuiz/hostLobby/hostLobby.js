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
    if (host.id) {
      configSocket();
      emitHostCreateRoom(host);
    }
  }, [host]);

  const handleStartGame = () => {
    history.push(RoutePath.host.started.replace(":id", host.id));
  };

  return (
    <Box className={classes.root}>
      {host ? (
        <Box paddingTop={10} overflow="hidden">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box bgcolor="#CF4D4D" padding={5} borderRadius={20}>
                  <p>Access Game With PIN</p>
                  <Box
                    bgcolor="#ffffff"
                    textAlign="center"
                    padding={2}
                    marginTop={2}
                    borderRadius={15}
                  >
                    <h2>{host.pin}</h2>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  width="100%"
                  bgcolor="#CBC0CE"
                  textAlign="center"
                  borderRadius={20}
                  paddingTop={2}
                >
                  <h3>Player Joinning</h3>
                  <Box
                    bgcolor="#ffffff"
                    textAlign="center"
                    padding={2}
                    marginTop={3}
                    height="400px"
                    borderRadius={20}
                    justifyContent="center"
                    overflow="auto"
                  >
                    {players.map((player, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={2}
                        gridGap={10}
                        key={index}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatars/avatar_2.png"
                        />
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
