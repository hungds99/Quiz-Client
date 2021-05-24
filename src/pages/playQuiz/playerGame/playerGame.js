import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import StartCounter from "../../../components/startCounter/startCounter";
import HostSelectors from "../../../redux/selectors/hostSelectors";
import PlayerRanked from "./playerRanked/playerRanked";
import PlayerResult from "./playerResult/playerResult";
import QuestionArea from "./questionArea/questionArea";

const useStyles = makeStyles(() => ({}));

function PlayerGame() {
  const classes = useStyles();

  const questionResult = useSelector(HostSelectors.selectGameData);

  const playersTotalScore = useSelector(HostSelectors.selectPlayersTotalScore);

  const startCounter = useSelector(HostSelectors.selectStartCounter);

  const questionCounter = useSelector(HostSelectors.selectQuestionCounter);

  return (
    <>
      {startCounter > -1 ? (
        <StartCounter startCounter={startCounter} />
      ) : questionCounter !== 0 ? (
        <QuestionArea />
      ) : playersTotalScore.length > 0 ? (
        <PlayerRanked result={playersTotalScore} />
      ) : (
        questionResult && <PlayerResult result={questionResult} />
      )}
    </>
  );
}

PlayerGame.propTypes = {};

export default PlayerGame;
