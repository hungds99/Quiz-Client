import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

function RankedList({ playerRanked }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Top</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerRanked.map((player, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <Avatar>H</Avatar>
                </TableCell>
                <TableCell align="center">{player.player.username}</TableCell>
                <TableCell align="center">
                  {player.total ? player.total : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

RankedList.propTypes = {};

export default RankedList;
