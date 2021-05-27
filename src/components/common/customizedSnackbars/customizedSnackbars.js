import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UISelectors from "../../../redux/selectors/uiSelectors";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const notification = useSelector(UISelectors.selectNotification);

  useEffect(() => {
    if (notification.type && notification.message) {
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
