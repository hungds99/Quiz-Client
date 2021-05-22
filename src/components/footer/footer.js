import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ImageLink } from "../../configs/imageLink";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    backgroundColor: "",
    padding: 20,
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box mb={1}>
        <img width={300} src={ImageLink.logoFull} alt="Dong a logo" />
      </Box>
      <Typography>
        Đồ án tốt nghệp - CNTT - Đại học Đông Á - Năm 2021
      </Typography>
    </Box>
  );
}

Footer.propTypes = {};

export default Footer;
