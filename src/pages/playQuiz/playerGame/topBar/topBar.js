import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { useSelector } from "react-redux";
import { RoutePath } from "../../../../configs";
import HostSelectors from "../../../../redux/selectors/hostSelectors";
import UserSelectors from "../../../../redux/selectors/userSelectors";
import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles(() => ({
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
}));

function TopBar() {
  const classes = useStyles();
  const credentials = useSelector(UserSelectors.selectCredentials);
  const players = useSelector(HostSelectors.selectPlayers);

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          component={"a"}
          href={RoutePath.home}
        >
          <HomeIcon />
        </IconButton>
        <Box flexGrow={1}></Box>
        <Box className={classes.userInfo}>
          <Button color="inherit" startIcon={<PeopleIcon />}>
            {players.length} Players on board
          </Button>
          <Button color="inherit" startIcon={<AccountCircle />}>
            {credentials.username}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
