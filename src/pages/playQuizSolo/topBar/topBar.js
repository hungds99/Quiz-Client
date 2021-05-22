import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";

const useStyles = makeStyles((theme) => ({
  home: { marginRight: theme.spacing(2) },
  title: {
    flexGrow: 1,
  },
}));

function TopBar({ title }) {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          //   component={Link}
          //   to={RoutePath.home}
          className={classes.home}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Tooltip title="Full Screen">
          <IconButton>
            <FullscreenIcon color="action" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
