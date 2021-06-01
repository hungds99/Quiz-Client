import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import CustomLoadingOverlay from "../../components/common/customLoadingOverlay/customLoadingOverlay";
import { RoutePath } from "../../configs";
import HostServices from "../../services/hostServices";
import MultiPlayersResult from "./multiPlayersResult/multiPlayersResult";
import SinglePlayerResult from "./singlePlayerResult/singlePlayerResult";

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
  const [openSingle, setOpenSingle] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);
  const [host, setHost] = useState();
  const [loading, setLoading] = useState(true);

  const columns = [
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
            onClick={() => handleShowHostResult(row, row.isSolo)}
          >
            Show Result
          </Button>
        );
      },
    },
  ];

  const handleShowHostResult = async (host, isSolo) => {
    if (isSolo) {
      setHost(host);
      setOpenSingle(true);
    } else {
      setHost(host);
      setOpenMulti(true);
    }
  };

  async function fetchHost() {
    let { data } = await HostServices.getOwner();
    if (data.code === 200) {
      setHostData(data.result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHost();
  }, []);

  return (
    <>
      <Card raised>
        <CardHeader
          title="Host Owner"
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
              loading={loading}
              component={{
                LoadingOverlay: CustomLoadingOverlay,
              }}
              rows={hostData}
              columns={columns}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
      {openSingle && host && (
        <SinglePlayerResult
          isOpen={openSingle}
          host={host}
          onClose={() => setOpenSingle(false)}
        />
      )}
      {openMulti && host && (
        <MultiPlayersResult
          isOpen={openMulti}
          host={host}
          onClose={() => setOpenMulti(false)}
        />
      )}
    </>
  );
}

HostManager.propTypes = {};

export default HostManager;
