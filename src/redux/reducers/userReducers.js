import { TypeActions } from "../../constants";

const initialState = {
  credentials: {},
};

export const UserReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.SET_CREDENTIALS:
      return {
        ...state,
        credentials: actions.payload,
      };
    default:
      return state;
  }
};
