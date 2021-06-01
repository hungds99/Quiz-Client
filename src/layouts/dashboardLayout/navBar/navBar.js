import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  BookOpen as BookOpenIcon,
  Codepen as CodepenIcon,
  Menu as MenuIcon,
  PlusCircle as PlusCircleIcon,
  Wind as WindIcon,
} from "react-feather";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RoutePath } from "../../../configs";
import AppHelper from "../../../helpers";
import UserSelectors from "../../../redux/selectors/userSelectors";
import QuizServices from "../../../services/quizServices";
import NavItem from "../navItem/navItem";

const user = {
  avatar: "/static/images/avatars/avatar_1.png",
  jobTitle: "Member",
  name: "Dinh Sy Hung",
};

const items = [
  {
    href: RoutePath.dashboard.library,
    icon: BookOpenIcon,
    title: "My library",
  },
  {
    href: RoutePath.dashboard.host,
    icon: CodepenIcon,
    title: "Host Owner",
  },
  {
    href: RoutePath.dashboard.joinHistory,
    icon: WindIcon,
    title: "Join History",
  },
  {
    href: RoutePath.dashboard.topic,
    icon: MenuIcon,
    title: "Topic Manager",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const credentials = useSelector(UserSelectors.selectCredentials);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleCreateQuiz = async () => {
    let { data } = await QuizServices.createQuicklyQuiz();
    if (data.code === 200) {
      history.push(RoutePath.quiz.edit.replace(":id", data.result.id));
    }
  };

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="row" p={2}>
        <Avatar
          className={classes.avatar}
          src={AppHelper.getImageLink(credentials.avatar)}
        />
        <Box ml={1}>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {credentials.username}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.jobTitle}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={handleCreateQuiz}
          startIcon={<PlusCircleIcon />}
        >
          Create Quiz
        </Button>
      </Box>
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} m={2} bgcolor="background.dark">
        <Box display="flex" justifyContent="center">
          <Button color="primary" component="a" variant="contained">
            Help ?
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
