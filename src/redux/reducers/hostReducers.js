import { TypeActions } from "../../constants";

const initialState = {
  host: {},
  quiz: {},
  players: [],
  gameData: null,
  question: {},
  questions: [],
  startCounter: null,
  questionCounter: null,
  playersTotalScore: [],
};

export const HostReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.SET_HOST:
      return {
        ...state,
        host: actions.payload,
        players: [...actions.payload.players],
      };
    case TypeActions.SET_PLAYER_JOIN:
      return {
        ...state,
        players: [...actions.payload],
      };
    case TypeActions.SET_GAME_START_COUNTER:
      return {
        ...state,
        startCounter: actions.payload,
      };
    case TypeActions.SET_HOST_QUESTIONS:
      return {
        ...state,
        questions: actions.payload,
      };
    case TypeActions.SET_HOST_QUESTION:
      return {
        ...state,
        question: actions.payload,
      };
    case TypeActions.SET_QUESTION_COUNTER:
      return {
        ...state,
        questionCounter: actions.payload,
      };
    case TypeActions.SET_HOST_DETAIL:
      let { host, quiz, questions } = actions.payload;
      return {
        ...state,
        host: host,
        quiz: quiz,
        players: [...host.players],
        questions: [...questions],
      };
    case TypeActions.SET_PLAYERS_TOTAL_SCORE:
      return {
        ...state,
        playersTotalScore: [...actions.payload],
      };
    case TypeActions.SET_SCORE_PLAYER_QUESTION:
      return {
        ...state,
        gameData: actions.payload,
      };
    case TypeActions.RESET_HOST:
      return initialState;
    default:
      return state;
  }
};
