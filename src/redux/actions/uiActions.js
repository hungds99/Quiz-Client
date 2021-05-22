import { TypeActions } from "../../constants";

export const UIActions = {
  showNotification: (type, message) => (dispatch) => {
    dispatch({
      type: TypeActions.SET_NOTIFICATION,
      payload: { type: type, message: message },
    });
  },
};
