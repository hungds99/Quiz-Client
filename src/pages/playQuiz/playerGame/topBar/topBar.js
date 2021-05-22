import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../configs";

function TopBar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          component={Link}
          to={RoutePath.home}
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
