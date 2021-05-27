import { Backdrop, Box, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UISelectors from "../../redux/selectors/uiSelectors";
import TopBar from "../../components/topBar/topBar";
import NavBar from "./navBar/navBar";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    padding: 20,
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const open = useSelector(UISelectors.selectLoading);

  return (
    <Box>
      <div className={classes.root}>
        <TopBar />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Footer/> */}
    </Box>
  );
};

export default DashboardLayout;
