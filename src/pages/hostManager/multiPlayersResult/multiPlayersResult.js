import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RankedList from "../../../components/rankedList/rankedList";
import Transition from "../../../components/transition/transition";
import { ImageLink } from "../../../configs";
import ScoreServices from "../../../services/scoreServices";

const useStyles = makeStyles(() => ({
  dialog: { position: "absolute", top: 40 },
  noData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function MultiPlayersResult({ host, isOpen, onClose }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [playersResult, setPlayersResult] = useState();

  const fetchPlayersResult = async (hostId) => {
    let { data } = await ScoreServices.getPlayersHostResult(hostId);
    if (data.code === 200) {
      setPlayersResult(data.result);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayersResult(host.id);
  }, [host]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => onClose()}
        fullWidth={true}
        TransitionComponent={Transition}
        maxWidth={"sm"}
        classes={{
          paper: classes.dialog,
        }}
      >
        {loading ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : (
          <>
            <DialogTitle disableTypography>Players Result History</DialogTitle>
            <DialogContent>
              {playersResult.length > 0 ? (
                <RankedList playerRanked={playersResult} />
              ) : (
                <Box className={classes.noData}>
                  <img
                    width={100}
                    src={ImageLink.folderEmpty}
                    alt="Have no data"
                  />
                  <Typography>Have no data</Typography>
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

MultiPlayersResult.propTypes = {};

export default MultiPlayersResult;
