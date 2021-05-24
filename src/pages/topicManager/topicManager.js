import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomLoadingOverlay from "../../components/common/customLoadingOverlay/customLoadingOverlay";
import { RoutePath } from "../../configs";
import { NotiTypeEnum } from "../../constants";
import { UIActions } from "../../redux/actions/uiActions";
import UserSelectors from "../../redux/selectors/userSelectors";
import TopicServices from "../../services/topicServices";

function TopicManager() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [topicName, setTopicName] = useState("");
  const [topicData, setTopicData] = useState([]);
  const [topicId, setTopicId] = useState();

  const credentials = useSelector(UserSelectors.selectCredentials);

  const columns = [
    { field: "name", headerName: "Topic", flex: 1 },
    {
      field: "creator",
      headerName: "Creator",
      width: 160,
      valueFormatter: ({ value }) => {
        return value.username;
      },
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
      width: 150,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {row.creator.id === credentials.id ? (
              <IconButton
                aria-label="delete"
                onClick={() => handleOpen(row.id)}
                disabled
              >
                {/* <DeleteIcon /> */}
              </IconButton>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleChangeTopicName = (e) => {
    setTopicName(e.target.value);
  };

  async function fetchTopic() {
    let { data } = await TopicServices.getAll();
    if (data.code === 200) {
      setTopicData(data.result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopic();
  }, []);

  const handleCreateTopic = async () => {
    if (topicName.trim() !== "") {
      let { data } = await TopicServices.create({ name: topicName });
      if (data.code === 200) {
        setTopicName("");
        fetchTopic();
        dispatch(
          UIActions.showNotification(
            NotiTypeEnum.success,
            "Created topic successfully"
          )
        );
      }
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setTopicId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await TopicServices.delete(topicId);
    fetchTopic();
    handleClose();
    dispatch(
      UIActions.showNotification(
        NotiTypeEnum.success,
        "Deleted topic successfully"
      )
    );
  };

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
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Topic name"
                    placeholder="Enter name here..."
                    InputLabelProps={{ shrink: true }}
                    value={topicName}
                    onChange={handleChangeTopicName}
                  />
                  <Box mt={1} display="flex" justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      disableElevation
                      onClick={handleCreateTopic}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <DataGrid
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  loading={loading}
                  component={{
                    LoadingOverlay: CustomLoadingOverlay,
                  }}
                  autoHeight
                  rows={topicData}
                  columns={columns}
                  disableSelectionOnClick
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gridRowGap={20}
          >
            <Typography>Bạn có muốn xóa không ?</Typography>
            <Button
              onClick={handleDelete}
              size="small"
              variant="contained"
              disableElevation
            >
              Đồng ý
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

TopicManager.propTypes = {};

export default TopicManager;
