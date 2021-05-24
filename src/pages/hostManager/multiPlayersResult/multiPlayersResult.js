import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RankedList from "../../../components/rankedList/rankedList";
import ScoreServices from "../../../services/scoreServices";

function MultiPlayersResult({ host, isOpen, onClose }) {
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
      <Dialog open={isOpen} onClose={() => onClose()}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle disableTypography>Players Result</DialogTitle>
            <DialogContent>
              <RankedList playerRanked={playersResult} />
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}

MultiPlayersResult.propTypes = {};

export default MultiPlayersResult;
