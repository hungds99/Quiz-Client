import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";
import {
  Bookmark as BookmarkIcon,
  Calendar as CalendarIcon,
  Globe as GlobeIcon,
  HelpCircle as HelpCircleIcon,
} from "react-feather";
import AppHelper from "../../helpers";

const useStyles = makeStyles(() => ({
  root: { height: "100%" },
  media: {
    height: 140,
  },
  creator: { display: "flex", alignItems: "center", gap: 5 },
}));

function QuizCardInfo({ quiz, onShowQuiz }) {
  const classes = useStyles();

  const handleShowQuiz = () => {
    onShowQuiz(quiz.id);
  };

  return (
    <>
      <Card className={classes.root} onClick={handleShowQuiz}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={AppHelper.getImageLink(quiz.thumbnail)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {quiz.title ? quiz.title : "Title is default !"}
            </Typography>
            <Box mt={2} mb={2}>
              <Grid container spacing={1}>
                {[
                  {
                    icon: <CalendarIcon />,
                    data: dayjs(quiz.createdAt).format("DD/MM/YYYY"),
                  },
                  {
                    icon: <HelpCircleIcon />,
                    data: `${quiz.questions.length} Questions`,
                  },
                  {
                    icon: <GlobeIcon />,
                    data: quiz.isPublic ? "Public" : "Private",
                  },
                  {
                    icon: <BookmarkIcon />,
                    data: quiz.topic ? quiz.topic.name : "Khác",
                  },
                ].map((value, index) => (
                  <Grid key={index} item xs={6}>
                    <Box display="flex" alignItems="center" gridGap={4}>
                      {value.icon}
                      <Typography variant="caption">{value.data}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box className={classes.creator}>
              <Avatar src={AppHelper.getImageLink(quiz.creator.avatar)}>
                H
              </Avatar>
              <Typography variant="body2" color="textSecondary" component="p">
                {quiz.creator.username}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

QuizCardInfo.propTypes = {};

export default QuizCardInfo;
