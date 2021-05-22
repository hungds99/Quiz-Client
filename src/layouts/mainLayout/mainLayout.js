import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import Footer from "../../components/footer/footer";
import TopBar from "../../components/topBar/topBar";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <TopBar />
        <Box className={classes.wrapper}>
          <Box className={classes.contentContainer}>
            <Container>{children}</Container>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
