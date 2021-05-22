import { TypeActions } from "../../constants";

const initialState = {
  quiz: {},
  quizes: [],
  quizTotal: 0,
  question: {},
  questions: [],
};

export const QuizReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.SET_QUIZ:
      let quiz = actions.payload;
      let { questions } = quiz;
      return {
        ...state,
        quiz: quiz,
        questions: [...questions],
      };
    case TypeActions.UPDATE_QUIZ:
      return {
        ...state,
        quiz: { ...state.quiz, ...actions.payload },
      };
    case TypeActions.UPLOAD_QUIZ_THUMBNAIL:
      return {
        ...state,
        quiz: { ...state.quiz, ...actions.payload },
      };
    case TypeActions.SET_QUESTION:
      return {
        ...state,
        question: { ...actions.payload },
      };
    case TypeActions.UPDATE_QUESTIONS:
      let questionIndex = state.questions.findIndex(
        (question) => question.id === actions.payload.id
      );
      if (questionIndex > -1) {
        return {
          ...state,
          questions: [
            ...state.questions.slice(0, questionIndex),
            actions.payload,
            ...state.questions.slice(questionIndex + 1),
          ],
        };
      } else {
        return {
          ...state,
          questions: [...state.questions, actions.payload],
        };
      }
    case TypeActions.REMOVE_QUESTIONS:
      let questionIdx = state.questions.findIndex(
        (question) => question.id === actions.payload.id
      );
      if (questionIdx > -1) {
        return {
          ...state,
          questions: [
            ...state.questions.slice(0, questionIdx),
            ...state.questions.slice(questionIdx + 1),
          ],
        };
      } else {
        return {
          ...state,
          questions: [...state.questions],
        };
      }
    case TypeActions.SET_QUIZES:
      return {
        ...state,
        quizes: [...actions.payload.data],
        quizTotal: actions.payload.total,
      };
    default:
      return state;
  }
};
