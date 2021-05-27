import {
  Box,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import QuizCardInfo from "../../components/quizCardInfo/quizCardInfo";
import QuizDialog from "../../components/quizDialog/quizDialog";
import { ImageLink } from "../../configs";
import { SET_LOADING_PAGE, SET_NO_LOADING_PAGE } from "../../constants/types";
import QuizServices from "../../services/quizServices";
import TopicServices from "../../services/topicServices";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
  },
  paper: {
    padding: 20,
  },
  filter: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterSelect: {
    display: "flex",
    gap: 20,
  },
  empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },
}));

function Explore() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [quizes, setQuizes] = useState();
  const [quizId, setQuizId] = useState();
  const [quizTotal, setQuizTotal] = useState(0);

  const [quizParams, setQuizParams] = useState({
    page: 1,
    keyword: "",
    topic: "all",
    sortField: "createdAt",
    sortType: "desc",
  });
  const [topics, setTopics] = useState([]);

  const getQuizes = async (params) => {
    let { data } = await QuizServices.getPagination(params);
    if (data.code === 200) {
      setQuizes(data.result.data);
      setQuizTotal(data.result.total);
      dispatch({ type: SET_NO_LOADING_PAGE });
    }
  };
  const fetchTopics = async () => {
    dispatch({ type: SET_LOADING_PAGE });
    let { data } = await TopicServices.getAll();
    if (data.code === 200) {
      setTopics([...data.result]);
    }
  };

  useEffect(() => {
    getQuizes();
    fetchTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let params = {
      ...quizParams,
      pageNumber: quizParams.page - 1,
      topic: quizParams.topic === "all" ? "" : quizParams.topic,
    };
    getQuizes(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizParams]);

  const handleChangeKeyword = (e) => {
    setQuizParams((prev) => ({
      ...prev,
      page: 1,
      keyword: e.target.value,
    }));
  };

  const handleChangeTopic = (e) => {
    setQuizParams((prev) => ({
      ...prev,
      page: 1,
      topic: e.target.value,
    }));
  };

  const handleChangeSortType = (e) => {
    setQuizParams((prev) => ({
      ...prev,
      page: 1,
      sortType: e.target.value,
    }));
  };

  const handleChangePage = (e, value) => {
    setQuizParams((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleShowQuiz = (quizId) => {
    setQuizId(quizId);
    setOpen(true);
  };

  const handleCloseQuiz = () => {
    setOpen(false);
  };

  return quizes ? (
    <>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Box className={classes.filter}>
            <TextField
              label="Search quiz"
              variant="outlined"
              size="small"
              placeholder="Enter name..."
              onChange={handleChangeKeyword}
            />
            <Box className={classes.filterSelect}>
              <Box>
                <TextField
                  value={quizParams.topic}
                  select
                  onChange={handleChangeTopic}
                >
                  <MenuItem value="all">- Select topic -</MenuItem>
                  {topics.map((topic, index) => (
                    <MenuItem key={index} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box>
                <TextField
                  value={quizParams.sortType}
                  select
                  onChange={handleChangeSortType}
                >
                  <MenuItem value="desc">Sort by Desc</MenuItem>
                  <MenuItem value="asc">Sort by Asc</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Box>
          {quizes.length > 0 ? (
            <>
              <Box>
                <Grid container spacing={2}>
                  {quizes.map((quiz, index) => (
                    <Grid item key={index} xs={3}>
                      <QuizCardInfo
                        quiz={quiz}
                        onShowQuiz={(quizId) => handleShowQuiz(quizId)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={Math.round(quizTotal / 10)}
                  page={quizParams.page}
                  color="primary"
                  onChange={handleChangePage}
                />
              </Box>
            </>
          ) : (
            <Box className={classes.empty}>
              <Box>
                <img width="100" src={ImageLink.folderEmpty} alt="empty" />
                <Typography>Have no items.</Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
      {open && (
        <QuizDialog isOpen={open} onClose={handleCloseQuiz} quizId={quizId} />
      )}
    </>
  ) : null;
}

Explore.propTypes = {};

export default Explore;
