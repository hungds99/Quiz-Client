import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NextArrow from "../../../components/nextArrow/nextArrow";
import PrevArrow from "../../../components/preArrow/preArrow";
import QuizCardInfo from "../../../components/quizCardInfo/quizCardInfo";
import QuizDialog from "../../../components/quizDialog/quizDialog";
import QuizServices from "../../../services/quizServices";

const useStyles = makeStyles(() => ({
  paper: { marginTop: 10, marginBottom: 20 },
  root: {
    padding: 10,
  },
  title: {},
  media: {
    height: 140,
  },
  creator: { display: "flex", alignItems: "center", gap: 5 },
}));

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
function Topic({ topic }) {
  const classes = useStyles();
  const sliderRef = useRef();

  const [open, setOpen] = useState(false);

  const [quizes, setQuizes] = useState();
  const [quizId, setQuizId] = useState();

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const getQuizByTopic = async (topicParams) => {
    let { data } = await QuizServices.getPaginationByTopic(topicParams);
    if (data.code === 200) {
      setQuizes(data.result.data);
    }
  };

  useEffect(() => {
    getQuizByTopic({ topic: topic.id });
  }, [topic]);

  const handleShowQuiz = (quizId) => {
    setQuizId(quizId);
    setOpen(true);
  };

  const handleCloseQuiz = () => {
    setOpen(false);
  };

  return quizes ? (
    <>
      <Paper className={classes.paper}>
        <Box className={classes.root}>
          <Box className={classes.title}>
            <Typography vatiant="h2">{topic.name}</Typography>
          </Box>
          <Box position="relative">
            <Box paddingLeft={4} paddingRight={4}>
              <Slider ref={(c) => (sliderRef.current = c)} {...settings}>
                {quizes.map((quiz, index) => (
                  <Box key={index} padding={2}>
                    <QuizCardInfo
                      quiz={quiz}
                      onShowQuiz={(quizId) => handleShowQuiz(quizId)}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
            <PrevArrow onClick={handlePrev} />
            <NextArrow onClick={handleNext} />
          </Box>
        </Box>
      </Paper>
      {open && (
        <QuizDialog isOpen={open} onClose={handleCloseQuiz} quizId={quizId} />
      )}
    </>
  ) : null;
}

Topic.propTypes = {};

export default Topic;
