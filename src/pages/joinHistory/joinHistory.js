import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomLoadingOverlay from "../../components/common/customLoadingOverlay/customLoadingOverlay";
import { RoutePath } from "../../configs";
import ScoreServices from "../../services/scoreServices";
import HistoryResult from "./historyResult/historyResult";

function JoinHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [host, setHost] = useState();

  const columns = [
    {
      field: "quiz",
      headerName: "Quiz",
      flex: 1,
      valueFormatter: ({ value }) => {
        return value.title;
      },
    },
    {
      field: "host",
      headerName: "Pin",
      width: 130,
      valueFormatter: ({ value }) => {
        return value.pin ? value.pin : "";
      },
    },
    {
      field: "",
      headerName: "Join Date",
      width: 160,
      valueFormatter: ({ row }) => {
        return dayjs(row.host.createdAt).format("DD/MM/YYYY");
      },
    },
    {
      field: "totalScore",
      headerName: "Total Score",
      width: 180,
      type: "number",
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
            onClick={() => handleShowResult(row.host)}
          >
            Show Result
          </Button>
        );
      },
    },
  ];

  async function fetchHistory() {
    let { data } = await ScoreServices.getHistory();
    if (data.code === 200) {
      setHistoryData(data.result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleShowResult = (hostParams) => {
    setHost(hostParams);
    setOpen(true);
  };

  return (
    <>
      <Card raised>
        <CardHeader
          title="Join History"
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
              rows={historyData}
              columns={columns}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
      {open && host && (
        <HistoryResult
          isOpen={open}
          host={host}
          onClose={() => {
            setOpen(false);
            setHost();
          }}
        />
      )}
    </>
  );
}

JoinHistory.propTypes = {};

export default JoinHistory;
