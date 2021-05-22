import { createSelector } from "reselect";

const selectRaw = (state) => state.quiz;

const selectQuiz = createSelector([selectRaw], (quiz) => quiz.quiz);
const selectQuestion = createSelector([selectRaw], (quiz) => quiz.question);
const selectQuestions = createSelector([selectRaw], (quiz) => quiz.questions);
const selectQuizes = createSelector([selectRaw], (quiz) => quiz.quizes);
const selectQuizTotal = createSelector([selectRaw], (quiz) => quiz.quizTotal);

const QuizSelectors = {
  selectQuiz,
  selectQuestion,
  selectQuestions,
  selectQuizes,
  selectQuizTotal,
};

export default QuizSelectors;
