import { Box, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookIcon from "@material-ui/icons/Book";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PeopleIcon from "@material-ui/icons/People";
import TodayIcon from "@material-ui/icons/Today";
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router";
import { ImageLink, RoutePath } from "../../configs";
import AppHelper from "../../helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: "1",
  },
  cover: {
    width: 120,
    maxHeight: 180,
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function QuizCard({ quiz }) {
  const classes = useStyles();
  const history = useHistory();

  const handleShowQuizDetail = () => {
    history.push(RoutePath.quiz.detail.replace(":id", quiz.id));
  };

  return (
    <Card className={classes.root} onClick={handleShowQuizDetail}>
      <Box className={classes.cover}>
        <img
          height="100%"
          src={AppHelper.getImageLink(quiz.thumbnail)}
          alt="quiz thumbnail"
        />
      </Box>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Box>
            <Typography variant="h5">
              {quiz.title ? quiz.title : "Title is default !"}
            </Typography>
          </Box>
          <Box mt={3}>
            <Grid container spacing={1}>
              {[
                {
                  icon: <TodayIcon />,
                  data: dayjs(quiz.createdAt).format("DD/MM/YYYY"),
                },
                {
                  icon: <HelpOutlineIcon />,
                  data: `${quiz.questions.length} Questions`,
                },
                {
                  icon: <PeopleIcon />,
                  data: quiz.isPublic ? "Public" : "Private",
                },
                {
                  icon: <BookIcon />,
                  data: quiz.topic ? quiz.topic.name : "Khác",
                },
              ].map((value, index) => (
                <Grid key={index} item xs={6}>
                  <Box display="flex" alignItems="center" gridGap={2}>
                    {value.icon}
                    <Typography variant="caption">{value.data}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}
