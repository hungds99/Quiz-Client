import { Box, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizCard from "../../components/quizCard/quizCard";
import { QuizActions } from "../../redux/actions/quizActions";
import QuizSelectors from "../../redux/selectors/quizSelectors";

function Dashboard() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const quizes = useSelector(QuizSelectors.selectQuizes);
  const quizTotal = useSelector(QuizSelectors.selectQuizTotal);

  useEffect(() => {
    let quizParams = {
      pageNumber: currentPage - 1,
    };
    dispatch(QuizActions.getPaginationByCreator(quizParams));
  }, [dispatch, currentPage]);

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Card raised>
      <CardHeader title="My Library" />
      <CardContent>
        <Box>
          <Box>
            <Grid container spacing={2}>
              {quizes.map((quiz, id) => (
                <Grid key={id} item xs={4}>
                  <QuizCard quiz={quiz} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.round(quizTotal / 10)}
              page={currentPage}
              color="primary"
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
