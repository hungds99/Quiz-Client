import {
  Avatar,
  Box,
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import LinkHref from "@material-ui/core/Link";
import React from "react";
import { useSelector } from "react-redux";
import RankedList from "../../../../components/rankedList/rankedList";
import { IconLink, RoutePath } from "../../../../configs";
import AppHelper from "../../../../helpers";
import UserSelectors from "../../../../redux/selectors/userSelectors";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    backgroundImage: `url(${"/static/images/backgrounds/rock_clouds_landscape_193587_1366x768.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#3793f0",
    padding: 20,
    marginTop: 50,
    borderRadius: 5,
    position: "relative",
    width: 500,
  },
}));

function PlayerRanked({ result }) {
  const classes = useStyles();
  const user = useSelector(UserSelectors.selectCredentials);
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box className={classes.box}>
            <Box mb={2} textAlign="center">
              <Box>
                <img width={50} src={IconLink.cup} alt="winner ranked" />
              </Box>
              <Typography>Top Ranked Players</Typography>
            </Box>
            <RankedList playerRanked={result} />
            <Box mt={2}>
              {result.map((kq, id) => {
                if (kq.player._id.toString() === user.id.toString()) {
                  return (
                    <TableContainer key={id} component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">{id + 1}</TableCell>
                            <Avatar src={AppHelper.getImageLink(user.avatar)}>
                              H
                            </Avatar>
                            <TableCell align="center">
                              {user.username}
                            </TableCell>
                            <TableCell align="center">{kq.total}</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  );
                }
                return null;
              })}
            </Box>
            <Box mt={2} textAlign="center">
              <Typography component={LinkHref} href={RoutePath.home}>
                Back to home
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

PlayerRanked.propTypes = {};

export default PlayerRanked;
