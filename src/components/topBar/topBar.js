import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExploreIcon from "@material-ui/icons/Explore";
import GamesIcon from "@material-ui/icons/Games";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Link as RouterLink, useHistory } from "react-router-dom";
import { ImageLink, RoutePath } from "../../configs";
import UserSelectors from "../../redux/selectors/userSelectors";
import ProfileDialog from "../profileDialog/profileDialog";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  toolbar: {
    height: 64,
  },
  title: {
    flexGrow: 1,
  },
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const credentials = useSelector(UserSelectors.selectCredentials);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push(RoutePath.login);
  };

  const handleOpenProfile = () => {
    setIsOpenProfile(true);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/">
            <img alt="Logo" src={ImageLink.logo} />
          </RouterLink>
          <Typography variant="h6" className={classes.title}></Typography>
          <Box display="flex" gridGap={20}>
            <Button
              color="inherit"
              component={Link}
              to={RoutePath.player.join}
              startIcon={<GamesIcon />}
            >
              Join Host
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={RoutePath.explore}
              startIcon={<ExploreIcon />}
            >
              Explore
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={RoutePath.dashboard.library}
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              startIcon={<AccountCircle />}
            >
              {credentials.username}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleOpenProfile}>
                <Box display="flex" gridGap={20}>
                  <PermIdentityIcon />
                  Profile
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box display="flex" gridGap={20}>
                  <ExitToAppIcon />
                  Logout
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileDialog
        isOpenProfile={isOpenProfile}
        onCloseProfile={() => setIsOpenProfile(false)}
      />
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
