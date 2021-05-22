import { createSelector } from "reselect";

const selectRaw = (state) => state.host;

const selectHost = createSelector([selectRaw], (host) => host.host);
const selectPlayers = createSelector([selectRaw], (host) => host.players);
const selectQuestions = createSelector([selectRaw], (host) => host.questions);
const selectStartCounter = createSelector(
  [selectRaw],
  (host) => host.startCounter
);
const selectQuestionCounter = createSelector(
  [selectRaw],
  (host) => host.questionCounter
);
const selectQuestion = createSelector([selectRaw], (host) => host.question);
const selectGameData = createSelector([selectRaw], (host) => host.gameData);
const selectPlayersTotalScore = createSelector(
  [selectRaw],
  (host) => host.playersTotalScore
);
const selectQuiz = createSelector([selectRaw], (host) => host.quiz);

const HostSelectors = {
  selectHost,
  selectPlayers,
  selectGameData,
  selectQuestion,
  selectQuestions,
  selectStartCounter,
  selectQuestionCounter,
  selectPlayersTotalScore,
  selectQuiz,
};

export default HostSelectors;
