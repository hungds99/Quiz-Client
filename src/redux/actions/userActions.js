import { TypeActions } from "../../constants";
import UserServices from "../../services/userServices";

export const UserActions = {
  getUserInfo: (userId) => async (dispatch) => {
    let { data } = await UserServices.get(userId);
    if (data.code === 200) {
      dispatch({
        type: TypeActions.SET_CREDENTIALS,
        payload: data.result,
      });
    }
  },
};
