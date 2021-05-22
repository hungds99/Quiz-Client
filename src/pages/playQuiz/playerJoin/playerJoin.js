import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { RoutePath } from "../../../configs";
import HostServices from "../../../services/hostServices";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${"/static/images/backgrounds/child_river_dreams_127495_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const PlayerJoin = () => {
  const classes = useStyles();
  const history = useHistory();
  const [pin, setPin] = useState();

  const handleChangePin = (e) => {
    e.preventDefault();
    setPin(e.target.value);
  };

  const handleJoinGame = async () => {
    const { data } = await HostServices.getByPin(pin);
    if (data && data.result && data.result.pin) {
      history.push(RoutePath.player.lobby.replace(":hostId", data.result.id));
    }
  };
  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingTop={15}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="#ffffff"
          padding={5}
          borderRadius={20}
        >
          <h2>Enter pin to join game</h2>
          <Box padding={2}>
            <TextField
              variant="outlined"
              type="number"
              onChange={handleChangePin}
              defaultValue={pin}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinGame}
              disableElevation
              startIcon={<GraphicEqIcon />}
            >
              Join
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerJoin;
