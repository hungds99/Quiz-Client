import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RankedList from "../../components/rankedList/rankedList";
import { IconLink, RoutePath } from "../../configs";
import HostServices from "../../services/hostServices";
import ScoreServices from "../../services/scoreServices";

const useStyles = makeStyles(() => ({
  hostType: {
    borderRadius: 10,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  self: {
    backgroundColor: "#01c4ff",
  },
  multi: {
    backgroundColor: "#f2ff82",
  },
  dialogTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function HostManager() {
  const classes = useStyles();
  const [hostData, setHostData] = useState([]);
  const [open, setOpen] = useState(false);
  const [hostResult, setHostResult] = useState();

  const handleShowHostResult = async (hostId, isSolo) => {
    if (isSolo) {
    } else {
      let { data } = await ScoreServices.getPlayersHostResult(hostId);
      if (data.code === 200) {
        setHostResult(data.result);
        setOpen(true);
      }
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "STT",
      width: 120,
      sortable: false,
      renderCell: ({ rowIndex }) => rowIndex + 1,
    },
    {
      field: "isSolo",
      headerName: "Host Type",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <>
            {row.isSolo ? (
              <Box>
                <Typography
                  className={clsx(classes.hostType, classes.self)}
                  variant="h6"
                >
                  Self Play
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography
                  className={clsx(classes.hostType, classes.multi)}
                  variant="h6"
                >
                  Multiple Play
                </Typography>
              </Box>
            )}
          </>
        );
      },
    },
    {
      field: "quiz",
      headerName: "Quiz",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return row.quiz && row.quiz.title;
      },
    },
    {
      field: "pin",
      headerName: "Pin",
      width: 120,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 180,
      valueFormatter: ({ value }) => {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      field: "updatedAt",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleShowHostResult(row.id, row.isSolo)}
          >
            Show Result
          </Button>
        );
      },
    },
  ];

  async function fetchHost() {
    let { data } = await HostServices.getOwner();
    if (data.code === 200) {
      setHostData(data.result);
    }
  }

  useEffect(() => {
    fetchHost();
  }, []);

  return (
    <>
      <Card raised>
        <CardHeader
          title="Topic Manager"
          action={
            <Tooltip title="Go back">
              <IconButton component={Link} to={RoutePath.dashboard.library}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <CardContent>
          <Box>
            <DataGrid
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              rows={hostData}
              columns={columns}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth={"sm"}
        classes={{
          paper: classes.dialog,
        }}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography>
          <Box>
            <img width={50} src={IconLink.cup} alt="winner ranked" />
          </Box>
          <Typography variant="h4">Top Ranked Players</Typography>
        </DialogTitle>
        <DialogContent>
          <RankedList playerRanked={hostResult} />
        </DialogContent>
      </Dialog>
    </>
  );
}

HostManager.propTypes = {};

export default HostManager;
