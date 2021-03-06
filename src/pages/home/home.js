import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconLink, ImageLink } from "../../configs";
import { SET_LOADING_PAGE, SET_NO_LOADING_PAGE } from "../../constants/types";
import TopicServices from "../../services/topicServices";
import Topic from "./topic/topic";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 5,
  },
  welcome: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  step: {},
}));
function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [topics, setTopics] = useState();

  const fetchRecommendTopic = async () => {
    let { data } = await TopicServices.getRecommendTopic();
    if (data.code === 200) {
      setTopics(data.result);
    }
  };

  useEffect(() => {
    dispatch({ type: SET_LOADING_PAGE });
    fetchRecommendTopic();
  }, [dispatch]);

  useEffect(() => {
    if (topics) {
      dispatch({ type: SET_NO_LOADING_PAGE });
    }
  }, [topics, dispatch]);

  return (
    <>
      {topics && (
        <Box>
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Paper className={clsx(classes.paper, classes.welcome)}>
                  <Typography>
                    Welcome, <strong>Quiz Online</strong>
                  </Typography>
                  <Box mt={2} mb={2}>
                    <Grid container spacing={4}>
                      {[
                        {
                          icon: IconLink.one,
                          content: "Add some quizes and Create a host",
                        },
                        {
                          icon: IconLink.two,
                          content: "Share your pin code with friends",
                        },
                        {
                          icon: IconLink.three,
                          content: "Waiting join and start quiz",
                        },
                        {
                          icon: IconLink.four,
                          content: "Top ranked player",
                        },
                      ].map((value, index) => (
                        <Grid key={index} item xs={6}>
                          <Box>
                            <Box className={classes.step}>
                              <img width={35} src={value.icon} alt="order" />
                            </Box>
                            <Typography variant="h6">
                              {value.content}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Typography>
                    Game on! Join a kahoot with a PIN provided by the host and
                    answer questions on your device.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper className={classes.paper}>
                  {/* <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/Q_JTr4UPRW8?autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                  ></iframe> */}
                  <img width="100%" alt="banner" src={ImageLink.banner} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Box>
            {topics.map((topic, index) => (
              <Topic key={index} topic={topic} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

Home.propTypes = {};

export default Home;
