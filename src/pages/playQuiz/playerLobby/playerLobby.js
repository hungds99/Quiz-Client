import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RoutePath } from "../../../configs";
import { HostActions } from "../../../redux/actions";
import HostSelectors from "../../../redux/selectors/hostSelectors";
import HostServices from "../../../services/hostServices";
import { emitPlayerJoinRoom } from "../../../sockets/hostSockets";
import { configSocket } from "../../../sockets/rootSocket";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${"/static/images/backgrounds/branch_birds_owls_scarf_94136_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  counterContainer: {
    height: "100%",
    backgroundImage: `url(${"/static/images/backgrounds/landscape_art_road_127350_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  counterBox: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    backgroundColor: `rgba(255, 255, 255, 0.5)`,
    width: "100%",
    textAlign: "center",
    padding: "50px",
  },
  counterText: {
    fontSize: 100,
  },
}));

function PlayerLobby() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { hostId } = useParams();

  const host = useSelector(HostSelectors.selectHost);
  const startCounter = useSelector(HostSelectors.selectStartCounter);

  useEffect(() => {
    dispatch(HostActions.get(hostId));
  }, [dispatch, hostId]);

  useEffect(() => {
    if (host.id) {
      configSocket();
      emitPlayerJoinRoom(host);
    }
  }, [host]);

  useEffect(() => {
    if (startCounter !== -1) {
      history.push(RoutePath.player.started.replace(":hostId", hostId));
    }
  }, [startCounter, history, hostId]);

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        paddingTop={15}
      >
        <h2>Waiting Join....</h2>
        <Box paddingTop={5}>
          <CircularProgress />
        </Box>
      </Box>
    </Box>
  );
}

PlayerLobby.propTypes = {};

export default PlayerLobby;
