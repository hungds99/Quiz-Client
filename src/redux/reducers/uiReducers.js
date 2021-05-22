import { TypeActions } from "../../constants";

const initialState = {
  isLoading: false,
  isOpenQuizDialog: false,
  notification: {
    type: "",
    message: "",
  },
};

export const UIReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.SET_LOADING_PAGE:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case TypeActions.SET_NO_LOADING_PAGE:
      return {
        ...state,
        isLoading: false,
      };
    case TypeActions.SET_OPEN_QUIZ_DIALOG:
      return {
        ...state,
        isOpenQuizDialog: true,
      };
    case TypeActions.SET_CLOSE_QUIZ_DIALOG:
      return {
        ...state,
        isOpenQuizDialog: false,
      };

    case TypeActions.SET_NOTIFICATION:
      console.log("payload : ", actions.payload);
      return {
        ...state,
        notification: actions.payload,
      };
    default:
      return state;
  }
};
